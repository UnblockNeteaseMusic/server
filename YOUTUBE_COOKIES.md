# YouTube Cookies 认证配置指南

YouTube 现在需要 cookies 认证才能正常工作。有两种方式配置：

## 方式 1：使用 Cookies 文件（推荐）

### 步骤 1：导出 YouTube Cookies

**使用浏览器扩展：**
1. 安装扩展：
   - Chrome/Edge: [Get cookies.txt LOCALLY](https://chrome.google.com/webstore/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc)
   - Firefox: [cookies.txt](https://addons.mozilla.org/firefox/addon/cookies-txt/)

2. 打开 [YouTube.com](https://www.youtube.com) 并登录你的账号
3. 点击扩展图标，选择 "Export" 
4. 保存为 `youtube-cookies.txt`

### 步骤 2：Docker 部署时挂载 Cookies

```bash
docker run -d \
  -p 8080:8080 \
  -v /path/to/youtube-cookies.txt:/app/youtube-cookies.txt \
  dengle456/unblockneteasemusic:latest
```

**或者使用环境变量指定路径：**

```bash
docker run -d \
  -p 8080:8080 \
  -v /path/to/youtube-cookies.txt:/cookies/youtube.txt \
  -e YOUTUBE_COOKIES_PATH=/cookies/youtube.txt \
  dengle456/unblockneteasemusic:latest
```

## 方式 2：直接从浏览器读取（简单但有限制）

**使用环境变量指定浏览器：**

```bash
docker run -d \
  -p 8080:8080 \
  -e YOUTUBE_BROWSER=chrome \
  -v ~/.config/google-chrome:/root/.config/google-chrome:ro \
  dengle456/unblockneteasemusic:latest
```

**支持的浏览器：**
- `chrome` - Google Chrome
- `firefox` - Mozilla Firefox  
- `edge` - Microsoft Edge
- `safari` - Safari (仅 macOS)

**注意：**
- 需要挂载浏览器的配置目录
- Chrome: `~/.config/google-chrome` (Linux) 或 `~/Library/Application Support/Google/Chrome` (macOS)
- Firefox: `~/.mozilla/firefox` (Linux)

## 方式 3：禁用 YouTube（最简单）

如果不想配置 cookies，可以禁用 YouTube 音源：

编辑 `src/consts.js`：
```javascript
const DEFAULT_SOURCE = ['meting', 'tmetu']; // 移除 youtube
```

## 验证 Cookies 是否生效

启动容器后查看日志：

```bash
docker logs -f <容器ID>
```

如果看到：
```
INFO: (provider/youtube) [YouTube] Configuration
    useCookies: true
    cookiesPath: "/app/youtube-cookies.txt"
```

说明 cookies 已加载。

## 故障排除

### 问题 1：仍然提示 "Sign in to confirm you're not a bot"

**原因：** Cookies 文件格式不正确或已过期

**解决：**
1. 重新导出 cookies（确保登录 YouTube）
2. 检查 cookies 文件格式（Netscape HTTP Cookie File 格式）
3. Cookies 会过期，需要定期更新

### 问题 2：容器找不到 cookies 文件

**原因：** 挂载路径不正确

**解决：**
```bash
# 检查文件是否存在
docker exec <容器ID> ls -la /app/youtube-cookies.txt

# 如果不存在，检查挂载命令
```

### 问题 3：使用浏览器模式失败

**原因：** 浏览器配置目录没有正确挂载或权限问题

**解决：** 改用 cookies 文件方式（方式 1）

## Cookies 文件示例格式

```
# Netscape HTTP Cookie File
.youtube.com	TRUE	/	TRUE	1234567890	CONSENT	YES+1
.youtube.com	TRUE	/	FALSE	1234567890	VISITOR_INFO1_LIVE	xxxxx
```

## 推荐配置

如果你只是想要备用音源，建议：

```javascript
// 将 YouTube 作为最后备选
const DEFAULT_SOURCE = ['meting', 'tmetu', 'youtube'];
```

这样：
- 大部分歌曲通过 meting/tmetu 获取（更快）
- YouTube 仅在前两个失败时使用
- 减少 YouTube API 调用次数
