#!/usr/bin/env bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
# --------------------------------------------------------------
#	系统: CentOS/Debian/Ubuntu
#	项目: 解锁网易云音乐
#	版本: 0.0.1
# --------------------------------------------------------------

NOW_VER_SHELL="0.0.1"
NEW_VER_NODE_BACKUP="16.9.1"
FILEPASH=$(cd "$(dirname "$0")"; pwd)
FILEPASH_NOW=$(echo -e "${FILEPASH}"|awk -F "$0" '{print $1}')
NAME="UnblockNeteaseMusic"
NAME_PID="UnblockNeteaseMusic"
NAME_SERVICE="unblock163"
FOLDER="/usr/local/UnblockNeteaseMusic"
FILE="${FOLDER}/app.js"
FOLDER_NODE="/usr/local/UnblockNeteaseMusic/node"
FILE_NODE="${FOLDER_NODE}/bin/node"
FILE_CONF="${FOLDER}/UnblockNeteaseMusic.conf"
FILE_LOG="${FOLDER}/UnblockNeteaseMusic.log"
FILE_CRONTAB="/usr/bin/crontab"

GREEN_FONT_PREFIX="\033[32m" && RED_FONT_PREFIX="\033[31m" && GREEN_BACKGROUND_PREFIX="\033[42;37m" && RED_BACKGROUND_PREFIX="\033[41;37m" && FONT_COLOR_SUFFIX="\033[0m"
INFO="${GREEN_FONT_PREFIX}[信息]${FONT_COLOR_SUFFIX}" && ERROR="${RED_FONT_PREFIX}[错误]${FONT_COLOR_SUFFIX}" && TIP="${GREEN_FONT_PREFIX}[注意]${FONT_COLOR_SUFFIX}"

