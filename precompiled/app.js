/*! For license information please see app.js.LICENSE.txt */
(()=>{var __webpack_modules__={9220:(module,exports,__webpack_require__)=>{"use strict"
Object.defineProperty(exports,"__esModule",{value:!0}),__webpack_require__(7006),__webpack_require__(2845),__webpack_require__(8750),__webpack_require__(6291),__webpack_require__(4255),__webpack_require__(3295),__webpack_require__(9212),__webpack_require__(6085),__webpack_require__(7524),__webpack_require__(9139),__webpack_require__(2703),__webpack_require__(8144),__webpack_require__(1320),__webpack_require__(2095),__webpack_require__(705),__webpack_require__(4261),__webpack_require__(9038),__webpack_require__(4371),__webpack_require__(7735),__webpack_require__(3050),__webpack_require__(6379),__webpack_require__(2895),__webpack_require__(9189),__webpack_require__(6899),__webpack_require__(1090),__webpack_require__(264),__webpack_require__(139),__webpack_require__(3035),__webpack_require__(8760)
const{EventEmitter}=__webpack_require__(2361),{logScope}=__webpack_require__(7691),logger=logScope("cache"),CacheStorageEvents={CLEANUP:"cs@cleanup"}
class CacheStorage extends EventEmitter{id="Default Cache Storage"
cacheMap=new Map
aliveDuration=18e5
constructor(id){super(),id&&(this.id=id),this.on(CacheStorageEvents.CLEANUP,(async()=>this.removeExpiredCache()))}get WillExpireAt(){return Date.now()+this.aliveDuration}getLoggerContext(customContext={}){return{...customContext,cacheStorageId:this.id}}removeExpiredCache(){logger.debug(this.getLoggerContext(),"Cleaning up the expired caches..."),this.cacheMap.forEach(((cachedData,key)=>{cachedData.expireAt<=Date.now()&&this.cacheMap.delete(key)}))}async cache(key,action,expireAt){if("true"===process.env.NO_CACHE)return action()
this.emit(CacheStorageEvents.CLEANUP)
const cachedData=this.cacheMap.get(key),logKey="object"==typeof key?"Something":key,logCtx=this.getLoggerContext({logKey})
if(cachedData)return logger.debug(logCtx,`${logKey} hit!`),cachedData.data
logger.debug(logCtx,`${logKey} did not hit. Storing the execution result...`)
const sourceResponse=await action()
return this.cacheMap.set(key,{data:sourceResponse,expireAt:new Date(expireAt||this.WillExpireAt)}),sourceResponse}}class CacheStorageGroup{static instance=void 0
cacheStorages=new Set
constructor(){}static getInstance(){return CacheStorageGroup.instance||(CacheStorageGroup.instance=new CacheStorageGroup),CacheStorageGroup.instance}cleanup(){this.cacheStorages.forEach((storage=>storage.removeExpiredCache()))}}const csgInstance=CacheStorageGroup.getInstance()
module.exports={CacheStorage,CacheStorageEvents,CacheStorageGroup,getManagedCacheStorage:function(id){const cs=new CacheStorage(id)
return csgInstance.cacheStorages.add(cs),cs}}},2188:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const EventEmitter=__webpack_require__(2361)
module.exports={CancelRequest:class extends EventEmitter{cancelled=!1
cancel(){this.cancelled=!0,this.emit("cancel")}},ON_CANCEL:"cancel"}},5796:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const cli={width:80,_program:{},_options:[],program:(information={})=>(cli._program=information,cli),option:(flags,addition={})=>(flags=Array.isArray(flags)?flags:[flags],addition.dest=addition.dest||flags.slice(-1)[0].toLowerCase().replace(/^-+/,"").replace(/-[a-z]/g,(character=>character.slice(1).toUpperCase())),addition.help=addition.help||{help:"output usage information",version:"output the version number"}[addition.action],cli._options.push(Object.assign(addition,{flags,positional:!flags[0].startsWith("-")})),cli),parse:argv=>{const positionals=cli._options.map(((option,index)=>option.positional?index:null)).filter((index=>null!==index)),optionals={}
cli._options.forEach(((option,index)=>option.positional?null:option.flags.forEach((flag=>optionals[flag]=index)))),cli._program.name=cli._program.name||__webpack_require__(1017).parse(argv[1]).base
const args=argv.slice(2).reduce(((result,part)=>/^-[^-]/.test(part)?result.concat(part.slice(1).split("").map((string=>"-"+string))):result.concat(part)),[])
let pointer=0
for(;pointer<args.length;){let value=null
const part=args[pointer],index=part.startsWith("-")?optionals[part]:positionals.shift()
void 0===index&&(part.startsWith("-")?error(`no such option: ${part}`):error(`extra arguments found: ${part}`)),part.startsWith("-")&&(pointer+=1)
const{action}=cli._options[index]
if(["help","version"].includes(action))"help"===action?help():"version"===action&&version()
else if(["store_true","store_false"].includes(action))value="store_true"===action
else{const gap=args.slice(pointer).findIndex((part=>part in optionals)),next=-1===gap?args.length:pointer+gap
value=args.slice(pointer,next),0===value.length&&(cli._options[index].positional?error(`the following arguments are required: ${part}`):"+"===cli._options[index].nargs?error(`argument ${part}: expected at least one argument`):error(`argument ${part}: expected one argument`)),"+"!==cli._options[index].nargs?(value=value[0],pointer+=1):pointer=next}cli[cli._options[index].dest]=value}return positionals.length&&error(`the following arguments are required: ${positionals.map((index=>cli._options[index].flags[0])).join(", ")}`),cli}},pad=length=>new Array(length+1).join(" "),usage=()=>{const options=cli._options.map((option=>{const flag=option.flags.sort(((a,b)=>a.length-b.length))[0],name=option.metavar||option.dest
return option.positional?"+"===option.nargs?`${name} [${name} ...]`:`${name}`:["store_true","store_false","help","version"].includes(option.action)?`[${flag}]`:"+"===option.nargs?`[${flag} ${name} [${name} ...]]`:`[${flag} ${name}]`})),maximum=cli.width,title=`usage: ${cli._program.name}`,lines=[title]
options.map((name=>" "+name)).forEach((option=>{lines[lines.length-1].length+option.length<maximum?lines[lines.length-1]+=option:lines.push(pad(title.length)+option)})),console.log(lines.join("\n"))},help=()=>{usage()
const positionals=cli._options.filter((option=>option.positional)).map((option=>[option.metavar||option.dest,option.help])),optionals=cli._options.filter((option=>!option.positional)).map((option=>{const{flags}=option,name=option.metavar||option.dest
let use
return use=["store_true","store_false","help","version"].includes(option.action)?flags.map((flag=>`${flag}`)).join(", "):"+"===option.nargs?flags.map((flag=>`${flag} ${name} [${name} ...]`)).join(", "):flags.map((flag=>`${flag} ${name}`)).join(", "),[use,option.help]}))
let align=Math.max.apply(null,positionals.concat(optionals).map((option=>option[0].length)))
align=align>30?30:align
const rest=cli.width-align-4,publish=option=>{const slice=string=>Array.from(Array(Math.ceil(string.length/rest)).keys()).map((index=>string.slice(index*rest,(index+1)*rest))).join("\n"+pad(align+4))
option[0].length<align?console.log(`  ${option[0]}${pad(align-option[0].length)}  ${slice(option[1])}`):console.log(`  ${option[0]}\n${pad(align+4)}${slice(option[1])}`)}
positionals.length&&console.log("\npositional arguments:"),positionals.forEach(publish),optionals.length&&console.log("\noptional arguments:"),optionals.forEach(publish),process.exit()},version=()=>{console.log(cli._program.version),process.exit()},error=message=>{usage(),console.log(cli._program.name+":","error:",message),process.exit(1)}
module.exports=cli},1784:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const PROVIDERS={qq:__webpack_require__(9878),kugou:__webpack_require__(4840),kuwo:__webpack_require__(3081),migu:__webpack_require__(1549),joox:__webpack_require__(9788),youtube:__webpack_require__(8396),ytdownload:__webpack_require__(9588),youtubedl:__webpack_require__(4396),ytdlp:__webpack_require__(8965),bilibili:__webpack_require__(8573),pyncmd:__webpack_require__(2085)}
module.exports={DEFAULT_SOURCE:["kugou","kuwo","migu","bilibili","ytdlp"],PROVIDERS}},743:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const crypto=__webpack_require__(6113),parse=__webpack_require__(7310).parse,bodyify=__webpack_require__(3477).stringify,decrypt=(buffer,key)=>{const decipher=crypto.createDecipheriv("aes-128-ecb",key,null)
return Buffer.concat([decipher.update(buffer),decipher.final()])},encrypt=(buffer,key)=>{const cipher=crypto.createCipheriv("aes-128-ecb",key,null)
return Buffer.concat([cipher.update(buffer),cipher.final()])}
module.exports={eapi:{encrypt:buffer=>encrypt(buffer,"e82ckenh8dichen8"),decrypt:buffer=>decrypt(buffer,"e82ckenh8dichen8"),encryptRequest:(url,object)=>{url=parse(url)
const text=JSON.stringify(object),message=`nobody${url.path}use${text}md5forencrypt`,digest=crypto.createHash("md5").update(message).digest("hex"),data=`${url.path}-36cd479b6b5-${text}-36cd479b6b5-${digest}`
return{url:url.href.replace(/\w*api/,"eapi"),body:bodyify({params:module.exports.eapi.encrypt(Buffer.from(data)).toString("hex").toUpperCase()})}}},linuxapi:{encrypt:buffer=>encrypt(buffer,"rFgB&h#%2?^eDg:Q"),decrypt:buffer=>decrypt(buffer,"rFgB&h#%2?^eDg:Q"),encryptRequest:(url,object)=>{url=parse(url)
const text=JSON.stringify({method:"POST",url:url.href,params:object})
return{url:url.resolve("/api/linux/forward"),body:bodyify({eparams:module.exports.linuxapi.encrypt(Buffer.from(text)).toString("hex").toUpperCase()})}}},miguapi:{encryptBody:object=>{const text=JSON.stringify(object),password=Buffer.from(crypto.randomBytes(32).toString("hex")),salt=crypto.randomBytes(8),secret=((password,salt,keyLength,ivSize)=>{salt=salt||Buffer.alloc(0)
const keySize=keyLength/8,repeat=Math.ceil((keySize+8*ivSize)/32),buffer=Buffer.concat(Array(repeat).fill(null).reduce((result=>result.concat(crypto.createHash("md5").update(Buffer.concat([result.slice(-1)[0],password,salt])).digest())),[Buffer.alloc(0)]))
return{key:buffer.slice(0,keySize),iv:buffer.slice(keySize,keySize+ivSize)}})(password,salt,256,16),cipher=crypto.createCipheriv("aes-256-cbc",secret.key,secret.iv)
return bodyify({data:Buffer.concat([Buffer.from("Salted__"),salt,cipher.update(Buffer.from(text)),cipher.final()]).toString("base64"),secKey:crypto.publicEncrypt({key:"-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8asrfSaoOb4je+DSmKdriQJKWVJ2oDZrs3wi5W67m3LwTB9QVR+cE3XWU21Nx+YBxS0yun8wDcjgQvYt625ZCcgin2ro/eOkNyUOTBIbuj9CvMnhUYiR61lC1f1IGbrSYYimqBVSjpifVufxtx/I3exReZosTByYp4Xwpb1+WAQIDAQAB\n-----END PUBLIC KEY-----",padding:crypto.constants.RSA_PKCS1_PADDING},password).toString("base64")})}},base64:{encode:(text,charset)=>Buffer.from(text,charset).toString("base64").replace(/\+/g,"-").replace(/\//g,"_"),decode:(text,charset)=>Buffer.from(text.replace(/-/g,"+").replace(/_/g,"/"),"base64").toString(charset)},uri:{retrieve:id=>{id=id.toString().trim()
const key="3go8&$8*3*3h0k(2)2",string=Array.from(Array(id.length).keys()).map((index=>String.fromCharCode(id.charCodeAt(index)^key.charCodeAt(index%key.length)))).join("")
return`http://p1.music.126.net/${crypto.createHash("md5").update(string).digest("base64").replace(/\//g,"_").replace(/\+/g,"-")}/${id}`}},md5:{digest:value=>crypto.createHash("md5").update(value).digest("hex"),pipe:source=>new Promise(((resolve,reject)=>{const digest=crypto.createHash("md5").setEncoding("hex")
source.pipe(digest).on("error",(error=>reject(error))).once("finish",(()=>resolve(digest.read())))}))}}
try{module.exports.kuwoapi=__webpack_require__(5477)}catch(e){}},312:module=>{"use strict"
class IncompleteAudioData extends Error{constructor(details){super(`The audio data is incomplete: ${details}`),this.name="IncompleteAudioData"}}module.exports=IncompleteAudioData},3942:module=>{"use strict"
class ProcessExitNotSuccessfully extends Error{constructor(process,exitCode){super(`${process} exited with ${exitCode}, which is not zero.`),this.process=process,this.exitCode=exitCode,this.name="ProcessExitNotSuccessfully"}}module.exports=ProcessExitNotSuccessfully},4113:module=>{"use strict"
class RequestCancelled extends Error{constructor(url){super(`This request URL has been cancelled: ${url}`),this.name="RequestCancelled"}}module.exports=RequestCancelled},6014:module=>{"use strict"
class RequestFailed extends Error{constructor(url,code){super(`Failed to get the response. Status code: ${code}`),this.url=url,this.code=code,this.name="RequestFailed"}}module.exports=RequestFailed},9057:module=>{"use strict"
class SongNotAvailable extends Error{constructor(source,song="?"){super(`This song "${song}" is not available in ${source}`),this.name="SongNotAvailable"}}module.exports=SongNotAvailable},5467:module=>{"use strict"
class YoutubeDlInvalidResponse extends Error{constructor(response){super("The response of youtube-dl is malformed."),this.name="YoutubeDlInvalidResponse",this.response=response}}module.exports=YoutubeDlInvalidResponse},58:module=>{"use strict"
class YoutubeDlNotInstalled extends Error{constructor(){super('You must install "youtube-dl" before using the "youtubedl" source.'),this.name="YoutubeDlNotInstalled"}}module.exports=YoutubeDlNotInstalled},2962:module=>{"use strict"
class YtDlpInvalidResponse extends Error{constructor(response){super("The response of yt-dlp is malformed."),this.name="YtDlpInvalidResponse",this.response=response}}module.exports=YtDlpInvalidResponse},8761:module=>{"use strict"
class YtDlpNotInstalled extends Error{constructor(){super('You must install "yt-dlp" before using the "ytdlp" source.'),this.name="YtDlpNotInstalled"}}module.exports=YtDlpNotInstalled},403:(module,exports,__webpack_require__)=>{"use strict"
Object.defineProperty(exports,"__esModule",{value:!0}),__webpack_require__(2095),__webpack_require__(705),__webpack_require__(4261),__webpack_require__(9038),__webpack_require__(4371),__webpack_require__(7735),__webpack_require__(3050),__webpack_require__(6379),__webpack_require__(2895),__webpack_require__(9189),__webpack_require__(6899),__webpack_require__(1090),__webpack_require__(264),__webpack_require__(139),__webpack_require__(3035),__webpack_require__(8760)
const parse=__webpack_require__(7310).parse,crypto=__webpack_require__(743),request=__webpack_require__(5262),match=__webpack_require__(886),querystring=__webpack_require__(3477),{isHost}=__webpack_require__(5157),{getManagedCacheStorage}=__webpack_require__(9220),{logScope}=__webpack_require__(7691),logger=logScope("hook"),cs=getManagedCacheStorage("hook")
cs.aliveDuration=6048e5
const ENABLE_LOCAL_VIP="true"===(process.env.ENABLE_LOCAL_VIP||"").toLowerCase(),hook={request:{before:()=>{},after:()=>{}},connect:{before:()=>{}},negotiate:{before:()=>{}},target:{host:new Set,path:new Set}}
hook.target.host=new Set(["music.163.com","interface.music.163.com","interface3.music.163.com","apm.music.163.com","apm3.music.163.com","musicupload.netease.com"]),hook.target.path=new Set(["/api/v3/playlist/detail","/api/v3/song/detail","/api/v6/playlist/detail","/api/album/play","/api/artist/privilege","/api/album/privilege","/api/v1/artist","/api/v1/artist/songs","/api/artist/top/song","/api/v1/album","/api/album/v3/detail","/api/playlist/privilege","/api/song/enhance/player/url","/api/song/enhance/player/url/v1","/api/song/enhance/download/url","/api/song/enhance/privilege","/batch","/api/batch","/api/listen/together/privilege/get","/api/v1/search/get","/api/v1/search/song/get","/api/search/complex/get","/api/cloudsearch/pc","/api/v1/playlist/manipulate/tracks","/api/song/like","/api/v1/play/record","/api/playlist/v4/detail","/api/v1/radio/get","/api/v1/discovery/recommend/songs","/api/usertool/sound/mobile/promote","/api/usertool/sound/mobile/theme","/api/usertool/sound/mobile/animationList","/api/usertool/sound/mobile/all","/api/usertool/sound/mobile/detail"])
const domainList=["music.163.com","music.126.net","iplay.163.com","look.163.com","y.163.com"]
hook.request.before=ctx=>{const{req}=ctx
req.url=(req.url.startsWith("http://")?"":(req.socket.encrypted?"https:":"http:")+"//"+(domainList.some((domain=>(req.headers.host||"").endsWith(domain)))?req.headers.host:null))+req.url
const url=parse(req.url)
if([url.hostname,req.headers.host].some((host=>isHost(host,"music.163.com")))&&(ctx.decision="proxy"),[url.hostname,req.headers.host].some((host=>hook.target.host.has(host)))&&"POST"===req.method&&("/api/linux/forward"===url.path||url.path.startsWith("/eapi/")))return request.read(req).then((body=>req.body=body)).then((body=>{if("x-napm-retry"in req.headers&&delete req.headers["x-napm-retry"],req.headers["X-Real-IP"]="118.88.88.88",!req.url.includes("stream")&&body){let data
const netease={}
if(netease.pad=(body.match(/%0+$/)||[""])[0],netease.forward="/api/linux/forward"===url.path,netease.forward?(data=JSON.parse(crypto.linuxapi.decrypt(Buffer.from(body.slice(8,body.length-netease.pad.length),"hex")).toString()),netease.path=parse(data.url).path,netease.param=data.params):(data=crypto.eapi.decrypt(Buffer.from(body.slice(7,body.length-netease.pad.length),"hex")).toString().split("-36cd479b6b5-"),netease.path=data[0],netease.param=JSON.parse(data[1])),netease.path=netease.path.replace(/\/\d*$/,""),ctx.netease=netease,"/api/song/enhance/download/url"===netease.path)return pretendPlay(ctx)}})).catch((error=>error&&logger.error(error,`A error occurred in hook.request.before when hooking ${req.url}.`)))
if(hook.target.host.has(url.hostname)&&(url.path.startsWith("/weapi/")||url.path.startsWith("/api/")))req.headers["X-Real-IP"]="118.88.88.88",ctx.netease={web:!0,path:url.path.replace(/^\/weapi\//,"/api/").split("?").shift().replace(/\/\d*$/,"")}
else if(req.url.includes("package"))try{const data=req.url.split("package/").pop().split("/"),url1=parse(crypto.base64.decode(data[0])),id=data[1].replace(/\.\w+/,"")
req.url=url1.href,req.headers.host=url1.hostname,req.headers.cookie=null,ctx.package={id},ctx.decision="proxy"}catch(error){ctx.error=error,ctx.decision="close"}},hook.request.after=ctx=>{const{req,proxyRes,netease,package:pkg}=ctx
if("tyst.migu.cn"===req.headers.host&&proxyRes.headers["content-range"]&&200===proxyRes.statusCode&&(proxyRes.statusCode=206),netease&&hook.target.path.has(netease.path)&&200===proxyRes.statusCode)return request.read(proxyRes,!0).then((buffer=>buffer.length?proxyRes.body=buffer:Promise.reject())).then((buffer=>{const patch=string=>string.replace(/([^\\]"\s*:\s*)(\d{16,})(\s*[}|,])/g,'$1"$2L"$3')
try{netease.encrypted=!1,netease.jsonBody=JSON.parse(patch(buffer.toString()))}catch(error){if(netease.encrypted=!0,netease.jsonBody=JSON.parse(patch(crypto.eapi.decrypt(buffer).toString())),ENABLE_LOCAL_VIP&&("/batch"===netease.path||"/api/batch"===netease.path)){var info=netease.jsonBody["/api/music-vip-membership/client/vip/info"]
if(info)try{const expireTime=info.data.now+316224e5
info.data.redVipLevel=7,info.data.redVipAnnualCount=1,info.data.musicPackage.expireTime=expireTime,info.data.musicPackage.vipCode=230,info.data.associator.expireTime=expireTime,netease.jsonBody["/api/music-vip-membership/client/vip/info"]=info}catch(error1){logger.debug("Unable to apply the local VIP.")}}}if(new Set([401,512]).has(netease.jsonBody.code)&&!netease.web){if(netease.path.includes("manipulate"))return tryCollect(ctx)
if("/api/song/like"===netease.path)return tryLike(ctx)}else{if(netease.path.includes("url"))return tryMatch(ctx)
if(netease.path.includes("/usertool/sound/"))return unblockSoundEffects(netease.jsonBody)
if(netease.path.includes("batch"))for(const key in netease.jsonBody)key.includes("/usertool/sound/")&&unblockSoundEffects(netease.jsonBody[key])}})).then((()=>{["transfer-encoding","content-encoding","content-length"].filter((key=>key in proxyRes.headers)).forEach((key=>delete proxyRes.headers[key]))
let body=JSON.stringify(netease.jsonBody,((key,value)=>("object"==typeof value&&null!=value&&("cp"in value&&(value.cp=1),"dl"in value&&"downloadMaxbr"in value&&value.dl<value.downloadMaxbr&&(value.dl=value.downloadMaxbr),"fee"in value&&(value.fee=0),"pl"in value&&"playMaxbr"in value&&value.pl<value.playMaxbr&&(value.pl=value.playMaxbr),"sp"in value&&"st"in value&&"subp"in value&&(value.sp=7,value.st=0,value.subp=1),"start"in value&&"end"in value&&"playable"in value&&"unplayableType"in value&&"unplayableUserIds"in value&&(value.start=0,value.end=0,value.playable=!0,value.unplayableType="unknown",value.unplayableUserIds=[])),value)))
body=body.replace(/([^\\]"\s*:\s*)"(\d{16,})L"(\s*[}|,])/g,"$1$2$3"),proxyRes.body=netease.encrypted?crypto.eapi.encrypt(Buffer.from(body)):body})).catch((error=>error&&logger.error(error,`A error occurred in hook.request.after when hooking ${req.url}.`)))
if(pkg){if(new Set([201,301,302,303,307,308]).has(proxyRes.statusCode))return request(req.method,parse(req.url).resolve(proxyRes.headers.location),req.headers).then((response=>ctx.proxyRes=response));/p\d+c*\.music\.126\.net/.test(req.url)&&(proxyRes.headers["content-type"]="audio/*")}},hook.connect.before=ctx=>{const{req}=ctx,url=parse("https://"+req.url);[url.hostname,req.headers.host].some((host=>hook.target.host.has(host)))?80===parseInt(url.port)?(req.url=`${global.address||"localhost"}:${global.port[0]}`,req.local=!0):global.port[1]?(req.url=`${global.address||"localhost"}:${global.port[1]}`,req.local=!0):ctx.decision="blank":url.href.includes(global.endpoint)&&(ctx.decision="proxy")},hook.negotiate.before=ctx=>{const{req,socket,decision}=ctx,url=parse("https://"+req.url),target=hook.target.host
req.local||decision||target.has(socket.sni)&&!target.has(url.hostname)&&(target.add(url.hostname),ctx.decision="blank")}
const pretendPlay=ctx=>{const{req,netease}=ctx,turn="http://music.163.com/api/song/enhance/player/url"
let query
if(netease.forward){const{id,br}=netease.param
netease.param={ids:`["${id}"]`,br},query=crypto.linuxapi.encryptRequest(turn,netease.param)}else{const{id:id1,br:br1,e_r,header}=netease.param
netease.param={ids:`["${id1}"]`,br:br1,e_r,header},query=crypto.eapi.encryptRequest(turn,netease.param)}req.url=query.url,req.body=query.body+netease.pad},tryCollect=ctx=>{const{req,netease}=ctx,{trackIds,pid,op}=netease.param,trackId=(Array.isArray(trackIds)?trackIds:JSON.parse(trackIds))[0]
return request("POST","http://music.163.com/api/playlist/manipulate/tracks",req.headers,`trackIds=[${trackId},${trackId}]&pid=${pid}&op=${op}`).then((response=>response.json())).then((jsonBody=>{netease.jsonBody=jsonBody})).catch((e=>e&&logger.error(e)))},tryLike=ctx=>{const{req,netease}=ctx,{trackId}=netease.param
let pid=0,userId=0
return request("GET","http://music.163.com/api/v1/user/info",req.headers).then((response=>response.json())).then((jsonBody=>(userId=jsonBody.userPoint.userId,request("GET",`http://music.163.com/api/user/playlist?uid=${userId}&limit=1`,req.headers).then((response=>response.json()))))).then((jsonBody=>(pid=jsonBody.playlist[0].id,request("POST","http://music.163.com/api/playlist/manipulate/tracks",req.headers,`trackIds=[${trackId},${trackId}]&pid=${pid}&op=add`).then((response=>response.json()))))).then((jsonBody=>{new Set([200,502]).has(jsonBody.code)&&(netease.jsonBody={code:200,playlistId:pid})})).catch((e=>e&&logger.error(e)))},tryMatch=ctx=>{const{req,netease}=ctx,{jsonBody}=netease,min_br=Number(process.env.MIN_BR)||0
let tasks,target=0
const inject=item=>{if(item.flag=0,(200!==item.code||item.freeTrialInfo||item.br<min_br)&&(0===target||item.id===target))return match(item.id).then((song=>{let os=""
try{let{header}=netease.param
header="string"==typeof header?JSON.parse(header):header
const cookie=querystring.parse(req.headers.cookie.replace(/\s/g,""),";")
os=header.os||cookie.os}catch(e){}return item.type=999e3===song.br?"flac":"mp3",item.url="pc"===os||"uwp"===os?global.endpoint?`${global.endpoint.replace("https://","http://")}/package/${crypto.base64.encode(song.url)}/${item.id}.${item.type}`:song.url:global.endpoint?`${global.endpoint}/package/${crypto.base64.encode(song.url)}/${item.id}.${item.type}`:song.url,item.md5=song.md5||crypto.md5.digest(song.url),item.br=song.br||128e3,item.size=song.size,item.code=200,item.freeTrialInfo=null,song})).then((song=>{if(!netease.path.includes("download")||song.md5)return
const limit={android:"0.0.0",osx:"0.0.0"},task={key:song.url.replace(/\?.*$/,"").replace(/(?<=kugou\.com\/)\w+\/\w+\//,"").replace(/(?<=kuwo\.cn\/)\w+\/\w+\/resource\//,""),url:song.url}
try{let{header}=netease.param
header="string"==typeof header?JSON.parse(header):header
const cookie=querystring.parse(req.headers.cookie.replace(/\s/g,""),";"),os=header.os||cookie.os,version=header.appver||cookie.appver
if(os in limit&&((base,target)=>{const difference=Array.from([base,target]).map((version=>version.split(".").slice(0,3).map((number=>parseInt(number)||0)))).reduce(((aggregation,current)=>aggregation.length?aggregation.map(((element,index)=>element.concat(current[index]))):current.map((element=>[element]))),[]).filter((pair=>pair[0]!==pair[1]))[0]
return!difference||difference[0]<=difference[1]})(limit[os],version))return cs.cache(task,(()=>(task=>request("GET",task.url).then((response=>crypto.md5.pipe(response))))(task))).then((value=>item.md5=value))}catch(e){}})).catch((e=>e&&logger.error(e)))
200===item.code&&netease.web&&(item.url=item.url.replace(/(m\d+?)(?!c)\.music\.126\.net/,"$1c.music.126.net"))}
return Array.isArray(jsonBody.data)?netease.path.includes("download")?(jsonBody.data=jsonBody.data[0],tasks=[inject(jsonBody.data)]):(target=netease.web?0:parseInt(((Array.isArray(netease.param.ids)?netease.param.ids:JSON.parse(netease.param.ids))[0]||0).toString().replace("_0","")),tasks=jsonBody.data.map((item=>inject(item)))):tasks=[inject(jsonBody.data)],Promise.all(tasks).catch((e=>e&&logger.error(e)))},unblockSoundEffects=obj=>{logger.debug("unblockSoundEffects() has been triggered.")
const{data,code}=obj
200===code&&(Array.isArray(data)?data.map((item=>{item.type&&(item.type=1)})):data.type&&(data.type=1))}
module.exports=hook},5477:module=>{"use strict"
const Long=n=>{const bN=BigInt(n)
return{low:Number(bN),valueOf:()=>bN.valueOf(),toString:()=>bN.toString(),not:()=>Long(~bN),isNegative:()=>bN<0,or:x=>Long(bN|BigInt(x)),and:x=>Long(bN&BigInt(x)),xor:x=>Long(bN^BigInt(x)),equals:x=>bN===BigInt(x),multiply:x=>Long(bN*BigInt(x)),shiftLeft:x=>Long(bN<<BigInt(x)),shiftRight:x=>Long(bN>>BigInt(x))}},range=n=>Array.from(new Array(n).keys()),LongArray=(...array)=>array.map((n=>-1===n?Long(-1,-1):Long(n))),arrayE=LongArray(31,0,1,2,3,4,-1,-1,3,4,5,6,7,8,-1,-1,7,8,9,10,11,12,-1,-1,11,12,13,14,15,16,-1,-1,15,16,17,18,19,20,-1,-1,19,20,21,22,23,24,-1,-1,23,24,25,26,27,28,-1,-1,27,28,29,30,31,30,-1,-1),arrayIP=LongArray(57,49,41,33,25,17,9,1,59,51,43,35,27,19,11,3,61,53,45,37,29,21,13,5,63,55,47,39,31,23,15,7,56,48,40,32,24,16,8,0,58,50,42,34,26,18,10,2,60,52,44,36,28,20,12,4,62,54,46,38,30,22,14,6),arrayIP_1=LongArray(39,7,47,15,55,23,63,31,38,6,46,14,54,22,62,30,37,5,45,13,53,21,61,29,36,4,44,12,52,20,60,28,35,3,43,11,51,19,59,27,34,2,42,10,50,18,58,26,33,1,41,9,49,17,57,25,32,0,40,8,48,16,56,24),arrayLs=[1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1],arrayLsMask=LongArray(0,1048577,3145731),arrayMask=range(64).map((n=>{return base=2,Array(n).fill(null).reduce((result=>result.multiply(base)),Long(1))
var base}))
arrayMask[arrayMask.length-1]=arrayMask[arrayMask.length-1].multiply(-1)
const arrayP=LongArray(15,6,19,20,28,11,27,16,0,14,22,25,4,17,30,9,1,7,23,13,31,26,2,8,18,12,29,5,21,10,3,24),arrayPC_1=LongArray(56,48,40,32,24,16,8,0,57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,60,52,44,36,28,20,12,4,27,19,11,3),arrayPC_2=LongArray(13,16,10,23,0,4,-1,-1,2,27,14,5,20,9,-1,-1,22,18,11,3,25,7,-1,-1,15,6,26,19,12,1,-1,-1,40,51,30,36,46,54,-1,-1,29,39,50,44,32,47,-1,-1,43,48,38,55,33,52,-1,-1,45,41,49,35,28,31,-1,-1),matrixNSBox=[[14,4,3,15,2,13,5,3,13,14,6,9,11,2,0,5,4,1,10,12,15,6,9,10,1,8,12,7,8,11,7,0,0,15,10,5,14,4,9,10,7,8,12,3,13,1,3,6,15,12,6,11,2,9,5,0,4,2,11,14,1,7,8,13],[15,0,9,5,6,10,12,9,8,7,2,12,3,13,5,2,1,14,7,8,11,4,0,3,14,11,13,6,4,1,10,15,3,13,12,11,15,3,6,0,4,10,1,7,8,4,11,14,13,8,0,6,2,15,9,5,7,1,10,12,14,2,5,9],[10,13,1,11,6,8,11,5,9,4,12,2,15,3,2,14,0,6,13,1,3,15,4,10,14,9,7,12,5,0,8,7,13,1,2,4,3,6,12,11,0,13,5,14,6,8,15,2,7,10,8,15,4,9,11,5,9,0,14,3,10,7,1,12],[7,10,1,15,0,12,11,5,14,9,8,3,9,7,4,8,13,6,2,1,6,11,12,2,3,0,5,14,10,13,15,4,13,3,4,9,6,10,1,12,11,0,2,5,0,13,14,2,8,15,7,4,15,1,10,7,5,6,12,11,3,8,9,14],[2,4,8,15,7,10,13,6,4,1,3,12,11,7,14,0,12,2,5,9,10,13,0,3,1,11,15,5,6,8,9,14,14,11,5,6,4,1,3,10,2,12,15,0,13,2,8,5,11,8,0,15,7,14,9,4,12,7,10,9,1,13,6,3],[12,9,0,7,9,2,14,1,10,15,3,4,6,12,5,11,1,14,13,0,2,8,7,13,15,5,4,10,8,3,11,6,10,4,6,11,7,9,0,6,4,2,13,1,9,15,3,8,15,3,1,14,12,5,11,0,2,12,14,7,5,10,8,13],[4,1,3,10,15,12,5,0,2,11,9,6,8,7,6,9,11,4,12,15,0,3,10,5,14,13,7,8,13,14,1,2,13,6,14,9,4,1,2,14,11,13,5,0,1,10,8,3,0,11,3,5,9,4,15,2,7,8,12,15,10,7,6,12],[13,7,10,0,6,9,5,15,8,4,3,10,11,14,12,5,2,11,9,6,15,12,0,3,4,1,14,13,1,2,7,8,1,2,12,15,10,4,0,3,13,14,6,9,7,8,9,6,15,1,5,12,3,10,14,5,8,7,11,0,4,13,2,11]],bitTransform=(arrInt,n,l)=>{let l2=Long(0)
return range(n).forEach((i=>{arrInt[i].isNegative()||l.and(arrayMask[arrInt[i].low]).equals(0)||(l2=l2.or(arrayMask[i]))})),l2},DES64=(longs,l)=>{const pR=range(8).map((()=>Long(0))),pSource=[Long(0),Long(0)]
let L=Long(0),R=Long(0),out=bitTransform(arrayIP,64,l)
return pSource[0]=out.and(4294967295),pSource[1]=out.and(-4294967296).shiftRight(32),range(16).forEach((i=>{let SOut=Long(0)
R=Long(pSource[1]),R=bitTransform(arrayE,64,R),R=R.xor(longs[i]),range(8).forEach((j=>{pR[j]=R.shiftRight(8*j).and(255)})),range(8).reverse().forEach((sbi=>{SOut=SOut.shiftLeft(4).or(matrixNSBox[sbi][pR[sbi]])})),R=bitTransform(arrayP,32,SOut),L=Long(pSource[0]),pSource[0]=Long(pSource[1]),pSource[1]=L.xor(R)})),pSource.reverse(),out=pSource[1].shiftLeft(32).and(-4294967296).or(pSource[0].and(4294967295)),out=bitTransform(arrayIP_1,64,out),out},crypt=(msg,key,mode)=>{let l=Long(0)
range(8).forEach((i=>{l=Long(key[i]).shiftLeft(8*i).or(l)}))
const j=Math.floor(msg.length/8),arrLong1=range(16).map((()=>Long(0)));((l,longs,n)=>{let l2=bitTransform(arrayPC_1,56,l)
range(16).forEach((i=>{l2=l2.and(arrayLsMask[arrayLs[i]]).shiftLeft(28-arrayLs[i]).or(l2.and(arrayLsMask[arrayLs[i]].not()).shiftRight(arrayLs[i])),longs[i]=bitTransform(arrayPC_2,64,l2)})),1===n&&range(8).forEach((j=>{[longs[j],longs[15-j]]=[longs[15-j],longs[j]]}))})(l,arrLong1,mode)
const arrLong2=range(j).map((()=>Long(0)))
range(j).forEach((m=>{range(8).forEach((n=>{arrLong2[m]=Long(msg[n+8*m]).shiftLeft(8*n).or(arrLong2[m])}))}))
const arrLong3=range(Math.floor((1+8*(j+1))/8)).map((()=>Long(0)))
range(j).forEach((i1=>{arrLong3[i1]=DES64(arrLong1,arrLong2[i1])}))
const arrByte1=msg.slice(8*j)
let l2=Long(0)
range(msg.length%8).forEach((i1=>{l2=Long(arrByte1[i1]).shiftLeft(8*i1).or(l2)})),(arrByte1.length||0===mode)&&(arrLong3[j]=DES64(arrLong1,l2))
const arrByte2=range(8*arrLong3.length).map((()=>0))
let i4=0
return arrLong3.forEach((l3=>{range(8).forEach((i6=>{arrByte2[i4]=l3.shiftRight(8*i6).and(255).low,i4+=1}))})),Buffer.from(arrByte2)},SECRET_KEY=Buffer.from("ylzsxkwm"),encrypt=msg=>crypt(msg,SECRET_KEY,0)
module.exports={encrypt,decrypt:msg=>crypt(msg,SECRET_KEY,1),encryptQuery:query=>encrypt(Buffer.from(query)).toString("base64")}},7691:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const pino=__webpack_require__(8167),destFile=process.env.LOG_FILE,colorize=process.stdout.isTTY,messageFormat=colorize?"[1m[32m({scope})[0m[36m {msg}":"({scope}) {msg}"
var _LOG_LEVEL
const logger=pino({level:null!==(_LOG_LEVEL=process.env.LOG_LEVEL)&&void 0!==_LOG_LEVEL?_LOG_LEVEL:"info",prettyPrint:"true"!==process.env.JSON_LOG&&{colorize,messageFormat,ignore:"time,pid,hostname,scope",errorProps:"*"}},destFile&&pino.destination(destFile))
module.exports={logger,logScope:function(scope){return logger.child({scope})}}},8573:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const{cacheStorage,CacheStorageGroup,getManagedCacheStorage}=__webpack_require__(9220),insure=__webpack_require__(2290),select=__webpack_require__(2822),request=__webpack_require__(5262),format=song=>({id:song.id,name:song.title,artists:{id:song.mid,name:song.author}}),track=id=>request("GET","https://www.bilibili.com/audio/music-service-c/web/url?rivilege=2&quality=2&sid="+id).then((response=>response.json())).then((jsonBody=>0===jsonBody.code?jsonBody.data.cdns[0].replace("https","http"):Promise.reject())).catch((()=>insure().bilibili.track(id))),cs=getManagedCacheStorage("provider/bilibili")
module.exports={check:info=>cs.cache(info,(()=>(info=>{const url=`https://api.bilibili.com/audio/music-service-c/s?search_type=music&page=1&pagesize=30&keyword=${encodeURIComponent(info.keyword)}`
return request("GET",url).then((response=>response.json())).then((jsonBody=>{const list=jsonBody.data.result.map(format),matched=select(list,info)
return matched?matched.id:Promise.reject()}))})(info))).then(track),track}},8537:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const request=__webpack_require__(5262),{getManagedCacheStorage}=__webpack_require__(9220),filter=(object,keys)=>Object.keys(object).reduce(((result,key)=>Object.assign(result,keys.includes(key)&&{[key]:object[key]})),{}),limit=text=>{const output=[text[0]]
return text.slice(1).some((token=>output.reduce(((sum,token)=>sum+token.length),0)>15||(output.push(token),!1))),output},getFormatData=data=>{try{const info=filter(data,["id","name","alias","duration"])
return info.name=(info.name||"").replace(/（\s*cover[:：\s][^）]+）/i,"").replace(/\(\s*cover[:：\s][^)]+\)/i,"").replace(/（\s*翻自[:：\s][^）]+）/,"").replace(/\(\s*翻自[:：\s][^)]+\)/,""),info.album=filter(data.album,["id","name"]),info.artists=data.artists.map((artist=>filter(artist,["id","name"]))),info.keyword=info.name+" - "+limit(info.artists.map((artist=>artist.name))).join(" / "),info}catch(err){return console.log("getFormatData err: ",err),{}}},find=(id,data)=>{if(data){const info=getFormatData(data)
return info.name?Promise.resolve(info):Promise.reject()}return request("GET","https://music.163.com/api/song/detail?ids=["+id+"]").then((response=>response.json())).then((jsonBody=>{if(jsonBody&&jsonBody.songs&&jsonBody.songs.length){const info=getFormatData(jsonBody.songs[0])
return info.name?info:Promise.reject()}return Promise.reject()}))},cs=getManagedCacheStorage("provider/find")
module.exports=(id,data)=>data?find(id,data):cs.cache(id,(()=>find(id)))},2290:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const request=__webpack_require__(5262)
module.exports=()=>{const host=global.cnrelay,proxy=new Proxy((()=>{}),{get:(target,property)=>(target.route=(target.route||[]).concat(property),proxy),apply:(target,_,payload)=>{if(module.exports.disable||!host)return Promise.reject()
const path=target.route.join("/"),query="object"==typeof payload[0]?JSON.stringify(payload[0]):payload[0]
return request("GET",`${host}/${path}?${encodeURIComponent(query)}`).then((response=>response.body()))}})
return proxy}},9788:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const insure=__webpack_require__(2290),select=__webpack_require__(2822),crypto=__webpack_require__(743),request=__webpack_require__(5262),{getManagedCacheStorage}=__webpack_require__(9220),headers={origin:"http://www.joox.com",referer:"http://www.joox.com",cookie:process.env.JOOX_COOKIE||null},format=song=>{const{decode}=crypto.base64
return{id:song.songid,name:decode(song.info1||""),duration:1e3*song.playtime,album:{id:song.albummid,name:decode(song.info3||"")},artists:song.singer_list.map((({id,name})=>({id,name:decode(name||"")})))}},track=id=>{const url="http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid="+id+"&country=hk&lang=zh_cn&from_type=-1&channel_id=-1&_="+(new Date).getTime()
return request("GET",url,headers).then((response=>response.jsonp())).then((jsonBody=>{const songUrl=(jsonBody.r320Url||jsonBody.r192Url||jsonBody.mp3Url||jsonBody.m4aUrl).replace(/M\d00([\w]+).mp3/,"M800$1.mp3")
return songUrl||Promise.reject()})).catch((()=>insure().joox.track(id)))},cs=getManagedCacheStorage("provider/joox")
module.exports={check:info=>cs.cache(info,(()=>(info=>{const keyword=(info=>/[\u0800-\u4e00]/.test(info.name)?info.name:info.keyword)(info),url="http://api-jooxtt.sanook.com/web-fcgi-bin/web_search?country=hk&lang=zh_TW&search_input="+encodeURIComponent(keyword)+"&sin=0&ein=30"
return request("GET",url,headers).then((response=>response.body())).then((body=>{const list=JSON.parse(body.replace(/'/g,'"')).itemlist.map(format),matched=select(list,info)
return matched?matched.id:Promise.reject()}))})(info))).then(track),track}},4840:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const insure=__webpack_require__(2290),select=__webpack_require__(2822),crypto=__webpack_require__(743),request=__webpack_require__(5262),{getManagedCacheStorage}=__webpack_require__(9220),format=song=>({id:song.hash,id_hq:song["320hash"],id_sq:song.sqhash,name:song.songname,duration:1e3*song.duration,album:{id:song.album_id,name:song.album_name}}),search=info=>{const url="http://mobilecdn.kugou.com/api/v3/search/song?keyword="+encodeURIComponent(info.keyword)+"&page=1&pagesize=10"
return request("GET",url).then((response=>response.json())).then((jsonBody=>{const list=jsonBody.data.info.map(format),matched=select(list,info)
return matched||Promise.reject()})).catch((()=>insure().kugou.search(info)))},track=song=>Promise.all(["sqhash","hqhash","hash"].slice(select.ENABLE_FLAC?0:1).map((format=>((song,format)=>{const getHashId=()=>{switch(format){case"hash":return song.id
case"hqhash":return song.id_hq
case"sqhash":return song.id_sq}return""},url="http://trackercdn.kugou.com/i/v2/?key="+crypto.md5.digest(`${getHashId()}kgcloudv2`)+"&hash="+getHashId()+"&appid=1005&pid=2&cmd=25&behavior=play&album_id="+song.album.id
return request("GET",url).then((response=>response.json())).then((jsonBody=>jsonBody.url[0]||Promise.reject()))})(song,format).catch((()=>null))))).then((result=>result.find((url=>url))||Promise.reject())).catch((()=>insure().kugou.track(song))),cs=getManagedCacheStorage("provider/kugou")
module.exports={check:info=>cs.cache(info,(()=>search(info))).then(track),search}},3081:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const insure=__webpack_require__(2290),select=__webpack_require__(2822),crypto=__webpack_require__(743),request=__webpack_require__(5262),{getManagedCacheStorage}=__webpack_require__(9220),format=song=>({id:song.musicrid.split("_").pop(),name:song.name,duration:1e3*song.duration,album:{id:song.albumid,name:song.album},artists:song.artist.split("&").map(((name,index)=>({id:index?null:song.artistid,name})))}),track=id=>{const url=crypto.kuwoapi?"http://mobi.kuwo.cn/mobi.s?f=kuwo&q="+crypto.kuwoapi.encryptQuery("corp=kuwo&p2p=1&type=convert_url2&sig=0&format="+["flac","mp3"].slice(select.ENABLE_FLAC?0:1).join("|")+"&rid="+id):"http://antiserver.kuwo.cn/anti.s?type=convert_url&format=mp3&response=url&rid=MUSIC_"+id
return request("GET",url,{"user-agent":"okhttp/3.10.0"}).then((response=>response.body())).then((body=>(body.match(/http[^\s$"]+/)||[])[0]||Promise.reject())).catch((()=>insure().kuwo.track(id)))},cs=getManagedCacheStorage("provider/kuwo")
module.exports={check:info=>cs.cache(info,(()=>(info=>{const keyword=encodeURIComponent(info.keyword.replace(" - "," ")),url=`http://www.kuwo.cn/api/www/search/searchMusicBykeyWord?key=${keyword}&pn=1&rn=30`,token=Math.random().toString(16).slice(-11).toUpperCase()
return request("GET",url,{referer:`http://www.kuwo.cn/search/list?key=${keyword}`,csrf:token,cookie:`kw_token=${token}`}).then((response=>response.json())).then((jsonBody=>{if(jsonBody&&"object"==typeof jsonBody&&"code"in jsonBody&&200!==jsonBody.code)return Promise.reject()
const list=jsonBody.data.list.map(format),matched=select(list,info)
return matched?matched.id:Promise.reject()}))})(info))).then(track),track}},886:(module,exports,__webpack_require__)=>{"use strict"
Object.defineProperty(exports,"__esModule",{value:!0}),__webpack_require__(7006),__webpack_require__(2845),__webpack_require__(8750),__webpack_require__(6291),__webpack_require__(4255),__webpack_require__(3295),__webpack_require__(9212),__webpack_require__(6085),__webpack_require__(7524),__webpack_require__(9139),__webpack_require__(2703),__webpack_require__(8144),__webpack_require__(1320),__webpack_require__(8558)
const find=__webpack_require__(8537),request=__webpack_require__(5262),{PROVIDERS:providers,DEFAULT_SOURCE:defaultSrc}=__webpack_require__(1784),{isHostWrapper}=__webpack_require__(5157),SongNotAvailable=__webpack_require__(9057),RequestFailed=__webpack_require__(6014),IncompleteAudioData=__webpack_require__(312),{logScope}=__webpack_require__(7691),RequestCancelled=__webpack_require__(4113),logger=logScope("provider/match"),headerReferer=new Map([["bilivideo.com","https://www.bilibili.com/"],["yt-download.org","https://www.yt-download.org/"]])
async function getAudioFromSource(source,info){logger.debug({source,info},"Getting the audio...")
const audioData=await providers[source].check(info)
if(!audioData)throw new SongNotAvailable(source)
const song=await async function(url){const isHost=isHostWrapper(url),song={size:0,br:null,url:null,md5:null},header={range:"bytes=0-8191","accept-encoding":"identity"}
headerReferer.forEach(((refererValue,urlPattern)=>{isHost(urlPattern)&&(header.referer=refererValue)}))
const response=await request("GET",url,header),{headers}=response
if(code=response.statusCode,!(code>=200&&code<=299))throw new RequestFailed(url,response.statusCode)
var code
song.url=response.url.href
const data=await response.body(!0)
try{const bitrate=function(buffer){const map={3:{3:["free",32,64,96,128,160,192,224,256,288,320,352,384,416,448,"bad"],2:["free",32,48,56,64,80,96,112,128,160,192,224,256,320,384,"bad"],1:["free",32,40,48,56,64,80,96,112,128,160,192,224,256,320,"bad"]},2:{3:["free",32,48,56,64,80,96,112,128,144,160,176,192,224,256,"bad"],2:["free",8,16,24,32,40,48,56,64,80,96,112,128,144,160,"bad"]}}
map[2][1]=map[2][2],map[0]=map[2]
let pointer=0
if("fLaC"===buffer.slice(0,4).toString())return 999
if("ID3"===buffer.slice(0,3).toString()){pointer=6
pointer=10+buffer.slice(pointer,pointer+4).reduce(((summation,value,index)=>summation+(127&value)<<7*(3-index)),0)}const header=buffer.slice(pointer,pointer+4)
if(4===header.length&&255===header[0]&&7==(header[1]>>5&7)&&0!=(header[1]>>1&3)&&15!=(header[2]>>4&15)&&3!=(header[2]>>2&3)){const version=header[1]>>3&3,layer=header[1]>>1&3,bitrate=header[2]>>4
return map[version][layer][bitrate]}}(data)
song.br=bitrate&&!isNaN(bitrate)?1e3*bitrate:null}catch(e){logger.debug(e,"Failed to decode and extract the bitrate")}if(headers&&(isHost("126.net")&&(song.md5=song.url.split("/").slice(-1)[0].replace(/\..*/g,"")),isHost("kuwo.cn")&&song.br<=32e4&&(song.md5=headers.etag.replace(/"/g,"")),isHost("qq.com")&&(song.md5=headers["server-md5"]),song.size=parseInt((headers["content-range"]||"").split("/").pop()||headers["content-length"])||0,!isHost("yt-download.org")&&"8192"!==headers["content-length"]))return Promise.reject()
return song}(audioData)
if(logger.debug(song,"The matched song is:"),!song||"string"!=typeof song.url)throw new IncompleteAudioData("song is undefined, or song.url is not a string.")
return logger.debug({source,info},"The audio matched!"),song}module.exports=async function(id,source,data){const candidate=(source||global.source||defaultSrc).filter((name=>name in providers)),audioInfo=await find(id,data),audioData=await Promise.any(candidate.map((async source=>getAudioFromSource(source,audioInfo).catch((e=>{throw e&&(e instanceof RequestCancelled?logger.debug(e):logger.error(e)),e}))))),{id:audioId,name}=audioInfo,{url}=audioData
return logger.debug({audioInfo,audioData},"The data to replace:"),logger.info({audioId,songName:name,url},`Replaced: [${audioId}] ${name}`),audioData}},1549:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const insure=__webpack_require__(2290),select=__webpack_require__(2822),request=__webpack_require__(5262),{getManagedCacheStorage}=__webpack_require__(9220),headers={origin:"http://music.migu.cn/",referer:"http://m.music.migu.cn/v3/",aversionid:process.env.MIGU_COOKIE||null,channel:"0146921"},format=song=>{const singerId=song.singerId.split(/\s*,\s*/),singerName=song.singerName.split(/\s*,\s*/)
return{id:song.id,name:song.title,album:{id:song.albumId,name:song.albumName},artists:singerId.map(((id,index)=>({id,name:singerName[index]})))}},track=id=>Promise.all(["ZQ24","SQ","HQ","PQ"].slice(select.ENABLE_FLAC?0:2).map((format=>((id,format)=>{const url="https://app.c.nf.migu.cn/MIGUM2.0/strategy/listen-url/v2.4?netType=01&resourceType=2&songId="+id.toString()+"&toneFlag="+format
return request("GET",url,headers).then((response=>response.json())).then((jsonBody=>{const{audioFormatType}=jsonBody.data
return audioFormatType!==format?Promise.reject():url?jsonBody.data.url:Promise.reject()}))})(id,format).catch((()=>null))))).then((result=>result.find((url=>url))||Promise.reject())).catch((()=>insure().migu.track(id))),cs=getManagedCacheStorage("provider/migu")
module.exports={check:info=>cs.cache(info,(()=>(info=>{const url="https://m.music.migu.cn/migu/remoting/scr_search_tag?keyword="+encodeURIComponent(info.keyword)+"&type=2&rows=20&pgc=1"
return request("GET",url,headers).then((response=>response.json())).then((jsonBody=>{const list=((jsonBody||{}).musics||[]).map(format),matched=select(list,info)
return matched?matched.id:Promise.reject()}))})(info))).then(track),track}},2085:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const select=__webpack_require__(2822),request=__webpack_require__(5262),{getManagedCacheStorage}=__webpack_require__(9220),cs=getManagedCacheStorage("provider/pyncmd")
module.exports={check:info=>cs.cache(info,(()=>(info=>{const url="https://pyncmd.vercel.app/api/pyncm?module=track&method=GetTrackAudio&song_ids="+info.id+"&bitrate="+["999000","320000"].slice(select.ENABLE_FLAC?0:1,select.ENABLE_FLAC?1:2)
return request("GET",url).then((response=>response.json())).then((jsonBody=>{if(jsonBody&&"object"==typeof jsonBody&&"code"in jsonBody&&200!==jsonBody.code)return Promise.reject()
const matched=jsonBody.data.find((song=>song.id===info.id))
return matched&&matched.url?matched.url:Promise.reject()}))})(info)))}},9878:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const insure=__webpack_require__(2290),select=__webpack_require__(2822),request=__webpack_require__(5262),{getManagedCacheStorage}=__webpack_require__(9220),headers={origin:"http://y.qq.com/",referer:"http://y.qq.com/",cookie:process.env.QQ_COOKIE||null},format=song=>({id:{song:song.songmid,file:song.media_mid},name:song.songname,duration:1e3*song.interval,album:{id:song.albummid,name:song.albumname},artists:song.singer.map((({mid,name})=>({id:mid,name})))}),track=id=>(id.key=id.file,Promise.all([["F000",".flac"],["M800",".mp3"],["M500",".mp3"]].slice(headers.cookie||"undefined"!=typeof window?select.ENABLE_FLAC?0:1:2).map((format=>((id,format)=>{const uin=((headers.cookie||"").match(/uin=(\d+)/)||[])[1]||"0",url="https://u.y.qq.com/cgi-bin/musicu.fcg?data="+encodeURIComponent(JSON.stringify({req_0:{module:"vkey.GetVkeyServer",method:"CgiGetVkey",param:{guid:(1e7*Math.random()).toFixed(0),loginflag:1,filename:[format.join(id.file)],songmid:[id.song],songtype:[0],uin,platform:"20"}}}))
return request("GET",url,headers).then((response=>response.json())).then((jsonBody=>{const{sip,midurlinfo}=jsonBody.req_0.data
return midurlinfo[0].purl?sip[0]+midurlinfo[0].purl:Promise.reject()}))})(id,format).catch((()=>null))))).then((result=>result.find((url=>url))||Promise.reject())).catch((()=>insure().qq.track(id)))),cs=getManagedCacheStorage("provider/qq")
module.exports={check:info=>cs.cache(info,(()=>(info=>{const url="https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&remoteplace=txt.yqq.center&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=20&w="+encodeURIComponent(info.keyword)+"&g_tk=5381&jsonpCallback=MusicJsonCallback10005317669353331&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0"
return request("GET",url).then((response=>response.jsonp())).then((jsonBody=>{const list=jsonBody.data.song.list.map(format),matched=select(list,info)
return matched?matched.id:Promise.reject()}))})(info))).then(track),track}},2822:module=>{"use strict"
module.exports=(list,info)=>{const{duration}=info,song=list.slice(0,5).find((song=>song.duration&&Math.abs(song.duration-duration)<5e3))
return song||list[0]},module.exports.ENABLE_FLAC="true"===(process.env.ENABLE_FLAC||"").toLowerCase()},4396:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const{getManagedCacheStorage}=__webpack_require__(9220),{logScope}=__webpack_require__(7691),YoutubeDlInvalidResponse=__webpack_require__(5467),YoutubeDlNotInstalled=__webpack_require__(58),{spawnStdout}=__webpack_require__(7581),dlArguments=query=>["-f","140","--dump-json",query],logger=logScope("provider/youtube-dl")
async function getUrl(args){try{const{stdout}=await spawnStdout("youtube-dl",args),response=JSON.parse(stdout.toString())
if("object"==typeof response&&"string"==typeof response.id&&"string"==typeof response.url)return response
throw new YoutubeDlInvalidResponse(response)}catch(e){if(e&&"ENOENT"===e.code)throw new YoutubeDlNotInstalled
throw e}}const track=async id=>{const{url}=await getUrl(dlArguments((id=>`https://www.youtube.com/watch?v=${id}`)(id)))
return url},cs=getManagedCacheStorage("youtube-dl")
module.exports={check:info=>cs.cache(info,(()=>(async info=>{const{id}=await getUrl(dlArguments((keyword=info.keyword,`ytsearch1:${keyword}`)))
var keyword
return id})(info))).then(track).catch((e=>{throw e&&logger.error(e),e})),track}},8396:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const request=__webpack_require__(5262),{getManagedCacheStorage}=__webpack_require__(9220),cs=getManagedCacheStorage("provider/youtube"),key=process.env.YOUTUBE_KEY||null,track=id=>request("GET",`https://www.youtube.com/watch?v=${id}`,{},null,undefined).then((response=>response.body())).then((body=>JSON.parse(body.match(/ytInitialPlayerResponse\s*=\s*{[^]+};\s*var\s*meta/)[0].replace(/;var meta/,"").replace(/ytInitialPlayerResponse = /,"")).streamingData)).then((streamingData=>{const stream=streamingData.formats.concat(streamingData.adaptiveFormats).find((format=>140===format.itag)),target=(stream.signatureCipher||"").split("&").reduce(((result,item)=>{const splitItem=item.split("=").map(decodeURIComponent)
return Object.assign({},result,{[splitItem[0]]:splitItem[1]})}),{})
return stream.url||(target.sp.includes("sig")?cs.cache("YOUTUBE_SIGNATURE",(()=>((id="-tKVN2mAKRI")=>request("GET",`https://www.youtube.com/watch?v=${id}`,{},null,void 0).then((response=>response.body())).then((body=>{let assets=/"WEB_PLAYER_CONTEXT_CONFIG_ID_KEVLAR_VERTICAL_LANDING_PAGE_PROMO":{[^}]+}/.exec(body)[0]
return assets=JSON.parse(`{${assets}}}`).WEB_PLAYER_CONTEXT_CONFIG_ID_KEVLAR_VERTICAL_LANDING_PAGE_PROMO,request("GET","https://youtube.com"+assets.jsUrl,{},null,void 0).then((response=>response.body()))})).then((body=>{const[,funcArg,funcBody]=/function\((\w+)\)\s*{([^}]+split\(""\)[^}]+join\(""\))};/.exec(body),helperName=/;(.+?)\..+?\(/.exec(funcBody)[1],helperContent=new RegExp(`var ${helperName}={[\\s\\S]+?};`).exec(body)[0]
return new Function([funcArg],helperContent+"\n"+funcBody)})))()),Date.now()+864e5).then((sign=>target.url+"&sig="+sign(target.s))):target.url)}))
module.exports={check:info=>cs.cache(info,(()=>key?(info=>{const url=`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(info.keyword)}&type=video&key=${key}`
return request("GET",url,{accept:"application/json"},null,void 0).then((response=>response.json())).then((jsonBody=>{const matched=jsonBody.items[0]
return matched?matched.id.videoId:Promise.reject()}))})(info):(info=>{const url=`https://www.youtube.com/results?search_query=${encodeURIComponent(info.keyword)}`
return request("GET",url,{},null,void 0).then((response=>response.body())).then((body=>{const matched=JSON.parse(body.match(/ytInitialData\s*=\s*([^;]+);/)[1]).contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents[0]
return matched?matched.videoRenderer.videoId:Promise.reject()}))})(info))).then(track),track}},8965:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const{getManagedCacheStorage}=__webpack_require__(9220),{logScope}=__webpack_require__(7691),{spawnStdout}=__webpack_require__(7581),YtDlpInvalidResponse=__webpack_require__(2962),YtDlpNotInstalled=__webpack_require__(8761),dlArguments=query=>["-f","140","--dump-json",query],logger=logScope("provider/yt-dlp")
async function getUrl(args){try{const{stdout}=await spawnStdout("yt-dlp",args),response=JSON.parse(stdout.toString())
if("object"==typeof response&&"string"==typeof response.id&&"string"==typeof response.url)return response
throw new YtDlpInvalidResponse(response)}catch(e){if(e&&"ENOENT"===e.code)throw new YtDlpNotInstalled
throw e}}const track=async id=>{const{url}=await getUrl(dlArguments((id=>`https://www.youtube.com/watch?v=${id}`)(id)))
return url},cs=getManagedCacheStorage("yt-dlp")
module.exports={check:info=>cs.cache(info,(()=>(async info=>{const{id}=await getUrl(dlArguments((keyword=info.keyword,`ytsearch1:${keyword}`)))
var keyword
return id})(info))).then(track).catch((e=>{throw e&&logger.error(e),e})),track}},9588:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const request=__webpack_require__(5262),{getManagedCacheStorage}=__webpack_require__(9220),key=process.env.YOUTUBE_KEY||null,track=id=>{const regex=/<a[^>]*href=["']([^"']*)["']/
return request("GET",`https://www.yt-download.org/api/button/mp3/${id}`,{},null,undefined).then((response=>response.body())).then((body=>{var matched=body.match(regex)
return matched?matched[1]:Promise.reject()}))},cs=getManagedCacheStorage("provider/yt-download")
module.exports={check:info=>cs.cache(info,(()=>key?(info=>{const url=`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(info.keyword)}&type=video&key=${key}`
return request("GET",url,{accept:"application/json"},null,void 0).then((response=>response.json())).then((jsonBody=>{const matched=jsonBody.items[0]
return matched?matched.id.videoId:Promise.reject()}))})(info):(info=>{const url=`https://www.youtube.com/results?search_query=${encodeURIComponent(info.keyword)}`
return request("GET",url,{},null,void 0).then((response=>response.body())).then((body=>{const matched=JSON.parse(body.match(/ytInitialData\s*=\s*([^;]+);/)[1]).contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents[0]
return matched?matched.videoRenderer.videoId:Promise.reject()}))})(info))).then(track),track}},5262:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const zlib=__webpack_require__(9796),http=__webpack_require__(3685),https=__webpack_require__(5687),ON_CANCEL=__webpack_require__(2188),RequestCancelled=__webpack_require__(4113),{logScope}=__webpack_require__(7691),parse=__webpack_require__(7310).parse,format=__webpack_require__(7310).format,logger=logScope("request"),translate=host=>(global.hosts||{})[host]||host,create=(url,proxy)=>("https:"===((void 0===proxy?global.proxy:proxy)||url).protocol?https:http).request,configure=(method,url,headers,proxy)=>{headers=headers||{},proxy=void 0===proxy?global.proxy:proxy,"content-length"in headers&&delete headers["content-length"]
const options={}
return options._headers=headers,proxy&&"https:"===url.protocol?(options.method="CONNECT",options.headers=Object.keys(headers).reduce(((result,key)=>Object.assign(result,["host","user-agent"].includes(key)&&{[key]:headers[key]})),{})):(options.method=method,options.headers=headers),proxy?(options.hostname=translate(proxy.hostname),options.port=proxy.port||("https:"===proxy.protocol?443:80),options.path="https:"===url.protocol?translate(url.hostname)+":"+(url.port||443):"http://"+translate(url.hostname)+url.path):(options.hostname=translate(url.hostname),options.port=url.port||("https:"===url.protocol?443:80),options.path=url.path),options},request=(method,receivedUrl,receivedHeaders,body,proxy,cancelRequest)=>{const url=parse(receivedUrl),headers=receivedHeaders||{},options=configure(method,url,{host:url.hostname,accept:"application/json, text/plain, */*","accept-encoding":"gzip, deflate","accept-language":"zh-CN,zh;q=0.9","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36",...headers},proxy)
return new Promise(((resolve,reject)=>{logger.debug(`Start requesting ${receivedUrl}`)
const clientRequest=create(url,proxy)(options),destroyClientRequest=function(){clientRequest.destroy(new RequestCancelled(format(url)))}
var ref
null==cancelRequest||cancelRequest.on(ON_CANCEL,destroyClientRequest),null!==(ref=null==cancelRequest?void 0:cancelRequest.cancelled)&&void 0!==ref&&ref&&destroyClientRequest(),clientRequest.setTimeout(1e4,(()=>{logger.warn({url:format(url)},"The request timed out, or the requester didn't handle the response."),destroyClientRequest()})).on("response",(response=>resolve(response))).on("connect",((_,socket)=>{logger.debug("received CONNECT, continuing with https.request()..."),https.request({method,path:url.path,headers:options._headers,socket,agent:!1}).on("response",(response=>resolve(response))).on("error",(error=>reject(error))).end(body)})).on("error",(error=>reject(error))).end("CONNECT"===options.method.toUpperCase()?void 0:body)})).then((response=>{var ref
if(null!==(ref=null==cancelRequest?void 0:cancelRequest.cancelled)&&void 0!==ref&&ref)return Promise.reject(new RequestCancelled(format(url)))
if([201,301,302,303,307,308].includes(response.statusCode)){const redirectTo=url.resolve(response.headers.location||url.href)
return logger.debug(`Redirect to ${redirectTo}`),delete headers.host,request(method,redirectTo,headers,body,proxy)}return Object.assign(response,{url,body:raw=>read(response,raw),json:()=>json(response),jsonp:()=>jsonp(response)})}))},read=(connect,raw)=>new Promise(((resolve,reject)=>{const chunks=[]
connect.on("data",(chunk=>chunks.push(chunk))).on("end",(()=>resolve(Buffer.concat(chunks)))).on("error",(error=>reject(error)))})).then((buffer=>(buffer=buffer.length&&["gzip","deflate"].includes(connect.headers["content-encoding"])?zlib.unzipSync(buffer):buffer,raw?buffer:buffer.toString()))),json=connect=>read(connect,!1).then((body=>JSON.parse(body))),jsonp=connect=>read(connect,!1).then((body=>JSON.parse(body.slice(body.indexOf("(")+1,-")".length))))
request.read=read,request.create=create,request.translate=translate,request.configure=configure,module.exports=request},8837:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const fs=__webpack_require__(7147),net=__webpack_require__(1808),path=__webpack_require__(1017),parse=__webpack_require__(7310).parse,{logScope}=__webpack_require__(7691),logger=logScope("server"),sni=__webpack_require__(313),hook=__webpack_require__(403),request=__webpack_require__(5262),{isHost}=__webpack_require__(5157),proxy={core:{mitm:(req,res)=>{if("/proxy.pac"===req.url){const url=parse("http://"+req.headers.host)
res.writeHead(200,{"Content-Type":"application/x-ns-proxy-autoconfig"}),res.end(`\n\t\t\t\t\tfunction FindProxyForURL(url, host) {\n\t\t\t\t\t\tif (${Array.from(hook.target.host).map((host=>`host == '${host}'`)).join(" || ")}) {\n\t\t\t\t\t\t\treturn 'PROXY ${url.hostname}:${url.port||80}'\n\t\t\t\t\t\t}\n\t\t\t\t\t\treturn 'DIRECT'\n\t\t\t\t\t}\n\t\t\t\t`)}else{const ctx={res,req}
Promise.resolve().then((()=>proxy.protect(ctx))).then((()=>proxy.authenticate(ctx))).then((()=>hook.request.before(ctx))).then((()=>proxy.filter(ctx))).then((()=>proxy.log(ctx))).then((()=>proxy.mitm.request(ctx))).then((()=>hook.request.after(ctx))).then((()=>proxy.mitm.response(ctx))).catch((()=>proxy.mitm.close(ctx)))}},tunnel:(req,socket,head)=>{const ctx={req,socket,head}
Promise.resolve().then((()=>proxy.protect(ctx))).then((()=>proxy.authenticate(ctx))).then((()=>hook.connect.before(ctx))).then((()=>proxy.filter(ctx))).then((()=>proxy.log(ctx))).then((()=>proxy.tunnel.connect(ctx))).then((()=>proxy.tunnel.dock(ctx))).then((()=>hook.negotiate.before(ctx))).then((()=>proxy.tunnel.pipe(ctx))).catch((()=>proxy.tunnel.close(ctx)))}},abort:socket=>{socket&&socket.end(),socket&&!socket.destroyed&&socket.destroy()},protect:ctx=>{const{req,res,socket}=ctx
req&&req.on("error",(()=>proxy.abort(req.socket,"req"))),res&&res.on("error",(()=>proxy.abort(res.socket,"res"))),socket&&socket.on("error",(()=>proxy.abort(socket,"socket")))},log:ctx=>{const{req,socket,decision}=ctx
socket&&(socket?logger.debug({decision,url:req.url},"TUNNEL"):logger.debug({decision,host:parse(req.url).host,encrypted:req.socket.encrypted},"MITM"+(req.socket.encrypted?" (ssl)":"")))},authenticate:ctx=>{const{req,res,socket}=ctx,credential=Buffer.from((req.headers["proxy-authorization"]||"").split(/\s+/).pop()||"","base64").toString()
if("proxy-authorization"in req.headers&&delete req.headers["proxy-authorization"],server.authentication&&credential!==server.authentication&&(socket||req.url.startsWith("http://")))return socket?socket.write('HTTP/1.1 407 Proxy Auth Required\r\nProxy-Authenticate: Basic realm="realm"\r\n\r\n'):res.writeHead(407,{"proxy-authenticate":'Basic realm="realm"'}),Promise.reject(ctx.error="authenticate")},filter:ctx=>{if(ctx.decision||ctx.req.local)return
const url=parse((ctx.socket?"https://":"")+ctx.req.url),match=pattern=>-1!==url.href.search(new RegExp(pattern,"g"))
try{const allow=server.whitelist.some(match),deny=server.blacklist.some(match)
if(!allow&&deny)return Promise.reject(ctx.error="filter")}catch(error){ctx.error=error}},mitm:{request:ctx=>new Promise(((resolve,reject)=>{if("close"===ctx.decision)return reject(ctx.error=ctx.decision)
const{req}=ctx
isHost(req.url,"bilivideo.com")&&(req.headers.referer="https://www.bilibili.com/",req.headers["user-agent"]="okhttp/3.4.1"),isHost(req.url,"yt-download.org")&&(req.headers.referer="https://www.yt-download.org/")
const url=parse(req.url),options=request.configure(req.method,url,req.headers)
ctx.proxyReq=request.create(url)(options).on("response",(proxyRes=>resolve(ctx.proxyRes=proxyRes))).on("error",(error=>reject(ctx.error=error))),req.readable?req.pipe(ctx.proxyReq):ctx.proxyReq.end(req.body)})),response:ctx=>{const{res,proxyRes}=ctx
proxyRes.on("error",(()=>proxy.abort(proxyRes.socket,"proxyRes"))),res.writeHead(proxyRes.statusCode,proxyRes.headers),proxyRes.readable?proxyRes.pipe(res):res.end(proxyRes.body)},close:ctx=>{proxy.abort(ctx.res.socket,"mitm")}},tunnel:{connect:ctx=>new Promise(((resolve,reject)=>{if("close"===ctx.decision)return reject(ctx.error=ctx.decision)
const{req}=ctx,url=parse("https://"+req.url)
if(global.proxy&&!req.local){const options=request.configure(req.method,url,req.headers)
request.create(proxy)(options).on("connect",((_,proxySocket)=>resolve(ctx.proxySocket=proxySocket))).on("error",(error=>reject(ctx.error=error))).end()}else{const proxySocket=net.connect(url.port||443,request.translate(url.hostname)).on("connect",(()=>resolve(ctx.proxySocket=proxySocket))).on("error",(error=>reject(ctx.error=error)))}})),dock:ctx=>new Promise((resolve=>{const{req,head,socket}=ctx
socket.once("data",(data=>resolve(ctx.head=Buffer.concat([head,data])))).write(`HTTP/${req.httpVersion} 200 Connection established\r\n\r\n`)})).then((data=>ctx.socket.sni=sni(data))).catch((e=>e&&logger.error(e))),pipe:ctx=>{if("blank"===ctx.decision)return Promise.reject(ctx.error=ctx.decision)
const{head,socket,proxySocket}=ctx
proxySocket.on("error",(()=>proxy.abort(ctx.proxySocket,"proxySocket"))),proxySocket.write(head),socket.pipe(proxySocket),proxySocket.pipe(socket)},close:ctx=>{proxy.abort(ctx.socket,"tunnel")}}},cert=process.env.SIGN_CERT||path.join(__dirname,"..","server.crt"),key=process.env.SIGN_KEY||path.join(__dirname,"..","server.key"),options={key:fs.readFileSync(key),cert:fs.readFileSync(cert)},server={http:__webpack_require__(3685).createServer().on("request",proxy.core.mitm).on("connect",proxy.core.tunnel),https:__webpack_require__(5687).createServer(options).on("request",proxy.core.mitm).on("connect",proxy.core.tunnel),whitelist:[],blacklist:["://127\\.\\d+\\.\\d+\\.\\d+","://localhost"],authentication:null}
module.exports=server},313:module=>{"use strict"
module.exports=data=>{let end=data.length,pointer=43
const nan=(number=pointer)=>isNaN(number)
if(pointer+1>end||nan())return null
if(pointer+=1+data[pointer],pointer+2>end||nan())return null
if(pointer+=2+data.readInt16BE(pointer),pointer+1>end||nan())return null
if(pointer+=1+data[pointer],pointer+2>end||nan())return null
const extensionsLength=data.readInt16BE(pointer)
pointer+=2
const extensionsEnd=pointer+extensionsLength
if(extensionsEnd>end||nan(extensionsEnd))return null
for(end=extensionsEnd;pointer+4<=end||nan();){const extensionType=data.readInt16BE(pointer),extensionSize=data.readInt16BE(pointer+2)
if(pointer+=4,0!==extensionType){pointer+=extensionSize
continue}if(pointer+2>end||nan())return null
const nameListLength=data.readInt16BE(pointer)
if(pointer+=2,pointer+nameListLength>end)return null
for(;pointer+3<=end||nan();){const nameType=data[pointer],nameLength=data.readInt16BE(pointer+1)
if(pointer+=3,0===nameType)return pointer+nameLength>end||nan()?null:data.toString("ascii",pointer,pointer+nameLength)
pointer+=nameLength}}return null}},7581:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const child_process=__webpack_require__(2081),{logScope}=__webpack_require__(7691),ProcessExitNotSuccessfully=__webpack_require__(3942),logger=logScope("spawn")
module.exports={spawnStdout:async function(cmd,args=[]){return new Promise(((resolve,reject)=>{let stdoutOffset=0,stderrOffset=0
const stdout=Buffer.alloc(5e6),stderr=Buffer.alloc(5e6),spawn=child_process.spawn(cmd,args)
spawn.on("spawn",(()=>{logger.info(`running ${cmd} ${args.join(" ")}`)})),spawn.on("error",(error=>reject(error))),spawn.on("close",(code=>{0!==code?reject(new ProcessExitNotSuccessfully(cmd,code)):(logger.debug(`process ${cmd} exited successfully`),resolve({stdout:stdout.slice(0,stdoutOffset),stderr:stderr.slice(0,stderrOffset)}))})),spawn.stdout.on("data",(stdoutPart=>{stdoutOffset+=stdoutPart.copy(stdout,stdoutOffset)})),spawn.stderr.on("data",(stderrPart=>{logger.warn(`[${cmd}][stderr] ${stderrPart}`),stderrOffset+=stderrPart.copy(stderr,stderrOffset)}))}))}}},5157:module=>{"use strict"
const isHost=(url,host)=>url.includes(host)
module.exports={isHost,isHostWrapper:url=>host=>isHost(url,host)}},160:module=>{"use strict"
if("undefined"!=typeof SharedArrayBuffer&&"undefined"!=typeof Atomics){const nil=new Int32Array(new SharedArrayBuffer(4))
function sleep(ms){if(!1===(ms>0&&ms<1/0)){if("number"!=typeof ms&&"bigint"!=typeof ms)throw TypeError("sleep: ms must be a number")
throw RangeError("sleep: ms must be a number that is greater than 0 but less than Infinity")}Atomics.wait(nil,0,0,Number(ms))}module.exports=sleep}else{function sleep(ms){if(!1===(ms>0&&ms<1/0)){if("number"!=typeof ms&&"bigint"!=typeof ms)throw TypeError("sleep: ms must be a number")
throw RangeError("sleep: ms must be a number that is greater than 0 but less than Infinity")}const target=Date.now()+Number(ms)
for(;target>Date.now(););}module.exports=sleep}},924:(module,exports,__webpack_require__)=>{"use strict"
var __WEBPACK_AMD_DEFINE_RESULT__
function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}!function(global){var token,timezone,timezoneClip,_arguments=arguments,dateFormat=(token=/d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|W{1,2}|[LlopSZN]|"[^"]*"|'[^']*'/g,timezone=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,timezoneClip=/[^-+\dA-Z]/g,function(date,mask,utc,gmt){if(1!==_arguments.length||"string"!==kindOf(date)||/\d/.test(date)||(mask=date,date=void 0),(date=date||0===date?date:new Date)instanceof Date||(date=new Date(date)),isNaN(date))throw TypeError("Invalid date")
var maskSlice=(mask=String(dateFormat.masks[mask]||mask||dateFormat.masks.default)).slice(0,4)
"UTC:"!==maskSlice&&"GMT:"!==maskSlice||(mask=mask.slice(4),utc=!0,"GMT:"===maskSlice&&(gmt=!0))
var _=function(){return utc?"getUTC":"get"},_d=function(){return date[_()+"Date"]()},D=function(){return date[_()+"Day"]()},_m=function(){return date[_()+"Month"]()},y=function(){return date[_()+"FullYear"]()},_H=function(){return date[_()+"Hours"]()},_M=function(){return date[_()+"Minutes"]()},_s=function(){return date[_()+"Seconds"]()},_L=function(){return date[_()+"Milliseconds"]()},_o=function(){return utc?0:date.getTimezoneOffset()},_W=function(){return getWeek(date)},flags={d:function(){return _d()},dd:function(){return pad(_d())},ddd:function(){return dateFormat.i18n.dayNames[D()]},DDD:function(){return getDayName({y:y(),m:_m(),d:_d(),_:_(),dayName:dateFormat.i18n.dayNames[D()],short:!0})},dddd:function(){return dateFormat.i18n.dayNames[D()+7]},DDDD:function(){return getDayName({y:y(),m:_m(),d:_d(),_:_(),dayName:dateFormat.i18n.dayNames[D()+7]})},m:function(){return _m()+1},mm:function(){return pad(_m()+1)},mmm:function(){return dateFormat.i18n.monthNames[_m()]},mmmm:function(){return dateFormat.i18n.monthNames[_m()+12]},yy:function(){return String(y()).slice(2)},yyyy:function(){return pad(y(),4)},h:function(){return _H()%12||12},hh:function(){return pad(_H()%12||12)},H:function(){return _H()},HH:function(){return pad(_H())},M:function(){return _M()},MM:function(){return pad(_M())},s:function(){return _s()},ss:function(){return pad(_s())},l:function(){return pad(_L(),3)},L:function(){return pad(Math.floor(_L()/10))},t:function(){return _H()<12?dateFormat.i18n.timeNames[0]:dateFormat.i18n.timeNames[1]},tt:function(){return _H()<12?dateFormat.i18n.timeNames[2]:dateFormat.i18n.timeNames[3]},T:function(){return _H()<12?dateFormat.i18n.timeNames[4]:dateFormat.i18n.timeNames[5]},TT:function(){return _H()<12?dateFormat.i18n.timeNames[6]:dateFormat.i18n.timeNames[7]},Z:function(){return gmt?"GMT":utc?"UTC":(String(date).match(timezone)||[""]).pop().replace(timezoneClip,"").replace(/GMT\+0000/g,"UTC")},o:function(){return(_o()>0?"-":"+")+pad(100*Math.floor(Math.abs(_o())/60)+Math.abs(_o())%60,4)},p:function(){return(_o()>0?"-":"+")+pad(Math.floor(Math.abs(_o())/60),2)+":"+pad(Math.floor(Math.abs(_o())%60),2)},S:function(){return["th","st","nd","rd"][_d()%10>3?0:(_d()%100-_d()%10!=10)*_d()%10]},W:function(){return _W()},WW:function(){return pad(_W())},N:function(){return getDayOfWeek(date)}}
return mask.replace(token,(function(match){return match in flags?flags[match]():match.slice(1,match.length-1)}))})
dateFormat.masks={default:"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",paddedShortDate:"mm/dd/yyyy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:sso",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",expiresHeaderFormat:"ddd, dd mmm yyyy HH:MM:ss Z"},dateFormat.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"],timeNames:["a","p","am","pm","A","P","AM","PM"]}
var pad=function(val,len){for(val=String(val),len=len||2;val.length<len;)val="0"+val
return val},getDayName=function(_ref){var y=_ref.y,m=_ref.m,d=_ref.d,_=_ref._,dayName=_ref.dayName,_ref$short=_ref.short,_short=void 0!==_ref$short&&_ref$short,today=new Date,yesterday=new Date
yesterday.setDate(yesterday[_+"Date"]()-1)
var tomorrow=new Date
tomorrow.setDate(tomorrow[_+"Date"]()+1)
return today[_+"FullYear"]()===y&&today[_+"Month"]()===m&&today[_+"Date"]()===d?_short?"Tdy":"Today":yesterday[_+"FullYear"]()===y&&yesterday[_+"Month"]()===m&&yesterday[_+"Date"]()===d?_short?"Ysd":"Yesterday":tomorrow[_+"FullYear"]()===y&&tomorrow[_+"Month"]()===m&&tomorrow[_+"Date"]()===d?_short?"Tmw":"Tomorrow":dayName},getWeek=function(date){var targetThursday=new Date(date.getFullYear(),date.getMonth(),date.getDate())
targetThursday.setDate(targetThursday.getDate()-(targetThursday.getDay()+6)%7+3)
var firstThursday=new Date(targetThursday.getFullYear(),0,4)
firstThursday.setDate(firstThursday.getDate()-(firstThursday.getDay()+6)%7+3)
var ds=targetThursday.getTimezoneOffset()-firstThursday.getTimezoneOffset()
targetThursday.setHours(targetThursday.getHours()-ds)
var weekDiff=(targetThursday-firstThursday)/6048e5
return 1+Math.floor(weekDiff)},getDayOfWeek=function(date){var dow=date.getDay()
return 0===dow&&(dow=7),dow},kindOf=function(val){return null===val?"null":void 0===val?"undefined":"object"!==_typeof(val)?_typeof(val):Array.isArray(val)?"array":{}.toString.call(val).slice(8,-1).toLowerCase()}
void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return dateFormat}.call(exports,__webpack_require__,exports,module))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}(void 0)},7008:(module,__unused_webpack_exports,__webpack_require__)=>{var stream=__webpack_require__(8118),eos=__webpack_require__(8839),inherits=__webpack_require__(1828),shift=__webpack_require__(6151),SIGNAL_FLUSH=Buffer.from&&Buffer.from!==Uint8Array.from?Buffer.from([0]):new Buffer([0]),onuncork=function(self,fn){self._corked?self.once("uncork",fn):fn()},destroyer=function(self,end){return function(err){err?function(self,err){self._autoDestroy&&self.destroy(err)}(self,"premature close"===err.message?null:err):end&&!self._ended&&self.end()}},noop=function(){},Duplexify=function(writable,readable,opts){if(!(this instanceof Duplexify))return new Duplexify(writable,readable,opts)
stream.Duplex.call(this,opts),this._writable=null,this._readable=null,this._readable2=null,this._autoDestroy=!opts||!1!==opts.autoDestroy,this._forwardDestroy=!opts||!1!==opts.destroy,this._forwardEnd=!opts||!1!==opts.end,this._corked=1,this._ondrain=null,this._drained=!1,this._forwarding=!1,this._unwrite=null,this._unread=null,this._ended=!1,this.destroyed=!1,writable&&this.setWritable(writable),readable&&this.setReadable(readable)}
inherits(Duplexify,stream.Duplex),Duplexify.obj=function(writable,readable,opts){return opts||(opts={}),opts.objectMode=!0,opts.highWaterMark=16,new Duplexify(writable,readable,opts)},Duplexify.prototype.cork=function(){1==++this._corked&&this.emit("cork")},Duplexify.prototype.uncork=function(){this._corked&&0==--this._corked&&this.emit("uncork")},Duplexify.prototype.setWritable=function(writable){if(this._unwrite&&this._unwrite(),this.destroyed)writable&&writable.destroy&&writable.destroy()
else if(null!==writable&&!1!==writable){var self=this,unend=eos(writable,{writable:!0,readable:!1},destroyer(this,this._forwardEnd)),ondrain=function(){var ondrain=self._ondrain
self._ondrain=null,ondrain&&ondrain()}
this._unwrite&&process.nextTick(ondrain),this._writable=writable,this._writable.on("drain",ondrain),this._unwrite=function(){self._writable.removeListener("drain",ondrain),unend()},this.uncork()}else this.end()},Duplexify.prototype.setReadable=function(readable){if(this._unread&&this._unread(),this.destroyed)readable&&readable.destroy&&readable.destroy()
else{if(null===readable||!1===readable)return this.push(null),void this.resume()
var rs,self=this,unend=eos(readable,{writable:!1,readable:!0},destroyer(this)),onreadable=function(){self._forward()},onend=function(){self.push(null)}
this._drained=!0,this._readable=readable,this._readable2=readable._readableState?readable:(rs=readable,new stream.Readable({objectMode:!0,highWaterMark:16}).wrap(rs)),this._readable2.on("readable",onreadable),this._readable2.on("end",onend),this._unread=function(){self._readable2.removeListener("readable",onreadable),self._readable2.removeListener("end",onend),unend()},this._forward()}},Duplexify.prototype._read=function(){this._drained=!0,this._forward()},Duplexify.prototype._forward=function(){if(!this._forwarding&&this._readable2&&this._drained){var data
for(this._forwarding=!0;this._drained&&null!==(data=shift(this._readable2));)this.destroyed||(this._drained=this.push(data))
this._forwarding=!1}},Duplexify.prototype.destroy=function(err,cb){if(cb||(cb=noop),this.destroyed)return cb(null)
this.destroyed=!0
var self=this
process.nextTick((function(){self._destroy(err),cb(null)}))},Duplexify.prototype._destroy=function(err){if(err){var ondrain=this._ondrain
this._ondrain=null,ondrain?ondrain(err):this.emit("error",err)}this._forwardDestroy&&(this._readable&&this._readable.destroy&&this._readable.destroy(),this._writable&&this._writable.destroy&&this._writable.destroy()),this.emit("close")},Duplexify.prototype._write=function(data,enc,cb){if(!this.destroyed)return this._corked?onuncork(this,this._write.bind(this,data,enc,cb)):data===SIGNAL_FLUSH?this._finish(cb):this._writable?void(!1===this._writable.write(data)?this._ondrain=cb:this.destroyed||cb()):cb()},Duplexify.prototype._finish=function(cb){var self=this
this.emit("preend"),onuncork(this,(function(){var ws,fn
ws=self._forwardEnd&&self._writable,fn=function(){!1===self._writableState.prefinished&&(self._writableState.prefinished=!0),self.emit("prefinish"),onuncork(self,cb)},ws?ws._writableState&&ws._writableState.finished?fn():ws._writableState?ws.end(fn):(ws.end(),fn()):fn()}))},Duplexify.prototype.end=function(data,enc,cb){return"function"==typeof data?this.end(null,null,data):"function"==typeof enc?this.end(data,null,enc):(this._ended=!0,data&&this.write(data),this._writableState.ending||this._writableState.destroyed||this.write(SIGNAL_FLUSH),stream.Writable.prototype.end.call(this,cb))},module.exports=Duplexify},8839:(module,__unused_webpack_exports,__webpack_require__)=>{var once=__webpack_require__(5962),noop=function(){},eos=function(stream,opts,callback){if("function"==typeof opts)return eos(stream,null,opts)
opts||(opts={}),callback=once(callback||noop)
var ws=stream._writableState,rs=stream._readableState,readable=opts.readable||!1!==opts.readable&&stream.readable,writable=opts.writable||!1!==opts.writable&&stream.writable,cancelled=!1,onlegacyfinish=function(){stream.writable||onfinish()},onfinish=function(){writable=!1,readable||callback.call(stream)},onend=function(){readable=!1,writable||callback.call(stream)},onexit=function(exitCode){callback.call(stream,exitCode?new Error("exited with error code: "+exitCode):null)},onerror=function(err){callback.call(stream,err)},onclose=function(){process.nextTick(onclosenexttick)},onclosenexttick=function(){if(!cancelled)return(!readable||rs&&rs.ended&&!rs.destroyed)&&(!writable||ws&&ws.ended&&!ws.destroyed)?void 0:callback.call(stream,new Error("premature close"))},onrequest=function(){stream.req.on("finish",onfinish)}
return!function(stream){return stream.setHeader&&"function"==typeof stream.abort}(stream)?writable&&!ws&&(stream.on("end",onlegacyfinish),stream.on("close",onlegacyfinish)):(stream.on("complete",onfinish),stream.on("abort",onclose),stream.req?onrequest():stream.on("request",onrequest)),function(stream){return stream.stdio&&Array.isArray(stream.stdio)&&3===stream.stdio.length}(stream)&&stream.on("exit",onexit),stream.on("end",onend),stream.on("finish",onfinish),!1!==opts.error&&stream.on("error",onerror),stream.on("close",onclose),function(){cancelled=!0,stream.removeListener("complete",onfinish),stream.removeListener("abort",onclose),stream.removeListener("request",onrequest),stream.req&&stream.req.removeListener("finish",onfinish),stream.removeListener("end",onlegacyfinish),stream.removeListener("close",onlegacyfinish),stream.removeListener("finish",onfinish),stream.removeListener("exit",onexit),stream.removeListener("end",onend),stream.removeListener("error",onerror),stream.removeListener("close",onclose)}}
module.exports=eos},9775:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const validator=__webpack_require__(2090),parse=__webpack_require__(2224),redactor=__webpack_require__(4281),restorer=__webpack_require__(7414),{groupRedact,nestedRedact}=__webpack_require__(9958),state=__webpack_require__(1166),rx=__webpack_require__(5392),validate=validator(),noop=o=>o
noop.restore=noop
function fastRedact(opts={}){const paths=Array.from(new Set(opts.paths||[])),serialize="serialize"in opts&&(!1===opts.serialize||"function"==typeof opts.serialize)?opts.serialize:JSON.stringify,remove=opts.remove
if(!0===remove&&serialize!==JSON.stringify)throw Error("fast-redact – remove option may only be set when serializer is JSON.stringify")
const censor=!0===remove?void 0:"censor"in opts?opts.censor:"[REDACTED]",isCensorFct="function"==typeof censor,censorFctTakesPath=isCensorFct&&censor.length>1
if(0===paths.length)return serialize||noop
validate({paths,serialize,censor})
const{wildcards,wcLen,secret}=parse({paths,censor}),compileRestore=restorer({secret,wcLen}),strict=!("strict"in opts)||opts.strict
return redactor({secret,wcLen,serialize,strict,isCensorFct,censorFctTakesPath},state({secret,censor,compileRestore,serialize,groupRedact,nestedRedact,wildcards,wcLen}))}fastRedact.rx=rx,fastRedact.validator=validator,module.exports=fastRedact},9958:module=>{"use strict"
function specialSet(o,k,path,afterPath,censor,isCensorFct,censorFctTakesPath){const afterPathLen=afterPath.length,lastPathIndex=afterPathLen-1,originalKey=k
var n,nv,ov,obj,prop,i=-1,oov=null,exists=!0
if(ov=n=o[k],"object"!=typeof n)return{value:null,parent:null,exists}
for(;null!=n&&++i<afterPathLen;){if(oov=ov,!((k=afterPath[i])in n)){exists=!1
break}if(ov=n[k],nv=i!==lastPathIndex?ov:isCensorFct?censorFctTakesPath?censor(ov,[...path,originalKey,...afterPath]):censor(ov):censor,n[k]=(obj=n,prop=k,Object.prototype.hasOwnProperty.call(obj,prop)&&nv===ov||void 0===nv&&void 0!==censor?n[k]:nv),"object"!=typeof(n=n[k]))break}return{value:ov,parent:oov,exists}}function get(o,p){for(var i=-1,l=p.length,n=o;null!=n&&++i<l;)n=n[p[i]]
return n}module.exports={groupRedact:function(o,path,censor,isCensorFct,censorFctTakesPath){const target=get(o,path)
if(null==target)return{keys:null,values:null,target:null,flat:!0}
const keys=Object.keys(target),keysLength=keys.length,pathLength=path.length,pathWithKey=censorFctTakesPath?[...path]:void 0,values=new Array(keysLength)
for(var i=0;i<keysLength;i++){const key=keys[i]
values[i]=target[key],censorFctTakesPath?(pathWithKey[pathLength]=key,target[key]=censor(target[key],pathWithKey)):target[key]=isCensorFct?censor(target[key]):censor}return{keys,values,target,flat:!0}},groupRestore:function({keys,values,target}){if(null==target)return
const length=keys.length
for(var i=0;i<length;i++){const k=keys[i]
target[k]=values[i]}},nestedRedact:function(store,o,path,ns,censor,isCensorFct,censorFctTakesPath){const target=get(o,path)
if(null==target)return
const keys=Object.keys(target),keysLength=keys.length
for(var i=0;i<keysLength;i++){const key=keys[i],{value,parent,exists}=specialSet(target,key,path,ns,censor,isCensorFct,censorFctTakesPath)
!0===exists&&null!==parent&&store.push({key:ns[ns.length-1],target:parent,value})}return store},nestedRestore:function(arr){const length=arr.length
for(var i=0;i<length;i++){const{key,target,value}=arr[i]
target[key]=value}}}},2224:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const rx=__webpack_require__(5392)
module.exports=function({paths}){const wildcards=[]
var wcLen=0
const secret=paths.reduce((function(o,strPath,ix){var path=strPath.match(rx).map((p=>p.replace(/'|"|`/g,"")))
const leadingBracket="["===strPath[0],star=(path=path.map((p=>"["===p[0]?p.substr(1,p.length-2):p))).indexOf("*")
if(star>-1){const before=path.slice(0,star),beforeStr=before.join("."),after=path.slice(star+1,path.length)
if(after.indexOf("*")>-1)throw Error("fast-redact – Only one wildcard per path is supported")
const nested=after.length>0
wcLen++,wildcards.push({before,beforeStr,after,nested})}else o[strPath]={path,val:void 0,precensored:!1,circle:"",escPath:JSON.stringify(strPath),leadingBracket}
return o}),{})
return{wildcards,wcLen,secret}}},4281:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const rx=__webpack_require__(5392)
module.exports=function({secret,serialize,wcLen,strict,isCensorFct,censorFctTakesPath},state){const redact=Function("o",`\n    if (typeof o !== 'object' || o == null) {\n      ${function(strict,serialize){return!0===strict?"throw Error('fast-redact: primitives cannot be redacted')":!1===serialize?"return o":"return this.serialize(o)"}(strict,serialize)}\n    }\n    const { censor, secret } = this\n    ${function(secret,isCensorFct,censorFctTakesPath){return Object.keys(secret).map((path=>{const{escPath,leadingBracket,path:arrPath}=secret[path],skip=leadingBracket?1:0,delim=leadingBracket?"":".",hops=[]
for(var match;null!==(match=rx.exec(path));){const[,ix]=match,{index,input}=match
index>skip&&hops.push(input.substring(0,index-(ix?0:1)))}var existence=hops.map((p=>`o${delim}${p}`)).join(" && ")
0===existence.length?existence+=`o${delim}${path} != null`:existence+=` && o${delim}${path} != null`
const circularDetection=`\n      switch (true) {\n        ${hops.reverse().map((p=>`\n          case o${delim}${p} === censor:\n            secret[${escPath}].circle = ${JSON.stringify(p)}\n            break\n        `)).join("\n")}\n      }\n    `,censorArgs=censorFctTakesPath?`val, ${JSON.stringify(arrPath)}`:"val"
return`\n      if (${existence}) {\n        const val = o${delim}${path}\n        if (val === censor) {\n          secret[${escPath}].precensored = true\n        } else {\n          secret[${escPath}].val = val\n          o${delim}${path} = ${isCensorFct?`censor(${censorArgs})`:"censor"}\n          ${circularDetection}\n        }\n      }\n    `})).join("\n")}(secret,isCensorFct,censorFctTakesPath)}\n    this.compileRestore()\n    ${function(hasWildcards,isCensorFct,censorFctTakesPath){return!0===hasWildcards?`\n    {\n      const { wildcards, wcLen, groupRedact, nestedRedact } = this\n      for (var i = 0; i < wcLen; i++) {\n        const { before, beforeStr, after, nested } = wildcards[i]\n        if (nested === true) {\n          secret[beforeStr] = secret[beforeStr] || []\n          nestedRedact(secret[beforeStr], o, before, after, censor, ${isCensorFct}, ${censorFctTakesPath})\n        } else secret[beforeStr] = groupRedact(o, before, censor, ${isCensorFct}, ${censorFctTakesPath})\n      }\n    }\n  `:""}(wcLen>0,isCensorFct,censorFctTakesPath)}\n    ${function(serialize){return!1===serialize?"return o":"\n    var s = this.serialize(o)\n    this.restore(o)\n    return s\n  "}(serialize)}\n  `).bind(state)
!1===serialize&&(redact.restore=o=>state.restore(o))
return redact}},7414:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const{groupRestore,nestedRestore}=__webpack_require__(9958)
module.exports=function({secret,wcLen}){return function(){if(this.restore)return
const paths=Object.keys(secret),resetters=function(secret,paths){return paths.map((path=>{const{circle,escPath,leadingBracket}=secret[path]
return`\n      if (secret[${escPath}].val !== undefined) {\n        try { ${circle?`o.${circle} = secret[${escPath}].val`:`o${leadingBracket?"":"."}${path} = secret[${escPath}].val`} } catch (e) {}\n        ${`secret[${escPath}].val = undefined`}\n      }\n    `})).join("")}(secret,paths),hasWildcards=wcLen>0,state=hasWildcards?{secret,groupRestore,nestedRestore}:{secret}
this.restore=Function("o",function(resetters,paths,hasWildcards){return`\n    const secret = this.secret\n    ${!0===hasWildcards?`\n    const keys = Object.keys(secret)\n    const len = keys.length\n    for (var i = len - 1; i >= ${paths.length}; i--) {\n      const k = keys[i]\n      const o = secret[k]\n      if (o.flat === true) this.groupRestore(o)\n      else this.nestedRestore(o)\n      secret[k] = null\n    }\n  `:""}\n    ${resetters}\n    return o\n  `}(resetters,paths,hasWildcards)).bind(state)}}},5392:module=>{"use strict"
module.exports=/[^.[\]]+|\[((?:.)*?)\]/g},1166:module=>{"use strict"
module.exports=function(o){const{secret,censor,compileRestore,serialize,groupRedact,nestedRedact,wildcards,wcLen}=o,builder=[{secret,censor,compileRestore}]
!1!==serialize&&builder.push({serialize})
wcLen>0&&builder.push({groupRedact,nestedRedact,wildcards,wcLen})
return Object.assign(...builder)}},2090:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const{createContext,runInContext}=__webpack_require__(6144)
module.exports=function(opts={}){const{ERR_PATHS_MUST_BE_STRINGS=()=>"fast-redact - Paths must be (non-empty) strings",ERR_INVALID_PATH=s=>`fast-redact – Invalid path (${s})`}=opts
return function({paths}){paths.forEach((s=>{if("string"!=typeof s)throw Error(ERR_PATHS_MUST_BE_STRINGS())
try{if(/〇/.test(s))throw Error()
const proxy=new Proxy({},{get:()=>proxy,set:()=>{throw Error()}}),expr=("["===s[0]?"":".")+s.replace(/^\*/,"〇").replace(/\.\*/g,".〇").replace(/\[\*\]/g,"[〇]")
if(/\n|\r|;/.test(expr))throw Error()
if(/\/\*/.test(expr))throw Error()
runInContext(`\n          (function () {\n            'use strict'\n            o${expr}\n            if ([o${expr}].length !== 1) throw Error()\n          })()\n        `,createContext({o:proxy,〇:null}),{codeGeneration:{strings:!1,wasm:!1}})}catch(e){throw Error(ERR_INVALID_PATH(s))}}))}}},2988:module=>{module.exports=stringify,stringify.default=stringify,stringify.stable=deterministicStringify,stringify.stableStringify=deterministicStringify
var arr=[],replacerStack=[]
function defaultOptions(){return{depthLimit:Number.MAX_SAFE_INTEGER,edgesLimit:Number.MAX_SAFE_INTEGER}}function stringify(obj,replacer,spacer,options){var res
void 0===options&&(options=defaultOptions()),decirc(obj,"",0,[],void 0,0,options)
try{res=0===replacerStack.length?JSON.stringify(obj,replacer,spacer):JSON.stringify(obj,replaceGetterValues(replacer),spacer)}catch(_){return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]")}finally{for(;0!==arr.length;){var part=arr.pop()
4===part.length?Object.defineProperty(part[0],part[1],part[3]):part[0][part[1]]=part[2]}}return res}function setReplace(replace,val,k,parent){var propertyDescriptor=Object.getOwnPropertyDescriptor(parent,k)
void 0!==propertyDescriptor.get?propertyDescriptor.configurable?(Object.defineProperty(parent,k,{value:replace}),arr.push([parent,k,val,propertyDescriptor])):replacerStack.push([val,k,replace]):(parent[k]=replace,arr.push([parent,k,val]))}function decirc(val,k,edgeIndex,stack,parent,depth,options){var i
if(depth+=1,"object"==typeof val&&null!==val){for(i=0;i<stack.length;i++)if(stack[i]===val)return void setReplace("[Circular]",val,k,parent)
if(void 0!==options.depthLimit&&depth>options.depthLimit)return void setReplace("[...]",val,k,parent)
if(void 0!==options.edgesLimit&&edgeIndex+1>options.edgesLimit)return void setReplace("[...]",val,k,parent)
if(stack.push(val),Array.isArray(val))for(i=0;i<val.length;i++)decirc(val[i],i,i,stack,val,depth,options)
else{var keys=Object.keys(val)
for(i=0;i<keys.length;i++){var key=keys[i]
decirc(val[key],key,i,stack,val,depth,options)}}stack.pop()}}function compareFunction(a,b){return a<b?-1:a>b?1:0}function deterministicStringify(obj,replacer,spacer,options){void 0===options&&(options=defaultOptions())
var res,tmp=deterministicDecirc(obj,"",0,[],void 0,0,options)||obj
try{res=0===replacerStack.length?JSON.stringify(tmp,replacer,spacer):JSON.stringify(tmp,replaceGetterValues(replacer),spacer)}catch(_){return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]")}finally{for(;0!==arr.length;){var part=arr.pop()
4===part.length?Object.defineProperty(part[0],part[1],part[3]):part[0][part[1]]=part[2]}}return res}function deterministicDecirc(val,k,edgeIndex,stack,parent,depth,options){var i
if(depth+=1,"object"==typeof val&&null!==val){for(i=0;i<stack.length;i++)if(stack[i]===val)return void setReplace("[Circular]",val,k,parent)
try{if("function"==typeof val.toJSON)return}catch(_){return}if(void 0!==options.depthLimit&&depth>options.depthLimit)return void setReplace("[...]",val,k,parent)
if(void 0!==options.edgesLimit&&edgeIndex+1>options.edgesLimit)return void setReplace("[...]",val,k,parent)
if(stack.push(val),Array.isArray(val))for(i=0;i<val.length;i++)deterministicDecirc(val[i],i,i,stack,val,depth,options)
else{var tmp={},keys=Object.keys(val).sort(compareFunction)
for(i=0;i<keys.length;i++){var key=keys[i]
deterministicDecirc(val[key],key,i,stack,val,depth,options),tmp[key]=val[key]}if(void 0===parent)return tmp
arr.push([parent,k,val]),parent[k]=tmp}stack.pop()}}function replaceGetterValues(replacer){return replacer=void 0!==replacer?replacer:function(k,v){return v},function(key,val){if(replacerStack.length>0)for(var i=0;i<replacerStack.length;i++){var part=replacerStack[i]
if(part[1]===key&&part[0]===val){val=part[2],replacerStack.splice(i,1)
break}}return replacer.call(this,key,val)}}},8306:module=>{"use strict"
module.exports=function(s){return s}},1828:(module,__unused_webpack_exports,__webpack_require__)=>{try{var util=__webpack_require__(3837)
if("function"!=typeof util.inherits)throw""
module.exports=util.inherits}catch(e){module.exports=__webpack_require__(3730)}},3730:module=>{"function"==typeof Object.create?module.exports=function(ctor,superCtor){superCtor&&(ctor.super_=superCtor,ctor.prototype=Object.create(superCtor.prototype,{constructor:{value:ctor,enumerable:!1,writable:!0,configurable:!0}}))}:module.exports=function(ctor,superCtor){if(superCtor){ctor.super_=superCtor
var TempCtor=function(){}
TempCtor.prototype=superCtor.prototype,ctor.prototype=new TempCtor,ctor.prototype.constructor=ctor}}},3538:module=>{"use strict"
function genWrap(wraps,ref,fn,event){function wrap(){const obj=ref.deref()
void 0!==obj&&fn(obj,event)}wraps[event]=wrap,process.once(event,wrap)}const registry=new FinalizationRegistry(clear),map=new WeakMap
function clear(wraps){process.removeListener("exit",wraps.exit),process.removeListener("beforeExit",wraps.beforeExit)}module.exports={register:function(obj,fn){if(void 0===obj)throw new Error("the object can't be undefined")
const ref=new WeakRef(obj),wraps={}
map.set(obj,wraps),registry.register(obj,wraps),genWrap(wraps,ref,fn,"exit"),genWrap(wraps,ref,fn,"beforeExit")},unregister:function(obj){const wraps=map.get(obj)
map.delete(obj),wraps&&clear(wraps),registry.unregister(obj)}}},5962:(module,__unused_webpack_exports,__webpack_require__)=>{var wrappy=__webpack_require__(4447)
function once(fn){var f=function(){return f.called?f.value:(f.called=!0,f.value=fn.apply(this,arguments))}
return f.called=!1,f}function onceStrict(fn){var f=function(){if(f.called)throw new Error(f.onceError)
return f.called=!0,f.value=fn.apply(this,arguments)},name=fn.name||"Function wrapped with `once`"
return f.onceError=name+" shouldn't be called more than once",f.called=!1,f}module.exports=wrappy(once),module.exports.strict=wrappy(onceStrict),once.proto=once((function(){Object.defineProperty(Function.prototype,"once",{value:function(){return once(this)},configurable:!0}),Object.defineProperty(Function.prototype,"onceStrict",{value:function(){return onceStrict(this)},configurable:!0})}))},2306:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const metadata=Symbol.for("pino.metadata"),split=__webpack_require__(5443),duplexify=__webpack_require__(7008)
function defaultClose(err,cb){process.nextTick(cb,err)}module.exports=function(fn,opts={}){const parseLines="lines"===opts.parse,parseLine="function"==typeof opts.parseLine?opts.parseLine:JSON.parse,close=opts.close||defaultClose,stream=split((function(line){let value
try{value=parseLine(line)}catch(error){return void this.emit("unknown",line,error)}if(null!==value)return"object"!=typeof value&&(value={data:value,time:Date.now()}),stream[metadata]&&(stream.lastTime=value.time,stream.lastLevel=value.level,stream.lastObj=value),parseLines?line:value
this.emit("unknown",line,"Null value ignored")}),{autoDestroy:!0})
stream._destroy=function(err,cb){const promise=close(err,cb)
promise&&"function"==typeof promise.then&&promise.then(cb,cb)},!1!==opts.metadata&&(stream[metadata]=!0,stream.lastTime=0,stream.lastLevel=0,stream.lastObj=null)
let res=fn(stream)
if(res&&"function"==typeof res.catch)res.catch((err=>{stream.destroy(err)})),res=null
else if(opts.enablePipelining&&res)return duplexify(stream,res,{objectMode:!0})
return stream}},1787:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const warning=__webpack_require__(8556)()
module.exports=warning
warning.create("PinoWarning","PINODEP004","bindings.serializers is deprecated, use options.serializers option instead"),warning.create("PinoWarning","PINODEP005","bindings.formatters is deprecated, use options.formatters option instead"),warning.create("PinoWarning","PINODEP006","bindings.customLevels is deprecated, use options.customLevels option instead"),warning.create("PinoWarning","PINODEP007","bindings.level is deprecated, use options.level option instead")},6441:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const flatstr=__webpack_require__(8306),{lsCacheSym,levelValSym,useOnlyCustomLevelsSym,streamSym,formattersSym,hooksSym}=__webpack_require__(4941),{noop,genLog}=__webpack_require__(9952),levels={trace:10,debug:20,info:30,warn:40,error:50,fatal:60},levelMethods={fatal:hook=>{const logFatal=genLog(levels.fatal,hook)
return function(...args){const stream=this[streamSym]
if(logFatal.call(this,...args),"function"==typeof stream.flushSync)try{stream.flushSync()}catch(e){}}},error:hook=>genLog(levels.error,hook),warn:hook=>genLog(levels.warn,hook),info:hook=>genLog(levels.info,hook),debug:hook=>genLog(levels.debug,hook),trace:hook=>genLog(levels.trace,hook)},nums=Object.keys(levels).reduce(((o,k)=>(o[levels[k]]=k,o)),{}),initialLsCache=Object.keys(nums).reduce(((o,k)=>(o[k]=flatstr('{"level":'+Number(k)),o)),{})
function isStandardLevel(level,useOnlyCustomLevels){if(useOnlyCustomLevels)return!1
switch(level){case"fatal":case"error":case"warn":case"info":case"debug":case"trace":return!0
default:return!1}}module.exports={initialLsCache,genLsCache:function(instance){const formatter=instance[formattersSym].level,{labels}=instance.levels,cache={}
for(const label in labels){const level=formatter(labels[label],Number(label))
cache[label]=JSON.stringify(level).slice(0,-1)}return instance[lsCacheSym]=cache,instance},levelMethods,getLevel:function(level){const{levels,levelVal}=this
return levels&&levels.labels?levels.labels[levelVal]:""},setLevel:function(level){const{labels,values}=this.levels
if("number"==typeof level){if(void 0===labels[level])throw Error("unknown level value"+level)
level=labels[level]}if(void 0===values[level])throw Error("unknown level "+level)
const preLevelVal=this[levelValSym],levelVal=this[levelValSym]=values[level],useOnlyCustomLevelsVal=this[useOnlyCustomLevelsSym],hook=this[hooksSym].logMethod
for(const key in values)levelVal>values[key]?this[key]=noop:this[key]=isStandardLevel(key,useOnlyCustomLevelsVal)?levelMethods[key](hook):genLog(values[key],hook)
this.emit("level-change",level,levelVal,labels[preLevelVal],preLevelVal)},isLevelEnabled:function(logLevel){const{values}=this.levels,logLevelVal=values[logLevel]
return void 0!==logLevelVal&&logLevelVal>=this[levelValSym]},mappings:function(customLevels=null,useOnlyCustomLevels=!1){const customNums=customLevels?Object.keys(customLevels).reduce(((o,k)=>(o[customLevels[k]]=k,o)),{}):null
return{labels:Object.assign(Object.create(Object.prototype,{Infinity:{value:"silent"}}),useOnlyCustomLevels?null:nums,customNums),values:Object.assign(Object.create(Object.prototype,{silent:{value:1/0}}),useOnlyCustomLevels?null:levels,customLevels)}},assertNoLevelCollisions:function(levels,customLevels){const{labels,values}=levels
for(const k in customLevels){if(k in values)throw Error("levels cannot be overridden")
if(customLevels[k]in labels)throw Error("pre-existing level values cannot be used for new levels")}},assertDefaultLevelFound:function(defaultLevel,customLevels,useOnlyCustomLevels){if("number"==typeof defaultLevel){if(![].concat(Object.keys(customLevels||{}).map((key=>customLevels[key])),useOnlyCustomLevels?[]:Object.keys(nums).map((level=>+level)),1/0).includes(defaultLevel))throw Error(`default level:${defaultLevel} must be included in custom levels`)
return}if(!(defaultLevel in Object.assign(Object.create(Object.prototype,{silent:{value:1/0}}),useOnlyCustomLevels?null:levels,customLevels)))throw Error(`default level:${defaultLevel} must be included in custom levels`)}}},8508:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const{version}=__webpack_require__(8002)
module.exports={version}},5092:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const{EventEmitter}=__webpack_require__(2361),SonicBoom=__webpack_require__(4656),flatstr=__webpack_require__(8306),warning=__webpack_require__(1787),{lsCacheSym,levelValSym,setLevelSym,getLevelSym,chindingsSym,parsedChindingsSym,mixinSym,asJsonSym,writeSym,mixinMergeStrategySym,timeSym,timeSliceIndexSym,streamSym,serializersSym,formattersSym,useOnlyCustomLevelsSym,needsMetadataGsym,redactFmtSym,stringifySym,formatOptsSym,stringifiersSym}=__webpack_require__(4941),{getLevel,setLevel,isLevelEnabled,mappings,initialLsCache,genLsCache,assertNoLevelCollisions}=__webpack_require__(6441),{asChindings,asJson,buildFormatters,stringify}=__webpack_require__(9952),{version}=__webpack_require__(8508),redaction=__webpack_require__(5434),prototype={constructor:class{},child:function(bindings,options){if(!bindings)throw Error("missing bindings for child Pino")
options=options||{}
const serializers=this[serializersSym],formatters=this[formattersSym],instance=Object.create(this)
!0===bindings.hasOwnProperty("serializers")&&(warning.emit("PINODEP004"),options.serializers=bindings.serializers)
!0===bindings.hasOwnProperty("formatters")&&(warning.emit("PINODEP005"),options.formatters=bindings.formatters)
!0===bindings.hasOwnProperty("customLevels")&&(warning.emit("PINODEP006"),options.customLevels=bindings.customLevels)
!0===bindings.hasOwnProperty("level")&&(warning.emit("PINODEP007"),options.level=bindings.level)
if(!0===options.hasOwnProperty("serializers")){instance[serializersSym]=Object.create(null)
for(const k in serializers)instance[serializersSym][k]=serializers[k]
const parentSymbols=Object.getOwnPropertySymbols(serializers)
for(var i=0;i<parentSymbols.length;i++){const ks=parentSymbols[i]
instance[serializersSym][ks]=serializers[ks]}for(const bk in options.serializers)instance[serializersSym][bk]=options.serializers[bk]
const bindingsSymbols=Object.getOwnPropertySymbols(options.serializers)
for(var bi=0;bi<bindingsSymbols.length;bi++){const bks=bindingsSymbols[bi]
instance[serializersSym][bks]=options.serializers[bks]}}else instance[serializersSym]=serializers
if(options.hasOwnProperty("formatters")){const{level,bindings:chindings,log}=options.formatters
instance[formattersSym]=buildFormatters(level||formatters.level,chindings||resetChildingsFormatter,log||formatters.log)}else instance[formattersSym]=buildFormatters(formatters.level,resetChildingsFormatter,formatters.log)
!0===options.hasOwnProperty("customLevels")&&(assertNoLevelCollisions(this.levels,options.customLevels),instance.levels=mappings(options.customLevels,instance[useOnlyCustomLevelsSym]),genLsCache(instance))
if("object"==typeof options.redact&&null!==options.redact||Array.isArray(options.redact)){instance.redact=options.redact
const stringifiers=redaction(instance.redact,stringify),formatOpts={stringify:stringifiers[redactFmtSym]}
instance[stringifySym]=stringify,instance[stringifiersSym]=stringifiers,instance[formatOptsSym]=formatOpts}instance[chindingsSym]=asChindings(instance,bindings)
const childLevel=options.level||this.level
return instance[setLevelSym](childLevel),instance},bindings:function(){const chindingsJson=`{${this[chindingsSym].substr(1)}}`,bindingsFromJson=JSON.parse(chindingsJson)
return delete bindingsFromJson.pid,delete bindingsFromJson.hostname,bindingsFromJson},setBindings:function(newBindings){const chindings=asChindings(this,newBindings)
this[chindingsSym]=chindings,delete this[parsedChindingsSym]},flush:function(){const stream=this[streamSym]
"flush"in stream&&stream.flush()},isLevelEnabled,version,get level(){return this[getLevelSym]()},set level(lvl){this[setLevelSym](lvl)},get levelVal(){return this[levelValSym]},set levelVal(n){throw Error("levelVal is read-only")},[lsCacheSym]:initialLsCache,[writeSym]:function(_obj,msg,num){const t=this[timeSym](),mixin=this[mixinSym],mixinMergeStrategy=this[mixinMergeStrategySym]||defaultMixinMergeStrategy,objError=_obj instanceof Error
let obj
null==_obj?obj=mixin?mixin({}):{}:(obj=mixinMergeStrategy(_obj,mixin?mixin(_obj):{}),!msg&&objError&&(msg=_obj.message),objError&&(obj.stack=_obj.stack,obj.type||(obj.type="Error")))
const s=this[asJsonSym](obj,msg,num,t),stream=this[streamSym]
!0===stream[needsMetadataGsym]&&(stream.lastLevel=num,stream.lastObj=obj,stream.lastMsg=msg,stream.lastTime=t.slice(this[timeSliceIndexSym]),stream.lastLogger=this)
stream instanceof SonicBoom?stream.write(s):stream.write(flatstr(s))},[asJsonSym]:asJson,[getLevelSym]:getLevel,[setLevelSym]:setLevel}
Object.setPrototypeOf(prototype,EventEmitter.prototype),module.exports=function(){return Object.create(prototype)}
const resetChildingsFormatter=bindings=>bindings
function defaultMixinMergeStrategy(mergeObject,mixinObject){return Object.assign(mixinObject,mergeObject)}},5434:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const fastRedact=__webpack_require__(9775),{redactFmtSym,wildcardFirstSym}=__webpack_require__(4941),{rx,validator}=fastRedact,validate=validator({ERR_PATHS_MUST_BE_STRINGS:()=>"pino – redacted paths must be strings",ERR_INVALID_PATH:s=>`pino – redact paths array contains an invalid path (${s})`}),CENSOR="[Redacted]"
module.exports=function(opts,serialize){const{paths,censor}=function(opts){if(Array.isArray(opts))return validate(opts={paths:opts,censor:CENSOR}),opts
let{paths,censor=CENSOR,remove}=opts
if(!1===Array.isArray(paths))throw Error("pino – redact must contain an array of strings")
!0===remove&&(censor=void 0)
return validate({paths,censor}),{paths,censor}}(opts),shape=paths.reduce(((o,str)=>{rx.lastIndex=0
const first=rx.exec(str),next=rx.exec(str)
let ns=void 0!==first[1]?first[1].replace(/^(?:"|'|`)(.*)(?:"|'|`)$/,"$1"):first[0]
if("*"===ns&&(ns=wildcardFirstSym),null===next)return o[ns]=null,o
if(null===o[ns])return o
const{index}=next,nextPath=`${str.substr(index,str.length-1)}`
return o[ns]=o[ns]||[],ns!==wildcardFirstSym&&0===o[ns].length&&o[ns].push(...o[wildcardFirstSym]||[]),ns===wildcardFirstSym&&Object.keys(o).forEach((function(k){o[k]&&o[k].push(nextPath)})),o[ns].push(nextPath),o}),{}),result={[redactFmtSym]:fastRedact({paths,censor,serialize,strict:false})}
return[...Object.keys(shape),...Object.getOwnPropertySymbols(shape)].reduce(((o,k)=>{if(null===shape[k])o[k]=value=>((...args)=>serialize("function"==typeof censor?censor(...args):censor))(value,[k])
else{const wrappedCensor="function"==typeof censor?(value,path)=>censor(value,[k,...path]):censor
o[k]=fastRedact({paths:shape[k],censor:wrappedCensor,serialize,strict:false})}return o}),result)}},4941:module=>{"use strict"
const setLevelSym=Symbol("pino.setLevel"),getLevelSym=Symbol("pino.getLevel"),levelValSym=Symbol("pino.levelVal"),useLevelLabelsSym=Symbol("pino.useLevelLabels"),useOnlyCustomLevelsSym=Symbol("pino.useOnlyCustomLevels"),mixinSym=Symbol("pino.mixin"),lsCacheSym=Symbol("pino.lsCache"),chindingsSym=Symbol("pino.chindings"),parsedChindingsSym=Symbol("pino.parsedChindings"),asJsonSym=Symbol("pino.asJson"),writeSym=Symbol("pino.write"),redactFmtSym=Symbol("pino.redactFmt"),timeSym=Symbol("pino.time"),timeSliceIndexSym=Symbol("pino.timeSliceIndex"),streamSym=Symbol("pino.stream"),stringifySym=Symbol("pino.stringify"),stringifiersSym=Symbol("pino.stringifiers"),endSym=Symbol("pino.end"),formatOptsSym=Symbol("pino.formatOpts"),messageKeySym=Symbol("pino.messageKey"),nestedKeySym=Symbol("pino.nestedKey"),mixinMergeStrategySym=Symbol("pino.mixinMergeStrategy"),wildcardFirstSym=Symbol("pino.wildcardFirst"),serializersSym=Symbol.for("pino.serializers"),formattersSym=Symbol.for("pino.formatters"),hooksSym=Symbol.for("pino.hooks"),needsMetadataGsym=Symbol.for("pino.metadata")
module.exports={setLevelSym,getLevelSym,levelValSym,useLevelLabelsSym,mixinSym,lsCacheSym,chindingsSym,parsedChindingsSym,asJsonSym,writeSym,serializersSym,redactFmtSym,timeSym,timeSliceIndexSym,streamSym,stringifySym,stringifiersSym,endSym,formatOptsSym,messageKeySym,nestedKeySym,wildcardFirstSym,needsMetadataGsym,useOnlyCustomLevelsSym,formattersSym,hooksSym,mixinMergeStrategySym}},9649:module=>{"use strict"
module.exports={nullTime:()=>"",epochTime:()=>`,"time":${Date.now()}`,unixTime:()=>`,"time":${Math.round(Date.now()/1e3)}`,isoTime:()=>`,"time":"${new Date(Date.now()).toISOString()}"`}},9952:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const format=__webpack_require__(4532),{mapHttpRequest,mapHttpResponse}=__webpack_require__(4186),SonicBoom=__webpack_require__(4656),stringifySafe=__webpack_require__(2988),{lsCacheSym,chindingsSym,parsedChindingsSym,writeSym,serializersSym,formatOptsSym,endSym,stringifiersSym,stringifySym,wildcardFirstSym,needsMetadataGsym,redactFmtSym,streamSym,nestedKeySym,formattersSym,messageKeySym}=__webpack_require__(4941)
function noop(){}function asString(str){let result="",last=0,found=!1,point=255
const l=str.length
if(l>100)return JSON.stringify(str)
for(var i=0;i<l&&point>=32;i++)point=str.charCodeAt(i),34!==point&&92!==point||(result+=str.slice(last,i)+"\\",last=i,found=!0)
return found?result+=str.slice(last):result=str,point<32?JSON.stringify(str):'"'+result+'"'}function getPrettyStream(opts,prettifier,dest,instance){if(prettifier&&"function"==typeof prettifier)return prettifierMetaWrapper((prettifier=prettifier.bind(instance))(opts),dest,opts)
try{const prettyFactory=__webpack_require__(1686).prettyFactory||__webpack_require__(1686)
return prettyFactory.asMetaWrapper=prettifierMetaWrapper,prettifierMetaWrapper(prettyFactory(opts),dest,opts)}catch(e){if(e.message.startsWith("Cannot find module 'pino-pretty'"))throw Error("Missing `pino-pretty` module: `pino-pretty` must be installed separately")
throw e}}function prettifierMetaWrapper(pretty,dest,opts){opts=Object.assign({suppressFlushSyncWarning:!1},opts)
let warned=!1
return{[needsMetadataGsym]:!0,lastLevel:0,lastMsg:null,lastObj:null,lastLogger:null,flushSync(){opts.suppressFlushSyncWarning||warned||(warned=!0,setMetadataProps(dest,this),dest.write(pretty(Object.assign({level:40,msg:"pino.final with prettyPrint does not support flushing",time:Date.now()},this.chindings()))))},chindings(){const lastLogger=this.lastLogger
let chindings=null
return lastLogger?(lastLogger.hasOwnProperty(parsedChindingsSym)?chindings=lastLogger[parsedChindingsSym]:(chindings=JSON.parse("{"+lastLogger[chindingsSym].substr(1)+"}"),lastLogger[parsedChindingsSym]=chindings),chindings):null},write(chunk){const lastLogger=this.lastLogger,chindings=this.chindings()
let time=this.lastTime
time=time.match(/^\d+/)?parseInt(time):time.slice(1,-1)
const lastObj=this.lastObj,lastMsg=this.lastMsg,formatters=lastLogger[formattersSym],formattedObj=formatters.log?formatters.log(lastObj):lastObj,messageKey=lastLogger[messageKeySym]
lastMsg&&formattedObj&&!formattedObj.hasOwnProperty(messageKey)&&(formattedObj[messageKey]=lastMsg)
const obj=Object.assign({level:this.lastLevel,time},formattedObj,null),serializers=lastLogger[serializersSym],keys=Object.keys(serializers)
for(var i=0;i<keys.length;i++){const key=keys[i]
void 0!==obj[key]&&(obj[key]=serializers[key](obj[key]))}for(const key in chindings)obj.hasOwnProperty(key)||(obj[key]=chindings[key])
const redact=lastLogger[stringifiersSym][redactFmtSym],formatted=pretty("function"==typeof redact?redact(obj):obj)
void 0!==formatted&&(setMetadataProps(dest,this),dest.write(formatted))}}}function buildSafeSonicBoom(opts){const stream=new SonicBoom(opts)
return stream.on("error",(function filterBrokenPipe(err){if("EPIPE"===err.code)return stream.write=noop,stream.end=noop,stream.flushSync=noop,void(stream.destroy=noop)
stream.removeListener("error",filterBrokenPipe),stream.emit("error",err)})),stream}function setMetadataProps(dest,that){!0===dest[needsMetadataGsym]&&(dest.lastLevel=that.lastLevel,dest.lastMsg=that.lastMsg,dest.lastObj=that.lastObj,dest.lastTime=that.lastTime,dest.lastLogger=that.lastLogger)}module.exports={noop,buildSafeSonicBoom,getPrettyStream,asChindings:function(instance,bindings){let value,data=instance[chindingsSym]
const stringify=instance[stringifySym],stringifiers=instance[stringifiersSym],wildcardStringifier=stringifiers[wildcardFirstSym],serializers=instance[serializersSym]
bindings=(0,instance[formattersSym].bindings)(bindings)
for(const key in bindings){value=bindings[key]
if(!0===("level"!==key&&"serializers"!==key&&"formatters"!==key&&"customLevels"!==key&&bindings.hasOwnProperty(key)&&void 0!==value)){if(value=serializers[key]?serializers[key](value):value,value=(stringifiers[key]||wildcardStringifier||stringify)(value),void 0===value)continue
data+=',"'+key+'":'+value}}return data},asJson:function(obj,msg,num,time){const stringify=this[stringifySym],stringifiers=this[stringifiersSym],end=this[endSym],chindings=this[chindingsSym],serializers=this[serializersSym],formatters=this[formattersSym],messageKey=this[messageKeySym]
let value,data=this[lsCacheSym][num]+time
data+=chindings
const notHasOwnProperty=void 0===obj.hasOwnProperty
formatters.log&&(obj=formatters.log(obj)),void 0!==msg&&(obj[messageKey]=msg)
const wildcardStringifier=stringifiers[wildcardFirstSym]
for(const key in obj)if(value=obj[key],(notHasOwnProperty||obj.hasOwnProperty(key))&&void 0!==value){value=serializers[key]?serializers[key](value):value
const stringifier=stringifiers[key]||wildcardStringifier
switch(typeof value){case"undefined":case"function":continue
case"number":!1===Number.isFinite(value)&&(value=null)
case"boolean":stringifier&&(value=stringifier(value))
break
case"string":value=(stringifier||asString)(value)
break
default:value=(stringifier||stringify)(value)}if(void 0===value)continue
data+=',"'+key+'":'+value}return data+end},genLog:function(level,hook){return hook?function(...args){hook.call(this,args,LOG,level)}:LOG
function LOG(o,...n){if("object"==typeof o){let formatParams,msg=o
null!==o&&(o.method&&o.headers&&o.socket?o=mapHttpRequest(o):"function"==typeof o.setHeader&&(o=mapHttpResponse(o))),this[nestedKeySym]&&(o={[this[nestedKeySym]]:o}),null===msg&&0===n.length?formatParams=[null]:(msg=n.shift(),formatParams=n),this[writeSym](o,format(msg,formatParams,this[formatOptsSym]),level)}else this[writeSym](null,format(o,n,this[formatOptsSym]),level)}},createArgsNormalizer:function(defaultOptions){return function(instance,opts={},stream){if("string"==typeof opts?(stream=buildSafeSonicBoom({dest:opts,sync:!0}),opts={}):"string"==typeof stream?stream=buildSafeSonicBoom({dest:stream,sync:!0}):(opts instanceof SonicBoom||opts.writable||opts._writableState)&&(stream=opts,opts=null),"extreme"in(opts=Object.assign({},defaultOptions,opts)))throw Error("The extreme option has been removed, use pino.destination({ sync: false }) instead")
if("onTerminated"in opts)throw Error("The onTerminated option has been removed, use pino.final instead")
"changeLevelName"in opts&&(process.emitWarning("The changeLevelName option is deprecated and will be removed in v7. Use levelKey instead.",{code:"changeLevelName_deprecation"}),opts.levelKey=opts.changeLevelName,delete opts.changeLevelName)
const{enabled,prettyPrint,prettifier,messageKey}=opts
if(!1===enabled&&(opts.level="silent"),(stream=stream||process.stdout)===process.stdout&&stream.fd>=0&&!function(stream){return stream.write!==stream.constructor.prototype.write}(stream)&&(stream=buildSafeSonicBoom({fd:stream.fd,sync:!0})),prettyPrint){stream=getPrettyStream(Object.assign({messageKey},prettyPrint),prettifier,stream,instance)}return{opts,stream}}},final:function(logger,handler){if(void 0===logger||"function"!=typeof logger.child)throw Error("expected a pino logger instance")
const hasHandler=void 0!==handler
if(hasHandler&&"function"!=typeof handler)throw Error("if supplied, the handler parameter should be a function")
const stream=logger[streamSym]
if("function"!=typeof stream.flushSync)throw Error("final requires a stream that has a flushSync method, such as pino.destination")
const finalLogger=new Proxy(logger,{get:(logger,key)=>key in logger.levels.values?(...args)=>{logger[key](...args),stream.flushSync()}:logger[key]})
return hasHandler?(err=null,...args)=>{try{stream.flushSync()}catch(e){}return handler(err,finalLogger,...args)}:finalLogger},stringify:function(obj){try{return JSON.stringify(obj)}catch(_){return stringifySafe(obj)}},buildFormatters:function(level,bindings,log){return{level,bindings,log}}}},8167:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const os=__webpack_require__(2037),stdSerializers=__webpack_require__(4186),redaction=__webpack_require__(5434),time=__webpack_require__(9649),proto=__webpack_require__(5092),symbols=__webpack_require__(4941),{assertDefaultLevelFound,mappings,genLsCache}=__webpack_require__(6441),{createArgsNormalizer,asChindings,final,stringify,buildSafeSonicBoom,buildFormatters,noop}=__webpack_require__(9952),{version}=__webpack_require__(8508),{mixinMergeStrategySym}=__webpack_require__(4941),{chindingsSym,redactFmtSym,serializersSym,timeSym,timeSliceIndexSym,streamSym,stringifySym,stringifiersSym,setLevelSym,endSym,formatOptsSym,messageKeySym,nestedKeySym,mixinSym,useOnlyCustomLevelsSym,formattersSym,hooksSym}=symbols,{epochTime,nullTime}=time,{pid}=process,hostname=os.hostname(),defaultErrorSerializer=stdSerializers.err,defaultOptions={level:"info",messageKey:"msg",nestedKey:null,enabled:!0,prettyPrint:!1,base:{pid,hostname},serializers:Object.assign(Object.create(null),{err:defaultErrorSerializer}),formatters:Object.assign(Object.create(null),{bindings:bindings=>bindings,level:(label,number)=>({level:number})}),hooks:{logMethod:void 0},timestamp:epochTime,name:void 0,redact:null,customLevels:null,levelKey:void 0,useOnlyCustomLevels:!1},normalize=createArgsNormalizer(defaultOptions),serializers=Object.assign(Object.create(null),stdSerializers)
function pino(...args){const instance={},{opts,stream}=normalize(instance,...args),{redact,crlf,serializers,timestamp,messageKey,nestedKey,base,name,level,customLevels,useLevelLabels,changeLevelName,levelKey,mixin,mixinMergeStrategy,useOnlyCustomLevels,formatters,hooks}=opts,allFormatters=buildFormatters(formatters.level,formatters.bindings,formatters.log)
!useLevelLabels||changeLevelName||levelKey?!changeLevelName&&!levelKey||useLevelLabels?(changeLevelName||levelKey)&&useLevelLabels&&(process.emitWarning("useLevelLabels is deprecated, use the formatters.level option instead","Warning","PINODEP001"),process.emitWarning("changeLevelName and levelKey are deprecated, use the formatters.level option instead","Warning","PINODEP002"),allFormatters.level=function(name){return function(label,number){return{[name]:label}}}(changeLevelName||levelKey)):(process.emitWarning("changeLevelName and levelKey are deprecated, use the formatters.level option instead","Warning","PINODEP002"),allFormatters.level=function(name){return function(label,number){return{[name]:number}}}(changeLevelName||levelKey)):(process.emitWarning("useLevelLabels is deprecated, use the formatters.level option instead","Warning","PINODEP001"),allFormatters.level=labelsFormatter),serializers[Symbol.for("pino.*")]&&(process.emitWarning("The pino.* serializer is deprecated, use the formatters.log options instead","Warning","PINODEP003"),allFormatters.log=serializers[Symbol.for("pino.*")]),allFormatters.bindings||(allFormatters.bindings=defaultOptions.formatters.bindings),allFormatters.level||(allFormatters.level=defaultOptions.formatters.level)
const stringifiers=redact?redaction(redact,stringify):{},formatOpts=redact?{stringify:stringifiers[redactFmtSym]}:{stringify},end="}"+(crlf?"\r\n":"\n"),coreChindings=asChindings.bind(null,{[chindingsSym]:"",[serializersSym]:serializers,[stringifiersSym]:stringifiers,[stringifySym]:stringify,[formattersSym]:allFormatters})
let chindings=""
null!==base&&(chindings=coreChindings(void 0===name?base:Object.assign({},base,{name})))
const time=timestamp instanceof Function?timestamp:timestamp?epochTime:nullTime,timeSliceIndex=time().indexOf(":")+1
if(useOnlyCustomLevels&&!customLevels)throw Error("customLevels is required if useOnlyCustomLevels is set true")
if(mixin&&"function"!=typeof mixin)throw Error(`Unknown mixin type "${typeof mixin}" - expected "function"`)
assertDefaultLevelFound(level,customLevels,useOnlyCustomLevels)
const levels=mappings(customLevels,useOnlyCustomLevels)
return Object.assign(instance,{levels,[useOnlyCustomLevelsSym]:useOnlyCustomLevels,[streamSym]:stream,[timeSym]:time,[timeSliceIndexSym]:timeSliceIndex,[stringifySym]:stringify,[stringifiersSym]:stringifiers,[endSym]:end,[formatOptsSym]:formatOpts,[messageKeySym]:messageKey,[nestedKeySym]:nestedKey,[serializersSym]:serializers,[mixinSym]:mixin,[mixinMergeStrategySym]:mixinMergeStrategy,[chindingsSym]:chindings,[formattersSym]:allFormatters,[hooksSym]:hooks,silent:noop}),Object.setPrototypeOf(instance,proto()),genLsCache(instance),instance[setLevelSym](level),instance}function labelsFormatter(label,number){return{level:label}}module.exports=pino,module.exports.extreme=(dest=process.stdout.fd)=>(process.emitWarning("The pino.extreme() option is deprecated and will be removed in v7. Use pino.destination({ sync: false }) instead.",{code:"extreme_deprecation"}),buildSafeSonicBoom({dest,minLength:4096,sync:!1})),module.exports.destination=(dest=process.stdout.fd)=>"object"==typeof dest?(dest.dest=dest.dest||process.stdout.fd,buildSafeSonicBoom(dest)):buildSafeSonicBoom({dest,minLength:0,sync:!0}),module.exports.final=final,module.exports.levels=mappings(),module.exports.stdSerializers=serializers,module.exports.stdTimeFunctions=Object.assign({},time),module.exports.symbols=symbols,module.exports.version=version,module.exports.default=pino,module.exports.pino=pino},4186:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const errSerializer=__webpack_require__(7657),reqSerializers=__webpack_require__(6836),resSerializers=__webpack_require__(6364)
module.exports={err:errSerializer,mapHttpRequest:reqSerializers.mapHttpRequest,mapHttpResponse:resSerializers.mapHttpResponse,req:reqSerializers.reqSerializer,res:resSerializers.resSerializer,wrapErrorSerializer:function(customSerializer){return customSerializer===errSerializer?customSerializer:function(err){return customSerializer(errSerializer(err))}},wrapRequestSerializer:function(customSerializer){return customSerializer===reqSerializers.reqSerializer?customSerializer:function(req){return customSerializer(reqSerializers.reqSerializer(req))}},wrapResponseSerializer:function(customSerializer){return customSerializer===resSerializers.resSerializer?customSerializer:function(res){return customSerializer(resSerializers.resSerializer(res))}}}},7657:module=>{"use strict"
module.exports=function errSerializer(err){if(!(err instanceof Error))return err
err[seen]=void 0
const _err=Object.create(pinoErrProto)
_err.type="[object Function]"===toString.call(err.constructor)?err.constructor.name:err.name,_err.message=err.message,_err.stack=err.stack
for(const key in err)if(void 0===_err[key]){const val=err[key]
val instanceof Error?val.hasOwnProperty(seen)||(_err[key]=errSerializer(val)):_err[key]=val}return delete err[seen],_err.raw=err,_err}
const{toString}=Object.prototype,seen=Symbol("circular-ref-tag"),rawSymbol=Symbol("pino-raw-err-ref"),pinoErrProto=Object.create({},{type:{enumerable:!0,writable:!0,value:void 0},message:{enumerable:!0,writable:!0,value:void 0},stack:{enumerable:!0,writable:!0,value:void 0},raw:{enumerable:!1,get:function(){return this[rawSymbol]},set:function(val){this[rawSymbol]=val}}})
Object.defineProperty(pinoErrProto,rawSymbol,{writable:!0,value:{}})},6836:module=>{"use strict"
module.exports={mapHttpRequest:function(req){return{req:reqSerializer(req)}},reqSerializer}
const rawSymbol=Symbol("pino-raw-req-ref"),pinoReqProto=Object.create({},{id:{enumerable:!0,writable:!0,value:""},method:{enumerable:!0,writable:!0,value:""},url:{enumerable:!0,writable:!0,value:""},query:{enumerable:!0,writable:!0,value:""},params:{enumerable:!0,writable:!0,value:""},headers:{enumerable:!0,writable:!0,value:{}},remoteAddress:{enumerable:!0,writable:!0,value:""},remotePort:{enumerable:!0,writable:!0,value:""},raw:{enumerable:!1,get:function(){return this[rawSymbol]},set:function(val){this[rawSymbol]=val}}})
function reqSerializer(req){const connection=req.info||req.socket,_req=Object.create(pinoReqProto)
return _req.id="function"==typeof req.id?req.id():req.id||(req.info?req.info.id:void 0),_req.method=req.method,req.originalUrl?(_req.url=req.originalUrl,_req.query=req.query,_req.params=req.params):_req.url=req.path||(req.url?req.url.path||req.url:void 0),_req.headers=req.headers,_req.remoteAddress=connection&&connection.remoteAddress,_req.remotePort=connection&&connection.remotePort,_req.raw=req.raw||req,_req}Object.defineProperty(pinoReqProto,rawSymbol,{writable:!0,value:{}})},6364:module=>{"use strict"
module.exports={mapHttpResponse:function(res){return{res:resSerializer(res)}},resSerializer}
const rawSymbol=Symbol("pino-raw-res-ref"),pinoResProto=Object.create({},{statusCode:{enumerable:!0,writable:!0,value:0},headers:{enumerable:!0,writable:!0,value:""},raw:{enumerable:!1,get:function(){return this[rawSymbol]},set:function(val){this[rawSymbol]=val}}})
function resSerializer(res){const _res=Object.create(pinoResProto)
return _res.statusCode=res.statusCode,_res.headers=res.getHeaders?res.getHeaders():res._headers,_res.raw=res,_res}Object.defineProperty(pinoResProto,rawSymbol,{writable:!0,value:{}})},8556:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const{format}=__webpack_require__(3837)
module.exports=function(){const codes={},emitted=new Map
return{create:function(name,code,message){if(!name)throw new Error("Warning name must not be empty")
if(!code)throw new Error("Warning code must not be empty")
if(!message)throw new Error("Warning message must not be empty")
if(code=code.toUpperCase(),void 0!==codes[code])throw new Error(`The code '${code}' already exist`)
return emitted.set(code,!1),codes[code]=function(a,b,c){let formatted
return formatted=a&&b&&c?format(message,a,b,c):a&&b?format(message,a,b):a?format(message,a):message,{code,name,message:formatted}},codes[code]},emit:function(code,a,b,c){if(void 0===codes[code])throw new Error(`The code '${code}' does not exist`)
if(!0===emitted.get(code))return
emitted.set(code,!0)
const warning=codes[code](a,b,c)
process.emitWarning(warning.message,warning.name,warning.code)},emitted}}},2181:(module,__unused_webpack_exports,__webpack_require__)=>{var once=__webpack_require__(5962),eos=__webpack_require__(8839),fs=__webpack_require__(7147),noop=function(){},ancient=/^v?\.0/.test(process.version),isFn=function(fn){return"function"==typeof fn},destroyer=function(stream,reading,writing,callback){callback=once(callback)
var closed=!1
stream.on("close",(function(){closed=!0})),eos(stream,{readable:reading,writable:writing},(function(err){if(err)return callback(err)
closed=!0,callback()}))
var destroyed=!1
return function(err){if(!closed&&!destroyed)return destroyed=!0,function(stream){return!!ancient&&!!fs&&(stream instanceof(fs.ReadStream||noop)||stream instanceof(fs.WriteStream||noop))&&isFn(stream.close)}(stream)?stream.close(noop):function(stream){return stream.setHeader&&isFn(stream.abort)}(stream)?stream.abort():isFn(stream.destroy)?stream.destroy():void callback(err||new Error("stream was destroyed"))}},call=function(fn){fn()},pipe=function(from,to){return from.pipe(to)}
module.exports=function(){var error,streams=Array.prototype.slice.call(arguments),callback=isFn(streams[streams.length-1]||noop)&&streams.pop()||noop
if(Array.isArray(streams[0])&&(streams=streams[0]),streams.length<2)throw new Error("pump requires two streams per minimum")
var destroys=streams.map((function(stream,i){var reading=i<streams.length-1
return destroyer(stream,reading,i>0,(function(err){error||(error=err),err&&destroys.forEach(call),reading||(destroys.forEach(call),callback(error))}))}))
return streams.reduce(pipe)}},4532:module=>{"use strict"
function tryStringify(o){try{return JSON.stringify(o)}catch(e){return'"[Circular]"'}}module.exports=function(f,args,opts){var ss=opts&&opts.stringify||tryStringify
if("object"==typeof f&&null!==f){var len=args.length+1
if(1===len)return f
var objects=new Array(len)
objects[0]=ss(f)
for(var index=1;index<len;index++)objects[index]=ss(args[index])
return objects.join(" ")}if("string"!=typeof f)return f
var argLen=args.length
if(0===argLen)return f
for(var str="",a=0,lastPos=-1,flen=f&&f.length||0,i=0;i<flen;){if(37===f.charCodeAt(i)&&i+1<flen){switch(lastPos=lastPos>-1?lastPos:0,f.charCodeAt(i+1)){case 100:case 102:if(a>=argLen)break
if(null==args[a])break
lastPos<i&&(str+=f.slice(lastPos,i)),str+=Number(args[a]),lastPos=i+2,i++
break
case 105:if(a>=argLen)break
if(null==args[a])break
lastPos<i&&(str+=f.slice(lastPos,i)),str+=Math.floor(Number(args[a])),lastPos=i+2,i++
break
case 79:case 111:case 106:if(a>=argLen)break
if(void 0===args[a])break
lastPos<i&&(str+=f.slice(lastPos,i))
var type=typeof args[a]
if("string"===type){str+="'"+args[a]+"'",lastPos=i+2,i++
break}if("function"===type){str+=args[a].name||"<anonymous>",lastPos=i+2,i++
break}str+=ss(args[a]),lastPos=i+2,i++
break
case 115:if(a>=argLen)break
lastPos<i&&(str+=f.slice(lastPos,i)),str+=String(args[a]),lastPos=i+2,i++
break
case 37:lastPos<i&&(str+=f.slice(lastPos,i)),str+="%",lastPos=i+2,i++,a--}++a}++i}if(-1===lastPos)return f
lastPos<flen&&(str+=f.slice(lastPos))
return str}},7638:module=>{"use strict"
const codes={}
function createErrorType(code,message,Base){Base||(Base=Error)
class NodeError extends Base{constructor(arg1,arg2,arg3){super(function(arg1,arg2,arg3){return"string"==typeof message?message:message(arg1,arg2,arg3)}(arg1,arg2,arg3))}}NodeError.prototype.name=Base.name,NodeError.prototype.code=code,codes[code]=NodeError}function oneOf(expected,thing){if(Array.isArray(expected)){const len=expected.length
return expected=expected.map((i=>String(i))),len>2?`one of ${thing} ${expected.slice(0,len-1).join(", ")}, or `+expected[len-1]:2===len?`one of ${thing} ${expected[0]} or ${expected[1]}`:`of ${thing} ${expected[0]}`}return`of ${thing} ${String(expected)}`}createErrorType("ERR_INVALID_OPT_VALUE",(function(name,value){return'The value "'+value+'" is invalid for option "'+name+'"'}),TypeError),createErrorType("ERR_INVALID_ARG_TYPE",(function(name,expected,actual){let determiner
var search,pos
let msg
if("string"==typeof expected&&(search="not ",expected.substr(!pos||pos<0?0:+pos,search.length)===search)?(determiner="must not be",expected=expected.replace(/^not /,"")):determiner="must be",function(str,search,this_len){return(void 0===this_len||this_len>str.length)&&(this_len=str.length),str.substring(this_len-search.length,this_len)===search}(name," argument"))msg=`The ${name} ${determiner} ${oneOf(expected,"type")}`
else{const type=function(str,search,start){return"number"!=typeof start&&(start=0),!(start+search.length>str.length)&&-1!==str.indexOf(search,start)}(name,".")?"property":"argument"
msg=`The "${name}" ${type} ${determiner} ${oneOf(expected,"type")}`}return msg+=". Received type "+typeof actual,msg}),TypeError),createErrorType("ERR_STREAM_PUSH_AFTER_EOF","stream.push() after EOF"),createErrorType("ERR_METHOD_NOT_IMPLEMENTED",(function(name){return"The "+name+" method is not implemented"})),createErrorType("ERR_STREAM_PREMATURE_CLOSE","Premature close"),createErrorType("ERR_STREAM_DESTROYED",(function(name){return"Cannot call "+name+" after a stream was destroyed"})),createErrorType("ERR_MULTIPLE_CALLBACK","Callback called multiple times"),createErrorType("ERR_STREAM_CANNOT_PIPE","Cannot pipe, not readable"),createErrorType("ERR_STREAM_WRITE_AFTER_END","write after end"),createErrorType("ERR_STREAM_NULL_VALUES","May not write null values to stream",TypeError),createErrorType("ERR_UNKNOWN_ENCODING",(function(arg){return"Unknown encoding: "+arg}),TypeError),createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT","stream.unshift() after end event"),module.exports.q=codes},673:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var objectKeys=Object.keys||function(obj){var keys=[]
for(var key in obj)keys.push(key)
return keys}
module.exports=Duplex
var Readable=__webpack_require__(5006),Writable=__webpack_require__(8719)
__webpack_require__(1828)(Duplex,Readable)
for(var keys=objectKeys(Writable.prototype),v=0;v<keys.length;v++){var method=keys[v]
Duplex.prototype[method]||(Duplex.prototype[method]=Writable.prototype[method])}function Duplex(options){if(!(this instanceof Duplex))return new Duplex(options)
Readable.call(this,options),Writable.call(this,options),this.allowHalfOpen=!0,options&&(!1===options.readable&&(this.readable=!1),!1===options.writable&&(this.writable=!1),!1===options.allowHalfOpen&&(this.allowHalfOpen=!1,this.once("end",onend)))}function onend(){this._writableState.ended||process.nextTick(onEndNT,this)}function onEndNT(self){self.end()}Object.defineProperty(Duplex.prototype,"writableHighWaterMark",{enumerable:!1,get:function(){return this._writableState.highWaterMark}}),Object.defineProperty(Duplex.prototype,"writableBuffer",{enumerable:!1,get:function(){return this._writableState&&this._writableState.getBuffer()}}),Object.defineProperty(Duplex.prototype,"writableLength",{enumerable:!1,get:function(){return this._writableState.length}}),Object.defineProperty(Duplex.prototype,"destroyed",{enumerable:!1,get:function(){return void 0!==this._readableState&&void 0!==this._writableState&&(this._readableState.destroyed&&this._writableState.destroyed)},set:function(value){void 0!==this._readableState&&void 0!==this._writableState&&(this._readableState.destroyed=value,this._writableState.destroyed=value)}})},4343:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
module.exports=PassThrough
var Transform=__webpack_require__(8597)
function PassThrough(options){if(!(this instanceof PassThrough))return new PassThrough(options)
Transform.call(this,options)}__webpack_require__(1828)(PassThrough,Transform),PassThrough.prototype._transform=function(chunk,encoding,cb){cb(null,chunk)}},5006:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var Duplex
module.exports=Readable,Readable.ReadableState=ReadableState
__webpack_require__(2361).EventEmitter
var EElistenerCount=function(emitter,type){return emitter.listeners(type).length},Stream=__webpack_require__(1829),Buffer=__webpack_require__(4300).Buffer,OurUint8Array=global.Uint8Array||function(){}
var debug,debugUtil=__webpack_require__(3837)
debug=debugUtil&&debugUtil.debuglog?debugUtil.debuglog("stream"):function(){}
var StringDecoder,createReadableStreamAsyncIterator,from,BufferList=__webpack_require__(4506),destroyImpl=__webpack_require__(3390),getHighWaterMark=__webpack_require__(1111).getHighWaterMark,_require$codes=__webpack_require__(7638).q,ERR_INVALID_ARG_TYPE=_require$codes.ERR_INVALID_ARG_TYPE,ERR_STREAM_PUSH_AFTER_EOF=_require$codes.ERR_STREAM_PUSH_AFTER_EOF,ERR_METHOD_NOT_IMPLEMENTED=_require$codes.ERR_METHOD_NOT_IMPLEMENTED,ERR_STREAM_UNSHIFT_AFTER_END_EVENT=_require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT
__webpack_require__(1828)(Readable,Stream)
var errorOrDestroy=destroyImpl.errorOrDestroy,kProxyEvents=["error","close","destroy","pause","resume"]
function ReadableState(options,stream,isDuplex){Duplex=Duplex||__webpack_require__(673),options=options||{},"boolean"!=typeof isDuplex&&(isDuplex=stream instanceof Duplex),this.objectMode=!!options.objectMode,isDuplex&&(this.objectMode=this.objectMode||!!options.readableObjectMode),this.highWaterMark=getHighWaterMark(this,options,"readableHighWaterMark",isDuplex),this.buffer=new BufferList,this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=null,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.resumeScheduled=!1,this.paused=!0,this.emitClose=!1!==options.emitClose,this.autoDestroy=!!options.autoDestroy,this.destroyed=!1,this.defaultEncoding=options.defaultEncoding||"utf8",this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,options.encoding&&(StringDecoder||(StringDecoder=__webpack_require__(7361).s),this.decoder=new StringDecoder(options.encoding),this.encoding=options.encoding)}function Readable(options){if(Duplex=Duplex||__webpack_require__(673),!(this instanceof Readable))return new Readable(options)
var isDuplex=this instanceof Duplex
this._readableState=new ReadableState(options,this,isDuplex),this.readable=!0,options&&("function"==typeof options.read&&(this._read=options.read),"function"==typeof options.destroy&&(this._destroy=options.destroy)),Stream.call(this)}function readableAddChunk(stream,chunk,encoding,addToFront,skipChunkCheck){debug("readableAddChunk",chunk)
var er,state=stream._readableState
if(null===chunk)state.reading=!1,function(stream,state){if(debug("onEofChunk"),state.ended)return
if(state.decoder){var chunk=state.decoder.end()
chunk&&chunk.length&&(state.buffer.push(chunk),state.length+=state.objectMode?1:chunk.length)}state.ended=!0,state.sync?emitReadable(stream):(state.needReadable=!1,state.emittedReadable||(state.emittedReadable=!0,emitReadable_(stream)))}(stream,state)
else if(skipChunkCheck||(er=function(state,chunk){var er
obj=chunk,Buffer.isBuffer(obj)||obj instanceof OurUint8Array||"string"==typeof chunk||void 0===chunk||state.objectMode||(er=new ERR_INVALID_ARG_TYPE("chunk",["string","Buffer","Uint8Array"],chunk))
var obj
return er}(state,chunk)),er)errorOrDestroy(stream,er)
else if(state.objectMode||chunk&&chunk.length>0)if("string"==typeof chunk||state.objectMode||Object.getPrototypeOf(chunk)===Buffer.prototype||(chunk=function(chunk){return Buffer.from(chunk)}(chunk)),addToFront)state.endEmitted?errorOrDestroy(stream,new ERR_STREAM_UNSHIFT_AFTER_END_EVENT):addChunk(stream,state,chunk,!0)
else if(state.ended)errorOrDestroy(stream,new ERR_STREAM_PUSH_AFTER_EOF)
else{if(state.destroyed)return!1
state.reading=!1,state.decoder&&!encoding?(chunk=state.decoder.write(chunk),state.objectMode||0!==chunk.length?addChunk(stream,state,chunk,!1):maybeReadMore(stream,state)):addChunk(stream,state,chunk,!1)}else addToFront||(state.reading=!1,maybeReadMore(stream,state))
return!state.ended&&(state.length<state.highWaterMark||0===state.length)}function addChunk(stream,state,chunk,addToFront){state.flowing&&0===state.length&&!state.sync?(state.awaitDrain=0,stream.emit("data",chunk)):(state.length+=state.objectMode?1:chunk.length,addToFront?state.buffer.unshift(chunk):state.buffer.push(chunk),state.needReadable&&emitReadable(stream)),maybeReadMore(stream,state)}Object.defineProperty(Readable.prototype,"destroyed",{enumerable:!1,get:function(){return void 0!==this._readableState&&this._readableState.destroyed},set:function(value){this._readableState&&(this._readableState.destroyed=value)}}),Readable.prototype.destroy=destroyImpl.destroy,Readable.prototype._undestroy=destroyImpl.undestroy,Readable.prototype._destroy=function(err,cb){cb(err)},Readable.prototype.push=function(chunk,encoding){var skipChunkCheck,state=this._readableState
return state.objectMode?skipChunkCheck=!0:"string"==typeof chunk&&((encoding=encoding||state.defaultEncoding)!==state.encoding&&(chunk=Buffer.from(chunk,encoding),encoding=""),skipChunkCheck=!0),readableAddChunk(this,chunk,encoding,!1,skipChunkCheck)},Readable.prototype.unshift=function(chunk){return readableAddChunk(this,chunk,null,!0,!1)},Readable.prototype.isPaused=function(){return!1===this._readableState.flowing},Readable.prototype.setEncoding=function(enc){StringDecoder||(StringDecoder=__webpack_require__(7361).s)
var decoder=new StringDecoder(enc)
this._readableState.decoder=decoder,this._readableState.encoding=this._readableState.decoder.encoding
for(var p=this._readableState.buffer.head,content="";null!==p;)content+=decoder.write(p.data),p=p.next
return this._readableState.buffer.clear(),""!==content&&this._readableState.buffer.push(content),this._readableState.length=content.length,this}
function howMuchToRead(n,state){return n<=0||0===state.length&&state.ended?0:state.objectMode?1:n!=n?state.flowing&&state.length?state.buffer.head.data.length:state.length:(n>state.highWaterMark&&(state.highWaterMark=function(n){return n>=1073741824?n=1073741824:(n--,n|=n>>>1,n|=n>>>2,n|=n>>>4,n|=n>>>8,n|=n>>>16,n++),n}(n)),n<=state.length?n:state.ended?state.length:(state.needReadable=!0,0))}function emitReadable(stream){var state=stream._readableState
debug("emitReadable",state.needReadable,state.emittedReadable),state.needReadable=!1,state.emittedReadable||(debug("emitReadable",state.flowing),state.emittedReadable=!0,process.nextTick(emitReadable_,stream))}function emitReadable_(stream){var state=stream._readableState
debug("emitReadable_",state.destroyed,state.length,state.ended),state.destroyed||!state.length&&!state.ended||(stream.emit("readable"),state.emittedReadable=!1),state.needReadable=!state.flowing&&!state.ended&&state.length<=state.highWaterMark,flow(stream)}function maybeReadMore(stream,state){state.readingMore||(state.readingMore=!0,process.nextTick(maybeReadMore_,stream,state))}function maybeReadMore_(stream,state){for(;!state.reading&&!state.ended&&(state.length<state.highWaterMark||state.flowing&&0===state.length);){var len=state.length
if(debug("maybeReadMore read 0"),stream.read(0),len===state.length)break}state.readingMore=!1}function updateReadableListening(self){var state=self._readableState
state.readableListening=self.listenerCount("readable")>0,state.resumeScheduled&&!state.paused?state.flowing=!0:self.listenerCount("data")>0&&self.resume()}function nReadingNextTick(self){debug("readable nexttick read 0"),self.read(0)}function resume_(stream,state){debug("resume",state.reading),state.reading||stream.read(0),state.resumeScheduled=!1,stream.emit("resume"),flow(stream),state.flowing&&!state.reading&&stream.read(0)}function flow(stream){var state=stream._readableState
for(debug("flow",state.flowing);state.flowing&&null!==stream.read(););}function fromList(n,state){return 0===state.length?null:(state.objectMode?ret=state.buffer.shift():!n||n>=state.length?(ret=state.decoder?state.buffer.join(""):1===state.buffer.length?state.buffer.first():state.buffer.concat(state.length),state.buffer.clear()):ret=state.buffer.consume(n,state.decoder),ret)
var ret}function endReadable(stream){var state=stream._readableState
debug("endReadable",state.endEmitted),state.endEmitted||(state.ended=!0,process.nextTick(endReadableNT,state,stream))}function endReadableNT(state,stream){if(debug("endReadableNT",state.endEmitted,state.length),!state.endEmitted&&0===state.length&&(state.endEmitted=!0,stream.readable=!1,stream.emit("end"),state.autoDestroy)){var wState=stream._writableState;(!wState||wState.autoDestroy&&wState.finished)&&stream.destroy()}}function indexOf(xs,x){for(var i=0,l=xs.length;i<l;i++)if(xs[i]===x)return i
return-1}Readable.prototype.read=function(n){debug("read",n),n=parseInt(n,10)
var state=this._readableState,nOrig=n
if(0!==n&&(state.emittedReadable=!1),0===n&&state.needReadable&&((0!==state.highWaterMark?state.length>=state.highWaterMark:state.length>0)||state.ended))return debug("read: emitReadable",state.length,state.ended),0===state.length&&state.ended?endReadable(this):emitReadable(this),null
if(0===(n=howMuchToRead(n,state))&&state.ended)return 0===state.length&&endReadable(this),null
var ret,doRead=state.needReadable
return debug("need readable",doRead),(0===state.length||state.length-n<state.highWaterMark)&&debug("length less than watermark",doRead=!0),state.ended||state.reading?debug("reading or ended",doRead=!1):doRead&&(debug("do read"),state.reading=!0,state.sync=!0,0===state.length&&(state.needReadable=!0),this._read(state.highWaterMark),state.sync=!1,state.reading||(n=howMuchToRead(nOrig,state))),null===(ret=n>0?fromList(n,state):null)?(state.needReadable=state.length<=state.highWaterMark,n=0):(state.length-=n,state.awaitDrain=0),0===state.length&&(state.ended||(state.needReadable=!0),nOrig!==n&&state.ended&&endReadable(this)),null!==ret&&this.emit("data",ret),ret},Readable.prototype._read=function(n){errorOrDestroy(this,new ERR_METHOD_NOT_IMPLEMENTED("_read()"))},Readable.prototype.pipe=function(dest,pipeOpts){var src=this,state=this._readableState
switch(state.pipesCount){case 0:state.pipes=dest
break
case 1:state.pipes=[state.pipes,dest]
break
default:state.pipes.push(dest)}state.pipesCount+=1,debug("pipe count=%d opts=%j",state.pipesCount,pipeOpts)
var endFn=(!pipeOpts||!1!==pipeOpts.end)&&dest!==process.stdout&&dest!==process.stderr?onend:unpipe
function onunpipe(readable,unpipeInfo){debug("onunpipe"),readable===src&&unpipeInfo&&!1===unpipeInfo.hasUnpiped&&(unpipeInfo.hasUnpiped=!0,debug("cleanup"),dest.removeListener("close",onclose),dest.removeListener("finish",onfinish),dest.removeListener("drain",ondrain),dest.removeListener("error",onerror),dest.removeListener("unpipe",onunpipe),src.removeListener("end",onend),src.removeListener("end",unpipe),src.removeListener("data",ondata),cleanedUp=!0,!state.awaitDrain||dest._writableState&&!dest._writableState.needDrain||ondrain())}function onend(){debug("onend"),dest.end()}state.endEmitted?process.nextTick(endFn):src.once("end",endFn),dest.on("unpipe",onunpipe)
var ondrain=function(src){return function(){var state=src._readableState
debug("pipeOnDrain",state.awaitDrain),state.awaitDrain&&state.awaitDrain--,0===state.awaitDrain&&EElistenerCount(src,"data")&&(state.flowing=!0,flow(src))}}(src)
dest.on("drain",ondrain)
var cleanedUp=!1
function ondata(chunk){debug("ondata")
var ret=dest.write(chunk)
debug("dest.write",ret),!1===ret&&((1===state.pipesCount&&state.pipes===dest||state.pipesCount>1&&-1!==indexOf(state.pipes,dest))&&!cleanedUp&&(debug("false write response, pause",state.awaitDrain),state.awaitDrain++),src.pause())}function onerror(er){debug("onerror",er),unpipe(),dest.removeListener("error",onerror),0===EElistenerCount(dest,"error")&&errorOrDestroy(dest,er)}function onclose(){dest.removeListener("finish",onfinish),unpipe()}function onfinish(){debug("onfinish"),dest.removeListener("close",onclose),unpipe()}function unpipe(){debug("unpipe"),src.unpipe(dest)}return src.on("data",ondata),function(emitter,event,fn){if("function"==typeof emitter.prependListener)return emitter.prependListener(event,fn)
emitter._events&&emitter._events[event]?Array.isArray(emitter._events[event])?emitter._events[event].unshift(fn):emitter._events[event]=[fn,emitter._events[event]]:emitter.on(event,fn)}(dest,"error",onerror),dest.once("close",onclose),dest.once("finish",onfinish),dest.emit("pipe",src),state.flowing||(debug("pipe resume"),src.resume()),dest},Readable.prototype.unpipe=function(dest){var state=this._readableState,unpipeInfo={hasUnpiped:!1}
if(0===state.pipesCount)return this
if(1===state.pipesCount)return dest&&dest!==state.pipes||(dest||(dest=state.pipes),state.pipes=null,state.pipesCount=0,state.flowing=!1,dest&&dest.emit("unpipe",this,unpipeInfo)),this
if(!dest){var dests=state.pipes,len=state.pipesCount
state.pipes=null,state.pipesCount=0,state.flowing=!1
for(var i=0;i<len;i++)dests[i].emit("unpipe",this,{hasUnpiped:!1})
return this}var index=indexOf(state.pipes,dest)
return-1===index||(state.pipes.splice(index,1),state.pipesCount-=1,1===state.pipesCount&&(state.pipes=state.pipes[0]),dest.emit("unpipe",this,unpipeInfo)),this},Readable.prototype.on=function(ev,fn){var res=Stream.prototype.on.call(this,ev,fn),state=this._readableState
return"data"===ev?(state.readableListening=this.listenerCount("readable")>0,!1!==state.flowing&&this.resume()):"readable"===ev&&(state.endEmitted||state.readableListening||(state.readableListening=state.needReadable=!0,state.flowing=!1,state.emittedReadable=!1,debug("on readable",state.length,state.reading),state.length?emitReadable(this):state.reading||process.nextTick(nReadingNextTick,this))),res},Readable.prototype.addListener=Readable.prototype.on,Readable.prototype.removeListener=function(ev,fn){var res=Stream.prototype.removeListener.call(this,ev,fn)
return"readable"===ev&&process.nextTick(updateReadableListening,this),res},Readable.prototype.removeAllListeners=function(ev){var res=Stream.prototype.removeAllListeners.apply(this,arguments)
return"readable"!==ev&&void 0!==ev||process.nextTick(updateReadableListening,this),res},Readable.prototype.resume=function(){var state=this._readableState
return state.flowing||(debug("resume"),state.flowing=!state.readableListening,function(stream,state){state.resumeScheduled||(state.resumeScheduled=!0,process.nextTick(resume_,stream,state))}(this,state)),state.paused=!1,this},Readable.prototype.pause=function(){return debug("call pause flowing=%j",this._readableState.flowing),!1!==this._readableState.flowing&&(debug("pause"),this._readableState.flowing=!1,this.emit("pause")),this._readableState.paused=!0,this},Readable.prototype.wrap=function(stream){var _this=this,state=this._readableState,paused=!1
for(var i in stream.on("end",(function(){if(debug("wrapped end"),state.decoder&&!state.ended){var chunk=state.decoder.end()
chunk&&chunk.length&&_this.push(chunk)}_this.push(null)})),stream.on("data",(function(chunk){(debug("wrapped data"),state.decoder&&(chunk=state.decoder.write(chunk)),state.objectMode&&null==chunk)||(state.objectMode||chunk&&chunk.length)&&(_this.push(chunk)||(paused=!0,stream.pause()))})),stream)void 0===this[i]&&"function"==typeof stream[i]&&(this[i]=function(method){return function(){return stream[method].apply(stream,arguments)}}(i))
for(var n=0;n<kProxyEvents.length;n++)stream.on(kProxyEvents[n],this.emit.bind(this,kProxyEvents[n]))
return this._read=function(n){debug("wrapped _read",n),paused&&(paused=!1,stream.resume())},this},"function"==typeof Symbol&&(Readable.prototype[Symbol.asyncIterator]=function(){return void 0===createReadableStreamAsyncIterator&&(createReadableStreamAsyncIterator=__webpack_require__(8187)),createReadableStreamAsyncIterator(this)}),Object.defineProperty(Readable.prototype,"readableHighWaterMark",{enumerable:!1,get:function(){return this._readableState.highWaterMark}}),Object.defineProperty(Readable.prototype,"readableBuffer",{enumerable:!1,get:function(){return this._readableState&&this._readableState.buffer}}),Object.defineProperty(Readable.prototype,"readableFlowing",{enumerable:!1,get:function(){return this._readableState.flowing},set:function(state){this._readableState&&(this._readableState.flowing=state)}}),Readable._fromList=fromList,Object.defineProperty(Readable.prototype,"readableLength",{enumerable:!1,get:function(){return this._readableState.length}}),"function"==typeof Symbol&&(Readable.from=function(iterable,opts){return void 0===from&&(from=__webpack_require__(9705)),from(Readable,iterable,opts)})},8597:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
module.exports=Transform
var _require$codes=__webpack_require__(7638).q,ERR_METHOD_NOT_IMPLEMENTED=_require$codes.ERR_METHOD_NOT_IMPLEMENTED,ERR_MULTIPLE_CALLBACK=_require$codes.ERR_MULTIPLE_CALLBACK,ERR_TRANSFORM_ALREADY_TRANSFORMING=_require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,ERR_TRANSFORM_WITH_LENGTH_0=_require$codes.ERR_TRANSFORM_WITH_LENGTH_0,Duplex=__webpack_require__(673)
function afterTransform(er,data){var ts=this._transformState
ts.transforming=!1
var cb=ts.writecb
if(null===cb)return this.emit("error",new ERR_MULTIPLE_CALLBACK)
ts.writechunk=null,ts.writecb=null,null!=data&&this.push(data),cb(er)
var rs=this._readableState
rs.reading=!1,(rs.needReadable||rs.length<rs.highWaterMark)&&this._read(rs.highWaterMark)}function Transform(options){if(!(this instanceof Transform))return new Transform(options)
Duplex.call(this,options),this._transformState={afterTransform:afterTransform.bind(this),needTransform:!1,transforming:!1,writecb:null,writechunk:null,writeencoding:null},this._readableState.needReadable=!0,this._readableState.sync=!1,options&&("function"==typeof options.transform&&(this._transform=options.transform),"function"==typeof options.flush&&(this._flush=options.flush)),this.on("prefinish",prefinish)}function prefinish(){var _this=this
"function"!=typeof this._flush||this._readableState.destroyed?done(this,null,null):this._flush((function(er,data){done(_this,er,data)}))}function done(stream,er,data){if(er)return stream.emit("error",er)
if(null!=data&&stream.push(data),stream._writableState.length)throw new ERR_TRANSFORM_WITH_LENGTH_0
if(stream._transformState.transforming)throw new ERR_TRANSFORM_ALREADY_TRANSFORMING
return stream.push(null)}__webpack_require__(1828)(Transform,Duplex),Transform.prototype.push=function(chunk,encoding){return this._transformState.needTransform=!1,Duplex.prototype.push.call(this,chunk,encoding)},Transform.prototype._transform=function(chunk,encoding,cb){cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"))},Transform.prototype._write=function(chunk,encoding,cb){var ts=this._transformState
if(ts.writecb=cb,ts.writechunk=chunk,ts.writeencoding=encoding,!ts.transforming){var rs=this._readableState;(ts.needTransform||rs.needReadable||rs.length<rs.highWaterMark)&&this._read(rs.highWaterMark)}},Transform.prototype._read=function(n){var ts=this._transformState
null===ts.writechunk||ts.transforming?ts.needTransform=!0:(ts.transforming=!0,this._transform(ts.writechunk,ts.writeencoding,ts.afterTransform))},Transform.prototype._destroy=function(err,cb){Duplex.prototype._destroy.call(this,err,(function(err2){cb(err2)}))}},8719:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
function CorkedRequest(state){var _this=this
this.next=null,this.entry=null,this.finish=function(){!function(corkReq,state,err){var entry=corkReq.entry
corkReq.entry=null
for(;entry;){var cb=entry.callback
state.pendingcb--,cb(err),entry=entry.next}state.corkedRequestsFree.next=corkReq}(_this,state)}}var Duplex
module.exports=Writable,Writable.WritableState=WritableState
var internalUtil={deprecate:__webpack_require__(4484)},Stream=__webpack_require__(1829),Buffer=__webpack_require__(4300).Buffer,OurUint8Array=global.Uint8Array||function(){}
var realHasInstance,destroyImpl=__webpack_require__(3390),getHighWaterMark=__webpack_require__(1111).getHighWaterMark,_require$codes=__webpack_require__(7638).q,ERR_INVALID_ARG_TYPE=_require$codes.ERR_INVALID_ARG_TYPE,ERR_METHOD_NOT_IMPLEMENTED=_require$codes.ERR_METHOD_NOT_IMPLEMENTED,ERR_MULTIPLE_CALLBACK=_require$codes.ERR_MULTIPLE_CALLBACK,ERR_STREAM_CANNOT_PIPE=_require$codes.ERR_STREAM_CANNOT_PIPE,ERR_STREAM_DESTROYED=_require$codes.ERR_STREAM_DESTROYED,ERR_STREAM_NULL_VALUES=_require$codes.ERR_STREAM_NULL_VALUES,ERR_STREAM_WRITE_AFTER_END=_require$codes.ERR_STREAM_WRITE_AFTER_END,ERR_UNKNOWN_ENCODING=_require$codes.ERR_UNKNOWN_ENCODING,errorOrDestroy=destroyImpl.errorOrDestroy
function nop(){}function WritableState(options,stream,isDuplex){Duplex=Duplex||__webpack_require__(673),options=options||{},"boolean"!=typeof isDuplex&&(isDuplex=stream instanceof Duplex),this.objectMode=!!options.objectMode,isDuplex&&(this.objectMode=this.objectMode||!!options.writableObjectMode),this.highWaterMark=getHighWaterMark(this,options,"writableHighWaterMark",isDuplex),this.finalCalled=!1,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1,this.destroyed=!1
var noDecode=!1===options.decodeStrings
this.decodeStrings=!noDecode,this.defaultEncoding=options.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.corked=0,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(er){!function(stream,er){var state=stream._writableState,sync=state.sync,cb=state.writecb
if("function"!=typeof cb)throw new ERR_MULTIPLE_CALLBACK
if(function(state){state.writing=!1,state.writecb=null,state.length-=state.writelen,state.writelen=0}(state),er)!function(stream,state,sync,er,cb){--state.pendingcb,sync?(process.nextTick(cb,er),process.nextTick(finishMaybe,stream,state),stream._writableState.errorEmitted=!0,errorOrDestroy(stream,er)):(cb(er),stream._writableState.errorEmitted=!0,errorOrDestroy(stream,er),finishMaybe(stream,state))}(stream,state,sync,er,cb)
else{var finished=needFinish(state)||stream.destroyed
finished||state.corked||state.bufferProcessing||!state.bufferedRequest||clearBuffer(stream,state),sync?process.nextTick(afterWrite,stream,state,finished,cb):afterWrite(stream,state,finished,cb)}}(stream,er)},this.writecb=null,this.writelen=0,this.bufferedRequest=null,this.lastBufferedRequest=null,this.pendingcb=0,this.prefinished=!1,this.errorEmitted=!1,this.emitClose=!1!==options.emitClose,this.autoDestroy=!!options.autoDestroy,this.bufferedRequestCount=0,this.corkedRequestsFree=new CorkedRequest(this)}function Writable(options){var isDuplex=this instanceof(Duplex=Duplex||__webpack_require__(673))
if(!isDuplex&&!realHasInstance.call(Writable,this))return new Writable(options)
this._writableState=new WritableState(options,this,isDuplex),this.writable=!0,options&&("function"==typeof options.write&&(this._write=options.write),"function"==typeof options.writev&&(this._writev=options.writev),"function"==typeof options.destroy&&(this._destroy=options.destroy),"function"==typeof options.final&&(this._final=options.final)),Stream.call(this)}function doWrite(stream,state,writev,len,chunk,encoding,cb){state.writelen=len,state.writecb=cb,state.writing=!0,state.sync=!0,state.destroyed?state.onwrite(new ERR_STREAM_DESTROYED("write")):writev?stream._writev(chunk,state.onwrite):stream._write(chunk,encoding,state.onwrite),state.sync=!1}function afterWrite(stream,state,finished,cb){finished||function(stream,state){0===state.length&&state.needDrain&&(state.needDrain=!1,stream.emit("drain"))}(stream,state),state.pendingcb--,cb(),finishMaybe(stream,state)}function clearBuffer(stream,state){state.bufferProcessing=!0
var entry=state.bufferedRequest
if(stream._writev&&entry&&entry.next){var l=state.bufferedRequestCount,buffer=new Array(l),holder=state.corkedRequestsFree
holder.entry=entry
for(var count=0,allBuffers=!0;entry;)buffer[count]=entry,entry.isBuf||(allBuffers=!1),entry=entry.next,count+=1
buffer.allBuffers=allBuffers,doWrite(stream,state,!0,state.length,buffer,"",holder.finish),state.pendingcb++,state.lastBufferedRequest=null,holder.next?(state.corkedRequestsFree=holder.next,holder.next=null):state.corkedRequestsFree=new CorkedRequest(state),state.bufferedRequestCount=0}else{for(;entry;){var chunk=entry.chunk,encoding=entry.encoding,cb=entry.callback
if(doWrite(stream,state,!1,state.objectMode?1:chunk.length,chunk,encoding,cb),entry=entry.next,state.bufferedRequestCount--,state.writing)break}null===entry&&(state.lastBufferedRequest=null)}state.bufferedRequest=entry,state.bufferProcessing=!1}function needFinish(state){return state.ending&&0===state.length&&null===state.bufferedRequest&&!state.finished&&!state.writing}function callFinal(stream,state){stream._final((function(err){state.pendingcb--,err&&errorOrDestroy(stream,err),state.prefinished=!0,stream.emit("prefinish"),finishMaybe(stream,state)}))}function finishMaybe(stream,state){var need=needFinish(state)
if(need&&(function(stream,state){state.prefinished||state.finalCalled||("function"!=typeof stream._final||state.destroyed?(state.prefinished=!0,stream.emit("prefinish")):(state.pendingcb++,state.finalCalled=!0,process.nextTick(callFinal,stream,state)))}(stream,state),0===state.pendingcb&&(state.finished=!0,stream.emit("finish"),state.autoDestroy))){var rState=stream._readableState;(!rState||rState.autoDestroy&&rState.endEmitted)&&stream.destroy()}return need}__webpack_require__(1828)(Writable,Stream),WritableState.prototype.getBuffer=function(){for(var current=this.bufferedRequest,out=[];current;)out.push(current),current=current.next
return out},function(){try{Object.defineProperty(WritableState.prototype,"buffer",{get:internalUtil.deprecate((function(){return this.getBuffer()}),"_writableState.buffer is deprecated. Use _writableState.getBuffer instead.","DEP0003")})}catch(_){}}(),"function"==typeof Symbol&&Symbol.hasInstance&&"function"==typeof Function.prototype[Symbol.hasInstance]?(realHasInstance=Function.prototype[Symbol.hasInstance],Object.defineProperty(Writable,Symbol.hasInstance,{value:function(object){return!!realHasInstance.call(this,object)||this===Writable&&(object&&object._writableState instanceof WritableState)}})):realHasInstance=function(object){return object instanceof this},Writable.prototype.pipe=function(){errorOrDestroy(this,new ERR_STREAM_CANNOT_PIPE)},Writable.prototype.write=function(chunk,encoding,cb){var obj,state=this._writableState,ret=!1,isBuf=!state.objectMode&&(obj=chunk,Buffer.isBuffer(obj)||obj instanceof OurUint8Array)
return isBuf&&!Buffer.isBuffer(chunk)&&(chunk=function(chunk){return Buffer.from(chunk)}(chunk)),"function"==typeof encoding&&(cb=encoding,encoding=null),isBuf?encoding="buffer":encoding||(encoding=state.defaultEncoding),"function"!=typeof cb&&(cb=nop),state.ending?function(stream,cb){var er=new ERR_STREAM_WRITE_AFTER_END
errorOrDestroy(stream,er),process.nextTick(cb,er)}(this,cb):(isBuf||function(stream,state,chunk,cb){var er
return null===chunk?er=new ERR_STREAM_NULL_VALUES:"string"==typeof chunk||state.objectMode||(er=new ERR_INVALID_ARG_TYPE("chunk",["string","Buffer"],chunk)),!er||(errorOrDestroy(stream,er),process.nextTick(cb,er),!1)}(this,state,chunk,cb))&&(state.pendingcb++,ret=function(stream,state,isBuf,chunk,encoding,cb){if(!isBuf){var newChunk=function(state,chunk,encoding){state.objectMode||!1===state.decodeStrings||"string"!=typeof chunk||(chunk=Buffer.from(chunk,encoding))
return chunk}(state,chunk,encoding)
chunk!==newChunk&&(isBuf=!0,encoding="buffer",chunk=newChunk)}var len=state.objectMode?1:chunk.length
state.length+=len
var ret=state.length<state.highWaterMark
ret||(state.needDrain=!0)
if(state.writing||state.corked){var last=state.lastBufferedRequest
state.lastBufferedRequest={chunk,encoding,isBuf,callback:cb,next:null},last?last.next=state.lastBufferedRequest:state.bufferedRequest=state.lastBufferedRequest,state.bufferedRequestCount+=1}else doWrite(stream,state,!1,len,chunk,encoding,cb)
return ret}(this,state,isBuf,chunk,encoding,cb)),ret},Writable.prototype.cork=function(){this._writableState.corked++},Writable.prototype.uncork=function(){var state=this._writableState
state.corked&&(state.corked--,state.writing||state.corked||state.bufferProcessing||!state.bufferedRequest||clearBuffer(this,state))},Writable.prototype.setDefaultEncoding=function(encoding){if("string"==typeof encoding&&(encoding=encoding.toLowerCase()),!(["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((encoding+"").toLowerCase())>-1))throw new ERR_UNKNOWN_ENCODING(encoding)
return this._writableState.defaultEncoding=encoding,this},Object.defineProperty(Writable.prototype,"writableBuffer",{enumerable:!1,get:function(){return this._writableState&&this._writableState.getBuffer()}}),Object.defineProperty(Writable.prototype,"writableHighWaterMark",{enumerable:!1,get:function(){return this._writableState.highWaterMark}}),Writable.prototype._write=function(chunk,encoding,cb){cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"))},Writable.prototype._writev=null,Writable.prototype.end=function(chunk,encoding,cb){var state=this._writableState
return"function"==typeof chunk?(cb=chunk,chunk=null,encoding=null):"function"==typeof encoding&&(cb=encoding,encoding=null),null!=chunk&&this.write(chunk,encoding),state.corked&&(state.corked=1,this.uncork()),state.ending||function(stream,state,cb){state.ending=!0,finishMaybe(stream,state),cb&&(state.finished?process.nextTick(cb):stream.once("finish",cb))
state.ended=!0,stream.writable=!1}(this,state,cb),this},Object.defineProperty(Writable.prototype,"writableLength",{enumerable:!1,get:function(){return this._writableState.length}}),Object.defineProperty(Writable.prototype,"destroyed",{enumerable:!1,get:function(){return void 0!==this._writableState&&this._writableState.destroyed},set:function(value){this._writableState&&(this._writableState.destroyed=value)}}),Writable.prototype.destroy=destroyImpl.destroy,Writable.prototype._undestroy=destroyImpl.undestroy,Writable.prototype._destroy=function(err,cb){cb(err)}},8187:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var _Object$setPrototypeO
function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var finished=__webpack_require__(2426),kLastResolve=Symbol("lastResolve"),kLastReject=Symbol("lastReject"),kError=Symbol("error"),kEnded=Symbol("ended"),kLastPromise=Symbol("lastPromise"),kHandlePromise=Symbol("handlePromise"),kStream=Symbol("stream")
function createIterResult(value,done){return{value,done}}function readAndResolve(iter){var resolve=iter[kLastResolve]
if(null!==resolve){var data=iter[kStream].read()
null!==data&&(iter[kLastPromise]=null,iter[kLastResolve]=null,iter[kLastReject]=null,resolve(createIterResult(data,!1)))}}function onReadable(iter){process.nextTick(readAndResolve,iter)}var AsyncIteratorPrototype=Object.getPrototypeOf((function(){})),ReadableStreamAsyncIteratorPrototype=Object.setPrototypeOf((_defineProperty(_Object$setPrototypeO={get stream(){return this[kStream]},next:function(){var _this=this,error=this[kError]
if(null!==error)return Promise.reject(error)
if(this[kEnded])return Promise.resolve(createIterResult(void 0,!0))
if(this[kStream].destroyed)return new Promise((function(resolve,reject){process.nextTick((function(){_this[kError]?reject(_this[kError]):resolve(createIterResult(void 0,!0))}))}))
var promise,lastPromise=this[kLastPromise]
if(lastPromise)promise=new Promise(function(lastPromise,iter){return function(resolve,reject){lastPromise.then((function(){iter[kEnded]?resolve(createIterResult(void 0,!0)):iter[kHandlePromise](resolve,reject)}),reject)}}(lastPromise,this))
else{var data=this[kStream].read()
if(null!==data)return Promise.resolve(createIterResult(data,!1))
promise=new Promise(this[kHandlePromise])}return this[kLastPromise]=promise,promise}},Symbol.asyncIterator,(function(){return this})),_defineProperty(_Object$setPrototypeO,"return",(function(){var _this2=this
return new Promise((function(resolve,reject){_this2[kStream].destroy(null,(function(err){err?reject(err):resolve(createIterResult(void 0,!0))}))}))})),_Object$setPrototypeO),AsyncIteratorPrototype)
module.exports=function(stream){var _Object$create,iterator=Object.create(ReadableStreamAsyncIteratorPrototype,(_defineProperty(_Object$create={},kStream,{value:stream,writable:!0}),_defineProperty(_Object$create,kLastResolve,{value:null,writable:!0}),_defineProperty(_Object$create,kLastReject,{value:null,writable:!0}),_defineProperty(_Object$create,kError,{value:null,writable:!0}),_defineProperty(_Object$create,kEnded,{value:stream._readableState.endEmitted,writable:!0}),_defineProperty(_Object$create,kHandlePromise,{value:function(resolve,reject){var data=iterator[kStream].read()
data?(iterator[kLastPromise]=null,iterator[kLastResolve]=null,iterator[kLastReject]=null,resolve(createIterResult(data,!1))):(iterator[kLastResolve]=resolve,iterator[kLastReject]=reject)},writable:!0}),_Object$create))
return iterator[kLastPromise]=null,finished(stream,(function(err){if(err&&"ERR_STREAM_PREMATURE_CLOSE"!==err.code){var reject=iterator[kLastReject]
return null!==reject&&(iterator[kLastPromise]=null,iterator[kLastResolve]=null,iterator[kLastReject]=null,reject(err)),void(iterator[kError]=err)}var resolve=iterator[kLastResolve]
null!==resolve&&(iterator[kLastPromise]=null,iterator[kLastResolve]=null,iterator[kLastReject]=null,resolve(createIterResult(void 0,!0))),iterator[kEnded]=!0})),stream.on("readable",onReadable.bind(null,iterator)),iterator}},4506:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
function ownKeys(object,enumerableOnly){var keys=Object.keys(object)
if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object)
enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i]
descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}var Buffer=__webpack_require__(4300).Buffer,inspect=__webpack_require__(3837).inspect,custom=inspect&&inspect.custom||"inspect"
module.exports=function(){function BufferList(){!function(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,BufferList),this.head=null,this.tail=null,this.length=0}var Constructor,protoProps,staticProps
return Constructor=BufferList,protoProps=[{key:"push",value:function(v){var entry={data:v,next:null}
this.length>0?this.tail.next=entry:this.head=entry,this.tail=entry,++this.length}},{key:"unshift",value:function(v){var entry={data:v,next:this.head}
0===this.length&&(this.tail=entry),this.head=entry,++this.length}},{key:"shift",value:function(){if(0!==this.length){var ret=this.head.data
return 1===this.length?this.head=this.tail=null:this.head=this.head.next,--this.length,ret}}},{key:"clear",value:function(){this.head=this.tail=null,this.length=0}},{key:"join",value:function(s){if(0===this.length)return""
for(var p=this.head,ret=""+p.data;p=p.next;)ret+=s+p.data
return ret}},{key:"concat",value:function(n){if(0===this.length)return Buffer.alloc(0)
for(var src,target,offset,ret=Buffer.allocUnsafe(n>>>0),p=this.head,i=0;p;)src=p.data,target=ret,offset=i,Buffer.prototype.copy.call(src,target,offset),i+=p.data.length,p=p.next
return ret}},{key:"consume",value:function(n,hasStrings){var ret
return n<this.head.data.length?(ret=this.head.data.slice(0,n),this.head.data=this.head.data.slice(n)):ret=n===this.head.data.length?this.shift():hasStrings?this._getString(n):this._getBuffer(n),ret}},{key:"first",value:function(){return this.head.data}},{key:"_getString",value:function(n){var p=this.head,c=1,ret=p.data
for(n-=ret.length;p=p.next;){var str=p.data,nb=n>str.length?str.length:n
if(nb===str.length?ret+=str:ret+=str.slice(0,n),0==(n-=nb)){nb===str.length?(++c,p.next?this.head=p.next:this.head=this.tail=null):(this.head=p,p.data=str.slice(nb))
break}++c}return this.length-=c,ret}},{key:"_getBuffer",value:function(n){var ret=Buffer.allocUnsafe(n),p=this.head,c=1
for(p.data.copy(ret),n-=p.data.length;p=p.next;){var buf=p.data,nb=n>buf.length?buf.length:n
if(buf.copy(ret,ret.length-n,0,nb),0==(n-=nb)){nb===buf.length?(++c,p.next?this.head=p.next:this.head=this.tail=null):(this.head=p,p.data=buf.slice(nb))
break}++c}return this.length-=c,ret}},{key:custom,value:function(_,options){return inspect(this,function(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{}
i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}({},options,{depth:0,customInspect:!1}))}}],protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),BufferList}()},3390:module=>{"use strict"
function emitErrorAndCloseNT(self,err){emitErrorNT(self,err),emitCloseNT(self)}function emitCloseNT(self){self._writableState&&!self._writableState.emitClose||self._readableState&&!self._readableState.emitClose||self.emit("close")}function emitErrorNT(self,err){self.emit("error",err)}module.exports={destroy:function(err,cb){var _this=this,readableDestroyed=this._readableState&&this._readableState.destroyed,writableDestroyed=this._writableState&&this._writableState.destroyed
return readableDestroyed||writableDestroyed?(cb?cb(err):err&&(this._writableState?this._writableState.errorEmitted||(this._writableState.errorEmitted=!0,process.nextTick(emitErrorNT,this,err)):process.nextTick(emitErrorNT,this,err)),this):(this._readableState&&(this._readableState.destroyed=!0),this._writableState&&(this._writableState.destroyed=!0),this._destroy(err||null,(function(err){!cb&&err?_this._writableState?_this._writableState.errorEmitted?process.nextTick(emitCloseNT,_this):(_this._writableState.errorEmitted=!0,process.nextTick(emitErrorAndCloseNT,_this,err)):process.nextTick(emitErrorAndCloseNT,_this,err):cb?(process.nextTick(emitCloseNT,_this),cb(err)):process.nextTick(emitCloseNT,_this)})),this)},undestroy:function(){this._readableState&&(this._readableState.destroyed=!1,this._readableState.reading=!1,this._readableState.ended=!1,this._readableState.endEmitted=!1),this._writableState&&(this._writableState.destroyed=!1,this._writableState.ended=!1,this._writableState.ending=!1,this._writableState.finalCalled=!1,this._writableState.prefinished=!1,this._writableState.finished=!1,this._writableState.errorEmitted=!1)},errorOrDestroy:function(stream,err){var rState=stream._readableState,wState=stream._writableState
rState&&rState.autoDestroy||wState&&wState.autoDestroy?stream.destroy(err):stream.emit("error",err)}}},2426:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var ERR_STREAM_PREMATURE_CLOSE=__webpack_require__(7638).q.ERR_STREAM_PREMATURE_CLOSE
function noop(){}module.exports=function eos(stream,opts,callback){if("function"==typeof opts)return eos(stream,null,opts)
opts||(opts={}),callback=function(callback){var called=!1
return function(){if(!called){called=!0
for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key]
callback.apply(this,args)}}}(callback||noop)
var readable=opts.readable||!1!==opts.readable&&stream.readable,writable=opts.writable||!1!==opts.writable&&stream.writable,onlegacyfinish=function(){stream.writable||onfinish()},writableEnded=stream._writableState&&stream._writableState.finished,onfinish=function(){writable=!1,writableEnded=!0,readable||callback.call(stream)},readableEnded=stream._readableState&&stream._readableState.endEmitted,onend=function(){readable=!1,readableEnded=!0,writable||callback.call(stream)},onerror=function(err){callback.call(stream,err)},onclose=function(){var err
return readable&&!readableEnded?(stream._readableState&&stream._readableState.ended||(err=new ERR_STREAM_PREMATURE_CLOSE),callback.call(stream,err)):writable&&!writableEnded?(stream._writableState&&stream._writableState.ended||(err=new ERR_STREAM_PREMATURE_CLOSE),callback.call(stream,err)):void 0},onrequest=function(){stream.req.on("finish",onfinish)}
return!function(stream){return stream.setHeader&&"function"==typeof stream.abort}(stream)?writable&&!stream._writableState&&(stream.on("end",onlegacyfinish),stream.on("close",onlegacyfinish)):(stream.on("complete",onfinish),stream.on("abort",onclose),stream.req?onrequest():stream.on("request",onrequest)),stream.on("end",onend),stream.on("finish",onfinish),!1!==opts.error&&stream.on("error",onerror),stream.on("close",onclose),function(){stream.removeListener("complete",onfinish),stream.removeListener("abort",onclose),stream.removeListener("request",onrequest),stream.req&&stream.req.removeListener("finish",onfinish),stream.removeListener("end",onlegacyfinish),stream.removeListener("close",onlegacyfinish),stream.removeListener("finish",onfinish),stream.removeListener("end",onend),stream.removeListener("error",onerror),stream.removeListener("close",onclose)}}},9705:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg),value=info.value}catch(error){return void reject(error)}info.done?resolve(value):Promise.resolve(value).then(_next,_throw)}function _asyncToGenerator(fn){return function(){var self=this,args=arguments
return new Promise((function(resolve,reject){var gen=fn.apply(self,args)
function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(void 0)}))}}function ownKeys(object,enumerableOnly){var keys=Object.keys(object)
if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object)
enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var ERR_INVALID_ARG_TYPE=__webpack_require__(7638).q.ERR_INVALID_ARG_TYPE
module.exports=function(Readable,iterable,opts){var iterator
if(iterable&&"function"==typeof iterable.next)iterator=iterable
else if(iterable&&iterable[Symbol.asyncIterator])iterator=iterable[Symbol.asyncIterator]()
else{if(!iterable||!iterable[Symbol.iterator])throw new ERR_INVALID_ARG_TYPE("iterable",["Iterable"],iterable)
iterator=iterable[Symbol.iterator]()}var readable=new Readable(function(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{}
i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}({objectMode:!0},opts)),reading=!1
function next(){return _next2.apply(this,arguments)}function _next2(){return(_next2=_asyncToGenerator((function*(){try{var _ref=yield iterator.next(),value=_ref.value
_ref.done?readable.push(null):readable.push(yield value)?next():reading=!1}catch(err){readable.destroy(err)}}))).apply(this,arguments)}return readable._read=function(){reading||(reading=!0,next())},readable}},2970:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var eos
var _require$codes=__webpack_require__(7638).q,ERR_MISSING_ARGS=_require$codes.ERR_MISSING_ARGS,ERR_STREAM_DESTROYED=_require$codes.ERR_STREAM_DESTROYED
function noop(err){if(err)throw err}function destroyer(stream,reading,writing,callback){callback=function(callback){var called=!1
return function(){called||(called=!0,callback.apply(void 0,arguments))}}(callback)
var closed=!1
stream.on("close",(function(){closed=!0})),void 0===eos&&(eos=__webpack_require__(2426)),eos(stream,{readable:reading,writable:writing},(function(err){if(err)return callback(err)
closed=!0,callback()}))
var destroyed=!1
return function(err){if(!closed&&!destroyed)return destroyed=!0,function(stream){return stream.setHeader&&"function"==typeof stream.abort}(stream)?stream.abort():"function"==typeof stream.destroy?stream.destroy():void callback(err||new ERR_STREAM_DESTROYED("pipe"))}}function call(fn){fn()}function pipe(from,to){return from.pipe(to)}function popCallback(streams){return streams.length?"function"!=typeof streams[streams.length-1]?noop:streams.pop():noop}module.exports=function(){for(var _len=arguments.length,streams=new Array(_len),_key=0;_key<_len;_key++)streams[_key]=arguments[_key]
var error,callback=popCallback(streams)
if(Array.isArray(streams[0])&&(streams=streams[0]),streams.length<2)throw new ERR_MISSING_ARGS("streams")
var destroys=streams.map((function(stream,i){var reading=i<streams.length-1
return destroyer(stream,reading,i>0,(function(err){error||(error=err),err&&destroys.forEach(call),reading||(destroys.forEach(call),callback(error))}))}))
return streams.reduce(pipe)}},1111:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var ERR_INVALID_OPT_VALUE=__webpack_require__(7638).q.ERR_INVALID_OPT_VALUE
module.exports={getHighWaterMark:function(state,options,duplexKey,isDuplex){var hwm=function(options,isDuplex,duplexKey){return null!=options.highWaterMark?options.highWaterMark:isDuplex?options[duplexKey]:null}(options,isDuplex,duplexKey)
if(null!=hwm){if(!isFinite(hwm)||Math.floor(hwm)!==hwm||hwm<0)throw new ERR_INVALID_OPT_VALUE(isDuplex?duplexKey:"highWaterMark",hwm)
return Math.floor(hwm)}return state.objectMode?16:16384}}},1829:(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__(2781)},8118:(module,exports,__webpack_require__)=>{var Stream=__webpack_require__(2781)
"disable"===process.env.READABLE_STREAM&&Stream?(module.exports=Stream.Readable,Object.assign(module.exports,Stream),module.exports.Stream=Stream):((exports=module.exports=__webpack_require__(5006)).Stream=Stream||exports,exports.Readable=exports,exports.Writable=__webpack_require__(8719),exports.Duplex=__webpack_require__(673),exports.Transform=__webpack_require__(8597),exports.PassThrough=__webpack_require__(4343),exports.finished=__webpack_require__(2426),exports.pipeline=__webpack_require__(2970))},3268:module=>{"use strict"
function copyBuffer(cur){return cur instanceof Buffer?Buffer.from(cur):new cur.constructor(cur.buffer.slice(),cur.byteOffset,cur.length)}module.exports=function(opts){return(opts=opts||{}).circles?function(opts){var refs=[],refsNew=[]
return opts.proto?function cloneProto(o){if("object"!=typeof o||null===o)return o
if(o instanceof Date)return new Date(o)
if(Array.isArray(o))return cloneArray(o,cloneProto)
if(o instanceof Map)return new Map(cloneArray(Array.from(o),cloneProto))
if(o instanceof Set)return new Set(cloneArray(Array.from(o),cloneProto))
var o2={}
for(var k in refs.push(o),refsNew.push(o2),o){var cur=o[k]
if("object"!=typeof cur||null===cur)o2[k]=cur
else if(cur instanceof Date)o2[k]=new Date(cur)
else if(cur instanceof Map)o2[k]=new Map(cloneArray(Array.from(cur),cloneProto))
else if(cur instanceof Set)o2[k]=new Set(cloneArray(Array.from(cur),cloneProto))
else if(ArrayBuffer.isView(cur))o2[k]=copyBuffer(cur)
else{var i=refs.indexOf(cur)
o2[k]=-1!==i?refsNew[i]:cloneProto(cur)}}return refs.pop(),refsNew.pop(),o2}:function clone(o){if("object"!=typeof o||null===o)return o
if(o instanceof Date)return new Date(o)
if(Array.isArray(o))return cloneArray(o,clone)
if(o instanceof Map)return new Map(cloneArray(Array.from(o),clone))
if(o instanceof Set)return new Set(cloneArray(Array.from(o),clone))
var o2={}
for(var k in refs.push(o),refsNew.push(o2),o)if(!1!==Object.hasOwnProperty.call(o,k)){var cur=o[k]
if("object"!=typeof cur||null===cur)o2[k]=cur
else if(cur instanceof Date)o2[k]=new Date(cur)
else if(cur instanceof Map)o2[k]=new Map(cloneArray(Array.from(cur),clone))
else if(cur instanceof Set)o2[k]=new Set(cloneArray(Array.from(cur),clone))
else if(ArrayBuffer.isView(cur))o2[k]=copyBuffer(cur)
else{var i=refs.indexOf(cur)
o2[k]=-1!==i?refsNew[i]:clone(cur)}}return refs.pop(),refsNew.pop(),o2}
function cloneArray(a,fn){for(var keys=Object.keys(a),a2=new Array(keys.length),i=0;i<keys.length;i++){var k=keys[i],cur=a[k]
if("object"!=typeof cur||null===cur)a2[k]=cur
else if(cur instanceof Date)a2[k]=new Date(cur)
else if(ArrayBuffer.isView(cur))a2[k]=copyBuffer(cur)
else{var index=refs.indexOf(cur)
a2[k]=-1!==index?refsNew[index]:fn(cur)}}return a2}}(opts):opts.proto?function cloneProto(o){if("object"!=typeof o||null===o)return o
if(o instanceof Date)return new Date(o)
if(Array.isArray(o))return cloneArray(o,cloneProto)
if(o instanceof Map)return new Map(cloneArray(Array.from(o),cloneProto))
if(o instanceof Set)return new Set(cloneArray(Array.from(o),cloneProto))
var o2={}
for(var k in o){var cur=o[k]
"object"!=typeof cur||null===cur?o2[k]=cur:cur instanceof Date?o2[k]=new Date(cur):cur instanceof Map?o2[k]=new Map(cloneArray(Array.from(cur),cloneProto)):cur instanceof Set?o2[k]=new Set(cloneArray(Array.from(cur),cloneProto)):ArrayBuffer.isView(cur)?o2[k]=copyBuffer(cur):o2[k]=cloneProto(cur)}return o2}:function clone(o){if("object"!=typeof o||null===o)return o
if(o instanceof Date)return new Date(o)
if(Array.isArray(o))return cloneArray(o,clone)
if(o instanceof Map)return new Map(cloneArray(Array.from(o),clone))
if(o instanceof Set)return new Set(cloneArray(Array.from(o),clone))
var o2={}
for(var k in o)if(!1!==Object.hasOwnProperty.call(o,k)){var cur=o[k]
"object"!=typeof cur||null===cur?o2[k]=cur:cur instanceof Date?o2[k]=new Date(cur):cur instanceof Map?o2[k]=new Map(cloneArray(Array.from(cur),clone)):cur instanceof Set?o2[k]=new Set(cloneArray(Array.from(cur),clone)):ArrayBuffer.isView(cur)?o2[k]=copyBuffer(cur):o2[k]=clone(cur)}return o2}
function cloneArray(a,fn){for(var keys=Object.keys(a),a2=new Array(keys.length),i=0;i<keys.length;i++){var k=keys[i],cur=a[k]
"object"!=typeof cur||null===cur?a2[k]=cur:cur instanceof Date?a2[k]=new Date(cur):ArrayBuffer.isView(cur)?a2[k]=copyBuffer(cur):a2[k]=fn(cur)}return a2}}},9685:(module,exports,__webpack_require__)=>{var buffer=__webpack_require__(4300),Buffer=buffer.Buffer
function copyProps(src,dst){for(var key in src)dst[key]=src[key]}function SafeBuffer(arg,encodingOrOffset,length){return Buffer(arg,encodingOrOffset,length)}Buffer.from&&Buffer.alloc&&Buffer.allocUnsafe&&Buffer.allocUnsafeSlow?module.exports=buffer:(copyProps(buffer,exports),exports.Buffer=SafeBuffer),SafeBuffer.prototype=Object.create(Buffer.prototype),copyProps(Buffer,SafeBuffer),SafeBuffer.from=function(arg,encodingOrOffset,length){if("number"==typeof arg)throw new TypeError("Argument must not be a number")
return Buffer(arg,encodingOrOffset,length)},SafeBuffer.alloc=function(size,fill,encoding){if("number"!=typeof size)throw new TypeError("Argument must be a number")
var buf=Buffer(size)
return void 0!==fill?"string"==typeof encoding?buf.fill(fill,encoding):buf.fill(fill):buf.fill(0),buf},SafeBuffer.allocUnsafe=function(size){if("number"!=typeof size)throw new TypeError("Argument must be a number")
return Buffer(size)},SafeBuffer.allocUnsafeSlow=function(size){if("number"!=typeof size)throw new TypeError("Argument must be a number")
return buffer.SlowBuffer(size)}},9316:module=>{"use strict"
const hasBuffer="undefined"!=typeof Buffer,suspectProtoRx=/"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/,suspectConstructorRx=/"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/
function parse(text,reviver,options){null==options&&(null!==reviver&&"object"==typeof reviver?(options=reviver,reviver=void 0):options={})
const protoAction=options.protoAction||"error",constructorAction=options.constructorAction||"error"
hasBuffer&&Buffer.isBuffer(text)&&(text=text.toString()),text&&65279===text.charCodeAt(0)&&(text=text.slice(1))
const obj=JSON.parse(text,reviver)
if("ignore"===protoAction&&"ignore"===constructorAction)return obj
if(null===obj||"object"!=typeof obj)return obj
if("ignore"!==protoAction&&"ignore"!==constructorAction){if(!1===suspectProtoRx.test(text)&&!1===suspectConstructorRx.test(text))return obj}else if("ignore"!==protoAction&&"ignore"===constructorAction){if(!1===suspectProtoRx.test(text))return obj}else if(!1===suspectConstructorRx.test(text))return obj
return scan(obj,{protoAction,constructorAction}),obj}function scan(obj,{protoAction="error",constructorAction="error"}={}){let next=[obj]
for(;next.length;){const nodes=next
next=[]
for(const node of nodes){if("ignore"!==protoAction&&Object.prototype.hasOwnProperty.call(node,"__proto__")){if("error"===protoAction)throw new SyntaxError("Object contains forbidden prototype property")
delete node.__proto__}if("ignore"!==constructorAction&&Object.prototype.hasOwnProperty.call(node,"constructor")&&Object.prototype.hasOwnProperty.call(node.constructor,"prototype")){if("error"===constructorAction)throw new SyntaxError("Object contains forbidden prototype property")
delete node.constructor}for(const key in node){const value=node[key]
value&&"object"==typeof value&&next.push(node[key])}}}}module.exports={parse,scan,safeParse:function(text,reviver){try{return parse(text,reviver)}catch(ignoreError){return null}}}},4656:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const fs=__webpack_require__(7147),EventEmitter=__webpack_require__(2361),flatstr=__webpack_require__(8306),inherits=__webpack_require__(3837).inherits,sleep=__webpack_require__(160)
function openFile(file,sonic){function fileOpened(err,fd){if(err)return sonic._reopening=!1,sonic._writing=!1,sonic._opening=!1,void(sonic.sync?process.nextTick((()=>{sonic.listenerCount("error")>0&&sonic.emit("error",err)})):sonic.emit("error",err))
if(sonic.fd=fd,sonic.file=file,sonic._reopening=!1,sonic._opening=!1,sonic._writing=!1,sonic.sync?process.nextTick((()=>sonic.emit("ready"))):sonic.emit("ready"),sonic._reopening)return
const len=sonic._buf.length
len>0&&len>sonic.minLength&&!sonic.destroyed&&actualWrite(sonic)}if(sonic._opening=!0,sonic._writing=!0,sonic._asyncDrainScheduled=!1,sonic.sync)try{fileOpened(null,fs.openSync(file,"a"))}catch(err){throw fileOpened(err),err}else fs.open(file,"a",fileOpened)}function SonicBoom(opts){if(!(this instanceof SonicBoom))return new SonicBoom(opts)
let{fd,dest,minLength,sync}=opts||{}
if(fd=fd||dest,this._buf="",this.fd=-1,this._writing=!1,this._writingBuf="",this._ending=!1,this._reopening=!1,this._asyncDrainScheduled=!1,this.file=null,this.destroyed=!1,this.sync=sync||!1,this.minLength=minLength||0,"number"==typeof fd)this.fd=fd,process.nextTick((()=>this.emit("ready")))
else{if("string"!=typeof fd)throw new Error("SonicBoom supports only file descriptors and files")
openFile(fd,this)}this.release=(err,n)=>{if(err){if("EAGAIN"===err.code)if(this.sync)try{sleep(100),this.release(void 0,0)}catch(err){this.release(err)}else setTimeout((()=>{fs.write(this.fd,this._writingBuf,"utf8",this.release)}),100)
else this._buf=this._writingBuf+this._buf,this._writingBuf="",this._writing=!1,this.emit("error",err)
return}if(this._writingBuf.length!==n){if(this._writingBuf=this._writingBuf.slice(n),!this.sync)return void fs.write(this.fd,this._writingBuf,"utf8",this.release)
try{do{n=fs.writeSync(this.fd,this._writingBuf,"utf8"),this._writingBuf=this._writingBuf.slice(n)}while(0!==this._writingBuf.length)}catch(err){return void this.release(err)}}if(this._writingBuf="",this.destroyed)return
const len=this._buf.length
this._reopening?(this._writing=!1,this._reopening=!1,this.reopen()):len>0&&len>this.minLength?actualWrite(this):this._ending?len>0?actualWrite(this):(this._writing=!1,actualClose(this)):(this._writing=!1,this.sync?this._asyncDrainScheduled||(this._asyncDrainScheduled=!0,process.nextTick(emitDrain,this)):this.emit("drain"))},this.on("newListener",(function(name){"drain"===name&&(this._asyncDrainScheduled=!1)}))}function emitDrain(sonic){sonic.listenerCount("drain")>0&&(sonic._asyncDrainScheduled=!1,sonic.emit("drain"))}function actualWrite(sonic){sonic._writing=!0
let buf=sonic._buf
const release=sonic.release
if(buf.length>16777216?(buf=buf.slice(0,16777216),sonic._buf=sonic._buf.slice(16777216)):sonic._buf="",flatstr(buf),sonic._writingBuf=buf,sonic.sync)try{release(null,fs.writeSync(sonic.fd,buf,"utf8"))}catch(err){release(err)}else fs.write(sonic.fd,buf,"utf8",release)}function actualClose(sonic){-1!==sonic.fd?(fs.close(sonic.fd,(err=>{err?sonic.emit("error",err):(sonic._ending&&!sonic._writing&&sonic.emit("finish"),sonic.emit("close"))})),sonic.destroyed=!0,sonic._buf=""):sonic.once("ready",actualClose.bind(null,sonic))}inherits(SonicBoom,EventEmitter),SonicBoom.prototype.write=function(data){if(this.destroyed)throw new Error("SonicBoom destroyed")
this._buf+=data
const len=this._buf.length
return!this._writing&&len>this.minLength&&actualWrite(this),len<16384},SonicBoom.prototype.flush=function(){if(this.destroyed)throw new Error("SonicBoom destroyed")
this._writing||this.minLength<=0||actualWrite(this)},SonicBoom.prototype.reopen=function(file){if(this.destroyed)throw new Error("SonicBoom destroyed")
if(this._opening)return void this.once("ready",(()=>{this.reopen(file)}))
if(this._ending)return
if(!this.file)throw new Error("Unable to reopen a file descriptor, you must pass a file to SonicBoom")
if(this._reopening=!0,this._writing)return
const fd=this.fd
this.once("ready",(()=>{fd!==this.fd&&fs.close(fd,(err=>{if(err)return this.emit("error",err)}))})),openFile(file||this.file,this)},SonicBoom.prototype.end=function(){if(this.destroyed)throw new Error("SonicBoom destroyed")
this._opening?this.once("ready",(()=>{this.end()})):this._ending||(this._ending=!0,!this._writing&&this._buf.length>0&&this.fd>=0?actualWrite(this):this._writing||actualClose(this))},SonicBoom.prototype.flushSync=function(){if(this.destroyed)throw new Error("SonicBoom destroyed")
if(this.fd<0)throw new Error("sonic boom is not ready yet")
for(;this._buf.length>0;)try{fs.writeSync(this.fd,this._buf,"utf8"),this._buf=""}catch(err){if("EAGAIN"!==err.code)throw err
sleep(100)}},SonicBoom.prototype.destroy=function(){this.destroyed||actualClose(this)},module.exports=SonicBoom},5443:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const{Transform}=__webpack_require__(2781),{StringDecoder}=__webpack_require__(1576),kLast=Symbol("last"),kDecoder=Symbol("decoder")
function transform(chunk,enc,cb){let list
if(this.overflow){if(list=this[kDecoder].write(chunk).split(this.matcher),1===list.length)return cb()
list.shift(),this.overflow=!1}else this[kLast]+=this[kDecoder].write(chunk),list=this[kLast].split(this.matcher)
this[kLast]=list.pop()
for(let i=0;i<list.length;i++)try{push(this,this.mapper(list[i]))}catch(error){return cb(error)}this.overflow=this[kLast].length>this.maxLength,!this.overflow||this.skipOverflow?cb():cb(new Error("maximum buffer reached"))}function flush(cb){if(this[kLast]+=this[kDecoder].end(),this[kLast])try{push(this,this.mapper(this[kLast]))}catch(error){return cb(error)}cb()}function push(self,val){void 0!==val&&self.push(val)}function noop(incoming){return incoming}module.exports=function(matcher,mapper,options){switch(matcher=matcher||/\r?\n/,mapper=mapper||noop,options=options||{},arguments.length){case 1:"function"==typeof matcher?(mapper=matcher,matcher=/\r?\n/):"object"!=typeof matcher||matcher instanceof RegExp||(options=matcher,matcher=/\r?\n/)
break
case 2:"function"==typeof matcher?(options=mapper,mapper=matcher,matcher=/\r?\n/):"object"==typeof mapper&&(options=mapper,mapper=noop)}(options=Object.assign({},options)).autoDestroy=!0,options.transform=transform,options.flush=flush,options.readableObjectMode=!0
const stream=new Transform(options)
return stream[kLast]="",stream[kDecoder]=new StringDecoder("utf8"),stream.matcher=matcher,stream.mapper=mapper,stream.maxLength=options.maxLength,stream.skipOverflow=options.skipOverflow||!1,stream.overflow=!1,stream._destroy=function(err,cb){this._writableState.errorEmitted=!1,cb(err)},stream}},6151:module=>{module.exports=function(stream){var rs=stream._readableState
return rs?rs.objectMode||"number"==typeof stream._duplexState?stream.read():stream.read(function(state){if(state.buffer.length)return state.buffer.head?state.buffer.head.data.length:state.buffer[0].length
return state.length}(rs)):null}},7361:(__unused_webpack_module,exports,__webpack_require__)=>{"use strict"
var Buffer=__webpack_require__(9685).Buffer,isEncoding=Buffer.isEncoding||function(encoding){switch((encoding=""+encoding)&&encoding.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return!0
default:return!1}}
function StringDecoder(encoding){var nb
switch(this.encoding=function(enc){var nenc=function(enc){if(!enc)return"utf8"
for(var retried;;)switch(enc){case"utf8":case"utf-8":return"utf8"
case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return"utf16le"
case"latin1":case"binary":return"latin1"
case"base64":case"ascii":case"hex":return enc
default:if(retried)return
enc=(""+enc).toLowerCase(),retried=!0}}(enc)
if("string"!=typeof nenc&&(Buffer.isEncoding===isEncoding||!isEncoding(enc)))throw new Error("Unknown encoding: "+enc)
return nenc||enc}(encoding),this.encoding){case"utf16le":this.text=utf16Text,this.end=utf16End,nb=4
break
case"utf8":this.fillLast=utf8FillLast,nb=4
break
case"base64":this.text=base64Text,this.end=base64End,nb=3
break
default:return this.write=simpleWrite,void(this.end=simpleEnd)}this.lastNeed=0,this.lastTotal=0,this.lastChar=Buffer.allocUnsafe(nb)}function utf8CheckByte(byte){return byte<=127?0:byte>>5==6?2:byte>>4==14?3:byte>>3==30?4:byte>>6==2?-1:-2}function utf8FillLast(buf){var p=this.lastTotal-this.lastNeed,r=function(self,buf,p){if(128!=(192&buf[0]))return self.lastNeed=0,"�"
if(self.lastNeed>1&&buf.length>1){if(128!=(192&buf[1]))return self.lastNeed=1,"�"
if(self.lastNeed>2&&buf.length>2&&128!=(192&buf[2]))return self.lastNeed=2,"�"}}(this,buf)
return void 0!==r?r:this.lastNeed<=buf.length?(buf.copy(this.lastChar,p,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal)):(buf.copy(this.lastChar,p,0,buf.length),void(this.lastNeed-=buf.length))}function utf16Text(buf,i){if((buf.length-i)%2==0){var r=buf.toString("utf16le",i)
if(r){var c=r.charCodeAt(r.length-1)
if(c>=55296&&c<=56319)return this.lastNeed=2,this.lastTotal=4,this.lastChar[0]=buf[buf.length-2],this.lastChar[1]=buf[buf.length-1],r.slice(0,-1)}return r}return this.lastNeed=1,this.lastTotal=2,this.lastChar[0]=buf[buf.length-1],buf.toString("utf16le",i,buf.length-1)}function utf16End(buf){var r=buf&&buf.length?this.write(buf):""
if(this.lastNeed){var end=this.lastTotal-this.lastNeed
return r+this.lastChar.toString("utf16le",0,end)}return r}function base64Text(buf,i){var n=(buf.length-i)%3
return 0===n?buf.toString("base64",i):(this.lastNeed=3-n,this.lastTotal=3,1===n?this.lastChar[0]=buf[buf.length-1]:(this.lastChar[0]=buf[buf.length-2],this.lastChar[1]=buf[buf.length-1]),buf.toString("base64",i,buf.length-n))}function base64End(buf){var r=buf&&buf.length?this.write(buf):""
return this.lastNeed?r+this.lastChar.toString("base64",0,3-this.lastNeed):r}function simpleWrite(buf){return buf.toString(this.encoding)}function simpleEnd(buf){return buf&&buf.length?this.write(buf):""}exports.s=StringDecoder,StringDecoder.prototype.write=function(buf){if(0===buf.length)return""
var r,i
if(this.lastNeed){if(void 0===(r=this.fillLast(buf)))return""
i=this.lastNeed,this.lastNeed=0}else i=0
return i<buf.length?r?r+this.text(buf,i):this.text(buf,i):r||""},StringDecoder.prototype.end=function(buf){var r=buf&&buf.length?this.write(buf):""
return this.lastNeed?r+"�":r},StringDecoder.prototype.text=function(buf,i){var total=function(self,buf,i){var j=buf.length-1
if(j<i)return 0
var nb=utf8CheckByte(buf[j])
if(nb>=0)return nb>0&&(self.lastNeed=nb-1),nb
if(--j<i||-2===nb)return 0
if((nb=utf8CheckByte(buf[j]))>=0)return nb>0&&(self.lastNeed=nb-2),nb
if(--j<i||-2===nb)return 0
if((nb=utf8CheckByte(buf[j]))>=0)return nb>0&&(2===nb?nb=0:self.lastNeed=nb-3),nb
return 0}(this,buf,i)
if(!this.lastNeed)return buf.toString("utf8",i)
this.lastTotal=total
var end=buf.length-(total-this.lastNeed)
return buf.copy(this.lastChar,0,end),buf.toString("utf8",i,end)},StringDecoder.prototype.fillLast=function(buf){if(this.lastNeed<=buf.length)return buf.copy(this.lastChar,this.lastTotal-this.lastNeed,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal)
buf.copy(this.lastChar,this.lastTotal-this.lastNeed,0,buf.length),this.lastNeed-=buf.length}},4484:(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__(3837).deprecate},4447:module=>{module.exports=function wrappy(fn,cb){if(fn&&cb)return wrappy(fn)(cb)
if("function"!=typeof fn)throw new TypeError("need wrapper function")
return Object.keys(fn).forEach((function(k){wrapper[k]=fn[k]})),wrapper
function wrapper(){for(var args=new Array(arguments.length),i=0;i<args.length;i++)args[i]=arguments[i]
var ret=fn.apply(this,args),cb=args[args.length-1]
return"function"==typeof ret&&ret!==cb&&Object.keys(cb).forEach((function(k){ret[k]=cb[k]})),ret}}},4017:(module,__unused_webpack_exports,__webpack_require__)=>{var isCallable=__webpack_require__(3423),tryToString=__webpack_require__(6621),$TypeError=TypeError
module.exports=function(argument){if(isCallable(argument))return argument
throw $TypeError(tryToString(argument)+" is not a function")}},1748:(module,__unused_webpack_exports,__webpack_require__)=>{var isConstructor=__webpack_require__(6662),tryToString=__webpack_require__(6621),$TypeError=TypeError
module.exports=function(argument){if(isConstructor(argument))return argument
throw $TypeError(tryToString(argument)+" is not a constructor")}},3702:(module,__unused_webpack_exports,__webpack_require__)=>{var isObject=__webpack_require__(404),$String=String,$TypeError=TypeError
module.exports=function(argument){if(isObject(argument))return argument
throw $TypeError($String(argument)+" is not an object")}},1972:(module,__unused_webpack_exports,__webpack_require__)=>{var toIndexedObject=__webpack_require__(3067),toAbsoluteIndex=__webpack_require__(1985),lengthOfArrayLike=__webpack_require__(3078),createMethod=function(IS_INCLUDES){return function($this,el,fromIndex){var value,O=toIndexedObject($this),length=lengthOfArrayLike(O),index=toAbsoluteIndex(fromIndex,length)
if(IS_INCLUDES&&el!=el){for(;length>index;)if((value=O[index++])!=value)return!0}else for(;length>index;index++)if((IS_INCLUDES||index in O)&&O[index]===el)return IS_INCLUDES||index||0
return!IS_INCLUDES&&-1}}
module.exports={includes:createMethod(!0),indexOf:createMethod(!1)}},8328:(module,__unused_webpack_exports,__webpack_require__)=>{var uncurryThis=__webpack_require__(1823),toString=uncurryThis({}.toString),stringSlice=uncurryThis("".slice)
module.exports=function(it){return stringSlice(toString(it),8,-1)}},4725:(module,__unused_webpack_exports,__webpack_require__)=>{var TO_STRING_TAG_SUPPORT=__webpack_require__(1671),isCallable=__webpack_require__(3423),classofRaw=__webpack_require__(8328),TO_STRING_TAG=__webpack_require__(1742)("toStringTag"),$Object=Object,CORRECT_ARGUMENTS="Arguments"==classofRaw(function(){return arguments}())
module.exports=TO_STRING_TAG_SUPPORT?classofRaw:function(it){var O,tag,result
return void 0===it?"Undefined":null===it?"Null":"string"==typeof(tag=function(it,key){try{return it[key]}catch(error){}}(O=$Object(it),TO_STRING_TAG))?tag:CORRECT_ARGUMENTS?classofRaw(O):"Object"==(result=classofRaw(O))&&isCallable(O.callee)?"Arguments":result}},5286:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var call=__webpack_require__(4250),aCallable=__webpack_require__(4017),anObject=__webpack_require__(3702)
module.exports=function(){for(var set=anObject(this),adder=aCallable(set.add),k=0,len=arguments.length;k<len;k++)call(adder,set,arguments[k])
return set}},1244:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var call=__webpack_require__(4250),aCallable=__webpack_require__(4017),anObject=__webpack_require__(3702)
module.exports=function(){for(var wasDeleted,collection=anObject(this),remover=aCallable(collection.delete),allDeleted=!0,k=0,len=arguments.length;k<len;k++)wasDeleted=call(remover,collection,arguments[k]),allDeleted=allDeleted&&wasDeleted
return!!allDeleted}},7485:(module,__unused_webpack_exports,__webpack_require__)=>{var hasOwn=__webpack_require__(9179),ownKeys=__webpack_require__(5228),getOwnPropertyDescriptorModule=__webpack_require__(9784),definePropertyModule=__webpack_require__(605)
module.exports=function(target,source,exceptions){for(var keys=ownKeys(source),defineProperty=definePropertyModule.f,getOwnPropertyDescriptor=getOwnPropertyDescriptorModule.f,i=0;i<keys.length;i++){var key=keys[i]
hasOwn(target,key)||exceptions&&hasOwn(exceptions,key)||defineProperty(target,key,getOwnPropertyDescriptor(source,key))}}},8640:(module,__unused_webpack_exports,__webpack_require__)=>{var DESCRIPTORS=__webpack_require__(9703),definePropertyModule=__webpack_require__(605),createPropertyDescriptor=__webpack_require__(5303)
module.exports=DESCRIPTORS?function(object,key,value){return definePropertyModule.f(object,key,createPropertyDescriptor(1,value))}:function(object,key,value){return object[key]=value,object}},5303:module=>{module.exports=function(bitmap,value){return{enumerable:!(1&bitmap),configurable:!(2&bitmap),writable:!(4&bitmap),value}}},7773:(module,__unused_webpack_exports,__webpack_require__)=>{var isCallable=__webpack_require__(3423),definePropertyModule=__webpack_require__(605),makeBuiltIn=__webpack_require__(4980),defineGlobalProperty=__webpack_require__(4650)
module.exports=function(O,key,value,options){options||(options={})
var simple=options.enumerable,name=void 0!==options.name?options.name:key
if(isCallable(value)&&makeBuiltIn(value,name,options),options.global)simple?O[key]=value:defineGlobalProperty(key,value)
else{try{options.unsafe?O[key]&&(simple=!0):delete O[key]}catch(error){}simple?O[key]=value:definePropertyModule.f(O,key,{value,enumerable:!1,configurable:!options.nonConfigurable,writable:!options.nonWritable})}return O}},4650:(module,__unused_webpack_exports,__webpack_require__)=>{var global=__webpack_require__(5283),defineProperty=Object.defineProperty
module.exports=function(key,value){try{defineProperty(global,key,{value,configurable:!0,writable:!0})}catch(error){global[key]=value}return value}},9703:(module,__unused_webpack_exports,__webpack_require__)=>{var fails=__webpack_require__(7061)
module.exports=!fails((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},7074:(module,__unused_webpack_exports,__webpack_require__)=>{var global=__webpack_require__(5283),isObject=__webpack_require__(404),document=global.document,EXISTS=isObject(document)&&isObject(document.createElement)
module.exports=function(it){return EXISTS?document.createElement(it):{}}},6495:(module,__unused_webpack_exports,__webpack_require__)=>{var getBuiltIn=__webpack_require__(6106)
module.exports=getBuiltIn("navigator","userAgent")||""},8712:(module,__unused_webpack_exports,__webpack_require__)=>{var match,version,global=__webpack_require__(5283),userAgent=__webpack_require__(6495),process=global.process,Deno=global.Deno,versions=process&&process.versions||Deno&&Deno.version,v8=versions&&versions.v8
v8&&(version=(match=v8.split("."))[0]>0&&match[0]<4?1:+(match[0]+match[1])),!version&&userAgent&&(!(match=userAgent.match(/Edge\/(\d+)/))||match[1]>=74)&&(match=userAgent.match(/Chrome\/(\d+)/))&&(version=+match[1]),module.exports=version},5503:module=>{module.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},4141:(module,__unused_webpack_exports,__webpack_require__)=>{var global=__webpack_require__(5283),getOwnPropertyDescriptor=__webpack_require__(9784).f,createNonEnumerableProperty=__webpack_require__(8640),defineBuiltIn=__webpack_require__(7773),defineGlobalProperty=__webpack_require__(4650),copyConstructorProperties=__webpack_require__(7485),isForced=__webpack_require__(1658)
module.exports=function(options,source){var target,key,targetProperty,sourceProperty,descriptor,TARGET=options.target,GLOBAL=options.global,STATIC=options.stat
if(target=GLOBAL?global:STATIC?global[TARGET]||defineGlobalProperty(TARGET,{}):(global[TARGET]||{}).prototype)for(key in source){if(sourceProperty=source[key],targetProperty=options.dontCallGetSet?(descriptor=getOwnPropertyDescriptor(target,key))&&descriptor.value:target[key],!isForced(GLOBAL?key:TARGET+(STATIC?".":"#")+key,options.forced)&&void 0!==targetProperty){if(typeof sourceProperty==typeof targetProperty)continue
copyConstructorProperties(sourceProperty,targetProperty)}(options.sham||targetProperty&&targetProperty.sham)&&createNonEnumerableProperty(sourceProperty,"sham",!0),defineBuiltIn(target,key,sourceProperty,options)}}},7061:module=>{module.exports=function(exec){try{return!!exec()}catch(error){return!0}}},2902:(module,__unused_webpack_exports,__webpack_require__)=>{var uncurryThis=__webpack_require__(1823),aCallable=__webpack_require__(4017),NATIVE_BIND=__webpack_require__(751),bind=uncurryThis(uncurryThis.bind)
module.exports=function(fn,that){return aCallable(fn),void 0===that?fn:NATIVE_BIND?bind(fn,that):function(){return fn.apply(that,arguments)}}},751:(module,__unused_webpack_exports,__webpack_require__)=>{var fails=__webpack_require__(7061)
module.exports=!fails((function(){var test=function(){}.bind()
return"function"!=typeof test||test.hasOwnProperty("prototype")}))},4250:(module,__unused_webpack_exports,__webpack_require__)=>{var NATIVE_BIND=__webpack_require__(751),call=Function.prototype.call
module.exports=NATIVE_BIND?call.bind(call):function(){return call.apply(call,arguments)}},357:(module,__unused_webpack_exports,__webpack_require__)=>{var DESCRIPTORS=__webpack_require__(9703),hasOwn=__webpack_require__(9179),FunctionPrototype=Function.prototype,getDescriptor=DESCRIPTORS&&Object.getOwnPropertyDescriptor,EXISTS=hasOwn(FunctionPrototype,"name"),PROPER=EXISTS&&"something"===function(){}.name,CONFIGURABLE=EXISTS&&(!DESCRIPTORS||DESCRIPTORS&&getDescriptor(FunctionPrototype,"name").configurable)
module.exports={EXISTS,PROPER,CONFIGURABLE}},1823:(module,__unused_webpack_exports,__webpack_require__)=>{var NATIVE_BIND=__webpack_require__(751),FunctionPrototype=Function.prototype,bind=FunctionPrototype.bind,call=FunctionPrototype.call,uncurryThis=NATIVE_BIND&&bind.bind(call,call)
module.exports=NATIVE_BIND?function(fn){return fn&&uncurryThis(fn)}:function(fn){return fn&&function(){return call.apply(fn,arguments)}}},6106:(module,__unused_webpack_exports,__webpack_require__)=>{var global=__webpack_require__(5283),isCallable=__webpack_require__(3423),aFunction=function(argument){return isCallable(argument)?argument:void 0}
module.exports=function(namespace,method){return arguments.length<2?aFunction(global[namespace]):global[namespace]&&global[namespace][method]}},7791:(module,__unused_webpack_exports,__webpack_require__)=>{var classof=__webpack_require__(4725),getMethod=__webpack_require__(462),Iterators=__webpack_require__(7760),ITERATOR=__webpack_require__(1742)("iterator")
module.exports=function(it){if(null!=it)return getMethod(it,ITERATOR)||getMethod(it,"@@iterator")||Iterators[classof(it)]}},4646:(module,__unused_webpack_exports,__webpack_require__)=>{var call=__webpack_require__(4250),aCallable=__webpack_require__(4017),anObject=__webpack_require__(3702),tryToString=__webpack_require__(6621),getIteratorMethod=__webpack_require__(7791),$TypeError=TypeError
module.exports=function(argument,usingIterator){var iteratorMethod=arguments.length<2?getIteratorMethod(argument):usingIterator
if(aCallable(iteratorMethod))return anObject(call(iteratorMethod,argument))
throw $TypeError(tryToString(argument)+" is not iterable")}},4331:(module,__unused_webpack_exports,__webpack_require__)=>{var call=__webpack_require__(4250)
module.exports=function(it){return call(Map.prototype.entries,it)}},462:(module,__unused_webpack_exports,__webpack_require__)=>{var aCallable=__webpack_require__(4017)
module.exports=function(V,P){var func=V[P]
return null==func?void 0:aCallable(func)}},8897:(module,__unused_webpack_exports,__webpack_require__)=>{var call=__webpack_require__(4250)
module.exports=function(it){return call(Set.prototype.values,it)}},5283:module=>{var check=function(it){return it&&it.Math==Math&&it}
module.exports=check("object"==typeof globalThis&&globalThis)||check("object"==typeof window&&window)||check("object"==typeof self&&self)||check("object"==typeof global&&global)||function(){return this}()||Function("return this")()},9179:(module,__unused_webpack_exports,__webpack_require__)=>{var uncurryThis=__webpack_require__(1823),toObject=__webpack_require__(1052),hasOwnProperty=uncurryThis({}.hasOwnProperty)
module.exports=Object.hasOwn||function(it,key){return hasOwnProperty(toObject(it),key)}},1442:module=>{module.exports={}},7529:(module,__unused_webpack_exports,__webpack_require__)=>{var DESCRIPTORS=__webpack_require__(9703),fails=__webpack_require__(7061),createElement=__webpack_require__(7074)
module.exports=!DESCRIPTORS&&!fails((function(){return 7!=Object.defineProperty(createElement("div"),"a",{get:function(){return 7}}).a}))},8672:(module,__unused_webpack_exports,__webpack_require__)=>{var uncurryThis=__webpack_require__(1823),fails=__webpack_require__(7061),classof=__webpack_require__(8328),$Object=Object,split=uncurryThis("".split)
module.exports=fails((function(){return!$Object("z").propertyIsEnumerable(0)}))?function(it){return"String"==classof(it)?split(it,""):$Object(it)}:$Object},4942:(module,__unused_webpack_exports,__webpack_require__)=>{var uncurryThis=__webpack_require__(1823),isCallable=__webpack_require__(3423),store=__webpack_require__(3765),functionToString=uncurryThis(Function.toString)
isCallable(store.inspectSource)||(store.inspectSource=function(it){return functionToString(it)}),module.exports=store.inspectSource},9054:(module,__unused_webpack_exports,__webpack_require__)=>{var set,get,has,NATIVE_WEAK_MAP=__webpack_require__(5167),global=__webpack_require__(5283),uncurryThis=__webpack_require__(1823),isObject=__webpack_require__(404),createNonEnumerableProperty=__webpack_require__(8640),hasOwn=__webpack_require__(9179),shared=__webpack_require__(3765),sharedKey=__webpack_require__(1683),hiddenKeys=__webpack_require__(1442),TypeError=global.TypeError,WeakMap=global.WeakMap
if(NATIVE_WEAK_MAP||shared.state){var store=shared.state||(shared.state=new WeakMap),wmget=uncurryThis(store.get),wmhas=uncurryThis(store.has),wmset=uncurryThis(store.set)
set=function(it,metadata){if(wmhas(store,it))throw new TypeError("Object already initialized")
return metadata.facade=it,wmset(store,it,metadata),metadata},get=function(it){return wmget(store,it)||{}},has=function(it){return wmhas(store,it)}}else{var STATE=sharedKey("state")
hiddenKeys[STATE]=!0,set=function(it,metadata){if(hasOwn(it,STATE))throw new TypeError("Object already initialized")
return metadata.facade=it,createNonEnumerableProperty(it,STATE,metadata),metadata},get=function(it){return hasOwn(it,STATE)?it[STATE]:{}},has=function(it){return hasOwn(it,STATE)}}module.exports={set,get,has,enforce:function(it){return has(it)?get(it):set(it,{})},getterFor:function(TYPE){return function(it){var state
if(!isObject(it)||(state=get(it)).type!==TYPE)throw TypeError("Incompatible receiver, "+TYPE+" required")
return state}}}},2135:(module,__unused_webpack_exports,__webpack_require__)=>{var wellKnownSymbol=__webpack_require__(1742),Iterators=__webpack_require__(7760),ITERATOR=wellKnownSymbol("iterator"),ArrayPrototype=Array.prototype
module.exports=function(it){return void 0!==it&&(Iterators.Array===it||ArrayPrototype[ITERATOR]===it)}},3423:module=>{module.exports=function(argument){return"function"==typeof argument}},6662:(module,__unused_webpack_exports,__webpack_require__)=>{var uncurryThis=__webpack_require__(1823),fails=__webpack_require__(7061),isCallable=__webpack_require__(3423),classof=__webpack_require__(4725),getBuiltIn=__webpack_require__(6106),inspectSource=__webpack_require__(4942),noop=function(){},empty=[],construct=getBuiltIn("Reflect","construct"),constructorRegExp=/^\s*(?:class|function)\b/,exec=uncurryThis(constructorRegExp.exec),INCORRECT_TO_STRING=!constructorRegExp.exec(noop),isConstructorModern=function(argument){if(!isCallable(argument))return!1
try{return construct(noop,empty,argument),!0}catch(error){return!1}},isConstructorLegacy=function(argument){if(!isCallable(argument))return!1
switch(classof(argument)){case"AsyncFunction":case"GeneratorFunction":case"AsyncGeneratorFunction":return!1}try{return INCORRECT_TO_STRING||!!exec(constructorRegExp,inspectSource(argument))}catch(error){return!0}}
isConstructorLegacy.sham=!0,module.exports=!construct||fails((function(){var called
return isConstructorModern(isConstructorModern.call)||!isConstructorModern(Object)||!isConstructorModern((function(){called=!0}))||called}))?isConstructorLegacy:isConstructorModern},1658:(module,__unused_webpack_exports,__webpack_require__)=>{var fails=__webpack_require__(7061),isCallable=__webpack_require__(3423),replacement=/#|\.prototype\./,isForced=function(feature,detection){var value=data[normalize(feature)]
return value==POLYFILL||value!=NATIVE&&(isCallable(detection)?fails(detection):!!detection)},normalize=isForced.normalize=function(string){return String(string).replace(replacement,".").toLowerCase()},data=isForced.data={},NATIVE=isForced.NATIVE="N",POLYFILL=isForced.POLYFILL="P"
module.exports=isForced},404:(module,__unused_webpack_exports,__webpack_require__)=>{var isCallable=__webpack_require__(3423)
module.exports=function(it){return"object"==typeof it?null!==it:isCallable(it)}},847:module=>{module.exports=!1},2825:(module,__unused_webpack_exports,__webpack_require__)=>{var getBuiltIn=__webpack_require__(6106),isCallable=__webpack_require__(3423),isPrototypeOf=__webpack_require__(6777),USE_SYMBOL_AS_UID=__webpack_require__(7026),$Object=Object
module.exports=USE_SYMBOL_AS_UID?function(it){return"symbol"==typeof it}:function(it){var $Symbol=getBuiltIn("Symbol")
return isCallable($Symbol)&&isPrototypeOf($Symbol.prototype,$Object(it))}},3534:(module,__unused_webpack_exports,__webpack_require__)=>{var bind=__webpack_require__(2902),call=__webpack_require__(4250),anObject=__webpack_require__(3702),tryToString=__webpack_require__(6621),isArrayIteratorMethod=__webpack_require__(2135),lengthOfArrayLike=__webpack_require__(3078),isPrototypeOf=__webpack_require__(6777),getIterator=__webpack_require__(4646),getIteratorMethod=__webpack_require__(7791),iteratorClose=__webpack_require__(4628),$TypeError=TypeError,Result=function(stopped,result){this.stopped=stopped,this.result=result},ResultPrototype=Result.prototype
module.exports=function(iterable,unboundFunction,options){var iterator,iterFn,index,length,result,next,step,that=options&&options.that,AS_ENTRIES=!(!options||!options.AS_ENTRIES),IS_RECORD=!(!options||!options.IS_RECORD),IS_ITERATOR=!(!options||!options.IS_ITERATOR),INTERRUPTED=!(!options||!options.INTERRUPTED),fn=bind(unboundFunction,that),stop=function(condition){return iterator&&iteratorClose(iterator,"normal",condition),new Result(!0,condition)},callFn=function(value){return AS_ENTRIES?(anObject(value),INTERRUPTED?fn(value[0],value[1],stop):fn(value[0],value[1])):INTERRUPTED?fn(value,stop):fn(value)}
if(IS_RECORD)iterator=iterable.iterator
else if(IS_ITERATOR)iterator=iterable
else{if(!(iterFn=getIteratorMethod(iterable)))throw $TypeError(tryToString(iterable)+" is not iterable")
if(isArrayIteratorMethod(iterFn)){for(index=0,length=lengthOfArrayLike(iterable);length>index;index++)if((result=callFn(iterable[index]))&&isPrototypeOf(ResultPrototype,result))return result
return new Result(!1)}iterator=getIterator(iterable,iterFn)}for(next=IS_RECORD?iterable.next:iterator.next;!(step=call(next,iterator)).done;){try{result=callFn(step.value)}catch(error){iteratorClose(iterator,"throw",error)}if("object"==typeof result&&result&&isPrototypeOf(ResultPrototype,result))return result}return new Result(!1)}},4628:(module,__unused_webpack_exports,__webpack_require__)=>{var call=__webpack_require__(4250),anObject=__webpack_require__(3702),getMethod=__webpack_require__(462)
module.exports=function(iterator,kind,value){var innerResult,innerError
anObject(iterator)
try{if(!(innerResult=getMethod(iterator,"return"))){if("throw"===kind)throw value
return value}innerResult=call(innerResult,iterator)}catch(error){innerError=!0,innerResult=error}if("throw"===kind)throw value
if(innerError)throw innerResult
return anObject(innerResult),value}},7760:module=>{module.exports={}},3078:(module,__unused_webpack_exports,__webpack_require__)=>{var toLength=__webpack_require__(5347)
module.exports=function(obj){return toLength(obj.length)}},4980:(module,__unused_webpack_exports,__webpack_require__)=>{var fails=__webpack_require__(7061),isCallable=__webpack_require__(3423),hasOwn=__webpack_require__(9179),DESCRIPTORS=__webpack_require__(9703),CONFIGURABLE_FUNCTION_NAME=__webpack_require__(357).CONFIGURABLE,inspectSource=__webpack_require__(4942),InternalStateModule=__webpack_require__(9054),enforceInternalState=InternalStateModule.enforce,getInternalState=InternalStateModule.get,defineProperty=Object.defineProperty,CONFIGURABLE_LENGTH=DESCRIPTORS&&!fails((function(){return 8!==defineProperty((function(){}),"length",{value:8}).length})),TEMPLATE=String(String).split("String"),makeBuiltIn=module.exports=function(value,name,options){"Symbol("===String(name).slice(0,7)&&(name="["+String(name).replace(/^Symbol\(([^)]*)\)/,"$1")+"]"),options&&options.getter&&(name="get "+name),options&&options.setter&&(name="set "+name),(!hasOwn(value,"name")||CONFIGURABLE_FUNCTION_NAME&&value.name!==name)&&(DESCRIPTORS?defineProperty(value,"name",{value:name,configurable:!0}):value.name=name),CONFIGURABLE_LENGTH&&options&&hasOwn(options,"arity")&&value.length!==options.arity&&defineProperty(value,"length",{value:options.arity})
try{options&&hasOwn(options,"constructor")&&options.constructor?DESCRIPTORS&&defineProperty(value,"prototype",{writable:!1}):value.prototype&&(value.prototype=void 0)}catch(error){}var state=enforceInternalState(value)
return hasOwn(state,"source")||(state.source=TEMPLATE.join("string"==typeof name?name:"")),value}
Function.prototype.toString=makeBuiltIn((function(){return isCallable(this)&&getInternalState(this).source||inspectSource(this)}),"toString")},6794:module=>{var ceil=Math.ceil,floor=Math.floor
module.exports=Math.trunc||function(x){var n=+x
return(n>0?floor:ceil)(n)}},5132:(module,__unused_webpack_exports,__webpack_require__)=>{var V8_VERSION=__webpack_require__(8712),fails=__webpack_require__(7061)
module.exports=!!Object.getOwnPropertySymbols&&!fails((function(){var symbol=Symbol()
return!String(symbol)||!(Object(symbol)instanceof Symbol)||!Symbol.sham&&V8_VERSION&&V8_VERSION<41}))},5167:(module,__unused_webpack_exports,__webpack_require__)=>{var global=__webpack_require__(5283),isCallable=__webpack_require__(3423),inspectSource=__webpack_require__(4942),WeakMap=global.WeakMap
module.exports=isCallable(WeakMap)&&/native code/.test(inspectSource(WeakMap))},4272:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var aCallable=__webpack_require__(4017),PromiseCapability=function(C){var resolve,reject
this.promise=new C((function($$resolve,$$reject){if(void 0!==resolve||void 0!==reject)throw TypeError("Bad Promise constructor")
resolve=$$resolve,reject=$$reject})),this.resolve=aCallable(resolve),this.reject=aCallable(reject)}
module.exports.f=function(C){return new PromiseCapability(C)}},605:(__unused_webpack_module,exports,__webpack_require__)=>{var DESCRIPTORS=__webpack_require__(9703),IE8_DOM_DEFINE=__webpack_require__(7529),V8_PROTOTYPE_DEFINE_BUG=__webpack_require__(3715),anObject=__webpack_require__(3702),toPropertyKey=__webpack_require__(2698),$TypeError=TypeError,$defineProperty=Object.defineProperty,$getOwnPropertyDescriptor=Object.getOwnPropertyDescriptor
exports.f=DESCRIPTORS?V8_PROTOTYPE_DEFINE_BUG?function(O,P,Attributes){if(anObject(O),P=toPropertyKey(P),anObject(Attributes),"function"==typeof O&&"prototype"===P&&"value"in Attributes&&"writable"in Attributes&&!Attributes.writable){var current=$getOwnPropertyDescriptor(O,P)
current&&current.writable&&(O[P]=Attributes.value,Attributes={configurable:"configurable"in Attributes?Attributes.configurable:current.configurable,enumerable:"enumerable"in Attributes?Attributes.enumerable:current.enumerable,writable:!1})}return $defineProperty(O,P,Attributes)}:$defineProperty:function(O,P,Attributes){if(anObject(O),P=toPropertyKey(P),anObject(Attributes),IE8_DOM_DEFINE)try{return $defineProperty(O,P,Attributes)}catch(error){}if("get"in Attributes||"set"in Attributes)throw $TypeError("Accessors not supported")
return"value"in Attributes&&(O[P]=Attributes.value),O}},9784:(__unused_webpack_module,exports,__webpack_require__)=>{var DESCRIPTORS=__webpack_require__(9703),call=__webpack_require__(4250),propertyIsEnumerableModule=__webpack_require__(8523),createPropertyDescriptor=__webpack_require__(5303),toIndexedObject=__webpack_require__(3067),toPropertyKey=__webpack_require__(2698),hasOwn=__webpack_require__(9179),IE8_DOM_DEFINE=__webpack_require__(7529),$getOwnPropertyDescriptor=Object.getOwnPropertyDescriptor
exports.f=DESCRIPTORS?$getOwnPropertyDescriptor:function(O,P){if(O=toIndexedObject(O),P=toPropertyKey(P),IE8_DOM_DEFINE)try{return $getOwnPropertyDescriptor(O,P)}catch(error){}if(hasOwn(O,P))return createPropertyDescriptor(!call(propertyIsEnumerableModule.f,O,P),O[P])}},1584:(__unused_webpack_module,exports,__webpack_require__)=>{var internalObjectKeys=__webpack_require__(6023),hiddenKeys=__webpack_require__(5503).concat("length","prototype")
exports.f=Object.getOwnPropertyNames||function(O){return internalObjectKeys(O,hiddenKeys)}},126:(__unused_webpack_module,exports)=>{exports.f=Object.getOwnPropertySymbols},6777:(module,__unused_webpack_exports,__webpack_require__)=>{var uncurryThis=__webpack_require__(1823)
module.exports=uncurryThis({}.isPrototypeOf)},6023:(module,__unused_webpack_exports,__webpack_require__)=>{var uncurryThis=__webpack_require__(1823),hasOwn=__webpack_require__(9179),toIndexedObject=__webpack_require__(3067),indexOf=__webpack_require__(1972).indexOf,hiddenKeys=__webpack_require__(1442),push=uncurryThis([].push)
module.exports=function(object,names){var key,O=toIndexedObject(object),i=0,result=[]
for(key in O)!hasOwn(hiddenKeys,key)&&hasOwn(O,key)&&push(result,key)
for(;names.length>i;)hasOwn(O,key=names[i++])&&(~indexOf(result,key)||push(result,key))
return result}},8523:(__unused_webpack_module,exports)=>{"use strict"
var $propertyIsEnumerable={}.propertyIsEnumerable,getOwnPropertyDescriptor=Object.getOwnPropertyDescriptor,NASHORN_BUG=getOwnPropertyDescriptor&&!$propertyIsEnumerable.call({1:2},1)
exports.f=NASHORN_BUG?function(V){var descriptor=getOwnPropertyDescriptor(this,V)
return!!descriptor&&descriptor.enumerable}:$propertyIsEnumerable},3620:(module,__unused_webpack_exports,__webpack_require__)=>{var call=__webpack_require__(4250),isCallable=__webpack_require__(3423),isObject=__webpack_require__(404),$TypeError=TypeError
module.exports=function(input,pref){var fn,val
if("string"===pref&&isCallable(fn=input.toString)&&!isObject(val=call(fn,input)))return val
if(isCallable(fn=input.valueOf)&&!isObject(val=call(fn,input)))return val
if("string"!==pref&&isCallable(fn=input.toString)&&!isObject(val=call(fn,input)))return val
throw $TypeError("Can't convert object to primitive value")}},5228:(module,__unused_webpack_exports,__webpack_require__)=>{var getBuiltIn=__webpack_require__(6106),uncurryThis=__webpack_require__(1823),getOwnPropertyNamesModule=__webpack_require__(1584),getOwnPropertySymbolsModule=__webpack_require__(126),anObject=__webpack_require__(3702),concat=uncurryThis([].concat)
module.exports=getBuiltIn("Reflect","ownKeys")||function(it){var keys=getOwnPropertyNamesModule.f(anObject(it)),getOwnPropertySymbols=getOwnPropertySymbolsModule.f
return getOwnPropertySymbols?concat(keys,getOwnPropertySymbols(it)):keys}},4442:module=>{module.exports=function(exec){try{return{error:!1,value:exec()}}catch(error){return{error:!0,value:error}}}},6923:module=>{var $TypeError=TypeError
module.exports=function(it){if(null==it)throw $TypeError("Can't call method on "+it)
return it}},6295:module=>{module.exports=function(x,y){return x===y||x!=x&&y!=y}},1683:(module,__unused_webpack_exports,__webpack_require__)=>{var shared=__webpack_require__(311),uid=__webpack_require__(7451),keys=shared("keys")
module.exports=function(key){return keys[key]||(keys[key]=uid(key))}},3765:(module,__unused_webpack_exports,__webpack_require__)=>{var global=__webpack_require__(5283),defineGlobalProperty=__webpack_require__(4650),store=global["__core-js_shared__"]||defineGlobalProperty("__core-js_shared__",{})
module.exports=store},311:(module,__unused_webpack_exports,__webpack_require__)=>{var IS_PURE=__webpack_require__(847),store=__webpack_require__(3765);(module.exports=function(key,value){return store[key]||(store[key]=void 0!==value?value:{})})("versions",[]).push({version:"3.23.5",mode:IS_PURE?"pure":"global",copyright:"© 2014-2022 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.23.5/LICENSE",source:"https://github.com/zloirock/core-js"})},4897:(module,__unused_webpack_exports,__webpack_require__)=>{var anObject=__webpack_require__(3702),aConstructor=__webpack_require__(1748),SPECIES=__webpack_require__(1742)("species")
module.exports=function(O,defaultConstructor){var S,C=anObject(O).constructor
return void 0===C||null==(S=anObject(C)[SPECIES])?defaultConstructor:aConstructor(S)}},1985:(module,__unused_webpack_exports,__webpack_require__)=>{var toIntegerOrInfinity=__webpack_require__(7157),max=Math.max,min=Math.min
module.exports=function(index,length){var integer=toIntegerOrInfinity(index)
return integer<0?max(integer+length,0):min(integer,length)}},3067:(module,__unused_webpack_exports,__webpack_require__)=>{var IndexedObject=__webpack_require__(8672),requireObjectCoercible=__webpack_require__(6923)
module.exports=function(it){return IndexedObject(requireObjectCoercible(it))}},7157:(module,__unused_webpack_exports,__webpack_require__)=>{var trunc=__webpack_require__(6794)
module.exports=function(argument){var number=+argument
return number!=number||0===number?0:trunc(number)}},5347:(module,__unused_webpack_exports,__webpack_require__)=>{var toIntegerOrInfinity=__webpack_require__(7157),min=Math.min
module.exports=function(argument){return argument>0?min(toIntegerOrInfinity(argument),9007199254740991):0}},1052:(module,__unused_webpack_exports,__webpack_require__)=>{var requireObjectCoercible=__webpack_require__(6923),$Object=Object
module.exports=function(argument){return $Object(requireObjectCoercible(argument))}},6355:(module,__unused_webpack_exports,__webpack_require__)=>{var call=__webpack_require__(4250),isObject=__webpack_require__(404),isSymbol=__webpack_require__(2825),getMethod=__webpack_require__(462),ordinaryToPrimitive=__webpack_require__(3620),wellKnownSymbol=__webpack_require__(1742),$TypeError=TypeError,TO_PRIMITIVE=wellKnownSymbol("toPrimitive")
module.exports=function(input,pref){if(!isObject(input)||isSymbol(input))return input
var result,exoticToPrim=getMethod(input,TO_PRIMITIVE)
if(exoticToPrim){if(void 0===pref&&(pref="default"),result=call(exoticToPrim,input,pref),!isObject(result)||isSymbol(result))return result
throw $TypeError("Can't convert object to primitive value")}return void 0===pref&&(pref="number"),ordinaryToPrimitive(input,pref)}},2698:(module,__unused_webpack_exports,__webpack_require__)=>{var toPrimitive=__webpack_require__(6355),isSymbol=__webpack_require__(2825)
module.exports=function(argument){var key=toPrimitive(argument,"string")
return isSymbol(key)?key:key+""}},1671:(module,__unused_webpack_exports,__webpack_require__)=>{var test={}
test[__webpack_require__(1742)("toStringTag")]="z",module.exports="[object z]"===String(test)},8855:(module,__unused_webpack_exports,__webpack_require__)=>{var classof=__webpack_require__(4725),$String=String
module.exports=function(argument){if("Symbol"===classof(argument))throw TypeError("Cannot convert a Symbol value to a string")
return $String(argument)}},6621:module=>{var $String=String
module.exports=function(argument){try{return $String(argument)}catch(error){return"Object"}}},7451:(module,__unused_webpack_exports,__webpack_require__)=>{var uncurryThis=__webpack_require__(1823),id=0,postfix=Math.random(),toString=uncurryThis(1..toString)
module.exports=function(key){return"Symbol("+(void 0===key?"":key)+")_"+toString(++id+postfix,36)}},7026:(module,__unused_webpack_exports,__webpack_require__)=>{var NATIVE_SYMBOL=__webpack_require__(5132)
module.exports=NATIVE_SYMBOL&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},3715:(module,__unused_webpack_exports,__webpack_require__)=>{var DESCRIPTORS=__webpack_require__(9703),fails=__webpack_require__(7061)
module.exports=DESCRIPTORS&&fails((function(){return 42!=Object.defineProperty((function(){}),"prototype",{value:42,writable:!1}).prototype}))},1742:(module,__unused_webpack_exports,__webpack_require__)=>{var global=__webpack_require__(5283),shared=__webpack_require__(311),hasOwn=__webpack_require__(9179),uid=__webpack_require__(7451),NATIVE_SYMBOL=__webpack_require__(5132),USE_SYMBOL_AS_UID=__webpack_require__(7026),WellKnownSymbolsStore=shared("wks"),Symbol=global.Symbol,symbolFor=Symbol&&Symbol.for,createWellKnownSymbol=USE_SYMBOL_AS_UID?Symbol:Symbol&&Symbol.withoutSetter||uid
module.exports=function(name){if(!hasOwn(WellKnownSymbolsStore,name)||!NATIVE_SYMBOL&&"string"!=typeof WellKnownSymbolsStore[name]){var description="Symbol."+name
NATIVE_SYMBOL&&hasOwn(Symbol,name)?WellKnownSymbolsStore[name]=Symbol[name]:WellKnownSymbolsStore[name]=USE_SYMBOL_AS_UID&&symbolFor?symbolFor(description):createWellKnownSymbol(description)}return WellKnownSymbolsStore[name]}},8558:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),call=__webpack_require__(4250),aCallable=__webpack_require__(4017),getBuiltIn=__webpack_require__(6106),newPromiseCapabilityModule=__webpack_require__(4272),perform=__webpack_require__(4442),iterate=__webpack_require__(3534)
$({target:"Promise",stat:!0},{any:function(iterable){var C=this,AggregateError=getBuiltIn("AggregateError"),capability=newPromiseCapabilityModule.f(C),resolve=capability.resolve,reject=capability.reject,result=perform((function(){var promiseResolve=aCallable(C.resolve),errors=[],counter=0,remaining=1,alreadyResolved=!1
iterate(iterable,(function(promise){var index=counter++,alreadyRejected=!1
remaining++,call(promiseResolve,C,promise).then((function(value){alreadyRejected||alreadyResolved||(alreadyResolved=!0,resolve(value))}),(function(error){alreadyRejected||alreadyResolved||(alreadyRejected=!0,errors[index]=error,--remaining||reject(new AggregateError(errors,"No one promise resolved")))}))})),--remaining||reject(new AggregateError(errors,"No one promise resolved"))}))
return result.error&&reject(result.value),capability.promise}})},7006:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
__webpack_require__(4141)({target:"Map",proto:!0,real:!0,forced:!0},{deleteAll:__webpack_require__(1244)})},2845:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),anObject=__webpack_require__(3702),bind=__webpack_require__(2902),getMapIterator=__webpack_require__(4331),iterate=__webpack_require__(3534)
$({target:"Map",proto:!0,real:!0,forced:!0},{every:function(callbackfn){var map=anObject(this),iterator=getMapIterator(map),boundFunction=bind(callbackfn,arguments.length>1?arguments[1]:void 0)
return!iterate(iterator,(function(key,value,stop){if(!boundFunction(value,key,map))return stop()}),{AS_ENTRIES:!0,IS_ITERATOR:!0,INTERRUPTED:!0}).stopped}})},8750:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),getBuiltIn=__webpack_require__(6106),bind=__webpack_require__(2902),call=__webpack_require__(4250),aCallable=__webpack_require__(4017),anObject=__webpack_require__(3702),speciesConstructor=__webpack_require__(4897),getMapIterator=__webpack_require__(4331),iterate=__webpack_require__(3534)
$({target:"Map",proto:!0,real:!0,forced:!0},{filter:function(callbackfn){var map=anObject(this),iterator=getMapIterator(map),boundFunction=bind(callbackfn,arguments.length>1?arguments[1]:void 0),newMap=new(speciesConstructor(map,getBuiltIn("Map"))),setter=aCallable(newMap.set)
return iterate(iterator,(function(key,value){boundFunction(value,key,map)&&call(setter,newMap,key,value)}),{AS_ENTRIES:!0,IS_ITERATOR:!0}),newMap}})},4255:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),anObject=__webpack_require__(3702),bind=__webpack_require__(2902),getMapIterator=__webpack_require__(4331),iterate=__webpack_require__(3534)
$({target:"Map",proto:!0,real:!0,forced:!0},{findKey:function(callbackfn){var map=anObject(this),iterator=getMapIterator(map),boundFunction=bind(callbackfn,arguments.length>1?arguments[1]:void 0)
return iterate(iterator,(function(key,value,stop){if(boundFunction(value,key,map))return stop(key)}),{AS_ENTRIES:!0,IS_ITERATOR:!0,INTERRUPTED:!0}).result}})},6291:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),anObject=__webpack_require__(3702),bind=__webpack_require__(2902),getMapIterator=__webpack_require__(4331),iterate=__webpack_require__(3534)
$({target:"Map",proto:!0,real:!0,forced:!0},{find:function(callbackfn){var map=anObject(this),iterator=getMapIterator(map),boundFunction=bind(callbackfn,arguments.length>1?arguments[1]:void 0)
return iterate(iterator,(function(key,value,stop){if(boundFunction(value,key,map))return stop(value)}),{AS_ENTRIES:!0,IS_ITERATOR:!0,INTERRUPTED:!0}).result}})},3295:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),anObject=__webpack_require__(3702),getMapIterator=__webpack_require__(4331),sameValueZero=__webpack_require__(6295),iterate=__webpack_require__(3534)
$({target:"Map",proto:!0,real:!0,forced:!0},{includes:function(searchElement){return iterate(getMapIterator(anObject(this)),(function(key,value,stop){if(sameValueZero(value,searchElement))return stop()}),{AS_ENTRIES:!0,IS_ITERATOR:!0,INTERRUPTED:!0}).stopped}})},9212:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),anObject=__webpack_require__(3702),getMapIterator=__webpack_require__(4331),iterate=__webpack_require__(3534)
$({target:"Map",proto:!0,real:!0,forced:!0},{keyOf:function(searchElement){return iterate(getMapIterator(anObject(this)),(function(key,value,stop){if(value===searchElement)return stop(key)}),{AS_ENTRIES:!0,IS_ITERATOR:!0,INTERRUPTED:!0}).result}})},6085:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),getBuiltIn=__webpack_require__(6106),bind=__webpack_require__(2902),call=__webpack_require__(4250),aCallable=__webpack_require__(4017),anObject=__webpack_require__(3702),speciesConstructor=__webpack_require__(4897),getMapIterator=__webpack_require__(4331),iterate=__webpack_require__(3534)
$({target:"Map",proto:!0,real:!0,forced:!0},{mapKeys:function(callbackfn){var map=anObject(this),iterator=getMapIterator(map),boundFunction=bind(callbackfn,arguments.length>1?arguments[1]:void 0),newMap=new(speciesConstructor(map,getBuiltIn("Map"))),setter=aCallable(newMap.set)
return iterate(iterator,(function(key,value){call(setter,newMap,boundFunction(value,key,map),value)}),{AS_ENTRIES:!0,IS_ITERATOR:!0}),newMap}})},7524:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),getBuiltIn=__webpack_require__(6106),bind=__webpack_require__(2902),call=__webpack_require__(4250),aCallable=__webpack_require__(4017),anObject=__webpack_require__(3702),speciesConstructor=__webpack_require__(4897),getMapIterator=__webpack_require__(4331),iterate=__webpack_require__(3534)
$({target:"Map",proto:!0,real:!0,forced:!0},{mapValues:function(callbackfn){var map=anObject(this),iterator=getMapIterator(map),boundFunction=bind(callbackfn,arguments.length>1?arguments[1]:void 0),newMap=new(speciesConstructor(map,getBuiltIn("Map"))),setter=aCallable(newMap.set)
return iterate(iterator,(function(key,value){call(setter,newMap,key,boundFunction(value,key,map))}),{AS_ENTRIES:!0,IS_ITERATOR:!0}),newMap}})},9139:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),aCallable=__webpack_require__(4017),anObject=__webpack_require__(3702),iterate=__webpack_require__(3534)
$({target:"Map",proto:!0,real:!0,arity:1,forced:!0},{merge:function(iterable){for(var map=anObject(this),setter=aCallable(map.set),argumentsLength=arguments.length,i=0;i<argumentsLength;)iterate(arguments[i++],setter,{that:map,AS_ENTRIES:!0})
return map}})},2703:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),anObject=__webpack_require__(3702),aCallable=__webpack_require__(4017),getMapIterator=__webpack_require__(4331),iterate=__webpack_require__(3534),$TypeError=TypeError
$({target:"Map",proto:!0,real:!0,forced:!0},{reduce:function(callbackfn){var map=anObject(this),iterator=getMapIterator(map),noInitial=arguments.length<2,accumulator=noInitial?void 0:arguments[1]
if(aCallable(callbackfn),iterate(iterator,(function(key,value){noInitial?(noInitial=!1,accumulator=value):accumulator=callbackfn(accumulator,value,key,map)}),{AS_ENTRIES:!0,IS_ITERATOR:!0}),noInitial)throw $TypeError("Reduce of empty map with no initial value")
return accumulator}})},8144:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),anObject=__webpack_require__(3702),bind=__webpack_require__(2902),getMapIterator=__webpack_require__(4331),iterate=__webpack_require__(3534)
$({target:"Map",proto:!0,real:!0,forced:!0},{some:function(callbackfn){var map=anObject(this),iterator=getMapIterator(map),boundFunction=bind(callbackfn,arguments.length>1?arguments[1]:void 0)
return iterate(iterator,(function(key,value,stop){if(boundFunction(value,key,map))return stop()}),{AS_ENTRIES:!0,IS_ITERATOR:!0,INTERRUPTED:!0}).stopped}})},1320:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),call=__webpack_require__(4250),anObject=__webpack_require__(3702),aCallable=__webpack_require__(4017),$TypeError=TypeError
$({target:"Map",proto:!0,real:!0,forced:!0},{update:function(key,callback){var map=anObject(this),get=aCallable(map.get),has=aCallable(map.has),set=aCallable(map.set),length=arguments.length
aCallable(callback)
var isPresentInMap=call(has,map,key)
if(!isPresentInMap&&length<3)throw $TypeError("Updating absent value")
var value=isPresentInMap?call(get,map,key):aCallable(length>2?arguments[2]:void 0)(key,map)
return call(set,map,key,callback(value,key,map)),map}})},2095:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
__webpack_require__(4141)({target:"Set",proto:!0,real:!0,forced:!0},{addAll:__webpack_require__(5286)})},705:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
__webpack_require__(4141)({target:"Set",proto:!0,real:!0,forced:!0},{deleteAll:__webpack_require__(1244)})},4261:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),getBuiltIn=__webpack_require__(6106),call=__webpack_require__(4250),aCallable=__webpack_require__(4017),anObject=__webpack_require__(3702),speciesConstructor=__webpack_require__(4897),iterate=__webpack_require__(3534)
$({target:"Set",proto:!0,real:!0,forced:!0},{difference:function(iterable){var set=anObject(this),newSet=new(speciesConstructor(set,getBuiltIn("Set")))(set),remover=aCallable(newSet.delete)
return iterate(iterable,(function(value){call(remover,newSet,value)})),newSet}})},9038:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),anObject=__webpack_require__(3702),bind=__webpack_require__(2902),getSetIterator=__webpack_require__(8897),iterate=__webpack_require__(3534)
$({target:"Set",proto:!0,real:!0,forced:!0},{every:function(callbackfn){var set=anObject(this),iterator=getSetIterator(set),boundFunction=bind(callbackfn,arguments.length>1?arguments[1]:void 0)
return!iterate(iterator,(function(value,stop){if(!boundFunction(value,value,set))return stop()}),{IS_ITERATOR:!0,INTERRUPTED:!0}).stopped}})},4371:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),getBuiltIn=__webpack_require__(6106),call=__webpack_require__(4250),aCallable=__webpack_require__(4017),anObject=__webpack_require__(3702),bind=__webpack_require__(2902),speciesConstructor=__webpack_require__(4897),getSetIterator=__webpack_require__(8897),iterate=__webpack_require__(3534)
$({target:"Set",proto:!0,real:!0,forced:!0},{filter:function(callbackfn){var set=anObject(this),iterator=getSetIterator(set),boundFunction=bind(callbackfn,arguments.length>1?arguments[1]:void 0),newSet=new(speciesConstructor(set,getBuiltIn("Set"))),adder=aCallable(newSet.add)
return iterate(iterator,(function(value){boundFunction(value,value,set)&&call(adder,newSet,value)}),{IS_ITERATOR:!0}),newSet}})},7735:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),anObject=__webpack_require__(3702),bind=__webpack_require__(2902),getSetIterator=__webpack_require__(8897),iterate=__webpack_require__(3534)
$({target:"Set",proto:!0,real:!0,forced:!0},{find:function(callbackfn){var set=anObject(this),iterator=getSetIterator(set),boundFunction=bind(callbackfn,arguments.length>1?arguments[1]:void 0)
return iterate(iterator,(function(value,stop){if(boundFunction(value,value,set))return stop(value)}),{IS_ITERATOR:!0,INTERRUPTED:!0}).result}})},3050:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),getBuiltIn=__webpack_require__(6106),call=__webpack_require__(4250),aCallable=__webpack_require__(4017),anObject=__webpack_require__(3702),speciesConstructor=__webpack_require__(4897),iterate=__webpack_require__(3534)
$({target:"Set",proto:!0,real:!0,forced:!0},{intersection:function(iterable){var set=anObject(this),newSet=new(speciesConstructor(set,getBuiltIn("Set"))),hasCheck=aCallable(set.has),adder=aCallable(newSet.add)
return iterate(iterable,(function(value){call(hasCheck,set,value)&&call(adder,newSet,value)})),newSet}})},6379:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),call=__webpack_require__(4250),aCallable=__webpack_require__(4017),anObject=__webpack_require__(3702),iterate=__webpack_require__(3534)
$({target:"Set",proto:!0,real:!0,forced:!0},{isDisjointFrom:function(iterable){var set=anObject(this),hasCheck=aCallable(set.has)
return!iterate(iterable,(function(value,stop){if(!0===call(hasCheck,set,value))return stop()}),{INTERRUPTED:!0}).stopped}})},2895:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),getBuiltIn=__webpack_require__(6106),call=__webpack_require__(4250),aCallable=__webpack_require__(4017),isCallable=__webpack_require__(3423),anObject=__webpack_require__(3702),getIterator=__webpack_require__(4646),iterate=__webpack_require__(3534)
$({target:"Set",proto:!0,real:!0,forced:!0},{isSubsetOf:function(iterable){var iterator=getIterator(this),otherSet=anObject(iterable),hasCheck=otherSet.has
return isCallable(hasCheck)||(otherSet=new(getBuiltIn("Set"))(iterable),hasCheck=aCallable(otherSet.has)),!iterate(iterator,(function(value,stop){if(!1===call(hasCheck,otherSet,value))return stop()}),{IS_ITERATOR:!0,INTERRUPTED:!0}).stopped}})},9189:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),call=__webpack_require__(4250),aCallable=__webpack_require__(4017),anObject=__webpack_require__(3702),iterate=__webpack_require__(3534)
$({target:"Set",proto:!0,real:!0,forced:!0},{isSupersetOf:function(iterable){var set=anObject(this),hasCheck=aCallable(set.has)
return!iterate(iterable,(function(value,stop){if(!1===call(hasCheck,set,value))return stop()}),{INTERRUPTED:!0}).stopped}})},6899:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),uncurryThis=__webpack_require__(1823),anObject=__webpack_require__(3702),toString=__webpack_require__(8855),getSetIterator=__webpack_require__(8897),iterate=__webpack_require__(3534),arrayJoin=uncurryThis([].join),push=[].push
$({target:"Set",proto:!0,real:!0,forced:!0},{join:function(separator){var set=anObject(this),iterator=getSetIterator(set),sep=void 0===separator?",":toString(separator),result=[]
return iterate(iterator,push,{that:result,IS_ITERATOR:!0}),arrayJoin(result,sep)}})},1090:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),getBuiltIn=__webpack_require__(6106),bind=__webpack_require__(2902),call=__webpack_require__(4250),aCallable=__webpack_require__(4017),anObject=__webpack_require__(3702),speciesConstructor=__webpack_require__(4897),getSetIterator=__webpack_require__(8897),iterate=__webpack_require__(3534)
$({target:"Set",proto:!0,real:!0,forced:!0},{map:function(callbackfn){var set=anObject(this),iterator=getSetIterator(set),boundFunction=bind(callbackfn,arguments.length>1?arguments[1]:void 0),newSet=new(speciesConstructor(set,getBuiltIn("Set"))),adder=aCallable(newSet.add)
return iterate(iterator,(function(value){call(adder,newSet,boundFunction(value,value,set))}),{IS_ITERATOR:!0}),newSet}})},264:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),aCallable=__webpack_require__(4017),anObject=__webpack_require__(3702),getSetIterator=__webpack_require__(8897),iterate=__webpack_require__(3534),$TypeError=TypeError
$({target:"Set",proto:!0,real:!0,forced:!0},{reduce:function(callbackfn){var set=anObject(this),iterator=getSetIterator(set),noInitial=arguments.length<2,accumulator=noInitial?void 0:arguments[1]
if(aCallable(callbackfn),iterate(iterator,(function(value){noInitial?(noInitial=!1,accumulator=value):accumulator=callbackfn(accumulator,value,value,set)}),{IS_ITERATOR:!0}),noInitial)throw $TypeError("Reduce of empty set with no initial value")
return accumulator}})},139:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),anObject=__webpack_require__(3702),bind=__webpack_require__(2902),getSetIterator=__webpack_require__(8897),iterate=__webpack_require__(3534)
$({target:"Set",proto:!0,real:!0,forced:!0},{some:function(callbackfn){var set=anObject(this),iterator=getSetIterator(set),boundFunction=bind(callbackfn,arguments.length>1?arguments[1]:void 0)
return iterate(iterator,(function(value,stop){if(boundFunction(value,value,set))return stop()}),{IS_ITERATOR:!0,INTERRUPTED:!0}).stopped}})},3035:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),getBuiltIn=__webpack_require__(6106),call=__webpack_require__(4250),aCallable=__webpack_require__(4017),anObject=__webpack_require__(3702),speciesConstructor=__webpack_require__(4897),iterate=__webpack_require__(3534)
$({target:"Set",proto:!0,real:!0,forced:!0},{symmetricDifference:function(iterable){var set=anObject(this),newSet=new(speciesConstructor(set,getBuiltIn("Set")))(set),remover=aCallable(newSet.delete),adder=aCallable(newSet.add)
return iterate(iterable,(function(value){call(remover,newSet,value)||call(adder,newSet,value)})),newSet}})},8760:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
var $=__webpack_require__(4141),getBuiltIn=__webpack_require__(6106),aCallable=__webpack_require__(4017),anObject=__webpack_require__(3702),speciesConstructor=__webpack_require__(4897),iterate=__webpack_require__(3534)
$({target:"Set",proto:!0,real:!0,forced:!0},{union:function(iterable){var set=anObject(this),newSet=new(speciesConstructor(set,getBuiltIn("Set")))(set)
return iterate(iterable,aCallable(newSet.add),{that:newSet}),newSet}})},4300:module=>{"use strict"
module.exports=require("buffer")},2081:module=>{"use strict"
module.exports=require("child_process")},6113:module=>{"use strict"
module.exports=require("crypto")},9523:module=>{"use strict"
module.exports=require("dns")},2361:module=>{"use strict"
module.exports=require("events")},7147:module=>{"use strict"
module.exports=require("fs")},3685:module=>{"use strict"
module.exports=require("http")},5687:module=>{"use strict"
module.exports=require("https")},1808:module=>{"use strict"
module.exports=require("net")},2037:module=>{"use strict"
module.exports=require("os")},1017:module=>{"use strict"
module.exports=require("path")},3477:module=>{"use strict"
module.exports=require("querystring")},2781:module=>{"use strict"
module.exports=require("stream")},1576:module=>{"use strict"
module.exports=require("string_decoder")},6224:module=>{"use strict"
module.exports=require("tty")},7310:module=>{"use strict"
module.exports=require("url")},3837:module=>{"use strict"
module.exports=require("util")},6144:module=>{"use strict"
module.exports=require("vm")},1267:module=>{"use strict"
module.exports=require("worker_threads")},9796:module=>{"use strict"
module.exports=require("zlib")},799:(__unused_webpack_module,exports,__webpack_require__)=>{"use strict"
function _interopNamespace(e){if(e&&e.__esModule)return e
var n=Object.create(null)
return e&&Object.keys(e).forEach((function(k){if("default"!==k){var d=Object.getOwnPropertyDescriptor(e,k)
Object.defineProperty(n,k,d.get?d:{enumerable:!0,get:function(){return e[k]}})}})),n.default=e,Object.freeze(n)}Object.defineProperty(exports,"__esModule",{value:!0})
var tty__namespace=_interopNamespace(__webpack_require__(6224))
const env=process.env||{},argv=process.argv||[],isDisabled="NO_COLOR"in env||argv.includes("--no-color"),isForced="FORCE_COLOR"in env||argv.includes("--color"),isWindows="win32"===process.platform,isCompatibleTerminal=tty__namespace&&tty__namespace.isatty&&tty__namespace.isatty(1)&&env.TERM&&"dumb"!==env.TERM,isColorSupported=!isDisabled&&(isForced||isWindows||isCompatibleTerminal||"CI"in env&&("GITHUB_ACTIONS"in env||"GITLAB_CI"in env||"CIRCLECI"in env)),replaceClose=(index,string,close,replace,head=string.substring(0,index)+replace,tail=string.substring(index+close.length),next=tail.indexOf(close))=>head+(next<0?tail:replaceClose(next,tail,close,replace)),filterEmpty=(open,close,replace=open,at=open.length+1)=>string=>string||""!==string&&void 0!==string?((index,string,open,close,replace)=>index<0?open+string+close:open+replaceClose(index,string,close,replace)+close)((""+string).indexOf(close,at),string,open,close,replace):"",init=(open,close,replace)=>filterEmpty(`[${open}m`,`[${close}m`,replace),colors={reset:init(0,0),bold:init(1,22,"[22m[1m"),dim:init(2,22,"[22m[2m"),italic:init(3,23),underline:init(4,24),inverse:init(7,27),hidden:init(8,28),strikethrough:init(9,29),black:init(30,39),red:init(31,39),green:init(32,39),yellow:init(33,39),blue:init(34,39),magenta:init(35,39),cyan:init(36,39),white:init(37,39),gray:init(90,39),bgBlack:init(40,49),bgRed:init(41,49),bgGreen:init(42,49),bgYellow:init(43,49),bgBlue:init(44,49),bgMagenta:init(45,49),bgCyan:init(46,49),bgWhite:init(47,49),blackBright:init(90,39),redBright:init(91,39),greenBright:init(92,39),yellowBright:init(93,39),blueBright:init(94,39),magentaBright:init(95,39),cyanBright:init(96,39),whiteBright:init(97,39),bgBlackBright:init(100,49),bgRedBright:init(101,49),bgGreenBright:init(102,49),bgYellowBright:init(103,49),bgBlueBright:init(104,49),bgMagentaBright:init(105,49),bgCyanBright:init(106,49),bgWhiteBright:init(107,49)},none=any=>any,createColors=({useColor=isColorSupported}={})=>useColor?colors:Object.keys(colors).reduce(((colors,key)=>({...colors,[key]:none})),{}),{reset,bold,dim,italic,underline,inverse,hidden,strikethrough,black,red,green,yellow,blue,magenta,cyan,white,gray,bgBlack,bgRed,bgGreen,bgYellow,bgBlue,bgMagenta,bgCyan,bgWhite,blackBright,redBright,greenBright,yellowBright,blueBright,magentaBright,cyanBright,whiteBright,bgBlackBright,bgRedBright,bgGreenBright,bgYellowBright,bgBlueBright,bgMagentaBright,bgCyanBright,bgWhiteBright}=createColors()
exports.bgBlack=bgBlack,exports.bgBlackBright=bgBlackBright,exports.bgBlue=bgBlue,exports.bgBlueBright=bgBlueBright,exports.bgCyan=bgCyan,exports.bgCyanBright=bgCyanBright,exports.bgGreen=bgGreen,exports.bgGreenBright=bgGreenBright,exports.bgMagenta=bgMagenta,exports.bgMagentaBright=bgMagentaBright,exports.bgRed=bgRed,exports.bgRedBright=bgRedBright,exports.bgWhite=bgWhite,exports.bgWhiteBright=bgWhiteBright,exports.bgYellow=bgYellow,exports.bgYellowBright=bgYellowBright,exports.black=black,exports.blackBright=blackBright,exports.blue=blue,exports.blueBright=blueBright,exports.bold=bold,exports.createColors=createColors,exports.cyan=cyan,exports.cyanBright=cyanBright,exports.dim=dim,exports.gray=gray,exports.green=green,exports.greenBright=greenBright,exports.hidden=hidden,exports.inverse=inverse,exports.isColorSupported=isColorSupported,exports.italic=italic,exports.magenta=magenta,exports.magentaBright=magentaBright,exports.red=red,exports.redBright=redBright,exports.reset=reset,exports.strikethrough=strikethrough,exports.underline=underline,exports.white=white,exports.whiteBright=whiteBright,exports.yellow=yellow,exports.yellowBright=yellowBright},1686:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const{isColorSupported}=__webpack_require__(799),pump=__webpack_require__(2181),{Transform}=__webpack_require__(8118),abstractTransport=__webpack_require__(2306),sjs=__webpack_require__(9316),colors=__webpack_require__(8202),{ERROR_LIKE_KEYS,MESSAGE_KEY,TIMESTAMP_KEY,LEVEL_KEY,LEVEL_NAMES}=__webpack_require__(484),{isObject,prettifyErrorLog,prettifyLevel,prettifyMessage,prettifyMetadata,prettifyObject,prettifyTime,buildSafeSonicBoom,filterLog}=__webpack_require__(6741),defaultOptions={colorize:isColorSupported,crlf:!1,errorLikeObjectKeys:ERROR_LIKE_KEYS,errorProps:"",customLevels:null,customColors:null,useOnlyCustomProps:!0,levelFirst:!1,messageKey:MESSAGE_KEY,messageFormat:!1,timestampKey:TIMESTAMP_KEY,translateTime:!1,useMetadata:!1,outputStream:process.stdout,customPrettifiers:{},hideObject:!1,singleLine:!1}
function prettyFactory(options){const opts=Object.assign({},defaultOptions,options),EOL=opts.crlf?"\r\n":"\n",messageKey=opts.messageKey,levelKey=opts.levelKey,levelLabel=opts.levelLabel,minimumLevel=opts.minimumLevel,messageFormat=opts.messageFormat,timestampKey=opts.timestampKey,errorLikeObjectKeys=opts.errorLikeObjectKeys,errorProps=opts.errorProps.split(","),useOnlyCustomProps="boolean"==typeof opts.useOnlyCustomProps?opts.useOnlyCustomProps:"true"===opts.useOnlyCustomProps,customLevels=opts.customLevels?opts.customLevels.split(",").reduce(((agg,value,idx)=>{const[levelName,levelIdx=idx]=value.split(":")
return agg[levelIdx]=levelName.toUpperCase(),agg}),{default:"USERLVL"}):{},customLevelNames=opts.customLevels?opts.customLevels.split(",").reduce(((agg,value,idx)=>{const[levelName,levelIdx=idx]=value.split(":")
return agg[levelName.toLowerCase()]=levelIdx,agg}),{}):{},customColors=opts.customColors?opts.customColors.split(",").reduce(((agg,value)=>{const[level,color]=value.split(":"),levelNum=(useOnlyCustomProps?opts.customLevels:void 0!==customLevelNames[level])?customLevelNames[level]:LEVEL_NAMES[level],colorIdx=void 0!==levelNum?levelNum:level
return agg.push([colorIdx,color]),agg}),[]):void 0,customProps={customLevels,customLevelNames}
useOnlyCustomProps&&!opts.customLevels&&(customProps.customLevels=void 0,customProps.customLevelNames=void 0)
const customPrettifiers=opts.customPrettifiers,ignoreKeys=opts.ignore?new Set(opts.ignore.split(",")):void 0,hideObject=opts.hideObject,singleLine=opts.singleLine,colorizer=colors(opts.colorize,customColors,useOnlyCustomProps)
return function(inputData){let log
if(isObject(inputData))log=inputData
else{const parsed=(input=>{try{return{value:sjs.parse(input,{protoAction:"remove"})}}catch(err){return{err}}})(inputData)
if(parsed.err||!isObject(parsed.value))return inputData+EOL
log=parsed.value}if(minimumLevel){const minimum=((useOnlyCustomProps?opts.customLevels:void 0!==customLevelNames[minimumLevel])?customLevelNames[minimumLevel]:LEVEL_NAMES[minimumLevel])||Number(minimumLevel)
if(log[void 0===levelKey?LEVEL_KEY:levelKey]<minimum)return}const prettifiedMessage=prettifyMessage({log,messageKey,colorizer,messageFormat,levelLabel,...customProps,useOnlyCustomProps})
ignoreKeys&&(log=filterLog(log,ignoreKeys))
const prettifiedLevel=prettifyLevel({log,colorizer,levelKey,prettifier:customPrettifiers.level,...customProps}),prettifiedMetadata=prettifyMetadata({log,prettifiers:customPrettifiers}),prettifiedTime=prettifyTime({log,translateFormat:opts.translateTime,timestampKey,prettifier:customPrettifiers.time})
let line=""
opts.levelFirst&&prettifiedLevel&&(line=`${prettifiedLevel}`)
prettifiedTime&&""===line?line=`${prettifiedTime}`:prettifiedTime&&(line=`${line} ${prettifiedTime}`)
!opts.levelFirst&&prettifiedLevel&&(line=line.length>0?`${line} ${prettifiedLevel}`:prettifiedLevel)
prettifiedMetadata&&(line=line.length>0?`${line} ${prettifiedMetadata}:`:prettifiedMetadata)
!1===line.endsWith(":")&&""!==line&&(line+=":")
prettifiedMessage&&(line=line.length>0?`${line} ${prettifiedMessage}`:prettifiedMessage)
line.length>0&&!singleLine&&(line+=EOL)
if("Error"===log.type&&log.stack){const prettifiedErrorLog=prettifyErrorLog({log,errorLikeKeys:errorLikeObjectKeys,errorProperties:errorProps,ident:"    ",eol:EOL})
singleLine&&(line+=EOL),line+=prettifiedErrorLog}else if(!hideObject){const skipKeys=[messageKey,levelKey,timestampKey].filter((key=>"string"==typeof log[key]||"number"==typeof log[key])),prettifiedObject=prettifyObject({input:log,skipKeys,customPrettifiers,errorLikeKeys:errorLikeObjectKeys,eol:EOL,ident:"    ",singleLine,colorizer})
singleLine&&!/^\s$/.test(prettifiedObject)&&(line+=" "),line+=prettifiedObject}return line}}function build(opts={}){const pretty=prettyFactory(opts)
return abstractTransport((function(source){const stream=new Transform({objectMode:!0,autoDestroy:!0,transform(chunk,enc,cb){cb(null,pretty(chunk))}})
let destination
return destination="object"==typeof opts.destination&&"function"==typeof opts.destination.write?opts.destination:buildSafeSonicBoom({dest:opts.destination||1,append:opts.append,mkdir:opts.mkdir,sync:opts.sync}),source.on("unknown",(function(line){destination.write(line+"\n")})),pump(source,stream,destination),stream}),{parse:"lines"})}module.exports=build,module.exports.prettyFactory=prettyFactory,module.exports.colorizerFactory=colors,module.exports.default=build},8202:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const{LEVELS,LEVEL_NAMES}=__webpack_require__(484),nocolor=input=>input,plain={default:nocolor,60:nocolor,50:nocolor,40:nocolor,30:nocolor,20:nocolor,10:nocolor,message:nocolor,greyMessage:nocolor},{createColors}=__webpack_require__(799),availableColors=createColors({useColor:!0}),{white,bgRed,red,yellow,green,blue,gray,cyan}=availableColors,colored={default:white,60:bgRed,50:red,40:yellow,30:green,20:blue,10:gray,message:cyan,greyMessage:gray}
function colorizeLevel(useOnlyCustomProps){return function(level,colorizer,{customLevels,customLevelNames}={}){const levels=useOnlyCustomProps?customLevels||LEVELS:Object.assign({},LEVELS,customLevels),levelNames=useOnlyCustomProps?customLevelNames||LEVEL_NAMES:Object.assign({},LEVEL_NAMES,customLevelNames)
let levelNum="default"
levelNum=Number.isInteger(+level)?Object.prototype.hasOwnProperty.call(levels,level)?level:levelNum:Object.prototype.hasOwnProperty.call(levelNames,level.toLowerCase())?levelNames[level.toLowerCase()]:levelNum
const levelStr=levels[levelNum]
return Object.prototype.hasOwnProperty.call(colorizer,levelNum)?colorizer[levelNum](levelStr):colorizer.default(levelStr)}}function customColoredColorizerFactory(customColors,useOnlyCustomProps){const onlyCustomColored=function(customColors){return customColors.reduce((function(agg,[level,color]){return agg[level]="function"==typeof availableColors[color]?availableColors[color]:white,agg}),{default:white,message:cyan,greyMessage:gray})}(customColors),customColored=useOnlyCustomProps?onlyCustomColored:Object.assign({},colored,onlyCustomColored),colorizeLevelCustom=colorizeLevel(useOnlyCustomProps),customColoredColorizer=function(level,opts){return colorizeLevelCustom(level,customColored,opts)}
return customColoredColorizer.message=customColoredColorizer.message||customColored.message,customColoredColorizer.greyMessage=customColoredColorizer.greyMessage||customColored.greyMessage,customColoredColorizer}module.exports=function(useColors=!1,customColors,useOnlyCustomProps){return useColors&&void 0!==customColors?customColoredColorizerFactory(customColors,useOnlyCustomProps):useColors?function(useOnlyCustomProps){const newColoredColorizer=colorizeLevel(useOnlyCustomProps),customColoredColorizer=function(level,opts){return newColoredColorizer(level,colored,opts)}
return customColoredColorizer.message=colored.message,customColoredColorizer.greyMessage=colored.greyMessage,customColoredColorizer}(useOnlyCustomProps):function(useOnlyCustomProps){const newPlainColorizer=colorizeLevel(useOnlyCustomProps),customColoredColorizer=function(level,opts){return newPlainColorizer(level,plain,opts)}
return customColoredColorizer.message=plain.message,customColoredColorizer.greyMessage=plain.greyMessage,customColoredColorizer}(useOnlyCustomProps)}},484:module=>{"use strict"
module.exports={DATE_FORMAT:"yyyy-mm-dd HH:MM:ss.l o",ERROR_LIKE_KEYS:["err","error"],MESSAGE_KEY:"msg",LEVEL_KEY:"level",LEVEL_LABEL:"levelLabel",TIMESTAMP_KEY:"time",LEVELS:{default:"USERLVL",60:"FATAL",50:"ERROR",40:"WARN",30:"INFO",20:"DEBUG",10:"TRACE"},LEVEL_NAMES:{fatal:60,error:50,warn:40,info:30,debug:20,trace:10},LOGGER_KEYS:["pid","hostname","name","level","time","timestamp","caller"]}},6741:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const clone=__webpack_require__(3268)({circles:!0}),dateformat=__webpack_require__(924),SonicBoom=__webpack_require__(6755),stringifySafe=__webpack_require__(2988),{isMainThread}=__webpack_require__(1267),defaultColorizer=__webpack_require__(8202)(),{DATE_FORMAT,ERROR_LIKE_KEYS,MESSAGE_KEY,LEVEL_KEY,LEVEL_LABEL,TIMESTAMP_KEY,LOGGER_KEYS,LEVELS}=__webpack_require__(484)
function formatTime(epoch,translateTime=!1){if(!1===translateTime)return epoch
const instant=createDate(epoch)
if(!isValidDate(instant))return epoch
if(!0===translateTime)return dateformat(instant,"UTC:"+DATE_FORMAT)
const upperFormat=translateTime.toUpperCase()
if("SYS:STANDARD"===upperFormat)return dateformat(instant,DATE_FORMAT)
const prefix=upperFormat.substr(0,4)
return dateformat(instant,"SYS:"===prefix||"UTC:"===prefix?"UTC:"===prefix?translateTime:translateTime.slice(4):`UTC:${translateTime}`)}function createDate(epoch){let date=new Date(epoch)
return isValidDate(date)||(date=new Date(+epoch)),date}function isValidDate(date){return date instanceof Date&&!Number.isNaN(date.getTime())}function isObject(input){return"[object Object]"===Object.prototype.toString.apply(input)}function joinLinesWithIndentation({input,ident="    ",eol="\n"}){const lines=input.split(/\r?\n/)
for(let i=1;i<lines.length;i+=1)lines[i]=ident+lines[i]
return lines.join(eol)}function prettifyObject({input,ident="    ",eol="\n",skipKeys=[],customPrettifiers={},errorLikeKeys=ERROR_LIKE_KEYS,excludeLoggerKeys=!0,singleLine=!1,colorizer=defaultColorizer}){const keysToIgnore=[].concat(skipKeys)
!0===excludeLoggerKeys&&Array.prototype.push.apply(keysToIgnore,LOGGER_KEYS)
let result=""
const{plain,errors}=Object.entries(input).reduce((({plain,errors},[k,v])=>{if(!1===keysToIgnore.includes(k)){const pretty="function"==typeof customPrettifiers[k]?customPrettifiers[k](v,k,input):v
errorLikeKeys.includes(k)?errors[k]=pretty:plain[k]=pretty}return{plain,errors}}),{plain:{},errors:{}})
return singleLine?(Object.keys(plain).length>0&&(result+=colorizer.greyMessage(stringifySafe(plain))),result+=eol):Object.entries(plain).forEach((([keyName,keyValue])=>{const lines="function"==typeof customPrettifiers[keyName]?keyValue:stringifySafe(keyValue,null,2)
if(void 0===lines)return
const joinedLines=joinLinesWithIndentation({input:lines,ident,eol})
result+=`${ident}${keyName}:${joinedLines.startsWith(eol)?"":" "}${joinedLines}${eol}`})),Object.entries(errors).forEach((([keyName,keyValue])=>{const lines="function"==typeof customPrettifiers[keyName]?keyValue:stringifySafe(keyValue,null,2)
void 0!==lines&&(result+=prettifyError({keyName,lines,eol,ident}))})),result}function prettifyError({keyName,lines,eol,ident}){let result=""
const splitLines=`${ident}${keyName}: ${joinLinesWithIndentation({input:lines,ident,eol})}${eol}`.split(eol)
for(let j=0;j<splitLines.length;j+=1){0!==j&&(result+=eol)
const line=splitLines[j]
if(/^\s*"stack"/.test(line)){const matches=/^(\s*"stack":)\s*(".*"),?$/.exec(line)
if(matches&&3===matches.length){const indentSize=/^\s*/.exec(line)[0].length+4,indentation=" ".repeat(indentSize),stackMessage=matches[2]
result+=matches[1]+eol+indentation+JSON.parse(stackMessage).replace(/\n/g,eol+indentation)}else result+=line}else result+=line}return result}function splitIgnoreKey(key){const result=[]
let backslash=!1,segment=""
for(let i=0;i<key.length;i++){const c=key.charAt(i)
"\\"!==c?backslash?(backslash=!1,segment+=c):"."!==c?segment+=c:(result.push(segment),segment=""):backslash=!0}return segment.length&&result.push(segment),result}function deleteLogProperty(log,property){const props=splitIgnoreKey(property),propToDelete=props.pop()
props.forEach((prop=>{Object.prototype.hasOwnProperty.call(log,prop)&&(log=log[prop])})),delete log[propToDelete]}function noop(){}function autoEnd(stream,eventName){stream.destroyed||("beforeExit"===eventName?(stream.flush(),stream.on("drain",(function(){stream.end()}))):stream.flushSync())}module.exports={isObject,prettifyErrorLog:function({log,messageKey=MESSAGE_KEY,ident="    ",eol="\n",errorLikeKeys=ERROR_LIKE_KEYS,errorProperties=[]}){const joinedLines=joinLinesWithIndentation({input:log.stack,ident,eol})
let result=`${ident}${joinedLines}${eol}`
if(errorProperties.length>0){const excludeProperties=LOGGER_KEYS.concat(messageKey,"type","stack")
let propertiesToPrint
propertiesToPrint="*"===errorProperties[0]?Object.keys(log).filter((k=>!1===excludeProperties.includes(k))):errorProperties.filter((k=>!1===excludeProperties.includes(k)))
for(let i=0;i<propertiesToPrint.length;i+=1){const key=propertiesToPrint[i]
if(key in log!=!1)if(isObject(log[key])){const prettifiedObject=prettifyObject({input:log[key],errorLikeKeys,excludeLoggerKeys:!1,eol,ident:ident+ident})
result=`${result}${ident}${key}: {${eol}${prettifiedObject}${ident}}${eol}`}else result=`${result}${ident}${key}: ${log[key]}${eol}`}}return result},prettifyLevel:function({log,colorizer=defaultColorizer,levelKey=LEVEL_KEY,prettifier,customLevels,customLevelNames}){if(levelKey in log==!1)return
const output=log[levelKey]
return prettifier?prettifier(output):colorizer(output,{customLevels,customLevelNames})},prettifyMessage:function({log,messageFormat,messageKey=MESSAGE_KEY,colorizer=defaultColorizer,levelLabel=LEVEL_LABEL,levelKey=LEVEL_KEY,customLevels,useOnlyCustomProps}){if(messageFormat&&"string"==typeof messageFormat){const message=String(messageFormat).replace(/{([^{}]+)}/g,(function(match,p1){if(p1===levelLabel&&log[levelKey]){return(useOnlyCustomProps?void 0===customLevels:void 0===customLevels[log[levelKey]])?LEVELS[log[levelKey]]:customLevels[log[levelKey]]}return p1.split(".").reduce((function(prev,curr){return prev&&prev[curr]?prev[curr]:""}),log)}))
return colorizer.message(message)}if(messageFormat&&"function"==typeof messageFormat){const msg=messageFormat(log,messageKey,levelLabel)
return colorizer.message(msg)}return messageKey in log==!1||"string"!=typeof log[messageKey]?void 0:colorizer.message(log[messageKey])},prettifyMetadata:function({log,prettifiers={}}){let line=""
if(log.name||log.pid||log.hostname){if(line+="(",log.name&&(line+=prettifiers.name?prettifiers.name(log.name):log.name),log.pid){const prettyPid=prettifiers.pid?prettifiers.pid(log.pid):log.pid
log.name&&log.pid?line+="/"+prettyPid:line+=prettyPid}log.hostname&&(line+=`${"("===line?"on":" on"} ${prettifiers.hostname?prettifiers.hostname(log.hostname):log.hostname}`),line+=")"}log.caller&&(line+=`${""===line?"":" "}<${prettifiers.caller?prettifiers.caller(log.caller):log.caller}>`)
return""===line?void 0:line},prettifyObject,prettifyTime:function({log,timestampKey=TIMESTAMP_KEY,translateFormat,prettifier}){let time=null
timestampKey in log?time=log[timestampKey]:"timestamp"in log&&(time=log.timestamp)
if(null===time)return
const output=translateFormat?formatTime(time,translateFormat):time
return prettifier?prettifier(output):`[${output}]`},buildSafeSonicBoom:function(opts){const stream=new SonicBoom(opts)
stream.on("error",(function filterBrokenPipe(err){if("EPIPE"===err.code)return stream.write=noop,stream.end=noop,stream.flushSync=noop,void(stream.destroy=noop)
stream.removeListener("error",filterBrokenPipe)})),!opts.sync&&isMainThread&&function(stream){if(global.WeakRef&&global.WeakMap&&global.FinalizationRegistry){const onExit=__webpack_require__(3538)
onExit.register(stream,autoEnd),stream.on("close",(function(){onExit.unregister(stream)}))}}(stream)
return stream},filterLog:function(log,ignoreKeys){const logCopy=clone(log)
return ignoreKeys.forEach((ignoreKey=>{deleteLogProperty(logCopy,ignoreKey)})),logCopy}},module.exports.internals={formatTime,joinLinesWithIndentation,prettifyError,deleteLogProperty,splitIgnoreKey,createDate,isValidDate}},6755:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict"
const fs=__webpack_require__(7147),EventEmitter=__webpack_require__(2361),inherits=__webpack_require__(3837).inherits,path=__webpack_require__(1017),sleep=__webpack_require__(160)
function openFile(file,sonic){function fileOpened(err,fd){if(err)return sonic._reopening=!1,sonic._writing=!1,sonic._opening=!1,void(sonic.sync?process.nextTick((()=>{sonic.listenerCount("error")>0&&sonic.emit("error",err)})):sonic.emit("error",err))
sonic.fd=fd,sonic.file=file,sonic._reopening=!1,sonic._opening=!1,sonic._writing=!1,sonic.sync?process.nextTick((()=>sonic.emit("ready"))):sonic.emit("ready"),sonic._reopening||!sonic._writing&&sonic._len>sonic.minLength&&!sonic.destroyed&&actualWrite(sonic)}sonic._opening=!0,sonic._writing=!0,sonic._asyncDrainScheduled=!1
const mode=sonic.append?"a":"w"
if(sonic.sync)try{sonic.mkdir&&fs.mkdirSync(path.dirname(file),{recursive:!0})
fileOpened(null,fs.openSync(file,mode))}catch(err){throw fileOpened(err),err}else sonic.mkdir?fs.mkdir(path.dirname(file),{recursive:!0},(err=>{if(err)return fileOpened(err)
fs.open(file,mode,fileOpened)})):fs.open(file,mode,fileOpened)}function SonicBoom(opts){if(!(this instanceof SonicBoom))return new SonicBoom(opts)
let{fd,dest,minLength,sync,append=!0,mkdir,retryEAGAIN}=opts||{}
if(fd=fd||dest,this._bufs=[],this._len=0,this.fd=-1,this._writing=!1,this._writingBuf="",this._ending=!1,this._reopening=!1,this._asyncDrainScheduled=!1,this._hwm=Math.max(minLength||0,16387),this.file=null,this.destroyed=!1,this.minLength=minLength||0,this.sync=sync||!1,this.append=append||!1,this.retryEAGAIN=retryEAGAIN||(()=>!0),this.mkdir=mkdir||!1,"number"==typeof fd)this.fd=fd,process.nextTick((()=>this.emit("ready")))
else{if("string"!=typeof fd)throw new Error("SonicBoom supports only file descriptors and files")
openFile(fd,this)}if(this.minLength>=16777216)throw new Error("minLength should be smaller than MAX_WRITE (16777216)")
this.release=(err,n)=>{if(err){if("EAGAIN"===err.code&&this.retryEAGAIN(err,this._writingBuf.length,this._len-this._writingBuf.length))if(this.sync)try{sleep(100),this.release(void 0,0)}catch(err){this.release(err)}else setTimeout((()=>{fs.write(this.fd,this._writingBuf,"utf8",this.release)}),100)
else this._writing=!1,this.emit("error",err)
return}if(this._len-=n,this._writingBuf=this._writingBuf.slice(n),this._writingBuf.length){if(!this.sync)return void fs.write(this.fd,this._writingBuf,"utf8",this.release)
try{do{const n=fs.writeSync(this.fd,this._writingBuf,"utf8")
this._len-=n,this._writingBuf=this._writingBuf.slice(n)}while(this._writingBuf)}catch(err){return void this.release(err)}}const len=this._len
this._reopening?(this._writing=!1,this._reopening=!1,this.reopen()):len>this.minLength?actualWrite(this):this._ending?len>0?actualWrite(this):(this._writing=!1,actualClose(this)):(this._writing=!1,this.sync?this._asyncDrainScheduled||(this._asyncDrainScheduled=!0,process.nextTick(emitDrain,this)):this.emit("drain"))},this.on("newListener",(function(name){"drain"===name&&(this._asyncDrainScheduled=!1)}))}function emitDrain(sonic){sonic.listenerCount("drain")>0&&(sonic._asyncDrainScheduled=!1,sonic.emit("drain"))}function actualWrite(sonic){const release=sonic.release
if(sonic._writing=!0,sonic._writingBuf=sonic._writingBuf||sonic._bufs.shift(),sonic.sync)try{release(null,fs.writeSync(sonic.fd,sonic._writingBuf,"utf8"))}catch(err){release(err)}else fs.write(sonic.fd,sonic._writingBuf,"utf8",release)}function actualClose(sonic){-1!==sonic.fd?(fs.close(sonic.fd,(err=>{err?sonic.emit("error",err):(sonic._ending&&!sonic._writing&&sonic.emit("finish"),sonic.emit("close"))})),sonic.destroyed=!0,sonic._bufs=[]):sonic.once("ready",actualClose.bind(null,sonic))}inherits(SonicBoom,EventEmitter),SonicBoom.prototype.write=function(data){if(this.destroyed)throw new Error("SonicBoom destroyed")
const len=this._len+data.length,bufs=this._bufs
return!this._writing&&len>16777216?bufs.push(data):0===bufs.length?bufs[0]=""+data:bufs[bufs.length-1]+=data,this._len=len,!this._writing&&this._len>=this.minLength&&actualWrite(this),this._len<this._hwm},SonicBoom.prototype.flush=function(){if(this.destroyed)throw new Error("SonicBoom destroyed")
this._writing||this.minLength<=0||(0===this._bufs.length&&this._bufs.push(""),actualWrite(this))},SonicBoom.prototype.reopen=function(file){if(this.destroyed)throw new Error("SonicBoom destroyed")
if(this._opening)return void this.once("ready",(()=>{this.reopen(file)}))
if(this._ending)return
if(!this.file)throw new Error("Unable to reopen a file descriptor, you must pass a file to SonicBoom")
if(this._reopening=!0,this._writing)return
const fd=this.fd
this.once("ready",(()=>{fd!==this.fd&&fs.close(fd,(err=>{if(err)return this.emit("error",err)}))})),openFile(file||this.file,this)},SonicBoom.prototype.end=function(){if(this.destroyed)throw new Error("SonicBoom destroyed")
this._opening?this.once("ready",(()=>{this.end()})):this._ending||(this._ending=!0,this._writing||(this._len>0&&this.fd>=0?actualWrite(this):actualClose(this)))},SonicBoom.prototype.flushSync=function(){if(this.destroyed)throw new Error("SonicBoom destroyed")
if(this.fd<0)throw new Error("sonic boom is not ready yet")
for(!this._writing&&this._writingBuf.length>0&&(this._bufs.unshift(this._writingBuf),this._writingBuf="");this._bufs.length;){const buf=this._bufs[0]
try{this._len-=fs.writeSync(this.fd,buf,"utf8"),this._bufs.shift()}catch(err){if("EAGAIN"!==err.code||!this.retryEAGAIN(err,buf.length,this._len-buf.length))throw err
sleep(100)}}},SonicBoom.prototype.destroy=function(){this.destroyed||actualClose(this)},SonicBoom.SonicBoom=SonicBoom,SonicBoom.default=SonicBoom,module.exports=SonicBoom},8002:module=>{"use strict"
module.exports=JSON.parse('{"name":"pino","version":"6.14.0","description":"super fast, all natural json logger","main":"pino.js","browser":"./browser.js","files":["pino.js","bin.js","browser.js","pretty.js","usage.txt","test","docs","example.js","lib"],"scripts":{"docs":"docsify serve","browser-test":"airtap --local 8080 test/browser*test.js","lint":"eslint .","test":"npm run lint && tap --100 test/*test.js test/*/*test.js","test-ci":"npm run lint && tap test/*test.js test/*/*test.js --coverage-report=lcovonly","cov-ui":"tap --coverage-report=html test/*test.js test/*/*test.js","bench":"node benchmarks/utils/runbench all","bench-basic":"node benchmarks/utils/runbench basic","bench-object":"node benchmarks/utils/runbench object","bench-deep-object":"node benchmarks/utils/runbench deep-object","bench-multi-arg":"node benchmarks/utils/runbench multi-arg","bench-longs-tring":"node benchmarks/utils/runbench long-string","bench-child":"node benchmarks/utils/runbench child","bench-child-child":"node benchmarks/utils/runbench child-child","bench-child-creation":"node benchmarks/utils/runbench child-creation","bench-formatters":"node benchmarks/utils/runbench formatters","update-bench-doc":"node benchmarks/utils/generate-benchmark-doc > docs/benchmarks.md"},"bin":{"pino":"./bin.js"},"precommit":"test","repository":{"type":"git","url":"git+https://github.com/pinojs/pino.git"},"keywords":["fast","logger","stream","json"],"author":"Matteo Collina <hello@matteocollina.com>","contributors":["David Mark Clements <huperekchuno@googlemail.com>","James Sumners <james.sumners@gmail.com>","Thomas Watson Steen <w@tson.dk> (https://twitter.com/wa7son)"],"license":"MIT","bugs":{"url":"https://github.com/pinojs/pino/issues"},"homepage":"http://getpino.io","devDependencies":{"airtap":"4.0.3","benchmark":"^2.1.4","bole":"^4.0.0","bunyan":"^1.8.14","docsify-cli":"^4.4.1","eslint":"^7.17.0","eslint-config-standard":"^16.0.2","eslint-plugin-import":"^2.22.1","eslint-plugin-node":"^11.1.0","eslint-plugin-promise":"^5.1.0","execa":"^5.0.0","fastbench":"^1.0.1","flush-write-stream":"^2.0.0","import-fresh":"^3.2.1","log":"^6.0.0","loglevel":"^1.6.7","pino-pretty":"^5.0.0","pre-commit":"^1.2.2","proxyquire":"^2.1.3","pump":"^3.0.0","semver":"^7.0.0","split2":"^3.1.1","steed":"^1.1.3","strip-ansi":"^6.0.0","tap":"^15.0.1","tape":"^5.0.0","through2":"^4.0.0","winston":"^3.3.3"},"dependencies":{"fast-redact":"^3.0.0","fast-safe-stringify":"^2.0.8","process-warning":"^1.0.0","flatstr":"^1.0.12","pino-std-serializers":"^3.1.0","quick-format-unescaped":"^4.0.3","sonic-boom":"^1.0.2"}}')},4147:module=>{"use strict"
module.exports=JSON.parse('{"name":"@unblockneteasemusic/server","version":"0.27.0-rc.6","description":"Revive unavailable songs for Netease Cloud Music","main":"src/provider/match.js","bin":{"unblockneteasemusic":"./precompiled/app.js"},"engines":{"node":">= 12"},"scripts":{"start:dev":"cross-env LOG_LEVEL=debug node src/app.js -e https://music.163.com","start":"cross-env node src/app.js -e https://music.163.com","build":"webpack","pkg":"pkg . --out-path=dist/","test":"jest"},"pkg":{"assets":["server.key","server.crt"],"targets":["node16-linux-arm64","node16-win-arm64","node16-linux-x64","node16-win-x64"],"outputPath":"dist"},"repository":{"type":"git","url":"https://github.com/UnblockNeteaseMusic/server.git"},"author":"nondanee, 1715173329, pan93412","license":"LGPL-3.0-only","dependencies":{"node-windows":"=1.0.0-beta.6","pino":"6.14.0","pino-pretty":"^7.6.1"},"devDependencies":{"@swc/core":"^1.2.218","@types/node":"^18.0.6","@types/pino":"6.3.12","browserslist":"^4.21.2","core-js":"^3.23.5","cross-env":"^7.0.3","jest":"^28.1.3","pkg":"^5.8.0","prettier":"^2.7.1","swc-loader":"^0.2.3","terser-webpack-plugin":"^5.3.3","typescript":"^4.7.4","webpack":"^5.73.0","webpack-cli":"^4.10.0"},"resolutions":{"minimist":"^1.2.6"},"publishConfig":{"access":"public"},"packageManager":"yarn@3.1.1"}')}},__webpack_module_cache__={}
function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId]
if(void 0!==cachedModule)return cachedModule.exports
var module=__webpack_module_cache__[moduleId]={exports:{}}
return __webpack_modules__[moduleId](module,module.exports,__webpack_require__),module.exports}(()=>{"use strict"
const packageJson=__webpack_require__(4147),config=__webpack_require__(5796).program({name:packageJson.name.replace(/@.+\//,""),version:packageJson.version}).option(["-v","--version"],{action:"version"}).option(["-p","--port"],{metavar:"port",help:"specify server port"}).option(["-a","--address"],{metavar:"address",help:"specify server host"}).option(["-u","--proxy-url"],{metavar:"url",help:"request through upstream proxy"}).option(["-f","--force-host"],{metavar:"host",help:"force the netease server ip"}).option(["-o","--match-order"],{metavar:"source",nargs:"+",help:"set priority of sources"}).option(["-t","--token"],{metavar:"token",help:"set up proxy authentication"}).option(["-e","--endpoint"],{metavar:"url",help:"replace virtual endpoint with public host"}).option(["-s","--strict"],{action:"store_true",help:"enable proxy limitation"}).option(["-c","--cnrelay"],{metavar:"cnrelay",help:"Mainland China relay to get music url"}).option(["-h","--help"],{action:"help"}).parse(process.argv)
global.address=config.address,config.port=(config.port||"8080:8081").split(":").map((string=>parseInt(string)))
if(config.port.some((value=>isNaN(value)||value<1||value>65535))&&(console.log("Port must be a number higher than 0 and lower than 65535."),process.exit(1)),config.proxyUrl&&!/http(s?):\/\/.+:\d+/.test(config.proxyUrl)&&(console.log("Please check the proxy url."),process.exit(1)),config.endpoint&&!/http(s?):\/\/.+/.test(config.endpoint)&&(console.log("Please check the endpoint host."),process.exit(1)),config.forceHost&&0===__webpack_require__(1808).isIP(config.forceHost)&&(console.log("Please check the server host."),process.exit(1)),config.matchOrder){const provider=Object.keys(__webpack_require__(1784).PROVIDERS),candidate=config.matchOrder
candidate.some(((key,index)=>index!=candidate.indexOf(key)))?(console.log("Please check the duplication in match order."),process.exit(1)):candidate.some((key=>!provider.includes(key)))&&(console.log("Please check the availability of match sources."),process.exit(1)),global.source=candidate}config.token&&!/\S+:\S+/.test(config.token)&&(console.log("Please check the authentication token."),process.exit(1))
const{logScope}=__webpack_require__(7691),parse=__webpack_require__(7310).parse,hook=__webpack_require__(403),server=__webpack_require__(8837),{CacheStorageGroup}=__webpack_require__(9220),logger=logScope("app"),target=Array.from(hook.target.host)
global.port=config.port,global.proxy=config.proxyUrl?parse(config.proxyUrl):null,global.hosts=target.reduce(((result,host)=>Object.assign(result,{[host]:config.forceHost})),{}),server.whitelist=["://[\\w.]*music\\.126\\.net","://[\\w.]*vod\\.126\\.net"],global.cnrelay=config.cnrelay,config.strict&&server.blacklist.push(".*"),server.authentication=config.token||null,global.endpoint=config.endpoint,config.endpoint&&server.whitelist.push(escape(config.endpoint))
const dnsSource="true"===process.env.ENABLE_HTTPDNS?[host=>__webpack_require__(5262)("POST","http://music.httpdns.c.163.com/d",{},host).then((response=>response.json())).then((jsonBody=>jsonBody.dns.reduce(((result,domain)=>result.concat(domain.ips)),[]))),host=>__webpack_require__(5262)("GET","http://httpdns.n.netease.com/httpdns/v2/d?domain="+host).then((response=>response.json())).then((jsonBody=>Object.keys(jsonBody.data).map((key=>jsonBody.data[key])).reduce(((result,value)=>result.concat(value.ip||[])),[])))]:[],csgInstance=CacheStorageGroup.getInstance()
setInterval((()=>{csgInstance.cleanup()}),9e5),Promise.all(dnsSource.map((query=>query(target.join(",")))).concat(target.map((host=>new Promise(((resolve,reject)=>__webpack_require__(9523).lookup(host,{all:!0},((error,records)=>error?reject(error):resolve(records.map((record=>record.address))))))))))).then((result=>{const{host}=hook.target
result.forEach((array=>array.forEach(host.add,host))),server.whitelist=server.whitelist.concat(Array.from(host).map(escape))
const log=type=>logger.info(`${["HTTP","HTTPS"][type]} Server running @ http://${address||"0.0.0.0"}:${port[type]}`)
port[0]&&server.http.listen(port[0],address).once("listening",(()=>log(0))),port[1]&&server.https.listen(port[1],address).once("listening",(()=>log(1))),cnrelay&&logger.info(`CNRelay: ${cnrelay}`)})).catch((error=>{console.log(error),process.exit(1)}))})()})()