# 获取各项信息
_CHECK_INFO(){
	if [[ "${1}" == "ROOT" ]]; then
		[[ $EUID != 0 ]] && echo -e "${ERROR} 当前非ROOT账号(或没有ROOT权限)，无法继续操作，请更换ROOT账号或使用 ${GREEN_BACKGROUND_PREFIX}sudo su${FONT_COLOR_SUFFIX} 命令获取临时ROOT权限（执行后可能会提示输入当前账号的密码）。" && exit 1
	elif [[ "${1}" == "OS" ]]; then
		if [[ -f /etc/redhat-release ]]; then
			SYSTEM_RELEASE="centos"
		elif cat /etc/issue | grep -q -E -i "debian"; then
			SYSTEM_RELEASE="debian"
		elif cat /etc/issue | grep -q -E -i "ubuntu"; then
			SYSTEM_RELEASE="ubuntu"
		elif cat /etc/issue | grep -q -E -i "centos|red hat|redhat"; then
			SYSTEM_RELEASE="centos"
		elif cat /proc/version | grep -q -E -i "debian"; then
			SYSTEM_RELEASE="debian"
		elif cat /proc/version | grep -q -E -i "ubuntu"; then
			SYSTEM_RELEASE="ubuntu"
		elif cat /proc/version | grep -q -E -i "centos|red hat|redhat"; then
			SYSTEM_RELEASE="centos"
		fi
		SYSTEM_BIT=$(uname -m)
	elif [[ "${1}" == "INSTALL_STATUS" ]]; then
		[[ ! -e "${FILE}" ]] && echo -e "${ERROR} ${NAME} 没有安装，请检查 !" && exit 1
	elif [[ "${1}" == "CRONTAB_INSTALL_STATUS" ]]; then
		if [[ ! -e "${FILE_CRONTAB}" ]]; then
			echo -e "${ERROR} Crontab 没有安装，开始安装..."
			if [[ "${SYSTEM_RELEASE}" == "centos" ]]; then
				yum install crond -y
			else
				apt-get install cron -y
			fi
			if [[ ! -e "${FILE_CRONTAB}" ]]; then
				echo -e "${ERROR} Crontab 安装失败，请检查！" && exit 1
			else
				echo -e "${INFO} Crontab 安装成功！"
			fi
		fi
	elif [[ "${1}" == "PID" ]]; then
		PID=$(ps -ef| grep "${NAME_PID}"| grep -v "grep" | grep -v "init.d" |grep -v "service" |awk '{print $2}')
	elif [[ "${1}" == "NEW_VER_NODE" ]]; then
		NEW_VER_NODE=$(wget -qO- https://nodejs.org/en/download/current/| grep "Latest Current Version"| awk -F '<strong>' '{print $2}'| awk -F '</strong>' '{print $1}')
		[[ -z "${NEW_VER_NODE}" ]] && NEW_VER_NODE="${NEW_VER_NODE_BACKUP}"
		echo -e "${INFO} 检测到 Node 最新版本为 [ ${NEW_VER_NODE} ]"
	elif [[ "${1}" == "IPV4" ]]; then
		IPV4=$(wget -qO- -4 -t1 -T2 ipinfo.io/ip)
		if [[ -z "${IPV4}" ]]; then
			IPV4=$(wget -qO- -4 -t1 -T2 api.ip.sb/ip)
			if [[ -z "${IPV4}" ]]; then
				IPV4=$(wget -qO- -4 -t1 -T2 members.3322.org/dyndns/getip)
				if [[ -z "${IPV4}" ]]; then
					IPV4="IPv4地址获取失败"
				fi
			fi
		fi
	elif [[ "${1}" == "IP_ADDRESS" ]]; then
		if [[ ! -z "${TARGET_IP}" ]]; then
			for((IP_ADDRESS_INTEGER = ${TARGET_IP_TOTAL}; IP_ADDRESS_INTEGER >= 1; IP_ADDRESS_INTEGER--))
			do
				IP_ADDRESS_IP=$(echo "${TARGET_IP}" |sed -n "$IP_ADDRESS_INTEGER"p)
				IP_ADDRESS_IP_ADDRESS=$(wget -qO- -t2 -T3 http://freeapi.ipip.net/${IP_ADDRESS_IP}|sed 's/\"//g;s/,//g;s/\[//g;s/\]//g')
				echo -e "${GREEN_FONT_PREFIX}${IP_ADDRESS_IP}${FONT_COLOR_SUFFIX} (${IP_ADDRESS_IP_ADDRESS})"
				sleep 1s
			done
		fi
	fi
}
# 安装前置依赖
_INSTALLATION_DEPENDENCY(){
	GIT_VER=$(git --version)
	XZ_VER=$(xz -V)
	TAR_VER=$(tar --version)
	[[ -z "${GIT_VER}" ]] && PACK_NAME="${pack_name}git "
	[[ -z "${XZ_VER}" ]] && pack_name="${pack_name}xz  "
	[[ -z "${TAR_VER}" ]] && pack_name="${pack_name}tar "
	if [[ ! -z "${PACK_NAME}" ]]; then
		if [[ "${SYSTEM_RELEASE}" == "centos" ]]; then
			yum update
			yum install -y ${PACK_NAME}
		else
			apt-get update
			apt-get install -y ${PACK_NAME}
		fi
	fi
	GIT_VER=$(git --version)
	XZ_VER=$(xz -V)
	TAR_VER=$(tar --version)
	[[ -z "${GIT_VER}" ]] && echo -e "${ERROR} 依赖 Git 安装失败，请检查！" && exit 1
	[[ -z "${XZ_VER}" ]] && echo -e "${ERROR} 解压缩依赖 xz 安装失败，请检查！" && exit 1
	[[ -z "${TAR_VER}" ]] && echo -e "${ERROR} 解压缩依赖 tar 安装失败，请检查！" && exit 1

	# 修改服务器时区为北京时间
	MD5_SHANGHAI=$(md5sum /usr/share/zoneinfo/Asia/Shanghai | awk '{print $1}')
	MD5_LOCALTIME=$(md5sum /etc/localtime | awk '{print $1}')
	[[ "${MD5_SHANGHAI}" != "${MD5_LOCALTIME}" ]] && \cp -f /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
}
# 下载主程序
_DOWNLOAD(){
	[[  -e "${FOLDER}" ]] && rm -rf "${FOLDER}"
	echo -e "${INFO} 开始安装 ${NAME} ..."
	env GIT_SSL_NO_VERIFY=true git clone -b enhanced https://github.com/UnblockNeteaseMusic/server.git "${FOLDER}"
	[[ ! -e "${FOLDER}" ]] && echo -e "${ERROR} ${NAME} 下载失败 !" && _INSTALLATION_FAILURE_CLEANUP
	echo -e "${INFO} ${NAME} 安装完成，开始安装其依赖 Node ..."	
	_DOWNLOAD_NODE
}
# 下载NODE
_DOWNLOAD_NODE(){
	cd "${FOLDER}"	
	[[  -e "${FOLDER_NODE}" ]] && rm -rf "${FOLDER_NODE}"
	if [[ "${SYSTEM_BIT}" == "x86_64" ]]; then
		FILE_NAME="node-v${NEW_VER_NODE}-linux-x64"
		wget --no-check-certificate "https://nodejs.org/dist/v${NEW_VER_NODE}/${FILE_NAME}.tar.xz"
	else
		FILE_NAME="node-v${NEW_VER_NODE}-linux-arm64"
		wget --no-check-certificate "https://nodejs.org/dist/v${NEW_VER_NODE}/${FILE_NAME}.tar.xz"
	fi
	[[ ! -e "${FILE_NAME}.tar.xz" ]] && echo -e "${ERROR} 依赖 Node 压缩包下载失败！" && _INSTALLATION_FAILURE_CLEANUP
	xz -d "${FILE_NAME}.tar.xz"
	[[ ! -e "${FILE_NAME}.tar" ]] && echo -e "${ERROR} 依赖 Node 压缩包解压失败（可能是 压缩包损坏 或者 没有安装解压工具 xz）！" && _INSTALLATION_FAILURE_CLEANUP
	tar -xf "${FILE_NAME}.tar"
	[[ ! -e "${FILE_NAME}" ]] && echo -e "${ERROR} 依赖 Node 压缩包解压失败（可能是 压缩包损坏 或者 没有安装解压工具 tar）！" && _INSTALLATION_FAILURE_CLEANUP
	mv "${FILE_NAME}" "node"
	[[ ! -e "${FOLDER_NODE}" ]] && echo -e "${ERROR} 依赖 Node 文件夹重命名失败！" && _INSTALLATION_FAILURE_CLEANUP
	chmod +x "{FILE_NODE}"
	rm "${FILE_NAME}"*
}
# 安装系统服务
_SERVICE(){
	if [[ "${SYSTEM_RELEASE}" = "centos" ]]; then
		wget --no-check-certificate "https://raw.githubusercontent.com/UnblockNeteaseMusic/server/enhanced/${NAME_SERVICE}_service" -O "/etc/init.d/${NAME_SERVICE}"
		[[ !  -e "/etc/init.d/${NAME_SERVICE}" ]] && echo -e "${ERROR} ${NAME} 服务管理脚本下载失败 !" && _INSTALLATION_FAILURE_CLEANUP
		chmod +x "/etc/init.d/${NAME_SERVICE}"
		chkconfig --add "${NAME_SERVICE}"
		chkconfig "${NAME_SERVICE}" on
	else
		wget --no-check-certificate "https://raw.githubusercontent.com/UnblockNeteaseMusic/server/enhanced/${NAME_SERVICE}_service" -O "/etc/init.d/${NAME_SERVICE}"
		[[ !  -e "/etc/init.d/${NAME_SERVICE}" ]] && echo -e "${ERROR} ${NAME} 服务管理脚本下载失败 !" && _INSTALLATION_FAILURE_CLEANUP
		chmod +x "/etc/init.d/${NAME_SERVICE}"
		update-rc.d -f "${NAME_SERVICE}" defaults
	fi
	echo -e "${INFO} ${NAME} 服务管理脚本下载完成 !"
}
# 安装失败善后处理
_INSTALLATION_FAILURE_CLEANUP() {
	[[  -e "${FOLDER}" ]] && rm -rf "${FOLDER}"
	[[ -e "/etc/init.d/${NAME_SERVICE}" ]] && rm -rf "${FOLDER}"
	exit 1
}
# 读入/写出配置
_CONFIG_OPERATION(){
	if [[ "${1}" == "READ" ]]; then
		[[ ! -e "${FILE_CONF}" ]] && echo -e "${ERROR} ${NAME} 配置文件不存在 !" && exit 1
		PORT=$(cat ${FILE_CONF}|grep 'PORT = '|awk -F 'PORT = ' '{print $NF}')
		SOURCE=$(cat ${FILE_CONF}|grep 'SOURCE = '|awk -F 'SOURCE = ' '{print $NF}')
		STRICT=$(cat ${FILE_CONF}|grep 'STRICT = '|awk -F 'STRICT = ' '{print $NF}')
		ENDPOINT=$(cat ${FILE_CONF}|grep 'ENDPOINT = '|awk -F 'ENDPOINT = ' '{print $NF}')
		ENDPOINTURL=$(cat ${FILE_CONF}|grep 'ENDPOINTURL = '|awk -F 'ENDPOINTURL = ' '{print $NF}')
		FORCEHOST=$(cat ${FILE_CONF}|grep 'FORCEHOST = '|awk -F 'FORCEHOST = ' '{print $NF}')
	elif [[ "${1}" == "WRITE" ]]; then
		cat > ${FILE_CONF}<<-EOF
PORT = ${PORT}
SOURCE = ${SOURCE}
STRICT = ${STRICT}
ENDPOINT = ${ENDPOINT}
ENDPOINTURL = ${ENDPOINTURL}
FORCEHOST = ${FORCEHOST}
EOF
	fi
}
# 设置选择
_SET(){
	_CHECK_INFO "INSTALL_STATUS"
	echo && echo -e "你要做什么？
 ${GREEN_FONT_PREFIX}1.${FONT_COLOR_SUFFIX}  修改 代理端口
 ${GREEN_FONT_PREFIX}2.${FONT_COLOR_SUFFIX}  修改 音源排序
 ${GREEN_FONT_PREFIX}3.${FONT_COLOR_SUFFIX}  修改 严格模式
 ${GREEN_FONT_PREFIX}4.${FONT_COLOR_SUFFIX}  修改 配置 ENDPOINT
 ${GREEN_FONT_PREFIX}5.${FONT_COLOR_SUFFIX}  修改 指定 IP
 ${GREEN_FONT_PREFIX}6.${FONT_COLOR_SUFFIX}  修改 全部配置" && echo
	read -e -p "(默认: 取消):" SET_INDEX
	[[ -z "${SET_INDEX}" ]] && echo "已取消..." && exit 1
	if [[ "${SET_INDEX}" == "1" ]]; then
		_CONFIG_OPERATION "READ"
		OLD_PORT="${PORT}"
		_PORT_SET
		_CONFIG_OPERATION "WRITE"
		_IPTABLES_OPTION "DEL" "${OLD_PORT}"
		_IPTABLES_OPTION "ADD"
		_RESTART
	elif [[ "${SET_INDEX}" == "2" ]]; then
		_CONFIG_OPERATION "READ"
		_SOURCE_SET
		_CONFIG_OPERATION "WRITE"
		_RESTART
	elif [[ "${SET_INDEX}" == "3" ]]; then
		_CONFIG_OPERATION "READ"
		_STRICT_SET
		_CONFIG_OPERATION "WRITE"
		_RESTART
	elif [[ "${SET_INDEX}" == "4" ]]; then
		_CONFIG_OPERATION "READ"
		_ENDPOINT_SET
		_CONFIG_OPERATION "WRITE"
		_RESTART
	elif [[ "${SET_INDEX}" == "5" ]]; then
		_CONFIG_OPERATION "READ"
		_FORCEHOST_SET
		_CONFIG_OPERATION "WRITE"
		_RESTART
	elif [[ "${SET_INDEX}" == "6" ]]; then
		_CONFIG_OPERATION "READ"
		OLD_PORT="${PORT}"
		_PORT_SET
		_SOURCE_SET
		_STRICT_SET
		_ENDPOINT_SET
		_FORCEHOST_SET
		_CONFIG_OPERATION "WRITE"
		_IPTABLES_OPTION "DEL" "${OLD_PORT}"
		_IPTABLES_OPTION "ADD"
		_RESTART
	else
		echo -e "${ERROR} 请输入正确的数字！ [1-6]" && exit 1
	fi
}
# 修改 端口
_PORT_SET() {
	while true
		do
		echo -e "请输入要使用的代理端口。 [1-65535]"
		echo -e "${TIP} 如果你在本地通过 Hosts 方式使用该代理，那么只能选择 80 端口，格式示例：80"
		echo -e "${TIP} 如果需要搭配自签证书，那么还需要配置 HTTPS 端口，格式：HTTP:HTTPS，两个端口不能相同，格式示例：80:443"
		read -e -p "(默认: 80):" PORT
		[[ -z "${PORT}" ]] && PORT="80"
		PORT_FORMAT_DETECTION=$(echo "${PORT}"|grep ":")
		if [[ -z ${PORT_FORMAT_DETECTION} ]]; then
				echo $((${PORT}+0)) &>/dev/null
				if [[ ${?} == 0 ]]; then
					if (( ${PORT} >= 1 )) && (( ${PORT} <= 65536 )); then
						echo && echo "------------------------"
						echo -e "	代理端口 : ${RED_BACKGROUND_PREFIX} ${PORT} ${FONT_COLOR_SUFFIX}"
						echo "------------------------" && echo
						break
					else
						echo "输入错误，请输入正确的端口。"
					fi
				else
					echo "输入错误，请输入正确的端口。"
				fi
		else
				echo && echo "------------------------"
				echo -e "	代理端口 : ${RED_BACKGROUND_PREFIX} ${PORT} ${FONT_COLOR_SUFFIX}"
				echo "------------------------" && echo
				break
		fi
		done
}
# 修改 音源
_SOURCE_SET() {
	echo -e "请输入要使用的音源排序。 [kuwo kugou pyncmd qq migu bilibili joox youtube]"
	echo -e "${TIP} 音源排序指的是，无版权音乐会根据此处顺序优先匹配首位音源，如果匹配到就返回，反之就继续往后匹配。"
	echo -e "${TIP} 不同音源之间请用空格隔开。"
	read -e -p "(默认: kuwo kugou):" SOURCE
	[[ -z "${SOURCE}" ]] && SOURCE="kuwo kugou"
	SOURCE=$(echo "${SOURCE}"|sed -e 's/^ *//g;s/ *$//g')
	echo && echo "------------------------"
	echo -e "	音源排序 : ${RED_BACKGROUND_PREFIX} ${SOURCE} ${FONT_COLOR_SUFFIX}"
	echo "------------------------" && echo
}
# 修改 严格模式
_STRICT_SET() {
	echo -e "是否启用严格模式？[Y/n]"
	echo -e "${TIP} 启用严格模式后，本代理仅允许网易云音乐域名访问，即本地设备只能通过 Host 或 PAC 使用，强烈建议开启，否则所有设备流量都会经过本代理。"
	read -e -p "(默认：N [禁用]):" STRICT
	[[ -z "${STRICT}" ]] && STRICT="N"
	if [[ "${STRICT}" == [Nn] ]]; then
		STRICT="NO"
	else
		STRICT="YES"
		if [[ "${ENDPOINT}" == "YES" && "${ENDPOINTURL}" != "http://music.163.com" ]]; then
			ENDPOINT="NO"
			echo -e "	检测到 ENDPOINTURL 服务器不是网易云，强制关闭ENDPOINT功能。"
		fi
	fi
	echo && echo "------------------------"
	echo -e "	严格模式 : ${RED_BACKGROUND_PREFIX} ${STRICT} ${FONT_COLOR_SUFFIX}"
	echo "------------------------" && echo
}
# 配置 ENDPOINT
_ENDPOINT_SET() {
	echo -e "是否启用 ENDPOINT 功能？[Y/n]"
	echo -e "${TIP} 启用 ENDPOINT 功能后，需要指定虚拟网易云音乐的域名。如不清楚作用，请勿开启。"
	read -e -p "(默认：N [禁用]):" ENDPOINT
	[[ -z "${ENDPOINT}" ]] && ENDPOINT="N"
	if [[ "${ENDPOINT}" == [Nn] ]]; then
		ENDPOINT="NO"
	else
		ENDPOINT="YES"
		echo -e "指定ENDPOINT服务器："
		read -e -p "(默认为：http://music.163.com ):" ENDPOINTURL
		[[ -z "${ENDPOINTURL}" ]] && ENDPOINTURL="http://music.163.com"
		if [[ "${ENDPOINTURL}" != "http://music.163.com" ]]; then
			STRICT="NO"
			echo -e "	检测到 ENDPOINTURL 服务器不是网易云，强制禁用严格模式。"
		fi
	fi
	echo && echo "------------------------"
	echo -e "	ENDPOINT模式 : ${RED_BACKGROUND_PREFIX} ${ENDPOINT} ${FONT_COLOR_SUFFIX}"
	echo -e "	ENDPOINTURL : ${RED_BACKGROUND_PREFIX} ${ENDPOINTURL} ${FONT_COLOR_SUFFIX}"
	echo "------------------------" && echo
}
# 修改 指定网易服务器 IP
_FORCEHOST_SET() {
	echo -e "指定网易服务器 IP，不懂请跳过。[格式：IPv4]"
	read -e -p "(默认为空):" FORCEHOST
	echo && echo "------------------------"
	echo -e "	指定 IP : ${RED_BACKGROUND_PREFIX} ${FORCEHOST} ${FONT_COLOR_SUFFIX}"
	echo "------------------------" && echo
}
# 安装
_INSTALL() {
	_CHECK_INFO "ROOT"
	[[ -e "${FILE}" ]] && echo -e "${ERROR} 检测到 ${NAME} 已安装 !" && exit 1
	echo -e "${INFO} 开始设置 用户配置..."
	_PORT_SET
	_SOURCE_SET
	_STRICT_SET
	_ENDPOINT_SET
	_FORCEHOST_SET
	echo -e "${INFO} 开始安装/配置 依赖..."
	_INSTALLATION_DEPENDENCY
	echo -e "${INFO} 开始下载/安装..."
	_CHECK_INFO "NEW_VER_NODE"
	_DOWNLOAD
	echo -e "${INFO} 开始下载/安装 服务脚本(init)..."
	_SERVICE
	echo -e "${INFO} 开始写入 配置文件..."
	_CONFIG_OPERATION "WRITE"
	echo -e "${INFO} 开始设置 iptables防火墙..."
	_IPTABLES_OPTION "SET"
	echo -e "${INFO} 开始添加 iptables防火墙规则..."
	_IPTABLES_OPTION "ADD"
	echo -e "${INFO} 开始保存 iptables防火墙规则..."
	_IPTABLES_OPTION "SAVE"
	echo -e "${INFO} 所有步骤 安装完毕，开始启动..."
	_START
}
# 更新主程序
_UPDATE(){
	_CHECK_INFO "INSTALL_STATUS"
	echo -e "\n${INFO} 开始更新..."
	cd "${FOLDER}"
	env GIT_SSL_NO_VERIFY=true git pull
	_UPDATE_NODE
	echo -e "${INFO} 更新完成！开始重启...\n"
	_RESTART
}
# 更新NODE
_UPDATE_NODE(){
        echo -e "\n${INFO} 开始更新NODE..."
        _CHECK_INFO "NEW_VER_NODE"
        NOW_VER_NODE=$("${FILE_NODE}" -v | awk -F 'v' '{print $2}')
        if [[ "${NEW_VER_NODE}}" != "${NOW_VER_NODE}}" ]]; then
	_DOWNLOAD_NODE
                echo -e "脚本已更新为最新版本[ ${NEW_VER_NODE} ] !"
        else
                echo -e "NODE当前为最新版本不需更新 !"
        fi
}
# 卸载
_UNINSTALL() {
	_CHECK_INFO "INSTALL_STATUS"
	echo -e "确定要卸载 ${NAME} ? (y/N)\n"
	read -e -p "(默认: n):" UNINSTALL_YN
	[[ -z "${UNINSTALL_YN}" ]] && UNINSTALL_YN="n"
	if [[ "${UNINSTALL_YN}" == [Yy] ]]; then
		_CHECK_INFO "PID"
		[[ ! -z "${PID}" ]] && kill -9 "${PID}"
		if [[ -e ${FILE_CONF} ]]; then
			_CONFIG_OPERATION "READ"
			_IPTABLES_OPTION "DEL"
			_IPTABLES_OPTION "SAVE"
		fi
		[[ -e "${FOLDER}" ]] && rm -rf "${FOLDER}"
		if [[ -e "/etc/init.d/${NAME_SERVICE}"  ]];then
			if [[ "${SYSTEM_RELEASE}" = "centos" ]]; then
				chkconfig --del "${NAME_SERVICE}"
			else
				update-rc.d -f "${NAME_SERVICE}" remove
			fi
			rm -rf "/etc/init.d/${NAME_SERVICE}"
		fi
		echo -e "\n${INFO} ${NAME} 卸载完成 !\n"
	else
		echo -e "\n${INFO} 卸载已取消...\n"
	fi
}
# 启动
_START(){
	_CHECK_INFO "INSTALL_STATUS"
	_CHECK_INFO "PID"
	[[ ! -z "${PID}" ]] && echo -e "${ERROR} ${NAME} 正在运行，请检查 !" && exit 1
	"/etc/init.d/${NAME_SERVICE}" start
	_CHECK_INFO "PID"
	[[ ! -z "${PID}" ]] && _VIEW
}
# 停止
_STOP(){
	_CHECK_INFO "INSTALL_STATUS"
	_CHECK_INFO "PID"
	[[ -z "${PID}" ]] && echo -e "${ERROR} ${NAME} 没有运行，请检查 !" && exit 1
	"/etc/init.d/${NAME_SERVICE}" stop
}
# 重启
_RESTART(){
	_CHECK_INFO "INSTALL_STATUS"
	_CHECK_INFO "PID"
	[[ ! -z "${PID}" ]] && "/etc/init.d/${NAME_SERVICE}" stop
	"/etc/init.d/${NAME_SERVICE}" start
	_CHECK_INFO "PID"
	[[ ! -z "${PID}" ]] && _VIEW
}
# 查看 配置信息
_VIEW(){
	_CHECK_INFO "INSTALL_STATUS"
	_CONFIG_OPERATION "READ"
	_CHECK_INFO "IPV4"
	PORT_HTTP=$(echo ${PORT} | awk -F ':' '{print $(NF-1)}')
	clear
	echo -e "\n	UnblockNeteaseMusic 配置信息：
	------------------------
	本机地址: ${GREEN_FONT_PREFIX}${IPV4}${FONT_COLOR_SUFFIX}
	代理端口: ${GREEN_FONT_PREFIX}${PORT}${FONT_COLOR_SUFFIX}
	音源排序: ${GREEN_FONT_PREFIX}${SOURCE}${FONT_COLOR_SUFFIX}
	严格模式: ${GREEN_FONT_PREFIX}${STRICT}${FONT_COLOR_SUFFIX}
	ENDPOINT模式: ${GREEN_FONT_PREFIX}${ENDPOINT}${FONT_COLOR_SUFFIX}
	ENDPOINTURL: ${GREEN_FONT_PREFIX}${ENDPOINTURL}${FONT_COLOR_SUFFIX}
	指定 IP: ${GREEN_FONT_PREFIX}${FORCEHOST}${FONT_COLOR_SUFFIX}\n
	PAC 地址: ${RED_FONT_PREFIX}http://${IPV4}:${PORT_HTTP}/proxy.pac${FONT_COLOR_SUFFIX}\n"
}
# 查看 日志
_VIEW_LOG(){
	_CHECK_INFO "INSTALL_STATUS"
	[[ ! -e "${FILE_LOG}" ]] && echo -e "${ERROR} ${NAME} 日志文件不存在 !" && exit 1
	echo -e "\n${TIP} 按 ${RED_FONT_PREFIX}Ctrl+C${FONT_COLOR_SUFFIX} 终止查看日志\n 如果需要查看完整日志内容，请使用 ${RED_FONT_PREFIX}cat ${FILE_LOG}${FONT_COLOR_SUFFIX} 命令。"
	tail -f "${FILE_LOG}"
}
# 查看 链接信息
_VIEW_CONNECTION_INFO_WITH(){
	_CONFIG_OPERATION "READ"
	PORT_FORMAT_DETECTION=$(echo "${PORT}"|grep ":")
	[[ ! -z ${PORT_FORMAT_DETECTION} ]] && PORT=$(echo "${PORT}"|sed 's/:/ /g')
	for ONE_PORT in ${PORT}
		do
		TARGET_IP=$(ss state connected sport = :${ONE_PORT} -tn|sed '1d'|awk '{print $NF}'|awk -F ':' '{print $(NF-1)}'|sort -u)
			if [[ -z ${TARGET_IP} ]]; then
				TARGET_IP_TOTAL="0"
				echo -e "端口: ${GREEN_FONT_PREFIX}"${ONE_PORT}"${FONT_COLOR_SUFFIX}\t 链接IP总数: ${GREEN_FONT_PREFIX}"${TARGET_IP_TOTAL}"${FONT_COLOR_SUFFIX}\t 当前链接IP: "
			else
				TARGET_IP_TOTAL=$(echo -e "${TARGET_IP}"|wc -l)
				if [[ "${1}" == "IP_ADDRESS" ]]; then
					echo -e "端口: ${GREEN_FONT_PREFIX}"${ONE_PORT}"${FONT_COLOR_SUFFIX}\t 链接IP总数: ${GREEN_FONT_PREFIX}"${TARGET_IP_TOTAL}"${FONT_COLOR_SUFFIX}\t 当前链接IP: "
					_CHECK_INFO "IP_ADDRESS"
					echo
				else
					TARGET_IP=$(echo -e "\n${TARGET_IP}")
					echo -e "端口: ${GREEN_FONT_PREFIX}"${ONE_PORT}"${FONT_COLOR_SUFFIX}\t 链接IP总数: ${GREEN_FONT_PREFIX}"${TARGET_IP_TOTAL}"${FONT_COLOR_SUFFIX}\t 当前链接IP: ${GREEN_FONT_PREFIX}${TARGET_IP}${FONT_COLOR_SUFFIX}\n"
				fi
			fi
			TARGET_IP=""
		done
}
# 选择 链接信息
_VIEW_CONNECTION_INFO(){
	#_CHECK_INFO "INSTALL_STATUS"
	echo && echo -e "请选择要显示的格式：
 ${GREEN_FONT_PREFIX}1.${FONT_COLOR_SUFFIX} 显示 IP 格式
 ${GREEN_FONT_PREFIX}2.${FONT_COLOR_SUFFIX} 显示 IP+IP归属地 格式" && echo
	read -e -p "(默认: 1):" VIEW_CONNECTION_INFO_INDEX
	[[ -z "${VIEW_CONNECTION_INFO_INDEX}" ]] && VIEW_CONNECTION_INFO_INDEX="1"
	if [[ "${VIEW_CONNECTION_INFO_INDEX}" == "1" ]]; then
		_VIEW_CONNECTION_INFO_WITH
	elif [[ "${VIEW_CONNECTION_INFO_INDEX}" == "2" ]]; then
		echo -e "${TIP} 检测IP归属地(IP源：ipip.net)，如果IP较多，可能时间会比较长..."
		_VIEW_CONNECTION_INFO_WITH "IP_ADDRESS"
	else
		echo -e "${ERROR} 请输入正确的数字 [1-2]" && exit 1
	fi
}
# 配置 防火墙
_IPTABLES_OPTION(){
	if [[ "${1}" == "ADD" ]]; then
		if [[ ! "${2}" ]]; then
			ADD_PORT="${PORT}"
		else
			ADD_PORT="${2}"
		fi
		iptables -I INPUT -m state --state NEW -m tcp -p tcp --dport ${ADD_PORT} -j ACCEPT
		iptables -I INPUT -m state --state NEW -m udp -p udp --dport ${ADD_PORT} -j ACCEPT
		ip6tables -I INPUT -m state --state NEW -m tcp -p tcp --dport ${ADD_PORT} -j ACCEPT
		ip6tables -I INPUT -m state --state NEW -m udp -p udp --dport ${ADD_PORT} -j ACCEPT
	elif [[ "${1}" == "DEL" ]]; then
		if [[ ! "${2}" ]]; then
			DEL_PORT="${PORT}"
		else
			DEL_PORT="${2}"
		fi
		iptables -D INPUT -m state --state NEW -m tcp -p tcp --dport ${DEL_PORT} -j ACCEPT
		iptables -D INPUT -m state --state NEW -m udp -p udp --dport ${DEL_PORT} -j ACCEPT
		ip6tables -D INPUT -m state --state NEW -m tcp -p tcp --dport ${DEL_PORT} -j ACCEPT
		ip6tables -D INPUT -m state --state NEW -m udp -p udp --dport ${DEL_PORT} -j ACCEPT
	elif [[ "${1}" == "SAVE" ]]; then
		if [[ "${SYSTEM_RELEASE}" == "centos" ]]; then
			service iptables save
			service ip6tables save
		else
			iptables-save > /etc/iptables.up.rules
			ip6tables-save > /etc/ip6tables.up.rules
		fi
	elif [[ "${1}" == "SET" ]]; then
		if [[ "${SYSTEM_RELEASE}" == "centos" ]]; then
			service iptables save
			service ip6tables save
			chkconfig --level 2345 iptables on
			chkconfig --level 2345 ip6tables on
		else
			iptables-save > /etc/iptables.up.rules
			ip6tables-save > /etc/ip6tables.up.rules
			echo -e '#!/bin/bash\n/sbin/iptables-restore < /etc/iptables.up.rules\n/sbin/ip6tables-restore < /etc/ip6tables.up.rules' > /etc/network/if-pre-up.d/iptables
			chmod +x /etc/network/if-pre-up.d/iptables
		fi
	fi
}
# 更新脚本
_UPDATE_SHELL(){
	NEW_VER_SHELL=$(wget --no-check-certificate -qO- -t1 -T3 "https://raw.githubusercontent.com/UnblockNeteaseMusic/server/enhanced/unblock163.sh"|grep 'NOW_VER_SHELL="'|awk -F "=" '{print $NF}'|sed 's/\"//g'|head -1)
	[[ -z "${NEW_VER_SHELL}" ]] && echo -e "${ERROR} 获取脚本最新版本失败！无法链接到 Github !" && exit 1
	#if [[ "${NEW_VER_SHELL}" != "${NOW_VER_SHELL}" ]]; then
		if [[ -e "/etc/init.d/${NAME_SERVICE}" ]]; then
			rm -rf "/etc/init.d/${NAME_SERVICE}"
			_SERVICE
		fi
		wget -N --no-check-certificate "https://raw.githubusercontent.com/UnblockNeteaseMusic/server/enhanced/unblock163.sh"
		chmod +x "${FILEPASH_NOW}/unblock163.sh"
		echo -e "脚本已更新为最新版本[ ${NEW_VER_SHELL} ] !\n${TIP} 因为更新方式为直接覆盖当前运行的脚本，所以可能下面会提示一些报错，无视即可。" && exit 0
	#else
		#echo -e "脚本当前为最新版本[ ${NEW_VER_SHELL} ] !" && exit 0
	#fi
}
# 脚本起始位置
_CHECK_INFO "OS"
[[ "${SYSTEM_RELEASE}" != "centos" ]] && [[ "${SYSTEM_RELEASE}" != "debian" ]]  && [[ "${SYSTEM_RELEASE}" != "ubuntu" ]] && echo -e "${ERROR} 本脚本不支持当前系统 ${SYSTEM_RELEASE} !" && exit 1
[[ "${SYSTEM_BIT}" !=  "x86_64" ]] && [[ "${SYSTEM_BIT}" !=  "aarch64" ]] && echo -e "${ERROR} ${NAME} 的依赖 Node 不支持当前系统位数 ${SYSTEM_BIT} !" && exit 1

	echo && echo -e "  UnblockNeteaseMusic 一键脚本 ${RED_FONT_PREFIX}[v${NOW_VER_SHELL}]${FONT_COLOR_SUFFIX}
  
 ${GREEN_FONT_PREFIX} 0.${FONT_COLOR_SUFFIX} 更新脚本
----------
 ${GREEN_FONT_PREFIX} 1.${FONT_COLOR_SUFFIX} 安装
 ${GREEN_FONT_PREFIX} 2.${FONT_COLOR_SUFFIX} 更新
 ${GREEN_FONT_PREFIX} 3.${FONT_COLOR_SUFFIX} 卸载
----------
 ${GREEN_FONT_PREFIX} 4.${FONT_COLOR_SUFFIX} 启动
 ${GREEN_FONT_PREFIX} 5.${FONT_COLOR_SUFFIX} 停止
 ${GREEN_FONT_PREFIX} 6.${FONT_COLOR_SUFFIX} 重启
----------
 ${GREEN_FONT_PREFIX} 7.${FONT_COLOR_SUFFIX} 设置 配置信息
 ${GREEN_FONT_PREFIX} 8.${FONT_COLOR_SUFFIX} 查看 配置信息
 ${GREEN_FONT_PREFIX} 9.${FONT_COLOR_SUFFIX} 查看 日志信息
 ${GREEN_FONT_PREFIX}10.${FONT_COLOR_SUFFIX} 查看 链接信息\n"
	if [[ -e "${FILE}" ]]; then
		_CHECK_INFO "PID"
		if [[ ! -z "${PID}" ]]; then
			echo -e " 当前状态: ${GREEN_FONT_PREFIX}已安装${FONT_COLOR_SUFFIX} 并 ${GREEN_FONT_PREFIX}已启动${FONT_COLOR_SUFFIX}"
		else
			echo -e " 当前状态: ${GREEN_FONT_PREFIX}已安装${FONT_COLOR_SUFFIX} 但 ${RED_FONT_PREFIX}未启动${FONT_COLOR_SUFFIX}"
		fi
	else
		echo -e " 当前状态: ${RED_FONT_PREFIX}未安装${FONT_COLOR_SUFFIX}"
	fi
	echo
	read -e -p " 请输入数字 [0-10]:" num
	case "$num" in
		0)
		_UPDATE_SHELL
		;;
		1)
		_INSTALL
		;;
		2)
		_UPDATE
		;;
		3)
		_UNINSTALL
		;;
		4)
		_START
		;;
		5)
		_STOP
		;;
		6)
		_RESTART
		;;
		7)
		_SET
		;;
		8)
		_VIEW
		;;
		9)
		_VIEW_LOG
		;;
		10)
		_VIEW_CONNECTION_INFO
		;;
		*)
		echo "请输入正确数字 [0-10]"
		;;
	esac
