var $lEd20$net = require("net");
var $lEd20$url = require("url");
var $lEd20$dns = require("dns");
var $lEd20$path = require("path");
var $lEd20$zlib = require("zlib");
var $lEd20$http = require("http");
var $lEd20$https = require("https");
var $lEd20$events = require("events");
var $lEd20$os = require("os");
var $lEd20$vm = require("vm");
var $lEd20$fs = require("fs");
var $lEd20$util = require("util");
var $lEd20$tty = require("tty");
var $lEd20$stream = require("stream");
var $lEd20$buffer = require("buffer");
var $lEd20$string_decoder = require("string_decoder");
var $lEd20$crypto = require("crypto");
var $lEd20$querystring = require("querystring");
var $lEd20$child_process = require("child_process");

var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire307b"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire307b"] = parcelRequire;
}
var $b6b33101f84990b7$exports = {};
$b6b33101f84990b7$exports = JSON.parse("{\"name\":\"@unblockneteasemusic/server\",\"version\":\"v0.27.0-beta.8\",\"description\":\"Revive unavailable songs for Netease Cloud Music\",\"main\":\"src/provider/match.js\",\"bin\":{\"unblockneteasemusic\":\"./precompiled/app.js\"},\"targets\":{\"app\":{\"source\":\"./src/app.js\",\"distDir\":\"./precompiled\",\"includeNodeModules\":true,\"optimize\":false,\"sourceMap\":false,\"context\":\"node\"},\"bridge\":{\"source\":\"./src/bridge.js\",\"distDir\":\"./precompiled\",\"includeNodeModules\":true,\"optimize\":false,\"sourceMap\":false,\"context\":\"node\"}},\"engines\":{\"node\":\">= 12\"},\"scripts\":{\"build\":\"parcel build\",\"pkg\":\"pkg . --out-path=dist/\",\"test\":\"jest\"},\"pkg\":{\"assets\":[\"server.key\",\"server.crt\"],\"targets\":[\"node14-linux-arm64\",\"node14-win-arm64\",\"node14-linux-x64\",\"node14-win-x64\"],\"outputPath\":\"dist\"},\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/UnblockNeteaseMusic/server.git\"},\"author\":\"nondanee, 1715173329, pan93412\",\"license\":\"LGPL-3.0-only\",\"dependencies\":{\"node-windows\":\"^1.0.0-beta.6\"},\"devDependencies\":{\"@types/node\":\"^16.10.3\",\"@types/pino\":\"^6.3.11\",\"jest\":\"^27.2.5\",\"parcel\":\"^2.0.0\",\"pino\":\"~6.13.3\",\"pino-pretty\":\"^7.1.0\",\"pkg\":\"^5.3.3\",\"prettier\":\"^2.4.1\"},\"publishConfig\":{\"access\":\"public\"}}");


parcelRequire.register("lB4fA", function(module, exports) {

const $fb9059bbef231663$var$cli = {
    width: 80,
    _program: {
    },
    _options: [],
    program: (information = {
    })=>{
        $fb9059bbef231663$var$cli._program = information;
        return $fb9059bbef231663$var$cli;
    },
    option: (flags, addition = {
    })=>{
        // name or flags - Either a name or a list of option strings, e.g. foo or -f, --foo.
        // dest - The name of the attribute to be added to the object returned by parse_options().
        // nargs - The number of command-line arguments that should be consumed. // N, ?, *, +, REMAINDER
        // action - The basic type of action to be taken when this argument is encountered at the command line. // store, store_true, store_false, append, append_const, count, help, version
        // const - A constant value required by some action and nargs selections. (supporting store_const and append_const action)
        // metavar - A name for the argument in usage messages.
        // help - A brief description of what the argument does.
        // required - Whether the command-line option may be omitted (optionals only).
        // default - The value produced if the argument is absent from the command line.
        // type - The type to which the command-line argument should be converted.
        // choices - A container of the allowable values for the argument.
        flags = Array.isArray(flags) ? flags : [
            flags
        ];
        addition.dest = addition.dest || flags.slice(-1)[0].toLowerCase().replace(/^-+/, '').replace(/-[a-z]/g, (character)=>character.slice(1).toUpperCase()
        );
        addition.help = addition.help || ({
            help: 'output usage information',
            version: 'output the version number'
        })[addition.action];
        $fb9059bbef231663$var$cli._options.push(Object.assign(addition, {
            flags: flags,
            positional: !flags[0].startsWith('-')
        }));
        return $fb9059bbef231663$var$cli;
    },
    parse: (argv)=>{
        const positionals = $fb9059bbef231663$var$cli._options.map((option, index)=>option.positional ? index : null
        ).filter((index)=>index !== null
        ), optionals = {
        };
        $fb9059bbef231663$var$cli._options.forEach((option, index)=>option.positional ? null : option.flags.forEach((flag)=>optionals[flag] = index
            )
        );
        $fb9059bbef231663$var$cli._program.name = $fb9059bbef231663$var$cli._program.name || $lEd20$path.parse(argv[1]).base;
        const args = argv.slice(2).reduce((result, part)=>/^-[^-]/.test(part) ? result.concat(part.slice(1).split('').map((string)=>'-' + string
            )) : result.concat(part)
        , []);
        let pointer = 0;
        while(pointer < args.length){
            let value = null;
            const part = args[pointer];
            const index = part.startsWith('-') ? optionals[part] : positionals.shift();
            if (index === undefined) part.startsWith('-') ? $fb9059bbef231663$var$error(`no such option: ${part}`) : $fb9059bbef231663$var$error(`extra arguments found: ${part}`);
            if (part.startsWith('-')) pointer += 1;
            const { action: action  } = $fb9059bbef231663$var$cli._options[index];
            if ([
                'help',
                'version'
            ].includes(action)) {
                if (action === 'help') $fb9059bbef231663$var$help();
                else if (action === 'version') $fb9059bbef231663$var$version();
            } else if ([
                'store_true',
                'store_false'
            ].includes(action)) value = action === 'store_true';
            else {
                const gap = args.slice(pointer).findIndex((part)=>part in optionals
                );
                const next = gap === -1 ? args.length : pointer + gap;
                value = args.slice(pointer, next);
                if (value.length === 0) {
                    if ($fb9059bbef231663$var$cli._options[index].positional) $fb9059bbef231663$var$error(`the following arguments are required: ${part}`);
                    else if ($fb9059bbef231663$var$cli._options[index].nargs === '+') $fb9059bbef231663$var$error(`argument ${part}: expected at least one argument`);
                    else $fb9059bbef231663$var$error(`argument ${part}: expected one argument`);
                }
                if ($fb9059bbef231663$var$cli._options[index].nargs !== '+') {
                    value = value[0];
                    pointer += 1;
                } else pointer = next;
            }
            $fb9059bbef231663$var$cli[$fb9059bbef231663$var$cli._options[index].dest] = value;
        }
        if (positionals.length) $fb9059bbef231663$var$error(`the following arguments are required: ${positionals.map((index)=>$fb9059bbef231663$var$cli._options[index].flags[0]
        ).join(', ')}`);
        // cli._options.forEach(option => console.log(option.dest, cli[option.dest]))
        return $fb9059bbef231663$var$cli;
    }
};
const $fb9059bbef231663$var$pad = (length)=>new Array(length + 1).join(' ')
;
const $fb9059bbef231663$var$usage = ()=>{
    const options = $fb9059bbef231663$var$cli._options.map((option)=>{
        const flag = option.flags.sort((a, b)=>a.length - b.length
        )[0];
        const name = option.metavar || option.dest;
        if (option.positional) {
            if (option.nargs === '+') return `${name} [${name} ...]`;
            else return `${name}`;
        } else {
            if ([
                'store_true',
                'store_false',
                'help',
                'version'
            ].includes(option.action)) return `[${flag}]`;
            else if (option.nargs === '+') return `[${flag} ${name} [${name} ...]]`;
            else return `[${flag} ${name}]`;
        }
    });
    const maximum = $fb9059bbef231663$var$cli.width;
    const title = `usage: ${$fb9059bbef231663$var$cli._program.name}`;
    const lines = [
        title
    ];
    options.map((name)=>' ' + name
    ).forEach((option)=>{
        lines[lines.length - 1].length + option.length < maximum ? lines[lines.length - 1] += option : lines.push($fb9059bbef231663$var$pad(title.length) + option);
    });
    console.log(lines.join('\n'));
};
const $fb9059bbef231663$var$help = ()=>{
    $fb9059bbef231663$var$usage();
    const positionals = $fb9059bbef231663$var$cli._options.filter((option)=>option.positional
    ).map((option)=>[
            option.metavar || option.dest,
            option.help
        ]
    );
    const optionals = $fb9059bbef231663$var$cli._options.filter((option)=>!option.positional
    ).map((option)=>{
        const { flags: flags  } = option;
        const name = option.metavar || option.dest;
        /** @type {string} */ let use;
        if ([
            'store_true',
            'store_false',
            'help',
            'version'
        ].includes(option.action)) use = flags.map((flag)=>`${flag}`
        ).join(', ');
        else if (option.nargs === '+') use = flags.map((flag)=>`${flag} ${name} [${name} ...]`
        ).join(', ');
        else use = flags.map((flag)=>`${flag} ${name}`
        ).join(', ');
        return [
            use,
            option.help
        ];
    });
    let align = Math.max.apply(null, positionals.concat(optionals).map((option)=>option[0].length
    ));
    align = align > 30 ? 30 : align;
    const rest = $fb9059bbef231663$var$cli.width - align - 4;
    const publish = (option)=>{
        const slice = (string)=>Array.from(Array(Math.ceil(string.length / rest)).keys()).map((index)=>string.slice(index * rest, (index + 1) * rest)
            ).join('\n' + $fb9059bbef231663$var$pad(align + 4))
        ;
        option[0].length < align ? console.log(`  ${option[0]}${$fb9059bbef231663$var$pad(align - option[0].length)}  ${slice(option[1])}`) : console.log(`  ${option[0]}\n${$fb9059bbef231663$var$pad(align + 4)}${slice(option[1])}`);
    };
    if (positionals.length) console.log('\npositional arguments:');
    positionals.forEach(publish);
    if (optionals.length) console.log('\noptional arguments:');
    optionals.forEach(publish);
    process.exit();
};
const $fb9059bbef231663$var$version = ()=>{
    console.log($fb9059bbef231663$var$cli._program.version);
    process.exit();
};
const $fb9059bbef231663$var$error = (message)=>{
    $fb9059bbef231663$var$usage();
    console.log($fb9059bbef231663$var$cli._program.name + ':', 'error:', message);
    process.exit(1);
};
module.exports = $fb9059bbef231663$var$cli;

});


const $db593f7df22daf92$var$config = (parcelRequire("lB4fA")).program({
    name: $b6b33101f84990b7$exports.name.replace(/@.+\//, ''),
    version: $b6b33101f84990b7$exports.version
}).option([
    '-v',
    '--version'
], {
    action: 'version'
}).option([
    '-p',
    '--port'
], {
    metavar: 'port',
    help: 'specify server port'
}).option([
    '-a',
    '--address'
], {
    metavar: 'address',
    help: 'specify server host'
}).option([
    '-u',
    '--proxy-url'
], {
    metavar: 'url',
    help: 'request through upstream proxy'
}).option([
    '-f',
    '--force-host'
], {
    metavar: 'host',
    help: 'force the netease server ip'
}).option([
    '-o',
    '--match-order'
], {
    metavar: 'source',
    nargs: '+',
    help: 'set priority of sources'
}).option([
    '-t',
    '--token'
], {
    metavar: 'token',
    help: 'set up proxy authentication'
}).option([
    '-e',
    '--endpoint'
], {
    metavar: 'url',
    help: 'replace virtual endpoint with public host'
}).option([
    '-s',
    '--strict'
], {
    action: 'store_true',
    help: 'enable proxy limitation'
}).option([
    '-h',
    '--help'
], {
    action: 'help'
}).parse(process.argv);
$parcel$global.address = $db593f7df22daf92$var$config.address;
$db593f7df22daf92$var$config.port = ($db593f7df22daf92$var$config.port || '8080:8081').split(':').map((string)=>parseInt(string)
);
const $db593f7df22daf92$var$invalid = (value)=>isNaN(value) || value < 1 || value > 65535
;
if ($db593f7df22daf92$var$config.port.some($db593f7df22daf92$var$invalid)) {
    console.log('Port must be a number higher than 0 and lower than 65535.');
    process.exit(1);
}
if ($db593f7df22daf92$var$config.proxyUrl && !/http(s?):\/\/.+:\d+/.test($db593f7df22daf92$var$config.proxyUrl)) {
    console.log('Please check the proxy url.');
    process.exit(1);
}
if ($db593f7df22daf92$var$config.endpoint && !/http(s?):\/\/.+/.test($db593f7df22daf92$var$config.endpoint)) {
    console.log('Please check the endpoint host.');
    process.exit(1);
}

if ($db593f7df22daf92$var$config.forceHost && $lEd20$net.isIP($db593f7df22daf92$var$config.forceHost) === 0) {
    console.log('Please check the server host.');
    process.exit(1);
}
parcelRequire.register("i5OdV", function(module, exports) {
const $d2bfa6f66116f409$var$DEFAULT_SOURCE = [
    'kugou',
    'kuwo',
    'migu',
    'bilibili'
];










const $d2bfa6f66116f409$var$PROVIDERS = {
    qq: (parcelRequire("aFEGh")),
    kugou: (parcelRequire("a8HAq")),
    kuwo: (parcelRequire("4Ipub")),
    migu: (parcelRequire("2QiCb")),
    joox: (parcelRequire("2og7d")),
    youtube: (parcelRequire("4AswL")),
    ytdownload: (parcelRequire("bRnQ3")),
    youtubedl: (parcelRequire("6q0WV")),
    bilibili: (parcelRequire("8LdI1")),
    pyncmd: (parcelRequire("7mJOE"))
};
module.exports = {
    DEFAULT_SOURCE: $d2bfa6f66116f409$var$DEFAULT_SOURCE,
    PROVIDERS: $d2bfa6f66116f409$var$PROVIDERS
};

});
parcelRequire.register("aFEGh", function(module, exports) {

var $4JwHE = parcelRequire("4JwHE");

var $iQRVQ = parcelRequire("iQRVQ");

var $1wHCb = parcelRequire("1wHCb");

var $c3fn4 = parcelRequire("c3fn4");
var $7c4d4a1eb7cfb33b$require$getManagedCacheStorage = $c3fn4.getManagedCacheStorage;
const $7c4d4a1eb7cfb33b$var$headers = {
    origin: 'http://y.qq.com/',
    referer: 'http://y.qq.com/',
    cookie: process.env.QQ_COOKIE || null
};
const $7c4d4a1eb7cfb33b$var$format = (song)=>({
        id: {
            song: song.mid,
            file: song.file.media_mid
        },
        name: song.name,
        duration: song.interval * 1000,
        album: {
            id: song.album.mid,
            name: song.album.name
        },
        artists: song.singer.map(({ mid: mid , name: name  })=>({
                id: mid,
                name: name
            })
        )
    })
;
const $7c4d4a1eb7cfb33b$var$search = (info)=>{
    const url = "https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.center&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=20&w=" + encodeURIComponent(info.keyword) + '&' + 'g_tk=5381&jsonpCallback=MusicJsonCallback10005317669353331&loginUin=0&hostUin=0&' + 'format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0';
    return $1wHCb('GET', url).then((response)=>response.jsonp()
    ).then((jsonBody)=>{
        const list = jsonBody.data.song.list.map($7c4d4a1eb7cfb33b$var$format);
        const matched = $iQRVQ(list, info);
        return matched ? matched.id : Promise.reject();
    });
};
const $7c4d4a1eb7cfb33b$var$single = (id, format)=>{
    const uin = (($7c4d4a1eb7cfb33b$var$headers.cookie || '').match(/uin=(\d+)/) || [])[1] || '0';
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?data=' + encodeURIComponent(JSON.stringify({
        req_0: {
            module: 'vkey.GetVkeyServer',
            method: 'CgiGetVkey',
            param: {
                guid: (Math.random() * 10000000).toFixed(0),
                loginflag: 1,
                filename: [
                    format.join(id.file)
                ],
                songmid: [
                    id.song
                ],
                songtype: [
                    0
                ],
                uin: uin,
                platform: '20'
            }
        }
    }));
    return $1wHCb('GET', url, $7c4d4a1eb7cfb33b$var$headers).then((response)=>response.json()
    ).then((jsonBody)=>{
        const { sip: sip , midurlinfo: midurlinfo  } = jsonBody.req_0.data;
        return midurlinfo[0].purl ? sip[0] + midurlinfo[0].purl : Promise.reject();
    });
};
const $7c4d4a1eb7cfb33b$var$track = (id)=>{
    id.key = id.file;
    return Promise.all([
        [
            'F000',
            '.flac'
        ],
        [
            'M800',
            '.mp3'
        ],
        [
            'M500',
            '.mp3'
        ], 
    ].slice($7c4d4a1eb7cfb33b$var$headers.cookie || typeof window !== 'undefined' ? $iQRVQ.ENABLE_FLAC ? 0 : 1 : 2).map((format)=>$7c4d4a1eb7cfb33b$var$single(id, format).catch(()=>null
        )
    )).then((result)=>result.find((url)=>url
        ) || Promise.reject()
    ).catch(()=>$4JwHE().qq.track(id)
    );
};
const $7c4d4a1eb7cfb33b$var$cs = $7c4d4a1eb7cfb33b$require$getManagedCacheStorage('provider/qq');
const $7c4d4a1eb7cfb33b$var$check = (info)=>$7c4d4a1eb7cfb33b$var$cs.cache(info, ()=>$7c4d4a1eb7cfb33b$var$search(info)
    ).then($7c4d4a1eb7cfb33b$var$track)
;
module.exports = {
    check: $7c4d4a1eb7cfb33b$var$check,
    track: $7c4d4a1eb7cfb33b$var$track
};

});
parcelRequire.register("4JwHE", function(module, exports) {

var $1wHCb = parcelRequire("1wHCb");
const $3724bb8ea92eb195$var$host = null; // 'http://localhost:9000'
module.exports = ()=>{
    const proxy = new Proxy(()=>{
    }, {
        get: (target, property)=>{
            target.route = (target.route || []).concat(property);
            return proxy;
        },
        apply: (target, _, payload)=>{
            if (module.exports.disable || !$3724bb8ea92eb195$var$host) return Promise.reject();
            const path = target.route.join('/');
            const query = typeof payload[0] === 'object' ? JSON.stringify(payload[0]) : payload[0];
            // if (path != 'qq/ticket') return Promise.reject()
            return $1wHCb('GET', `${$3724bb8ea92eb195$var$host}/${path}?${encodeURIComponent(query)}`).then((response)=>response.body()
            );
        }
    });
    return proxy;
};

});
parcelRequire.register("1wHCb", function(module, exports) {




var $a0cGg = parcelRequire("a0cGg");

var $fnjLh = parcelRequire("fnjLh");

var $fRKJQ = parcelRequire("fRKJQ");
var $11ca9c95b42cce29$require$logScope = $fRKJQ.logScope;

var $11ca9c95b42cce29$require$parse = $lEd20$url.parse;

var $11ca9c95b42cce29$require$format = $lEd20$url.format;
const $11ca9c95b42cce29$var$logger = $11ca9c95b42cce29$require$logScope('request');
const $11ca9c95b42cce29$var$timeoutThreshold = 10000;
const $11ca9c95b42cce29$var$translate = (host)=>($parcel$global.hosts || {
    })[host] || host
;
const $11ca9c95b42cce29$var$create = (url, proxy)=>(((typeof proxy === 'undefined' ? $parcel$global.proxy : proxy) || url).protocol === 'https:' ? $lEd20$https : $lEd20$http).request
;
const $11ca9c95b42cce29$var$configure = (method, url, headers, proxy)=>{
    headers = headers || {
    };
    proxy = typeof proxy === 'undefined' ? $parcel$global.proxy : proxy;
    if ('content-length' in headers) delete headers['content-length'];
    const options = {
    };
    options._headers = headers;
    if (proxy && url.protocol === 'https:') {
        options.method = 'CONNECT';
        options.headers = Object.keys(headers).reduce((result, key)=>Object.assign(result, [
                'host',
                'user-agent'
            ].includes(key) && {
                [key]: headers[key]
            })
        , {
        });
    } else {
        options.method = method;
        options.headers = headers;
    }
    if (proxy) {
        options.hostname = $11ca9c95b42cce29$var$translate(proxy.hostname);
        options.port = proxy.port || (proxy.protocol === 'https:' ? 443 : 80);
        options.path = url.protocol === 'https:' ? $11ca9c95b42cce29$var$translate(url.hostname) + ':' + (url.port || 443) : 'http://' + $11ca9c95b42cce29$var$translate(url.hostname) + url.path;
    } else {
        options.hostname = $11ca9c95b42cce29$var$translate(url.hostname);
        options.port = url.port || (url.protocol === 'https:' ? 443 : 80);
        options.path = url.path;
    }
    return options;
};
/**
 * @typedef {((raw: true) => Promise<Buffer>) | ((raw: false) => Promise<string>)} RequestExtensionBody
 */ /**
 * @template T
 * @typedef {{url: string, body: RequestExtensionBody, json: () => Promise<T>, jsonp: () => Promise<T>}} RequestExtension
 */ /**
 * @template T
 * @param {string} method
 * @param {string} receivedUrl
 * @param {Object?} receivedHeaders
 * @param {unknown?} body
 * @param {unknown?} proxy
 * @param {CancelRequest?} cancelRequest
 * @return {Promise<http.IncomingMessage & RequestExtension<T>>}
 */ const $11ca9c95b42cce29$var$request = (method, receivedUrl, receivedHeaders, body, proxy, cancelRequest)=>{
    const url = $11ca9c95b42cce29$require$parse(receivedUrl);
    /* @type {Partial<Record<string,string>>} */ const headers = receivedHeaders || {
    };
    const options = $11ca9c95b42cce29$var$configure(method, url, {
        host: url.hostname,
        accept: 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'zh-CN,zh;q=0.9',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
        ...headers
    }, proxy);
    return new Promise((resolve, reject)=>{
        $11ca9c95b42cce29$var$logger.debug(`Start requesting ${receivedUrl}`);
        const clientRequest = $11ca9c95b42cce29$var$create(url, proxy)(options);
        const destroyClientRequest = function() {
            // We destroy the request and throw RequestCancelled
            // when the request has been cancelled.
            clientRequest.destroy(new $fnjLh($11ca9c95b42cce29$require$format(url)));
        };
        cancelRequest === null || cancelRequest === void 0 ? void 0 : cancelRequest.on($a0cGg, destroyClientRequest);
        var ref;
        if ((ref = cancelRequest === null || cancelRequest === void 0 ? void 0 : cancelRequest.cancelled) !== null && ref !== void 0 ? ref : false) destroyClientRequest();
        clientRequest.setTimeout($11ca9c95b42cce29$var$timeoutThreshold, ()=>{
            $11ca9c95b42cce29$var$logger.warn({
                url: $11ca9c95b42cce29$require$format(url)
            }, `The request timed out, or the requester didn't handle the response.`);
            destroyClientRequest();
        }).on('response', (response)=>resolve(response)
        ).on('connect', (_, socket)=>{
            $11ca9c95b42cce29$var$logger.debug('received CONNECT, continuing with https.request()...');
            $lEd20$https.request({
                method: method,
                path: url.path,
                headers: options._headers,
                socket: socket,
                agent: false
            }).on('response', (response)=>resolve(response)
            ).on('error', (error)=>reject(error)
            ).end(body);
        }).on('error', (error)=>reject(error)
        ).end(options.method.toUpperCase() === 'CONNECT' ? undefined : body);
    }).then(/** @param {http.IncomingMessage} response */ (response)=>{
        var ref;
        if ((ref = cancelRequest === null || cancelRequest === void 0 ? void 0 : cancelRequest.cancelled) !== null && ref !== void 0 ? ref : false) return Promise.reject(new $fnjLh($11ca9c95b42cce29$require$format(url)));
        if ([
            201,
            301,
            302,
            303,
            307,
            308
        ].includes(response.statusCode)) {
            const redirectTo = url.resolve(response.headers.location || url.href);
            $11ca9c95b42cce29$var$logger.debug(`Redirect to ${redirectTo}`);
            delete headers.host;
            return $11ca9c95b42cce29$var$request(method, redirectTo, headers, body, proxy);
        }
        return Object.assign(response, {
            url: url,
            body: (raw)=>$11ca9c95b42cce29$var$read(response, raw)
            ,
            json: ()=>$11ca9c95b42cce29$var$json(response)
            ,
            jsonp: ()=>$11ca9c95b42cce29$var$jsonp(response)
        });
    });
};
const $11ca9c95b42cce29$var$read = (connect, raw)=>new Promise((resolve, reject)=>{
        const chunks = [];
        connect.on('data', (chunk)=>chunks.push(chunk)
        ).on('end', ()=>resolve(Buffer.concat(chunks))
        ).on('error', (error)=>reject(error)
        );
    }).then((buffer)=>{
        buffer = buffer.length && [
            'gzip',
            'deflate'
        ].includes(connect.headers['content-encoding']) ? $lEd20$zlib.unzipSync(buffer) : buffer;
        return raw ? buffer : buffer.toString();
    })
;
const $11ca9c95b42cce29$var$json = (connect)=>$11ca9c95b42cce29$var$read(connect, false).then((body)=>JSON.parse(body)
    )
;
const $11ca9c95b42cce29$var$jsonp = (connect)=>$11ca9c95b42cce29$var$read(connect, false).then((body)=>JSON.parse(body.slice(body.indexOf('(') + 1, -1))
    )
;
$11ca9c95b42cce29$var$request.read = $11ca9c95b42cce29$var$read;
$11ca9c95b42cce29$var$request.create = $11ca9c95b42cce29$var$create;
$11ca9c95b42cce29$var$request.translate = $11ca9c95b42cce29$var$translate;
$11ca9c95b42cce29$var$request.configure = $11ca9c95b42cce29$var$configure;
module.exports = $11ca9c95b42cce29$var$request;

});
parcelRequire.register("a0cGg", function(module, exports) {

const $7483bd9d2775419b$var$ON_CANCEL = 'cancel';
class $7483bd9d2775419b$var$CancelRequest extends $lEd20$events {
    /** @type {boolean} */ cancelled = false;
    cancel() {
        this.cancelled = true;
        this.emit($7483bd9d2775419b$var$ON_CANCEL);
    }
}
module.exports = {
    CancelRequest: $7483bd9d2775419b$var$CancelRequest,
    ON_CANCEL: $7483bd9d2775419b$var$ON_CANCEL
};

});

parcelRequire.register("fnjLh", function(module, exports) {
class $b318554317b4c731$var$RequestCancelled extends Error {
    /**
	 * @param {string} url
	 */ constructor(url){
        super(`This request URL has been cancelled: ${url}`);
        this.name = 'RequestCancelled';
    }
}
module.exports = $b318554317b4c731$var$RequestCancelled;

});

parcelRequire.register("fRKJQ", function(module, exports) {

var $aVa1P = parcelRequire("aVa1P");
// The destination of the log file. Can be `undefined`.
const $b8d00f8afd4b3d31$var$destFile = process.env.LOG_FILE;
var _LOG_LEVEL;
const $b8d00f8afd4b3d31$var$logger = $aVa1P({
    level: (_LOG_LEVEL = process.env.LOG_LEVEL) !== null && _LOG_LEVEL !== void 0 ? _LOG_LEVEL : 'info',
    prettyPrint: process.env.JSON_LOG === 'true' ? false : {
        colorize: true,
        messageFormat: '\x1b[1m\x1b[32m({scope})\x1b[0m\x1b[36m {msg}',
        ignore: 'time,pid,hostname,scope',
        errorProps: '*'
    }
}, // Redirect the logs to destFile if specified.
$b8d00f8afd4b3d31$var$destFile && $aVa1P.destination($b8d00f8afd4b3d31$var$destFile));
/**
 * Add the scope of this log message.
 *
 * @param {string} scope The scope of this log message.
 * @return {pino.Logger}
 */ function $b8d00f8afd4b3d31$var$logScope(scope) {
    return $b8d00f8afd4b3d31$var$logger.child({
        scope: scope
    });
}
module.exports = {
    logger: $b8d00f8afd4b3d31$var$logger,
    logScope: $b8d00f8afd4b3d31$var$logScope
};

});
parcelRequire.register("aVa1P", function(module, exports) {
'use strict';


var $bMWaw = parcelRequire("bMWaw");

var $LRuFg = parcelRequire("LRuFg");

var $dcn7a = parcelRequire("dcn7a");

var $kdm8l = parcelRequire("kdm8l");

var $fsTK1 = parcelRequire("fsTK1");

var $4T7wh = parcelRequire("4T7wh");
var $7f3701b06beb6ed7$require$assertDefaultLevelFound = $4T7wh.assertDefaultLevelFound;
var $7f3701b06beb6ed7$require$mappings = $4T7wh.mappings;
var $7f3701b06beb6ed7$require$genLsCache = $4T7wh.genLsCache;

var $Fl55h = parcelRequire("Fl55h");
var $7f3701b06beb6ed7$require$createArgsNormalizer = $Fl55h.createArgsNormalizer;
var $7f3701b06beb6ed7$require$asChindings = $Fl55h.asChindings;
var $7f3701b06beb6ed7$require$final = $Fl55h.final;
var $7f3701b06beb6ed7$require$stringify = $Fl55h.stringify;
var $7f3701b06beb6ed7$require$buildSafeSonicBoom = $Fl55h.buildSafeSonicBoom;
var $7f3701b06beb6ed7$require$buildFormatters = $Fl55h.buildFormatters;
var $7f3701b06beb6ed7$require$noop = $Fl55h.noop;

var $2ylft = parcelRequire("2ylft");
var $7f3701b06beb6ed7$require$version = $2ylft.version;
const { chindingsSym: $7f3701b06beb6ed7$var$chindingsSym , redactFmtSym: $7f3701b06beb6ed7$var$redactFmtSym , serializersSym: $7f3701b06beb6ed7$var$serializersSym , timeSym: $7f3701b06beb6ed7$var$timeSym , timeSliceIndexSym: $7f3701b06beb6ed7$var$timeSliceIndexSym , streamSym: $7f3701b06beb6ed7$var$streamSym , stringifySym: $7f3701b06beb6ed7$var$stringifySym , stringifiersSym: $7f3701b06beb6ed7$var$stringifiersSym , setLevelSym: $7f3701b06beb6ed7$var$setLevelSym , endSym: $7f3701b06beb6ed7$var$endSym , formatOptsSym: $7f3701b06beb6ed7$var$formatOptsSym , messageKeySym: $7f3701b06beb6ed7$var$messageKeySym , nestedKeySym: $7f3701b06beb6ed7$var$nestedKeySym , mixinSym: $7f3701b06beb6ed7$var$mixinSym , useOnlyCustomLevelsSym: $7f3701b06beb6ed7$var$useOnlyCustomLevelsSym , formattersSym: $7f3701b06beb6ed7$var$formattersSym , hooksSym: $7f3701b06beb6ed7$var$hooksSym  } = $fsTK1;
const { epochTime: $7f3701b06beb6ed7$var$epochTime , nullTime: $7f3701b06beb6ed7$var$nullTime  } = $dcn7a;
const { pid: $7f3701b06beb6ed7$var$pid  } = process;
const $7f3701b06beb6ed7$var$hostname = $lEd20$os.hostname();
const $7f3701b06beb6ed7$var$defaultErrorSerializer = $bMWaw.err;
const $7f3701b06beb6ed7$var$defaultOptions = {
    level: 'info',
    messageKey: 'msg',
    nestedKey: null,
    enabled: true,
    prettyPrint: false,
    base: {
        pid: $7f3701b06beb6ed7$var$pid,
        hostname: $7f3701b06beb6ed7$var$hostname
    },
    serializers: Object.assign(Object.create(null), {
        err: $7f3701b06beb6ed7$var$defaultErrorSerializer
    }),
    formatters: Object.assign(Object.create(null), {
        bindings (bindings) {
            return bindings;
        },
        level (label, number) {
            return {
                level: number
            };
        }
    }),
    hooks: {
        logMethod: undefined
    },
    timestamp: $7f3701b06beb6ed7$var$epochTime,
    name: undefined,
    redact: null,
    customLevels: null,
    levelKey: undefined,
    useOnlyCustomLevels: false
};
const $7f3701b06beb6ed7$var$normalize = $7f3701b06beb6ed7$require$createArgsNormalizer($7f3701b06beb6ed7$var$defaultOptions);
const $7f3701b06beb6ed7$var$serializers = Object.assign(Object.create(null), $bMWaw);
function $7f3701b06beb6ed7$var$pino(...args) {
    const instance = {
    };
    const { opts: opts , stream: stream  } = $7f3701b06beb6ed7$var$normalize(instance, ...args);
    const { redact: redact , crlf: crlf , serializers: serializers , timestamp: timestamp , messageKey: messageKey , nestedKey: nestedKey , base: base , name: name , level: level , customLevels: customLevels , useLevelLabels: useLevelLabels , changeLevelName: changeLevelName , levelKey: levelKey , mixin: mixin , useOnlyCustomLevels: useOnlyCustomLevels , formatters: formatters , hooks: hooks  } = opts;
    const allFormatters = $7f3701b06beb6ed7$require$buildFormatters(formatters.level, formatters.bindings, formatters.log);
    if (useLevelLabels && !(changeLevelName || levelKey)) {
        process.emitWarning('useLevelLabels is deprecated, use the formatters.level option instead', 'Warning', 'PINODEP001');
        allFormatters.level = $7f3701b06beb6ed7$var$labelsFormatter;
    } else if ((changeLevelName || levelKey) && !useLevelLabels) {
        process.emitWarning('changeLevelName and levelKey are deprecated, use the formatters.level option instead', 'Warning', 'PINODEP002');
        allFormatters.level = $7f3701b06beb6ed7$var$levelNameFormatter(changeLevelName || levelKey);
    } else if ((changeLevelName || levelKey) && useLevelLabels) {
        process.emitWarning('useLevelLabels is deprecated, use the formatters.level option instead', 'Warning', 'PINODEP001');
        process.emitWarning('changeLevelName and levelKey are deprecated, use the formatters.level option instead', 'Warning', 'PINODEP002');
        allFormatters.level = $7f3701b06beb6ed7$var$levelNameLabelFormatter(changeLevelName || levelKey);
    }
    if (serializers[Symbol.for('pino.*')]) {
        process.emitWarning('The pino.* serializer is deprecated, use the formatters.log options instead', 'Warning', 'PINODEP003');
        allFormatters.log = serializers[Symbol.for('pino.*')];
    }
    if (!allFormatters.bindings) allFormatters.bindings = $7f3701b06beb6ed7$var$defaultOptions.formatters.bindings;
    if (!allFormatters.level) allFormatters.level = $7f3701b06beb6ed7$var$defaultOptions.formatters.level;
    const stringifiers = redact ? $LRuFg(redact, $7f3701b06beb6ed7$require$stringify) : {
    };
    const formatOpts = redact ? {
        stringify: stringifiers[$7f3701b06beb6ed7$var$redactFmtSym]
    } : {
        stringify: $7f3701b06beb6ed7$require$stringify
    };
    const end = '}' + (crlf ? '\r\n' : '\n');
    const coreChindings = $7f3701b06beb6ed7$require$asChindings.bind(null, {
        [$7f3701b06beb6ed7$var$chindingsSym]: '',
        [$7f3701b06beb6ed7$var$serializersSym]: serializers,
        [$7f3701b06beb6ed7$var$stringifiersSym]: stringifiers,
        [$7f3701b06beb6ed7$var$stringifySym]: $7f3701b06beb6ed7$require$stringify,
        [$7f3701b06beb6ed7$var$formattersSym]: allFormatters
    });
    let chindings = '';
    if (base !== null) {
        if (name === undefined) chindings = coreChindings(base);
        else chindings = coreChindings(Object.assign({
        }, base, {
            name: name
        }));
    }
    const time = timestamp instanceof Function ? timestamp : timestamp ? $7f3701b06beb6ed7$var$epochTime : $7f3701b06beb6ed7$var$nullTime;
    const timeSliceIndex = time().indexOf(':') + 1;
    if (useOnlyCustomLevels && !customLevels) throw Error('customLevels is required if useOnlyCustomLevels is set true');
    if (mixin && typeof mixin !== 'function') throw Error(`Unknown mixin type "${typeof mixin}" - expected "function"`);
    $7f3701b06beb6ed7$require$assertDefaultLevelFound(level, customLevels, useOnlyCustomLevels);
    const levels = $7f3701b06beb6ed7$require$mappings(customLevels, useOnlyCustomLevels);
    Object.assign(instance, {
        levels: levels,
        [$7f3701b06beb6ed7$var$useOnlyCustomLevelsSym]: useOnlyCustomLevels,
        [$7f3701b06beb6ed7$var$streamSym]: stream,
        [$7f3701b06beb6ed7$var$timeSym]: time,
        [$7f3701b06beb6ed7$var$timeSliceIndexSym]: timeSliceIndex,
        [$7f3701b06beb6ed7$var$stringifySym]: $7f3701b06beb6ed7$require$stringify,
        [$7f3701b06beb6ed7$var$stringifiersSym]: stringifiers,
        [$7f3701b06beb6ed7$var$endSym]: end,
        [$7f3701b06beb6ed7$var$formatOptsSym]: formatOpts,
        [$7f3701b06beb6ed7$var$messageKeySym]: messageKey,
        [$7f3701b06beb6ed7$var$nestedKeySym]: nestedKey,
        [$7f3701b06beb6ed7$var$serializersSym]: serializers,
        [$7f3701b06beb6ed7$var$mixinSym]: mixin,
        [$7f3701b06beb6ed7$var$chindingsSym]: chindings,
        [$7f3701b06beb6ed7$var$formattersSym]: allFormatters,
        [$7f3701b06beb6ed7$var$hooksSym]: hooks,
        silent: $7f3701b06beb6ed7$require$noop
    });
    Object.setPrototypeOf(instance, $kdm8l());
    $7f3701b06beb6ed7$require$genLsCache(instance);
    instance[$7f3701b06beb6ed7$var$setLevelSym](level);
    return instance;
}
function $7f3701b06beb6ed7$var$labelsFormatter(label, number) {
    return {
        level: label
    };
}
function $7f3701b06beb6ed7$var$levelNameFormatter(name) {
    return function(label, number) {
        return {
            [name]: number
        };
    };
}
function $7f3701b06beb6ed7$var$levelNameLabelFormatter(name) {
    return function(label, number) {
        return {
            [name]: label
        };
    };
}
module.exports = $7f3701b06beb6ed7$var$pino;
module.exports.extreme = (dest = process.stdout.fd)=>{
    process.emitWarning('The pino.extreme() option is deprecated and will be removed in v7. Use pino.destination({ sync: false }) instead.', {
        code: 'extreme_deprecation'
    });
    return $7f3701b06beb6ed7$require$buildSafeSonicBoom({
        dest: dest,
        minLength: 4096,
        sync: false
    });
};
module.exports.destination = (dest = process.stdout.fd)=>{
    if (typeof dest === 'object') {
        dest.dest = dest.dest || process.stdout.fd;
        return $7f3701b06beb6ed7$require$buildSafeSonicBoom(dest);
    } else return $7f3701b06beb6ed7$require$buildSafeSonicBoom({
        dest: dest,
        minLength: 0,
        sync: true
    });
};
module.exports.final = $7f3701b06beb6ed7$require$final;
module.exports.levels = $7f3701b06beb6ed7$require$mappings();
module.exports.stdSerializers = $7f3701b06beb6ed7$var$serializers;
module.exports.stdTimeFunctions = Object.assign({
}, $dcn7a);
module.exports.symbols = $fsTK1;
module.exports.version = $7f3701b06beb6ed7$require$version;
// Enables default and name export with TypeScript and Babel
module.exports.default = $7f3701b06beb6ed7$var$pino;
module.exports.pino = $7f3701b06beb6ed7$var$pino;

});
parcelRequire.register("bMWaw", function(module, exports) {
'use strict';

var $fkFXs = parcelRequire("fkFXs");

var $39f31 = parcelRequire("39f31");

var $i3Xko = parcelRequire("i3Xko");
module.exports = {
    err: $fkFXs,
    mapHttpRequest: $39f31.mapHttpRequest,
    mapHttpResponse: $i3Xko.mapHttpResponse,
    req: $39f31.reqSerializer,
    res: $i3Xko.resSerializer,
    wrapErrorSerializer: function wrapErrorSerializer(customSerializer) {
        if (customSerializer === $fkFXs) return customSerializer;
        return function wrapErrSerializer(err) {
            return customSerializer($fkFXs(err));
        };
    },
    wrapRequestSerializer: function wrapRequestSerializer(customSerializer) {
        if (customSerializer === $39f31.reqSerializer) return customSerializer;
        return function wrappedReqSerializer(req) {
            return customSerializer($39f31.reqSerializer(req));
        };
    },
    wrapResponseSerializer: function wrapResponseSerializer(customSerializer) {
        if (customSerializer === $i3Xko.resSerializer) return customSerializer;
        return function wrappedResSerializer(res) {
            return customSerializer($i3Xko.resSerializer(res));
        };
    }
};

});
parcelRequire.register("fkFXs", function(module, exports) {
'use strict';
module.exports = $b299454089fdbc6a$var$errSerializer;
const { toString: $b299454089fdbc6a$var$toString  } = Object.prototype;
const $b299454089fdbc6a$var$seen = Symbol('circular-ref-tag');
const $b299454089fdbc6a$var$rawSymbol = Symbol('pino-raw-err-ref');
const $b299454089fdbc6a$var$pinoErrProto = Object.create({
}, {
    type: {
        enumerable: true,
        writable: true,
        value: undefined
    },
    message: {
        enumerable: true,
        writable: true,
        value: undefined
    },
    stack: {
        enumerable: true,
        writable: true,
        value: undefined
    },
    raw: {
        enumerable: false,
        get: function() {
            return this[$b299454089fdbc6a$var$rawSymbol];
        },
        set: function(val) {
            this[$b299454089fdbc6a$var$rawSymbol] = val;
        }
    }
});
Object.defineProperty($b299454089fdbc6a$var$pinoErrProto, $b299454089fdbc6a$var$rawSymbol, {
    writable: true,
    value: {
    }
});
function $b299454089fdbc6a$var$errSerializer(err) {
    if (!(err instanceof Error)) return err;
    err[$b299454089fdbc6a$var$seen] = undefined // tag to prevent re-looking at this
    ;
    const _err = Object.create($b299454089fdbc6a$var$pinoErrProto);
    _err.type = $b299454089fdbc6a$var$toString.call(err.constructor) === '[object Function]' ? err.constructor.name : err.name;
    _err.message = err.message;
    _err.stack = err.stack;
    for(const key in err)if (_err[key] === undefined) {
        const val = err[key];
        if (val instanceof Error) /* eslint-disable no-prototype-builtins */ {
            if (!val.hasOwnProperty($b299454089fdbc6a$var$seen)) _err[key] = $b299454089fdbc6a$var$errSerializer(val);
        } else _err[key] = val;
    }
    delete err[$b299454089fdbc6a$var$seen] // clean up tag in case err is serialized again later
    ;
    _err.raw = err;
    return _err;
}

});

parcelRequire.register("39f31", function(module, exports) {
'use strict';
module.exports = {
    mapHttpRequest: $24ade282760c14b1$var$mapHttpRequest,
    reqSerializer: $24ade282760c14b1$var$reqSerializer
};
const $24ade282760c14b1$var$rawSymbol = Symbol('pino-raw-req-ref');
const $24ade282760c14b1$var$pinoReqProto = Object.create({
}, {
    id: {
        enumerable: true,
        writable: true,
        value: ''
    },
    method: {
        enumerable: true,
        writable: true,
        value: ''
    },
    url: {
        enumerable: true,
        writable: true,
        value: ''
    },
    query: {
        enumerable: true,
        writable: true,
        value: ''
    },
    params: {
        enumerable: true,
        writable: true,
        value: ''
    },
    headers: {
        enumerable: true,
        writable: true,
        value: {
        }
    },
    remoteAddress: {
        enumerable: true,
        writable: true,
        value: ''
    },
    remotePort: {
        enumerable: true,
        writable: true,
        value: ''
    },
    raw: {
        enumerable: false,
        get: function() {
            return this[$24ade282760c14b1$var$rawSymbol];
        },
        set: function(val) {
            this[$24ade282760c14b1$var$rawSymbol] = val;
        }
    }
});
Object.defineProperty($24ade282760c14b1$var$pinoReqProto, $24ade282760c14b1$var$rawSymbol, {
    writable: true,
    value: {
    }
});
function $24ade282760c14b1$var$reqSerializer(req) {
    // req.info is for hapi compat.
    const connection = req.info || req.socket;
    const _req = Object.create($24ade282760c14b1$var$pinoReqProto);
    _req.id = typeof req.id === 'function' ? req.id() : req.id || (req.info ? req.info.id : undefined);
    _req.method = req.method;
    // req.originalUrl is for expressjs compat.
    if (req.originalUrl) {
        _req.url = req.originalUrl;
        _req.query = req.query;
        _req.params = req.params;
    } else // req.url.path is  for hapi compat.
    _req.url = req.path || (req.url ? req.url.path || req.url : undefined);
    _req.headers = req.headers;
    _req.remoteAddress = connection && connection.remoteAddress;
    _req.remotePort = connection && connection.remotePort;
    // req.raw is  for hapi compat/equivalence
    _req.raw = req.raw || req;
    return _req;
}
function $24ade282760c14b1$var$mapHttpRequest(req) {
    return {
        req: $24ade282760c14b1$var$reqSerializer(req)
    };
}

});

parcelRequire.register("i3Xko", function(module, exports) {
'use strict';
module.exports = {
    mapHttpResponse: $d266871cc1712a99$var$mapHttpResponse,
    resSerializer: $d266871cc1712a99$var$resSerializer
};
const $d266871cc1712a99$var$rawSymbol = Symbol('pino-raw-res-ref');
const $d266871cc1712a99$var$pinoResProto = Object.create({
}, {
    statusCode: {
        enumerable: true,
        writable: true,
        value: 0
    },
    headers: {
        enumerable: true,
        writable: true,
        value: ''
    },
    raw: {
        enumerable: false,
        get: function() {
            return this[$d266871cc1712a99$var$rawSymbol];
        },
        set: function(val) {
            this[$d266871cc1712a99$var$rawSymbol] = val;
        }
    }
});
Object.defineProperty($d266871cc1712a99$var$pinoResProto, $d266871cc1712a99$var$rawSymbol, {
    writable: true,
    value: {
    }
});
function $d266871cc1712a99$var$resSerializer(res) {
    const _res = Object.create($d266871cc1712a99$var$pinoResProto);
    _res.statusCode = res.statusCode;
    _res.headers = res.getHeaders ? res.getHeaders() : res._headers;
    _res.raw = res;
    return _res;
}
function $d266871cc1712a99$var$mapHttpResponse(res) {
    return {
        res: $d266871cc1712a99$var$resSerializer(res)
    };
}

});


parcelRequire.register("LRuFg", function(module, exports) {
'use strict';

var $1TT0j = parcelRequire("1TT0j");

var $fsTK1 = parcelRequire("fsTK1");
var $08fde29d12c23e95$require$redactFmtSym = $fsTK1.redactFmtSym;
var $08fde29d12c23e95$require$wildcardFirstSym = $fsTK1.wildcardFirstSym;
const { rx: $08fde29d12c23e95$var$rx , validator: $08fde29d12c23e95$var$validator  } = $1TT0j;
const $08fde29d12c23e95$var$validate = $08fde29d12c23e95$var$validator({
    ERR_PATHS_MUST_BE_STRINGS: ()=>'pino – redacted paths must be strings'
    ,
    ERR_INVALID_PATH: (s)=>`pino – redact paths array contains an invalid path (${s})`
});
const $08fde29d12c23e95$var$CENSOR = '[Redacted]';
const $08fde29d12c23e95$var$strict = false // TODO should this be configurable?
;
function $08fde29d12c23e95$var$redaction(opts, serialize) {
    const { paths: paths , censor: censor  } = $08fde29d12c23e95$var$handle(opts);
    const shape = paths.reduce((o, str)=>{
        $08fde29d12c23e95$var$rx.lastIndex = 0;
        const first = $08fde29d12c23e95$var$rx.exec(str);
        const next = $08fde29d12c23e95$var$rx.exec(str);
        // ns is the top-level path segment, brackets + quoting removed.
        let ns = first[1] !== undefined ? first[1].replace(/^(?:"|'|`)(.*)(?:"|'|`)$/, '$1') : first[0];
        if (ns === '*') ns = $08fde29d12c23e95$require$wildcardFirstSym;
        // top level key:
        if (next === null) {
            o[ns] = null;
            return o;
        }
        // path with at least two segments:
        // if ns is already redacted at the top level, ignore lower level redactions
        if (o[ns] === null) return o;
        const { index: index  } = next;
        const nextPath = `${str.substr(index, str.length - 1)}`;
        o[ns] = o[ns] || [];
        // shape is a mix of paths beginning with literal values and wildcard
        // paths [ "a.b.c", "*.b.z" ] should reduce to a shape of
        // { "a": [ "b.c", "b.z" ], *: [ "b.z" ] }
        // note: "b.z" is in both "a" and * arrays because "a" matches the wildcard.
        // (* entry has wildcardFirstSym as key)
        if (ns !== $08fde29d12c23e95$require$wildcardFirstSym && o[ns].length === 0) // first time ns's get all '*' redactions so far
        o[ns].push(...o[$08fde29d12c23e95$require$wildcardFirstSym] || []);
        if (ns === $08fde29d12c23e95$require$wildcardFirstSym) // new * path gets added to all previously registered literal ns's.
        Object.keys(o).forEach(function(k) {
            if (o[k]) o[k].push(nextPath);
        });
        o[ns].push(nextPath);
        return o;
    }, {
    });
    // the redactor assigned to the format symbol key
    // provides top level redaction for instances where
    // an object is interpolated into the msg string
    const result = {
        [$08fde29d12c23e95$require$redactFmtSym]: $1TT0j({
            paths: paths,
            censor: censor,
            serialize: serialize,
            strict: $08fde29d12c23e95$var$strict
        })
    };
    const topCensor = (...args)=>{
        return typeof censor === 'function' ? serialize(censor(...args)) : serialize(censor);
    };
    return [
        ...Object.keys(shape),
        ...Object.getOwnPropertySymbols(shape)
    ].reduce((o, k)=>{
        // top level key:
        if (shape[k] === null) o[k] = (value)=>topCensor(value, [
                k
            ])
        ;
        else {
            const wrappedCensor = typeof censor === 'function' ? (value, path)=>{
                return censor(value, [
                    k,
                    ...path
                ]);
            } : censor;
            o[k] = $1TT0j({
                paths: shape[k],
                censor: wrappedCensor,
                serialize: serialize,
                strict: $08fde29d12c23e95$var$strict
            });
        }
        return o;
    }, result);
}
function $08fde29d12c23e95$var$handle(opts) {
    if (Array.isArray(opts)) {
        opts = {
            paths: opts,
            censor: $08fde29d12c23e95$var$CENSOR
        };
        $08fde29d12c23e95$var$validate(opts);
        return opts;
    }
    let { paths: paths , censor: censor = $08fde29d12c23e95$var$CENSOR , remove: remove  } = opts;
    if (Array.isArray(paths) === false) throw Error('pino – redact must contain an array of strings');
    if (remove === true) censor = undefined;
    $08fde29d12c23e95$var$validate({
        paths: paths,
        censor: censor
    });
    return {
        paths: paths,
        censor: censor
    };
}
module.exports = $08fde29d12c23e95$var$redaction;

});
parcelRequire.register("1TT0j", function(module, exports) {
'use strict';

var $6sQNW = parcelRequire("6sQNW");

var $e1qHb = parcelRequire("e1qHb");

var $70ICF = parcelRequire("70ICF");

var $hGcHP = parcelRequire("hGcHP");

var $F0KpW = parcelRequire("F0KpW");
var $162598226ead389c$require$groupRedact = $F0KpW.groupRedact;
var $162598226ead389c$require$nestedRedact = $F0KpW.nestedRedact;

var $1Jo10 = parcelRequire("1Jo10");

var $iNqQu = parcelRequire("iNqQu");
const $162598226ead389c$var$validate = $6sQNW();
const $162598226ead389c$var$noop = (o)=>o
;
$162598226ead389c$var$noop.restore = $162598226ead389c$var$noop;
const $162598226ead389c$var$DEFAULT_CENSOR = '[REDACTED]';
$162598226ead389c$var$fastRedact.rx = $iNqQu;
$162598226ead389c$var$fastRedact.validator = $6sQNW;
module.exports = $162598226ead389c$var$fastRedact;
function $162598226ead389c$var$fastRedact(opts = {
}) {
    const paths = Array.from(new Set(opts.paths || []));
    const serialize = 'serialize' in opts ? opts.serialize === false ? opts.serialize : typeof opts.serialize === 'function' ? opts.serialize : JSON.stringify : JSON.stringify;
    const remove = opts.remove;
    if (remove === true && serialize !== JSON.stringify) throw Error('fast-redact – remove option may only be set when serializer is JSON.stringify');
    const censor = remove === true ? undefined : 'censor' in opts ? opts.censor : $162598226ead389c$var$DEFAULT_CENSOR;
    const isCensorFct = typeof censor === 'function';
    const censorFctTakesPath = isCensorFct && censor.length > 1;
    if (paths.length === 0) return serialize || $162598226ead389c$var$noop;
    $162598226ead389c$var$validate({
        paths: paths,
        serialize: serialize,
        censor: censor
    });
    const { wildcards: wildcards , wcLen: wcLen , secret: secret  } = $e1qHb({
        paths: paths,
        censor: censor
    });
    const compileRestore = $hGcHP({
        secret: secret,
        wcLen: wcLen
    });
    const strict = 'strict' in opts ? opts.strict : true;
    return $70ICF({
        secret: secret,
        wcLen: wcLen,
        serialize: serialize,
        strict: strict,
        isCensorFct: isCensorFct,
        censorFctTakesPath: censorFctTakesPath
    }, $1Jo10({
        secret: secret,
        censor: censor,
        compileRestore: compileRestore,
        serialize: serialize,
        groupRedact: $162598226ead389c$require$groupRedact,
        nestedRedact: $162598226ead389c$require$nestedRedact,
        wildcards: wildcards,
        wcLen: wcLen
    }));
}

});
parcelRequire.register("6sQNW", function(module, exports) {
'use strict';

var $4b4e51795b589c73$require$createContext = $lEd20$vm.createContext;
var $4b4e51795b589c73$require$runInContext = $lEd20$vm.runInContext;
module.exports = $4b4e51795b589c73$var$validator;
function $4b4e51795b589c73$var$validator(opts = {
}) {
    const { ERR_PATHS_MUST_BE_STRINGS: ERR_PATHS_MUST_BE_STRINGS = ()=>'fast-redact - Paths must be (non-empty) strings'
     , ERR_INVALID_PATH: ERR_INVALID_PATH = (s)=>`fast-redact – Invalid path (${s})`
      } = opts;
    return function validate({ paths: paths  }) {
        paths.forEach((s)=>{
            if (typeof s !== 'string') throw Error(ERR_PATHS_MUST_BE_STRINGS());
            try {
                if (/〇/.test(s)) throw Error();
                const proxy = new Proxy({
                }, {
                    get: ()=>proxy
                    ,
                    set: ()=>{
                        throw Error();
                    }
                });
                const expr = (s[0] === '[' ? '' : '.') + s.replace(/^\*/, '〇').replace(/\.\*/g, '.〇').replace(/\[\*\]/g, '[〇]');
                if (/\n|\r|;/.test(expr)) throw Error();
                if (/\/\*/.test(expr)) throw Error();
                $4b4e51795b589c73$require$runInContext(`
          (function () {
            'use strict'
            o${expr}
            if ([o${expr}].length !== 1) throw Error()
          })()
        `, $4b4e51795b589c73$require$createContext({
                    o: proxy,
                    〇: null
                }), {
                    codeGeneration: {
                        strings: false,
                        wasm: false
                    }
                });
            } catch (e) {
                throw Error(ERR_INVALID_PATH(s));
            }
        });
    };
}

});

parcelRequire.register("e1qHb", function(module, exports) {
'use strict';

var $iNqQu = parcelRequire("iNqQu");
module.exports = $a355ddd5e5aa459f$var$parse;
function $a355ddd5e5aa459f$var$parse({ paths: paths  }) {
    const wildcards = [];
    var wcLen = 0;
    const secret = paths.reduce(function(o, strPath, ix) {
        var path = strPath.match($iNqQu).map((p)=>p.replace(/'|"|`/g, '')
        );
        const leadingBracket = strPath[0] === '[';
        path = path.map((p)=>{
            if (p[0] === '[') return p.substr(1, p.length - 2);
            else return p;
        });
        const star = path.indexOf('*');
        if (star > -1) {
            const before = path.slice(0, star);
            const beforeStr = before.join('.');
            const after = path.slice(star + 1, path.length);
            if (after.indexOf('*') > -1) throw Error('fast-redact – Only one wildcard per path is supported');
            const nested = after.length > 0;
            wcLen++;
            wildcards.push({
                before: before,
                beforeStr: beforeStr,
                after: after,
                nested: nested
            });
        } else o[strPath] = {
            path: path,
            val: undefined,
            precensored: false,
            circle: '',
            escPath: JSON.stringify(strPath),
            leadingBracket: leadingBracket
        };
        return o;
    }, {
    });
    return {
        wildcards: wildcards,
        wcLen: wcLen,
        secret: secret
    };
}

});
parcelRequire.register("iNqQu", function(module, exports) {
'use strict';
module.exports = /[^.[\]]+|\[((?:.)*?)\]/g /*
Regular expression explanation:

Alt 1: /[^.[\]]+/ - Match one or more characters that are *not* a dot (.)
                    opening square bracket ([) or closing square bracket (])

Alt 2: /\[((?:.)*?)\]/ - If the char IS dot or square bracket, then create a capture
                         group (which will be capture group $1) that matches anything
                         within square brackets. Expansion is lazy so it will
                         stop matching as soon as the first closing bracket is met `]`
                         (rather than continuing to match until the final closing bracket).
*/ ;

});


parcelRequire.register("70ICF", function(module, exports) {
'use strict';

var $iNqQu = parcelRequire("iNqQu");
module.exports = $51ab259bf0c25ec0$var$redactor;
function $51ab259bf0c25ec0$var$redactor({ secret: secret , serialize: serialize , wcLen: wcLen , strict: strict , isCensorFct: isCensorFct , censorFctTakesPath: censorFctTakesPath  }, state) {
    /* eslint-disable-next-line */ const redact = Function('o', `
    if (typeof o !== 'object' || o == null) {
      ${$51ab259bf0c25ec0$var$strictImpl(strict, serialize)}
    }
    const { censor, secret } = this
    ${$51ab259bf0c25ec0$var$redactTmpl(secret, isCensorFct, censorFctTakesPath)}
    this.compileRestore()
    ${$51ab259bf0c25ec0$var$dynamicRedactTmpl(wcLen > 0, isCensorFct, censorFctTakesPath)}
    ${$51ab259bf0c25ec0$var$resultTmpl(serialize)}
  `).bind(state);
    if (serialize === false) redact.restore = (o)=>state.restore(o)
    ;
    return redact;
}
function $51ab259bf0c25ec0$var$redactTmpl(secret, isCensorFct, censorFctTakesPath) {
    return Object.keys(secret).map((path)=>{
        const { escPath: escPath , leadingBracket: leadingBracket , path: arrPath  } = secret[path];
        const skip = leadingBracket ? 1 : 0;
        const delim = leadingBracket ? '' : '.';
        const hops = [];
        var match;
        while((match = $iNqQu.exec(path)) !== null){
            const [, ix] = match;
            const { index: index , input: input  } = match;
            if (index > skip) hops.push(input.substring(0, index - (ix ? 0 : 1)));
        }
        var existence = hops.map((p)=>`o${delim}${p}`
        ).join(' && ');
        if (existence.length === 0) existence += `o${delim}${path} != null`;
        else existence += ` && o${delim}${path} != null`;
        const circularDetection = `
      switch (true) {
        ${hops.reverse().map((p)=>`
          case o${delim}${p} === censor:
            secret[${escPath}].circle = ${JSON.stringify(p)}
            break
        `
        ).join('\n')}
      }
    `;
        const censorArgs = censorFctTakesPath ? `val, ${JSON.stringify(arrPath)}` : `val`;
        return `
      if (${existence}) {
        const val = o${delim}${path}
        if (val === censor) {
          secret[${escPath}].precensored = true
        } else {
          secret[${escPath}].val = val
          o${delim}${path} = ${isCensorFct ? `censor(${censorArgs})` : 'censor'}
          ${circularDetection}
        }
      }
    `;
    }).join('\n');
}
function $51ab259bf0c25ec0$var$dynamicRedactTmpl(hasWildcards, isCensorFct, censorFctTakesPath) {
    return hasWildcards === true ? `
    {
      const { wildcards, wcLen, groupRedact, nestedRedact } = this
      for (var i = 0; i < wcLen; i++) {
        const { before, beforeStr, after, nested } = wildcards[i]
        if (nested === true) {
          secret[beforeStr] = secret[beforeStr] || []
          nestedRedact(secret[beforeStr], o, before, after, censor, ${isCensorFct}, ${censorFctTakesPath})
        } else secret[beforeStr] = groupRedact(o, before, censor, ${isCensorFct}, ${censorFctTakesPath})
      }
    }
  ` : '';
}
function $51ab259bf0c25ec0$var$resultTmpl(serialize) {
    return serialize === false ? `return o` : `
    var s = this.serialize(o)
    this.restore(o)
    return s
  `;
}
function $51ab259bf0c25ec0$var$strictImpl(strict, serialize) {
    return strict === true ? `throw Error('fast-redact: primitives cannot be redacted')` : serialize === false ? `return o` : `return this.serialize(o)`;
}

});

parcelRequire.register("hGcHP", function(module, exports) {
'use strict';

var $F0KpW = parcelRequire("F0KpW");
var $cdf0370bcca21bb4$require$groupRestore = $F0KpW.groupRestore;
var $cdf0370bcca21bb4$require$nestedRestore = $F0KpW.nestedRestore;
module.exports = $cdf0370bcca21bb4$var$restorer;
function $cdf0370bcca21bb4$var$restorer({ secret: secret , wcLen: wcLen  }) {
    return function compileRestore() {
        if (this.restore) return;
        const paths = Object.keys(secret);
        const resetters = $cdf0370bcca21bb4$var$resetTmpl(secret, paths);
        const hasWildcards = wcLen > 0;
        const state = hasWildcards ? {
            secret: secret,
            groupRestore: $cdf0370bcca21bb4$require$groupRestore,
            nestedRestore: $cdf0370bcca21bb4$require$nestedRestore
        } : {
            secret: secret
        };
        /* eslint-disable-next-line */ this.restore = Function('o', $cdf0370bcca21bb4$var$restoreTmpl(resetters, paths, hasWildcards)).bind(state);
    };
}
/**
 * Mutates the original object to be censored by restoring its original values
 * prior to censoring.
 *
 * @param {object} secret Compiled object describing which target fields should
 * be censored and the field states.
 * @param {string[]} paths The list of paths to censor as provided at
 * initialization time.
 *
 * @returns {string} String of JavaScript to be used by `Function()`. The
 * string compiles to the function that does the work in the description.
 */ function $cdf0370bcca21bb4$var$resetTmpl(secret, paths) {
    return paths.map((path)=>{
        const { circle: circle , escPath: escPath , leadingBracket: leadingBracket  } = secret[path];
        const delim = leadingBracket ? '' : '.';
        const reset = circle ? `o.${circle} = secret[${escPath}].val` : `o${delim}${path} = secret[${escPath}].val`;
        const clear = `secret[${escPath}].val = undefined`;
        return `
      if (secret[${escPath}].val !== undefined) {
        try { ${reset} } catch (e) {}
        ${clear}
      }
    `;
    }).join('');
}
/**
 * Creates the body of the restore function
 *
 * Restoration of the redacted object happens
 * backwards, in reverse order of redactions,
 * so that repeated redactions on the same object
 * property can be eventually rolled back to the
 * original value.
 *
 * This way dynamic redactions are restored first,
 * starting from the last one working backwards and
 * followed by the static ones.
 *
 * @returns {string} the body of the restore function
 */ function $cdf0370bcca21bb4$var$restoreTmpl(resetters, paths, hasWildcards) {
    const dynamicReset = hasWildcards === true ? `
    const keys = Object.keys(secret)
    const len = keys.length
    for (var i = len - 1; i >= ${paths.length}; i--) {
      const k = keys[i]
      const o = secret[k]
      if (o.flat === true) this.groupRestore(o)
      else this.nestedRestore(o)
      secret[k] = null
    }
  ` : '';
    return `
    const secret = this.secret
    ${dynamicReset}
    ${resetters}
    return o
  `;
}

});
parcelRequire.register("F0KpW", function(module, exports) {
'use strict';
module.exports = {
    groupRedact: $07b468ebf0ba0a48$var$groupRedact,
    groupRestore: $07b468ebf0ba0a48$var$groupRestore,
    nestedRedact: $07b468ebf0ba0a48$var$nestedRedact,
    nestedRestore: $07b468ebf0ba0a48$var$nestedRestore
};
function $07b468ebf0ba0a48$var$groupRestore({ keys: keys , values: values , target: target  }) {
    if (target == null) return;
    const length = keys.length;
    for(var i = 0; i < length; i++){
        const k = keys[i];
        target[k] = values[i];
    }
}
function $07b468ebf0ba0a48$var$groupRedact(o, path, censor, isCensorFct, censorFctTakesPath) {
    const target = $07b468ebf0ba0a48$var$get(o, path);
    if (target == null) return {
        keys: null,
        values: null,
        target: null,
        flat: true
    };
    const keys = Object.keys(target);
    const keysLength = keys.length;
    const pathLength = path.length;
    const pathWithKey = censorFctTakesPath ? [
        ...path
    ] : undefined;
    const values = new Array(keysLength);
    for(var i = 0; i < keysLength; i++){
        const key = keys[i];
        values[i] = target[key];
        if (censorFctTakesPath) {
            pathWithKey[pathLength] = key;
            target[key] = censor(target[key], pathWithKey);
        } else if (isCensorFct) target[key] = censor(target[key]);
        else target[key] = censor;
    }
    return {
        keys: keys,
        values: values,
        target: target,
        flat: true
    };
}
function $07b468ebf0ba0a48$var$nestedRestore(arr) {
    const length = arr.length;
    for(var i = 0; i < length; i++){
        const { key: key , target: target , value: value  } = arr[i];
        target[key] = value;
    }
}
function $07b468ebf0ba0a48$var$nestedRedact(store, o, path, ns, censor, isCensorFct, censorFctTakesPath) {
    const target = $07b468ebf0ba0a48$var$get(o, path);
    if (target == null) return;
    const keys = Object.keys(target);
    const keysLength = keys.length;
    for(var i = 0; i < keysLength; i++){
        const key = keys[i];
        const { value: value , parent: parent , exists: exists  } = $07b468ebf0ba0a48$var$specialSet(target, key, path, ns, censor, isCensorFct, censorFctTakesPath);
        if (exists === true && parent !== null) store.push({
            key: ns[ns.length - 1],
            target: parent,
            value: value
        });
    }
    return store;
}
function $07b468ebf0ba0a48$var$has(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}
function $07b468ebf0ba0a48$var$specialSet(o, k, path, afterPath, censor, isCensorFct, censorFctTakesPath) {
    const afterPathLen = afterPath.length;
    const lastPathIndex = afterPathLen - 1;
    const originalKey = k;
    var i = -1;
    var n;
    var nv;
    var ov;
    var oov = null;
    var exists = true;
    ov = n = o[k];
    if (typeof n !== 'object') return {
        value: null,
        parent: null,
        exists: exists
    };
    while(n != null && ++i < afterPathLen){
        k = afterPath[i];
        oov = ov;
        if (!(k in n)) {
            exists = false;
            break;
        }
        ov = n[k];
        nv = i !== lastPathIndex ? ov : isCensorFct ? censorFctTakesPath ? censor(ov, [
            ...path,
            originalKey,
            ...afterPath
        ]) : censor(ov) : censor;
        n[k] = $07b468ebf0ba0a48$var$has(n, k) && nv === ov || nv === undefined && censor !== undefined ? n[k] : nv;
        n = n[k];
        if (typeof n !== 'object') break;
    }
    return {
        value: ov,
        parent: oov,
        exists: exists
    };
}
function $07b468ebf0ba0a48$var$get(o, p) {
    var i = -1;
    var l = p.length;
    var n = o;
    while(n != null && ++i < l)n = n[p[i]];
    return n;
}

});


parcelRequire.register("1Jo10", function(module, exports) {
'use strict';
module.exports = $142c9f5bfea467d9$var$state;
function $142c9f5bfea467d9$var$state(o) {
    const { secret: secret , censor: censor , compileRestore: compileRestore , serialize: serialize , groupRedact: groupRedact , nestedRedact: nestedRedact , wildcards: wildcards , wcLen: wcLen  } = o;
    const builder = [
        {
            secret: secret,
            censor: censor,
            compileRestore: compileRestore
        }
    ];
    if (serialize !== false) builder.push({
        serialize: serialize
    });
    if (wcLen > 0) builder.push({
        groupRedact: groupRedact,
        nestedRedact: nestedRedact,
        wildcards: wildcards,
        wcLen: wcLen
    });
    return Object.assign(...builder);
}

});


parcelRequire.register("fsTK1", function(module, exports) {
'use strict';
const $b424b59a8e1d8e2b$var$setLevelSym = Symbol('pino.setLevel');
const $b424b59a8e1d8e2b$var$getLevelSym = Symbol('pino.getLevel');
const $b424b59a8e1d8e2b$var$levelValSym = Symbol('pino.levelVal');
const $b424b59a8e1d8e2b$var$useLevelLabelsSym = Symbol('pino.useLevelLabels');
const $b424b59a8e1d8e2b$var$useOnlyCustomLevelsSym = Symbol('pino.useOnlyCustomLevels');
const $b424b59a8e1d8e2b$var$mixinSym = Symbol('pino.mixin');
const $b424b59a8e1d8e2b$var$lsCacheSym = Symbol('pino.lsCache');
const $b424b59a8e1d8e2b$var$chindingsSym = Symbol('pino.chindings');
const $b424b59a8e1d8e2b$var$parsedChindingsSym = Symbol('pino.parsedChindings');
const $b424b59a8e1d8e2b$var$asJsonSym = Symbol('pino.asJson');
const $b424b59a8e1d8e2b$var$writeSym = Symbol('pino.write');
const $b424b59a8e1d8e2b$var$redactFmtSym = Symbol('pino.redactFmt');
const $b424b59a8e1d8e2b$var$timeSym = Symbol('pino.time');
const $b424b59a8e1d8e2b$var$timeSliceIndexSym = Symbol('pino.timeSliceIndex');
const $b424b59a8e1d8e2b$var$streamSym = Symbol('pino.stream');
const $b424b59a8e1d8e2b$var$stringifySym = Symbol('pino.stringify');
const $b424b59a8e1d8e2b$var$stringifiersSym = Symbol('pino.stringifiers');
const $b424b59a8e1d8e2b$var$endSym = Symbol('pino.end');
const $b424b59a8e1d8e2b$var$formatOptsSym = Symbol('pino.formatOpts');
const $b424b59a8e1d8e2b$var$messageKeySym = Symbol('pino.messageKey');
const $b424b59a8e1d8e2b$var$nestedKeySym = Symbol('pino.nestedKey');
const $b424b59a8e1d8e2b$var$wildcardFirstSym = Symbol('pino.wildcardFirst');
// public symbols, no need to use the same pino
// version for these
const $b424b59a8e1d8e2b$var$serializersSym = Symbol.for('pino.serializers');
const $b424b59a8e1d8e2b$var$formattersSym = Symbol.for('pino.formatters');
const $b424b59a8e1d8e2b$var$hooksSym = Symbol.for('pino.hooks');
const $b424b59a8e1d8e2b$var$needsMetadataGsym = Symbol.for('pino.metadata');
module.exports = {
    setLevelSym: $b424b59a8e1d8e2b$var$setLevelSym,
    getLevelSym: $b424b59a8e1d8e2b$var$getLevelSym,
    levelValSym: $b424b59a8e1d8e2b$var$levelValSym,
    useLevelLabelsSym: $b424b59a8e1d8e2b$var$useLevelLabelsSym,
    mixinSym: $b424b59a8e1d8e2b$var$mixinSym,
    lsCacheSym: $b424b59a8e1d8e2b$var$lsCacheSym,
    chindingsSym: $b424b59a8e1d8e2b$var$chindingsSym,
    parsedChindingsSym: $b424b59a8e1d8e2b$var$parsedChindingsSym,
    asJsonSym: $b424b59a8e1d8e2b$var$asJsonSym,
    writeSym: $b424b59a8e1d8e2b$var$writeSym,
    serializersSym: $b424b59a8e1d8e2b$var$serializersSym,
    redactFmtSym: $b424b59a8e1d8e2b$var$redactFmtSym,
    timeSym: $b424b59a8e1d8e2b$var$timeSym,
    timeSliceIndexSym: $b424b59a8e1d8e2b$var$timeSliceIndexSym,
    streamSym: $b424b59a8e1d8e2b$var$streamSym,
    stringifySym: $b424b59a8e1d8e2b$var$stringifySym,
    stringifiersSym: $b424b59a8e1d8e2b$var$stringifiersSym,
    endSym: $b424b59a8e1d8e2b$var$endSym,
    formatOptsSym: $b424b59a8e1d8e2b$var$formatOptsSym,
    messageKeySym: $b424b59a8e1d8e2b$var$messageKeySym,
    nestedKeySym: $b424b59a8e1d8e2b$var$nestedKeySym,
    wildcardFirstSym: $b424b59a8e1d8e2b$var$wildcardFirstSym,
    needsMetadataGsym: $b424b59a8e1d8e2b$var$needsMetadataGsym,
    useOnlyCustomLevelsSym: $b424b59a8e1d8e2b$var$useOnlyCustomLevelsSym,
    formattersSym: $b424b59a8e1d8e2b$var$formattersSym,
    hooksSym: $b424b59a8e1d8e2b$var$hooksSym
};

});


parcelRequire.register("dcn7a", function(module, exports) {
'use strict';
const $99be536fd4c8d2a1$var$nullTime = ()=>''
;
const $99be536fd4c8d2a1$var$epochTime = ()=>`,"time":${Date.now()}`
;
const $99be536fd4c8d2a1$var$unixTime = ()=>`,"time":${Math.round(Date.now() / 1000)}`
;
const $99be536fd4c8d2a1$var$isoTime = ()=>`,"time":"${new Date(Date.now()).toISOString()}"` // using Date.now() for testability
;
module.exports = {
    nullTime: $99be536fd4c8d2a1$var$nullTime,
    epochTime: $99be536fd4c8d2a1$var$epochTime,
    unixTime: $99be536fd4c8d2a1$var$unixTime,
    isoTime: $99be536fd4c8d2a1$var$isoTime
};

});

parcelRequire.register("kdm8l", function(module, exports) {
'use strict';

var $eb7630d64f89530a$require$EventEmitter = $lEd20$events.EventEmitter;

var $db2Nf = parcelRequire("db2Nf");

var $4lohc = parcelRequire("4lohc");

var $bpoKL = parcelRequire("bpoKL");

var $fsTK1 = parcelRequire("fsTK1");
var $eb7630d64f89530a$require$lsCacheSym = $fsTK1.lsCacheSym;
var $eb7630d64f89530a$require$levelValSym = $fsTK1.levelValSym;
var $eb7630d64f89530a$require$setLevelSym = $fsTK1.setLevelSym;
var $eb7630d64f89530a$require$getLevelSym = $fsTK1.getLevelSym;
var $eb7630d64f89530a$require$chindingsSym = $fsTK1.chindingsSym;
var $eb7630d64f89530a$require$parsedChindingsSym = $fsTK1.parsedChindingsSym;
var $eb7630d64f89530a$require$mixinSym = $fsTK1.mixinSym;
var $eb7630d64f89530a$require$asJsonSym = $fsTK1.asJsonSym;
var $eb7630d64f89530a$require$writeSym = $fsTK1.writeSym;
var $eb7630d64f89530a$require$timeSym = $fsTK1.timeSym;
var $eb7630d64f89530a$require$timeSliceIndexSym = $fsTK1.timeSliceIndexSym;
var $eb7630d64f89530a$require$streamSym = $fsTK1.streamSym;
var $eb7630d64f89530a$require$serializersSym = $fsTK1.serializersSym;
var $eb7630d64f89530a$require$formattersSym = $fsTK1.formattersSym;
var $eb7630d64f89530a$require$useOnlyCustomLevelsSym = $fsTK1.useOnlyCustomLevelsSym;
var $eb7630d64f89530a$require$needsMetadataGsym = $fsTK1.needsMetadataGsym;
var $eb7630d64f89530a$require$redactFmtSym = $fsTK1.redactFmtSym;
var $eb7630d64f89530a$require$stringifySym = $fsTK1.stringifySym;
var $eb7630d64f89530a$require$formatOptsSym = $fsTK1.formatOptsSym;
var $eb7630d64f89530a$require$stringifiersSym = $fsTK1.stringifiersSym;

var $4T7wh = parcelRequire("4T7wh");
var $eb7630d64f89530a$require$getLevel = $4T7wh.getLevel;
var $eb7630d64f89530a$require$setLevel = $4T7wh.setLevel;
var $eb7630d64f89530a$require$isLevelEnabled = $4T7wh.isLevelEnabled;
var $eb7630d64f89530a$require$mappings = $4T7wh.mappings;
var $eb7630d64f89530a$require$initialLsCache = $4T7wh.initialLsCache;
var $eb7630d64f89530a$require$genLsCache = $4T7wh.genLsCache;
var $eb7630d64f89530a$require$assertNoLevelCollisions = $4T7wh.assertNoLevelCollisions;

var $Fl55h = parcelRequire("Fl55h");
var $eb7630d64f89530a$require$asChindings = $Fl55h.asChindings;
var $eb7630d64f89530a$require$asJson = $Fl55h.asJson;
var $eb7630d64f89530a$require$buildFormatters = $Fl55h.buildFormatters;
var $eb7630d64f89530a$require$stringify = $Fl55h.stringify;

var $2ylft = parcelRequire("2ylft");
var $eb7630d64f89530a$require$version = $2ylft.version;

var $LRuFg = parcelRequire("LRuFg");
// note: use of class is satirical
// https://github.com/pinojs/pino/pull/433#pullrequestreview-127703127
const $eb7630d64f89530a$var$constructor = class Pino {
};
const $eb7630d64f89530a$var$prototype = {
    constructor: $eb7630d64f89530a$var$constructor,
    child: $eb7630d64f89530a$var$child,
    bindings: $eb7630d64f89530a$var$bindings,
    setBindings: $eb7630d64f89530a$var$setBindings,
    flush: $eb7630d64f89530a$var$flush,
    isLevelEnabled: $eb7630d64f89530a$require$isLevelEnabled,
    version: $eb7630d64f89530a$require$version,
    get level () {
        return this[$eb7630d64f89530a$require$getLevelSym]();
    },
    set level (lvl){
        this[$eb7630d64f89530a$require$setLevelSym](lvl);
    },
    get levelVal () {
        return this[$eb7630d64f89530a$require$levelValSym];
    },
    set levelVal (n){
        throw Error('levelVal is read-only');
    },
    [$eb7630d64f89530a$require$lsCacheSym]: $eb7630d64f89530a$require$initialLsCache,
    [$eb7630d64f89530a$require$writeSym]: $eb7630d64f89530a$var$write,
    [$eb7630d64f89530a$require$asJsonSym]: $eb7630d64f89530a$require$asJson,
    [$eb7630d64f89530a$require$getLevelSym]: $eb7630d64f89530a$require$getLevel,
    [$eb7630d64f89530a$require$setLevelSym]: $eb7630d64f89530a$require$setLevel
};
Object.setPrototypeOf($eb7630d64f89530a$var$prototype, $eb7630d64f89530a$require$EventEmitter.prototype);
// exporting and consuming the prototype object using factory pattern fixes scoping issues with getters when serializing
module.exports = function() {
    return Object.create($eb7630d64f89530a$var$prototype);
};
const $eb7630d64f89530a$var$resetChildingsFormatter = (bindings)=>bindings
;
function $eb7630d64f89530a$var$child(bindings, options) {
    if (!bindings) throw Error('missing bindings for child Pino');
    options = options || {
    } // default options to empty object
    ;
    const serializers = this[$eb7630d64f89530a$require$serializersSym];
    const formatters = this[$eb7630d64f89530a$require$formattersSym];
    const instance = Object.create(this);
    if (bindings.hasOwnProperty('serializers') === true) {
        $bpoKL.emit('PINODEP004');
        options.serializers = bindings.serializers;
    }
    if (bindings.hasOwnProperty('formatters') === true) {
        $bpoKL.emit('PINODEP005');
        options.formatters = bindings.formatters;
    }
    if (bindings.hasOwnProperty('customLevels') === true) {
        $bpoKL.emit('PINODEP006');
        options.customLevels = bindings.customLevels;
    }
    if (bindings.hasOwnProperty('level') === true) {
        $bpoKL.emit('PINODEP007');
        options.level = bindings.level;
    }
    if (options.hasOwnProperty('serializers') === true) {
        instance[$eb7630d64f89530a$require$serializersSym] = Object.create(null);
        for(const k in serializers)instance[$eb7630d64f89530a$require$serializersSym][k] = serializers[k];
        const parentSymbols = Object.getOwnPropertySymbols(serializers);
        /* eslint no-var: off */ for(var i = 0; i < parentSymbols.length; i++){
            const ks = parentSymbols[i];
            instance[$eb7630d64f89530a$require$serializersSym][ks] = serializers[ks];
        }
        for(const bk in options.serializers)instance[$eb7630d64f89530a$require$serializersSym][bk] = options.serializers[bk];
        const bindingsSymbols = Object.getOwnPropertySymbols(options.serializers);
        for(var bi = 0; bi < bindingsSymbols.length; bi++){
            const bks = bindingsSymbols[bi];
            instance[$eb7630d64f89530a$require$serializersSym][bks] = options.serializers[bks];
        }
    } else instance[$eb7630d64f89530a$require$serializersSym] = serializers;
    if (options.hasOwnProperty('formatters')) {
        const { level: level , bindings: chindings , log: log  } = options.formatters;
        instance[$eb7630d64f89530a$require$formattersSym] = $eb7630d64f89530a$require$buildFormatters(level || formatters.level, chindings || $eb7630d64f89530a$var$resetChildingsFormatter, log || formatters.log);
    } else instance[$eb7630d64f89530a$require$formattersSym] = $eb7630d64f89530a$require$buildFormatters(formatters.level, $eb7630d64f89530a$var$resetChildingsFormatter, formatters.log);
    if (options.hasOwnProperty('customLevels') === true) {
        $eb7630d64f89530a$require$assertNoLevelCollisions(this.levels, options.customLevels);
        instance.levels = $eb7630d64f89530a$require$mappings(options.customLevels, instance[$eb7630d64f89530a$require$useOnlyCustomLevelsSym]);
        $eb7630d64f89530a$require$genLsCache(instance);
    }
    // redact must place before asChindings and only replace if exist
    if (typeof options.redact === 'object' && options.redact !== null || Array.isArray(options.redact)) {
        instance.redact = options.redact // replace redact directly
        ;
        const stringifiers = $LRuFg(instance.redact, $eb7630d64f89530a$require$stringify);
        const formatOpts = {
            stringify: stringifiers[$eb7630d64f89530a$require$redactFmtSym]
        };
        instance[$eb7630d64f89530a$require$stringifySym] = $eb7630d64f89530a$require$stringify;
        instance[$eb7630d64f89530a$require$stringifiersSym] = stringifiers;
        instance[$eb7630d64f89530a$require$formatOptsSym] = formatOpts;
    }
    instance[$eb7630d64f89530a$require$chindingsSym] = $eb7630d64f89530a$require$asChindings(instance, bindings);
    const childLevel = options.level || this.level;
    instance[$eb7630d64f89530a$require$setLevelSym](childLevel);
    return instance;
}
function $eb7630d64f89530a$var$bindings() {
    const chindings = this[$eb7630d64f89530a$require$chindingsSym];
    const chindingsJson = `{${chindings.substr(1)}}` // at least contains ,"pid":7068,"hostname":"myMac"
    ;
    const bindingsFromJson = JSON.parse(chindingsJson);
    delete bindingsFromJson.pid;
    delete bindingsFromJson.hostname;
    return bindingsFromJson;
}
function $eb7630d64f89530a$var$setBindings(newBindings) {
    const chindings = $eb7630d64f89530a$require$asChindings(this, newBindings);
    this[$eb7630d64f89530a$require$chindingsSym] = chindings;
    delete this[$eb7630d64f89530a$require$parsedChindingsSym];
}
function $eb7630d64f89530a$var$write(_obj, msg, num) {
    const t = this[$eb7630d64f89530a$require$timeSym]();
    const mixin = this[$eb7630d64f89530a$require$mixinSym];
    const objError = _obj instanceof Error;
    let obj;
    if (_obj === undefined || _obj === null) obj = mixin ? mixin({
    }) : {
    };
    else {
        obj = Object.assign(mixin ? mixin(_obj) : {
        }, _obj);
        if (!msg && objError) msg = _obj.message;
        if (objError) {
            obj.stack = _obj.stack;
            if (!obj.type) obj.type = 'Error';
        }
    }
    const s = this[$eb7630d64f89530a$require$asJsonSym](obj, msg, num, t);
    const stream = this[$eb7630d64f89530a$require$streamSym];
    if (stream[$eb7630d64f89530a$require$needsMetadataGsym] === true) {
        stream.lastLevel = num;
        stream.lastObj = obj;
        stream.lastMsg = msg;
        stream.lastTime = t.slice(this[$eb7630d64f89530a$require$timeSliceIndexSym]);
        stream.lastLogger = this // for child loggers
        ;
    }
    if (stream instanceof $db2Nf) stream.write(s);
    else stream.write($4lohc(s));
}
function $eb7630d64f89530a$var$flush() {
    const stream = this[$eb7630d64f89530a$require$streamSym];
    if ('flush' in stream) stream.flush();
}

});
parcelRequire.register("db2Nf", function(module, exports) {
'use strict';



var $4lohc = parcelRequire("4lohc");

var $997e781d22fa63f1$require$inherits = $lEd20$util.inherits;
const $997e781d22fa63f1$var$BUSY_WRITE_TIMEOUT = 100;

var $fuGyA = parcelRequire("fuGyA");
// 16 MB - magic number
// This constant ensures that SonicBoom only needs
// 32 MB of free memory to run. In case of having 1GB+
// of data to write, this prevents an out of memory
// condition.
const $997e781d22fa63f1$var$MAX_WRITE = 16777216;
function $997e781d22fa63f1$var$openFile(file, sonic) {
    sonic._opening = true;
    sonic._writing = true;
    sonic._asyncDrainScheduled = false;
    // NOTE: 'error' and 'ready' events emitted below only relevant when sonic.sync===false
    // for sync mode, there is no way to add a listener that will receive these
    function fileOpened(err, fd) {
        if (err) {
            sonic._reopening = false;
            sonic._writing = false;
            sonic._opening = false;
            if (sonic.sync) process.nextTick(()=>{
                if (sonic.listenerCount('error') > 0) sonic.emit('error', err);
            });
            else sonic.emit('error', err);
            return;
        }
        sonic.fd = fd;
        sonic.file = file;
        sonic._reopening = false;
        sonic._opening = false;
        sonic._writing = false;
        if (sonic.sync) process.nextTick(()=>sonic.emit('ready')
        );
        else sonic.emit('ready');
        if (sonic._reopening) return;
        // start
        const len = sonic._buf.length;
        if (len > 0 && len > sonic.minLength && !sonic.destroyed) $997e781d22fa63f1$var$actualWrite(sonic);
    }
    if (sonic.sync) try {
        const fd = $lEd20$fs.openSync(file, 'a');
        fileOpened(null, fd);
    } catch (err) {
        fileOpened(err);
        throw err;
    }
    else $lEd20$fs.open(file, 'a', fileOpened);
}
function $997e781d22fa63f1$var$SonicBoom(opts) {
    if (!(this instanceof $997e781d22fa63f1$var$SonicBoom)) return new $997e781d22fa63f1$var$SonicBoom(opts);
    let { fd: fd , dest: dest , minLength: minLength , sync: sync  } = opts || {
    };
    fd = fd || dest;
    this._buf = '';
    this.fd = -1;
    this._writing = false;
    this._writingBuf = '';
    this._ending = false;
    this._reopening = false;
    this._asyncDrainScheduled = false;
    this.file = null;
    this.destroyed = false;
    this.sync = sync || false;
    this.minLength = minLength || 0;
    if (typeof fd === 'number') {
        this.fd = fd;
        process.nextTick(()=>this.emit('ready')
        );
    } else if (typeof fd === 'string') $997e781d22fa63f1$var$openFile(fd, this);
    else throw new Error('SonicBoom supports only file descriptors and files');
    this.release = (err, n)=>{
        if (err) {
            if (err.code === 'EAGAIN') {
                if (this.sync) // This error code should not happen in sync mode, because it is
                // not using the underlining operating system asynchronous functions.
                // However it happens, and so we handle it.
                // Ref: https://github.com/pinojs/pino/issues/783
                try {
                    $fuGyA($997e781d22fa63f1$var$BUSY_WRITE_TIMEOUT);
                    this.release(undefined, 0);
                } catch (err) {
                    this.release(err);
                }
                else // Let's give the destination some time to process the chunk.
                setTimeout(()=>{
                    $lEd20$fs.write(this.fd, this._writingBuf, 'utf8', this.release);
                }, $997e781d22fa63f1$var$BUSY_WRITE_TIMEOUT);
            } else {
                // The error maybe recoverable later, so just put data back to this._buf
                this._buf = this._writingBuf + this._buf;
                this._writingBuf = '';
                this._writing = false;
                this.emit('error', err);
            }
            return;
        }
        if (this._writingBuf.length !== n) {
            this._writingBuf = this._writingBuf.slice(n);
            if (this.sync) try {
                do {
                    n = $lEd20$fs.writeSync(this.fd, this._writingBuf, 'utf8');
                    this._writingBuf = this._writingBuf.slice(n);
                }while (this._writingBuf.length !== 0)
            } catch (err) {
                this.release(err);
                return;
            }
            else {
                $lEd20$fs.write(this.fd, this._writingBuf, 'utf8', this.release);
                return;
            }
        }
        this._writingBuf = '';
        if (this.destroyed) return;
        const len = this._buf.length;
        if (this._reopening) {
            this._writing = false;
            this._reopening = false;
            this.reopen();
        } else if (len > 0 && len > this.minLength) $997e781d22fa63f1$var$actualWrite(this);
        else if (this._ending) {
            if (len > 0) $997e781d22fa63f1$var$actualWrite(this);
            else {
                this._writing = false;
                $997e781d22fa63f1$var$actualClose(this);
            }
        } else {
            this._writing = false;
            if (this.sync) {
                if (!this._asyncDrainScheduled) {
                    this._asyncDrainScheduled = true;
                    process.nextTick($997e781d22fa63f1$var$emitDrain, this);
                }
            } else this.emit('drain');
        }
    };
    this.on('newListener', function(name) {
        if (name === 'drain') this._asyncDrainScheduled = false;
    });
}
function $997e781d22fa63f1$var$emitDrain(sonic) {
    const hasListeners = sonic.listenerCount('drain') > 0;
    if (!hasListeners) return;
    sonic._asyncDrainScheduled = false;
    sonic.emit('drain');
}
$997e781d22fa63f1$require$inherits($997e781d22fa63f1$var$SonicBoom, $lEd20$events);
$997e781d22fa63f1$var$SonicBoom.prototype.write = function(data) {
    if (this.destroyed) throw new Error('SonicBoom destroyed');
    this._buf += data;
    const len = this._buf.length;
    if (!this._writing && len > this.minLength) $997e781d22fa63f1$var$actualWrite(this);
    return len < 16384;
};
$997e781d22fa63f1$var$SonicBoom.prototype.flush = function() {
    if (this.destroyed) throw new Error('SonicBoom destroyed');
    if (this._writing || this.minLength <= 0) return;
    $997e781d22fa63f1$var$actualWrite(this);
};
$997e781d22fa63f1$var$SonicBoom.prototype.reopen = function(file) {
    if (this.destroyed) throw new Error('SonicBoom destroyed');
    if (this._opening) {
        this.once('ready', ()=>{
            this.reopen(file);
        });
        return;
    }
    if (this._ending) return;
    if (!this.file) throw new Error('Unable to reopen a file descriptor, you must pass a file to SonicBoom');
    this._reopening = true;
    if (this._writing) return;
    const fd = this.fd;
    this.once('ready', ()=>{
        if (fd !== this.fd) $lEd20$fs.close(fd, (err)=>{
            if (err) return this.emit('error', err);
        });
    });
    $997e781d22fa63f1$var$openFile(file || this.file, this);
};
$997e781d22fa63f1$var$SonicBoom.prototype.end = function() {
    if (this.destroyed) throw new Error('SonicBoom destroyed');
    if (this._opening) {
        this.once('ready', ()=>{
            this.end();
        });
        return;
    }
    if (this._ending) return;
    this._ending = true;
    if (!this._writing && this._buf.length > 0 && this.fd >= 0) {
        $997e781d22fa63f1$var$actualWrite(this);
        return;
    }
    if (this._writing) return;
    $997e781d22fa63f1$var$actualClose(this);
};
$997e781d22fa63f1$var$SonicBoom.prototype.flushSync = function() {
    if (this.destroyed) throw new Error('SonicBoom destroyed');
    if (this.fd < 0) throw new Error('sonic boom is not ready yet');
    while(this._buf.length > 0)try {
        $lEd20$fs.writeSync(this.fd, this._buf, 'utf8');
        this._buf = '';
    } catch (err) {
        if (err.code !== 'EAGAIN') throw err;
        $fuGyA($997e781d22fa63f1$var$BUSY_WRITE_TIMEOUT);
    }
};
$997e781d22fa63f1$var$SonicBoom.prototype.destroy = function() {
    if (this.destroyed) return;
    $997e781d22fa63f1$var$actualClose(this);
};
function $997e781d22fa63f1$var$actualWrite(sonic) {
    sonic._writing = true;
    let buf = sonic._buf;
    const release = sonic.release;
    if (buf.length > $997e781d22fa63f1$var$MAX_WRITE) {
        buf = buf.slice(0, $997e781d22fa63f1$var$MAX_WRITE);
        sonic._buf = sonic._buf.slice($997e781d22fa63f1$var$MAX_WRITE);
    } else sonic._buf = '';
    $4lohc(buf);
    sonic._writingBuf = buf;
    if (sonic.sync) try {
        const written = $lEd20$fs.writeSync(sonic.fd, buf, 'utf8');
        release(null, written);
    } catch (err) {
        release(err);
    }
    else $lEd20$fs.write(sonic.fd, buf, 'utf8', release);
}
function $997e781d22fa63f1$var$actualClose(sonic) {
    if (sonic.fd === -1) {
        sonic.once('ready', $997e781d22fa63f1$var$actualClose.bind(null, sonic));
        return;
    }
    // TODO write a test to check if we are not leaking fds
    $lEd20$fs.close(sonic.fd, (err)=>{
        if (err) {
            sonic.emit('error', err);
            return;
        }
        if (sonic._ending && !sonic._writing) sonic.emit('finish');
        sonic.emit('close');
    });
    sonic.destroyed = true;
    sonic._buf = '';
}
module.exports = $997e781d22fa63f1$var$SonicBoom;

});
parcelRequire.register("4lohc", function(module, exports) {
'use strict';
// You may be tempted to copy and paste this, 
// but take a look at the commit history first,
// this is a moving target so relying on the module
// is the best way to make sure the optimization
// method is kept up to date and compatible with
// every Node version.
function $329bf463f8b2cdf1$var$flatstr(s) {
    return s;
}
module.exports = $329bf463f8b2cdf1$var$flatstr;

});

parcelRequire.register("fuGyA", function(module, exports) {
'use strict';
/* global SharedArrayBuffer, Atomics */ if (typeof SharedArrayBuffer !== 'undefined' && typeof Atomics !== 'undefined') {
    const nil = new Int32Array(new SharedArrayBuffer(4));
    function $b47aab4314895666$var$sleep(ms) {
        // also filters out NaN, non-number types, including empty strings, but allows bigints
        const valid = ms > 0 && ms < Infinity;
        if (valid === false) {
            if (typeof ms !== 'number' && typeof ms !== 'bigint') throw TypeError('sleep: ms must be a number');
            throw RangeError('sleep: ms must be a number that is greater than 0 but less than Infinity');
        }
        Atomics.wait(nil, 0, 0, Number(ms));
    }
    module.exports = $b47aab4314895666$var$sleep;
} else {
    function $b47aab4314895666$var$sleep(ms) {
        // also filters out NaN, non-number types, including empty strings, but allows bigints
        const valid = ms > 0 && ms < Infinity;
        if (valid === false) {
            if (typeof ms !== 'number' && typeof ms !== 'bigint') throw TypeError('sleep: ms must be a number');
            throw RangeError('sleep: ms must be a number that is greater than 0 but less than Infinity');
        }
        const target = Date.now() + Number(ms);
        while(target > Date.now());
    }
    module.exports = $b47aab4314895666$var$sleep;
}

});


parcelRequire.register("bpoKL", function(module, exports) {
'use strict';

const $84e53b037db9effc$var$warning = (parcelRequire("k7re6"))();
module.exports = $84e53b037db9effc$var$warning;
const $84e53b037db9effc$var$warnName = 'PinoWarning';
$84e53b037db9effc$var$warning.create($84e53b037db9effc$var$warnName, 'PINODEP004', 'bindings.serializers is deprecated, use options.serializers option instead');
$84e53b037db9effc$var$warning.create($84e53b037db9effc$var$warnName, 'PINODEP005', 'bindings.formatters is deprecated, use options.formatters option instead');
$84e53b037db9effc$var$warning.create($84e53b037db9effc$var$warnName, 'PINODEP006', 'bindings.customLevels is deprecated, use options.customLevels option instead');
$84e53b037db9effc$var$warning.create($84e53b037db9effc$var$warnName, 'PINODEP007', 'bindings.level is deprecated, use options.level option instead');

});
parcelRequire.register("k7re6", function(module, exports) {
'use strict';

var $ea5994b4b65ccf8d$require$format = $lEd20$util.format;
function $ea5994b4b65ccf8d$var$build() {
    const codes = {
    };
    const emitted = new Map();
    function create(name, code, message) {
        if (!name) throw new Error('Fastify warning name must not be empty');
        if (!code) throw new Error('Fastify warning code must not be empty');
        if (!message) throw new Error('Fastify warning message must not be empty');
        code = code.toUpperCase();
        if (codes[code] !== undefined) throw new Error(`The code '${code}' already exist`);
        function buildWarnOpts(a, b, c) {
            // more performant than spread (...) operator
            let formatted;
            if (a && b && c) formatted = $ea5994b4b65ccf8d$require$format(message, a, b, c);
            else if (a && b) formatted = $ea5994b4b65ccf8d$require$format(message, a, b);
            else if (a) formatted = $ea5994b4b65ccf8d$require$format(message, a);
            else formatted = message;
            return {
                code: code,
                name: name,
                message: formatted
            };
        }
        emitted.set(code, false);
        codes[code] = buildWarnOpts;
        return codes[code];
    }
    function emit(code, a, b, c) {
        if (codes[code] === undefined) throw new Error(`The code '${code}' does not exist`);
        if (emitted.get(code) === true) return;
        emitted.set(code, true);
        const warning = codes[code](a, b, c);
        process.emitWarning(warning.message, warning.name, warning.code);
    }
    return {
        create: create,
        emit: emit,
        emitted: emitted
    };
}
module.exports = $ea5994b4b65ccf8d$var$build;

});


parcelRequire.register("4T7wh", function(module, exports) {
'use strict';

var $4lohc = parcelRequire("4lohc");

var $fsTK1 = parcelRequire("fsTK1");
var $38f221b46d19c9ca$require$lsCacheSym = $fsTK1.lsCacheSym;
var $38f221b46d19c9ca$require$levelValSym = $fsTK1.levelValSym;
var $38f221b46d19c9ca$require$useOnlyCustomLevelsSym = $fsTK1.useOnlyCustomLevelsSym;
var $38f221b46d19c9ca$require$streamSym = $fsTK1.streamSym;
var $38f221b46d19c9ca$require$formattersSym = $fsTK1.formattersSym;
var $38f221b46d19c9ca$require$hooksSym = $fsTK1.hooksSym;

var $Fl55h = parcelRequire("Fl55h");
var $38f221b46d19c9ca$require$noop = $Fl55h.noop;
var $38f221b46d19c9ca$require$genLog = $Fl55h.genLog;
const $38f221b46d19c9ca$var$levels = {
    trace: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60
};
const $38f221b46d19c9ca$var$levelMethods = {
    fatal: (hook)=>{
        const logFatal = $38f221b46d19c9ca$require$genLog($38f221b46d19c9ca$var$levels.fatal, hook);
        return function(...args) {
            const stream = this[$38f221b46d19c9ca$require$streamSym];
            logFatal.call(this, ...args);
            if (typeof stream.flushSync === 'function') try {
                stream.flushSync();
            } catch (e) {
            // https://github.com/pinojs/pino/pull/740#discussion_r346788313
            }
        };
    },
    error: (hook)=>$38f221b46d19c9ca$require$genLog($38f221b46d19c9ca$var$levels.error, hook)
    ,
    warn: (hook)=>$38f221b46d19c9ca$require$genLog($38f221b46d19c9ca$var$levels.warn, hook)
    ,
    info: (hook)=>$38f221b46d19c9ca$require$genLog($38f221b46d19c9ca$var$levels.info, hook)
    ,
    debug: (hook)=>$38f221b46d19c9ca$require$genLog($38f221b46d19c9ca$var$levels.debug, hook)
    ,
    trace: (hook)=>$38f221b46d19c9ca$require$genLog($38f221b46d19c9ca$var$levels.trace, hook)
};
const $38f221b46d19c9ca$var$nums = Object.keys($38f221b46d19c9ca$var$levels).reduce((o, k)=>{
    o[$38f221b46d19c9ca$var$levels[k]] = k;
    return o;
}, {
});
const $38f221b46d19c9ca$var$initialLsCache = Object.keys($38f221b46d19c9ca$var$nums).reduce((o, k)=>{
    o[k] = $4lohc('{"level":' + Number(k));
    return o;
}, {
});
function $38f221b46d19c9ca$var$genLsCache(instance) {
    const formatter = instance[$38f221b46d19c9ca$require$formattersSym].level;
    const { labels: labels  } = instance.levels;
    const cache = {
    };
    for(const label in labels){
        const level = formatter(labels[label], Number(label));
        cache[label] = JSON.stringify(level).slice(0, -1);
    }
    instance[$38f221b46d19c9ca$require$lsCacheSym] = cache;
    return instance;
}
function $38f221b46d19c9ca$var$isStandardLevel(level, useOnlyCustomLevels) {
    if (useOnlyCustomLevels) return false;
    switch(level){
        case 'fatal':
        case 'error':
        case 'warn':
        case 'info':
        case 'debug':
        case 'trace':
            return true;
        default:
            return false;
    }
}
function $38f221b46d19c9ca$var$setLevel(level) {
    const { labels: labels , values: values  } = this.levels;
    if (typeof level === 'number') {
        if (labels[level] === undefined) throw Error('unknown level value' + level);
        level = labels[level];
    }
    if (values[level] === undefined) throw Error('unknown level ' + level);
    const preLevelVal = this[$38f221b46d19c9ca$require$levelValSym];
    const levelVal = this[$38f221b46d19c9ca$require$levelValSym] = values[level];
    const useOnlyCustomLevelsVal = this[$38f221b46d19c9ca$require$useOnlyCustomLevelsSym];
    const hook = this[$38f221b46d19c9ca$require$hooksSym].logMethod;
    for(const key in values){
        if (levelVal > values[key]) {
            this[key] = $38f221b46d19c9ca$require$noop;
            continue;
        }
        this[key] = $38f221b46d19c9ca$var$isStandardLevel(key, useOnlyCustomLevelsVal) ? $38f221b46d19c9ca$var$levelMethods[key](hook) : $38f221b46d19c9ca$require$genLog(values[key], hook);
    }
    this.emit('level-change', level, levelVal, labels[preLevelVal], preLevelVal);
}
function $38f221b46d19c9ca$var$getLevel(level) {
    const { levels: levels , levelVal: levelVal  } = this;
    // protection against potential loss of Pino scope from serializers (edge case with circular refs - https://github.com/pinojs/pino/issues/833)
    return levels && levels.labels ? levels.labels[levelVal] : '';
}
function $38f221b46d19c9ca$var$isLevelEnabled(logLevel) {
    const { values: values  } = this.levels;
    const logLevelVal = values[logLevel];
    return logLevelVal !== undefined && logLevelVal >= this[$38f221b46d19c9ca$require$levelValSym];
}
function $38f221b46d19c9ca$var$mappings(customLevels = null, useOnlyCustomLevels = false) {
    const customNums = customLevels ? Object.keys(customLevels).reduce((o, k)=>{
        o[customLevels[k]] = k;
        return o;
    }, {
    }) : null;
    /* eslint-enable */ const labels = Object.assign(Object.create(Object.prototype, {
        Infinity: {
            value: 'silent'
        }
    }), useOnlyCustomLevels ? null : $38f221b46d19c9ca$var$nums, customNums);
    const values = Object.assign(Object.create(Object.prototype, {
        silent: {
            value: Infinity
        }
    }), useOnlyCustomLevels ? null : $38f221b46d19c9ca$var$levels, customLevels);
    return {
        labels: labels,
        values: values
    };
}
function $38f221b46d19c9ca$var$assertDefaultLevelFound(defaultLevel, customLevels, useOnlyCustomLevels) {
    if (typeof defaultLevel === 'number') {
        const values = [].concat(Object.keys(customLevels || {
        }).map((key)=>customLevels[key]
        ), useOnlyCustomLevels ? [] : Object.keys($38f221b46d19c9ca$var$nums).map((level)=>+level
        ), Infinity);
        if (!values.includes(defaultLevel)) throw Error(`default level:${defaultLevel} must be included in custom levels`);
        return;
    }
    const labels = Object.assign(Object.create(Object.prototype, {
        silent: {
            value: Infinity
        }
    }), useOnlyCustomLevels ? null : $38f221b46d19c9ca$var$levels, customLevels);
    if (!(defaultLevel in labels)) throw Error(`default level:${defaultLevel} must be included in custom levels`);
}
function $38f221b46d19c9ca$var$assertNoLevelCollisions(levels, customLevels) {
    const { labels: labels , values: values  } = levels;
    for(const k in customLevels){
        if (k in values) throw Error('levels cannot be overridden');
        if (customLevels[k] in labels) throw Error('pre-existing level values cannot be used for new levels');
    }
}
module.exports = {
    initialLsCache: $38f221b46d19c9ca$var$initialLsCache,
    genLsCache: $38f221b46d19c9ca$var$genLsCache,
    levelMethods: $38f221b46d19c9ca$var$levelMethods,
    getLevel: $38f221b46d19c9ca$var$getLevel,
    setLevel: $38f221b46d19c9ca$var$setLevel,
    isLevelEnabled: $38f221b46d19c9ca$var$isLevelEnabled,
    mappings: $38f221b46d19c9ca$var$mappings,
    assertNoLevelCollisions: $38f221b46d19c9ca$var$assertNoLevelCollisions,
    assertDefaultLevelFound: $38f221b46d19c9ca$var$assertDefaultLevelFound
};

});
parcelRequire.register("Fl55h", function(module, exports) {
'use strict';

var $hMYKT = parcelRequire("hMYKT");

var $bMWaw = parcelRequire("bMWaw");
var $07c42eb2bd77cacc$require$mapHttpRequest = $bMWaw.mapHttpRequest;
var $07c42eb2bd77cacc$require$mapHttpResponse = $bMWaw.mapHttpResponse;

var $db2Nf = parcelRequire("db2Nf");

var $9GdXI = parcelRequire("9GdXI");

var $fsTK1 = parcelRequire("fsTK1");
var $07c42eb2bd77cacc$require$lsCacheSym = $fsTK1.lsCacheSym;
var $07c42eb2bd77cacc$require$chindingsSym = $fsTK1.chindingsSym;
var $07c42eb2bd77cacc$require$parsedChindingsSym = $fsTK1.parsedChindingsSym;
var $07c42eb2bd77cacc$require$writeSym = $fsTK1.writeSym;
var $07c42eb2bd77cacc$require$serializersSym = $fsTK1.serializersSym;
var $07c42eb2bd77cacc$require$formatOptsSym = $fsTK1.formatOptsSym;
var $07c42eb2bd77cacc$require$endSym = $fsTK1.endSym;
var $07c42eb2bd77cacc$require$stringifiersSym = $fsTK1.stringifiersSym;
var $07c42eb2bd77cacc$require$stringifySym = $fsTK1.stringifySym;
var $07c42eb2bd77cacc$require$wildcardFirstSym = $fsTK1.wildcardFirstSym;
var $07c42eb2bd77cacc$require$needsMetadataGsym = $fsTK1.needsMetadataGsym;
var $07c42eb2bd77cacc$require$redactFmtSym = $fsTK1.redactFmtSym;
var $07c42eb2bd77cacc$require$streamSym = $fsTK1.streamSym;
var $07c42eb2bd77cacc$require$nestedKeySym = $fsTK1.nestedKeySym;
var $07c42eb2bd77cacc$require$formattersSym = $fsTK1.formattersSym;
var $07c42eb2bd77cacc$require$messageKeySym = $fsTK1.messageKeySym;
function $07c42eb2bd77cacc$var$noop() {
}
function $07c42eb2bd77cacc$var$genLog(level, hook) {
    if (!hook) return LOG;
    function LOG(o, ...n) {
        if (typeof o === 'object') {
            let msg = o;
            if (o !== null) {
                if (o.method && o.headers && o.socket) {
                    o = $07c42eb2bd77cacc$require$mapHttpRequest(o);
                } else if (typeof o.setHeader === 'function') {
                    o = $07c42eb2bd77cacc$require$mapHttpResponse(o);
                }
            }
            if (this[$07c42eb2bd77cacc$require$nestedKeySym]) o = {
                [this[$07c42eb2bd77cacc$require$nestedKeySym]]: o
            };
            let formatParams;
            if (msg === null && n.length === 0) {
                formatParams = [
                    null
                ];
            } else {
                msg = n.shift();
                formatParams = n;
            }
            this[$07c42eb2bd77cacc$require$writeSym](o, $hMYKT(msg, formatParams, this[$07c42eb2bd77cacc$require$formatOptsSym]), level);
        } else {
            this[$07c42eb2bd77cacc$require$writeSym](null, $hMYKT(o, n, this[$07c42eb2bd77cacc$require$formatOptsSym]), level);
        }
    }
    return function hookWrappedLog(...args) {
        hook.call(this, args, LOG, level);
    };
}
// magically escape strings for json
// relying on their charCodeAt
// everything below 32 needs JSON.stringify()
// 34 and 92 happens all the time, so we
// have a fast case for them
function $07c42eb2bd77cacc$var$asString(str) {
    let result = '';
    let last = 0;
    let found = false;
    let point = 255;
    const l = str.length;
    if (l > 100) return JSON.stringify(str);
    for(var i = 0; i < l && point >= 32; i++){
        point = str.charCodeAt(i);
        if (point === 34 || point === 92) {
            result += str.slice(last, i) + '\\';
            last = i;
            found = true;
        }
    }
    if (!found) result = str;
    else result += str.slice(last);
    return point < 32 ? JSON.stringify(str) : '"' + result + '"';
}
function $07c42eb2bd77cacc$var$asJson(obj, msg, num, time) {
    const stringify = this[$07c42eb2bd77cacc$require$stringifySym];
    const stringifiers = this[$07c42eb2bd77cacc$require$stringifiersSym];
    const end = this[$07c42eb2bd77cacc$require$endSym];
    const chindings = this[$07c42eb2bd77cacc$require$chindingsSym];
    const serializers = this[$07c42eb2bd77cacc$require$serializersSym];
    const formatters = this[$07c42eb2bd77cacc$require$formattersSym];
    const messageKey = this[$07c42eb2bd77cacc$require$messageKeySym];
    let data = this[$07c42eb2bd77cacc$require$lsCacheSym][num] + time;
    // we need the child bindings added to the output first so instance logged
    // objects can take precedence when JSON.parse-ing the resulting log line
    data = data + chindings;
    let value;
    const notHasOwnProperty = obj.hasOwnProperty === undefined;
    if (formatters.log) obj = formatters.log(obj);
    if (msg !== undefined) obj[messageKey] = msg;
    const wildcardStringifier = stringifiers[$07c42eb2bd77cacc$require$wildcardFirstSym];
    for(const key in obj){
        value = obj[key];
        if ((notHasOwnProperty || obj.hasOwnProperty(key)) && value !== undefined) {
            value = serializers[key] ? serializers[key](value) : value;
            const stringifier = stringifiers[key] || wildcardStringifier;
            switch(typeof value){
                case 'undefined':
                case 'function':
                    continue;
                case 'number':
                    /* eslint no-fallthrough: "off" */ if (Number.isFinite(value) === false) value = null;
                // this case explicitly falls through to the next one
                case 'boolean':
                    if (stringifier) value = stringifier(value);
                    break;
                case 'string':
                    value = (stringifier || $07c42eb2bd77cacc$var$asString)(value);
                    break;
                default:
                    value = (stringifier || stringify)(value);
            }
            if (value === undefined) continue;
            data += ',"' + key + '":' + value;
        }
    }
    return data + end;
}
function $07c42eb2bd77cacc$var$asChindings(instance, bindings) {
    let value;
    let data = instance[$07c42eb2bd77cacc$require$chindingsSym];
    const stringify = instance[$07c42eb2bd77cacc$require$stringifySym];
    const stringifiers = instance[$07c42eb2bd77cacc$require$stringifiersSym];
    const wildcardStringifier = stringifiers[$07c42eb2bd77cacc$require$wildcardFirstSym];
    const serializers = instance[$07c42eb2bd77cacc$require$serializersSym];
    const formatter = instance[$07c42eb2bd77cacc$require$formattersSym].bindings;
    bindings = formatter(bindings);
    for(const key in bindings){
        value = bindings[key];
        const valid = key !== 'level' && key !== 'serializers' && key !== 'formatters' && key !== 'customLevels' && bindings.hasOwnProperty(key) && value !== undefined;
        if (valid === true) {
            value = serializers[key] ? serializers[key](value) : value;
            value = (stringifiers[key] || wildcardStringifier || stringify)(value);
            if (value === undefined) continue;
            data += ',"' + key + '":' + value;
        }
    }
    return data;
}


function $07c42eb2bd77cacc$var$getPrettyStream(opts, prettifier, dest, instance) {
    if (prettifier && typeof prettifier === 'function') {
        prettifier = prettifier.bind(instance);
        return $07c42eb2bd77cacc$var$prettifierMetaWrapper(prettifier(opts), dest, opts);
    }
    try {
        const prettyFactory = (parcelRequire("2POzU")).prettyFactory || (parcelRequire("2POzU"));
        prettyFactory.asMetaWrapper = $07c42eb2bd77cacc$var$prettifierMetaWrapper;
        return $07c42eb2bd77cacc$var$prettifierMetaWrapper(prettyFactory(opts), dest, opts);
    } catch (e) {
        if (e.message.startsWith("Cannot find module 'pino-pretty'")) throw Error('Missing `pino-pretty` module: `pino-pretty` must be installed separately');
        throw e;
    }
}
function $07c42eb2bd77cacc$var$prettifierMetaWrapper(pretty, dest, opts) {
    opts = Object.assign({
        suppressFlushSyncWarning: false
    }, opts);
    let warned = false;
    return {
        [$07c42eb2bd77cacc$require$needsMetadataGsym]: true,
        lastLevel: 0,
        lastMsg: null,
        lastObj: null,
        lastLogger: null,
        flushSync () {
            if (opts.suppressFlushSyncWarning || warned) return;
            warned = true;
            $07c42eb2bd77cacc$var$setMetadataProps(dest, this);
            dest.write(pretty(Object.assign({
                level: 40,
                msg: 'pino.final with prettyPrint does not support flushing',
                time: Date.now()
            }, this.chindings())));
        },
        chindings () {
            const lastLogger = this.lastLogger;
            let chindings = null;
            // protection against flushSync being called before logging
            // anything
            if (!lastLogger) return null;
            if (lastLogger.hasOwnProperty($07c42eb2bd77cacc$require$parsedChindingsSym)) chindings = lastLogger[$07c42eb2bd77cacc$require$parsedChindingsSym];
            else {
                chindings = JSON.parse('{' + lastLogger[$07c42eb2bd77cacc$require$chindingsSym].substr(1) + '}');
                lastLogger[$07c42eb2bd77cacc$require$parsedChindingsSym] = chindings;
            }
            return chindings;
        },
        write (chunk) {
            const lastLogger = this.lastLogger;
            const chindings = this.chindings();
            let time = this.lastTime;
            if (time.match(/^\d+/)) time = parseInt(time);
            else time = time.slice(1, -1);
            const lastObj = this.lastObj;
            const lastMsg = this.lastMsg;
            const errorProps = null;
            const formatters = lastLogger[$07c42eb2bd77cacc$require$formattersSym];
            const formattedObj = formatters.log ? formatters.log(lastObj) : lastObj;
            const messageKey = lastLogger[$07c42eb2bd77cacc$require$messageKeySym];
            if (lastMsg && formattedObj && !formattedObj.hasOwnProperty(messageKey)) formattedObj[messageKey] = lastMsg;
            const obj = Object.assign({
                level: this.lastLevel,
                time: time
            }, formattedObj, errorProps);
            const serializers = lastLogger[$07c42eb2bd77cacc$require$serializersSym];
            const keys = Object.keys(serializers);
            for(var i = 0; i < keys.length; i++){
                const key = keys[i];
                if (obj[key] !== undefined) obj[key] = serializers[key](obj[key]);
            }
            for(const key in chindings)if (!obj.hasOwnProperty(key)) obj[key] = chindings[key];
            const stringifiers = lastLogger[$07c42eb2bd77cacc$require$stringifiersSym];
            const redact = stringifiers[$07c42eb2bd77cacc$require$redactFmtSym];
            const formatted = pretty(typeof redact === 'function' ? redact(obj) : obj);
            if (formatted === undefined) return;
            $07c42eb2bd77cacc$var$setMetadataProps(dest, this);
            dest.write(formatted);
        }
    };
}
function $07c42eb2bd77cacc$var$hasBeenTampered(stream) {
    return stream.write !== stream.constructor.prototype.write;
}
function $07c42eb2bd77cacc$var$buildSafeSonicBoom(opts) {
    const stream = new $db2Nf(opts);
    stream.on('error', filterBrokenPipe);
    function filterBrokenPipe(err) {
        // TODO verify on Windows
        if (err.code === 'EPIPE') {
            // If we get EPIPE, we should stop logging here
            // however we have no control to the consumer of
            // SonicBoom, so we just overwrite the write method
            stream.write = $07c42eb2bd77cacc$var$noop;
            stream.end = $07c42eb2bd77cacc$var$noop;
            stream.flushSync = $07c42eb2bd77cacc$var$noop;
            stream.destroy = $07c42eb2bd77cacc$var$noop;
            return;
        }
        stream.removeListener('error', filterBrokenPipe);
        stream.emit('error', err);
    }
    return stream;
}
function $07c42eb2bd77cacc$var$createArgsNormalizer(defaultOptions) {
    return function normalizeArgs(instance, opts = {
    }, stream) {
        // support stream as a string
        if (typeof opts === 'string') {
            stream = $07c42eb2bd77cacc$var$buildSafeSonicBoom({
                dest: opts,
                sync: true
            });
            opts = {
            };
        } else if (typeof stream === 'string') stream = $07c42eb2bd77cacc$var$buildSafeSonicBoom({
            dest: stream,
            sync: true
        });
        else if (opts instanceof $db2Nf || opts.writable || opts._writableState) {
            stream = opts;
            opts = null;
        }
        opts = Object.assign({
        }, defaultOptions, opts);
        if ('extreme' in opts) throw Error('The extreme option has been removed, use pino.destination({ sync: false }) instead');
        if ('onTerminated' in opts) throw Error('The onTerminated option has been removed, use pino.final instead');
        if ('changeLevelName' in opts) {
            process.emitWarning('The changeLevelName option is deprecated and will be removed in v7. Use levelKey instead.', {
                code: 'changeLevelName_deprecation'
            });
            opts.levelKey = opts.changeLevelName;
            delete opts.changeLevelName;
        }
        const { enabled: enabled , prettyPrint: prettyPrint , prettifier: prettifier , messageKey: messageKey  } = opts;
        if (enabled === false) opts.level = 'silent';
        stream = stream || process.stdout;
        if (stream === process.stdout && stream.fd >= 0 && !$07c42eb2bd77cacc$var$hasBeenTampered(stream)) stream = $07c42eb2bd77cacc$var$buildSafeSonicBoom({
            fd: stream.fd,
            sync: true
        });
        if (prettyPrint) {
            const prettyOpts = Object.assign({
                messageKey: messageKey
            }, prettyPrint);
            stream = $07c42eb2bd77cacc$var$getPrettyStream(prettyOpts, prettifier, stream, instance);
        }
        return {
            opts: opts,
            stream: stream
        };
    };
}
function $07c42eb2bd77cacc$var$final(logger, handler) {
    if (typeof logger === 'undefined' || typeof logger.child !== 'function') throw Error('expected a pino logger instance');
    const hasHandler = typeof handler !== 'undefined';
    if (hasHandler && typeof handler !== 'function') throw Error('if supplied, the handler parameter should be a function');
    const stream = logger[$07c42eb2bd77cacc$require$streamSym];
    if (typeof stream.flushSync !== 'function') throw Error('final requires a stream that has a flushSync method, such as pino.destination');
    const finalLogger = new Proxy(logger, {
        get: (logger, key)=>{
            if (key in logger.levels.values) return (...args)=>{
                logger[key](...args);
                stream.flushSync();
            };
            return logger[key];
        }
    });
    if (!hasHandler) return finalLogger;
    return (err = null, ...args)=>{
        try {
            stream.flushSync();
        } catch (e) {
        // it's too late to wait for the stream to be ready
        // because this is a final tick scenario.
        // in practice there shouldn't be a situation where it isn't
        // however, swallow the error just in case (and for easier testing)
        }
        return handler(err, finalLogger, ...args);
    };
}
function $07c42eb2bd77cacc$var$stringify(obj) {
    try {
        return JSON.stringify(obj);
    } catch (_) {
        return $9GdXI(obj);
    }
}
function $07c42eb2bd77cacc$var$buildFormatters(level, bindings, log) {
    return {
        level: level,
        bindings: bindings,
        log: log
    };
}
function $07c42eb2bd77cacc$var$setMetadataProps(dest, that) {
    if (dest[$07c42eb2bd77cacc$require$needsMetadataGsym] === true) {
        dest.lastLevel = that.lastLevel;
        dest.lastMsg = that.lastMsg;
        dest.lastObj = that.lastObj;
        dest.lastTime = that.lastTime;
        dest.lastLogger = that.lastLogger;
    }
}
module.exports = {
    noop: $07c42eb2bd77cacc$var$noop,
    buildSafeSonicBoom: $07c42eb2bd77cacc$var$buildSafeSonicBoom,
    getPrettyStream: $07c42eb2bd77cacc$var$getPrettyStream,
    asChindings: $07c42eb2bd77cacc$var$asChindings,
    asJson: $07c42eb2bd77cacc$var$asJson,
    genLog: $07c42eb2bd77cacc$var$genLog,
    createArgsNormalizer: $07c42eb2bd77cacc$var$createArgsNormalizer,
    final: $07c42eb2bd77cacc$var$final,
    stringify: $07c42eb2bd77cacc$var$stringify,
    buildFormatters: $07c42eb2bd77cacc$var$buildFormatters
};

});
parcelRequire.register("hMYKT", function(module, exports) {
'use strict';
function $cf360c1981bdc3f7$var$tryStringify(o) {
    try {
        return JSON.stringify(o);
    } catch (e) {
        return '"[Circular]"';
    }
}
module.exports = $cf360c1981bdc3f7$var$format;
function $cf360c1981bdc3f7$var$format(f, args, opts) {
    var ss = opts && opts.stringify || $cf360c1981bdc3f7$var$tryStringify;
    var offset = 1;
    if (typeof f === 'object' && f !== null) {
        var len = args.length + offset;
        if (len === 1) return f;
        var objects = new Array(len);
        objects[0] = ss(f);
        for(var index = 1; index < len; index++)objects[index] = ss(args[index]);
        return objects.join(' ');
    }
    if (typeof f !== 'string') return f;
    var argLen = args.length;
    if (argLen === 0) return f;
    var str = '';
    var a = 1 - offset;
    var lastPos = -1;
    var flen = f && f.length || 0;
    for(var i = 0; i < flen;){
        if (f.charCodeAt(i) === 37 && i + 1 < flen) {
            lastPos = lastPos > -1 ? lastPos : 0;
            switch(f.charCodeAt(i + 1)){
                case 100:
                case 102:
                    if (a >= argLen) break;
                    if (args[a] == null) break;
                    if (lastPos < i) str += f.slice(lastPos, i);
                    str += Number(args[a]);
                    lastPos = i + 2;
                    i++;
                    break;
                case 105:
                    if (a >= argLen) break;
                    if (args[a] == null) break;
                    if (lastPos < i) str += f.slice(lastPos, i);
                    str += Math.floor(Number(args[a]));
                    lastPos = i + 2;
                    i++;
                    break;
                case 79:
                case 111:
                case 106:
                    if (a >= argLen) break;
                    if (args[a] === undefined) break;
                    if (lastPos < i) str += f.slice(lastPos, i);
                    var type = typeof args[a];
                    if (type === 'string') {
                        str += '\'' + args[a] + '\'';
                        lastPos = i + 2;
                        i++;
                        break;
                    }
                    if (type === 'function') {
                        str += args[a].name || '<anonymous>';
                        lastPos = i + 2;
                        i++;
                        break;
                    }
                    str += ss(args[a]);
                    lastPos = i + 2;
                    i++;
                    break;
                case 115:
                    if (a >= argLen) break;
                    if (lastPos < i) str += f.slice(lastPos, i);
                    str += String(args[a]);
                    lastPos = i + 2;
                    i++;
                    break;
                case 37:
                    if (lastPos < i) str += f.slice(lastPos, i);
                    str += '%';
                    lastPos = i + 2;
                    i++;
                    a--;
                    break;
            }
            ++a;
        }
        ++i;
    }
    if (lastPos === -1) return f;
    else if (lastPos < flen) str += f.slice(lastPos);
    return str;
}

});

parcelRequire.register("9GdXI", function(module, exports) {
module.exports = $70c2dde5dcad0348$var$stringify;
$70c2dde5dcad0348$var$stringify.default = $70c2dde5dcad0348$var$stringify;
$70c2dde5dcad0348$var$stringify.stable = $70c2dde5dcad0348$var$deterministicStringify;
$70c2dde5dcad0348$var$stringify.stableStringify = $70c2dde5dcad0348$var$deterministicStringify;
var $70c2dde5dcad0348$var$LIMIT_REPLACE_NODE = '[...]';
var $70c2dde5dcad0348$var$CIRCULAR_REPLACE_NODE = '[Circular]';
var $70c2dde5dcad0348$var$arr = [];
var $70c2dde5dcad0348$var$replacerStack = [];
function $70c2dde5dcad0348$var$defaultOptions() {
    return {
        depthLimit: Number.MAX_SAFE_INTEGER,
        edgesLimit: Number.MAX_SAFE_INTEGER
    };
}
// Regular stringify
function $70c2dde5dcad0348$var$stringify(obj, replacer, spacer, options) {
    if (typeof options === 'undefined') options = $70c2dde5dcad0348$var$defaultOptions();
    $70c2dde5dcad0348$var$decirc(obj, '', 0, [], undefined, 0, options);
    var res;
    try {
        if ($70c2dde5dcad0348$var$replacerStack.length === 0) res = JSON.stringify(obj, replacer, spacer);
        else res = JSON.stringify(obj, $70c2dde5dcad0348$var$replaceGetterValues(replacer), spacer);
    } catch (_) {
        return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]');
    } finally{
        while($70c2dde5dcad0348$var$arr.length !== 0){
            var part = $70c2dde5dcad0348$var$arr.pop();
            if (part.length === 4) Object.defineProperty(part[0], part[1], part[3]);
            else part[0][part[1]] = part[2];
        }
    }
    return res;
}
function $70c2dde5dcad0348$var$setReplace(replace, val, k, parent) {
    var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k);
    if (propertyDescriptor.get !== undefined) {
        if (propertyDescriptor.configurable) {
            Object.defineProperty(parent, k, {
                value: replace
            });
            $70c2dde5dcad0348$var$arr.push([
                parent,
                k,
                val,
                propertyDescriptor
            ]);
        } else $70c2dde5dcad0348$var$replacerStack.push([
            val,
            k,
            replace
        ]);
    } else {
        parent[k] = replace;
        $70c2dde5dcad0348$var$arr.push([
            parent,
            k,
            val
        ]);
    }
}
function $70c2dde5dcad0348$var$decirc(val, k, edgeIndex, stack, parent, depth, options) {
    depth += 1;
    var i;
    if (typeof val === 'object' && val !== null) {
        for(i = 0; i < stack.length; i++)if (stack[i] === val) {
            $70c2dde5dcad0348$var$setReplace($70c2dde5dcad0348$var$CIRCULAR_REPLACE_NODE, val, k, parent);
            return;
        }
        if (typeof options.depthLimit !== 'undefined' && depth > options.depthLimit) {
            $70c2dde5dcad0348$var$setReplace($70c2dde5dcad0348$var$LIMIT_REPLACE_NODE, val, k, parent);
            return;
        }
        if (typeof options.edgesLimit !== 'undefined' && edgeIndex + 1 > options.edgesLimit) {
            $70c2dde5dcad0348$var$setReplace($70c2dde5dcad0348$var$LIMIT_REPLACE_NODE, val, k, parent);
            return;
        }
        stack.push(val);
        // Optimize for Arrays. Big arrays could kill the performance otherwise!
        if (Array.isArray(val)) for(i = 0; i < val.length; i++)$70c2dde5dcad0348$var$decirc(val[i], i, i, stack, val, depth, options);
        else {
            var keys = Object.keys(val);
            for(i = 0; i < keys.length; i++){
                var key = keys[i];
                $70c2dde5dcad0348$var$decirc(val[key], key, i, stack, val, depth, options);
            }
        }
        stack.pop();
    }
}
// Stable-stringify
function $70c2dde5dcad0348$var$compareFunction(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}
function $70c2dde5dcad0348$var$deterministicStringify(obj, replacer, spacer, options) {
    if (typeof options === 'undefined') options = $70c2dde5dcad0348$var$defaultOptions();
    var tmp = $70c2dde5dcad0348$var$deterministicDecirc(obj, '', 0, [], undefined, 0, options) || obj;
    var res;
    try {
        if ($70c2dde5dcad0348$var$replacerStack.length === 0) res = JSON.stringify(tmp, replacer, spacer);
        else res = JSON.stringify(tmp, $70c2dde5dcad0348$var$replaceGetterValues(replacer), spacer);
    } catch (_) {
        return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]');
    } finally{
        // Ensure that we restore the object as it was.
        while($70c2dde5dcad0348$var$arr.length !== 0){
            var part = $70c2dde5dcad0348$var$arr.pop();
            if (part.length === 4) Object.defineProperty(part[0], part[1], part[3]);
            else part[0][part[1]] = part[2];
        }
    }
    return res;
}
function $70c2dde5dcad0348$var$deterministicDecirc(val, k, edgeIndex, stack, parent, depth, options) {
    depth += 1;
    var i;
    if (typeof val === 'object' && val !== null) {
        for(i = 0; i < stack.length; i++)if (stack[i] === val) {
            $70c2dde5dcad0348$var$setReplace($70c2dde5dcad0348$var$CIRCULAR_REPLACE_NODE, val, k, parent);
            return;
        }
        try {
            if (typeof val.toJSON === 'function') return;
        } catch (_) {
            return;
        }
        if (typeof options.depthLimit !== 'undefined' && depth > options.depthLimit) {
            $70c2dde5dcad0348$var$setReplace($70c2dde5dcad0348$var$LIMIT_REPLACE_NODE, val, k, parent);
            return;
        }
        if (typeof options.edgesLimit !== 'undefined' && edgeIndex + 1 > options.edgesLimit) {
            $70c2dde5dcad0348$var$setReplace($70c2dde5dcad0348$var$LIMIT_REPLACE_NODE, val, k, parent);
            return;
        }
        stack.push(val);
        // Optimize for Arrays. Big arrays could kill the performance otherwise!
        if (Array.isArray(val)) for(i = 0; i < val.length; i++)$70c2dde5dcad0348$var$deterministicDecirc(val[i], i, i, stack, val, depth, options);
        else {
            // Create a temporary object in the required way
            var tmp = {
            };
            var keys = Object.keys(val).sort($70c2dde5dcad0348$var$compareFunction);
            for(i = 0; i < keys.length; i++){
                var key = keys[i];
                $70c2dde5dcad0348$var$deterministicDecirc(val[key], key, i, stack, val, depth, options);
                tmp[key] = val[key];
            }
            if (typeof parent !== 'undefined') {
                $70c2dde5dcad0348$var$arr.push([
                    parent,
                    k,
                    val
                ]);
                parent[k] = tmp;
            } else return tmp;
        }
        stack.pop();
    }
}
// wraps replacer function to handle values we couldn't replace
// and mark them as replaced value
function $70c2dde5dcad0348$var$replaceGetterValues(replacer) {
    replacer = typeof replacer !== 'undefined' ? replacer : function(k, v) {
        return v;
    };
    return function(key, val) {
        if ($70c2dde5dcad0348$var$replacerStack.length > 0) for(var i = 0; i < $70c2dde5dcad0348$var$replacerStack.length; i++){
            var part = $70c2dde5dcad0348$var$replacerStack[i];
            if (part[1] === key && part[0] === val) {
                val = part[2];
                $70c2dde5dcad0348$var$replacerStack.splice(i, 1);
                break;
            }
        }
        return replacer.call(this, key, val);
    };
}

});

parcelRequire.register("2POzU", function(module, exports) {
'use strict';

var $kW85a = parcelRequire("kW85a");
var $210793f872389031$require$isColorSupported = $kW85a.isColorSupported;

var $jkwbQ = parcelRequire("jkwbQ");

var $j7izJ = parcelRequire("j7izJ");
var $210793f872389031$require$Transform = $j7izJ.Transform;

var $3mY9x = parcelRequire("3mY9x");

var $69d51 = parcelRequire("69d51");

var $JKNWV = parcelRequire("JKNWV");

var $2jkFg = parcelRequire("2jkFg");

var $lD9Y8 = parcelRequire("lD9Y8");
var $210793f872389031$require$ERROR_LIKE_KEYS = $lD9Y8.ERROR_LIKE_KEYS;
var $210793f872389031$require$MESSAGE_KEY = $lD9Y8.MESSAGE_KEY;
var $210793f872389031$require$TIMESTAMP_KEY = $lD9Y8.TIMESTAMP_KEY;
var $210793f872389031$require$LEVEL_KEY = $lD9Y8.LEVEL_KEY;
var $210793f872389031$require$LEVEL_NAMES = $lD9Y8.LEVEL_NAMES;

var $fFSTk = parcelRequire("fFSTk");
var $210793f872389031$require$isObject = $fFSTk.isObject;
var $210793f872389031$require$prettifyErrorLog = $fFSTk.prettifyErrorLog;
var $210793f872389031$require$prettifyLevel = $fFSTk.prettifyLevel;
var $210793f872389031$require$prettifyMessage = $fFSTk.prettifyMessage;
var $210793f872389031$require$prettifyMetadata = $fFSTk.prettifyMetadata;
var $210793f872389031$require$prettifyObject = $fFSTk.prettifyObject;
var $210793f872389031$require$prettifyTime = $fFSTk.prettifyTime;
var $210793f872389031$require$filterLog = $fFSTk.filterLog;
const $210793f872389031$var$jsonParser = (input)=>{
    try {
        return {
            value: $JKNWV.parse(input, {
                protoAction: 'remove'
            })
        };
    } catch (err) {
        return {
            err: err
        };
    }
};
const $210793f872389031$var$defaultOptions = {
    colorize: $210793f872389031$require$isColorSupported,
    crlf: false,
    errorLikeObjectKeys: $210793f872389031$require$ERROR_LIKE_KEYS,
    errorProps: '',
    levelFirst: false,
    messageKey: $210793f872389031$require$MESSAGE_KEY,
    messageFormat: false,
    timestampKey: $210793f872389031$require$TIMESTAMP_KEY,
    translateTime: false,
    useMetadata: false,
    outputStream: process.stdout,
    customPrettifiers: {
    },
    hideObject: false,
    singleLine: false
};
function $210793f872389031$var$prettyFactory(options) {
    const opts = Object.assign({
    }, $210793f872389031$var$defaultOptions, options);
    const EOL = opts.crlf ? '\r\n' : '\n';
    const IDENT = '    ';
    const messageKey = opts.messageKey;
    const levelKey = opts.levelKey;
    const levelLabel = opts.levelLabel;
    const minimumLevel = opts.minimumLevel;
    const messageFormat = opts.messageFormat;
    const timestampKey = opts.timestampKey;
    const errorLikeObjectKeys = opts.errorLikeObjectKeys;
    const errorProps = opts.errorProps.split(',');
    const customPrettifiers = opts.customPrettifiers;
    const ignoreKeys = opts.ignore ? new Set(opts.ignore.split(',')) : undefined;
    const hideObject = opts.hideObject;
    const singleLine = opts.singleLine;
    const colorizer = $2jkFg(opts.colorize);
    function pretty(inputData) {
        let log;
        if (!$210793f872389031$require$isObject(inputData)) {
            const parsed = $210793f872389031$var$jsonParser(inputData);
            if (parsed.err || !$210793f872389031$require$isObject(parsed.value)) {
                // pass through
                return inputData + EOL;
            }
            log = parsed.value;
        } else {
            log = inputData;
        }
        if (minimumLevel) {
            const minimum = $210793f872389031$require$LEVEL_NAMES[minimumLevel] || Number(minimumLevel);
            const level = log[levelKey === undefined ? $210793f872389031$require$LEVEL_KEY : levelKey];
            if (level < minimum) return;
        }
        const prettifiedMessage = $210793f872389031$require$prettifyMessage({
            log: log,
            messageKey: messageKey,
            colorizer: colorizer,
            messageFormat: messageFormat,
            levelLabel: levelLabel
        });
        if (ignoreKeys) {
            log = $210793f872389031$require$filterLog(log, ignoreKeys);
        }
        const prettifiedLevel = $210793f872389031$require$prettifyLevel({
            log: log,
            colorizer: colorizer,
            levelKey: levelKey
        });
        const prettifiedMetadata = $210793f872389031$require$prettifyMetadata({
            log: log
        });
        const prettifiedTime = $210793f872389031$require$prettifyTime({
            log: log,
            translateFormat: opts.translateTime,
            timestampKey: timestampKey
        });
        let line = '';
        if (opts.levelFirst && prettifiedLevel) {
            line = `${prettifiedLevel}`;
        }
        if (prettifiedTime && line === '') {
            line = `${prettifiedTime}`;
        } else if (prettifiedTime) {
            line = `${line} ${prettifiedTime}`;
        }
        if (!opts.levelFirst && prettifiedLevel) {
            if (line.length > 0) {
                line = `${line} ${prettifiedLevel}`;
            } else {
                line = prettifiedLevel;
            }
        }
        if (prettifiedMetadata) {
            if (line.length > 0) {
                line = `${line} ${prettifiedMetadata}:`;
            } else {
                line = prettifiedMetadata;
            }
        }
        if (line.endsWith(':') === false && line !== '') {
            line += ':';
        }
        if (prettifiedMessage) {
            if (line.length > 0) {
                line = `${line} ${prettifiedMessage}`;
            } else {
                line = prettifiedMessage;
            }
        }
        if (line.length > 0 && !singleLine) {
            line += EOL;
        }
        // pino@7+ does not log this anymore
        if (log.type === 'Error' && log.stack) {
            const prettifiedErrorLog = $210793f872389031$require$prettifyErrorLog({
                log: log,
                errorLikeKeys: errorLikeObjectKeys,
                errorProperties: errorProps,
                ident: IDENT,
                eol: EOL
            });
            line += prettifiedErrorLog;
        } else if (!hideObject) {
            const skipKeys = [
                messageKey,
                levelKey,
                timestampKey
            ].filter((key)=>typeof log[key] === 'string' || typeof log[key] === 'number'
            );
            const prettifiedObject = $210793f872389031$require$prettifyObject({
                input: log,
                skipKeys: skipKeys,
                customPrettifiers: customPrettifiers,
                errorLikeKeys: errorLikeObjectKeys,
                eol: EOL,
                ident: IDENT,
                singleLine: singleLine,
                colorizer: colorizer
            });
            // In single line mode, include a space only if prettified version isn't empty
            if (singleLine && !/^\s$/.test(prettifiedObject)) {
                line += ' ';
            }
            line += prettifiedObject;
        }
        return line;
    }
    return pretty;
}
function $210793f872389031$var$build(opts = {
}) {
    const pretty = $210793f872389031$var$prettyFactory(opts);
    return $3mY9x(function(source) {
        const stream = new $210793f872389031$require$Transform({
            objectMode: true,
            autoDestroy: true,
            transform (chunk, enc, cb) {
                const line = pretty(chunk);
                cb(null, line);
            }
        });
        const destination = $69d51({
            dest: opts.destination || 1,
            sync: false
        });
        /* istanbul ignore else */ if (destination.fd === 1) // We cannot close the output
        destination.end = function() {
            this.emit('close');
        };
        source.on('unknown', function(line) {
            destination.write(line + '\n');
        });
        $jkwbQ(source, stream, destination);
        return stream;
    }, {
        parse: 'lines'
    });
}
module.exports = $210793f872389031$var$build;
module.exports.prettyFactory = $210793f872389031$var$prettyFactory;
module.exports.default = $210793f872389031$var$build;

});
parcelRequire.register("kW85a", function(module, exports) {

$parcel$export(module.exports, "isColorSupported", () => $f3df7e6d496d55a2$export$ba7eaac21c385de8);
$parcel$export(module.exports, "createColors", () => $f3df7e6d496d55a2$export$fc3cc093e161d064);

const $f3df7e6d496d55a2$var$env = process.env || {
};
const $f3df7e6d496d55a2$var$argv = process.argv || [];
const $f3df7e6d496d55a2$var$isDisabled = "NO_COLOR" in $f3df7e6d496d55a2$var$env || $f3df7e6d496d55a2$var$argv.includes("--no-color");
const $f3df7e6d496d55a2$var$isForced = "FORCE_COLOR" in $f3df7e6d496d55a2$var$env || $f3df7e6d496d55a2$var$argv.includes("--color");
const $f3df7e6d496d55a2$var$isWindows = process.platform === "win32";
const $f3df7e6d496d55a2$var$isCompatibleTerminal = $lEd20$tty && $lEd20$tty.isatty && $lEd20$tty.isatty(1) && $f3df7e6d496d55a2$var$env.TERM && $f3df7e6d496d55a2$var$env.TERM !== "dumb";
const $f3df7e6d496d55a2$var$isCI = "CI" in $f3df7e6d496d55a2$var$env && ("GITHUB_ACTIONS" in $f3df7e6d496d55a2$var$env || "GITLAB_CI" in $f3df7e6d496d55a2$var$env || "CIRCLECI" in $f3df7e6d496d55a2$var$env);
const $f3df7e6d496d55a2$export$ba7eaac21c385de8 = !$f3df7e6d496d55a2$var$isDisabled && ($f3df7e6d496d55a2$var$isForced || $f3df7e6d496d55a2$var$isWindows || $f3df7e6d496d55a2$var$isCompatibleTerminal || $f3df7e6d496d55a2$var$isCI);
const $f3df7e6d496d55a2$var$replaceClose = (index, string, close, replace, head = string.substring(0, index) + replace, tail = string.substring(index + close.length), next = tail.indexOf(close))=>head + (next < 0 ? tail : $f3df7e6d496d55a2$var$replaceClose(next, tail, close, replace))
;
const $f3df7e6d496d55a2$var$clearBleed = (index, string, open, close, replace)=>index < 0 ? open + string + close : open + $f3df7e6d496d55a2$var$replaceClose(index, string, close, replace) + close
;
const $f3df7e6d496d55a2$var$filterEmpty = (open, close, replace = open, at = open.length + 1)=>(string)=>string || !(string === "" || string === undefined) ? $f3df7e6d496d55a2$var$clearBleed(("" + string).indexOf(close, at), string, open, close, replace) : ""
;
const $f3df7e6d496d55a2$var$init = (open, close, replace)=>$f3df7e6d496d55a2$var$filterEmpty(`\x1b[${open}m`, `\x1b[${close}m`, replace)
;
const $f3df7e6d496d55a2$var$colors = {
    reset: $f3df7e6d496d55a2$var$init(0, 0),
    bold: $f3df7e6d496d55a2$var$init(1, 22, "\x1b[22m\x1b[1m"),
    dim: $f3df7e6d496d55a2$var$init(2, 22, "\x1b[22m\x1b[2m"),
    italic: $f3df7e6d496d55a2$var$init(3, 23),
    underline: $f3df7e6d496d55a2$var$init(4, 24),
    inverse: $f3df7e6d496d55a2$var$init(7, 27),
    hidden: $f3df7e6d496d55a2$var$init(8, 28),
    strikethrough: $f3df7e6d496d55a2$var$init(9, 29),
    black: $f3df7e6d496d55a2$var$init(30, 39),
    red: $f3df7e6d496d55a2$var$init(31, 39),
    green: $f3df7e6d496d55a2$var$init(32, 39),
    yellow: $f3df7e6d496d55a2$var$init(33, 39),
    blue: $f3df7e6d496d55a2$var$init(34, 39),
    magenta: $f3df7e6d496d55a2$var$init(35, 39),
    cyan: $f3df7e6d496d55a2$var$init(36, 39),
    white: $f3df7e6d496d55a2$var$init(37, 39),
    gray: $f3df7e6d496d55a2$var$init(90, 39),
    bgBlack: $f3df7e6d496d55a2$var$init(40, 49),
    bgRed: $f3df7e6d496d55a2$var$init(41, 49),
    bgGreen: $f3df7e6d496d55a2$var$init(42, 49),
    bgYellow: $f3df7e6d496d55a2$var$init(43, 49),
    bgBlue: $f3df7e6d496d55a2$var$init(44, 49),
    bgMagenta: $f3df7e6d496d55a2$var$init(45, 49),
    bgCyan: $f3df7e6d496d55a2$var$init(46, 49),
    bgWhite: $f3df7e6d496d55a2$var$init(47, 49),
    blackBright: $f3df7e6d496d55a2$var$init(90, 39),
    redBright: $f3df7e6d496d55a2$var$init(91, 39),
    greenBright: $f3df7e6d496d55a2$var$init(92, 39),
    yellowBright: $f3df7e6d496d55a2$var$init(93, 39),
    blueBright: $f3df7e6d496d55a2$var$init(94, 39),
    magentaBright: $f3df7e6d496d55a2$var$init(95, 39),
    cyanBright: $f3df7e6d496d55a2$var$init(96, 39),
    whiteBright: $f3df7e6d496d55a2$var$init(97, 39),
    bgBlackBright: $f3df7e6d496d55a2$var$init(100, 49),
    bgRedBright: $f3df7e6d496d55a2$var$init(101, 49),
    bgGreenBright: $f3df7e6d496d55a2$var$init(102, 49),
    bgYellowBright: $f3df7e6d496d55a2$var$init(103, 49),
    bgBlueBright: $f3df7e6d496d55a2$var$init(104, 49),
    bgMagentaBright: $f3df7e6d496d55a2$var$init(105, 49),
    bgCyanBright: $f3df7e6d496d55a2$var$init(106, 49),
    bgWhiteBright: $f3df7e6d496d55a2$var$init(107, 49)
};
const $f3df7e6d496d55a2$var$none = (any)=>any
;
const $f3df7e6d496d55a2$export$fc3cc093e161d064 = ({ useColor: useColor = $f3df7e6d496d55a2$export$ba7eaac21c385de8  } = {
})=>useColor ? $f3df7e6d496d55a2$var$colors : Object.keys($f3df7e6d496d55a2$var$colors).reduce((colors, key)=>({
            ...colors,
            [key]: $f3df7e6d496d55a2$var$none
        })
    , {
    })
;
const { reset: $f3df7e6d496d55a2$export$aad8462122ac592b , bold: $f3df7e6d496d55a2$export$73ba5813cda80a49 , dim: $f3df7e6d496d55a2$export$c96e90b4bcb7d4ca , italic: $f3df7e6d496d55a2$export$5540da1282cbf565 , underline: $f3df7e6d496d55a2$export$425327af25286e5e , inverse: $f3df7e6d496d55a2$export$70ae2c07e401031b , hidden: $f3df7e6d496d55a2$export$73920f18ca706874 , strikethrough: $f3df7e6d496d55a2$export$19426ff118fe8be , black: $f3df7e6d496d55a2$export$c073df10e766abfa , red: $f3df7e6d496d55a2$export$a90204d1394caf30 , green: $f3df7e6d496d55a2$export$955a2ebd2fb142ae , yellow: $f3df7e6d496d55a2$export$594c5a8758200c32 , blue: $f3df7e6d496d55a2$export$2aa0182783e7e9de , magenta: $f3df7e6d496d55a2$export$2a9ca2e383622e18 , cyan: $f3df7e6d496d55a2$export$7474046f446842ee , white: $f3df7e6d496d55a2$export$8fa4e5556fd77a60 , gray: $f3df7e6d496d55a2$export$3e2c219d3ab79d01 , bgBlack: $f3df7e6d496d55a2$export$a91ca5b79f5fb26c , bgRed: $f3df7e6d496d55a2$export$74a89e4512e7c91 , bgGreen: $f3df7e6d496d55a2$export$8137d14243d019b3 , bgYellow: $f3df7e6d496d55a2$export$3d3dcf8beff00fe1 , bgBlue: $f3df7e6d496d55a2$export$ec69fb4048854b4 , bgMagenta: $f3df7e6d496d55a2$export$76507b7995de3038 , bgCyan: $f3df7e6d496d55a2$export$1b1236a85ae1b824 , bgWhite: $f3df7e6d496d55a2$export$2fbae6ef3123e0b0 , blackBright: $f3df7e6d496d55a2$export$c442bbc3ef058f3e , redBright: $f3df7e6d496d55a2$export$6f940151fac4d6e4 , greenBright: $f3df7e6d496d55a2$export$9e103086f7204459 , yellowBright: $f3df7e6d496d55a2$export$106f17ac3545b17c , blueBright: $f3df7e6d496d55a2$export$7aa4c9ef25eb1086 , magentaBright: $f3df7e6d496d55a2$export$76b6abffe88e3179 , cyanBright: $f3df7e6d496d55a2$export$c609d1d25ac1cc71 , whiteBright: $f3df7e6d496d55a2$export$38b81c3a7de495d7 , bgBlackBright: $f3df7e6d496d55a2$export$5c9c56f63b47e15b , bgRedBright: $f3df7e6d496d55a2$export$26735259ab854b4f , bgGreenBright: $f3df7e6d496d55a2$export$d5483c19744b2fc2 , bgYellowBright: $f3df7e6d496d55a2$export$f8c17ad4aac14a99 , bgBlueBright: $f3df7e6d496d55a2$export$6038eb5fdc315c12 , bgMagentaBright: $f3df7e6d496d55a2$export$41148066f4812842 , bgCyanBright: $f3df7e6d496d55a2$export$eb0dc7973d30eea7 , bgWhiteBright: $f3df7e6d496d55a2$export$fde769fa8262c0d6 ,  } = $f3df7e6d496d55a2$export$fc3cc093e161d064();

});

parcelRequire.register("jkwbQ", function(module, exports) {

var $4aKZq = parcelRequire("4aKZq");

var $DEPnk = parcelRequire("DEPnk");

var $e128dad94c1cbef5$var$noop = function() {
};
var $e128dad94c1cbef5$var$ancient = /^v?\.0/.test(process.version);
var $e128dad94c1cbef5$var$isFn = function(fn) {
    return typeof fn === 'function';
};
var $e128dad94c1cbef5$var$isFS = function(stream) {
    if (!$e128dad94c1cbef5$var$ancient) return false // newer node version do not need to care about fs is a special way
    ;
    if (!$lEd20$fs) return false // browser
    ;
    return (stream instanceof ($lEd20$fs.ReadStream || $e128dad94c1cbef5$var$noop) || stream instanceof ($lEd20$fs.WriteStream || $e128dad94c1cbef5$var$noop)) && $e128dad94c1cbef5$var$isFn(stream.close);
};
var $e128dad94c1cbef5$var$isRequest = function(stream) {
    return stream.setHeader && $e128dad94c1cbef5$var$isFn(stream.abort);
};
var $e128dad94c1cbef5$var$destroyer = function(stream, reading, writing, callback) {
    callback = $4aKZq(callback);
    var closed = false;
    stream.on('close', function() {
        closed = true;
    });
    $DEPnk(stream, {
        readable: reading,
        writable: writing
    }, function(err) {
        if (err) return callback(err);
        closed = true;
        callback();
    });
    var destroyed = false;
    return function(err) {
        if (closed) return;
        if (destroyed) return;
        destroyed = true;
        if ($e128dad94c1cbef5$var$isFS(stream)) return stream.close($e128dad94c1cbef5$var$noop) // use close for fs streams to avoid fd leaks
        ;
        if ($e128dad94c1cbef5$var$isRequest(stream)) return stream.abort() // request.destroy just do .end - .abort is what we want
        ;
        if ($e128dad94c1cbef5$var$isFn(stream.destroy)) return stream.destroy();
        callback(err || new Error('stream was destroyed'));
    };
};
var $e128dad94c1cbef5$var$call = function(fn) {
    fn();
};
var $e128dad94c1cbef5$var$pipe = function(from, to) {
    return from.pipe(to);
};
var $e128dad94c1cbef5$var$pump = function() {
    var streams = Array.prototype.slice.call(arguments);
    var callback = $e128dad94c1cbef5$var$isFn(streams[streams.length - 1] || $e128dad94c1cbef5$var$noop) && streams.pop() || $e128dad94c1cbef5$var$noop;
    if (Array.isArray(streams[0])) streams = streams[0];
    if (streams.length < 2) throw new Error('pump requires two streams per minimum');
    var error;
    var destroys = streams.map(function(stream, i) {
        var reading = i < streams.length - 1;
        var writing = i > 0;
        return $e128dad94c1cbef5$var$destroyer(stream, reading, writing, function(err) {
            if (!error) error = err;
            if (err) destroys.forEach($e128dad94c1cbef5$var$call);
            if (reading) return;
            destroys.forEach($e128dad94c1cbef5$var$call);
            callback(error);
        });
    });
    return streams.reduce($e128dad94c1cbef5$var$pipe);
};
module.exports = $e128dad94c1cbef5$var$pump;

});
parcelRequire.register("4aKZq", function(module, exports) {

var $jT13G = parcelRequire("jT13G");
module.exports = $jT13G($309c8bc8aeccaeec$var$once);
module.exports.strict = $jT13G($309c8bc8aeccaeec$var$onceStrict);
$309c8bc8aeccaeec$var$once.proto = $309c8bc8aeccaeec$var$once(function() {
    Object.defineProperty(Function.prototype, 'once', {
        value: function() {
            return $309c8bc8aeccaeec$var$once(this);
        },
        configurable: true
    });
    Object.defineProperty(Function.prototype, 'onceStrict', {
        value: function() {
            return $309c8bc8aeccaeec$var$onceStrict(this);
        },
        configurable: true
    });
});
function $309c8bc8aeccaeec$var$once(fn) {
    var f = function() {
        if (f.called) return f.value;
        f.called = true;
        return f.value = fn.apply(this, arguments);
    };
    f.called = false;
    return f;
}
function $309c8bc8aeccaeec$var$onceStrict(fn) {
    var f = function() {
        if (f.called) throw new Error(f.onceError);
        f.called = true;
        return f.value = fn.apply(this, arguments);
    };
    var name = fn.name || 'Function wrapped with `once`';
    f.onceError = name + " shouldn't be called more than once";
    f.called = false;
    return f;
}

});
parcelRequire.register("jT13G", function(module, exports) {
// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = $e7a3f98c67624844$var$wrappy;
function $e7a3f98c67624844$var$wrappy(fn, cb) {
    if (fn && cb) return $e7a3f98c67624844$var$wrappy(fn)(cb);
    if (typeof fn !== 'function') throw new TypeError('need wrapper function');
    Object.keys(fn).forEach(function(k) {
        wrapper[k] = fn[k];
    });
    function wrapper() {
        var args = new Array(arguments.length);
        for(var i = 0; i < args.length; i++){
            args[i] = arguments[i];
        }
        var ret = fn.apply(this, args);
        var cb = args[args.length - 1];
        if (typeof ret === 'function' && ret !== cb) {
            Object.keys(cb).forEach(function(k) {
                ret[k] = cb[k];
            });
        }
        return ret;
    }
    return wrapper;
}

});


parcelRequire.register("DEPnk", function(module, exports) {

var $4aKZq = parcelRequire("4aKZq");
var $077350269b1e2930$var$noop = function() {
};
var $077350269b1e2930$var$isRequest = function(stream) {
    return stream.setHeader && typeof stream.abort === 'function';
};
var $077350269b1e2930$var$isChildProcess = function(stream) {
    return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3;
};
var $077350269b1e2930$var$eos = function(stream, opts, callback) {
    if (typeof opts === 'function') return $077350269b1e2930$var$eos(stream, null, opts);
    if (!opts) opts = {
    };
    callback = $4aKZq(callback || $077350269b1e2930$var$noop);
    var ws = stream._writableState;
    var rs = stream._readableState;
    var readable = opts.readable || opts.readable !== false && stream.readable;
    var writable = opts.writable || opts.writable !== false && stream.writable;
    var cancelled = false;
    var onlegacyfinish = function() {
        if (!stream.writable) onfinish();
    };
    var onfinish = function() {
        writable = false;
        if (!readable) callback.call(stream);
    };
    var onend = function() {
        readable = false;
        if (!writable) callback.call(stream);
    };
    var onexit = function(exitCode) {
        callback.call(stream, exitCode ? new Error('exited with error code: ' + exitCode) : null);
    };
    var onerror = function(err) {
        callback.call(stream, err);
    };
    var onclose = function() {
        process.nextTick(onclosenexttick);
    };
    var onclosenexttick = function() {
        if (cancelled) return;
        if (readable && !(rs && rs.ended && !rs.destroyed)) return callback.call(stream, new Error('premature close'));
        if (writable && !(ws && ws.ended && !ws.destroyed)) return callback.call(stream, new Error('premature close'));
    };
    var onrequest = function() {
        stream.req.on('finish', onfinish);
    };
    if ($077350269b1e2930$var$isRequest(stream)) {
        stream.on('complete', onfinish);
        stream.on('abort', onclose);
        if (stream.req) onrequest();
        else stream.on('request', onrequest);
    } else if (writable && !ws) {
        stream.on('end', onlegacyfinish);
        stream.on('close', onlegacyfinish);
    }
    if ($077350269b1e2930$var$isChildProcess(stream)) stream.on('exit', onexit);
    stream.on('end', onend);
    stream.on('finish', onfinish);
    if (opts.error !== false) stream.on('error', onerror);
    stream.on('close', onclose);
    return function() {
        cancelled = true;
        stream.removeListener('complete', onfinish);
        stream.removeListener('abort', onclose);
        stream.removeListener('request', onrequest);
        if (stream.req) stream.req.removeListener('finish', onfinish);
        stream.removeListener('end', onlegacyfinish);
        stream.removeListener('close', onlegacyfinish);
        stream.removeListener('finish', onfinish);
        stream.removeListener('exit', onexit);
        stream.removeListener('end', onend);
        stream.removeListener('error', onerror);
        stream.removeListener('close', onclose);
    };
};
module.exports = $077350269b1e2930$var$eos;

});


parcelRequire.register("j7izJ", function(module, exports) {








if (process.env.READABLE_STREAM === 'disable' && $lEd20$stream) {
    module.exports = $lEd20$stream.Readable;
    Object.assign(module.exports, $lEd20$stream);
    module.exports.Stream = $lEd20$stream;
} else {
    exports = module.exports = (parcelRequire("1Cofi"));
    exports.Stream = $lEd20$stream || exports;
    exports.Readable = exports;
    exports.Writable = (parcelRequire("8TFKC"));
    exports.Duplex = (parcelRequire("aeLxJ"));
    exports.Transform = (parcelRequire("lsHBo"));
    exports.PassThrough = (parcelRequire("jM5UT"));
    exports.finished = (parcelRequire("dVD64"));
    exports.pipeline = (parcelRequire("P8YTp"));
}

});
parcelRequire.register("1Cofi", function(module, exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';
module.exports = $12dc25bc14f15ca0$var$Readable;
/*<replacement>*/ var $12dc25bc14f15ca0$var$Duplex;
/*</replacement>*/ $12dc25bc14f15ca0$var$Readable.ReadableState = $12dc25bc14f15ca0$var$ReadableState;

var $12dc25bc14f15ca0$require$EE = $lEd20$events.EventEmitter;
var $12dc25bc14f15ca0$var$EElistenerCount = function EElistenerCount(emitter, type) {
    return emitter.listeners(type).length;
};

var $1OGRV = parcelRequire("1OGRV");

var $12dc25bc14f15ca0$require$Buffer = $lEd20$buffer.Buffer;
var $12dc25bc14f15ca0$var$OurUint8Array = $parcel$global.Uint8Array || function() {
};
function $12dc25bc14f15ca0$var$_uint8ArrayToBuffer(chunk) {
    return $12dc25bc14f15ca0$require$Buffer.from(chunk);
}
function $12dc25bc14f15ca0$var$_isUint8Array(obj) {
    return $12dc25bc14f15ca0$require$Buffer.isBuffer(obj) || obj instanceof $12dc25bc14f15ca0$var$OurUint8Array;
}

var $12dc25bc14f15ca0$var$debug;
if ($lEd20$util && $lEd20$util.debuglog) $12dc25bc14f15ca0$var$debug = $lEd20$util.debuglog('stream');
else $12dc25bc14f15ca0$var$debug = function debug() {
};

var $lh7Tw = parcelRequire("lh7Tw");

var $fka0R = parcelRequire("fka0R");

var $49RvX = parcelRequire("49RvX");
var $12dc25bc14f15ca0$var$getHighWaterMark = $49RvX.getHighWaterMark;

var $hWT79 = parcelRequire("hWT79");
var $12dc25bc14f15ca0$require$_require$codes = $hWT79.codes;
var $12dc25bc14f15ca0$var$ERR_INVALID_ARG_TYPE = $12dc25bc14f15ca0$require$_require$codes.ERR_INVALID_ARG_TYPE, $12dc25bc14f15ca0$var$ERR_STREAM_PUSH_AFTER_EOF = $12dc25bc14f15ca0$require$_require$codes.ERR_STREAM_PUSH_AFTER_EOF, $12dc25bc14f15ca0$var$ERR_METHOD_NOT_IMPLEMENTED = $12dc25bc14f15ca0$require$_require$codes.ERR_METHOD_NOT_IMPLEMENTED, $12dc25bc14f15ca0$var$ERR_STREAM_UNSHIFT_AFTER_END_EVENT = $12dc25bc14f15ca0$require$_require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.
var $12dc25bc14f15ca0$var$StringDecoder;
var $12dc25bc14f15ca0$var$createReadableStreamAsyncIterator;
var $12dc25bc14f15ca0$var$from;

(parcelRequire("8w0G4"))($12dc25bc14f15ca0$var$Readable, $1OGRV);
var $12dc25bc14f15ca0$var$errorOrDestroy = $fka0R.errorOrDestroy;
var $12dc25bc14f15ca0$var$kProxyEvents = [
    'error',
    'close',
    'destroy',
    'pause',
    'resume'
];
function $12dc25bc14f15ca0$var$prependListener(emitter, event, fn) {
    // Sadly this is not cacheable as some libraries bundle their own
    // event emitter implementation with them.
    if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
    else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);
    else emitter._events[event] = [
        fn,
        emitter._events[event]
    ];
}


function $12dc25bc14f15ca0$var$ReadableState(options, stream, isDuplex) {
    $12dc25bc14f15ca0$var$Duplex = $12dc25bc14f15ca0$var$Duplex || (parcelRequire("aeLxJ"));
    options = options || {
    }; // Duplex streams are both readable and writable, but share
    // the same options object.
    // However, some cases require setting options to different
    // values for the readable and the writable sides of the duplex stream.
    // These options can be provided separately as readableXXX and writableXXX.
    if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof $12dc25bc14f15ca0$var$Duplex; // object stream flag. Used to make read(n) ignore n and to
    // make all the buffer merging and length checks go away
    this.objectMode = !!options.objectMode;
    if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
    // Note: 0 is a valid value, means "don't call _read preemptively ever"
    this.highWaterMark = $12dc25bc14f15ca0$var$getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
    // linked list can remove elements from the beginning faster than
    // array.shift()
    this.buffer = new $lh7Tw();
    this.length = 0;
    this.pipes = null;
    this.pipesCount = 0;
    this.flowing = null;
    this.ended = false;
    this.endEmitted = false;
    this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
    // immediately, or on a later tick.  We set this to true at first, because
    // any actions that shouldn't happen until "later" should generally also
    // not happen before the first read call.
    this.sync = true; // whenever we return null, then we set a flag to say
    // that we're awaiting a 'readable' event emission.
    this.needReadable = false;
    this.emittedReadable = false;
    this.readableListening = false;
    this.resumeScheduled = false;
    this.paused = true; // Should close be emitted on destroy. Defaults to true.
    this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')
    this.autoDestroy = !!options.autoDestroy; // has it been destroyed
    this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
    // encoding is 'binary' so we have to make this configurable.
    // Everything else in the universe uses 'utf8', though.
    this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s
    this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled
    this.readingMore = false;
    this.decoder = null;
    this.encoding = null;
    if (options.encoding) {
        if (!$12dc25bc14f15ca0$var$StringDecoder) $12dc25bc14f15ca0$var$StringDecoder = (parcelRequire("kWYSK")).StringDecoder;
        this.decoder = new $12dc25bc14f15ca0$var$StringDecoder(options.encoding);
        this.encoding = options.encoding;
    }
}

function $12dc25bc14f15ca0$var$Readable(options) {
    $12dc25bc14f15ca0$var$Duplex = $12dc25bc14f15ca0$var$Duplex || (parcelRequire("aeLxJ"));
    if (!(this instanceof $12dc25bc14f15ca0$var$Readable)) return new $12dc25bc14f15ca0$var$Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
    // the ReadableState constructor, at least with V8 6.5
    var isDuplex = this instanceof $12dc25bc14f15ca0$var$Duplex;
    this._readableState = new $12dc25bc14f15ca0$var$ReadableState(options, this, isDuplex); // legacy
    this.readable = true;
    if (options) {
        if (typeof options.read === 'function') this._read = options.read;
        if (typeof options.destroy === 'function') this._destroy = options.destroy;
    }
    $1OGRV.call(this);
}
Object.defineProperty($12dc25bc14f15ca0$var$Readable.prototype, 'destroyed', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        if (this._readableState === undefined) return false;
        return this._readableState.destroyed;
    },
    set: function set(value) {
        // we ignore the value if the stream
        // has not been initialized yet
        if (!this._readableState) return;
         // backward compatibility, the user is explicitly
        // managing destroyed
        this._readableState.destroyed = value;
    }
});
$12dc25bc14f15ca0$var$Readable.prototype.destroy = $fka0R.destroy;
$12dc25bc14f15ca0$var$Readable.prototype._undestroy = $fka0R.undestroy;
$12dc25bc14f15ca0$var$Readable.prototype._destroy = function(err, cb) {
    cb(err);
}; // Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
$12dc25bc14f15ca0$var$Readable.prototype.push = function(chunk, encoding) {
    var state = this._readableState;
    var skipChunkCheck;
    if (!state.objectMode) {
        if (typeof chunk === 'string') {
            encoding = encoding || state.defaultEncoding;
            if (encoding !== state.encoding) {
                chunk = $12dc25bc14f15ca0$require$Buffer.from(chunk, encoding);
                encoding = '';
            }
            skipChunkCheck = true;
        }
    } else skipChunkCheck = true;
    return $12dc25bc14f15ca0$var$readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
}; // Unshift should *always* be something directly out of read()
$12dc25bc14f15ca0$var$Readable.prototype.unshift = function(chunk) {
    return $12dc25bc14f15ca0$var$readableAddChunk(this, chunk, null, true, false);
};
function $12dc25bc14f15ca0$var$readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
    $12dc25bc14f15ca0$var$debug('readableAddChunk', chunk);
    var state = stream._readableState;
    if (chunk === null) {
        state.reading = false;
        $12dc25bc14f15ca0$var$onEofChunk(stream, state);
    } else {
        var er;
        if (!skipChunkCheck) er = $12dc25bc14f15ca0$var$chunkInvalid(state, chunk);
        if (er) $12dc25bc14f15ca0$var$errorOrDestroy(stream, er);
        else if (state.objectMode || chunk && chunk.length > 0) {
            if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== $12dc25bc14f15ca0$require$Buffer.prototype) chunk = $12dc25bc14f15ca0$var$_uint8ArrayToBuffer(chunk);
            if (addToFront) {
                if (state.endEmitted) $12dc25bc14f15ca0$var$errorOrDestroy(stream, new $12dc25bc14f15ca0$var$ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
                else $12dc25bc14f15ca0$var$addChunk(stream, state, chunk, true);
            } else if (state.ended) $12dc25bc14f15ca0$var$errorOrDestroy(stream, new $12dc25bc14f15ca0$var$ERR_STREAM_PUSH_AFTER_EOF());
            else if (state.destroyed) return false;
            else {
                state.reading = false;
                if (state.decoder && !encoding) {
                    chunk = state.decoder.write(chunk);
                    if (state.objectMode || chunk.length !== 0) $12dc25bc14f15ca0$var$addChunk(stream, state, chunk, false);
                    else $12dc25bc14f15ca0$var$maybeReadMore(stream, state);
                } else $12dc25bc14f15ca0$var$addChunk(stream, state, chunk, false);
            }
        } else if (!addToFront) {
            state.reading = false;
            $12dc25bc14f15ca0$var$maybeReadMore(stream, state);
        }
    } // We can push more data if we are below the highWaterMark.
    // Also, if we have no data yet, we can stand some more bytes.
    // This is to work around cases where hwm=0, such as the repl.
    return !state.ended && (state.length < state.highWaterMark || state.length === 0);
}
function $12dc25bc14f15ca0$var$addChunk(stream, state, chunk, addToFront) {
    if (state.flowing && state.length === 0 && !state.sync) {
        state.awaitDrain = 0;
        stream.emit('data', chunk);
    } else {
        // update the buffer info.
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront) state.buffer.unshift(chunk);
        else state.buffer.push(chunk);
        if (state.needReadable) $12dc25bc14f15ca0$var$emitReadable(stream);
    }
    $12dc25bc14f15ca0$var$maybeReadMore(stream, state);
}
function $12dc25bc14f15ca0$var$chunkInvalid(state, chunk) {
    var er;
    if (!$12dc25bc14f15ca0$var$_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) er = new $12dc25bc14f15ca0$var$ERR_INVALID_ARG_TYPE('chunk', [
        'string',
        'Buffer',
        'Uint8Array'
    ], chunk);
    return er;
}
$12dc25bc14f15ca0$var$Readable.prototype.isPaused = function() {
    return this._readableState.flowing === false;
}; // backwards compatibility.

$12dc25bc14f15ca0$var$Readable.prototype.setEncoding = function(enc) {
    if (!$12dc25bc14f15ca0$var$StringDecoder) $12dc25bc14f15ca0$var$StringDecoder = (parcelRequire("kWYSK")).StringDecoder;
    var decoder = new $12dc25bc14f15ca0$var$StringDecoder(enc);
    this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8
    this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:
    var p = this._readableState.buffer.head;
    var content = '';
    while(p !== null){
        content += decoder.write(p.data);
        p = p.next;
    }
    this._readableState.buffer.clear();
    if (content !== '') this._readableState.buffer.push(content);
    this._readableState.length = content.length;
    return this;
}; // Don't raise the hwm > 1GB
var $12dc25bc14f15ca0$var$MAX_HWM = 1073741824;
function $12dc25bc14f15ca0$var$computeNewHighWaterMark(n) {
    if (n >= $12dc25bc14f15ca0$var$MAX_HWM) // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
    n = $12dc25bc14f15ca0$var$MAX_HWM;
    else {
        // Get the next highest power of 2 to prevent increasing hwm excessively in
        // tiny amounts
        n--;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        n++;
    }
    return n;
} // This function is designed to be inlinable, so please take care when making
// changes to the function body.
function $12dc25bc14f15ca0$var$howMuchToRead(n, state) {
    if (n <= 0 || state.length === 0 && state.ended) return 0;
    if (state.objectMode) return 1;
    if (n !== n) {
        // Only flow one buffer at a time
        if (state.flowing && state.length) return state.buffer.head.data.length;
        else return state.length;
    } // If we're asking for more than the current hwm, then raise the hwm.
    if (n > state.highWaterMark) state.highWaterMark = $12dc25bc14f15ca0$var$computeNewHighWaterMark(n);
    if (n <= state.length) return n; // Don't have enough
    if (!state.ended) {
        state.needReadable = true;
        return 0;
    }
    return state.length;
} // you can override either this method, or the async _read(n) below.
$12dc25bc14f15ca0$var$Readable.prototype.read = function(n) {
    $12dc25bc14f15ca0$var$debug('read', n);
    n = parseInt(n, 10);
    var state = this._readableState;
    var nOrig = n;
    if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
    // already have a bunch of data in the buffer, then just trigger
    // the 'readable' event and move on.
    if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
        $12dc25bc14f15ca0$var$debug('read: emitReadable', state.length, state.ended);
        if (state.length === 0 && state.ended) $12dc25bc14f15ca0$var$endReadable(this);
        else $12dc25bc14f15ca0$var$emitReadable(this);
        return null;
    }
    n = $12dc25bc14f15ca0$var$howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.
    if (n === 0 && state.ended) {
        if (state.length === 0) $12dc25bc14f15ca0$var$endReadable(this);
        return null;
    } // All the actual chunk generation logic needs to be
    // *below* the call to _read.  The reason is that in certain
    // synthetic stream cases, such as passthrough streams, _read
    // may be a completely synchronous operation which may change
    // the state of the read buffer, providing enough data when
    // before there was *not* enough.
    //
    // So, the steps are:
    // 1. Figure out what the state of things will be after we do
    // a read from the buffer.
    //
    // 2. If that resulting state will trigger a _read, then call _read.
    // Note that this may be asynchronous, or synchronous.  Yes, it is
    // deeply ugly to write APIs this way, but that still doesn't mean
    // that the Readable class should behave improperly, as streams are
    // designed to be sync/async agnostic.
    // Take note if the _read call is sync or async (ie, if the read call
    // has returned yet), so that we know whether or not it's safe to emit
    // 'readable' etc.
    //
    // 3. Actually pull the requested chunks out of the buffer and return.
    // if we need a readable event, then we need to do some reading.
    var doRead = state.needReadable;
    $12dc25bc14f15ca0$var$debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some
    if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        $12dc25bc14f15ca0$var$debug('length less than watermark', doRead);
    } // however, if we've ended, then there's no point, and if we're already
    // reading, then it's unnecessary.
    if (state.ended || state.reading) {
        doRead = false;
        $12dc25bc14f15ca0$var$debug('reading or ended', doRead);
    } else if (doRead) {
        $12dc25bc14f15ca0$var$debug('do read');
        state.reading = true;
        state.sync = true; // if the length is currently zero, then we *need* a readable event.
        if (state.length === 0) state.needReadable = true; // call internal read method
        this._read(state.highWaterMark);
        state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
        // and we need to re-evaluate how much data we can return to the user.
        if (!state.reading) n = $12dc25bc14f15ca0$var$howMuchToRead(nOrig, state);
    }
    var ret;
    if (n > 0) ret = $12dc25bc14f15ca0$var$fromList(n, state);
    else ret = null;
    if (ret === null) {
        state.needReadable = state.length <= state.highWaterMark;
        n = 0;
    } else {
        state.length -= n;
        state.awaitDrain = 0;
    }
    if (state.length === 0) {
        // If we have nothing in the buffer, then we want to know
        // as soon as we *do* get something into the buffer.
        if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.
        if (nOrig !== n && state.ended) $12dc25bc14f15ca0$var$endReadable(this);
    }
    if (ret !== null) this.emit('data', ret);
    return ret;
};
function $12dc25bc14f15ca0$var$onEofChunk(stream, state) {
    $12dc25bc14f15ca0$var$debug('onEofChunk');
    if (state.ended) return;
    if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
            state.buffer.push(chunk);
            state.length += state.objectMode ? 1 : chunk.length;
        }
    }
    state.ended = true;
    if (state.sync) // if we are sync, wait until next tick to emit the data.
    // Otherwise we risk emitting data in the flow()
    // the readable code triggers during a read() call
    $12dc25bc14f15ca0$var$emitReadable(stream);
    else {
        // emit 'readable' now to make sure it gets picked up.
        state.needReadable = false;
        if (!state.emittedReadable) {
            state.emittedReadable = true;
            $12dc25bc14f15ca0$var$emitReadable_(stream);
        }
    }
} // Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function $12dc25bc14f15ca0$var$emitReadable(stream) {
    var state = stream._readableState;
    $12dc25bc14f15ca0$var$debug('emitReadable', state.needReadable, state.emittedReadable);
    state.needReadable = false;
    if (!state.emittedReadable) {
        $12dc25bc14f15ca0$var$debug('emitReadable', state.flowing);
        state.emittedReadable = true;
        process.nextTick($12dc25bc14f15ca0$var$emitReadable_, stream);
    }
}
function $12dc25bc14f15ca0$var$emitReadable_(stream) {
    var state = stream._readableState;
    $12dc25bc14f15ca0$var$debug('emitReadable_', state.destroyed, state.length, state.ended);
    if (!state.destroyed && (state.length || state.ended)) {
        stream.emit('readable');
        state.emittedReadable = false;
    } // The stream needs another readable event if
    // 1. It is not flowing, as the flow mechanism will take
    //    care of it.
    // 2. It is not ended.
    // 3. It is below the highWaterMark, so we can schedule
    //    another readable later.
    state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
    $12dc25bc14f15ca0$var$flow(stream);
} // at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function $12dc25bc14f15ca0$var$maybeReadMore(stream, state) {
    if (!state.readingMore) {
        state.readingMore = true;
        process.nextTick($12dc25bc14f15ca0$var$maybeReadMore_, stream, state);
    }
}
function $12dc25bc14f15ca0$var$maybeReadMore_(stream, state) {
    // Attempt to read more data if we should.
    //
    // The conditions for reading more data are (one of):
    // - Not enough data buffered (state.length < state.highWaterMark). The loop
    //   is responsible for filling the buffer with enough data if such data
    //   is available. If highWaterMark is 0 and we are not in the flowing mode
    //   we should _not_ attempt to buffer any extra data. We'll get more data
    //   when the stream consumer calls read() instead.
    // - No data in the buffer, and the stream is in flowing mode. In this mode
    //   the loop below is responsible for ensuring read() is called. Failing to
    //   call read here would abort the flow and there's no other mechanism for
    //   continuing the flow if the stream consumer has just subscribed to the
    //   'data' event.
    //
    // In addition to the above conditions to keep reading data, the following
    // conditions prevent the data from being read:
    // - The stream has ended (state.ended).
    // - There is already a pending 'read' operation (state.reading). This is a
    //   case where the the stream has called the implementation defined _read()
    //   method, but they are processing the call asynchronously and have _not_
    //   called push() with new data. In this case we skip performing more
    //   read()s. The execution ends in this method again after the _read() ends
    //   up calling push() with more data.
    while(!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)){
        var len = state.length;
        $12dc25bc14f15ca0$var$debug('maybeReadMore read 0');
        stream.read(0);
        if (len === state.length) break;
    }
    state.readingMore = false;
} // abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
$12dc25bc14f15ca0$var$Readable.prototype._read = function(n) {
    $12dc25bc14f15ca0$var$errorOrDestroy(this, new $12dc25bc14f15ca0$var$ERR_METHOD_NOT_IMPLEMENTED('_read()'));
};
$12dc25bc14f15ca0$var$Readable.prototype.pipe = function(dest, pipeOpts) {
    var src = this;
    var state = this._readableState;
    switch(state.pipesCount){
        case 0:
            state.pipes = dest;
            break;
        case 1:
            state.pipes = [
                state.pipes,
                dest
            ];
            break;
        default:
            state.pipes.push(dest);
            break;
    }
    state.pipesCount += 1;
    $12dc25bc14f15ca0$var$debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
    var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
    var endFn = doEnd ? onend : unpipe;
    if (state.endEmitted) process.nextTick(endFn);
    else src.once('end', endFn);
    dest.on('unpipe', onunpipe);
    function onunpipe(readable, unpipeInfo) {
        $12dc25bc14f15ca0$var$debug('onunpipe');
        if (readable === src) {
            if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
                unpipeInfo.hasUnpiped = true;
                cleanup();
            }
        }
    }
    function onend() {
        $12dc25bc14f15ca0$var$debug('onend');
        dest.end();
    } // when the dest drains, it reduces the awaitDrain counter
    // on the source.  This would be more elegant with a .once()
    // handler in flow(), but adding and removing repeatedly is
    // too slow.
    var ondrain = $12dc25bc14f15ca0$var$pipeOnDrain(src);
    dest.on('drain', ondrain);
    var cleanedUp = false;
    function cleanup() {
        $12dc25bc14f15ca0$var$debug('cleanup'); // cleanup event handlers once the pipe is broken
        dest.removeListener('close', onclose);
        dest.removeListener('finish', onfinish);
        dest.removeListener('drain', ondrain);
        dest.removeListener('error', onerror);
        dest.removeListener('unpipe', onunpipe);
        src.removeListener('end', onend);
        src.removeListener('end', unpipe);
        src.removeListener('data', ondata);
        cleanedUp = true; // if the reader is waiting for a drain event from this
        // specific writer, then it would cause it to never start
        // flowing again.
        // So, if this is awaiting a drain, then we just call it now.
        // If we don't know, then assume that we are waiting for one.
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
    }
    src.on('data', ondata);
    function ondata(chunk) {
        $12dc25bc14f15ca0$var$debug('ondata');
        var ret = dest.write(chunk);
        $12dc25bc14f15ca0$var$debug('dest.write', ret);
        if (ret === false) {
            // If the user unpiped during `dest.write()`, it is possible
            // to get stuck in a permanently paused state if that write
            // also returned false.
            // => Check whether `dest` is still a piping destination.
            if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && $12dc25bc14f15ca0$var$indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
                $12dc25bc14f15ca0$var$debug('false write response, pause', state.awaitDrain);
                state.awaitDrain++;
            }
            src.pause();
        }
    } // if the dest has an error, then stop piping into it.
    // however, don't suppress the throwing behavior for this.
    function onerror(er) {
        $12dc25bc14f15ca0$var$debug('onerror', er);
        unpipe();
        dest.removeListener('error', onerror);
        if ($12dc25bc14f15ca0$var$EElistenerCount(dest, 'error') === 0) $12dc25bc14f15ca0$var$errorOrDestroy(dest, er);
    } // Make sure our error handler is attached before userland ones.
    $12dc25bc14f15ca0$var$prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.
    function onclose() {
        dest.removeListener('finish', onfinish);
        unpipe();
    }
    dest.once('close', onclose);
    function onfinish() {
        $12dc25bc14f15ca0$var$debug('onfinish');
        dest.removeListener('close', onclose);
        unpipe();
    }
    dest.once('finish', onfinish);
    function unpipe() {
        $12dc25bc14f15ca0$var$debug('unpipe');
        src.unpipe(dest);
    } // tell the dest that it's being piped to
    dest.emit('pipe', src); // start the flow if it hasn't been started already.
    if (!state.flowing) {
        $12dc25bc14f15ca0$var$debug('pipe resume');
        src.resume();
    }
    return dest;
};
function $12dc25bc14f15ca0$var$pipeOnDrain(src) {
    return function pipeOnDrainFunctionResult() {
        var state = src._readableState;
        $12dc25bc14f15ca0$var$debug('pipeOnDrain', state.awaitDrain);
        if (state.awaitDrain) state.awaitDrain--;
        if (state.awaitDrain === 0 && $12dc25bc14f15ca0$var$EElistenerCount(src, 'data')) {
            state.flowing = true;
            $12dc25bc14f15ca0$var$flow(src);
        }
    };
}
$12dc25bc14f15ca0$var$Readable.prototype.unpipe = function(dest) {
    var state = this._readableState;
    var unpipeInfo = {
        hasUnpiped: false
    }; // if we're not piping anywhere, then do nothing.
    if (state.pipesCount === 0) return this; // just one destination.  most common case.
    if (state.pipesCount === 1) {
        // passed in one, but it's not the right one.
        if (dest && dest !== state.pipes) return this;
        if (!dest) dest = state.pipes; // got a match.
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest) dest.emit('unpipe', this, unpipeInfo);
        return this;
    } // slow case. multiple pipe destinations.
    if (!dest) {
        // remove all.
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for(var i = 0; i < len; i++)dests[i].emit('unpipe', this, {
            hasUnpiped: false
        });
        return this;
    } // try to find the right one.
    var index = $12dc25bc14f15ca0$var$indexOf(state.pipes, dest);
    if (index === -1) return this;
    state.pipes.splice(index, 1);
    state.pipesCount -= 1;
    if (state.pipesCount === 1) state.pipes = state.pipes[0];
    dest.emit('unpipe', this, unpipeInfo);
    return this;
}; // set up data events if they are asked for
// Ensure readable listeners eventually get something
$12dc25bc14f15ca0$var$Readable.prototype.on = function(ev, fn) {
    var res = $1OGRV.prototype.on.call(this, ev, fn);
    var state = this._readableState;
    if (ev === 'data') {
        // update readableListening so that resume() may be a no-op
        // a few lines down. This is needed to support once('readable').
        state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused
        if (state.flowing !== false) this.resume();
    } else if (ev === 'readable') {
        if (!state.endEmitted && !state.readableListening) {
            state.readableListening = state.needReadable = true;
            state.flowing = false;
            state.emittedReadable = false;
            $12dc25bc14f15ca0$var$debug('on readable', state.length, state.reading);
            if (state.length) $12dc25bc14f15ca0$var$emitReadable(this);
            else if (!state.reading) process.nextTick($12dc25bc14f15ca0$var$nReadingNextTick, this);
        }
    }
    return res;
};
$12dc25bc14f15ca0$var$Readable.prototype.addListener = $12dc25bc14f15ca0$var$Readable.prototype.on;
$12dc25bc14f15ca0$var$Readable.prototype.removeListener = function(ev, fn) {
    var res = $1OGRV.prototype.removeListener.call(this, ev, fn);
    if (ev === 'readable') // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick($12dc25bc14f15ca0$var$updateReadableListening, this);
    return res;
};
$12dc25bc14f15ca0$var$Readable.prototype.removeAllListeners = function(ev) {
    var res = $1OGRV.prototype.removeAllListeners.apply(this, arguments);
    if (ev === 'readable' || ev === undefined) // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick($12dc25bc14f15ca0$var$updateReadableListening, this);
    return res;
};
function $12dc25bc14f15ca0$var$updateReadableListening(self) {
    var state = self._readableState;
    state.readableListening = self.listenerCount('readable') > 0;
    if (state.resumeScheduled && !state.paused) // flowing needs to be set to true now, otherwise
    // the upcoming resume will not flow.
    state.flowing = true; // crude way to check if we should resume
    else if (self.listenerCount('data') > 0) self.resume();
}
function $12dc25bc14f15ca0$var$nReadingNextTick(self) {
    $12dc25bc14f15ca0$var$debug('readable nexttick read 0');
    self.read(0);
} // pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
$12dc25bc14f15ca0$var$Readable.prototype.resume = function() {
    var state = this._readableState;
    if (!state.flowing) {
        $12dc25bc14f15ca0$var$debug('resume'); // we flow only if there is no one listening
        // for readable, but we still have to call
        // resume()
        state.flowing = !state.readableListening;
        $12dc25bc14f15ca0$var$resume(this, state);
    }
    state.paused = false;
    return this;
};
function $12dc25bc14f15ca0$var$resume(stream, state) {
    if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        process.nextTick($12dc25bc14f15ca0$var$resume_, stream, state);
    }
}
function $12dc25bc14f15ca0$var$resume_(stream, state) {
    $12dc25bc14f15ca0$var$debug('resume', state.reading);
    if (!state.reading) stream.read(0);
    state.resumeScheduled = false;
    stream.emit('resume');
    $12dc25bc14f15ca0$var$flow(stream);
    if (state.flowing && !state.reading) stream.read(0);
}
$12dc25bc14f15ca0$var$Readable.prototype.pause = function() {
    $12dc25bc14f15ca0$var$debug('call pause flowing=%j', this._readableState.flowing);
    if (this._readableState.flowing !== false) {
        $12dc25bc14f15ca0$var$debug('pause');
        this._readableState.flowing = false;
        this.emit('pause');
    }
    this._readableState.paused = true;
    return this;
};
function $12dc25bc14f15ca0$var$flow(stream) {
    var state = stream._readableState;
    $12dc25bc14f15ca0$var$debug('flow', state.flowing);
    while(state.flowing && stream.read() !== null);
} // wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
$12dc25bc14f15ca0$var$Readable.prototype.wrap = function(stream) {
    var _this = this;
    var state = this._readableState;
    var paused = false;
    stream.on('end', function() {
        $12dc25bc14f15ca0$var$debug('wrapped end');
        if (state.decoder && !state.ended) {
            var chunk = state.decoder.end();
            if (chunk && chunk.length) _this.push(chunk);
        }
        _this.push(null);
    });
    stream.on('data', function(chunk) {
        $12dc25bc14f15ca0$var$debug('wrapped data');
        if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode
        if (state.objectMode && (chunk === null || chunk === undefined)) return;
        else if (!state.objectMode && (!chunk || !chunk.length)) return;
        var ret = _this.push(chunk);
        if (!ret) {
            paused = true;
            stream.pause();
        }
    }); // proxy all the other methods.
    // important when wrapping filters and duplexes.
    for(var i in stream)if (this[i] === undefined && typeof stream[i] === 'function') this[i] = (function methodWrap(method) {
        return function methodWrapReturnFunction() {
            return stream[method].apply(stream, arguments);
        };
    })(i);
     // proxy certain important events.
    for(var n = 0; n < $12dc25bc14f15ca0$var$kProxyEvents.length; n++)stream.on($12dc25bc14f15ca0$var$kProxyEvents[n], this.emit.bind(this, $12dc25bc14f15ca0$var$kProxyEvents[n]));
     // when we try to consume some more bytes, simply unpause the
    // underlying stream.
    this._read = function(n) {
        $12dc25bc14f15ca0$var$debug('wrapped _read', n);
        if (paused) {
            paused = false;
            stream.resume();
        }
    };
    return this;
};

if (typeof Symbol === 'function') $12dc25bc14f15ca0$var$Readable.prototype[Symbol.asyncIterator] = function() {
    if ($12dc25bc14f15ca0$var$createReadableStreamAsyncIterator === undefined) $12dc25bc14f15ca0$var$createReadableStreamAsyncIterator = (parcelRequire("lYsTo"));
    return $12dc25bc14f15ca0$var$createReadableStreamAsyncIterator(this);
};
Object.defineProperty($12dc25bc14f15ca0$var$Readable.prototype, 'readableHighWaterMark', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._readableState.highWaterMark;
    }
});
Object.defineProperty($12dc25bc14f15ca0$var$Readable.prototype, 'readableBuffer', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._readableState && this._readableState.buffer;
    }
});
Object.defineProperty($12dc25bc14f15ca0$var$Readable.prototype, 'readableFlowing', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._readableState.flowing;
    },
    set: function set(state) {
        if (this._readableState) this._readableState.flowing = state;
    }
}); // exposed for testing purposes only.
$12dc25bc14f15ca0$var$Readable._fromList = $12dc25bc14f15ca0$var$fromList;
Object.defineProperty($12dc25bc14f15ca0$var$Readable.prototype, 'readableLength', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._readableState.length;
    }
}); // Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function $12dc25bc14f15ca0$var$fromList(n, state) {
    // nothing buffered
    if (state.length === 0) return null;
    var ret;
    if (state.objectMode) ret = state.buffer.shift();
    else if (!n || n >= state.length) {
        // read it all, truncate the list
        if (state.decoder) ret = state.buffer.join('');
        else if (state.buffer.length === 1) ret = state.buffer.first();
        else ret = state.buffer.concat(state.length);
        state.buffer.clear();
    } else // read part of list
    ret = state.buffer.consume(n, state.decoder);
    return ret;
}
function $12dc25bc14f15ca0$var$endReadable(stream) {
    var state = stream._readableState;
    $12dc25bc14f15ca0$var$debug('endReadable', state.endEmitted);
    if (!state.endEmitted) {
        state.ended = true;
        process.nextTick($12dc25bc14f15ca0$var$endReadableNT, state, stream);
    }
}
function $12dc25bc14f15ca0$var$endReadableNT(state, stream) {
    $12dc25bc14f15ca0$var$debug('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.
    if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit('end');
        if (state.autoDestroy) {
            // In case of duplex streams we need a way to detect
            // if the writable side is ready for autoDestroy as well
            var wState = stream._writableState;
            if (!wState || wState.autoDestroy && wState.finished) stream.destroy();
        }
    }
}

if (typeof Symbol === 'function') $12dc25bc14f15ca0$var$Readable.from = function(iterable, opts) {
    if ($12dc25bc14f15ca0$var$from === undefined) $12dc25bc14f15ca0$var$from = (parcelRequire("7kMQO"));
    return $12dc25bc14f15ca0$var$from($12dc25bc14f15ca0$var$Readable, iterable, opts);
};
function $12dc25bc14f15ca0$var$indexOf(xs, x) {
    for(var i = 0, l = xs.length; i < l; i++){
        if (xs[i] === x) return i;
    }
    return -1;
}

});
parcelRequire.register("1OGRV", function(module, exports) {

module.exports = $lEd20$stream;

});

parcelRequire.register("lh7Tw", function(module, exports) {
'use strict';
function $f7d14f2aeadb44b3$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function $f7d14f2aeadb44b3$var$_objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {
        };
        if (i % 2) $f7d14f2aeadb44b3$var$ownKeys(Object(source), true).forEach(function(key) {
            $f7d14f2aeadb44b3$var$_defineProperty(target, key, source[key]);
        });
        else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        else $f7d14f2aeadb44b3$var$ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function $f7d14f2aeadb44b3$var$_defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function $f7d14f2aeadb44b3$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function $f7d14f2aeadb44b3$var$_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function $f7d14f2aeadb44b3$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $f7d14f2aeadb44b3$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $f7d14f2aeadb44b3$var$_defineProperties(Constructor, staticProps);
    return Constructor;
}

var $f7d14f2aeadb44b3$var$Buffer = $lEd20$buffer.Buffer;

var $f7d14f2aeadb44b3$var$inspect = $lEd20$util.inspect;
var $f7d14f2aeadb44b3$var$custom = $f7d14f2aeadb44b3$var$inspect && $f7d14f2aeadb44b3$var$inspect.custom || 'inspect';
function $f7d14f2aeadb44b3$var$copyBuffer(src, target, offset) {
    $f7d14f2aeadb44b3$var$Buffer.prototype.copy.call(src, target, offset);
}
module.exports = /*#__PURE__*/ (function() {
    function BufferList() {
        $f7d14f2aeadb44b3$var$_classCallCheck(this, BufferList);
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    $f7d14f2aeadb44b3$var$_createClass(BufferList, [
        {
            key: "push",
            value: function push(v) {
                var entry = {
                    data: v,
                    next: null
                };
                if (this.length > 0) this.tail.next = entry;
                else this.head = entry;
                this.tail = entry;
                ++this.length;
            }
        },
        {
            key: "unshift",
            value: function unshift(v) {
                var entry = {
                    data: v,
                    next: this.head
                };
                if (this.length === 0) this.tail = entry;
                this.head = entry;
                ++this.length;
            }
        },
        {
            key: "shift",
            value: function shift() {
                if (this.length === 0) return;
                var ret = this.head.data;
                if (this.length === 1) this.head = this.tail = null;
                else this.head = this.head.next;
                --this.length;
                return ret;
            }
        },
        {
            key: "clear",
            value: function clear() {
                this.head = this.tail = null;
                this.length = 0;
            }
        },
        {
            key: "join",
            value: function join(s) {
                if (this.length === 0) return '';
                var p = this.head;
                var ret = '' + p.data;
                while(p = p.next)ret += s + p.data;
                return ret;
            }
        },
        {
            key: "concat",
            value: function concat(n) {
                if (this.length === 0) return $f7d14f2aeadb44b3$var$Buffer.alloc(0);
                var ret = $f7d14f2aeadb44b3$var$Buffer.allocUnsafe(n >>> 0);
                var p = this.head;
                var i = 0;
                while(p){
                    $f7d14f2aeadb44b3$var$copyBuffer(p.data, ret, i);
                    i += p.data.length;
                    p = p.next;
                }
                return ret;
            } // Consumes a specified amount of bytes or characters from the buffered data.
        },
        {
            key: "consume",
            value: function consume(n, hasStrings) {
                var ret;
                if (n < this.head.data.length) {
                    // `slice` is the same for buffers and strings.
                    ret = this.head.data.slice(0, n);
                    this.head.data = this.head.data.slice(n);
                } else if (n === this.head.data.length) // First chunk is a perfect match.
                ret = this.shift();
                else // Result spans more than one buffer.
                ret = hasStrings ? this._getString(n) : this._getBuffer(n);
                return ret;
            }
        },
        {
            key: "first",
            value: function first() {
                return this.head.data;
            } // Consumes a specified amount of characters from the buffered data.
        },
        {
            key: "_getString",
            value: function _getString(n) {
                var p = this.head;
                var c = 1;
                var ret = p.data;
                n -= ret.length;
                while(p = p.next){
                    var str = p.data;
                    var nb = n > str.length ? str.length : n;
                    if (nb === str.length) ret += str;
                    else ret += str.slice(0, n);
                    n -= nb;
                    if (n === 0) {
                        if (nb === str.length) {
                            ++c;
                            if (p.next) this.head = p.next;
                            else this.head = this.tail = null;
                        } else {
                            this.head = p;
                            p.data = str.slice(nb);
                        }
                        break;
                    }
                    ++c;
                }
                this.length -= c;
                return ret;
            } // Consumes a specified amount of bytes from the buffered data.
        },
        {
            key: "_getBuffer",
            value: function _getBuffer(n) {
                var ret = $f7d14f2aeadb44b3$var$Buffer.allocUnsafe(n);
                var p = this.head;
                var c = 1;
                p.data.copy(ret);
                n -= p.data.length;
                while(p = p.next){
                    var buf = p.data;
                    var nb = n > buf.length ? buf.length : n;
                    buf.copy(ret, ret.length - n, 0, nb);
                    n -= nb;
                    if (n === 0) {
                        if (nb === buf.length) {
                            ++c;
                            if (p.next) this.head = p.next;
                            else this.head = this.tail = null;
                        } else {
                            this.head = p;
                            p.data = buf.slice(nb);
                        }
                        break;
                    }
                    ++c;
                }
                this.length -= c;
                return ret;
            } // Make sure the linked list only shows the minimal necessary information.
        },
        {
            key: $f7d14f2aeadb44b3$var$custom,
            value: function value(_, options) {
                return $f7d14f2aeadb44b3$var$inspect(this, $f7d14f2aeadb44b3$var$_objectSpread({
                }, options, {
                    // Only inspect one level.
                    depth: 0,
                    // It should not recurse.
                    customInspect: false
                }));
            }
        }
    ]);
    return BufferList;
})();

});

parcelRequire.register("fka0R", function(module, exports) {
'use strict'; // undocumented cb() API, needed for core, not for public API
function $b2807d9e31363a76$var$destroy(err, cb) {
    var _this = this;
    var readableDestroyed = this._readableState && this._readableState.destroyed;
    var writableDestroyed = this._writableState && this._writableState.destroyed;
    if (readableDestroyed || writableDestroyed) {
        if (cb) cb(err);
        else if (err) {
            if (!this._writableState) process.nextTick($b2807d9e31363a76$var$emitErrorNT, this, err);
            else if (!this._writableState.errorEmitted) {
                this._writableState.errorEmitted = true;
                process.nextTick($b2807d9e31363a76$var$emitErrorNT, this, err);
            }
        }
        return this;
    } // we set destroyed to true before firing error callbacks in order
    // to make it re-entrance safe in case destroy() is called within callbacks
    if (this._readableState) this._readableState.destroyed = true;
     // if this is a duplex stream mark the writable part as destroyed as well
    if (this._writableState) this._writableState.destroyed = true;
    this._destroy(err || null, function(err) {
        if (!cb && err) {
            if (!_this._writableState) process.nextTick($b2807d9e31363a76$var$emitErrorAndCloseNT, _this, err);
            else if (!_this._writableState.errorEmitted) {
                _this._writableState.errorEmitted = true;
                process.nextTick($b2807d9e31363a76$var$emitErrorAndCloseNT, _this, err);
            } else process.nextTick($b2807d9e31363a76$var$emitCloseNT, _this);
        } else if (cb) {
            process.nextTick($b2807d9e31363a76$var$emitCloseNT, _this);
            cb(err);
        } else process.nextTick($b2807d9e31363a76$var$emitCloseNT, _this);
    });
    return this;
}
function $b2807d9e31363a76$var$emitErrorAndCloseNT(self, err) {
    $b2807d9e31363a76$var$emitErrorNT(self, err);
    $b2807d9e31363a76$var$emitCloseNT(self);
}
function $b2807d9e31363a76$var$emitCloseNT(self) {
    if (self._writableState && !self._writableState.emitClose) return;
    if (self._readableState && !self._readableState.emitClose) return;
    self.emit('close');
}
function $b2807d9e31363a76$var$undestroy() {
    if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
    }
    if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finalCalled = false;
        this._writableState.prefinished = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
    }
}
function $b2807d9e31363a76$var$emitErrorNT(self, err) {
    self.emit('error', err);
}
function $b2807d9e31363a76$var$errorOrDestroy(stream, err) {
    // We have tests that rely on errors being emitted
    // in the same tick, so changing this is semver major.
    // For now when you opt-in to autoDestroy we allow
    // the error to be emitted nextTick. In a future
    // semver major update we should change the default to this.
    var rState = stream._readableState;
    var wState = stream._writableState;
    if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);
    else stream.emit('error', err);
}
module.exports = {
    destroy: $b2807d9e31363a76$var$destroy,
    undestroy: $b2807d9e31363a76$var$undestroy,
    errorOrDestroy: $b2807d9e31363a76$var$errorOrDestroy
};

});

parcelRequire.register("49RvX", function(module, exports) {
'use strict';

var $hWT79 = parcelRequire("hWT79");
var $307183840a668580$var$ERR_INVALID_OPT_VALUE = $hWT79.codes.ERR_INVALID_OPT_VALUE;
function $307183840a668580$var$highWaterMarkFrom(options, isDuplex, duplexKey) {
    return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}
function $307183840a668580$var$getHighWaterMark(state, options, duplexKey, isDuplex) {
    var hwm = $307183840a668580$var$highWaterMarkFrom(options, isDuplex, duplexKey);
    if (hwm != null) {
        if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
            var name = isDuplex ? duplexKey : 'highWaterMark';
            throw new $307183840a668580$var$ERR_INVALID_OPT_VALUE(name, hwm);
        }
        return Math.floor(hwm);
    } // Default value
    return state.objectMode ? 16 : 16384;
}
module.exports = {
    getHighWaterMark: $307183840a668580$var$getHighWaterMark
};

});
parcelRequire.register("hWT79", function(module, exports) {

$parcel$export(module.exports, "codes", () => $d1129afb6bb9f329$export$e45cb6485273080e, (v) => $d1129afb6bb9f329$export$e45cb6485273080e = v);
var $d1129afb6bb9f329$export$e45cb6485273080e;
'use strict';
const $d1129afb6bb9f329$var$codes = {
};
function $d1129afb6bb9f329$var$createErrorType(code, message, Base) {
    if (!Base) Base = Error;
    function getMessage(arg1, arg2, arg3) {
        if (typeof message === 'string') return message;
        else return message(arg1, arg2, arg3);
    }
    class NodeError extends Base {
        constructor(arg1, arg2, arg3){
            super(getMessage(arg1, arg2, arg3));
        }
    }
    NodeError.prototype.name = Base.name;
    NodeError.prototype.code = code;
    $d1129afb6bb9f329$var$codes[code] = NodeError;
}
// https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js
function $d1129afb6bb9f329$var$oneOf(expected, thing) {
    if (Array.isArray(expected)) {
        const len = expected.length;
        expected = expected.map((i)=>String(i)
        );
        if (len > 2) return `one of ${thing} ${expected.slice(0, len - 1).join(', ')}, or ` + expected[len - 1];
        else if (len === 2) return `one of ${thing} ${expected[0]} or ${expected[1]}`;
        else return `of ${thing} ${expected[0]}`;
    } else return `of ${thing} ${String(expected)}`;
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
function $d1129afb6bb9f329$var$startsWith(str, search, pos) {
    return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
function $d1129afb6bb9f329$var$endsWith(str, search, this_len) {
    if (this_len === undefined || this_len > str.length) this_len = str.length;
    return str.substring(this_len - search.length, this_len) === search;
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
function $d1129afb6bb9f329$var$includes(str, search, start) {
    if (typeof start !== 'number') start = 0;
    if (start + search.length > str.length) return false;
    else return str.indexOf(search, start) !== -1;
}
$d1129afb6bb9f329$var$createErrorType('ERR_INVALID_OPT_VALUE', function(name, value) {
    return 'The value "' + value + '" is invalid for option "' + name + '"';
}, TypeError);
$d1129afb6bb9f329$var$createErrorType('ERR_INVALID_ARG_TYPE', function(name, expected, actual) {
    // determiner: 'must be' or 'must not be'
    let determiner;
    if (typeof expected === 'string' && $d1129afb6bb9f329$var$startsWith(expected, 'not ')) {
        determiner = 'must not be';
        expected = expected.replace(/^not /, '');
    } else determiner = 'must be';
    let msg;
    if ($d1129afb6bb9f329$var$endsWith(name, ' argument')) // For cases like 'first argument'
    msg = `The ${name} ${determiner} ${$d1129afb6bb9f329$var$oneOf(expected, 'type')}`;
    else {
        const type = $d1129afb6bb9f329$var$includes(name, '.') ? 'property' : 'argument';
        msg = `The "${name}" ${type} ${determiner} ${$d1129afb6bb9f329$var$oneOf(expected, 'type')}`;
    }
    msg += `. Received type ${typeof actual}`;
    return msg;
}, TypeError);
$d1129afb6bb9f329$var$createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
$d1129afb6bb9f329$var$createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function(name) {
    return 'The ' + name + ' method is not implemented';
});
$d1129afb6bb9f329$var$createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
$d1129afb6bb9f329$var$createErrorType('ERR_STREAM_DESTROYED', function(name) {
    return 'Cannot call ' + name + ' after a stream was destroyed';
});
$d1129afb6bb9f329$var$createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
$d1129afb6bb9f329$var$createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
$d1129afb6bb9f329$var$createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
$d1129afb6bb9f329$var$createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
$d1129afb6bb9f329$var$createErrorType('ERR_UNKNOWN_ENCODING', function(arg) {
    return 'Unknown encoding: ' + arg;
}, TypeError);
$d1129afb6bb9f329$var$createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
$d1129afb6bb9f329$export$e45cb6485273080e = $d1129afb6bb9f329$var$codes;

});


parcelRequire.register("8w0G4", function(module, exports) {


try {
    var $6331d674f101dd8c$var$util = $6331d674f101dd8c$import$7debb50ef11d5e0b;
    /* istanbul ignore next */ if (typeof $6331d674f101dd8c$var$util.inherits !== 'function') throw '';
    module.exports = $6331d674f101dd8c$var$util.inherits;
} catch (e) {
    /* istanbul ignore next */ module.exports = (parcelRequire("1sjfN"));
}

});
parcelRequire.register("1sjfN", function(module, exports) {
if (typeof Object.create === 'function') // implementation from standard node.js 'util' module
module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
    }
};
else // old school shim for old browsers
module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
    }
};

});


parcelRequire.register("aeLxJ", function(module, exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.
'use strict';
/*<replacement>*/ var $774017421b19aa77$var$objectKeys = Object.keys || function(obj) {
    var keys = [];
    for(var key in obj)keys.push(key);
    return keys;
};
/*</replacement>*/ module.exports = $774017421b19aa77$var$Duplex;

var $1Cofi = parcelRequire("1Cofi");

var $8TFKC = parcelRequire("8TFKC");

(parcelRequire("8w0G4"))($774017421b19aa77$var$Duplex, $1Cofi);
// Allow the keys array to be GC'ed.
var $774017421b19aa77$var$keys = $774017421b19aa77$var$objectKeys($8TFKC.prototype);
for(var $774017421b19aa77$var$v = 0; $774017421b19aa77$var$v < $774017421b19aa77$var$keys.length; $774017421b19aa77$var$v++){
    var $774017421b19aa77$var$method = $774017421b19aa77$var$keys[$774017421b19aa77$var$v];
    if (!$774017421b19aa77$var$Duplex.prototype[$774017421b19aa77$var$method]) $774017421b19aa77$var$Duplex.prototype[$774017421b19aa77$var$method] = $8TFKC.prototype[$774017421b19aa77$var$method];
}
function $774017421b19aa77$var$Duplex(options) {
    if (!(this instanceof $774017421b19aa77$var$Duplex)) return new $774017421b19aa77$var$Duplex(options);
    $1Cofi.call(this, options);
    $8TFKC.call(this, options);
    this.allowHalfOpen = true;
    if (options) {
        if (options.readable === false) this.readable = false;
        if (options.writable === false) this.writable = false;
        if (options.allowHalfOpen === false) {
            this.allowHalfOpen = false;
            this.once('end', $774017421b19aa77$var$onend);
        }
    }
}
Object.defineProperty($774017421b19aa77$var$Duplex.prototype, 'writableHighWaterMark', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState.highWaterMark;
    }
});
Object.defineProperty($774017421b19aa77$var$Duplex.prototype, 'writableBuffer', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState && this._writableState.getBuffer();
    }
});
Object.defineProperty($774017421b19aa77$var$Duplex.prototype, 'writableLength', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState.length;
    }
}); // the no-half-open enforcer
function $774017421b19aa77$var$onend() {
    // If the writable side ended, then we're ok.
    if (this._writableState.ended) return; // no more data can be written.
    // But allow more writes to happen in this tick.
    process.nextTick($774017421b19aa77$var$onEndNT, this);
}
function $774017421b19aa77$var$onEndNT(self) {
    self.end();
}
Object.defineProperty($774017421b19aa77$var$Duplex.prototype, 'destroyed', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        if (this._readableState === undefined || this._writableState === undefined) return false;
        return this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function set(value) {
        // we ignore the value if the stream
        // has not been initialized yet
        if (this._readableState === undefined || this._writableState === undefined) return;
         // backward compatibility, the user is explicitly
        // managing destroyed
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
    }
});

});
parcelRequire.register("8TFKC", function(module, exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.
'use strict';
module.exports = $67a3d89fb2873d67$var$Writable;
/* <replacement> */ function $67a3d89fb2873d67$var$WriteReq(chunk, encoding, cb) {
    this.chunk = chunk;
    this.encoding = encoding;
    this.callback = cb;
    this.next = null;
} // It seems a linked list but it is not
// there will be only 2 of these for each stream
function $67a3d89fb2873d67$var$CorkedRequest(state) {
    var _this = this;
    this.next = null;
    this.entry = null;
    this.finish = function() {
        $67a3d89fb2873d67$var$onCorkedFinish(_this, state);
    };
}
/* </replacement> */ /*<replacement>*/ var $67a3d89fb2873d67$var$Duplex;
/*</replacement>*/ $67a3d89fb2873d67$var$Writable.WritableState = $67a3d89fb2873d67$var$WritableState;

/*<replacement>*/ var $67a3d89fb2873d67$var$internalUtil = {
    deprecate: (parcelRequire("bF0Rv"))
};

var $1OGRV = parcelRequire("1OGRV");

var $67a3d89fb2873d67$require$Buffer = $lEd20$buffer.Buffer;
var $67a3d89fb2873d67$var$OurUint8Array = $parcel$global.Uint8Array || function() {
};
function $67a3d89fb2873d67$var$_uint8ArrayToBuffer(chunk) {
    return $67a3d89fb2873d67$require$Buffer.from(chunk);
}
function $67a3d89fb2873d67$var$_isUint8Array(obj) {
    return $67a3d89fb2873d67$require$Buffer.isBuffer(obj) || obj instanceof $67a3d89fb2873d67$var$OurUint8Array;
}

var $fka0R = parcelRequire("fka0R");

var $49RvX = parcelRequire("49RvX");
var $67a3d89fb2873d67$var$getHighWaterMark = $49RvX.getHighWaterMark;

var $hWT79 = parcelRequire("hWT79");
var $67a3d89fb2873d67$require$_require$codes = $hWT79.codes;
var $67a3d89fb2873d67$var$ERR_INVALID_ARG_TYPE = $67a3d89fb2873d67$require$_require$codes.ERR_INVALID_ARG_TYPE, $67a3d89fb2873d67$var$ERR_METHOD_NOT_IMPLEMENTED = $67a3d89fb2873d67$require$_require$codes.ERR_METHOD_NOT_IMPLEMENTED, $67a3d89fb2873d67$var$ERR_MULTIPLE_CALLBACK = $67a3d89fb2873d67$require$_require$codes.ERR_MULTIPLE_CALLBACK, $67a3d89fb2873d67$var$ERR_STREAM_CANNOT_PIPE = $67a3d89fb2873d67$require$_require$codes.ERR_STREAM_CANNOT_PIPE, $67a3d89fb2873d67$var$ERR_STREAM_DESTROYED = $67a3d89fb2873d67$require$_require$codes.ERR_STREAM_DESTROYED, $67a3d89fb2873d67$var$ERR_STREAM_NULL_VALUES = $67a3d89fb2873d67$require$_require$codes.ERR_STREAM_NULL_VALUES, $67a3d89fb2873d67$var$ERR_STREAM_WRITE_AFTER_END = $67a3d89fb2873d67$require$_require$codes.ERR_STREAM_WRITE_AFTER_END, $67a3d89fb2873d67$var$ERR_UNKNOWN_ENCODING = $67a3d89fb2873d67$require$_require$codes.ERR_UNKNOWN_ENCODING;
var $67a3d89fb2873d67$var$errorOrDestroy = $fka0R.errorOrDestroy;

(parcelRequire("8w0G4"))($67a3d89fb2873d67$var$Writable, $1OGRV);
function $67a3d89fb2873d67$var$nop() {
}

function $67a3d89fb2873d67$var$WritableState(options, stream, isDuplex) {
    $67a3d89fb2873d67$var$Duplex = $67a3d89fb2873d67$var$Duplex || (parcelRequire("aeLxJ"));
    options = options || {
    }; // Duplex streams are both readable and writable, but share
    // the same options object.
    // However, some cases require setting options to different
    // values for the readable and the writable sides of the duplex stream,
    // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.
    if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof $67a3d89fb2873d67$var$Duplex; // object stream flag to indicate whether or not this stream
    // contains buffers or objects.
    this.objectMode = !!options.objectMode;
    if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
    // Note: 0 is a valid value, means that we always return false if
    // the entire buffer is not flushed immediately on write()
    this.highWaterMark = $67a3d89fb2873d67$var$getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called
    this.finalCalled = false; // drain event flag.
    this.needDrain = false; // at the start of calling end()
    this.ending = false; // when end() has been called, and returned
    this.ended = false; // when 'finish' is emitted
    this.finished = false; // has it been destroyed
    this.destroyed = false; // should we decode strings into buffers before passing to _write?
    // this is here so that some node-core streams can optimize string
    // handling at a lower level.
    var noDecode = options.decodeStrings === false;
    this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
    // encoding is 'binary' so we have to make this configurable.
    // Everything else in the universe uses 'utf8', though.
    this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
    // of how much we're waiting to get pushed to some underlying
    // socket or file.
    this.length = 0; // a flag to see when we're in the middle of a write.
    this.writing = false; // when true all writes will be buffered until .uncork() call
    this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
    // or on a later tick.  We set this to true at first, because any
    // actions that shouldn't happen until "later" should generally also
    // not happen before the first write call.
    this.sync = true; // a flag to know if we're processing previously buffered items, which
    // may call the _write() callback in the same tick, so that we don't
    // end up in an overlapped onwrite situation.
    this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)
    this.onwrite = function(er) {
        $67a3d89fb2873d67$var$onwrite(stream, er);
    }; // the callback that the user supplies to write(chunk,encoding,cb)
    this.writecb = null; // the amount that is being written when _write is called.
    this.writelen = 0;
    this.bufferedRequest = null;
    this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
    // this must be 0 before 'finish' can be emitted
    this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
    // This is relevant for synchronous Transform streams
    this.prefinished = false; // True if the error was already emitted and should not be thrown again
    this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.
    this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')
    this.autoDestroy = !!options.autoDestroy; // count buffered requests
    this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
    // one allocated and free to use, and we maintain at most two
    this.corkedRequestsFree = new $67a3d89fb2873d67$var$CorkedRequest(this);
}
$67a3d89fb2873d67$var$WritableState.prototype.getBuffer = function getBuffer() {
    var current = this.bufferedRequest;
    var out = [];
    while(current){
        out.push(current);
        current = current.next;
    }
    return out;
};
(function() {
    try {
        Object.defineProperty($67a3d89fb2873d67$var$WritableState.prototype, 'buffer', {
            get: $67a3d89fb2873d67$var$internalUtil.deprecate(function writableStateBufferGetter() {
                return this.getBuffer();
            }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", 'DEP0003')
        });
    } catch (_) {
    }
})(); // Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var $67a3d89fb2873d67$var$realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
    $67a3d89fb2873d67$var$realHasInstance = Function.prototype[Symbol.hasInstance];
    Object.defineProperty($67a3d89fb2873d67$var$Writable, Symbol.hasInstance, {
        value: function value(object) {
            if ($67a3d89fb2873d67$var$realHasInstance.call(this, object)) return true;
            if (this !== $67a3d89fb2873d67$var$Writable) return false;
            return object && object._writableState instanceof $67a3d89fb2873d67$var$WritableState;
        }
    });
} else $67a3d89fb2873d67$var$realHasInstance = function realHasInstance(object) {
    return object instanceof this;
};

function $67a3d89fb2873d67$var$Writable(options) {
    $67a3d89fb2873d67$var$Duplex = $67a3d89fb2873d67$var$Duplex || (parcelRequire("aeLxJ")); // Writable ctor is applied to Duplexes, too.
    // `realHasInstance` is necessary because using plain `instanceof`
    // would return false, as no `_writableState` property is attached.
    // Trying to use the custom `instanceof` for Writable here will also break the
    // Node.js LazyTransform implementation, which has a non-trivial getter for
    // `_writableState` that would lead to infinite recursion.
    // Checking for a Stream.Duplex instance is faster here instead of inside
    // the WritableState constructor, at least with V8 6.5
    var isDuplex = this instanceof $67a3d89fb2873d67$var$Duplex;
    if (!isDuplex && !$67a3d89fb2873d67$var$realHasInstance.call($67a3d89fb2873d67$var$Writable, this)) return new $67a3d89fb2873d67$var$Writable(options);
    this._writableState = new $67a3d89fb2873d67$var$WritableState(options, this, isDuplex); // legacy.
    this.writable = true;
    if (options) {
        if (typeof options.write === 'function') this._write = options.write;
        if (typeof options.writev === 'function') this._writev = options.writev;
        if (typeof options.destroy === 'function') this._destroy = options.destroy;
        if (typeof options.final === 'function') this._final = options.final;
    }
    $1OGRV.call(this);
} // Otherwise people can pipe Writable streams, which is just wrong.
$67a3d89fb2873d67$var$Writable.prototype.pipe = function() {
    $67a3d89fb2873d67$var$errorOrDestroy(this, new $67a3d89fb2873d67$var$ERR_STREAM_CANNOT_PIPE());
};
function $67a3d89fb2873d67$var$writeAfterEnd(stream, cb) {
    var er = new $67a3d89fb2873d67$var$ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb
    $67a3d89fb2873d67$var$errorOrDestroy(stream, er);
    process.nextTick(cb, er);
} // Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function $67a3d89fb2873d67$var$validChunk(stream, state, chunk, cb) {
    var er;
    if (chunk === null) er = new $67a3d89fb2873d67$var$ERR_STREAM_NULL_VALUES();
    else if (typeof chunk !== 'string' && !state.objectMode) er = new $67a3d89fb2873d67$var$ERR_INVALID_ARG_TYPE('chunk', [
        'string',
        'Buffer'
    ], chunk);
    if (er) {
        $67a3d89fb2873d67$var$errorOrDestroy(stream, er);
        process.nextTick(cb, er);
        return false;
    }
    return true;
}
$67a3d89fb2873d67$var$Writable.prototype.write = function(chunk, encoding, cb) {
    var state = this._writableState;
    var ret = false;
    var isBuf = !state.objectMode && $67a3d89fb2873d67$var$_isUint8Array(chunk);
    if (isBuf && !$67a3d89fb2873d67$require$Buffer.isBuffer(chunk)) chunk = $67a3d89fb2873d67$var$_uint8ArrayToBuffer(chunk);
    if (typeof encoding === 'function') {
        cb = encoding;
        encoding = null;
    }
    if (isBuf) encoding = 'buffer';
    else if (!encoding) encoding = state.defaultEncoding;
    if (typeof cb !== 'function') cb = $67a3d89fb2873d67$var$nop;
    if (state.ending) $67a3d89fb2873d67$var$writeAfterEnd(this, cb);
    else if (isBuf || $67a3d89fb2873d67$var$validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = $67a3d89fb2873d67$var$writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
    }
    return ret;
};
$67a3d89fb2873d67$var$Writable.prototype.cork = function() {
    this._writableState.corked++;
};
$67a3d89fb2873d67$var$Writable.prototype.uncork = function() {
    var state = this._writableState;
    if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) $67a3d89fb2873d67$var$clearBuffer(this, state);
    }
};
$67a3d89fb2873d67$var$Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
    // node::ParseEncoding() requires lower case.
    if (typeof encoding === 'string') encoding = encoding.toLowerCase();
    if (!([
        'hex',
        'utf8',
        'utf-8',
        'ascii',
        'binary',
        'base64',
        'ucs2',
        'ucs-2',
        'utf16le',
        'utf-16le',
        'raw'
    ].indexOf((encoding + '').toLowerCase()) > -1)) throw new $67a3d89fb2873d67$var$ERR_UNKNOWN_ENCODING(encoding);
    this._writableState.defaultEncoding = encoding;
    return this;
};
Object.defineProperty($67a3d89fb2873d67$var$Writable.prototype, 'writableBuffer', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState && this._writableState.getBuffer();
    }
});
function $67a3d89fb2873d67$var$decodeChunk(state, chunk, encoding) {
    if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') chunk = $67a3d89fb2873d67$require$Buffer.from(chunk, encoding);
    return chunk;
}
Object.defineProperty($67a3d89fb2873d67$var$Writable.prototype, 'writableHighWaterMark', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState.highWaterMark;
    }
}); // if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function $67a3d89fb2873d67$var$writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
    if (!isBuf) {
        var newChunk = $67a3d89fb2873d67$var$decodeChunk(state, chunk, encoding);
        if (chunk !== newChunk) {
            isBuf = true;
            encoding = 'buffer';
            chunk = newChunk;
        }
    }
    var len = state.objectMode ? 1 : chunk.length;
    state.length += len;
    var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.
    if (!ret) state.needDrain = true;
    if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = {
            chunk: chunk,
            encoding: encoding,
            isBuf: isBuf,
            callback: cb,
            next: null
        };
        if (last) last.next = state.lastBufferedRequest;
        else state.bufferedRequest = state.lastBufferedRequest;
        state.bufferedRequestCount += 1;
    } else $67a3d89fb2873d67$var$doWrite(stream, state, false, len, chunk, encoding, cb);
    return ret;
}
function $67a3d89fb2873d67$var$doWrite(stream, state, writev, len, chunk, encoding, cb) {
    state.writelen = len;
    state.writecb = cb;
    state.writing = true;
    state.sync = true;
    if (state.destroyed) state.onwrite(new $67a3d89fb2873d67$var$ERR_STREAM_DESTROYED('write'));
    else if (writev) stream._writev(chunk, state.onwrite);
    else stream._write(chunk, encoding, state.onwrite);
    state.sync = false;
}
function $67a3d89fb2873d67$var$onwriteError(stream, state, sync, er, cb) {
    --state.pendingcb;
    if (sync) {
        // defer the callback if we are being called synchronously
        // to avoid piling up things on the stack
        process.nextTick(cb, er); // this can emit finish, and it will always happen
        // after error
        process.nextTick($67a3d89fb2873d67$var$finishMaybe, stream, state);
        stream._writableState.errorEmitted = true;
        $67a3d89fb2873d67$var$errorOrDestroy(stream, er);
    } else {
        // the caller expect this to happen before if
        // it is async
        cb(er);
        stream._writableState.errorEmitted = true;
        $67a3d89fb2873d67$var$errorOrDestroy(stream, er); // this can emit finish, but finish must
        // always follow error
        $67a3d89fb2873d67$var$finishMaybe(stream, state);
    }
}
function $67a3d89fb2873d67$var$onwriteStateUpdate(state) {
    state.writing = false;
    state.writecb = null;
    state.length -= state.writelen;
    state.writelen = 0;
}
function $67a3d89fb2873d67$var$onwrite(stream, er) {
    var state = stream._writableState;
    var sync = state.sync;
    var cb = state.writecb;
    if (typeof cb !== 'function') throw new $67a3d89fb2873d67$var$ERR_MULTIPLE_CALLBACK();
    $67a3d89fb2873d67$var$onwriteStateUpdate(state);
    if (er) $67a3d89fb2873d67$var$onwriteError(stream, state, sync, er, cb);
    else {
        // Check if we're actually ready to finish, but don't emit yet
        var finished = $67a3d89fb2873d67$var$needFinish(state) || stream.destroyed;
        if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) $67a3d89fb2873d67$var$clearBuffer(stream, state);
        if (sync) process.nextTick($67a3d89fb2873d67$var$afterWrite, stream, state, finished, cb);
        else $67a3d89fb2873d67$var$afterWrite(stream, state, finished, cb);
    }
}
function $67a3d89fb2873d67$var$afterWrite(stream, state, finished, cb) {
    if (!finished) $67a3d89fb2873d67$var$onwriteDrain(stream, state);
    state.pendingcb--;
    cb();
    $67a3d89fb2873d67$var$finishMaybe(stream, state);
} // Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function $67a3d89fb2873d67$var$onwriteDrain(stream, state) {
    if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit('drain');
    }
} // if there's something in the buffer waiting, then process it
function $67a3d89fb2873d67$var$clearBuffer(stream, state) {
    state.bufferProcessing = true;
    var entry = state.bufferedRequest;
    if (stream._writev && entry && entry.next) {
        // Fast case, write everything using _writev()
        var l = state.bufferedRequestCount;
        var buffer = new Array(l);
        var holder = state.corkedRequestsFree;
        holder.entry = entry;
        var count = 0;
        var allBuffers = true;
        while(entry){
            buffer[count] = entry;
            if (!entry.isBuf) allBuffers = false;
            entry = entry.next;
            count += 1;
        }
        buffer.allBuffers = allBuffers;
        $67a3d89fb2873d67$var$doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
        // as the hot path ends with doWrite
        state.pendingcb++;
        state.lastBufferedRequest = null;
        if (holder.next) {
            state.corkedRequestsFree = holder.next;
            holder.next = null;
        } else state.corkedRequestsFree = new $67a3d89fb2873d67$var$CorkedRequest(state);
        state.bufferedRequestCount = 0;
    } else {
        // Slow case, write chunks one-by-one
        while(entry){
            var chunk = entry.chunk;
            var encoding = entry.encoding;
            var cb = entry.callback;
            var len = state.objectMode ? 1 : chunk.length;
            $67a3d89fb2873d67$var$doWrite(stream, state, false, len, chunk, encoding, cb);
            entry = entry.next;
            state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
            // it means that we need to wait until it does.
            // also, that means that the chunk and cb are currently
            // being processed, so move the buffer counter past them.
            if (state.writing) break;
        }
        if (entry === null) state.lastBufferedRequest = null;
    }
    state.bufferedRequest = entry;
    state.bufferProcessing = false;
}
$67a3d89fb2873d67$var$Writable.prototype._write = function(chunk, encoding, cb) {
    cb(new $67a3d89fb2873d67$var$ERR_METHOD_NOT_IMPLEMENTED('_write()'));
};
$67a3d89fb2873d67$var$Writable.prototype._writev = null;
$67a3d89fb2873d67$var$Writable.prototype.end = function(chunk, encoding, cb) {
    var state = this._writableState;
    if (typeof chunk === 'function') {
        cb = chunk;
        chunk = null;
        encoding = null;
    } else if (typeof encoding === 'function') {
        cb = encoding;
        encoding = null;
    }
    if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks
    if (state.corked) {
        state.corked = 1;
        this.uncork();
    } // ignore unnecessary end() calls.
    if (!state.ending) $67a3d89fb2873d67$var$endWritable(this, state, cb);
    return this;
};
Object.defineProperty($67a3d89fb2873d67$var$Writable.prototype, 'writableLength', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState.length;
    }
});
function $67a3d89fb2873d67$var$needFinish(state) {
    return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function $67a3d89fb2873d67$var$callFinal(stream, state) {
    stream._final(function(err) {
        state.pendingcb--;
        if (err) $67a3d89fb2873d67$var$errorOrDestroy(stream, err);
        state.prefinished = true;
        stream.emit('prefinish');
        $67a3d89fb2873d67$var$finishMaybe(stream, state);
    });
}
function $67a3d89fb2873d67$var$prefinish(stream, state) {
    if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === 'function' && !state.destroyed) {
            state.pendingcb++;
            state.finalCalled = true;
            process.nextTick($67a3d89fb2873d67$var$callFinal, stream, state);
        } else {
            state.prefinished = true;
            stream.emit('prefinish');
        }
    }
}
function $67a3d89fb2873d67$var$finishMaybe(stream, state) {
    var need = $67a3d89fb2873d67$var$needFinish(state);
    if (need) {
        $67a3d89fb2873d67$var$prefinish(stream, state);
        if (state.pendingcb === 0) {
            state.finished = true;
            stream.emit('finish');
            if (state.autoDestroy) {
                // In case of duplex streams we need a way to detect
                // if the readable side is ready for autoDestroy as well
                var rState = stream._readableState;
                if (!rState || rState.autoDestroy && rState.endEmitted) stream.destroy();
            }
        }
    }
    return need;
}
function $67a3d89fb2873d67$var$endWritable(stream, state, cb) {
    state.ending = true;
    $67a3d89fb2873d67$var$finishMaybe(stream, state);
    if (cb) {
        if (state.finished) process.nextTick(cb);
        else stream.once('finish', cb);
    }
    state.ended = true;
    stream.writable = false;
}
function $67a3d89fb2873d67$var$onCorkedFinish(corkReq, state, err) {
    var entry = corkReq.entry;
    corkReq.entry = null;
    while(entry){
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
    } // reuse the free corkReq.
    state.corkedRequestsFree.next = corkReq;
}
Object.defineProperty($67a3d89fb2873d67$var$Writable.prototype, 'destroyed', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        if (this._writableState === undefined) return false;
        return this._writableState.destroyed;
    },
    set: function set(value) {
        // we ignore the value if the stream
        // has not been initialized yet
        if (!this._writableState) return;
         // backward compatibility, the user is explicitly
        // managing destroyed
        this._writableState.destroyed = value;
    }
});
$67a3d89fb2873d67$var$Writable.prototype.destroy = $fka0R.destroy;
$67a3d89fb2873d67$var$Writable.prototype._undestroy = $fka0R.undestroy;
$67a3d89fb2873d67$var$Writable.prototype._destroy = function(err, cb) {
    cb(err);
};

});
parcelRequire.register("bF0Rv", function(module, exports) {

/**
 * For Node.js, simply re-export the core `util.deprecate` function.
 */ module.exports = $lEd20$util.deprecate;

});



parcelRequire.register("kWYSK", function(module, exports) {

$parcel$export(module.exports, "StringDecoder", () => $f408735a76902733$export$63a7aa211a91ed69, (v) => $f408735a76902733$export$63a7aa211a91ed69 = v);
// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
var $f408735a76902733$export$63a7aa211a91ed69;
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';

var $jBz4c = parcelRequire("jBz4c");
var $f408735a76902733$require$Buffer = $jBz4c.Buffer;
/*</replacement>*/ var $f408735a76902733$var$isEncoding = $f408735a76902733$require$Buffer.isEncoding || function(encoding) {
    encoding = '' + encoding;
    switch(encoding && encoding.toLowerCase()){
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
        case 'raw':
            return true;
        default:
            return false;
    }
};
function $f408735a76902733$var$_normalizeEncoding(enc) {
    if (!enc) return 'utf8';
    var retried;
    while(true)switch(enc){
        case 'utf8':
        case 'utf-8':
            return 'utf8';
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
            return 'utf16le';
        case 'latin1':
        case 'binary':
            return 'latin1';
        case 'base64':
        case 'ascii':
        case 'hex':
            return enc;
        default:
            if (retried) return; // undefined
            enc = ('' + enc).toLowerCase();
            retried = true;
    }
}
// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function $f408735a76902733$var$normalizeEncoding(enc) {
    var nenc = $f408735a76902733$var$_normalizeEncoding(enc);
    if (typeof nenc !== 'string' && ($f408735a76902733$require$Buffer.isEncoding === $f408735a76902733$var$isEncoding || !$f408735a76902733$var$isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
    return nenc || enc;
}
$f408735a76902733$export$63a7aa211a91ed69 = $f408735a76902733$var$StringDecoder;
function $f408735a76902733$var$StringDecoder(encoding) {
    this.encoding = $f408735a76902733$var$normalizeEncoding(encoding);
    var nb;
    switch(this.encoding){
        case 'utf16le':
            this.text = $f408735a76902733$var$utf16Text;
            this.end = $f408735a76902733$var$utf16End;
            nb = 4;
            break;
        case 'utf8':
            this.fillLast = $f408735a76902733$var$utf8FillLast;
            nb = 4;
            break;
        case 'base64':
            this.text = $f408735a76902733$var$base64Text;
            this.end = $f408735a76902733$var$base64End;
            nb = 3;
            break;
        default:
            this.write = $f408735a76902733$var$simpleWrite;
            this.end = $f408735a76902733$var$simpleEnd;
            return;
    }
    this.lastNeed = 0;
    this.lastTotal = 0;
    this.lastChar = $f408735a76902733$require$Buffer.allocUnsafe(nb);
}
$f408735a76902733$var$StringDecoder.prototype.write = function(buf) {
    if (buf.length === 0) return '';
    var r;
    var i;
    if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === undefined) return '';
        i = this.lastNeed;
        this.lastNeed = 0;
    } else i = 0;
    if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
    return r || '';
};
$f408735a76902733$var$StringDecoder.prototype.end = $f408735a76902733$var$utf8End;
// Returns only complete characters in a Buffer
$f408735a76902733$var$StringDecoder.prototype.text = $f408735a76902733$var$utf8Text;
// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
$f408735a76902733$var$StringDecoder.prototype.fillLast = function(buf) {
    if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
    this.lastNeed -= buf.length;
};
// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function $f408735a76902733$var$utf8CheckByte(byte) {
    if (byte <= 127) return 0;
    else if (byte >> 5 === 6) return 2;
    else if (byte >> 4 === 14) return 3;
    else if (byte >> 3 === 30) return 4;
    return byte >> 6 === 2 ? -1 : -2;
}
// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function $f408735a76902733$var$utf8CheckIncomplete(self, buf, i) {
    var j = buf.length - 1;
    if (j < i) return 0;
    var nb = $f408735a76902733$var$utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 1;
        return nb;
    }
    if (--j < i || nb === -2) return 0;
    nb = $f408735a76902733$var$utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 2;
        return nb;
    }
    if (--j < i || nb === -2) return 0;
    nb = $f408735a76902733$var$utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) {
            if (nb === 2) nb = 0;
            else self.lastNeed = nb - 3;
        }
        return nb;
    }
    return 0;
}
// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function $f408735a76902733$var$utf8CheckExtraBytes(self, buf, p) {
    if ((buf[0] & 192) !== 128) {
        self.lastNeed = 0;
        return '\ufffd';
    }
    if (self.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 192) !== 128) {
            self.lastNeed = 1;
            return '\ufffd';
        }
        if (self.lastNeed > 2 && buf.length > 2) {
            if ((buf[2] & 192) !== 128) {
                self.lastNeed = 2;
                return '\ufffd';
            }
        }
    }
}
// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function $f408735a76902733$var$utf8FillLast(buf) {
    var p = this.lastTotal - this.lastNeed;
    var r = $f408735a76902733$var$utf8CheckExtraBytes(this, buf, p);
    if (r !== undefined) return r;
    if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, p, 0, buf.length);
    this.lastNeed -= buf.length;
}
// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function $f408735a76902733$var$utf8Text(buf, i) {
    var total = $f408735a76902733$var$utf8CheckIncomplete(this, buf, i);
    if (!this.lastNeed) return buf.toString('utf8', i);
    this.lastTotal = total;
    var end = buf.length - (total - this.lastNeed);
    buf.copy(this.lastChar, 0, end);
    return buf.toString('utf8', i, end);
}
// For UTF-8, a replacement character is added when ending on a partial
// character.
function $f408735a76902733$var$utf8End(buf) {
    var r = buf && buf.length ? this.write(buf) : '';
    if (this.lastNeed) return r + '\ufffd';
    return r;
}
// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function $f408735a76902733$var$utf16Text(buf, i) {
    if ((buf.length - i) % 2 === 0) {
        var r = buf.toString('utf16le', i);
        if (r) {
            var c = r.charCodeAt(r.length - 1);
            if (c >= 55296 && c <= 56319) {
                this.lastNeed = 2;
                this.lastTotal = 4;
                this.lastChar[0] = buf[buf.length - 2];
                this.lastChar[1] = buf[buf.length - 1];
                return r.slice(0, -1);
            }
        }
        return r;
    }
    this.lastNeed = 1;
    this.lastTotal = 2;
    this.lastChar[0] = buf[buf.length - 1];
    return buf.toString('utf16le', i, buf.length - 1);
}
// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function $f408735a76902733$var$utf16End(buf) {
    var r = buf && buf.length ? this.write(buf) : '';
    if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString('utf16le', 0, end);
    }
    return r;
}
function $f408735a76902733$var$base64Text(buf, i) {
    var n = (buf.length - i) % 3;
    if (n === 0) return buf.toString('base64', i);
    this.lastNeed = 3 - n;
    this.lastTotal = 3;
    if (n === 1) this.lastChar[0] = buf[buf.length - 1];
    else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
    }
    return buf.toString('base64', i, buf.length - n);
}
function $f408735a76902733$var$base64End(buf) {
    var r = buf && buf.length ? this.write(buf) : '';
    if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
    return r;
}
// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function $f408735a76902733$var$simpleWrite(buf) {
    return buf.toString(this.encoding);
}
function $f408735a76902733$var$simpleEnd(buf) {
    return buf && buf.length ? this.write(buf) : '';
}

});
parcelRequire.register("jBz4c", function(module, exports) {

var $e45cac8dc7f1fb87$var$Buffer = $lEd20$buffer.Buffer;
// alternative to using Object.keys for old browsers
function $e45cac8dc7f1fb87$var$copyProps(src, dst) {
    for(var key in src)dst[key] = src[key];
}
if ($e45cac8dc7f1fb87$var$Buffer.from && $e45cac8dc7f1fb87$var$Buffer.alloc && $e45cac8dc7f1fb87$var$Buffer.allocUnsafe && $e45cac8dc7f1fb87$var$Buffer.allocUnsafeSlow) module.exports = $lEd20$buffer;
else {
    // Copy properties from require('buffer')
    $e45cac8dc7f1fb87$var$copyProps($lEd20$buffer, module.exports);
    module.exports.Buffer = $e45cac8dc7f1fb87$var$SafeBuffer;
}
function $e45cac8dc7f1fb87$var$SafeBuffer(arg, encodingOrOffset, length) {
    return $e45cac8dc7f1fb87$var$Buffer(arg, encodingOrOffset, length);
}
$e45cac8dc7f1fb87$var$SafeBuffer.prototype = Object.create($e45cac8dc7f1fb87$var$Buffer.prototype);
// Copy static methods from Buffer
$e45cac8dc7f1fb87$var$copyProps($e45cac8dc7f1fb87$var$Buffer, $e45cac8dc7f1fb87$var$SafeBuffer);
$e45cac8dc7f1fb87$var$SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if (typeof arg === 'number') throw new TypeError('Argument must not be a number');
    return $e45cac8dc7f1fb87$var$Buffer(arg, encodingOrOffset, length);
};
$e45cac8dc7f1fb87$var$SafeBuffer.alloc = function(size, fill, encoding) {
    if (typeof size !== 'number') throw new TypeError('Argument must be a number');
    var buf = $e45cac8dc7f1fb87$var$Buffer(size);
    if (fill !== undefined) {
        if (typeof encoding === 'string') buf.fill(fill, encoding);
        else buf.fill(fill);
    } else buf.fill(0);
    return buf;
};
$e45cac8dc7f1fb87$var$SafeBuffer.allocUnsafe = function(size) {
    if (typeof size !== 'number') throw new TypeError('Argument must be a number');
    return $e45cac8dc7f1fb87$var$Buffer(size);
};
$e45cac8dc7f1fb87$var$SafeBuffer.allocUnsafeSlow = function(size) {
    if (typeof size !== 'number') throw new TypeError('Argument must be a number');
    return $lEd20$buffer.SlowBuffer(size);
};

});


parcelRequire.register("lYsTo", function(module, exports) {
'use strict';
var $fff59d01e3cbd2fb$var$_Object$setPrototypeO;
function $fff59d01e3cbd2fb$var$_defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}

var $dVD64 = parcelRequire("dVD64");
var $fff59d01e3cbd2fb$var$kLastResolve = Symbol('lastResolve');
var $fff59d01e3cbd2fb$var$kLastReject = Symbol('lastReject');
var $fff59d01e3cbd2fb$var$kError = Symbol('error');
var $fff59d01e3cbd2fb$var$kEnded = Symbol('ended');
var $fff59d01e3cbd2fb$var$kLastPromise = Symbol('lastPromise');
var $fff59d01e3cbd2fb$var$kHandlePromise = Symbol('handlePromise');
var $fff59d01e3cbd2fb$var$kStream = Symbol('stream');
function $fff59d01e3cbd2fb$var$createIterResult(value, done) {
    return {
        value: value,
        done: done
    };
}
function $fff59d01e3cbd2fb$var$readAndResolve(iter) {
    var resolve = iter[$fff59d01e3cbd2fb$var$kLastResolve];
    if (resolve !== null) {
        var data = iter[$fff59d01e3cbd2fb$var$kStream].read(); // we defer if data is null
        // we can be expecting either 'end' or
        // 'error'
        if (data !== null) {
            iter[$fff59d01e3cbd2fb$var$kLastPromise] = null;
            iter[$fff59d01e3cbd2fb$var$kLastResolve] = null;
            iter[$fff59d01e3cbd2fb$var$kLastReject] = null;
            resolve($fff59d01e3cbd2fb$var$createIterResult(data, false));
        }
    }
}
function $fff59d01e3cbd2fb$var$onReadable(iter) {
    // we wait for the next tick, because it might
    // emit an error with process.nextTick
    process.nextTick($fff59d01e3cbd2fb$var$readAndResolve, iter);
}
function $fff59d01e3cbd2fb$var$wrapForNext(lastPromise, iter) {
    return function(resolve, reject) {
        lastPromise.then(function() {
            if (iter[$fff59d01e3cbd2fb$var$kEnded]) {
                resolve($fff59d01e3cbd2fb$var$createIterResult(undefined, true));
                return;
            }
            iter[$fff59d01e3cbd2fb$var$kHandlePromise](resolve, reject);
        }, reject);
    };
}
var $fff59d01e3cbd2fb$var$AsyncIteratorPrototype = Object.getPrototypeOf(function() {
});
var $fff59d01e3cbd2fb$var$ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf(($fff59d01e3cbd2fb$var$_Object$setPrototypeO = {
    get stream () {
        return this[$fff59d01e3cbd2fb$var$kStream];
    },
    next: function next() {
        var _this = this;
        // if we have detected an error in the meanwhile
        // reject straight away
        var error = this[$fff59d01e3cbd2fb$var$kError];
        if (error !== null) return Promise.reject(error);
        if (this[$fff59d01e3cbd2fb$var$kEnded]) return Promise.resolve($fff59d01e3cbd2fb$var$createIterResult(undefined, true));
        if (this[$fff59d01e3cbd2fb$var$kStream].destroyed) // We need to defer via nextTick because if .destroy(err) is
        // called, the error will be emitted via nextTick, and
        // we cannot guarantee that there is no error lingering around
        // waiting to be emitted.
        return new Promise(function(resolve, reject) {
            process.nextTick(function() {
                if (_this[$fff59d01e3cbd2fb$var$kError]) reject(_this[$fff59d01e3cbd2fb$var$kError]);
                else resolve($fff59d01e3cbd2fb$var$createIterResult(undefined, true));
            });
        });
         // if we have multiple next() calls
        // we will wait for the previous Promise to finish
        // this logic is optimized to support for await loops,
        // where next() is only called once at a time
        var lastPromise = this[$fff59d01e3cbd2fb$var$kLastPromise];
        var promise;
        if (lastPromise) promise = new Promise($fff59d01e3cbd2fb$var$wrapForNext(lastPromise, this));
        else {
            // fast path needed to support multiple this.push()
            // without triggering the next() queue
            var data = this[$fff59d01e3cbd2fb$var$kStream].read();
            if (data !== null) return Promise.resolve($fff59d01e3cbd2fb$var$createIterResult(data, false));
            promise = new Promise(this[$fff59d01e3cbd2fb$var$kHandlePromise]);
        }
        this[$fff59d01e3cbd2fb$var$kLastPromise] = promise;
        return promise;
    }
}, $fff59d01e3cbd2fb$var$_defineProperty($fff59d01e3cbd2fb$var$_Object$setPrototypeO, Symbol.asyncIterator, function() {
    return this;
}), $fff59d01e3cbd2fb$var$_defineProperty($fff59d01e3cbd2fb$var$_Object$setPrototypeO, "return", function _return() {
    var _this2 = this;
    // destroy(err, cb) is a private API
    // we can guarantee we have that here, because we control the
    // Readable class this is attached to
    return new Promise(function(resolve, reject) {
        _this2[$fff59d01e3cbd2fb$var$kStream].destroy(null, function(err) {
            if (err) {
                reject(err);
                return;
            }
            resolve($fff59d01e3cbd2fb$var$createIterResult(undefined, true));
        });
    });
}), $fff59d01e3cbd2fb$var$_Object$setPrototypeO), $fff59d01e3cbd2fb$var$AsyncIteratorPrototype);
var $fff59d01e3cbd2fb$var$createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
    var _Object$create;
    var iterator = Object.create($fff59d01e3cbd2fb$var$ReadableStreamAsyncIteratorPrototype, (_Object$create = {
    }, $fff59d01e3cbd2fb$var$_defineProperty(_Object$create, $fff59d01e3cbd2fb$var$kStream, {
        value: stream,
        writable: true
    }), $fff59d01e3cbd2fb$var$_defineProperty(_Object$create, $fff59d01e3cbd2fb$var$kLastResolve, {
        value: null,
        writable: true
    }), $fff59d01e3cbd2fb$var$_defineProperty(_Object$create, $fff59d01e3cbd2fb$var$kLastReject, {
        value: null,
        writable: true
    }), $fff59d01e3cbd2fb$var$_defineProperty(_Object$create, $fff59d01e3cbd2fb$var$kError, {
        value: null,
        writable: true
    }), $fff59d01e3cbd2fb$var$_defineProperty(_Object$create, $fff59d01e3cbd2fb$var$kEnded, {
        value: stream._readableState.endEmitted,
        writable: true
    }), $fff59d01e3cbd2fb$var$_defineProperty(_Object$create, $fff59d01e3cbd2fb$var$kHandlePromise, {
        value: function value(resolve, reject) {
            var data = iterator[$fff59d01e3cbd2fb$var$kStream].read();
            if (data) {
                iterator[$fff59d01e3cbd2fb$var$kLastPromise] = null;
                iterator[$fff59d01e3cbd2fb$var$kLastResolve] = null;
                iterator[$fff59d01e3cbd2fb$var$kLastReject] = null;
                resolve($fff59d01e3cbd2fb$var$createIterResult(data, false));
            } else {
                iterator[$fff59d01e3cbd2fb$var$kLastResolve] = resolve;
                iterator[$fff59d01e3cbd2fb$var$kLastReject] = reject;
            }
        },
        writable: true
    }), _Object$create));
    iterator[$fff59d01e3cbd2fb$var$kLastPromise] = null;
    $dVD64(stream, function(err) {
        if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
            var reject = iterator[$fff59d01e3cbd2fb$var$kLastReject]; // reject if we are waiting for data in the Promise
            // returned by next() and store the error
            if (reject !== null) {
                iterator[$fff59d01e3cbd2fb$var$kLastPromise] = null;
                iterator[$fff59d01e3cbd2fb$var$kLastResolve] = null;
                iterator[$fff59d01e3cbd2fb$var$kLastReject] = null;
                reject(err);
            }
            iterator[$fff59d01e3cbd2fb$var$kError] = err;
            return;
        }
        var resolve = iterator[$fff59d01e3cbd2fb$var$kLastResolve];
        if (resolve !== null) {
            iterator[$fff59d01e3cbd2fb$var$kLastPromise] = null;
            iterator[$fff59d01e3cbd2fb$var$kLastResolve] = null;
            iterator[$fff59d01e3cbd2fb$var$kLastReject] = null;
            resolve($fff59d01e3cbd2fb$var$createIterResult(undefined, true));
        }
        iterator[$fff59d01e3cbd2fb$var$kEnded] = true;
    });
    stream.on('readable', $fff59d01e3cbd2fb$var$onReadable.bind(null, iterator));
    return iterator;
};
module.exports = $fff59d01e3cbd2fb$var$createReadableStreamAsyncIterator;

});
parcelRequire.register("dVD64", function(module, exports) {
// Ported from https://github.com/mafintosh/end-of-stream with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';

var $hWT79 = parcelRequire("hWT79");
var $a23eed13fc09cc41$var$ERR_STREAM_PREMATURE_CLOSE = $hWT79.codes.ERR_STREAM_PREMATURE_CLOSE;
function $a23eed13fc09cc41$var$once(callback) {
    var called = false;
    return function() {
        if (called) return;
        called = true;
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)args[_key] = arguments[_key];
        callback.apply(this, args);
    };
}
function $a23eed13fc09cc41$var$noop() {
}
function $a23eed13fc09cc41$var$isRequest(stream) {
    return stream.setHeader && typeof stream.abort === 'function';
}
function $a23eed13fc09cc41$var$eos(stream, opts, callback) {
    if (typeof opts === 'function') return $a23eed13fc09cc41$var$eos(stream, null, opts);
    if (!opts) opts = {
    };
    callback = $a23eed13fc09cc41$var$once(callback || $a23eed13fc09cc41$var$noop);
    var readable = opts.readable || opts.readable !== false && stream.readable;
    var writable = opts.writable || opts.writable !== false && stream.writable;
    var onlegacyfinish = function onlegacyfinish() {
        if (!stream.writable) onfinish();
    };
    var writableEnded = stream._writableState && stream._writableState.finished;
    var onfinish = function onfinish() {
        writable = false;
        writableEnded = true;
        if (!readable) callback.call(stream);
    };
    var readableEnded = stream._readableState && stream._readableState.endEmitted;
    var onend = function onend() {
        readable = false;
        readableEnded = true;
        if (!writable) callback.call(stream);
    };
    var onerror = function onerror(err) {
        callback.call(stream, err);
    };
    var onclose = function onclose() {
        var err;
        if (readable && !readableEnded) {
            if (!stream._readableState || !stream._readableState.ended) err = new $a23eed13fc09cc41$var$ERR_STREAM_PREMATURE_CLOSE();
            return callback.call(stream, err);
        }
        if (writable && !writableEnded) {
            if (!stream._writableState || !stream._writableState.ended) err = new $a23eed13fc09cc41$var$ERR_STREAM_PREMATURE_CLOSE();
            return callback.call(stream, err);
        }
    };
    var onrequest = function onrequest() {
        stream.req.on('finish', onfinish);
    };
    if ($a23eed13fc09cc41$var$isRequest(stream)) {
        stream.on('complete', onfinish);
        stream.on('abort', onclose);
        if (stream.req) onrequest();
        else stream.on('request', onrequest);
    } else if (writable && !stream._writableState) {
        // legacy streams
        stream.on('end', onlegacyfinish);
        stream.on('close', onlegacyfinish);
    }
    stream.on('end', onend);
    stream.on('finish', onfinish);
    if (opts.error !== false) stream.on('error', onerror);
    stream.on('close', onclose);
    return function() {
        stream.removeListener('complete', onfinish);
        stream.removeListener('abort', onclose);
        stream.removeListener('request', onrequest);
        if (stream.req) stream.req.removeListener('finish', onfinish);
        stream.removeListener('end', onlegacyfinish);
        stream.removeListener('close', onlegacyfinish);
        stream.removeListener('finish', onfinish);
        stream.removeListener('end', onend);
        stream.removeListener('error', onerror);
        stream.removeListener('close', onclose);
    };
}
module.exports = $a23eed13fc09cc41$var$eos;

});


parcelRequire.register("7kMQO", function(module, exports) {
'use strict';
function $0160c768f46fcabb$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function $0160c768f46fcabb$var$_asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $0160c768f46fcabb$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $0160c768f46fcabb$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function $0160c768f46fcabb$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function $0160c768f46fcabb$var$_objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {
        };
        if (i % 2) $0160c768f46fcabb$var$ownKeys(Object(source), true).forEach(function(key) {
            $0160c768f46fcabb$var$_defineProperty(target, key, source[key]);
        });
        else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        else $0160c768f46fcabb$var$ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function $0160c768f46fcabb$var$_defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}

var $hWT79 = parcelRequire("hWT79");
var $0160c768f46fcabb$var$ERR_INVALID_ARG_TYPE = $hWT79.codes.ERR_INVALID_ARG_TYPE;
function $0160c768f46fcabb$var$from(Readable, iterable, opts) {
    var iterator;
    if (iterable && typeof iterable.next === 'function') iterator = iterable;
    else if (iterable && iterable[Symbol.asyncIterator]) iterator = iterable[Symbol.asyncIterator]();
    else if (iterable && iterable[Symbol.iterator]) iterator = iterable[Symbol.iterator]();
    else throw new $0160c768f46fcabb$var$ERR_INVALID_ARG_TYPE('iterable', [
        'Iterable'
    ], iterable);
    var readable = new Readable($0160c768f46fcabb$var$_objectSpread({
        objectMode: true
    }, opts)); // Reading boolean to protect against _read
    // being called before last iteration completion.
    var reading = false;
    readable._read = function() {
        if (!reading) {
            reading = true;
            next();
        }
    };
    function next() {
        return _next2.apply(this, arguments);
    }
    function _next2() {
        _next2 = $0160c768f46fcabb$var$_asyncToGenerator(function*() {
            try {
                var _ref = yield iterator.next(), value = _ref.value, done = _ref.done;
                if (done) readable.push(null);
                else if (readable.push((yield value))) next();
                else reading = false;
            } catch (err) {
                readable.destroy(err);
            }
        });
        return _next2.apply(this, arguments);
    }
    return readable;
}
module.exports = $0160c768f46fcabb$var$from;

});


parcelRequire.register("lsHBo", function(module, exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.
'use strict';
module.exports = $f9fe08f6b57e4e11$var$Transform;

var $hWT79 = parcelRequire("hWT79");
var $f9fe08f6b57e4e11$require$_require$codes = $hWT79.codes;
var $f9fe08f6b57e4e11$var$ERR_METHOD_NOT_IMPLEMENTED = $f9fe08f6b57e4e11$require$_require$codes.ERR_METHOD_NOT_IMPLEMENTED, $f9fe08f6b57e4e11$var$ERR_MULTIPLE_CALLBACK = $f9fe08f6b57e4e11$require$_require$codes.ERR_MULTIPLE_CALLBACK, $f9fe08f6b57e4e11$var$ERR_TRANSFORM_ALREADY_TRANSFORMING = $f9fe08f6b57e4e11$require$_require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING, $f9fe08f6b57e4e11$var$ERR_TRANSFORM_WITH_LENGTH_0 = $f9fe08f6b57e4e11$require$_require$codes.ERR_TRANSFORM_WITH_LENGTH_0;

var $aeLxJ = parcelRequire("aeLxJ");

(parcelRequire("8w0G4"))($f9fe08f6b57e4e11$var$Transform, $aeLxJ);
function $f9fe08f6b57e4e11$var$afterTransform(er, data) {
    var ts = this._transformState;
    ts.transforming = false;
    var cb = ts.writecb;
    if (cb === null) return this.emit('error', new $f9fe08f6b57e4e11$var$ERR_MULTIPLE_CALLBACK());
    ts.writechunk = null;
    ts.writecb = null;
    if (data != null) this.push(data);
    cb(er);
    var rs = this._readableState;
    rs.reading = false;
    if (rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
}
function $f9fe08f6b57e4e11$var$Transform(options) {
    if (!(this instanceof $f9fe08f6b57e4e11$var$Transform)) return new $f9fe08f6b57e4e11$var$Transform(options);
    $aeLxJ.call(this, options);
    this._transformState = {
        afterTransform: $f9fe08f6b57e4e11$var$afterTransform.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null
    }; // start out asking for a readable event once data is transformed.
    this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
    // that Readable wants before the first _read call, so unset the
    // sync guard flag.
    this._readableState.sync = false;
    if (options) {
        if (typeof options.transform === 'function') this._transform = options.transform;
        if (typeof options.flush === 'function') this._flush = options.flush;
    } // When the writable side finishes, then flush out anything remaining.
    this.on('prefinish', $f9fe08f6b57e4e11$var$prefinish);
}
function $f9fe08f6b57e4e11$var$prefinish() {
    var _this = this;
    if (typeof this._flush === 'function' && !this._readableState.destroyed) this._flush(function(er, data) {
        $f9fe08f6b57e4e11$var$done(_this, er, data);
    });
    else $f9fe08f6b57e4e11$var$done(this, null, null);
}
$f9fe08f6b57e4e11$var$Transform.prototype.push = function(chunk, encoding) {
    this._transformState.needTransform = false;
    return $aeLxJ.prototype.push.call(this, chunk, encoding);
}; // This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
$f9fe08f6b57e4e11$var$Transform.prototype._transform = function(chunk, encoding, cb) {
    cb(new $f9fe08f6b57e4e11$var$ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
};
$f9fe08f6b57e4e11$var$Transform.prototype._write = function(chunk, encoding, cb) {
    var ts = this._transformState;
    ts.writecb = cb;
    ts.writechunk = chunk;
    ts.writeencoding = encoding;
    if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
    }
}; // Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
$f9fe08f6b57e4e11$var$Transform.prototype._read = function(n) {
    var ts = this._transformState;
    if (ts.writechunk !== null && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
    } else // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
};
$f9fe08f6b57e4e11$var$Transform.prototype._destroy = function(err, cb) {
    $aeLxJ.prototype._destroy.call(this, err, function(err2) {
        cb(err2);
    });
};
function $f9fe08f6b57e4e11$var$done(stream, er, data) {
    if (er) return stream.emit('error', er);
    if (data != null) stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
    // if there's nothing in the write buffer, then that means
    // that nothing more will ever be provided
    if (stream._writableState.length) throw new $f9fe08f6b57e4e11$var$ERR_TRANSFORM_WITH_LENGTH_0();
    if (stream._transformState.transforming) throw new $f9fe08f6b57e4e11$var$ERR_TRANSFORM_ALREADY_TRANSFORMING();
    return stream.push(null);
}

});

parcelRequire.register("jM5UT", function(module, exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.
'use strict';
module.exports = $e65716ea60b28163$var$PassThrough;

var $lsHBo = parcelRequire("lsHBo");

(parcelRequire("8w0G4"))($e65716ea60b28163$var$PassThrough, $lsHBo);
function $e65716ea60b28163$var$PassThrough(options) {
    if (!(this instanceof $e65716ea60b28163$var$PassThrough)) return new $e65716ea60b28163$var$PassThrough(options);
    $lsHBo.call(this, options);
}
$e65716ea60b28163$var$PassThrough.prototype._transform = function(chunk, encoding, cb) {
    cb(null, chunk);
};

});

parcelRequire.register("P8YTp", function(module, exports) {
// Ported from https://github.com/mafintosh/pump with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';
var $099bbb009ee56d67$var$eos;
function $099bbb009ee56d67$var$once(callback) {
    var called = false;
    return function() {
        if (called) return;
        called = true;
        callback.apply(void 0, arguments);
    };
}

var $hWT79 = parcelRequire("hWT79");
var $099bbb009ee56d67$require$_require$codes = $hWT79.codes;
var $099bbb009ee56d67$var$ERR_MISSING_ARGS = $099bbb009ee56d67$require$_require$codes.ERR_MISSING_ARGS, $099bbb009ee56d67$var$ERR_STREAM_DESTROYED = $099bbb009ee56d67$require$_require$codes.ERR_STREAM_DESTROYED;
function $099bbb009ee56d67$var$noop(err) {
    // Rethrow the error if it exists to avoid swallowing it
    if (err) throw err;
}
function $099bbb009ee56d67$var$isRequest(stream) {
    return stream.setHeader && typeof stream.abort === 'function';
}

function $099bbb009ee56d67$var$destroyer(stream, reading, writing, callback) {
    callback = $099bbb009ee56d67$var$once(callback);
    var closed = false;
    stream.on('close', function() {
        closed = true;
    });
    if ($099bbb009ee56d67$var$eos === undefined) $099bbb009ee56d67$var$eos = (parcelRequire("dVD64"));
    $099bbb009ee56d67$var$eos(stream, {
        readable: reading,
        writable: writing
    }, function(err) {
        if (err) return callback(err);
        closed = true;
        callback();
    });
    var destroyed = false;
    return function(err) {
        if (closed) return;
        if (destroyed) return;
        destroyed = true; // request.destroy just do .end - .abort is what we want
        if ($099bbb009ee56d67$var$isRequest(stream)) return stream.abort();
        if (typeof stream.destroy === 'function') return stream.destroy();
        callback(err || new $099bbb009ee56d67$var$ERR_STREAM_DESTROYED('pipe'));
    };
}
function $099bbb009ee56d67$var$call(fn) {
    fn();
}
function $099bbb009ee56d67$var$pipe(from, to) {
    return from.pipe(to);
}
function $099bbb009ee56d67$var$popCallback(streams) {
    if (!streams.length) return $099bbb009ee56d67$var$noop;
    if (typeof streams[streams.length - 1] !== 'function') return $099bbb009ee56d67$var$noop;
    return streams.pop();
}
function $099bbb009ee56d67$var$pipeline() {
    for(var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++)streams[_key] = arguments[_key];
    var callback = $099bbb009ee56d67$var$popCallback(streams);
    if (Array.isArray(streams[0])) streams = streams[0];
    if (streams.length < 2) throw new $099bbb009ee56d67$var$ERR_MISSING_ARGS('streams');
    var error;
    var destroys = streams.map(function(stream, i) {
        var reading = i < streams.length - 1;
        var writing = i > 0;
        return $099bbb009ee56d67$var$destroyer(stream, reading, writing, function(err) {
            if (!error) error = err;
            if (err) destroys.forEach($099bbb009ee56d67$var$call);
            if (reading) return;
            destroys.forEach($099bbb009ee56d67$var$call);
            callback(error);
        });
    });
    return streams.reduce($099bbb009ee56d67$var$pipe);
}
module.exports = $099bbb009ee56d67$var$pipeline;

});


parcelRequire.register("3mY9x", function(module, exports) {
'use strict';
const $274216482025c783$var$metadata = Symbol.for('pino.metadata');

var $bcW9h = parcelRequire("bcW9h");

var $eRvhR = parcelRequire("eRvhR");
module.exports = function build(fn, opts = {
}) {
    const parseLines = opts.parse === 'lines';
    const parseLine = typeof opts.parseLine === 'function' ? opts.parseLine : JSON.parse;
    const close = opts.close || $274216482025c783$var$defaultClose;
    const stream = $bcW9h(function(line) {
        let value;
        try {
            value = parseLine(line);
        } catch (error) {
            this.emit('unknown', line, error);
            return;
        }
        if (value === null) {
            this.emit('unknown', line, 'Null value ignored');
            return;
        }
        if (typeof value !== 'object') value = {
            data: value,
            time: Date.now()
        };
        if (stream[$274216482025c783$var$metadata]) {
            stream.lastTime = value.time;
            stream.lastLevel = value.level;
            stream.lastObj = value;
        }
        if (parseLines) return line;
        return value;
    }, {
        autoDestroy: true
    });
    stream._destroy = function(err, cb) {
        const promise = close(err, cb);
        if (promise && typeof promise.then === 'function') promise.then(cb, cb);
    };
    if (opts.metadata !== false) {
        stream[$274216482025c783$var$metadata] = true;
        stream.lastTime = 0;
        stream.lastLevel = 0;
        stream.lastObj = null;
    }
    let res = fn(stream);
    if (res && typeof res.catch === 'function') {
        res.catch((err)=>{
            stream.destroy(err);
        });
        // set it to null to not retain a reference to the promise
        res = null;
    } else if (opts.enablePipelining && res) return $eRvhR(stream, res, {
        objectMode: true
    });
    return stream;
};
function $274216482025c783$var$defaultClose(err, cb) {
    process.nextTick(cb, err);
}

});
parcelRequire.register("bcW9h", function(module, exports) {
/*
Copyright (c) 2014-2018, Matteo Collina <hello@matteocollina.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR
IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/ 'use strict';

var $j7izJ = parcelRequire("j7izJ");
var $828debd1784c60c6$require$Transform = $j7izJ.Transform;

var $828debd1784c60c6$require$StringDecoder = $lEd20$string_decoder.StringDecoder;
const $828debd1784c60c6$var$kLast = Symbol('last');
const $828debd1784c60c6$var$kDecoder = Symbol('decoder');
function $828debd1784c60c6$var$transform(chunk, enc, cb) {
    var list;
    if (this.overflow) {
        var buf = this[$828debd1784c60c6$var$kDecoder].write(chunk);
        list = buf.split(this.matcher);
        if (list.length === 1) return cb() // Line ending not found. Discard entire chunk.
        ;
        // Line ending found. Discard trailing fragment of previous line and reset overflow state.
        list.shift();
        this.overflow = false;
    } else {
        this[$828debd1784c60c6$var$kLast] += this[$828debd1784c60c6$var$kDecoder].write(chunk);
        list = this[$828debd1784c60c6$var$kLast].split(this.matcher);
    }
    this[$828debd1784c60c6$var$kLast] = list.pop();
    for(var i = 0; i < list.length; i++)try {
        $828debd1784c60c6$var$push(this, this.mapper(list[i]));
    } catch (error) {
        return cb(error);
    }
    this.overflow = this[$828debd1784c60c6$var$kLast].length > this.maxLength;
    if (this.overflow && !this.skipOverflow) return cb(new Error('maximum buffer reached'));
    cb();
}
function $828debd1784c60c6$var$flush(cb) {
    // forward any gibberish left in there
    this[$828debd1784c60c6$var$kLast] += this[$828debd1784c60c6$var$kDecoder].end();
    if (this[$828debd1784c60c6$var$kLast]) try {
        $828debd1784c60c6$var$push(this, this.mapper(this[$828debd1784c60c6$var$kLast]));
    } catch (error) {
        return cb(error);
    }
    cb();
}
function $828debd1784c60c6$var$push(self, val) {
    if (val !== undefined) self.push(val);
}
function $828debd1784c60c6$var$noop(incoming) {
    return incoming;
}
function $828debd1784c60c6$var$split(matcher, mapper, options) {
    // Set defaults for any arguments not supplied.
    matcher = matcher || /\r?\n/;
    mapper = mapper || $828debd1784c60c6$var$noop;
    options = options || {
    };
    // Test arguments explicitly.
    switch(arguments.length){
        case 1:
            // If mapper is only argument.
            if (typeof matcher === 'function') {
                mapper = matcher;
                matcher = /\r?\n/;
            // If options is only argument.
            } else if (typeof matcher === 'object' && !(matcher instanceof RegExp)) {
                options = matcher;
                matcher = /\r?\n/;
            }
            break;
        case 2:
            // If mapper and options are arguments.
            if (typeof matcher === 'function') {
                options = mapper;
                mapper = matcher;
                matcher = /\r?\n/;
            // If matcher and options are arguments.
            } else if (typeof mapper === 'object') {
                options = mapper;
                mapper = $828debd1784c60c6$var$noop;
            }
    }
    options = Object.assign({
    }, options);
    options.transform = $828debd1784c60c6$var$transform;
    options.flush = $828debd1784c60c6$var$flush;
    options.readableObjectMode = true;
    const stream = new $828debd1784c60c6$require$Transform(options);
    stream[$828debd1784c60c6$var$kLast] = '';
    stream[$828debd1784c60c6$var$kDecoder] = new $828debd1784c60c6$require$StringDecoder('utf8');
    stream.matcher = matcher;
    stream.mapper = mapper;
    stream.maxLength = options.maxLength;
    stream.skipOverflow = options.skipOverflow;
    stream.overflow = false;
    return stream;
}
module.exports = $828debd1784c60c6$var$split;

});

parcelRequire.register("eRvhR", function(module, exports) {

var $j7izJ = parcelRequire("j7izJ");

var $DEPnk = parcelRequire("DEPnk");

var $8w0G4 = parcelRequire("8w0G4");

var $3IGk1 = parcelRequire("3IGk1");
var $ad1e48e580cb7bdf$var$SIGNAL_FLUSH = Buffer.from && Buffer.from !== Uint8Array.from ? Buffer.from([
    0
]) : new Buffer([
    0
]);
var $ad1e48e580cb7bdf$var$onuncork = function(self, fn) {
    if (self._corked) self.once('uncork', fn);
    else fn();
};
var $ad1e48e580cb7bdf$var$autoDestroy = function(self, err) {
    if (self._autoDestroy) self.destroy(err);
};
var $ad1e48e580cb7bdf$var$destroyer = function(self, end) {
    return function(err) {
        if (err) $ad1e48e580cb7bdf$var$autoDestroy(self, err.message === 'premature close' ? null : err);
        else if (end && !self._ended) self.end();
    };
};
var $ad1e48e580cb7bdf$var$end = function(ws, fn) {
    if (!ws) return fn();
    if (ws._writableState && ws._writableState.finished) return fn();
    if (ws._writableState) return ws.end(fn);
    ws.end();
    fn();
};
var $ad1e48e580cb7bdf$var$noop = function() {
};
var $ad1e48e580cb7bdf$var$toStreams2 = function(rs) {
    return new $j7izJ.Readable({
        objectMode: true,
        highWaterMark: 16
    }).wrap(rs);
};
var $ad1e48e580cb7bdf$var$Duplexify = function(writable, readable, opts) {
    if (!(this instanceof $ad1e48e580cb7bdf$var$Duplexify)) return new $ad1e48e580cb7bdf$var$Duplexify(writable, readable, opts);
    $j7izJ.Duplex.call(this, opts);
    this._writable = null;
    this._readable = null;
    this._readable2 = null;
    this._autoDestroy = !opts || opts.autoDestroy !== false;
    this._forwardDestroy = !opts || opts.destroy !== false;
    this._forwardEnd = !opts || opts.end !== false;
    this._corked = 1 // start corked
    ;
    this._ondrain = null;
    this._drained = false;
    this._forwarding = false;
    this._unwrite = null;
    this._unread = null;
    this._ended = false;
    this.destroyed = false;
    if (writable) this.setWritable(writable);
    if (readable) this.setReadable(readable);
};
$8w0G4($ad1e48e580cb7bdf$var$Duplexify, $j7izJ.Duplex);
$ad1e48e580cb7bdf$var$Duplexify.obj = function(writable, readable, opts) {
    if (!opts) opts = {
    };
    opts.objectMode = true;
    opts.highWaterMark = 16;
    return new $ad1e48e580cb7bdf$var$Duplexify(writable, readable, opts);
};
$ad1e48e580cb7bdf$var$Duplexify.prototype.cork = function() {
    if (++this._corked === 1) this.emit('cork');
};
$ad1e48e580cb7bdf$var$Duplexify.prototype.uncork = function() {
    if (this._corked && --this._corked === 0) this.emit('uncork');
};
$ad1e48e580cb7bdf$var$Duplexify.prototype.setWritable = function(writable) {
    if (this._unwrite) this._unwrite();
    if (this.destroyed) {
        if (writable && writable.destroy) writable.destroy();
        return;
    }
    if (writable === null || writable === false) {
        this.end();
        return;
    }
    var self = this;
    var unend = $DEPnk(writable, {
        writable: true,
        readable: false
    }, $ad1e48e580cb7bdf$var$destroyer(this, this._forwardEnd));
    var ondrain = function() {
        var ondrain = self._ondrain;
        self._ondrain = null;
        if (ondrain) ondrain();
    };
    var clear = function() {
        self._writable.removeListener('drain', ondrain);
        unend();
    };
    if (this._unwrite) process.nextTick(ondrain) // force a drain on stream reset to avoid livelocks
    ;
    this._writable = writable;
    this._writable.on('drain', ondrain);
    this._unwrite = clear;
    this.uncork() // always uncork setWritable
    ;
};
$ad1e48e580cb7bdf$var$Duplexify.prototype.setReadable = function(readable) {
    if (this._unread) this._unread();
    if (this.destroyed) {
        if (readable && readable.destroy) readable.destroy();
        return;
    }
    if (readable === null || readable === false) {
        this.push(null);
        this.resume();
        return;
    }
    var self = this;
    var unend = $DEPnk(readable, {
        writable: false,
        readable: true
    }, $ad1e48e580cb7bdf$var$destroyer(this));
    var onreadable = function() {
        self._forward();
    };
    var onend = function() {
        self.push(null);
    };
    var clear = function() {
        self._readable2.removeListener('readable', onreadable);
        self._readable2.removeListener('end', onend);
        unend();
    };
    this._drained = true;
    this._readable = readable;
    this._readable2 = readable._readableState ? readable : $ad1e48e580cb7bdf$var$toStreams2(readable);
    this._readable2.on('readable', onreadable);
    this._readable2.on('end', onend);
    this._unread = clear;
    this._forward();
};
$ad1e48e580cb7bdf$var$Duplexify.prototype._read = function() {
    this._drained = true;
    this._forward();
};
$ad1e48e580cb7bdf$var$Duplexify.prototype._forward = function() {
    if (this._forwarding || !this._readable2 || !this._drained) return;
    this._forwarding = true;
    var data;
    while(this._drained && (data = $3IGk1(this._readable2)) !== null){
        if (this.destroyed) continue;
        this._drained = this.push(data);
    }
    this._forwarding = false;
};
$ad1e48e580cb7bdf$var$Duplexify.prototype.destroy = function(err, cb) {
    if (!cb) cb = $ad1e48e580cb7bdf$var$noop;
    if (this.destroyed) return cb(null);
    this.destroyed = true;
    var self = this;
    process.nextTick(function() {
        self._destroy(err);
        cb(null);
    });
};
$ad1e48e580cb7bdf$var$Duplexify.prototype._destroy = function(err) {
    if (err) {
        var ondrain = this._ondrain;
        this._ondrain = null;
        if (ondrain) ondrain(err);
        else this.emit('error', err);
    }
    if (this._forwardDestroy) {
        if (this._readable && this._readable.destroy) this._readable.destroy();
        if (this._writable && this._writable.destroy) this._writable.destroy();
    }
    this.emit('close');
};
$ad1e48e580cb7bdf$var$Duplexify.prototype._write = function(data, enc, cb) {
    if (this.destroyed) return;
    if (this._corked) return $ad1e48e580cb7bdf$var$onuncork(this, this._write.bind(this, data, enc, cb));
    if (data === $ad1e48e580cb7bdf$var$SIGNAL_FLUSH) return this._finish(cb);
    if (!this._writable) return cb();
    if (this._writable.write(data) === false) this._ondrain = cb;
    else if (!this.destroyed) cb();
};
$ad1e48e580cb7bdf$var$Duplexify.prototype._finish = function(cb) {
    var self = this;
    this.emit('preend');
    $ad1e48e580cb7bdf$var$onuncork(this, function() {
        $ad1e48e580cb7bdf$var$end(self._forwardEnd && self._writable, function() {
            // haxx to not emit prefinish twice
            if (self._writableState.prefinished === false) self._writableState.prefinished = true;
            self.emit('prefinish');
            $ad1e48e580cb7bdf$var$onuncork(self, cb);
        });
    });
};
$ad1e48e580cb7bdf$var$Duplexify.prototype.end = function(data, enc, cb) {
    if (typeof data === 'function') return this.end(null, null, data);
    if (typeof enc === 'function') return this.end(data, null, enc);
    this._ended = true;
    if (data) this.write(data);
    if (!this._writableState.ending && !this._writableState.destroyed) this.write($ad1e48e580cb7bdf$var$SIGNAL_FLUSH);
    return $j7izJ.Writable.prototype.end.call(this, cb);
};
module.exports = $ad1e48e580cb7bdf$var$Duplexify;

});
parcelRequire.register("3IGk1", function(module, exports) {
module.exports = $2b564f6dd1f524b2$var$shift;
function $2b564f6dd1f524b2$var$shift(stream) {
    var rs = stream._readableState;
    if (!rs) return null;
    return rs.objectMode || typeof stream._duplexState === 'number' ? stream.read() : stream.read($2b564f6dd1f524b2$var$getStateLength(rs));
}
function $2b564f6dd1f524b2$var$getStateLength(state) {
    if (state.buffer.length) {
        // Since node 6.3.0 state.buffer is a BufferList not an array
        if (state.buffer.head) return state.buffer.head.data.length;
        return state.buffer[0].length;
    }
    return state.length;
}

});



parcelRequire.register("69d51", function(module, exports) {
'use strict';



var $479dbac0ab2adff2$require$inherits = $lEd20$util.inherits;


var $fuGyA = parcelRequire("fuGyA");
const $479dbac0ab2adff2$var$BUSY_WRITE_TIMEOUT = 100;
// 16 MB - magic number
// This constant ensures that SonicBoom only needs
// 32 MB of free memory to run. In case of having 1GB+
// of data to write, this prevents an out of memory
// condition.
const $479dbac0ab2adff2$var$MAX_WRITE = 16777216;
function $479dbac0ab2adff2$var$openFile(file, sonic) {
    sonic._opening = true;
    sonic._writing = true;
    sonic._asyncDrainScheduled = false;
    // NOTE: 'error' and 'ready' events emitted below only relevant when sonic.sync===false
    // for sync mode, there is no way to add a listener that will receive these
    function fileOpened(err, fd) {
        if (err) {
            sonic._reopening = false;
            sonic._writing = false;
            sonic._opening = false;
            if (sonic.sync) process.nextTick(()=>{
                if (sonic.listenerCount('error') > 0) sonic.emit('error', err);
            });
            else sonic.emit('error', err);
            return;
        }
        sonic.fd = fd;
        sonic.file = file;
        sonic._reopening = false;
        sonic._opening = false;
        sonic._writing = false;
        if (sonic.sync) process.nextTick(()=>sonic.emit('ready')
        );
        else sonic.emit('ready');
        if (sonic._reopening) return;
        // start
        if (!sonic._writing && sonic._len > sonic.minLength && !sonic.destroyed) $479dbac0ab2adff2$var$actualWrite(sonic);
    }
    const mode = sonic.append ? 'a' : 'w';
    if (sonic.sync) try {
        if (sonic.mkdir) $lEd20$fs.mkdirSync($lEd20$path.dirname(file), {
            recursive: true
        });
        const fd = $lEd20$fs.openSync(file, mode);
        fileOpened(null, fd);
    } catch (err) {
        fileOpened(err);
        throw err;
    }
    else if (sonic.mkdir) $lEd20$fs.mkdir($lEd20$path.dirname(file), {
        recursive: true
    }, (err)=>{
        if (err) return fileOpened(err);
        $lEd20$fs.open(file, mode, fileOpened);
    });
    else $lEd20$fs.open(file, mode, fileOpened);
}
function $479dbac0ab2adff2$var$SonicBoom(opts) {
    if (!(this instanceof $479dbac0ab2adff2$var$SonicBoom)) return new $479dbac0ab2adff2$var$SonicBoom(opts);
    let { fd: fd , dest: dest , minLength: minLength , sync: sync , append: append = true , mkdir: mkdir , retryEAGAIN: retryEAGAIN  } = opts || {
    };
    fd = fd || dest;
    this._bufs = [];
    this._len = 0;
    this.fd = -1;
    this._writing = false;
    this._writingBuf = '';
    this._ending = false;
    this._reopening = false;
    this._asyncDrainScheduled = false;
    this._hwm = Math.max(minLength || 0, 16387);
    this.file = null;
    this.destroyed = false;
    this.minLength = minLength || 0;
    this.sync = sync || false;
    this.append = append || false;
    this.retryEAGAIN = retryEAGAIN || (()=>true
    );
    this.mkdir = mkdir || false;
    if (typeof fd === 'number') {
        this.fd = fd;
        process.nextTick(()=>this.emit('ready')
        );
    } else if (typeof fd === 'string') $479dbac0ab2adff2$var$openFile(fd, this);
    else throw new Error('SonicBoom supports only file descriptors and files');
    if (this.minLength >= $479dbac0ab2adff2$var$MAX_WRITE) throw new Error(`minLength should be smaller than MAX_WRITE (${$479dbac0ab2adff2$var$MAX_WRITE})`);
    this.release = (err, n)=>{
        if (err) {
            if (err.code === 'EAGAIN' && this.retryEAGAIN(err, this._writingBuf.length, this._len - this._writingBuf.length)) {
                if (this.sync) // This error code should not happen in sync mode, because it is
                // not using the underlining operating system asynchronous functions.
                // However it happens, and so we handle it.
                // Ref: https://github.com/pinojs/pino/issues/783
                try {
                    $fuGyA($479dbac0ab2adff2$var$BUSY_WRITE_TIMEOUT);
                    this.release(undefined, 0);
                } catch (err) {
                    this.release(err);
                }
                else // Let's give the destination some time to process the chunk.
                setTimeout(()=>{
                    $lEd20$fs.write(this.fd, this._writingBuf, 'utf8', this.release);
                }, $479dbac0ab2adff2$var$BUSY_WRITE_TIMEOUT);
            } else {
                this._writing = false;
                this.emit('error', err);
            }
            return;
        }
        this._len -= n;
        this._writingBuf = this._writingBuf.slice(n);
        if (this._writingBuf.length) {
            if (!this.sync) {
                $lEd20$fs.write(this.fd, this._writingBuf, 'utf8', this.release);
                return;
            }
            try {
                do {
                    const n = $lEd20$fs.writeSync(this.fd, this._writingBuf, 'utf8');
                    this._len -= n;
                    this._writingBuf = this._writingBuf.slice(n);
                }while (this._writingBuf)
            } catch (err) {
                this.release(err);
                return;
            }
        }
        const len = this._len;
        if (this._reopening) {
            this._writing = false;
            this._reopening = false;
            this.reopen();
        } else if (len > this.minLength) $479dbac0ab2adff2$var$actualWrite(this);
        else if (this._ending) {
            if (len > 0) $479dbac0ab2adff2$var$actualWrite(this);
            else {
                this._writing = false;
                $479dbac0ab2adff2$var$actualClose(this);
            }
        } else {
            this._writing = false;
            if (this.sync) {
                if (!this._asyncDrainScheduled) {
                    this._asyncDrainScheduled = true;
                    process.nextTick($479dbac0ab2adff2$var$emitDrain, this);
                }
            } else this.emit('drain');
        }
    };
    this.on('newListener', function(name) {
        if (name === 'drain') this._asyncDrainScheduled = false;
    });
}
function $479dbac0ab2adff2$var$emitDrain(sonic) {
    const hasListeners = sonic.listenerCount('drain') > 0;
    if (!hasListeners) return;
    sonic._asyncDrainScheduled = false;
    sonic.emit('drain');
}
$479dbac0ab2adff2$require$inherits($479dbac0ab2adff2$var$SonicBoom, $lEd20$events);
$479dbac0ab2adff2$var$SonicBoom.prototype.write = function(data) {
    if (this.destroyed) throw new Error('SonicBoom destroyed');
    const len = this._len + data.length;
    const bufs = this._bufs;
    if (!this._writing && len > $479dbac0ab2adff2$var$MAX_WRITE) bufs.push(data);
    else if (bufs.length === 0) bufs[0] = '' + data;
    else bufs[bufs.length - 1] += data;
    this._len = len;
    if (!this._writing && this._len >= this.minLength) $479dbac0ab2adff2$var$actualWrite(this);
    return this._len < this._hwm;
};
$479dbac0ab2adff2$var$SonicBoom.prototype.flush = function() {
    if (this.destroyed) throw new Error('SonicBoom destroyed');
    if (this._writing || this.minLength <= 0) return;
    if (this._bufs.length === 0) this._bufs.push('');
    $479dbac0ab2adff2$var$actualWrite(this);
};
$479dbac0ab2adff2$var$SonicBoom.prototype.reopen = function(file) {
    if (this.destroyed) throw new Error('SonicBoom destroyed');
    if (this._opening) {
        this.once('ready', ()=>{
            this.reopen(file);
        });
        return;
    }
    if (this._ending) return;
    if (!this.file) throw new Error('Unable to reopen a file descriptor, you must pass a file to SonicBoom');
    this._reopening = true;
    if (this._writing) return;
    const fd = this.fd;
    this.once('ready', ()=>{
        if (fd !== this.fd) $lEd20$fs.close(fd, (err)=>{
            if (err) return this.emit('error', err);
        });
    });
    $479dbac0ab2adff2$var$openFile(file || this.file, this);
};
$479dbac0ab2adff2$var$SonicBoom.prototype.end = function() {
    if (this.destroyed) throw new Error('SonicBoom destroyed');
    if (this._opening) {
        this.once('ready', ()=>{
            this.end();
        });
        return;
    }
    if (this._ending) return;
    this._ending = true;
    if (this._writing) return;
    if (this._len > 0 && this.fd >= 0) $479dbac0ab2adff2$var$actualWrite(this);
    else $479dbac0ab2adff2$var$actualClose(this);
};
$479dbac0ab2adff2$var$SonicBoom.prototype.flushSync = function() {
    if (this.destroyed) throw new Error('SonicBoom destroyed');
    if (this.fd < 0) throw new Error('sonic boom is not ready yet');
    if (!this._writing && this._writingBuf.length > 0) {
        this._bufs.unshift(this._writingBuf);
        this._writingBuf = '';
    }
    while(this._bufs.length){
        const buf = this._bufs[0];
        try {
            this._len -= $lEd20$fs.writeSync(this.fd, buf, 'utf8');
            this._bufs.shift();
        } catch (err) {
            if (err.code !== 'EAGAIN' || !this.retryEAGAIN(err, buf.length, this._len - buf.length)) throw err;
            $fuGyA($479dbac0ab2adff2$var$BUSY_WRITE_TIMEOUT);
        }
    }
};
$479dbac0ab2adff2$var$SonicBoom.prototype.destroy = function() {
    if (this.destroyed) return;
    $479dbac0ab2adff2$var$actualClose(this);
};
function $479dbac0ab2adff2$var$actualWrite(sonic) {
    const release = sonic.release;
    sonic._writing = true;
    sonic._writingBuf = sonic._writingBuf || sonic._bufs.shift();
    if (sonic.sync) try {
        const written = $lEd20$fs.writeSync(sonic.fd, sonic._writingBuf, 'utf8');
        release(null, written);
    } catch (err) {
        release(err);
    }
    else $lEd20$fs.write(sonic.fd, sonic._writingBuf, 'utf8', release);
}
function $479dbac0ab2adff2$var$actualClose(sonic) {
    if (sonic.fd === -1) {
        sonic.once('ready', $479dbac0ab2adff2$var$actualClose.bind(null, sonic));
        return;
    }
    // TODO write a test to check if we are not leaking fds
    $lEd20$fs.close(sonic.fd, (err)=>{
        if (err) {
            sonic.emit('error', err);
            return;
        }
        if (sonic._ending && !sonic._writing) sonic.emit('finish');
        sonic.emit('close');
    });
    sonic.destroyed = true;
    sonic._bufs = [];
}
/**
 * These export configurations enable JS and TS developers
 * to consumer SonicBoom in whatever way best suits their needs.
 * Some examples of supported import syntax includes:
 * - `const SonicBoom = require('SonicBoom')`
 * - `const { SonicBoom } = require('SonicBoom')`
 * - `import * as SonicBoom from 'SonicBoom'`
 * - `import { SonicBoom } from 'SonicBoom'`
 * - `import SonicBoom from 'SonicBoom'`
 */ $479dbac0ab2adff2$var$SonicBoom.SonicBoom = $479dbac0ab2adff2$var$SonicBoom;
$479dbac0ab2adff2$var$SonicBoom.default = $479dbac0ab2adff2$var$SonicBoom;
module.exports = $479dbac0ab2adff2$var$SonicBoom;

});

parcelRequire.register("JKNWV", function(module, exports) {
'use strict';
const $089882826e0bbbe7$var$hasBuffer = typeof Buffer !== 'undefined';
const $089882826e0bbbe7$var$suspectProtoRx = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/;
const $089882826e0bbbe7$var$suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
function $089882826e0bbbe7$var$parse(text, reviver, options) {
    // Normalize arguments
    if (options == null) {
        if (reviver !== null && typeof reviver === 'object') {
            options = reviver;
            reviver = undefined;
        } else options = {
        };
    }
    const protoAction = options.protoAction || 'error';
    const constructorAction = options.constructorAction || 'error';
    if ($089882826e0bbbe7$var$hasBuffer && Buffer.isBuffer(text)) text = text.toString();
    // BOM checker
    if (text && text.charCodeAt(0) === 65279) text = text.slice(1);
    // Parse normally, allowing exceptions
    const obj = JSON.parse(text, reviver);
    // options: 'error' (default) / 'remove' / 'ignore'
    if (protoAction === 'ignore' && constructorAction === 'ignore') return obj;
    // Ignore null and non-objects
    if (obj === null || typeof obj !== 'object') return obj;
    if (protoAction !== 'ignore' && constructorAction !== 'ignore') {
        if ($089882826e0bbbe7$var$suspectProtoRx.test(text) === false && $089882826e0bbbe7$var$suspectConstructorRx.test(text) === false) return obj;
    } else if (protoAction !== 'ignore' && constructorAction === 'ignore') {
        if ($089882826e0bbbe7$var$suspectProtoRx.test(text) === false) return obj;
    } else {
        if ($089882826e0bbbe7$var$suspectConstructorRx.test(text) === false) return obj;
    }
    // Scan result for proto keys
    $089882826e0bbbe7$var$scan(obj, {
        protoAction: protoAction,
        constructorAction: constructorAction
    });
    return obj;
}
function $089882826e0bbbe7$var$scan(obj, { protoAction: protoAction = 'error' , constructorAction: constructorAction = 'error'  } = {
}) {
    let next = [
        obj
    ];
    while(next.length){
        const nodes = next;
        next = [];
        for (const node of nodes){
            if (protoAction !== 'ignore' && Object.prototype.hasOwnProperty.call(node, '__proto__')) {
                if (protoAction === 'error') throw new SyntaxError('Object contains forbidden prototype property');
                delete node.__proto__ // eslint-disable-line no-proto
                ;
            }
            if (constructorAction !== 'ignore' && Object.prototype.hasOwnProperty.call(node, 'constructor') && Object.prototype.hasOwnProperty.call(node.constructor, 'prototype')) {
                if (constructorAction === 'error') throw new SyntaxError('Object contains forbidden prototype property');
                delete node.constructor;
            }
            for(const key in node){
                const value = node[key];
                if (value && typeof value === 'object') next.push(node[key]);
            }
        }
    }
}
function $089882826e0bbbe7$var$safeParse(text, reviver) {
    try {
        return $089882826e0bbbe7$var$parse(text, reviver);
    } catch (ignoreError) {
        return null;
    }
}
module.exports = {
    parse: $089882826e0bbbe7$var$parse,
    scan: $089882826e0bbbe7$var$scan,
    safeParse: $089882826e0bbbe7$var$safeParse
};

});

parcelRequire.register("2jkFg", function(module, exports) {
'use strict';

var $lD9Y8 = parcelRequire("lD9Y8");
var $1aed62a541946bdb$require$LEVELS = $lD9Y8.LEVELS;
var $1aed62a541946bdb$require$LEVEL_NAMES = $lD9Y8.LEVEL_NAMES;
const $1aed62a541946bdb$var$nocolor = (input)=>input
;
const $1aed62a541946bdb$var$plain = {
    default: $1aed62a541946bdb$var$nocolor,
    60: $1aed62a541946bdb$var$nocolor,
    50: $1aed62a541946bdb$var$nocolor,
    40: $1aed62a541946bdb$var$nocolor,
    30: $1aed62a541946bdb$var$nocolor,
    20: $1aed62a541946bdb$var$nocolor,
    10: $1aed62a541946bdb$var$nocolor,
    message: $1aed62a541946bdb$var$nocolor,
    greyMessage: $1aed62a541946bdb$var$nocolor
};

var $kW85a = parcelRequire("kW85a");
var $1aed62a541946bdb$require$createColors = $kW85a.createColors;
const { white: $1aed62a541946bdb$var$white , bgRed: $1aed62a541946bdb$var$bgRed , red: $1aed62a541946bdb$var$red , yellow: $1aed62a541946bdb$var$yellow , green: $1aed62a541946bdb$var$green , blue: $1aed62a541946bdb$var$blue , gray: $1aed62a541946bdb$var$gray , cyan: $1aed62a541946bdb$var$cyan  } = $1aed62a541946bdb$require$createColors({
    useColor: true
});
const $1aed62a541946bdb$var$colored = {
    default: $1aed62a541946bdb$var$white,
    60: $1aed62a541946bdb$var$bgRed,
    50: $1aed62a541946bdb$var$red,
    40: $1aed62a541946bdb$var$yellow,
    30: $1aed62a541946bdb$var$green,
    20: $1aed62a541946bdb$var$blue,
    10: $1aed62a541946bdb$var$gray,
    message: $1aed62a541946bdb$var$cyan,
    greyMessage: $1aed62a541946bdb$var$gray
};
function $1aed62a541946bdb$var$colorizeLevel(level, colorizer) {
    if (Number.isInteger(+level)) return Object.prototype.hasOwnProperty.call($1aed62a541946bdb$require$LEVELS, level) ? colorizer[level]($1aed62a541946bdb$require$LEVELS[level]) : colorizer.default($1aed62a541946bdb$require$LEVELS.default);
    const levelNum = $1aed62a541946bdb$require$LEVEL_NAMES[level.toLowerCase()] || 'default';
    return colorizer[levelNum]($1aed62a541946bdb$require$LEVELS[levelNum]);
}
function $1aed62a541946bdb$var$plainColorizer(level) {
    return $1aed62a541946bdb$var$colorizeLevel(level, $1aed62a541946bdb$var$plain);
}
$1aed62a541946bdb$var$plainColorizer.message = $1aed62a541946bdb$var$plain.message;
$1aed62a541946bdb$var$plainColorizer.greyMessage = $1aed62a541946bdb$var$plain.greyMessage;
function $1aed62a541946bdb$var$coloredColorizer(level) {
    return $1aed62a541946bdb$var$colorizeLevel(level, $1aed62a541946bdb$var$colored);
}
$1aed62a541946bdb$var$coloredColorizer.message = $1aed62a541946bdb$var$colored.message;
$1aed62a541946bdb$var$coloredColorizer.greyMessage = $1aed62a541946bdb$var$colored.greyMessage;
/**
 * Factory function get a function to colorized levels. The returned function
 * also includes a `.message(str)` method to colorize strings.
 *
 * @param {boolean} [useColors=false] When `true` a function that applies standard
 * terminal colors is returned.
 *
 * @returns {function} `function (level) {}` has a `.message(str)` method to
 * apply colorization to a string. The core function accepts either an integer
 * `level` or a `string` level. The integer level will map to a known level
 * string or to `USERLVL` if not known.  The string `level` will map to the same
 * colors as the integer `level` and will also default to `USERLVL` if the given
 * string is not a recognized level name.
 */ module.exports = function getColorizer(useColors = false) {
    return useColors ? $1aed62a541946bdb$var$coloredColorizer : $1aed62a541946bdb$var$plainColorizer;
};

});
parcelRequire.register("lD9Y8", function(module, exports) {
'use strict';
module.exports = {
    DATE_FORMAT: 'yyyy-mm-dd HH:MM:ss.l o',
    ERROR_LIKE_KEYS: [
        'err',
        'error'
    ],
    MESSAGE_KEY: 'msg',
    LEVEL_KEY: 'level',
    LEVEL_LABEL: 'levelLabel',
    TIMESTAMP_KEY: 'time',
    LEVELS: {
        default: 'USERLVL',
        60: 'FATAL',
        50: 'ERROR',
        40: 'WARN',
        30: 'INFO',
        20: 'DEBUG',
        10: 'TRACE'
    },
    LEVEL_NAMES: {
        fatal: 60,
        error: 50,
        warn: 40,
        info: 30,
        debug: 20,
        trace: 10
    },
    // Object keys that probably came from a logger like Pino or Bunyan.
    LOGGER_KEYS: [
        'pid',
        'hostname',
        'name',
        'level',
        'time',
        'timestamp',
        'caller'
    ]
};

});


parcelRequire.register("fFSTk", function(module, exports) {
'use strict';

const $b695439ffb944b44$var$clone = (parcelRequire("8Z7fx"))({
    circles: true
});

var $cauxf = parcelRequire("cauxf");

var $9GdXI = parcelRequire("9GdXI");

const $b695439ffb944b44$var$defaultColorizer = (parcelRequire("2jkFg"))();

var $lD9Y8 = parcelRequire("lD9Y8");
var $b695439ffb944b44$require$DATE_FORMAT = $lD9Y8.DATE_FORMAT;
var $b695439ffb944b44$require$ERROR_LIKE_KEYS = $lD9Y8.ERROR_LIKE_KEYS;
var $b695439ffb944b44$require$MESSAGE_KEY = $lD9Y8.MESSAGE_KEY;
var $b695439ffb944b44$require$LEVEL_KEY = $lD9Y8.LEVEL_KEY;
var $b695439ffb944b44$require$LEVEL_LABEL = $lD9Y8.LEVEL_LABEL;
var $b695439ffb944b44$require$TIMESTAMP_KEY = $lD9Y8.TIMESTAMP_KEY;
var $b695439ffb944b44$require$LOGGER_KEYS = $lD9Y8.LOGGER_KEYS;
var $b695439ffb944b44$require$LEVELS = $lD9Y8.LEVELS;
module.exports = {
    isObject: $b695439ffb944b44$var$isObject,
    prettifyErrorLog: $b695439ffb944b44$var$prettifyErrorLog,
    prettifyLevel: $b695439ffb944b44$var$prettifyLevel,
    prettifyMessage: $b695439ffb944b44$var$prettifyMessage,
    prettifyMetadata: $b695439ffb944b44$var$prettifyMetadata,
    prettifyObject: $b695439ffb944b44$var$prettifyObject,
    prettifyTime: $b695439ffb944b44$var$prettifyTime,
    filterLog: $b695439ffb944b44$var$filterLog
};
module.exports.internals = {
    formatTime: $b695439ffb944b44$var$formatTime,
    joinLinesWithIndentation: $b695439ffb944b44$var$joinLinesWithIndentation,
    prettifyError: $b695439ffb944b44$var$prettifyError,
    deleteLogProperty: $b695439ffb944b44$var$deleteLogProperty,
    splitIgnoreKey: $b695439ffb944b44$var$splitIgnoreKey,
    createDate: $b695439ffb944b44$var$createDate,
    isValidDate: $b695439ffb944b44$var$isValidDate
};
/**
 * Converts a given `epoch` to a desired display format.
 *
 * @param {number|string} epoch The time to convert. May be any value that is
 * valid for `new Date()`.
 * @param {boolean|string} [translateTime=false] When `false`, the given `epoch`
 * will simply be returned. When `true`, the given `epoch` will be converted
 * to a string at UTC using the `DATE_FORMAT` constant. If `translateTime` is
 * a string, the following rules are available:
 *
 * - `<format string>`: The string is a literal format string. This format
 * string will be used to interpret the `epoch` and return a display string
 * at UTC.
 * - `SYS:STANDARD`: The returned display string will follow the `DATE_FORMAT`
 * constant at the system's local timezone.
 * - `SYS:<format string>`: The returned display string will follow the given
 * `<format string>` at the system's local timezone.
 * - `UTC:<format string>`: The returned display string will follow the given
 * `<format string>` at UTC.
 *
 * @returns {number|string} The formatted time.
 */ function $b695439ffb944b44$var$formatTime(epoch, translateTime = false) {
    if (translateTime === false) return epoch;
    const instant = $b695439ffb944b44$var$createDate(epoch);
    // If the Date is invalid, do not attempt to format
    if (!$b695439ffb944b44$var$isValidDate(instant)) return epoch;
    if (translateTime === true) return $cauxf(instant, 'UTC:' + $b695439ffb944b44$require$DATE_FORMAT);
    const upperFormat = translateTime.toUpperCase();
    if (upperFormat === 'SYS:STANDARD') return $cauxf(instant, $b695439ffb944b44$require$DATE_FORMAT);
    const prefix = upperFormat.substr(0, 4);
    if (prefix === 'SYS:' || prefix === 'UTC:') {
        if (prefix === 'UTC:') return $cauxf(instant, translateTime);
        return $cauxf(instant, translateTime.slice(4));
    }
    return $cauxf(instant, `UTC:${translateTime}`);
}
/**
 * Constructs a JS Date from a number or string. Accepts any single number
 * or single string argument that is valid for the Date() constructor,
 * or an epoch as a string.
 *
 * @param {string|number} epoch The representation of the Date.
 *
 * @returns {Date} The constructed Date.
 */ function $b695439ffb944b44$var$createDate(epoch) {
    // If epoch is already a valid argument, return the valid Date
    let date = new Date(epoch);
    if ($b695439ffb944b44$var$isValidDate(date)) return date;
    // Convert to a number to permit epoch as a string
    date = new Date(+epoch);
    return date;
}
/**
 * Checks if the argument is a JS Date and not 'Invalid Date'.
 *
 * @param {Date} date The date to check.
 *
 * @returns {boolean} true if the argument is a JS Date and not 'Invalid Date'.
 */ function $b695439ffb944b44$var$isValidDate(date) {
    return date instanceof Date && !Number.isNaN(date.getTime());
}
function $b695439ffb944b44$var$isObject(input) {
    return Object.prototype.toString.apply(input) === '[object Object]';
}
/**
 * Given a string with line separators, either `\r\n` or `\n`, add indentation
 * to all lines subsequent to the first line and rejoin the lines using an
 * end of line sequence.
 *
 * @param {object} input
 * @param {string} input.input The string to split and reformat.
 * @param {string} [input.ident] The indentation string. Default: `    ` (4 spaces).
 * @param {string} [input.eol] The end of line sequence to use when rejoining
 * the lines. Default: `'\n'`.
 *
 * @returns {string} A string with lines subsequent to the first indented
 * with the given indentation sequence.
 */ function $b695439ffb944b44$var$joinLinesWithIndentation({ input: input , ident: ident = '    ' , eol: eol = '\n'  }) {
    const lines = input.split(/\r?\n/);
    for(let i = 1; i < lines.length; i += 1)lines[i] = ident + lines[i];
    return lines.join(eol);
}
/**
 * Given a log object that has a `type: 'Error'` key, prettify the object and
 * return the result. In other
 *
 * @param {object} input
 * @param {object} input.log The error log to prettify.
 * @param {string} [input.messageKey] The name of the key that contains a
 * general log message. This is not the error's message property but the logger
 * messsage property. Default: `MESSAGE_KEY` constant.
 * @param {string} [input.ident] The sequence to use for indentation. Default: `'    '`.
 * @param {string} [input.eol] The sequence to use for EOL. Default: `'\n'`.
 * @param {string[]} [input.errorLikeKeys] A set of keys that should be considered
 * to have error objects as values. Default: `ERROR_LIKE_KEYS` constant.
 * @param {string[]} [input.errorProperties] A set of specific error object
 * properties, that are not the value of `messageKey`, `type`, or `stack`, to
 * include in the prettified result. The first entry in the list may be `'*'`
 * to indicate that all sibiling properties should be prettified. Default: `[]`.
 *
 * @returns {string} A sring that represents the prettified error log.
 */ function $b695439ffb944b44$var$prettifyErrorLog({ log: log , messageKey: messageKey = $b695439ffb944b44$require$MESSAGE_KEY , ident: ident = '    ' , eol: eol = '\n' , errorLikeKeys: errorLikeKeys = $b695439ffb944b44$require$ERROR_LIKE_KEYS , errorProperties: errorProperties = []  }) {
    const stack = log.stack;
    const joinedLines = $b695439ffb944b44$var$joinLinesWithIndentation({
        input: stack,
        ident: ident,
        eol: eol
    });
    let result = `${ident}${joinedLines}${eol}`;
    if (errorProperties.length > 0) {
        const excludeProperties = $b695439ffb944b44$require$LOGGER_KEYS.concat(messageKey, 'type', 'stack');
        let propertiesToPrint;
        if (errorProperties[0] === '*') // Print all sibling properties except for the standard exclusions.
        propertiesToPrint = Object.keys(log).filter((k)=>excludeProperties.includes(k) === false
        );
        else // Print only specified properties unless the property is a standard exclusion.
        propertiesToPrint = errorProperties.filter((k)=>excludeProperties.includes(k) === false
        );
        for(let i = 0; i < propertiesToPrint.length; i += 1){
            const key = propertiesToPrint[i];
            if (key in log === false) continue;
            if ($b695439ffb944b44$var$isObject(log[key])) {
                // The nested object may have "logger" type keys but since they are not
                // at the root level of the object being processed, we want to print them.
                // Thus, we invoke with `excludeLoggerKeys: false`.
                const prettifiedObject = $b695439ffb944b44$var$prettifyObject({
                    input: log[key],
                    errorLikeKeys: errorLikeKeys,
                    excludeLoggerKeys: false,
                    eol: eol,
                    ident: ident + ident
                });
                result = `${result}${ident}${key}: {${eol}${prettifiedObject}${ident}}${eol}`;
                continue;
            }
            result = `${result}${ident}${key}: ${log[key]}${eol}`;
        }
    }
    return result;
}
/**
 * Checks if the passed in log has a `level` value and returns a prettified
 * string for that level if so.
 *
 * @param {object} input
 * @param {object} input.log The log object.
 * @param {function} [input.colorizer] A colorizer function that accepts a level
 * value and returns a colorized string. Default: a no-op colorizer.
 * @param {string} [levelKey='level'] The key to find the level under.
 *
 * @returns {undefined|string} If `log` does not have a `level` property then
 * `undefined` will be returned. Otherwise, a string from the specified
 * `colorizer` is returned.
 */ function $b695439ffb944b44$var$prettifyLevel({ log: log , colorizer: colorizer = $b695439ffb944b44$var$defaultColorizer , levelKey: levelKey = $b695439ffb944b44$require$LEVEL_KEY  }) {
    if (levelKey in log === false) return undefined;
    return colorizer(log[levelKey]);
}
/**
 * Prettifies a message string if the given `log` has a message property.
 *
 * @param {object} input
 * @param {object} input.log The log object with the message to colorize.
 * @param {string} [input.messageKey='msg'] The property of the `log` that is the
 * message to be prettified.
 * @param {string|function} [input.messageFormat=undefined] A format string or function that defines how the
 *  logged message should be formatted, e.g. `'{level} - {pid}'`.
 * @param {function} [input.colorizer] A colorizer function that has a
 * `.message(str)` method attached to it. This function should return a colorized
 * string which will be the "prettified" message. Default: a no-op colorizer.
 *
 * @returns {undefined|string} If the message key is not found, or the message
 * key is not a string, then `undefined` will be returned. Otherwise, a string
 * that is the prettified message.
 */ function $b695439ffb944b44$var$prettifyMessage({ log: log , messageFormat: messageFormat , messageKey: messageKey = $b695439ffb944b44$require$MESSAGE_KEY , colorizer: colorizer = $b695439ffb944b44$var$defaultColorizer , levelLabel: levelLabel = $b695439ffb944b44$require$LEVEL_LABEL  }) {
    if (messageFormat && typeof messageFormat === 'string') {
        const message = String(messageFormat).replace(/{([^{}]+)}/g, function(match, p1) {
            // return log level as string instead of int
            if (p1 === levelLabel && log[$b695439ffb944b44$require$LEVEL_KEY]) return $b695439ffb944b44$require$LEVELS[log[$b695439ffb944b44$require$LEVEL_KEY]];
            // Parse nested key access, e.g. `{keyA.subKeyB}`.
            return p1.split('.').reduce(function(prev, curr) {
                if (prev && prev[curr]) return prev[curr];
                return '';
            }, log);
        });
        return colorizer.message(message);
    }
    if (messageFormat && typeof messageFormat === 'function') {
        const msg = messageFormat(log, messageKey, levelLabel);
        return colorizer.message(msg);
    }
    if (messageKey in log === false) return undefined;
    if (typeof log[messageKey] !== 'string') return undefined;
    return colorizer.message(log[messageKey]);
}
/**
 * Prettifies metadata that is usually present in a Pino log line. It looks for
 * fields `name`, `pid`, `hostname`, and `caller` and returns a formatted string using
 * the fields it finds.
 *
 * @param {object} input
 * @param {object} input.log The log that may or may not contain metadata to
 * be prettified.
 *
 * @returns {undefined|string} If no metadata is found then `undefined` is
 * returned. Otherwise, a string of prettified metadata is returned.
 */ function $b695439ffb944b44$var$prettifyMetadata({ log: log  }) {
    let line = '';
    if (log.name || log.pid || log.hostname) {
        line += '(';
        if (log.name) line += log.name;
        if (log.name && log.pid) line += '/' + log.pid;
        else if (log.pid) line += log.pid;
        if (log.hostname) // If `pid` and `name` were in the ignore keys list then we don't need
        // the leading space.
        line += `${line === '(' ? 'on' : ' on'} ${log.hostname}`;
        line += ')';
    }
    if (log.caller) line += `${line === '' ? '' : ' '}<${log.caller}>`;
    if (line === '') return undefined;
    else return line;
}
/**
 * Prettifies a standard object. Special care is taken when processing the object
 * to handle child objects that are attached to keys known to contain error
 * objects.
 *
 * @param {object} input
 * @param {object} input.input The object to prettify.
 * @param {string} [input.ident] The identation sequence to use. Default: `'    '`.
 * @param {string} [input.eol] The EOL sequence to use. Default: `'\n'`.
 * @param {string[]} [input.skipKeys] A set of object keys to exclude from the
 * prettified result. Default: `[]`.
 * @param {Object<string, function>} [input.customPrettifiers] Dictionary of
 * custom prettifiers. Default: `{}`.
 * @param {string[]} [input.errorLikeKeys] A set of object keys that contain
 * error objects. Default: `ERROR_LIKE_KEYS` constant.
 * @param {boolean} [input.excludeLoggerKeys] Indicates if known logger specific
 * keys should be excluded from prettification. Default: `true`.
 * @param {boolean} [input.singleLine] Should non-error keys all be formatted
 * on a single line? This does NOT apply to errors, which will still be
 * multi-line. Default: `false`
 *
 * @returns {string} The prettified string. This can be as little as `''` if
 * there was nothing to prettify.
 */ function $b695439ffb944b44$var$prettifyObject({ input: input , ident: ident = '    ' , eol: eol = '\n' , skipKeys: skipKeys = [] , customPrettifiers: customPrettifiers = {
} , errorLikeKeys: errorLikeKeys = $b695439ffb944b44$require$ERROR_LIKE_KEYS , excludeLoggerKeys: excludeLoggerKeys = true , singleLine: singleLine = false , colorizer: colorizer = $b695439ffb944b44$var$defaultColorizer  }) {
    const keysToIgnore = [].concat(skipKeys);
    if (excludeLoggerKeys === true) Array.prototype.push.apply(keysToIgnore, $b695439ffb944b44$require$LOGGER_KEYS);
    let result = '';
    // Split object keys into two categories: error and non-error
    const { plain: plain , errors: errors  } = Object.entries(input).reduce(({ plain: plain , errors: errors  }, [k, v])=>{
        if (keysToIgnore.includes(k) === false) {
            // Pre-apply custom prettifiers, because all 3 cases below will need this
            const pretty = typeof customPrettifiers[k] === 'function' ? customPrettifiers[k](v, k, input) : v;
            if (errorLikeKeys.includes(k)) errors[k] = pretty;
            else plain[k] = pretty;
        }
        return {
            plain: plain,
            errors: errors
        };
    }, {
        plain: {
        },
        errors: {
        }
    });
    if (singleLine) {
        // Stringify the entire object as a single JSON line
        if (Object.keys(plain).length > 0) result += colorizer.greyMessage($9GdXI(plain));
        result += eol;
    } else // Put each object entry on its own line
    Object.entries(plain).forEach(([keyName, keyValue])=>{
        // custom prettifiers are already applied above, so we can skip it now
        const lines = typeof customPrettifiers[keyName] === 'function' ? keyValue : $9GdXI(keyValue, null, 2);
        if (lines === undefined) return;
        const joinedLines = $b695439ffb944b44$var$joinLinesWithIndentation({
            input: lines,
            ident: ident,
            eol: eol
        });
        result += `${ident}${keyName}: ${joinedLines}${eol}`;
    });
    // Errors
    Object.entries(errors).forEach(([keyName, keyValue])=>{
        // custom prettifiers are already applied above, so we can skip it now
        const lines = typeof customPrettifiers[keyName] === 'function' ? keyValue : $9GdXI(keyValue, null, 2);
        if (lines === undefined) return;
        result += $b695439ffb944b44$var$prettifyError({
            keyName: keyName,
            lines: lines,
            eol: eol,
            ident: ident
        });
    });
    return result;
}
/**
 * Prettifies a timestamp if the given `log` has either `time`, `timestamp` or custom specified timestamp
 * property.
 *
 * @param {object} input
 * @param {object} input.log The log object with the timestamp to be prettified.
 * @param {string} [input.timestampKey='time'] The log property that should be used to resolve timestamp value
 * @param {boolean|string} [input.translateFormat=undefined] When `true` the
 * timestamp will be prettified into a string at UTC using the default
 * `DATE_FORMAT`. If a string, then `translateFormat` will be used as the format
 * string to determine the output; see the `formatTime` function for details.
 *
 * @returns {undefined|string} If a timestamp property cannot be found then
 * `undefined` is returned. Otherwise, the prettified time is returned as a
 * string.
 */ function $b695439ffb944b44$var$prettifyTime({ log: log , timestampKey: timestampKey = $b695439ffb944b44$require$TIMESTAMP_KEY , translateFormat: translateFormat  }) {
    let time = null;
    if (timestampKey in log) time = log[timestampKey];
    else if ('timestamp' in log) time = log.timestamp;
    if (time === null) return undefined;
    if (translateFormat) return '[' + $b695439ffb944b44$var$formatTime(time, translateFormat) + ']';
    return `[${time}]`;
}
/**
 * Prettifies an error string into a multi-line format.
 * @param {object} input
 * @param {string} input.keyName The key assigned to this error in the log object
 * @param {string} input.lines The STRINGIFIED error. If the error field has a
 *  custom prettifier, that should be pre-applied as well
 * @param {string} input.ident The indentation sequence to use
 * @param {string} input.eol The EOL sequence to use
 */ function $b695439ffb944b44$var$prettifyError({ keyName: keyName , lines: lines , eol: eol , ident: ident  }) {
    let result = '';
    const joinedLines = $b695439ffb944b44$var$joinLinesWithIndentation({
        input: lines,
        ident: ident,
        eol: eol
    });
    const splitLines = `${ident}${keyName}: ${joinedLines}${eol}`.split(eol);
    for(let j = 0; j < splitLines.length; j += 1){
        if (j !== 0) result += eol;
        const line = splitLines[j];
        if (/^\s*"stack"/.test(line)) {
            const matches = /^(\s*"stack":)\s*(".*"),?$/.exec(line);
            /* istanbul ignore else */ if (matches && matches.length === 3) {
                const indentSize = /^\s*/.exec(line)[0].length + 4;
                const indentation = ' '.repeat(indentSize);
                const stackMessage = matches[2];
                result += matches[1] + eol + indentation + JSON.parse(stackMessage).replace(/\n/g, eol + indentation);
            } else result += line;
        } else result += line;
    }
    return result;
}
/**
 * Splits the input key delimited by a dot character but not when it is preceded
 * by a backslash.
 *
 * @param {string} key A string identifying the property.
 *
 * @returns {string[]} Returns a list of string containing each delimited property.
 * e.g. `'prop2\.domain\.corp.prop2'` should return [ 'prop2.domain.com', 'prop2' ]
 */ function $b695439ffb944b44$var$splitIgnoreKey(key) {
    const result = [];
    let backslash = false;
    let segment = '';
    for(let i = 0; i < key.length; i++){
        const c = key.charAt(i);
        if (c === '\\') {
            backslash = true;
            continue;
        }
        if (backslash) {
            backslash = false;
            segment += c;
            continue;
        }
        /* Non-escaped dot, push to result */ if (c === '.') {
            result.push(segment);
            segment = '';
            continue;
        }
        segment += c;
    }
    /* Push last entry to result */ if (segment.length) result.push(segment);
    return result;
}
/**
 * Deletes a specified property from a log object if it exists.
 * This function mutates the passed in `log` object.
 *
 * @param {object} log The log object to be modified.
 * @param {string} property A string identifying the property to be deleted from
 * the log object. Accepts nested properties delimited by a `.`
 * Delimiter can be escaped to preserve property names that contain the delimiter.
 * e.g. `'prop1.prop2'` or `'prop2\.domain\.corp.prop2'`
 */ function $b695439ffb944b44$var$deleteLogProperty(log, property) {
    const props = $b695439ffb944b44$var$splitIgnoreKey(property);
    const propToDelete = props.pop();
    props.forEach((prop)=>{
        if (!Object.prototype.hasOwnProperty.call(log, prop)) return;
        log = log[prop];
    });
    delete log[propToDelete];
}
/**
 * Filter a log object by removing any ignored keys.
 *
 * @param {object} log The log object to be modified.
 * @param {string} ignoreKeys An array of strings identifying the properties to be removed.
 *
 * @returns {object} A new `log` object instance that does not include the ignored keys.
 */ function $b695439ffb944b44$var$filterLog(log, ignoreKeys) {
    const logCopy = $b695439ffb944b44$var$clone(log);
    ignoreKeys.forEach((ignoreKey)=>{
        $b695439ffb944b44$var$deleteLogProperty(logCopy, ignoreKey);
    });
    return logCopy;
}

});
parcelRequire.register("8Z7fx", function(module, exports) {
'use strict';
module.exports = $68a9a4df0380ac45$var$rfdc;
function $68a9a4df0380ac45$var$copyBuffer(cur) {
    if (cur instanceof Buffer) return Buffer.from(cur);
    return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length);
}
function $68a9a4df0380ac45$var$rfdc(opts) {
    opts = opts || {
    };
    if (opts.circles) return $68a9a4df0380ac45$var$rfdcCircles(opts);
    function cloneArray(a, fn) {
        var keys = Object.keys(a);
        var a2 = new Array(keys.length);
        for(var i = 0; i < keys.length; i++){
            var k = keys[i];
            var cur = a[k];
            if (typeof cur !== 'object' || cur === null) {
                a2[k] = cur;
            } else if (cur instanceof Date) {
                a2[k] = new Date(cur);
            } else if (ArrayBuffer.isView(cur)) {
                a2[k] = $68a9a4df0380ac45$var$copyBuffer(cur);
            } else {
                a2[k] = fn(cur);
            }
        }
        return a2;
    }
    function clone(o) {
        if (typeof o !== 'object' || o === null) return o;
        if (o instanceof Date) return new Date(o);
        if (Array.isArray(o)) return cloneArray(o, clone);
        if (o instanceof Map) return new Map(cloneArray(Array.from(o), clone));
        if (o instanceof Set) return new Set(cloneArray(Array.from(o), clone));
        var o2 = {
        };
        for(var k in o){
            if (Object.hasOwnProperty.call(o, k) === false) continue;
            var cur = o[k];
            if (typeof cur !== 'object' || cur === null) {
                o2[k] = cur;
            } else if (cur instanceof Date) {
                o2[k] = new Date(cur);
            } else if (cur instanceof Map) {
                o2[k] = new Map(cloneArray(Array.from(cur), clone));
            } else if (cur instanceof Set) {
                o2[k] = new Set(cloneArray(Array.from(cur), clone));
            } else if (ArrayBuffer.isView(cur)) {
                o2[k] = $68a9a4df0380ac45$var$copyBuffer(cur);
            } else {
                o2[k] = clone(cur);
            }
        }
        return o2;
    }
    function cloneProto(o) {
        if (typeof o !== 'object' || o === null) return o;
        if (o instanceof Date) return new Date(o);
        if (Array.isArray(o)) return cloneArray(o, cloneProto);
        if (o instanceof Map) return new Map(cloneArray(Array.from(o), cloneProto));
        if (o instanceof Set) return new Set(cloneArray(Array.from(o), cloneProto));
        var o2 = {
        };
        for(var k in o){
            var cur = o[k];
            if (typeof cur !== 'object' || cur === null) {
                o2[k] = cur;
            } else if (cur instanceof Date) {
                o2[k] = new Date(cur);
            } else if (cur instanceof Map) {
                o2[k] = new Map(cloneArray(Array.from(cur), cloneProto));
            } else if (cur instanceof Set) {
                o2[k] = new Set(cloneArray(Array.from(cur), cloneProto));
            } else if (ArrayBuffer.isView(cur)) {
                o2[k] = $68a9a4df0380ac45$var$copyBuffer(cur);
            } else {
                o2[k] = cloneProto(cur);
            }
        }
        return o2;
    }
    return opts.proto ? cloneProto : clone;
}
function $68a9a4df0380ac45$var$rfdcCircles(opts) {
    var refs = [];
    var refsNew = [];
    function cloneArray(a, fn) {
        var keys = Object.keys(a);
        var a2 = new Array(keys.length);
        for(var i = 0; i < keys.length; i++){
            var k = keys[i];
            var cur = a[k];
            if (typeof cur !== 'object' || cur === null) {
                a2[k] = cur;
            } else if (cur instanceof Date) {
                a2[k] = new Date(cur);
            } else if (ArrayBuffer.isView(cur)) {
                a2[k] = $68a9a4df0380ac45$var$copyBuffer(cur);
            } else {
                var index = refs.indexOf(cur);
                if (index !== -1) {
                    a2[k] = refsNew[index];
                } else {
                    a2[k] = fn(cur);
                }
            }
        }
        return a2;
    }
    function clone(o) {
        if (typeof o !== 'object' || o === null) return o;
        if (o instanceof Date) return new Date(o);
        if (Array.isArray(o)) return cloneArray(o, clone);
        if (o instanceof Map) return new Map(cloneArray(Array.from(o), clone));
        if (o instanceof Set) return new Set(cloneArray(Array.from(o), clone));
        var o2 = {
        };
        refs.push(o);
        refsNew.push(o2);
        for(var k in o){
            if (Object.hasOwnProperty.call(o, k) === false) continue;
            var cur = o[k];
            if (typeof cur !== 'object' || cur === null) {
                o2[k] = cur;
            } else if (cur instanceof Date) {
                o2[k] = new Date(cur);
            } else if (cur instanceof Map) {
                o2[k] = new Map(cloneArray(Array.from(cur), clone));
            } else if (cur instanceof Set) {
                o2[k] = new Set(cloneArray(Array.from(cur), clone));
            } else if (ArrayBuffer.isView(cur)) {
                o2[k] = $68a9a4df0380ac45$var$copyBuffer(cur);
            } else {
                var i = refs.indexOf(cur);
                if (i !== -1) {
                    o2[k] = refsNew[i];
                } else {
                    o2[k] = clone(cur);
                }
            }
        }
        refs.pop();
        refsNew.pop();
        return o2;
    }
    function cloneProto(o) {
        if (typeof o !== 'object' || o === null) return o;
        if (o instanceof Date) return new Date(o);
        if (Array.isArray(o)) return cloneArray(o, cloneProto);
        if (o instanceof Map) return new Map(cloneArray(Array.from(o), cloneProto));
        if (o instanceof Set) return new Set(cloneArray(Array.from(o), cloneProto));
        var o2 = {
        };
        refs.push(o);
        refsNew.push(o2);
        for(var k in o){
            var cur = o[k];
            if (typeof cur !== 'object' || cur === null) {
                o2[k] = cur;
            } else if (cur instanceof Date) {
                o2[k] = new Date(cur);
            } else if (cur instanceof Map) {
                o2[k] = new Map(cloneArray(Array.from(cur), cloneProto));
            } else if (cur instanceof Set) {
                o2[k] = new Set(cloneArray(Array.from(cur), cloneProto));
            } else if (ArrayBuffer.isView(cur)) {
                o2[k] = $68a9a4df0380ac45$var$copyBuffer(cur);
            } else {
                var i = refs.indexOf(cur);
                if (i !== -1) {
                    o2[k] = refsNew[i];
                } else {
                    o2[k] = cloneProto(cur);
                }
            }
        }
        refs.pop();
        refsNew.pop();
        return o2;
    }
    return opts.proto ? cloneProto : clone;
}

});

parcelRequire.register("cauxf", function(module, exports) {
"use strict";
function $8dbe1ada73d22404$var$_typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") $8dbe1ada73d22404$var$_typeof = function _typeof(obj) {
        return typeof obj;
    };
    else $8dbe1ada73d22404$var$_typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    return $8dbe1ada73d22404$var$_typeof(obj);
}
(function(global) {
    var _arguments = arguments;
    var dateFormat = function() {
        var token = /d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|W{1,2}|[LlopSZN]|"[^"]*"|'[^']*'/g;
        var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
        var timezoneClip = /[^-+\dA-Z]/g;
        return function(date, mask, utc, gmt) {
            if (_arguments.length === 1 && kindOf(date) === "string" && !/\d/.test(date)) {
                mask = date;
                date = undefined;
            }
            date = date || date === 0 ? date : new Date;
            if (!(date instanceof Date)) date = new Date(date);
            if (isNaN(date)) throw TypeError("Invalid date");
            mask = String(dateFormat.masks[mask] || mask || dateFormat.masks["default"]);
            var maskSlice = mask.slice(0, 4);
            if (maskSlice === "UTC:" || maskSlice === "GMT:") {
                mask = mask.slice(4);
                utc = true;
                if (maskSlice === "GMT:") gmt = true;
            }
            var _ = function _() {
                return utc ? "getUTC" : "get";
            };
            var _d = function d() {
                return date[_() + "Date"]();
            };
            var D = function D() {
                return date[_() + "Day"]();
            };
            var _m = function m() {
                return date[_() + "Month"]();
            };
            var y = function y() {
                return date[_() + "FullYear"]();
            };
            var _H = function H() {
                return date[_() + "Hours"]();
            };
            var _M = function M() {
                return date[_() + "Minutes"]();
            };
            var _s = function s() {
                return date[_() + "Seconds"]();
            };
            var _L = function L() {
                return date[_() + "Milliseconds"]();
            };
            var _o = function o() {
                return utc ? 0 : date.getTimezoneOffset();
            };
            var _W = function W() {
                return getWeek(date);
            };
            var _N = function N() {
                return getDayOfWeek(date);
            };
            var flags = {
                d: function d() {
                    return _d();
                },
                dd: function dd() {
                    return pad(_d());
                },
                ddd: function ddd() {
                    return dateFormat.i18n.dayNames[D()];
                },
                DDD: function DDD() {
                    return getDayName({
                        y: y(),
                        m: _m(),
                        d: _d(),
                        _: _(),
                        dayName: dateFormat.i18n.dayNames[D()],
                        short: true
                    });
                },
                dddd: function dddd() {
                    return dateFormat.i18n.dayNames[D() + 7];
                },
                DDDD: function DDDD() {
                    return getDayName({
                        y: y(),
                        m: _m(),
                        d: _d(),
                        _: _(),
                        dayName: dateFormat.i18n.dayNames[D() + 7]
                    });
                },
                m: function m() {
                    return _m() + 1;
                },
                mm: function mm() {
                    return pad(_m() + 1);
                },
                mmm: function mmm() {
                    return dateFormat.i18n.monthNames[_m()];
                },
                mmmm: function mmmm() {
                    return dateFormat.i18n.monthNames[_m() + 12];
                },
                yy: function yy() {
                    return String(y()).slice(2);
                },
                yyyy: function yyyy() {
                    return pad(y(), 4);
                },
                h: function h() {
                    return _H() % 12 || 12;
                },
                hh: function hh() {
                    return pad(_H() % 12 || 12);
                },
                H: function H() {
                    return _H();
                },
                HH: function HH() {
                    return pad(_H());
                },
                M: function M() {
                    return _M();
                },
                MM: function MM() {
                    return pad(_M());
                },
                s: function s() {
                    return _s();
                },
                ss: function ss() {
                    return pad(_s());
                },
                l: function l() {
                    return pad(_L(), 3);
                },
                L: function L() {
                    return pad(Math.floor(_L() / 10));
                },
                t: function t() {
                    return _H() < 12 ? dateFormat.i18n.timeNames[0] : dateFormat.i18n.timeNames[1];
                },
                tt: function tt() {
                    return _H() < 12 ? dateFormat.i18n.timeNames[2] : dateFormat.i18n.timeNames[3];
                },
                T: function T() {
                    return _H() < 12 ? dateFormat.i18n.timeNames[4] : dateFormat.i18n.timeNames[5];
                },
                TT: function TT() {
                    return _H() < 12 ? dateFormat.i18n.timeNames[6] : dateFormat.i18n.timeNames[7];
                },
                Z: function Z() {
                    return gmt ? "GMT" : utc ? "UTC" : (String(date).match(timezone) || [
                        ""
                    ]).pop().replace(timezoneClip, "").replace(/GMT\+0000/g, "UTC");
                },
                o: function o() {
                    return (_o() > 0 ? "-" : "+") + pad(Math.floor(Math.abs(_o()) / 60) * 100 + Math.abs(_o()) % 60, 4);
                },
                p: function p() {
                    return (_o() > 0 ? "-" : "+") + pad(Math.floor(Math.abs(_o()) / 60), 2) + ":" + pad(Math.floor(Math.abs(_o()) % 60), 2);
                },
                S: function S() {
                    return [
                        "th",
                        "st",
                        "nd",
                        "rd"
                    ][_d() % 10 > 3 ? 0 : (_d() % 100 - _d() % 10 != 10) * _d() % 10];
                },
                W: function W() {
                    return _W();
                },
                WW: function WW() {
                    return pad(_W());
                },
                N: function N() {
                    return _N();
                }
            };
            return mask.replace(token, function(match) {
                if (match in flags) return flags[match]();
                return match.slice(1, match.length - 1);
            });
        };
    }();
    dateFormat.masks = {
        default: "ddd mmm dd yyyy HH:MM:ss",
        shortDate: "m/d/yy",
        paddedShortDate: "mm/dd/yyyy",
        mediumDate: "mmm d, yyyy",
        longDate: "mmmm d, yyyy",
        fullDate: "dddd, mmmm d, yyyy",
        shortTime: "h:MM TT",
        mediumTime: "h:MM:ss TT",
        longTime: "h:MM:ss TT Z",
        isoDate: "yyyy-mm-dd",
        isoTime: "HH:MM:ss",
        isoDateTime: "yyyy-mm-dd'T'HH:MM:sso",
        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
        expiresHeaderFormat: "ddd, dd mmm yyyy HH:MM:ss Z"
    };
    dateFormat.i18n = {
        dayNames: [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ],
        monthNames: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        timeNames: [
            "a",
            "p",
            "am",
            "pm",
            "A",
            "P",
            "AM",
            "PM"
        ]
    };
    var pad = function pad(val, len) {
        val = String(val);
        len = len || 2;
        while(val.length < len)val = "0" + val;
        return val;
    };
    var getDayName = function getDayName(_ref) {
        var y = _ref.y, m = _ref.m, d = _ref.d, _ = _ref._, dayName = _ref.dayName, _ref$short = _ref["short"], _short = _ref$short === void 0 ? false : _ref$short;
        var today = new Date;
        var yesterday = new Date;
        yesterday.setDate(yesterday[_ + "Date"]() - 1);
        var tomorrow = new Date;
        tomorrow.setDate(tomorrow[_ + "Date"]() + 1);
        var today_d = function today_d() {
            return today[_ + "Date"]();
        };
        var today_m = function today_m() {
            return today[_ + "Month"]();
        };
        var today_y = function today_y() {
            return today[_ + "FullYear"]();
        };
        var yesterday_d = function yesterday_d() {
            return yesterday[_ + "Date"]();
        };
        var yesterday_m = function yesterday_m() {
            return yesterday[_ + "Month"]();
        };
        var yesterday_y = function yesterday_y() {
            return yesterday[_ + "FullYear"]();
        };
        var tomorrow_d = function tomorrow_d() {
            return tomorrow[_ + "Date"]();
        };
        var tomorrow_m = function tomorrow_m() {
            return tomorrow[_ + "Month"]();
        };
        var tomorrow_y = function tomorrow_y() {
            return tomorrow[_ + "FullYear"]();
        };
        if (today_y() === y && today_m() === m && today_d() === d) return _short ? "Tdy" : "Today";
        else if (yesterday_y() === y && yesterday_m() === m && yesterday_d() === d) return _short ? "Ysd" : "Yesterday";
        else if (tomorrow_y() === y && tomorrow_m() === m && tomorrow_d() === d) return _short ? "Tmw" : "Tomorrow";
        return dayName;
    };
    var getWeek = function getWeek(date) {
        var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        targetThursday.setDate(targetThursday.getDate() - (targetThursday.getDay() + 6) % 7 + 3);
        var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);
        firstThursday.setDate(firstThursday.getDate() - (firstThursday.getDay() + 6) % 7 + 3);
        var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
        targetThursday.setHours(targetThursday.getHours() - ds);
        var weekDiff = (targetThursday - firstThursday) / (86400000 * 7);
        return 1 + Math.floor(weekDiff);
    };
    var getDayOfWeek = function getDayOfWeek(date) {
        var dow = date.getDay();
        if (dow === 0) dow = 7;
        return dow;
    };
    var kindOf = function kindOf(val) {
        if (val === null) return "null";
        if (val === undefined) return "undefined";
        if ($8dbe1ada73d22404$var$_typeof(val) !== "object") return $8dbe1ada73d22404$var$_typeof(val);
        if (Array.isArray(val)) return "array";
        return ({
        }).toString.call(val).slice(8, -1).toLowerCase();
    };
    if (typeof define === "function" && define.amd) define(function() {
        return dateFormat;
    });
    else if ((typeof module.exports === "undefined" ? "undefined" : $8dbe1ada73d22404$var$_typeof(module.exports)) === "object") module.exports = dateFormat;
    else global.dateFormat = dateFormat;
})(void 0);

});





parcelRequire.register("2ylft", function(module, exports) {
'use strict';

var $3suzR = parcelRequire("3suzR");
var $1dbf3d462eea2728$require$version = $3suzR.version;
module.exports = {
    version: $1dbf3d462eea2728$require$version
};

});
parcelRequire.register("3suzR", function(module, exports) {
module.exports = JSON.parse("{\"name\":\"pino\",\"version\":\"6.13.3\",\"description\":\"super fast, all natural json logger\",\"main\":\"pino.js\",\"browser\":\"./browser.js\",\"files\":[\"pino.js\",\"bin.js\",\"browser.js\",\"pretty.js\",\"usage.txt\",\"test\",\"docs\",\"example.js\",\"lib\"],\"scripts\":{\"docs\":\"docsify serve\",\"browser-test\":\"airtap --local 8080 test/browser*test.js\",\"lint\":\"eslint .\",\"test\":\"npm run lint && tap --100 test/*test.js test/*/*test.js\",\"test-ci\":\"npm run lint && tap test/*test.js test/*/*test.js --coverage-report=lcovonly\",\"cov-ui\":\"tap --coverage-report=html test/*test.js test/*/*test.js\",\"bench\":\"node benchmarks/utils/runbench all\",\"bench-basic\":\"node benchmarks/utils/runbench basic\",\"bench-object\":\"node benchmarks/utils/runbench object\",\"bench-deep-object\":\"node benchmarks/utils/runbench deep-object\",\"bench-multi-arg\":\"node benchmarks/utils/runbench multi-arg\",\"bench-longs-tring\":\"node benchmarks/utils/runbench long-string\",\"bench-child\":\"node benchmarks/utils/runbench child\",\"bench-child-child\":\"node benchmarks/utils/runbench child-child\",\"bench-child-creation\":\"node benchmarks/utils/runbench child-creation\",\"bench-formatters\":\"node benchmarks/utils/runbench formatters\",\"update-bench-doc\":\"node benchmarks/utils/generate-benchmark-doc > docs/benchmarks.md\"},\"bin\":{\"pino\":\"./bin.js\"},\"precommit\":\"test\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/pinojs/pino.git\"},\"keywords\":[\"fast\",\"logger\",\"stream\",\"json\"],\"author\":\"Matteo Collina <hello@matteocollina.com>\",\"contributors\":[\"David Mark Clements <huperekchuno@googlemail.com>\",\"James Sumners <james.sumners@gmail.com>\",\"Thomas Watson Steen <w@tson.dk> (https://twitter.com/wa7son)\"],\"license\":\"MIT\",\"bugs\":{\"url\":\"https://github.com/pinojs/pino/issues\"},\"homepage\":\"http://getpino.io\",\"devDependencies\":{\"airtap\":\"4.0.3\",\"benchmark\":\"^2.1.4\",\"bole\":\"^4.0.0\",\"bunyan\":\"^1.8.14\",\"docsify-cli\":\"^4.4.1\",\"eslint\":\"^7.17.0\",\"eslint-config-standard\":\"^16.0.2\",\"eslint-plugin-import\":\"^2.22.1\",\"eslint-plugin-node\":\"^11.1.0\",\"eslint-plugin-promise\":\"^5.1.0\",\"execa\":\"^5.0.0\",\"fastbench\":\"^1.0.1\",\"flush-write-stream\":\"^2.0.0\",\"import-fresh\":\"^3.2.1\",\"log\":\"^6.0.0\",\"loglevel\":\"^1.6.7\",\"pino-pretty\":\"^5.0.0\",\"pre-commit\":\"^1.2.2\",\"proxyquire\":\"^2.1.3\",\"pump\":\"^3.0.0\",\"semver\":\"^7.0.0\",\"split2\":\"^3.1.1\",\"steed\":\"^1.1.3\",\"strip-ansi\":\"^6.0.0\",\"tap\":\"^15.0.1\",\"tape\":\"^5.0.0\",\"through2\":\"^4.0.0\",\"winston\":\"^3.3.3\"},\"dependencies\":{\"fast-redact\":\"^3.0.0\",\"fast-safe-stringify\":\"^2.0.8\",\"fastify-warning\":\"^0.2.0\",\"flatstr\":\"^1.0.12\",\"pino-std-serializers\":\"^3.1.0\",\"quick-format-unescaped\":\"^4.0.3\",\"sonic-boom\":\"^1.0.2\"}}");

});







parcelRequire.register("iQRVQ", function(module, exports) {
module.exports = (list, info)=>{
    const { duration: duration  } = info;
    const song = list.slice(0, 5) // 挑前5个结果
    .find((song)=>song.duration && Math.abs(song.duration - duration) < 5000
    ); // 第一个时长相差5s (5000ms) 之内的结果
    if (song) return song;
    else return list[0]; // 没有就播放第一条
};
module.exports.ENABLE_FLAC = (process.env.ENABLE_FLAC || '').toLowerCase() === 'true';

});

parcelRequire.register("c3fn4", function(module, exports) {

var $8c61b03f08df35f0$require$EventEmitter = $lEd20$events.EventEmitter;

var $fRKJQ = parcelRequire("fRKJQ");
var $8c61b03f08df35f0$require$logScope = $fRKJQ.logScope;
const $8c61b03f08df35f0$var$logger = $8c61b03f08df35f0$require$logScope('cache');
const $8c61b03f08df35f0$var$CacheStorageEvents = {
    CLEANUP: 'cs@cleanup'
};
/**
 * @typedef {{data: any, expireAt: Date}} CacheData
 */ /**
 * A cache storage for storing any type of data.
 */ class $8c61b03f08df35f0$var$CacheStorage extends $8c61b03f08df35f0$require$EventEmitter {
    /**
	 * @type {string}
	 */ id = 'Default Cache Storage';
    /**
	 * @type {Map<any, CacheData>}
	 * @readonly
	 */ cacheMap = new Map();
    aliveDuration = 1800000;
    /**
	 * Construct a cache storage.
	 *
	 * @param {string?} id The ID of this cache storage.
	 */ constructor(id){
        super();
        // Set the ID of this cache storage.
        if (id) this.id = id;
        // Register the CLEANUP event. It will clean up
        // the expired cache when emitting "CLEANUP" event.
        this.on($8c61b03f08df35f0$var$CacheStorageEvents.CLEANUP, async ()=>this.removeExpiredCache()
        );
    }
    /**
	 * Get the absolute UNIX timestamp the cache will be ended.
	 * @return {number}
	 * @constructor
	 */ get WillExpireAt() {
        return Date.now() + this.aliveDuration;
    }
    /**
	 * Get the context for logger().
	 *
	 * @param {Record<string, string>?} customContext The additional context.
	 * @return {Record<string, string>}
	 */ getLoggerContext(customContext = {
    }) {
        return {
            ...customContext,
            cacheStorageId: this.id
        };
    }
    /**
	 * Remove the expired cache.
	 */ removeExpiredCache() {
        $8c61b03f08df35f0$var$logger.debug(this.getLoggerContext(), 'Cleaning up the expired caches...');
        this.cacheMap.forEach((cachedData, key)=>{
            if (cachedData.expireAt <= Date.now()) this.cacheMap.delete(key);
        });
    }
    /**
	 * Cache the response.
	 *
	 * @template T
	 * @param {any} key the unique key of action to be cached.
	 * @param {() => Promise<T>} action the action to do and be cached.
	 * @param {number?} expireAt customize the expireAt of this key.
	 * @return {Promise<T>}
	 */ async cache(key, action, expireAt) {
        // Disable the cache when the NO_CACHE = true.
        if (process.env.NO_CACHE === 'true') return action();
        // Push the CLEANUP task to the event loop - "polling",
        // so that it won't block the cache() task.
        this.emit($8c61b03f08df35f0$var$CacheStorageEvents.CLEANUP);
        // Check if we have cached it before.
        // If true, we return the cached value.
        const cachedData = this.cacheMap.get(key);
        // Object.toString() can't bring any useful information,
        // we show "Something" instead.
        const logKey = typeof key === 'object' ? 'Something' : key;
        if (cachedData) {
            $8c61b03f08df35f0$var$logger.debug(this.getLoggerContext({
                logKey: logKey
            }), `${logKey} hit!`);
            return cachedData.data;
        }
        // Cache the response of action() and
        // register into our cache map.
        $8c61b03f08df35f0$var$logger.debug(this.getLoggerContext({
            logKey: key
        }), `${logKey} did not hit. Storing the execution result...`);
        const sourceResponse = await action();
        this.cacheMap.set(key, {
            data: sourceResponse,
            expireAt: new Date(expireAt || this.WillExpireAt)
        });
        return sourceResponse;
    }
}
/**
 * The group which aimed to manage all CacheStorage and
 * call the common method such as `removeExpiredCache()`.
 */ class $8c61b03f08df35f0$var$CacheStorageGroup {
    /**
	 * @type {CacheStorageGroup | undefined}
	 */ static instance = undefined;
    /** @type {Set<CacheStorage>} */ cacheStorages = new Set();
    /** @private */ constructor(){
    }
    /**
	 * @return {CacheStorageGroup}
	 */ static getInstance() {
        if (!$8c61b03f08df35f0$var$CacheStorageGroup.instance) $8c61b03f08df35f0$var$CacheStorageGroup.instance = new $8c61b03f08df35f0$var$CacheStorageGroup();
        return $8c61b03f08df35f0$var$CacheStorageGroup.instance;
    }
    cleanup() {
        this.cacheStorages.forEach((storage)=>storage.removeExpiredCache()
        );
    }
}
/**
 * The CacheStorageGroup instance that is used internally.
 *
 * Don't export it!
 *
 * @type {CacheStorageGroup}
 */ const $8c61b03f08df35f0$var$csgInstance = $8c61b03f08df35f0$var$CacheStorageGroup.getInstance();
/**
 * Get the managed CacheStorage.
 *
 * “Managed” means that this CacheStorage has been
 * added to CacheStorageGroup.
 *
 * @param {string} id
 * @return {CacheStorage}
 */ function $8c61b03f08df35f0$var$getManagedCacheStorage(id) {
    const cs = new $8c61b03f08df35f0$var$CacheStorage(id);
    $8c61b03f08df35f0$var$csgInstance.cacheStorages.add(cs);
    return cs;
}
module.exports = {
    CacheStorage: $8c61b03f08df35f0$var$CacheStorage,
    CacheStorageEvents: $8c61b03f08df35f0$var$CacheStorageEvents,
    CacheStorageGroup: $8c61b03f08df35f0$var$CacheStorageGroup,
    getManagedCacheStorage: $8c61b03f08df35f0$var$getManagedCacheStorage
};

});


parcelRequire.register("a8HAq", function(module, exports) {

var $4JwHE = parcelRequire("4JwHE");

var $iQRVQ = parcelRequire("iQRVQ");

var $7YhIx = parcelRequire("7YhIx");

var $1wHCb = parcelRequire("1wHCb");

var $c3fn4 = parcelRequire("c3fn4");
var $761c76185079ff87$require$getManagedCacheStorage = $c3fn4.getManagedCacheStorage;
const $761c76185079ff87$var$format = (song)=>{
    return {
        // id: song.FileHash,
        // name: song.SongName,
        // duration: song.Duration * 1000,
        // album: {id: song.AlbumID, name: song.AlbumName},
        // artists: song.SingerId.map((id, index) => ({id, name: SingerName[index]}))
        id: song['hash'],
        id_hq: song['320hash'],
        id_sq: song['sqhash'],
        name: song['songname'],
        duration: song['duration'] * 1000,
        album: {
            id: song['album_id'],
            name: song['album_name']
        }
    };
};
const $761c76185079ff87$var$search = (info)=>{
    const url = // 'http://songsearch.kugou.com/song_search_v2?' +
    "http://mobilecdn.kugou.com/api/v3/search/song?keyword=" + encodeURIComponent(info.keyword) + '&page=1&pagesize=10';
    return $1wHCb('GET', url).then((response)=>response.json()
    ).then((jsonBody)=>{
        // const list = jsonBody.data.lists.map(format)
        const list = jsonBody.data.info.map($761c76185079ff87$var$format);
        const matched = $iQRVQ(list, info);
        return matched ? matched : Promise.reject();
    }).catch(()=>$4JwHE().kugou.search(info)
    );
};
const $761c76185079ff87$var$single = (song, format)=>{
    const getHashId = ()=>{
        switch(format){
            case 'hash':
                return song.id;
            case 'hqhash':
                return song.id_hq;
            case 'sqhash':
                return song.id_sq;
            default:
                break;
        }
        return '';
    };
    const url = "http://trackercdn.kugou.com/i/v2/?key=" + $7YhIx.md5.digest(`${getHashId()}kgcloudv2`) + '&hash=' + getHashId() + '&' + 'appid=1005&pid=2&cmd=25&behavior=play&album_id=' + song.album.id;
    return $1wHCb('GET', url).then((response)=>response.json()
    ).then((jsonBody)=>jsonBody.url[0] || Promise.reject()
    );
};
const $761c76185079ff87$var$track = (song)=>Promise.all([
        'sqhash',
        'hqhash',
        'hash'
    ].slice($iQRVQ.ENABLE_FLAC ? 0 : 1).map((format)=>$761c76185079ff87$var$single(song, format).catch(()=>null
        )
    )).then((result)=>result.find((url)=>url
        ) || Promise.reject()
    ).catch(()=>$4JwHE().kugou.track(song)
    )
;
const $761c76185079ff87$var$cs = $761c76185079ff87$require$getManagedCacheStorage('provider/kugou');
const $761c76185079ff87$var$check = (info)=>$761c76185079ff87$var$cs.cache(info, ()=>$761c76185079ff87$var$search(info)
    ).then($761c76185079ff87$var$track)
;
module.exports = {
    check: $761c76185079ff87$var$check,
    search: $761c76185079ff87$var$search
};

});
parcelRequire.register("7YhIx", function(module, exports) {
'use strict';


var $5cdbe14f96887c02$require$parse = $lEd20$url.parse;

var $5cdbe14f96887c02$require$bodyify = $lEd20$querystring.stringify;
const $5cdbe14f96887c02$var$eapiKey = 'e82ckenh8dichen8';
const $5cdbe14f96887c02$var$linuxapiKey = 'rFgB&h#%2?^eDg:Q';
const $5cdbe14f96887c02$var$decrypt = (buffer, key)=>{
    const decipher = $lEd20$crypto.createDecipheriv('aes-128-ecb', key, null);
    return Buffer.concat([
        decipher.update(buffer),
        decipher.final()
    ]);
};
const $5cdbe14f96887c02$var$encrypt = (buffer, key)=>{
    const cipher = $lEd20$crypto.createCipheriv('aes-128-ecb', key, null);
    return Buffer.concat([
        cipher.update(buffer),
        cipher.final()
    ]);
};
module.exports = {
    eapi: {
        encrypt: (buffer)=>$5cdbe14f96887c02$var$encrypt(buffer, $5cdbe14f96887c02$var$eapiKey)
        ,
        decrypt: (buffer)=>$5cdbe14f96887c02$var$decrypt(buffer, $5cdbe14f96887c02$var$eapiKey)
        ,
        encryptRequest: (url, object)=>{
            url = $5cdbe14f96887c02$require$parse(url);
            const text = JSON.stringify(object);
            const message = `nobody${url.path}use${text}md5forencrypt`;
            const digest = $lEd20$crypto.createHash('md5').update(message).digest('hex');
            const data = `${url.path}-36cd479b6b5-${text}-36cd479b6b5-${digest}`;
            return {
                url: url.href.replace(/\w*api/, 'eapi'),
                body: $5cdbe14f96887c02$require$bodyify({
                    params: module.exports.eapi.encrypt(Buffer.from(data)).toString('hex').toUpperCase()
                })
            };
        }
    },
    linuxapi: {
        encrypt: (buffer)=>$5cdbe14f96887c02$var$encrypt(buffer, $5cdbe14f96887c02$var$linuxapiKey)
        ,
        decrypt: (buffer)=>$5cdbe14f96887c02$var$decrypt(buffer, $5cdbe14f96887c02$var$linuxapiKey)
        ,
        encryptRequest: (url, object)=>{
            url = $5cdbe14f96887c02$require$parse(url);
            const text = JSON.stringify({
                method: 'POST',
                url: url.href,
                params: object
            });
            return {
                url: url.resolve('/api/linux/forward'),
                body: $5cdbe14f96887c02$require$bodyify({
                    eparams: module.exports.linuxapi.encrypt(Buffer.from(text)).toString('hex').toUpperCase()
                })
            };
        }
    },
    miguapi: {
        encryptBody: (object)=>{
            const text = JSON.stringify(object);
            const derive = (password, salt, keyLength, ivSize)=>{
                // EVP_BytesToKey
                salt = salt || Buffer.alloc(0);
                const keySize = keyLength / 8;
                const repeat = Math.ceil((keySize + ivSize * 8) / 32);
                const buffer = Buffer.concat(Array(repeat).fill(null).reduce((result)=>result.concat($lEd20$crypto.createHash('md5').update(Buffer.concat([
                        result.slice(-1)[0],
                        password,
                        salt, 
                    ])).digest())
                , [
                    Buffer.alloc(0)
                ]));
                return {
                    key: buffer.slice(0, keySize),
                    iv: buffer.slice(keySize, keySize + ivSize)
                };
            };
            const password = Buffer.from($lEd20$crypto.randomBytes(32).toString('hex')), salt = $lEd20$crypto.randomBytes(8);
            const key = '-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8asrfSaoOb4je+DSmKdriQJKWVJ2oDZrs3wi5W67m3LwTB9QVR+cE3XWU21Nx+YBxS0yun8wDcjgQvYt625ZCcgin2ro/eOkNyUOTBIbuj9CvMnhUYiR61lC1f1IGbrSYYimqBVSjpifVufxtx/I3exReZosTByYp4Xwpb1+WAQIDAQAB\n-----END PUBLIC KEY-----';
            const secret = derive(password, salt, 256, 16);
            const cipher = $lEd20$crypto.createCipheriv('aes-256-cbc', secret.key, secret.iv);
            return $5cdbe14f96887c02$require$bodyify({
                data: Buffer.concat([
                    Buffer.from('Salted__'),
                    salt,
                    cipher.update(Buffer.from(text)),
                    cipher.final(), 
                ]).toString('base64'),
                secKey: $lEd20$crypto.publicEncrypt({
                    key: key,
                    padding: $lEd20$crypto.constants.RSA_PKCS1_PADDING
                }, password).toString('base64')
            });
        }
    },
    base64: {
        encode: (text, charset)=>Buffer.from(text, charset).toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
        ,
        decode: (text, charset)=>Buffer.from(text.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString(charset)
    },
    uri: {
        retrieve: (id)=>{
            id = id.toString().trim();
            const key = '3go8&$8*3*3h0k(2)2';
            const string = Array.from(Array(id.length).keys()).map((index)=>String.fromCharCode(id.charCodeAt(index) ^ key.charCodeAt(index % key.length))
            ).join('');
            const result = $lEd20$crypto.createHash('md5').update(string).digest('base64').replace(/\//g, '_').replace(/\+/g, '-');
            return `http://p1.music.126.net/${result}/${id}`;
        }
    },
    md5: {
        digest: (value)=>$lEd20$crypto.createHash('md5').update(value).digest('hex')
        ,
        pipe: (source)=>new Promise((resolve, reject)=>{
                const digest = $lEd20$crypto.createHash('md5').setEncoding('hex');
                source.pipe(digest).on('error', (error)=>reject(error)
                ).once('finish', ()=>resolve(digest.read())
                );
            })
    }
};

try {
    module.exports.kuwoapi = (parcelRequire("kTMMN"));
} catch (e) {
}

});
parcelRequire.register("kTMMN", function(module, exports) {
/*
	Thanks to
	https://github.com/XuShaohua/kwplayer/blob/master/kuwo/DES.py
	https://github.com/Levi233/MusicPlayer/blob/master/app/src/main/java/com/chenhao/musicplayer/utils/crypt/KuwoDES.java
*/ const $f36ec996b8e9fd36$var$Long = (n)=>{
    const bN = BigInt(n);
    return {
        low: Number(bN),
        valueOf: ()=>bN.valueOf()
        ,
        toString: ()=>bN.toString()
        ,
        not: ()=>$f36ec996b8e9fd36$var$Long(~bN)
        ,
        isNegative: ()=>bN < 0
        ,
        or: (x)=>$f36ec996b8e9fd36$var$Long(bN | BigInt(x))
        ,
        and: (x)=>$f36ec996b8e9fd36$var$Long(bN & BigInt(x))
        ,
        xor: (x)=>$f36ec996b8e9fd36$var$Long(bN ^ BigInt(x))
        ,
        equals: (x)=>bN === BigInt(x)
        ,
        multiply: (x)=>$f36ec996b8e9fd36$var$Long(bN * BigInt(x))
        ,
        shiftLeft: (x)=>$f36ec996b8e9fd36$var$Long(bN << BigInt(x))
        ,
        shiftRight: (x)=>$f36ec996b8e9fd36$var$Long(bN >> BigInt(x))
    };
};
const $f36ec996b8e9fd36$var$range = (n)=>Array.from(new Array(n).keys())
;
const $f36ec996b8e9fd36$var$power = (base, index)=>Array(index).fill(null).reduce((result)=>result.multiply(base)
    , $f36ec996b8e9fd36$var$Long(1))
;
const $f36ec996b8e9fd36$var$LongArray = (...array)=>array.map((n)=>n === -1 ? $f36ec996b8e9fd36$var$Long(-1, -1) : $f36ec996b8e9fd36$var$Long(n)
    )
;
// EXPANSION
const $f36ec996b8e9fd36$var$arrayE = $f36ec996b8e9fd36$var$LongArray(31, 0, 1, 2, 3, 4, -1, -1, 3, 4, 5, 6, 7, 8, -1, -1, 7, 8, 9, 10, 11, 12, -1, -1, 11, 12, 13, 14, 15, 16, -1, -1, 15, 16, 17, 18, 19, 20, -1, -1, 19, 20, 21, 22, 23, 24, -1, -1, 23, 24, 25, 26, 27, 28, -1, -1, 27, 28, 29, 30, 31, 30, -1, -1);
// INITIAL_PERMUTATION
const $f36ec996b8e9fd36$var$arrayIP = $f36ec996b8e9fd36$var$LongArray(57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7, 56, 48, 40, 32, 24, 16, 8, 0, 58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38, 30, 22, 14, 6);
// INVERSE_PERMUTATION
const $f36ec996b8e9fd36$var$arrayIP_1 = $f36ec996b8e9fd36$var$LongArray(39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28, 35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57, 25, 32, 0, 40, 8, 48, 16, 56, 24);
// ROTATES
const $f36ec996b8e9fd36$var$arrayLs = [
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    1
];
const $f36ec996b8e9fd36$var$arrayLsMask = $f36ec996b8e9fd36$var$LongArray(0, 1048577, 3145731);
const $f36ec996b8e9fd36$var$arrayMask = $f36ec996b8e9fd36$var$range(64).map((n)=>$f36ec996b8e9fd36$var$power(2, n)
);
$f36ec996b8e9fd36$var$arrayMask[$f36ec996b8e9fd36$var$arrayMask.length - 1] = $f36ec996b8e9fd36$var$arrayMask[$f36ec996b8e9fd36$var$arrayMask.length - 1].multiply(-1);
// PERMUTATION
const $f36ec996b8e9fd36$var$arrayP = $f36ec996b8e9fd36$var$LongArray(15, 6, 19, 20, 28, 11, 27, 16, 0, 14, 22, 25, 4, 17, 30, 9, 1, 7, 23, 13, 31, 26, 2, 8, 18, 12, 29, 5, 21, 10, 3, 24);
// PERMUTED_CHOICE1
const $f36ec996b8e9fd36$var$arrayPC_1 = $f36ec996b8e9fd36$var$LongArray(56, 48, 40, 32, 24, 16, 8, 0, 57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 60, 52, 44, 36, 28, 20, 12, 4, 27, 19, 11, 3);
// PERMUTED_CHOICE2
const $f36ec996b8e9fd36$var$arrayPC_2 = $f36ec996b8e9fd36$var$LongArray(13, 16, 10, 23, 0, 4, -1, -1, 2, 27, 14, 5, 20, 9, -1, -1, 22, 18, 11, 3, 25, 7, -1, -1, 15, 6, 26, 19, 12, 1, -1, -1, 40, 51, 30, 36, 46, 54, -1, -1, 29, 39, 50, 44, 32, 47, -1, -1, 43, 48, 38, 55, 33, 52, -1, -1, 45, 41, 49, 35, 28, 31, -1, -1);
const $f36ec996b8e9fd36$var$matrixNSBox = [
    [
        14,
        4,
        3,
        15,
        2,
        13,
        5,
        3,
        13,
        14,
        6,
        9,
        11,
        2,
        0,
        5,
        4,
        1,
        10,
        12,
        15,
        6,
        9,
        10,
        1,
        8,
        12,
        7,
        8,
        11,
        7,
        0,
        0,
        15,
        10,
        5,
        14,
        4,
        9,
        10,
        7,
        8,
        12,
        3,
        13,
        1,
        3,
        6,
        15,
        12,
        6,
        11,
        2,
        9,
        5,
        0,
        4,
        2,
        11,
        14,
        1,
        7,
        8,
        13, 
    ],
    [
        15,
        0,
        9,
        5,
        6,
        10,
        12,
        9,
        8,
        7,
        2,
        12,
        3,
        13,
        5,
        2,
        1,
        14,
        7,
        8,
        11,
        4,
        0,
        3,
        14,
        11,
        13,
        6,
        4,
        1,
        10,
        15,
        3,
        13,
        12,
        11,
        15,
        3,
        6,
        0,
        4,
        10,
        1,
        7,
        8,
        4,
        11,
        14,
        13,
        8,
        0,
        6,
        2,
        15,
        9,
        5,
        7,
        1,
        10,
        12,
        14,
        2,
        5,
        9, 
    ],
    [
        10,
        13,
        1,
        11,
        6,
        8,
        11,
        5,
        9,
        4,
        12,
        2,
        15,
        3,
        2,
        14,
        0,
        6,
        13,
        1,
        3,
        15,
        4,
        10,
        14,
        9,
        7,
        12,
        5,
        0,
        8,
        7,
        13,
        1,
        2,
        4,
        3,
        6,
        12,
        11,
        0,
        13,
        5,
        14,
        6,
        8,
        15,
        2,
        7,
        10,
        8,
        15,
        4,
        9,
        11,
        5,
        9,
        0,
        14,
        3,
        10,
        7,
        1,
        12, 
    ],
    [
        7,
        10,
        1,
        15,
        0,
        12,
        11,
        5,
        14,
        9,
        8,
        3,
        9,
        7,
        4,
        8,
        13,
        6,
        2,
        1,
        6,
        11,
        12,
        2,
        3,
        0,
        5,
        14,
        10,
        13,
        15,
        4,
        13,
        3,
        4,
        9,
        6,
        10,
        1,
        12,
        11,
        0,
        2,
        5,
        0,
        13,
        14,
        2,
        8,
        15,
        7,
        4,
        15,
        1,
        10,
        7,
        5,
        6,
        12,
        11,
        3,
        8,
        9,
        14, 
    ],
    [
        2,
        4,
        8,
        15,
        7,
        10,
        13,
        6,
        4,
        1,
        3,
        12,
        11,
        7,
        14,
        0,
        12,
        2,
        5,
        9,
        10,
        13,
        0,
        3,
        1,
        11,
        15,
        5,
        6,
        8,
        9,
        14,
        14,
        11,
        5,
        6,
        4,
        1,
        3,
        10,
        2,
        12,
        15,
        0,
        13,
        2,
        8,
        5,
        11,
        8,
        0,
        15,
        7,
        14,
        9,
        4,
        12,
        7,
        10,
        9,
        1,
        13,
        6,
        3, 
    ],
    [
        12,
        9,
        0,
        7,
        9,
        2,
        14,
        1,
        10,
        15,
        3,
        4,
        6,
        12,
        5,
        11,
        1,
        14,
        13,
        0,
        2,
        8,
        7,
        13,
        15,
        5,
        4,
        10,
        8,
        3,
        11,
        6,
        10,
        4,
        6,
        11,
        7,
        9,
        0,
        6,
        4,
        2,
        13,
        1,
        9,
        15,
        3,
        8,
        15,
        3,
        1,
        14,
        12,
        5,
        11,
        0,
        2,
        12,
        14,
        7,
        5,
        10,
        8,
        13, 
    ],
    [
        4,
        1,
        3,
        10,
        15,
        12,
        5,
        0,
        2,
        11,
        9,
        6,
        8,
        7,
        6,
        9,
        11,
        4,
        12,
        15,
        0,
        3,
        10,
        5,
        14,
        13,
        7,
        8,
        13,
        14,
        1,
        2,
        13,
        6,
        14,
        9,
        4,
        1,
        2,
        14,
        11,
        13,
        5,
        0,
        1,
        10,
        8,
        3,
        0,
        11,
        3,
        5,
        9,
        4,
        15,
        2,
        7,
        8,
        12,
        15,
        10,
        7,
        6,
        12, 
    ],
    [
        13,
        7,
        10,
        0,
        6,
        9,
        5,
        15,
        8,
        4,
        3,
        10,
        11,
        14,
        12,
        5,
        2,
        11,
        9,
        6,
        15,
        12,
        0,
        3,
        4,
        1,
        14,
        13,
        1,
        2,
        7,
        8,
        1,
        2,
        12,
        15,
        10,
        4,
        0,
        3,
        13,
        14,
        6,
        9,
        7,
        8,
        9,
        6,
        15,
        1,
        5,
        12,
        3,
        10,
        14,
        5,
        8,
        7,
        11,
        0,
        4,
        13,
        2,
        11, 
    ], 
];
const $f36ec996b8e9fd36$var$bitTransform = (arrInt, n, l)=>{
    // int[], int, long : long
    let l2 = $f36ec996b8e9fd36$var$Long(0);
    $f36ec996b8e9fd36$var$range(n).forEach((i)=>{
        if (arrInt[i].isNegative() || l.and($f36ec996b8e9fd36$var$arrayMask[arrInt[i].low]).equals(0)) return;
        l2 = l2.or($f36ec996b8e9fd36$var$arrayMask[i]);
    });
    return l2;
};
const $f36ec996b8e9fd36$var$DES64 = (longs, l)=>{
    const pR = $f36ec996b8e9fd36$var$range(8).map(()=>$f36ec996b8e9fd36$var$Long(0)
    );
    const pSource = [
        $f36ec996b8e9fd36$var$Long(0),
        $f36ec996b8e9fd36$var$Long(0)
    ];
    let L = $f36ec996b8e9fd36$var$Long(0);
    let R = $f36ec996b8e9fd36$var$Long(0);
    let out = $f36ec996b8e9fd36$var$bitTransform($f36ec996b8e9fd36$var$arrayIP, 64, l);
    pSource[0] = out.and(4294967295);
    pSource[1] = out.and(-4294967296).shiftRight(32);
    $f36ec996b8e9fd36$var$range(16).forEach((i)=>{
        let SOut = $f36ec996b8e9fd36$var$Long(0);
        R = $f36ec996b8e9fd36$var$Long(pSource[1]);
        R = $f36ec996b8e9fd36$var$bitTransform($f36ec996b8e9fd36$var$arrayE, 64, R);
        R = R.xor(longs[i]);
        $f36ec996b8e9fd36$var$range(8).forEach((j)=>{
            pR[j] = R.shiftRight(j * 8).and(255);
        });
        $f36ec996b8e9fd36$var$range(8).reverse().forEach((sbi)=>{
            SOut = SOut.shiftLeft(4).or($f36ec996b8e9fd36$var$matrixNSBox[sbi][pR[sbi]]);
        });
        R = $f36ec996b8e9fd36$var$bitTransform($f36ec996b8e9fd36$var$arrayP, 32, SOut);
        L = $f36ec996b8e9fd36$var$Long(pSource[0]);
        pSource[0] = $f36ec996b8e9fd36$var$Long(pSource[1]);
        pSource[1] = L.xor(R);
    });
    pSource.reverse();
    out = pSource[1].shiftLeft(32).and(-4294967296).or(pSource[0].and(4294967295));
    out = $f36ec996b8e9fd36$var$bitTransform($f36ec996b8e9fd36$var$arrayIP_1, 64, out);
    return out;
};
const $f36ec996b8e9fd36$var$subKeys = (l, longs, n)=>{
    // long, long[], int
    let l2 = $f36ec996b8e9fd36$var$bitTransform($f36ec996b8e9fd36$var$arrayPC_1, 56, l);
    $f36ec996b8e9fd36$var$range(16).forEach((i)=>{
        l2 = l2.and($f36ec996b8e9fd36$var$arrayLsMask[$f36ec996b8e9fd36$var$arrayLs[i]]).shiftLeft(28 - $f36ec996b8e9fd36$var$arrayLs[i]).or(l2.and($f36ec996b8e9fd36$var$arrayLsMask[$f36ec996b8e9fd36$var$arrayLs[i]].not()).shiftRight($f36ec996b8e9fd36$var$arrayLs[i]));
        longs[i] = $f36ec996b8e9fd36$var$bitTransform($f36ec996b8e9fd36$var$arrayPC_2, 64, l2);
    });
    if (n === 1) $f36ec996b8e9fd36$var$range(8).forEach((j)=>{
        [longs[j], longs[15 - j]] = [
            longs[15 - j],
            longs[j]
        ];
    });
};
const $f36ec996b8e9fd36$var$crypt = (msg, key, mode)=>{
    // 处理密钥块
    let l = $f36ec996b8e9fd36$var$Long(0);
    $f36ec996b8e9fd36$var$range(8).forEach((i)=>{
        l = $f36ec996b8e9fd36$var$Long(key[i]).shiftLeft(i * 8).or(l);
    });
    const j = Math.floor(msg.length / 8);
    // arrLong1 存放的是转换后的密钥块, 在解密时只需要把这个密钥块反转就行了
    const arrLong1 = $f36ec996b8e9fd36$var$range(16).map(()=>$f36ec996b8e9fd36$var$Long(0)
    );
    $f36ec996b8e9fd36$var$subKeys(l, arrLong1, mode);
    // arrLong2 存放的是前部分的明文
    const arrLong2 = $f36ec996b8e9fd36$var$range(j).map(()=>$f36ec996b8e9fd36$var$Long(0)
    );
    $f36ec996b8e9fd36$var$range(j).forEach((m)=>{
        $f36ec996b8e9fd36$var$range(8).forEach((n)=>{
            arrLong2[m] = $f36ec996b8e9fd36$var$Long(msg[n + m * 8]).shiftLeft(n * 8).or(arrLong2[m]);
        });
    });
    // 用于存放密文
    const arrLong3 = $f36ec996b8e9fd36$var$range(Math.floor((1 + 8 * (j + 1)) / 8)).map(()=>$f36ec996b8e9fd36$var$Long(0)
    );
    // 计算前部的数据块(除了最后一部分)
    $f36ec996b8e9fd36$var$range(j).forEach((i1)=>{
        arrLong3[i1] = $f36ec996b8e9fd36$var$DES64(arrLong1, arrLong2[i1]);
    });
    // 保存多出来的字节
    const arrByte1 = msg.slice(j * 8);
    let l2 = $f36ec996b8e9fd36$var$Long(0);
    $f36ec996b8e9fd36$var$range(msg.length % 8).forEach((i1)=>{
        l2 = $f36ec996b8e9fd36$var$Long(arrByte1[i1]).shiftLeft(i1 * 8).or(l2);
    });
    // 计算多出的那一位(最后一位)
    if (arrByte1.length || mode === 0) arrLong3[j] = $f36ec996b8e9fd36$var$DES64(arrLong1, l2); // 解密不需要
    // 将密文转为字节型
    const arrByte2 = $f36ec996b8e9fd36$var$range(8 * arrLong3.length).map(()=>0
    );
    let i4 = 0;
    arrLong3.forEach((l3)=>{
        $f36ec996b8e9fd36$var$range(8).forEach((i6)=>{
            arrByte2[i4] = l3.shiftRight(i6 * 8).and(255).low;
            i4 += 1;
        });
    });
    return Buffer.from(arrByte2);
};
const $f36ec996b8e9fd36$var$SECRET_KEY = Buffer.from('ylzsxkwm');
const $f36ec996b8e9fd36$var$encrypt = (msg)=>$f36ec996b8e9fd36$var$crypt(msg, $f36ec996b8e9fd36$var$SECRET_KEY, 0)
;
const $f36ec996b8e9fd36$var$decrypt = (msg)=>$f36ec996b8e9fd36$var$crypt(msg, $f36ec996b8e9fd36$var$SECRET_KEY, 1)
;
const $f36ec996b8e9fd36$var$encryptQuery = (query)=>$f36ec996b8e9fd36$var$encrypt(Buffer.from(query)).toString('base64')
;
module.exports = {
    encrypt: $f36ec996b8e9fd36$var$encrypt,
    decrypt: $f36ec996b8e9fd36$var$decrypt,
    encryptQuery: $f36ec996b8e9fd36$var$encryptQuery
};

});



parcelRequire.register("4Ipub", function(module, exports) {

var $4JwHE = parcelRequire("4JwHE");

var $iQRVQ = parcelRequire("iQRVQ");

var $7YhIx = parcelRequire("7YhIx");

var $1wHCb = parcelRequire("1wHCb");

var $c3fn4 = parcelRequire("c3fn4");
var $36ef0a73c6dc228e$require$getManagedCacheStorage = $c3fn4.getManagedCacheStorage;
const $36ef0a73c6dc228e$var$format = (song)=>({
        id: song.musicrid.split('_').pop(),
        name: song.name,
        // duration: song.songTimeMinutes.split(':').reduce((minute, second) => minute * 60 + parseFloat(second), 0) * 1000,
        duration: song.duration * 1000,
        album: {
            id: song.albumid,
            name: song.album
        },
        artists: song.artist.split('&').map((name, index)=>({
                id: index ? null : song.artistid,
                name: name
            })
        )
    })
;
const $36ef0a73c6dc228e$var$search = (info)=>{
    // const url =
    // 	// 'http://search.kuwo.cn/r.s?' +
    // 	// 'ft=music&itemset=web_2013&client=kt&' +
    // 	// 'rformat=json&encoding=utf8&' +
    // 	// 'all=' + encodeURIComponent(info.keyword) + '&pn=0&rn=20'
    // 	'http://search.kuwo.cn/r.s?' +
    // 	'ft=music&rformat=json&encoding=utf8&' +
    // 	'rn=8&callback=song&vipver=MUSIC_8.0.3.1&' +
    // 	'SONGNAME=' + encodeURIComponent(info.name) + '&' +
    // 	'ARTIST=' + encodeURIComponent(info.artists[0].name)
    // return request('GET', url)
    // .then(response => response.body())
    // .then(body => {
    // 	const jsonBody = eval(
    // 		'(' + body
    // 		.replace(/\n/g, '')
    // 		.match(/try\s*\{[^=]+=\s*(.+?)\s*\}\s*catch/)[1]
    // 		.replace(/;\s*song\s*\(.+\)\s*;\s*/, '') + ')'
    // 	)
    // 	const matched = jsonBody.abslist[0]
    // 	if (matched)
    // 		return matched.MUSICRID.split('_').pop()
    // 	else
    // 		return Promise.reject()
    // })
    const keyword = encodeURIComponent(info.keyword.replace(' - ', ''));
    const url = `http://www.kuwo.cn/api/www/search/searchMusicBykeyWord?key=${keyword}&pn=1&rn=30`;
    return $1wHCb('GET', `http://kuwo.cn/search/list?key=${keyword}`).then((response)=>response.headers['set-cookie'].find((line)=>line.includes('kw_token')
        ).replace(/;.*/, '').split('=').pop()
    ).then((token)=>$1wHCb('GET', url, {
            referer: `http://www.kuwo.cn/search/list?key=${keyword}`,
            csrf: token,
            cookie: `kw_token=${token}`
        })
    ).then((response)=>response.json()
    ).then((jsonBody)=>{
        if (jsonBody && typeof jsonBody === 'object' && 'code' in jsonBody && jsonBody.code !== 200) return Promise.reject();
        const list = jsonBody.data.list.map($36ef0a73c6dc228e$var$format);
        const matched = $iQRVQ(list, info);
        return matched ? matched.id : Promise.reject();
    });
};
const $36ef0a73c6dc228e$var$track = (id)=>{
    const url = $7YhIx.kuwoapi ? 'http://mobi.kuwo.cn/mobi.s?f=kuwo&q=' + $7YhIx.kuwoapi.encryptQuery('corp=kuwo&p2p=1&type=convert_url2&sig=0&format=' + [
        'flac',
        'mp3'
    ].slice($iQRVQ.ENABLE_FLAC ? 0 : 1).join('|') + '&rid=' + id) : 'http://antiserver.kuwo.cn/anti.s?type=convert_url&format=mp3&response=url&rid=MUSIC_' + id; // flac refuse
    // : 'http://www.kuwo.cn/url?format=mp3&response=url&type=convert_url3&br=320kmp3&rid=' + id // flac refuse
    return $1wHCb('GET', url, {
        'user-agent': 'okhttp/3.10.0'
    }).then((response)=>response.body()
    ).then((body)=>{
        const url = (body.match(/http[^\s$"]+/) || [])[0];
        return url || Promise.reject();
    }).catch(()=>$4JwHE().kuwo.track(id)
    );
};
const $36ef0a73c6dc228e$var$cs = $36ef0a73c6dc228e$require$getManagedCacheStorage('provider/kuwo');
const $36ef0a73c6dc228e$var$check = (info)=>$36ef0a73c6dc228e$var$cs.cache(info, ()=>$36ef0a73c6dc228e$var$search(info)
    ).then($36ef0a73c6dc228e$var$track)
;
module.exports = {
    check: $36ef0a73c6dc228e$var$check,
    track: $36ef0a73c6dc228e$var$track
};

});

parcelRequire.register("2QiCb", function(module, exports) {

var $4JwHE = parcelRequire("4JwHE");

var $iQRVQ = parcelRequire("iQRVQ");

var $1wHCb = parcelRequire("1wHCb");

var $c3fn4 = parcelRequire("c3fn4");
var $211ee0a1f23070c4$require$getManagedCacheStorage = $c3fn4.getManagedCacheStorage;
const $211ee0a1f23070c4$var$headers = {
    origin: 'http://music.migu.cn/',
    referer: 'http://m.music.migu.cn/v3/',
    // 'cookie': 'migu_music_sid=' + (process.env.MIGU_COOKIE || null)
    aversionid: process.env.MIGU_COOKIE || null,
    channel: '0'
};
const $211ee0a1f23070c4$var$format = (song)=>{
    const singerId = song.singerId.split(/\s*,\s*/);
    const singerName = song.singerName.split(/\s*,\s*/);
    return {
        // id: song.copyrightId,
        id: song.id,
        name: song.title,
        album: {
            id: song.albumId,
            name: song.albumName
        },
        artists: singerId.map((id, index)=>({
                id: id,
                name: singerName[index]
            })
        )
    };
};
const $211ee0a1f23070c4$var$search = (info)=>{
    const url = "https://m.music.migu.cn/migu/remoting/scr_search_tag?keyword=" + encodeURIComponent(info.keyword) + '&type=2&rows=20&pgc=1';
    return $1wHCb('GET', url, $211ee0a1f23070c4$var$headers).then((response)=>response.json()
    ).then((jsonBody)=>{
        const list = ((jsonBody || {
        }).musics || []).map($211ee0a1f23070c4$var$format);
        const matched = $iQRVQ(list, info);
        return matched ? matched.id : Promise.reject();
    });
};
const $211ee0a1f23070c4$var$single = (id, format)=>{
    // const url =
    //	'https://music.migu.cn/v3/api/music/audioPlayer/getPlayInfo?' +
    //	'dataType=2&' + crypto.miguapi.encryptBody({copyrightId: id.toString(), type: format})
    const randomInt = Math.random().toString().substr(2);
    const url = 'https://app.c.nf.migu.cn/MIGUM2.0/strategy/listen-url/v2.2?lowerQualityContentId=' + randomInt + '&netType=01&resourceType=E&songId=' + id.toString() + '&toneFlag=' + format;
    return $1wHCb('GET', url, $211ee0a1f23070c4$var$headers).then((response)=>response.json()
    ).then((jsonBody)=>{
        // const {playUrl} = jsonBody.data
        // return playUrl ? encodeURI('http:' + playUrl) : Promise.reject()
        const { formatType: formatType  } = jsonBody.data;
        if (formatType !== format) return Promise.reject();
        else return url ? jsonBody.data.url : Promise.reject();
    });
};
const $211ee0a1f23070c4$var$track = (id)=>Promise.all(// [3, 2, 1].slice(select.ENABLE_FLAC ? 0 : 1)
    [
        'ZQ',
        'SQ',
        'HQ',
        'PQ'
    ].slice($iQRVQ.ENABLE_FLAC ? 0 : 2).map((format)=>$211ee0a1f23070c4$var$single(id, format).catch(()=>null
        )
    )).then((result)=>result.find((url)=>url
        ) || Promise.reject()
    ).catch(()=>$4JwHE().migu.track(id)
    )
;
const $211ee0a1f23070c4$var$cs = $211ee0a1f23070c4$require$getManagedCacheStorage('provider/migu');
const $211ee0a1f23070c4$var$check = (info)=>$211ee0a1f23070c4$var$cs.cache(info, ()=>$211ee0a1f23070c4$var$search(info)
    ).then($211ee0a1f23070c4$var$track)
;
module.exports = {
    check: $211ee0a1f23070c4$var$check,
    track: $211ee0a1f23070c4$var$track
};

});

parcelRequire.register("2og7d", function(module, exports) {

var $4JwHE = parcelRequire("4JwHE");

var $iQRVQ = parcelRequire("iQRVQ");

var $7YhIx = parcelRequire("7YhIx");

var $1wHCb = parcelRequire("1wHCb");

var $c3fn4 = parcelRequire("c3fn4");
var $1bda52d781b21676$require$getManagedCacheStorage = $c3fn4.getManagedCacheStorage;
const $1bda52d781b21676$var$headers = {
    origin: 'http://www.joox.com',
    referer: 'http://www.joox.com',
    // Refer to #95, you should register an account
    // on Joox to use their service. We allow users
    // to specify it manually.
    cookie: process.env.JOOX_COOKIE || null
};
const $1bda52d781b21676$var$fit = (info)=>{
    if (/[\u0800-\u4e00]/.test(info.name)) //is japanese
    return info.name;
    else return info.keyword;
};
const $1bda52d781b21676$var$format = (song)=>{
    const { decode: decode  } = $7YhIx.base64;
    return {
        id: song.songid,
        name: decode(song.info1 || ''),
        duration: song.playtime * 1000,
        album: {
            id: song.albummid,
            name: decode(song.info3 || '')
        },
        artists: song.singer_list.map(({ id: id , name: name  })=>({
                id: id,
                name: decode(name || '')
            })
        )
    };
};
const $1bda52d781b21676$var$search = (info)=>{
    const keyword = $1bda52d781b21676$var$fit(info);
    const url = "http://api-jooxtt.sanook.com/web-fcgi-bin/web_search?country=hk&lang=zh_TW&search_input=" + encodeURIComponent(keyword) + '&sin=0&ein=30';
    return $1wHCb('GET', url, $1bda52d781b21676$var$headers).then((response)=>response.body()
    ).then((body)=>{
        const jsonBody = JSON.parse(body.replace(/'/g, '"'));
        const list = jsonBody.itemlist.map($1bda52d781b21676$var$format);
        const matched = $iQRVQ(list, info);
        return matched ? matched.id : Promise.reject();
    });
};
const $1bda52d781b21676$var$track = (id)=>{
    const url = "http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid=" + id + '&country=hk&lang=zh_cn&from_type=-1&' + 'channel_id=-1&_=' + new Date().getTime();
    return $1wHCb('GET', url, $1bda52d781b21676$var$headers).then((response)=>response.jsonp()
    ).then((jsonBody)=>{
        const songUrl = (jsonBody.r320Url || jsonBody.r192Url || jsonBody.mp3Url || jsonBody.m4aUrl).replace(/M\d00([\w]+).mp3/, 'M800$1.mp3');
        if (songUrl) return songUrl;
        else return Promise.reject();
    }).catch(()=>$4JwHE().joox.track(id)
    );
};
const $1bda52d781b21676$var$cs = $1bda52d781b21676$require$getManagedCacheStorage('provider/joox');
const $1bda52d781b21676$var$check = (info)=>$1bda52d781b21676$var$cs.cache(info, ()=>$1bda52d781b21676$var$search(info)
    ).then($1bda52d781b21676$var$track)
;
module.exports = {
    check: $1bda52d781b21676$var$check,
    track: $1bda52d781b21676$var$track
};

});

parcelRequire.register("4AswL", function(module, exports) {

var $1wHCb = parcelRequire("1wHCb");

var $c3fn4 = parcelRequire("c3fn4");
var $3570a7273781199b$require$getManagedCacheStorage = $c3fn4.getManagedCacheStorage;
const $3570a7273781199b$var$parse = (query)=>(query || '').split('&').reduce((result, item)=>{
        const splitItem = item.split('=').map(decodeURIComponent);
        return Object.assign({
        }, result, {
            [splitItem[0]]: splitItem[1]
        });
    }, {
    })
;
const $3570a7273781199b$var$cs = $3570a7273781199b$require$getManagedCacheStorage('provider/youtube');
// const proxy = require('url').parse('http://127.0.0.1:1080')
const $3570a7273781199b$var$proxy = undefined;
const $3570a7273781199b$var$key = process.env.YOUTUBE_KEY || null; // YouTube Data API v3
const $3570a7273781199b$var$signature = (id = '-tKVN2mAKRI')=>{
    const url = `https://www.youtube.com/watch?v=${id}`;
    return $1wHCb('GET', url, {
    }, null, $3570a7273781199b$var$proxy).then((response)=>response.body()
    ).then((body)=>{
        let assets = /"WEB_PLAYER_CONTEXT_CONFIG_ID_KEVLAR_VERTICAL_LANDING_PAGE_PROMO":{[^}]+}/.exec(body)[0];
        assets = JSON.parse(`{${assets}}}`).WEB_PLAYER_CONTEXT_CONFIG_ID_KEVLAR_VERTICAL_LANDING_PAGE_PROMO;
        return $1wHCb('GET', 'https://youtube.com' + assets.jsUrl, {
        }, null, $3570a7273781199b$var$proxy).then((response)=>response.body()
        );
    }).then((body)=>{
        const [, funcArg, funcBody] = /function\((\w+)\)\s*{([^}]+split\(""\)[^}]+join\(""\))};/.exec(body);
        const helperName = /;(.+?)\..+?\(/.exec(funcBody)[1];
        const helperContent = new RegExp(`var ${helperName}={[\\s\\S]+?};`).exec(body)[0];
        return new Function([
            funcArg
        ], helperContent + '\n' + funcBody);
    });
};
const $3570a7273781199b$var$apiSearch = (info)=>{
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(info.keyword)}&type=video&key=${$3570a7273781199b$var$key}`;
    return $1wHCb('GET', url, {
        accept: 'application/json'
    }, null, $3570a7273781199b$var$proxy).then((response)=>response.json()
    ).then((jsonBody)=>{
        const matched = jsonBody.items[0];
        if (matched) return matched.id.videoId;
        else return Promise.reject();
    });
};
const $3570a7273781199b$var$search = (info)=>{
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(info.keyword)}`;
    return $1wHCb('GET', url, {
    }, null, $3570a7273781199b$var$proxy).then((response)=>response.body()
    ).then((body)=>{
        const initialData = JSON.parse(body.match(/ytInitialData\s*=\s*([^;]+);/)[1]);
        const matched = initialData.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents[0];
        if (matched) return matched.videoRenderer.videoId;
        else return Promise.reject();
    });
};
const $3570a7273781199b$var$track = (id)=>{
    /*
	 * const url =
	 * 	'https://youtubei.googleapis.com/youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8';
	 * const json_header = { 'Content-Type': 'application/json; charset=utf-8' };
	 * const json_body = `{
	 * 	"context": {
	 * 		"client": {
	 * 			"hl": "en",
	 * 			"clientName": "WEB",
	 * 			"clientVersion": "2.20210721.00.00"
	 * 		}
	 * 	},
	 * 	"videoId": "${id}"
	 * }`;
	 */ const url = `https://www.youtube.com/watch?v=${id}`;
    return(// request('POST', url, json_header, json_body, proxy)
    $1wHCb('GET', url, {
    }, null, $3570a7273781199b$var$proxy).then((response)=>response.body()
    )// .then((body) => JSON.parse(body).streamingData)
    .then((body)=>JSON.parse(body.match(/ytInitialPlayerResponse\s*=\s*{[^]+};\s*var\s*meta/)[0].replace(/;var meta/, '').replace(/ytInitialPlayerResponse = /, '')).streamingData
    ).then((streamingData)=>{
        const stream = streamingData.formats.concat(streamingData.adaptiveFormats).find((format)=>format.itag === 140
        );
        // .filter(format => [249, 250, 140, 251].includes(format.itag)) // NetaseMusic PC client do not support webm format
        // .sort((a, b) => b.bitrate - a.bitrate)[0]
        const target = $3570a7273781199b$var$parse(stream.signatureCipher);
        return stream.url || (target.sp.includes('sig') ? $3570a7273781199b$var$cs.cache('YOUTUBE_SIGNATURE', ()=>$3570a7273781199b$var$signature()
        , Date.now() + 86400000).then((sign)=>target.url + '&sig=' + sign(target.s)
        ) : target.url);
    }));
};
const $3570a7273781199b$var$check = (info)=>$3570a7273781199b$var$cs.cache(info, ()=>{
        if ($3570a7273781199b$var$key) return $3570a7273781199b$var$apiSearch(info);
        return $3570a7273781199b$var$search(info);
    }).then($3570a7273781199b$var$track)
;
module.exports = {
    check: $3570a7273781199b$var$check,
    track: $3570a7273781199b$var$track
};

});

parcelRequire.register("bRnQ3", function(module, exports) {

var $1wHCb = parcelRequire("1wHCb");

var $c3fn4 = parcelRequire("c3fn4");
var $8a2722d096500cf4$require$getManagedCacheStorage = $c3fn4.getManagedCacheStorage;
// const proxy = require('url').parse('http://127.0.0.1:1080')
const $8a2722d096500cf4$var$proxy = undefined;
const $8a2722d096500cf4$var$key = process.env.YOUTUBE_KEY || null; // YouTube Data API v3
const $8a2722d096500cf4$var$apiSearch = (info)=>{
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(info.keyword)}&type=video&key=${$8a2722d096500cf4$var$key}`;
    return $1wHCb('GET', url, {
        accept: 'application/json'
    }, null, $8a2722d096500cf4$var$proxy).then((response)=>response.json()
    ).then((jsonBody)=>{
        const matched = jsonBody.items[0];
        if (matched) return matched.id.videoId;
        else return Promise.reject();
    });
};
const $8a2722d096500cf4$var$search = (info)=>{
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(info.keyword)}`;
    return $1wHCb('GET', url, {
    }, null, $8a2722d096500cf4$var$proxy).then((response)=>response.body()
    ).then((body)=>{
        const initialData = JSON.parse(body.match(/ytInitialData\s*=\s*([^;]+);/)[1]);
        const matched = initialData.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents[0];
        if (matched) return matched.videoRenderer.videoId;
        else return Promise.reject();
    });
};
const $8a2722d096500cf4$var$track = (id)=>{
    const url = `https://www.yt-download.org/api/button/mp3/${id}`;
    const regex = /<a[^>]*href=["']([^"']*)["']/;
    return $1wHCb('GET', url, {
    }, null, $8a2722d096500cf4$var$proxy).then((response)=>response.body()
    ).then((body)=>{
        var matched = body.match(regex);
        return matched ? matched[1] : Promise.reject();
    });
};
const $8a2722d096500cf4$var$cs = $8a2722d096500cf4$require$getManagedCacheStorage('provider/yt-download');
const $8a2722d096500cf4$var$check = (info)=>$8a2722d096500cf4$var$cs.cache(info, ()=>{
        if ($8a2722d096500cf4$var$key) return $8a2722d096500cf4$var$apiSearch(info);
        return $8a2722d096500cf4$var$search(info);
    }).then($8a2722d096500cf4$var$track)
;
module.exports = {
    check: $8a2722d096500cf4$var$check,
    track: $8a2722d096500cf4$var$track
};

});

parcelRequire.register("6q0WV", function(module, exports) {

var $c3fn4 = parcelRequire("c3fn4");
var $4ac5e84e276fbae8$require$getManagedCacheStorage = $c3fn4.getManagedCacheStorage;

var $fRKJQ = parcelRequire("fRKJQ");
var $4ac5e84e276fbae8$require$logScope = $fRKJQ.logScope;

var $7rWip = parcelRequire("7rWip");

var $9SaPF = parcelRequire("9SaPF");

var $iU8Ja = parcelRequire("iU8Ja");
var $4ac5e84e276fbae8$require$spawnStdout = $iU8Ja.spawnStdout;
/**
 * The arguments to pass to youtube-dl
 *
 * ```plain
 * youtube-dl -f bestaudio --dump-json <query>
 *		-f bestaudio 	choose the best quality of the audio
 *		--dump-json		dump the information as JSON without downloading it
 * ```
 *
 * @param {string} query
 */ const $4ac5e84e276fbae8$var$dlArguments = (query)=>[
        '-f',
        '140',
        '--dump-json',
        query
    ]
;
/** @param {string} id */ const $4ac5e84e276fbae8$var$byId = (id)=>`https://www.youtube.com/watch?v=${id}`
;
/** @param {string} keyword */ const $4ac5e84e276fbae8$var$byKeyword = (keyword)=>`ytsearch1:${keyword}`
;
const $4ac5e84e276fbae8$var$logger = $4ac5e84e276fbae8$require$logScope('provider/youtube-dl');
/**
 * Checking if youtube-dl is available,
 * then execute the command and extract the ID and URL.
 *
 * @param {string[]} args
 * @returns {Promise<{id: string, url: string}>}
 */ async function $4ac5e84e276fbae8$var$getUrl(args) {
    try {
        const { stdout: stdout  } = await $4ac5e84e276fbae8$require$spawnStdout('youtube-dl', args);
        const response = JSON.parse(stdout.toString());
        if (typeof response === 'object' && typeof response.id === 'string' && typeof response.url === 'string') return response;
        throw new $7rWip(response);
    } catch (e) {
        if (e && e.code === 'ENOENT') throw new $9SaPF();
        throw e;
    }
}
const $4ac5e84e276fbae8$var$search = async (info)=>{
    const { id: id  } = await $4ac5e84e276fbae8$var$getUrl($4ac5e84e276fbae8$var$dlArguments($4ac5e84e276fbae8$var$byKeyword(info.keyword)));
    return id;
};
const $4ac5e84e276fbae8$var$track = async (id)=>{
    const { url: url  } = await $4ac5e84e276fbae8$var$getUrl($4ac5e84e276fbae8$var$dlArguments($4ac5e84e276fbae8$var$byId(id)));
    return url;
};
const $4ac5e84e276fbae8$var$cs = $4ac5e84e276fbae8$require$getManagedCacheStorage('youtube-dl');
const $4ac5e84e276fbae8$var$check = (info)=>$4ac5e84e276fbae8$var$cs.cache(info, ()=>$4ac5e84e276fbae8$var$search(info)
    ).then($4ac5e84e276fbae8$var$track).catch((e)=>{
        if (e) $4ac5e84e276fbae8$var$logger.error(e);
        throw e;
    })
;
module.exports = {
    check: $4ac5e84e276fbae8$var$check,
    track: $4ac5e84e276fbae8$var$track
};

});
parcelRequire.register("7rWip", function(module, exports) {
class $56c84659ecd066d1$var$YoutubeDlInvalidResponse extends Error {
    constructor(response){
        super(`The response of youtube-dl is malformed.`);
        this.name = 'YoutubeDlInvalidResponse';
        this.response = response;
    }
}
module.exports = $56c84659ecd066d1$var$YoutubeDlInvalidResponse;

});

parcelRequire.register("9SaPF", function(module, exports) {
class $73018f45e04d8e7e$var$YoutubeDlNotInstalled extends Error {
    constructor(){
        super(`You must install "youtube-dl" before using the "youtubedl" source.`);
        this.name = 'YoutubeDlNotInstalled';
    }
}
module.exports = $73018f45e04d8e7e$var$YoutubeDlNotInstalled;

});

parcelRequire.register("iU8Ja", function(module, exports) {


var $fRKJQ = parcelRequire("fRKJQ");
var $dc343a09d15bef29$require$logScope = $fRKJQ.logScope;

var $alHb5 = parcelRequire("alHb5");
const $dc343a09d15bef29$var$logger = $dc343a09d15bef29$require$logScope('spawn');
/**
 * @typedef {{stdout: Buffer, stderr: Buffer}} ExecutionResult
 */ /**
 * Spawn a command and get the execution result of that.
 *
 * @param {string} cmd The command. Example: `ls`
 * @param {string[]?} args The arguments list
 * @return {Promise<ExecutionResult>} The execution result (stdout and stderr) of this execution.
 * @example ```js
 * const { stdout, stderr } = await spawnStdout("ls");
 * console.log(stdout.toString());
 * ```
 */ async function $dc343a09d15bef29$var$spawnStdout(cmd, args = []) {
    return new Promise((resolve, reject)=>{
        let stdoutOffset = 0;
        let stderrOffset = 0;
        const stdout = Buffer.alloc(5000000);
        const stderr = Buffer.alloc(5000000);
        const spawn = $lEd20$child_process.spawn(cmd, args);
        spawn.on('spawn', ()=>{
            // Users should acknowledge what command is executing.
            $dc343a09d15bef29$var$logger.info(`running ${cmd} ${args.join(' ')}`);
        });
        spawn.on('error', (error)=>reject(error)
        );
        spawn.on('close', (code)=>{
            if (code !== 0) reject(new $alHb5(cmd, code));
            else {
                $dc343a09d15bef29$var$logger.debug(`process ${cmd} exited successfully`);
                resolve({
                    stdout: stdout.slice(0, stdoutOffset),
                    stderr: stderr.slice(0, stderrOffset)
                });
            }
        });
        spawn.stdout.on('data', (stdoutPart)=>{
            stdoutOffset += stdoutPart.copy(stdout, stdoutOffset);
        });
        spawn.stderr.on('data', (stderrPart)=>{
            $dc343a09d15bef29$var$logger.warn(`[${cmd}][stderr] ${stderrPart}`);
            stderrOffset += stderrPart.copy(stderr, stderrOffset);
        });
    });
}
module.exports = {
    spawnStdout: $dc343a09d15bef29$var$spawnStdout
};

});
parcelRequire.register("alHb5", function(module, exports) {
class $788d5bc1bdae046d$var$ProcessExitNotSuccessfully extends Error {
    constructor(process, exitCode){
        super(`${process} exited with ${exitCode}, which is not zero.`);
        this.process = process;
        this.exitCode = exitCode;
        this.name = 'ProcessExitNotSuccessfully';
    }
}
module.exports = $788d5bc1bdae046d$var$ProcessExitNotSuccessfully;

});



parcelRequire.register("8LdI1", function(module, exports) {

var $c3fn4 = parcelRequire("c3fn4");
var $660d58d9033ff002$require$cacheStorage = $c3fn4.cacheStorage;
var $660d58d9033ff002$require$CacheStorageGroup = $c3fn4.CacheStorageGroup;
var $660d58d9033ff002$require$getManagedCacheStorage = $c3fn4.getManagedCacheStorage;

var $4JwHE = parcelRequire("4JwHE");

var $iQRVQ = parcelRequire("iQRVQ");

var $1wHCb = parcelRequire("1wHCb");
const $660d58d9033ff002$var$format = (song)=>{
    return {
        id: song.id,
        name: song.title,
        // album: {id: song.album_id, name: song.album_title},
        artists: {
            id: song.mid,
            name: song.author
        }
    };
};
const $660d58d9033ff002$var$search = (info)=>{
    const url = "https://api.bilibili.com/audio/music-service-c/s?search_type=music&page=1&pagesize=30&" + `keyword=${encodeURIComponent(info.keyword)}`;
    return $1wHCb('GET', url).then((response)=>response.json()
    ).then((jsonBody)=>{
        const list = jsonBody.data.result.map($660d58d9033ff002$var$format);
        const matched = $iQRVQ(list, info);
        return matched ? matched.id : Promise.reject();
    });
};
const $660d58d9033ff002$var$track = (id)=>{
    const url = "https://www.bilibili.com/audio/music-service-c/web/url?rivilege=2&quality=2&sid=" + id;
    return $1wHCb('GET', url).then((response)=>response.json()
    ).then((jsonBody)=>{
        if (jsonBody.code === 0) // bilibili music requires referer, connect do not support referer, so change to http
        return jsonBody.data.cdns[0].replace('https', 'http');
        else return Promise.reject();
    }).catch(()=>$4JwHE().bilibili.track(id)
    );
};
const $660d58d9033ff002$var$cs = $660d58d9033ff002$require$getManagedCacheStorage('provider/bilibili');
const $660d58d9033ff002$var$check = (info)=>$660d58d9033ff002$var$cs.cache(info, ()=>$660d58d9033ff002$var$search(info)
    ).then($660d58d9033ff002$var$track)
;
module.exports = {
    check: $660d58d9033ff002$var$check,
    track: $660d58d9033ff002$var$track
};

});

parcelRequire.register("7mJOE", function(module, exports) {

var $iQRVQ = parcelRequire("iQRVQ");

var $1wHCb = parcelRequire("1wHCb");

var $c3fn4 = parcelRequire("c3fn4");
var $55ce2091998fbcb5$require$getManagedCacheStorage = $c3fn4.getManagedCacheStorage;
const $55ce2091998fbcb5$var$track = (info)=>{
    const url = 'http://mos9527.tooo.top/ncm/pyncm/track/GetTrackAudio?song_ids=' + info.id + '&bitrate=' + [
        '999000',
        '320000'
    ].slice($iQRVQ.ENABLE_FLAC ? 0 : 1, $iQRVQ.ENABLE_FLAC ? 1 : 2);
    return $1wHCb('GET', url).then((response)=>response.json()
    ).then((jsonBody)=>{
        if (jsonBody && typeof jsonBody === 'object' && 'code' in jsonBody && jsonBody.code !== 200) return Promise.reject();
        const matched = jsonBody.data.find((song)=>song.id === info.id
        );
        if (matched && matched.url) return matched.url;
        return Promise.reject();
    });
};
const $55ce2091998fbcb5$var$cs = $55ce2091998fbcb5$require$getManagedCacheStorage('provider/pyncmd');
const $55ce2091998fbcb5$var$check = (info)=>$55ce2091998fbcb5$var$cs.cache(info, ()=>$55ce2091998fbcb5$var$track(info)
    )
;
module.exports = {
    check: $55ce2091998fbcb5$var$check
};

});



if ($db593f7df22daf92$var$config.matchOrder) {
    const provider = Object.keys((parcelRequire("i5OdV")).PROVIDERS);
    const candidate = $db593f7df22daf92$var$config.matchOrder;
    if (candidate.some((key, index)=>index != candidate.indexOf(key)
    )) {
        console.log('Please check the duplication in match order.');
        process.exit(1);
    } else if (candidate.some((key)=>!provider.includes(key)
    )) {
        console.log('Please check the availability of match sources.');
        process.exit(1);
    }
    $parcel$global.source = candidate;
}
if ($db593f7df22daf92$var$config.token && !/\S+:\S+/.test($db593f7df22daf92$var$config.token)) {
    console.log('Please check the authentication token.');
    process.exit(1);
}

var $fRKJQ = parcelRequire("fRKJQ");
var $db593f7df22daf92$require$logScope = $fRKJQ.logScope;

var $db593f7df22daf92$require$parse = $lEd20$url.parse;
var $53dee90c5364eef4$exports = {};

var $53dee90c5364eef4$require$parse = $lEd20$url.parse;

var $7YhIx = parcelRequire("7YhIx");

var $1wHCb = parcelRequire("1wHCb");
var $419825499f248e88$exports = {};
var $213628973b93b89c$exports = {};

var $1wHCb = parcelRequire("1wHCb");

var $c3fn4 = parcelRequire("c3fn4");
var $213628973b93b89c$require$getManagedCacheStorage = $c3fn4.getManagedCacheStorage;
const $213628973b93b89c$var$filter = (object, keys)=>Object.keys(object).reduce((result, key)=>Object.assign(result, keys.includes(key) && {
            [key]: object[key]
        })
    , {
    })
;
// Object.keys(object).filter(key => !keys.includes(key)).forEach(key => delete object[key])
const $213628973b93b89c$var$limit = (text)=>{
    const output = [
        text[0]
    ];
    const length = ()=>output.reduce((sum, token)=>sum + token.length
        , 0)
    ;
    text.slice(1).some((token)=>{
        if (length() > 15) return true;
        output.push(token);
        return false;
    });
    return output;
};
const $213628973b93b89c$var$getFormatData = (data)=>{
    try {
        const info = $213628973b93b89c$var$filter(data, [
            'id',
            'name',
            'alias',
            'duration'
        ]);
        info.name = (info.name || '').replace(/（\s*cover[:：\s][^）]+）/i, '').replace(/\(\s*cover[:：\s][^)]+\)/i, '').replace(/（\s*翻自[:：\s][^）]+）/, '').replace(/\(\s*翻自[:：\s][^)]+\)/, '');
        info.album = $213628973b93b89c$var$filter(data.album, [
            'id',
            'name'
        ]);
        info.artists = data.artists.map((artist)=>$213628973b93b89c$var$filter(artist, [
                'id',
                'name'
            ])
        );
        info.keyword = info.name + ' - ' + $213628973b93b89c$var$limit(info.artists.map((artist)=>artist.name
        )).join(' / ');
        return info;
    } catch (err) {
        console.log('getFormatData err: ', err);
        return {
        };
    }
};
const $213628973b93b89c$var$find = (id, data)=>{
    if (data) {
        const info = $213628973b93b89c$var$getFormatData(data);
        return info.name ? Promise.resolve(info) : Promise.reject();
    } else {
        const url = 'https://music.163.com/api/song/detail?ids=[' + id + ']';
        return $1wHCb('GET', url).then((response)=>response.json()
        ).then((jsonBody)=>{
            if (jsonBody && jsonBody.songs && jsonBody.songs.length) {
                const info = $213628973b93b89c$var$getFormatData(jsonBody.songs[0]);
                return info.name ? info : Promise.reject();
            }
            return Promise.reject();
        });
    }
};
const $213628973b93b89c$var$cs = $213628973b93b89c$require$getManagedCacheStorage('provider/find');
$213628973b93b89c$exports = (id, data)=>{
    if (data) return $213628973b93b89c$var$find(id, data);
    else return $213628973b93b89c$var$cs.cache(id, ()=>$213628973b93b89c$var$find(id)
    );
};



var $1wHCb = parcelRequire("1wHCb");

var $i5OdV = parcelRequire("i5OdV");
var $419825499f248e88$require$providers = $i5OdV.PROVIDERS;
var $419825499f248e88$require$defaultSrc = $i5OdV.DEFAULT_SOURCE;
var $1b6ddbb9f0984b19$exports = {};
/**
 * Does the hostname of `URL` equal `host`?
 *
 * @param url {string}
 * @param host {string}
 * @return {boolean}
 */ const $1b6ddbb9f0984b19$var$isHost = (url, host)=>{
    // FIXME: Due to #118, we can only check the url
    // 		  by .includes(). You are welcome to fix
    //        it (CWE-20).
    return url.includes(host);
};
/**
 * The wrapper of `isHost()` to simplify the code.
 *
 * @param url {string}
 * @return {(host: string) => boolean}
 * @see isHost
 */ const $1b6ddbb9f0984b19$var$isHostWrapper = (url)=>(host)=>$1b6ddbb9f0984b19$var$isHost(url, host)
;
$1b6ddbb9f0984b19$exports = {
    isHost: $1b6ddbb9f0984b19$var$isHost,
    isHostWrapper: $1b6ddbb9f0984b19$var$isHostWrapper
};


var $419825499f248e88$require$isHostWrapper = $1b6ddbb9f0984b19$exports.isHostWrapper;
var $b89ad6945cbda7e7$exports = {};
class $b89ad6945cbda7e7$var$SongNotAvailable extends Error {
    /**
	 * @param {string} source
	 * @param {string?} song
	 */ constructor(source, song = '?'){
        super(`This song "${song}" is not available in ${source}`);
        this.name = 'SongNotAvailable';
    }
}
$b89ad6945cbda7e7$exports = $b89ad6945cbda7e7$var$SongNotAvailable;


var $fba81b18d6dfd7e0$exports = {};
class $fba81b18d6dfd7e0$var$RequestFailed extends Error {
    /**
	 * @param {string} url
	 * @param {number} code
	 */ constructor(url, code){
        super(`Failed to get the response. Status code: ${code}`);
        this.url = url;
        this.code = code;
        this.name = 'RequestFailed';
    }
}
$fba81b18d6dfd7e0$exports = $fba81b18d6dfd7e0$var$RequestFailed;


var $06a50bf443de0e93$exports = {};
class $06a50bf443de0e93$var$IncompleteAudioData extends Error {
    /**
	 * @param {string} details
	 */ constructor(details){
        super(`The audio data is incomplete: ${details}`);
        this.name = 'IncompleteAudioData';
    }
}
$06a50bf443de0e93$exports = $06a50bf443de0e93$var$IncompleteAudioData;



var $fRKJQ = parcelRequire("fRKJQ");
var $419825499f248e88$require$logScope = $fRKJQ.logScope;

var $fnjLh = parcelRequire("fnjLh");
const $419825499f248e88$var$logger = $419825499f248e88$require$logScope('provider/match');
/**
 * Is this http request success?
 *
 * @param {number} code The HTTP status code.
 */ const $419825499f248e88$var$isHttpResponseOk = (code)=>code >= 200 && code <= 299
;
/** @type {Map<string, string>} */ const $419825499f248e88$var$headerReferer = new Map([
    [
        'bilivideo.com',
        'https://www.bilibili.com/'
    ],
    [
        'yt-download.org',
        'https://www.yt-download.org/'
    ], 
]);
/**
 * @typedef {{ size: number, br: number | null, url: string | null, md5: string | null }} AudioData
 */ /**
 * Get the audio URL from the specified source.
 *
 * @param {string} source The source to fetch the audio URL.
 * @param {Record<string, unknown>} info The music metadata from Netease Music.
 * @return {Promise<AudioData>}
 */ async function $419825499f248e88$var$getAudioFromSource(source, info) {
    $419825499f248e88$var$logger.debug({
        source: source,
        info: info
    }, 'Getting the audio...');
    // Check if this song is available in the specified source.
    const audioData = await $419825499f248e88$require$providers[source].check(info);
    if (!audioData) throw new $b89ad6945cbda7e7$exports(source);
    // Get the url from the song data.
    const song = await $419825499f248e88$var$check(audioData);
    $419825499f248e88$var$logger.debug(song, 'The matched song is:');
    if (!song || typeof song.url !== 'string') throw new $06a50bf443de0e93$exports('song is undefined, or song.url is not a string.');
    $419825499f248e88$var$logger.debug({
        source: source,
        info: info
    }, 'The audio matched!');
    return song;
}
async function $419825499f248e88$var$match(id, source, data) {
    const candidate = (source || $parcel$global.source || $419825499f248e88$require$defaultSrc).filter((name)=>name in $419825499f248e88$require$providers
    );
    const audioInfo = await $213628973b93b89c$exports(id, data);
    const audioData = await Promise.any(candidate.map(async (source)=>$419825499f248e88$var$getAudioFromSource(source, audioInfo).catch((e)=>{
            if (e) {
                if (e instanceof $fnjLh) $419825499f248e88$var$logger.debug(e);
                else $419825499f248e88$var$logger.error(e);
            }
            throw e; // We just log it instead of resolving it.
        })
    ));
    const { id: audioId , name: name  } = audioInfo;
    const { url: url  } = audioData;
    $419825499f248e88$var$logger.debug({
        audioInfo: audioInfo,
        audioData: audioData
    }, 'The data to replace:');
    $419825499f248e88$var$logger.info({
        audioId: audioId,
        songName: name,
        url: url
    }, `Replaced: [${audioId}] ${name}`);
    return audioData;
}
/**
 * Check and get the audio info of URL.
 * @param url The URL to be fetched.
 * @return {Promise<AudioData>} The parsed audio data.
 */ async function $419825499f248e88$var$check(url) {
    const isHost = $419825499f248e88$require$isHostWrapper(url);
    const song = {
        size: 0,
        br: null,
        url: null,
        md5: null
    };
    const header = {
        range: 'bytes=0-8191',
        'accept-encoding': 'identity'
    };
    // Set the "Referer" header.
    $419825499f248e88$var$headerReferer.forEach((refererValue, urlPattern)=>{
        if (isHost(urlPattern)) header.referer = refererValue;
    });
    const response = await $1wHCb('GET', url, header);
    const { headers: /** @type {Record<string, string>} */ headers ,  } = response;
    // Check if this request success.
    if (!$419825499f248e88$var$isHttpResponseOk(response.statusCode)) throw new $fba81b18d6dfd7e0$exports(url, response.statusCode);
    // Set the URL of this song.
    song.url = response.url.href;
    // Get the bitrate of this song.
    const data = await response.body(true);
    try {
        const bitrate = $419825499f248e88$var$decode(data);
        song.br = bitrate && !isNaN(bitrate) ? bitrate * 1000 : null;
    } catch (e) {
        $419825499f248e88$var$logger.debug(e, 'Failed to decode and extract the bitrate');
    }
    // Check if "headers" existed. There are some edge cases
    // that the response has no headers, for example, the song
    // from YouTube.
    if (headers) {
        // Set the MD5 info of this song.
        if (isHost('126.net')) song.md5 = song.url.split('/').slice(-1)[0].replace(/\..*/g, '');
        if (isHost('kuwo.cn') && song.br <= 320000) song.md5 = headers['etag'].replace(/"/g, '');
        if (isHost('qq.com')) song.md5 = headers['server-md5'];
        // Set the size info of this song.
        song.size = parseInt((headers['content-range'] || '').split('/').pop() || headers['content-length']) || 0;
        // Check if the Content-Length equals 8192.
        if (!isHost('yt-download.org') && headers['content-length'] !== '8192') // I'm not sure how to describe this.
        // Seems like not important.
        return Promise.reject();
    }
    return song;
}
function $419825499f248e88$var$decode(buffer) {
    const map = {
        3: {
            3: [
                'free',
                32,
                64,
                96,
                128,
                160,
                192,
                224,
                256,
                288,
                320,
                352,
                384,
                416,
                448,
                'bad', 
            ],
            2: [
                'free',
                32,
                48,
                56,
                64,
                80,
                96,
                112,
                128,
                160,
                192,
                224,
                256,
                320,
                384,
                'bad', 
            ],
            1: [
                'free',
                32,
                40,
                48,
                56,
                64,
                80,
                96,
                112,
                128,
                160,
                192,
                224,
                256,
                320,
                'bad', 
            ]
        },
        2: {
            3: [
                'free',
                32,
                48,
                56,
                64,
                80,
                96,
                112,
                128,
                144,
                160,
                176,
                192,
                224,
                256,
                'bad', 
            ],
            2: [
                'free',
                8,
                16,
                24,
                32,
                40,
                48,
                56,
                64,
                80,
                96,
                112,
                128,
                144,
                160,
                'bad', 
            ]
        }
    };
    map[2][1] = map[2][2];
    map[0] = map[2];
    let pointer = 0;
    if (buffer.slice(0, 4).toString() === 'fLaC') return 999;
    if (buffer.slice(0, 3).toString() === 'ID3') {
        pointer = 6;
        const size = buffer.slice(pointer, pointer + 4).reduce((summation, value, index)=>summation + (value & 127) << 7 * (3 - index)
        , 0);
        pointer = 10 + size;
    }
    const header = buffer.slice(pointer, pointer + 4);
    // https://www.allegro.cc/forums/thread/591512/674023
    if (header.length === 4 && header[0] === 255 && (header[1] >> 5 & 7) === 7 && (header[1] >> 1 & 3) !== 0 && (header[2] >> 4 & 15) !== 15 && (header[2] >> 2 & 3) !== 3) {
        const version = header[1] >> 3 & 3;
        const layer = header[1] >> 1 & 3;
        const bitrate = header[2] >> 4;
        return map[version][layer][bitrate];
    }
}
$419825499f248e88$exports = $419825499f248e88$var$match;




var $53dee90c5364eef4$require$isHost = $1b6ddbb9f0984b19$exports.isHost;

var $c3fn4 = parcelRequire("c3fn4");
var $53dee90c5364eef4$require$getManagedCacheStorage = $c3fn4.getManagedCacheStorage;

var $fRKJQ = parcelRequire("fRKJQ");
var $53dee90c5364eef4$require$logScope = $fRKJQ.logScope;
const $53dee90c5364eef4$var$logger = $53dee90c5364eef4$require$logScope('hook');
const $53dee90c5364eef4$var$cs = $53dee90c5364eef4$require$getManagedCacheStorage('hook');
$53dee90c5364eef4$var$cs.aliveDuration = 604800000;
const $53dee90c5364eef4$var$ENABLE_LOCAL_VIP = (process.env.ENABLE_LOCAL_VIP || '').toLowerCase() === 'true';
const $53dee90c5364eef4$var$hook = {
    request: {
        before: ()=>{
        },
        after: ()=>{
        }
    },
    connect: {
        before: ()=>{
        }
    },
    negotiate: {
        before: ()=>{
        }
    },
    target: {
        host: new Set(),
        path: new Set()
    }
};
$53dee90c5364eef4$var$hook.target.host = new Set([
    'music.163.com',
    'interface.music.163.com',
    'interface3.music.163.com',
    'apm.music.163.com',
    'apm3.music.163.com'
]);
$53dee90c5364eef4$var$hook.target.path = new Set([
    '/api/v3/playlist/detail',
    '/api/v3/song/detail',
    '/api/v6/playlist/detail',
    '/api/album/play',
    '/api/artist/privilege',
    '/api/album/privilege',
    '/api/v1/artist',
    '/api/v1/artist/songs',
    '/api/artist/top/song',
    '/api/v1/album',
    '/api/album/v3/detail',
    '/api/playlist/privilege',
    '/api/song/enhance/player/url',
    '/api/song/enhance/player/url/v1',
    '/api/song/enhance/download/url',
    '/api/song/enhance/privilege',
    '/batch',
    '/api/batch',
    '/api/v1/search/get',
    '/api/v1/search/song/get',
    '/api/search/complex/get',
    '/api/cloudsearch/pc',
    '/api/v1/playlist/manipulate/tracks',
    '/api/song/like',
    '/api/v1/play/record',
    '/api/playlist/v4/detail',
    '/api/v1/radio/get',
    '/api/v1/discovery/recommend/songs',
    '/api/v1/discovery/recommend/songs',
    '/api/usertool/sound/mobile/promote',
    '/api/usertool/sound/mobile/theme',
    '/api/usertool/sound/mobile/animationList',
    '/api/usertool/sound/mobile/all',
    '/api/usertool/sound/mobile/detail', 
]);
const $53dee90c5364eef4$var$domainList = [
    'music.163.com',
    'music.126.net',
    'iplay.163.com',
    'look.163.com',
    'y.163.com', 
];
$53dee90c5364eef4$var$hook.request.before = (ctx)=>{
    const { req: req  } = ctx;
    req.url = (req.url.startsWith('http://') ? '' : (req.socket.encrypted ? 'https:' : 'http:') + '//' + ($53dee90c5364eef4$var$domainList.some((domain)=>(req.headers.host || '').endsWith(domain)
    ) ? req.headers.host : null)) + req.url;
    const url = $53dee90c5364eef4$require$parse(req.url);
    if ([
        url.hostname,
        req.headers.host
    ].some((host)=>$53dee90c5364eef4$require$isHost(host, 'music.163.com')
    )) ctx.decision = 'proxy';
    if ([
        url.hostname,
        req.headers.host
    ].some((host)=>$53dee90c5364eef4$var$hook.target.host.has(host)
    ) && req.method === 'POST' && (url.path === '/api/linux/forward' || url.path.startsWith('/eapi/'))) return $1wHCb.read(req).then((body)=>req.body = body
    ).then((body)=>{
        if ('x-napm-retry' in req.headers) delete req.headers['x-napm-retry'];
        req.headers['X-Real-IP'] = '118.88.88.88';
        if (req.url.includes('stream')) return; // look living eapi can not be decrypted
        if (body) {
            let data;
            const netease = {
            };
            netease.pad = (body.match(/%0+$/) || [
                ''
            ])[0];
            netease.forward = url.path === '/api/linux/forward';
            if (netease.forward) {
                data = JSON.parse($7YhIx.linuxapi.decrypt(Buffer.from(body.slice(8, body.length - netease.pad.length), 'hex')).toString());
                netease.path = $53dee90c5364eef4$require$parse(data.url).path;
                netease.param = data.params;
            } else {
                data = $7YhIx.eapi.decrypt(Buffer.from(body.slice(7, body.length - netease.pad.length), 'hex')).toString().split('-36cd479b6b5-');
                netease.path = data[0];
                netease.param = JSON.parse(data[1]);
            }
            netease.path = netease.path.replace(/\/\d*$/, '');
            ctx.netease = netease;
            // console.log(netease.path, netease.param)
            if (netease.path === '/api/song/enhance/download/url') return $53dee90c5364eef4$var$pretendPlay(ctx);
        }
    }).catch((error)=>error && $53dee90c5364eef4$var$logger.error(error, `A error occurred in hook.request.before when hooking ${req.url}.`)
    );
    else if ($53dee90c5364eef4$var$hook.target.host.has(url.hostname) && (url.path.startsWith('/weapi/') || url.path.startsWith('/api/'))) {
        req.headers['X-Real-IP'] = '118.88.88.88';
        ctx.netease = {
            web: true,
            path: url.path.replace(/^\/weapi\//, '/api/').split('?').shift() // remove the query parameters
            .replace(/\/\d*$/, '')
        };
    } else if (req.url.includes('package')) try {
        const data = req.url.split('package/').pop().split('/');
        const url1 = $53dee90c5364eef4$require$parse($7YhIx.base64.decode(data[0]));
        const id = data[1].replace(/\.\w+/, '');
        req.url = url1.href;
        req.headers['host'] = url1.hostname;
        req.headers['cookie'] = null;
        ctx.package = {
            id: id
        };
        ctx.decision = 'proxy';
    // if (url.href.includes('google'))
    // 	return request('GET', req.url, req.headers, null, parse('http://127.0.0.1:1080'))
    // 	.then(response => (ctx.res.writeHead(response.statusCode, response.headers), response.pipe(ctx.res)))
    } catch (error) {
        ctx.error = error;
        ctx.decision = 'close';
    }
};
$53dee90c5364eef4$var$hook.request.after = (ctx)=>{
    const { req: req , proxyRes: proxyRes , netease: netease , package: pkg  } = ctx;
    if (req.headers.host === 'tyst.migu.cn' && proxyRes.headers['content-range'] && proxyRes.statusCode === 200) proxyRes.statusCode = 206;
    if (netease && $53dee90c5364eef4$var$hook.target.path.has(netease.path) && proxyRes.statusCode === 200) return $1wHCb.read(proxyRes, true).then((buffer)=>buffer.length ? proxyRes.body = buffer : Promise.reject()
    ).then((buffer)=>{
        const patch = (string)=>string.replace(/([^\\]"\s*:\s*)(\d{16,})(\s*[}|,])/g, '$1"$2L"$3')
        ; // for js precision
        try {
            netease.encrypted = false;
            netease.jsonBody = JSON.parse(patch(buffer.toString()));
        } catch (error) {
            netease.encrypted = true;
            netease.jsonBody = JSON.parse(patch($7YhIx.eapi.decrypt(buffer).toString()));
            if ($53dee90c5364eef4$var$ENABLE_LOCAL_VIP) {
                if (netease.path === '/batch' || netease.path === '/api/batch') {
                    var info = netease.jsonBody['/api/music-vip-membership/client/vip/info'];
                    if (info) {
                        const expireTime = info.data.now + 31622400000;
                        info.data.redVipLevel = 7;
                        info.data.redVipAnnualCount = 1;
                        info.data.musicPackage.expireTime = expireTime;
                        info.data.musicPackage.vipCode = 230;
                        info.data.associator.expireTime = expireTime;
                        netease.jsonBody['/api/music-vip-membership/client/vip/info'] = info;
                    }
                }
            }
        }
        if (new Set([
            401,
            512
        ]).has(netease.jsonBody.code) && !netease.web) {
            if (netease.path.includes('manipulate')) return $53dee90c5364eef4$var$tryCollect(ctx);
            else if (netease.path === '/api/song/like') return $53dee90c5364eef4$var$tryLike(ctx);
        } else if (netease.path.includes('url')) return $53dee90c5364eef4$var$tryMatch(ctx);
        else if (netease.path.includes('/usertool/sound/')) return $53dee90c5364eef4$var$unblockSoundEffects(netease.jsonBody);
        else if (netease.path.includes('batch')) {
            for(const key in netease.jsonBody)if (key.includes('/usertool/sound/')) $53dee90c5364eef4$var$unblockSoundEffects(netease.jsonBody[key]);
        }
    }).then(()=>{
        [
            'transfer-encoding',
            'content-encoding',
            'content-length'
        ].filter((key)=>key in proxyRes.headers
        ).forEach((key)=>delete proxyRes.headers[key]
        );
        const inject = (key, value)=>{
            if (typeof value === 'object' && value != null) {
                if ('fee' in value) value['fee'] = 0;
                if ('st' in value && 'pl' in value && 'dl' in value && 'subp' in value) {
                    // batch modify
                    value['st'] = 0;
                    value['subp'] = 1;
                    value['pl'] = value['pl'] === 0 ? 320000 : value['pl'];
                    value['dl'] = value['dl'] === 0 ? 320000 : value['dl'];
                }
            }
            return value;
        };
        let body = JSON.stringify(netease.jsonBody, inject);
        body = body.replace(/([^\\]"\s*:\s*)"(\d{16,})L"(\s*[}|,])/g, '$1$2$3'); // for js precision
        proxyRes.body = netease.encrypted ? $7YhIx.eapi.encrypt(Buffer.from(body)) : body;
    }).catch((error)=>error && $53dee90c5364eef4$var$logger.error(error, `A error occurred in hook.request.after when hooking ${req.url}.`)
    );
    else if (pkg) {
        if (new Set([
            201,
            301,
            302,
            303,
            307,
            308
        ]).has(proxyRes.statusCode)) return $1wHCb(req.method, $53dee90c5364eef4$require$parse(req.url).resolve(proxyRes.headers.location), req.headers).then((response)=>ctx.proxyRes = response
        );
        else if (/p\d+c*\.music\.126\.net/.test(req.url)) proxyRes.headers['content-type'] = 'audio/*';
    }
};
$53dee90c5364eef4$var$hook.connect.before = (ctx)=>{
    const { req: req  } = ctx;
    const url = $53dee90c5364eef4$require$parse('https://' + req.url);
    if ([
        url.hostname,
        req.headers.host
    ].some((host)=>$53dee90c5364eef4$var$hook.target.host.has(host)
    )) {
        if (parseInt(url.port) === 80) {
            req.url = `${$parcel$global.address || 'localhost'}:${$parcel$global.port[0]}`;
            req.local = true;
        } else if ($parcel$global.port[1]) {
            req.url = `${$parcel$global.address || 'localhost'}:${$parcel$global.port[1]}`;
            req.local = true;
        } else ctx.decision = 'blank';
    } else if (url.href.includes($parcel$global.endpoint)) ctx.decision = 'proxy';
};
$53dee90c5364eef4$var$hook.negotiate.before = (ctx)=>{
    const { req: req , socket: socket , decision: decision  } = ctx;
    const url = $53dee90c5364eef4$require$parse('https://' + req.url);
    const target = $53dee90c5364eef4$var$hook.target.host;
    if (req.local || decision) return;
    if (target.has(socket.sni) && !target.has(url.hostname)) {
        target.add(url.hostname);
        ctx.decision = 'blank';
    }
};
const $53dee90c5364eef4$var$pretendPlay = (ctx)=>{
    const { req: req , netease: netease  } = ctx;
    const turn = 'http://music.163.com/api/song/enhance/player/url';
    let query;
    if (netease.forward) {
        const { id: id , br: br  } = netease.param;
        netease.param = {
            ids: `["${id}"]`,
            br: br
        };
        query = $7YhIx.linuxapi.encryptRequest(turn, netease.param);
    } else {
        const { id: id , br: br , e_r: e_r , header: header  } = netease.param;
        netease.param = {
            ids: `["${id}"]`,
            br: br,
            e_r: e_r,
            header: header
        };
        query = $7YhIx.eapi.encryptRequest(turn, netease.param);
    }
    req.url = query.url;
    req.body = query.body + netease.pad;
};
const $53dee90c5364eef4$var$tryCollect = (ctx)=>{
    const { req: req , netease: netease  } = ctx;
    const { trackIds: trackIds , pid: pid , op: op  } = netease.param;
    const trackId = (Array.isArray(trackIds) ? trackIds : JSON.parse(trackIds))[0];
    return $1wHCb('POST', 'http://music.163.com/api/playlist/manipulate/tracks', req.headers, `trackIds=[${trackId},${trackId}]&pid=${pid}&op=${op}`).then((response)=>response.json()
    ).then((jsonBody)=>{
        netease.jsonBody = jsonBody;
    }).catch((e)=>e && $53dee90c5364eef4$var$logger.error(e)
    );
};
const $53dee90c5364eef4$var$tryLike = (ctx)=>{
    const { req: req , netease: netease  } = ctx;
    const { trackId: trackId  } = netease.param;
    let pid = 0, userId = 0;
    return $1wHCb('GET', 'http://music.163.com/api/v1/user/info', req.headers).then((response)=>response.json()
    ).then((jsonBody)=>{
        userId = jsonBody.userPoint.userId;
        return $1wHCb('GET', `http://music.163.com/api/user/playlist?uid=${userId}&limit=1`, req.headers).then((response)=>response.json()
        );
    }).then((jsonBody)=>{
        pid = jsonBody.playlist[0].id;
        return $1wHCb('POST', 'http://music.163.com/api/playlist/manipulate/tracks', req.headers, `trackIds=[${trackId},${trackId}]&pid=${pid}&op=add`).then((response)=>response.json()
        );
    }).then((jsonBody)=>{
        if (new Set([
            200,
            502
        ]).has(jsonBody.code)) netease.jsonBody = {
            code: 200,
            playlistId: pid
        };
    }).catch((e)=>e && $53dee90c5364eef4$var$logger.error(e)
    );
};
const $53dee90c5364eef4$var$computeHash = (task)=>$1wHCb('GET', task.url).then((response)=>$7YhIx.md5.pipe(response)
    )
;
const $53dee90c5364eef4$var$tryMatch = (ctx)=>{
    const { req: req , netease: netease  } = ctx;
    const { jsonBody: jsonBody  } = netease;
    /** @type {number} */ const min_br = Number(process.env.MIN_BR) || 0;
    /** @type {Promise<any>[]} */ let tasks;
    let target = 0;
    const inject = (item)=>{
        item.flag = 0;
        if ((item.code !== 200 || item.freeTrialInfo || item.br < min_br) && (target === 0 || item.id === target)) return $419825499f248e88$exports(item.id).then((song)=>{
            let os = '';
            try {
                let { header: header  } = netease.param;
                header = typeof header === 'string' ? JSON.parse(header) : header;
                const cookie = $lEd20$querystring.parse(req.headers.cookie.replace(/\s/g, ''), ';');
                os = header.os || cookie.os;
            } catch (e) {
            }
            item.type = song.br === 999000 ? 'flac' : 'mp3';
            if (os === 'pc' || os === 'uwp') item.url = $parcel$global.endpoint ? `${$parcel$global.endpoint.replace('https://', 'http://')}/package/${$7YhIx.base64.encode(song.url)}/${item.id}.${item.type}` : song.url;
            else item.url = $parcel$global.endpoint ? `${$parcel$global.endpoint}/package/${$7YhIx.base64.encode(song.url)}/${item.id}.${item.type}` : song.url;
            item.md5 = song.md5 || $7YhIx.md5.digest(song.url);
            item.br = song.br || 128000;
            item.size = song.size;
            item.code = 200;
            item.freeTrialInfo = null;
            return song;
        }).then((song)=>{
            if (!netease.path.includes('download') || song.md5) return;
            const newer = (base, target)=>{
                const difference = Array.from([
                    base,
                    target
                ]).map((version)=>version.split('.').slice(0, 3).map((number)=>parseInt(number) || 0
                    )
                ).reduce((aggregation, current)=>!aggregation.length ? current.map((element)=>[
                            element
                        ]
                    ) : aggregation.map((element, index)=>element.concat(current[index])
                    )
                , []).filter((pair)=>pair[0] !== pair[1]
                )[0];
                return !difference || difference[0] <= difference[1];
            };
            const limit = {
                android: '0.0.0',
                osx: '0.0.0'
            };
            const task = {
                key: song.url.replace(/\?.*$/, '').replace(/(?<=kugou\.com\/)\w+\/\w+\//, '').replace(/(?<=kuwo\.cn\/)\w+\/\w+\/resource\//, ''),
                url: song.url
            };
            try {
                let { header: header  } = netease.param;
                header = typeof header === 'string' ? JSON.parse(header) : header;
                const cookie = $lEd20$querystring.parse(req.headers.cookie.replace(/\s/g, ''), ';');
                const os = header.os || cookie.os, version = header.appver || cookie.appver;
                if (os in limit && newer(limit[os], version)) return $53dee90c5364eef4$var$cs.cache(task, ()=>$53dee90c5364eef4$var$computeHash(task)
                ).then((value)=>item.md5 = value
                );
            } catch (e) {
            }
        }).catch((e)=>e && $53dee90c5364eef4$var$logger.error(e)
        );
        else if (item.code === 200 && netease.web) item.url = item.url.replace(/(m\d+?)(?!c)\.music\.126\.net/, '$1c.music.126.net');
    };
    if (!Array.isArray(jsonBody.data)) tasks = [
        inject(jsonBody.data)
    ];
    else if (netease.path.includes('download')) {
        jsonBody.data = jsonBody.data[0];
        tasks = [
            inject(jsonBody.data)
        ];
    } else {
        target = netease.web ? 0 : parseInt(((Array.isArray(netease.param.ids) ? netease.param.ids : JSON.parse(netease.param.ids))[0] || 0).toString().replace('_0', '')); // reduce time cost
        tasks = jsonBody.data.map((item)=>inject(item)
        );
    }
    return Promise.all(tasks).catch((e)=>e && $53dee90c5364eef4$var$logger.error(e)
    );
};
const $53dee90c5364eef4$var$unblockSoundEffects = (obj)=>{
    $53dee90c5364eef4$var$logger.debug('unblockSoundEffects() has been triggered.');
    const { data: data , code: code  } = obj;
    if (code === 200) {
        if (Array.isArray(data)) data.map((item)=>{
            if (item.type) item.type = 1;
        });
        else if (data.type) data.type = 1;
    }
};
$53dee90c5364eef4$exports = $53dee90c5364eef4$var$hook;


var $a93edf4f4f6e0a36$exports = {};




var $a93edf4f4f6e0a36$require$parse = $lEd20$url.parse;

var $fRKJQ = parcelRequire("fRKJQ");
var $a93edf4f4f6e0a36$require$logScope = $fRKJQ.logScope;
const $a93edf4f4f6e0a36$var$logger = $a93edf4f4f6e0a36$require$logScope('server');
var $9abc868f61f583c2$exports = {};
// Thanks to https://github.com/buschtoens/sni
$9abc868f61f583c2$exports = (data)=>{
    let end = data.length;
    let pointer = 43;
    const nan = (number = pointer)=>isNaN(number)
    ;
    if (pointer + 1 > end || nan()) return null;
    pointer += 1 + data[pointer];
    if (pointer + 2 > end || nan()) return null;
    pointer += 2 + data.readInt16BE(pointer);
    if (pointer + 1 > end || nan()) return null;
    pointer += 1 + data[pointer];
    if (pointer + 2 > end || nan()) return null;
    const extensionsLength = data.readInt16BE(pointer);
    pointer += 2;
    const extensionsEnd = pointer + extensionsLength;
    if (extensionsEnd > end || nan(extensionsEnd)) return null;
    end = extensionsEnd;
    while(pointer + 4 <= end || nan()){
        const extensionType = data.readInt16BE(pointer);
        const extensionSize = data.readInt16BE(pointer + 2);
        pointer += 4;
        if (extensionType !== 0) {
            pointer += extensionSize;
            continue;
        }
        if (pointer + 2 > end || nan()) return null;
        const nameListLength = data.readInt16BE(pointer);
        pointer += 2;
        if (pointer + nameListLength > end) return null;
        while(pointer + 3 <= end || nan()){
            const nameType = data[pointer];
            const nameLength = data.readInt16BE(pointer + 1);
            pointer += 3;
            if (nameType !== 0) {
                pointer += nameLength;
                continue;
            }
            if (pointer + nameLength > end || nan()) return null;
            return data.toString('ascii', pointer, pointer + nameLength);
        }
    }
    return null;
};




var $1wHCb = parcelRequire("1wHCb");

var $a93edf4f4f6e0a36$require$isHost = $1b6ddbb9f0984b19$exports.isHost;
const $a93edf4f4f6e0a36$var$proxy = {
    core: {
        mitm: (req, res)=>{
            if (req.url === '/proxy.pac') {
                const url = $a93edf4f4f6e0a36$require$parse('http://' + req.headers.host);
                res.writeHead(200, {
                    'Content-Type': 'application/x-ns-proxy-autoconfig'
                });
                res.end(`
					function FindProxyForURL(url, host) {
						if (${Array.from($53dee90c5364eef4$exports.target.host).map((host)=>`host == '${host}'`
                ).join(' || ')}) {
							return 'PROXY ${url.hostname}:${url.port || 80}'
						}
						return 'DIRECT'
					}
				`);
            } else {
                const ctx = {
                    res: res,
                    req: req
                };
                Promise.resolve().then(()=>$a93edf4f4f6e0a36$var$proxy.protect(ctx)
                ).then(()=>$a93edf4f4f6e0a36$var$proxy.authenticate(ctx)
                ).then(()=>$53dee90c5364eef4$exports.request.before(ctx)
                ).then(()=>$a93edf4f4f6e0a36$var$proxy.filter(ctx)
                ).then(()=>$a93edf4f4f6e0a36$var$proxy.log(ctx)
                ).then(()=>$a93edf4f4f6e0a36$var$proxy.mitm.request(ctx)
                ).then(()=>$53dee90c5364eef4$exports.request.after(ctx)
                ).then(()=>$a93edf4f4f6e0a36$var$proxy.mitm.response(ctx)
                ).catch(()=>$a93edf4f4f6e0a36$var$proxy.mitm.close(ctx)
                );
            }
        },
        tunnel: (req, socket, head)=>{
            const ctx = {
                req: req,
                socket: socket,
                head: head
            };
            Promise.resolve().then(()=>$a93edf4f4f6e0a36$var$proxy.protect(ctx)
            ).then(()=>$a93edf4f4f6e0a36$var$proxy.authenticate(ctx)
            ).then(()=>$53dee90c5364eef4$exports.connect.before(ctx)
            ).then(()=>$a93edf4f4f6e0a36$var$proxy.filter(ctx)
            ).then(()=>$a93edf4f4f6e0a36$var$proxy.log(ctx)
            ).then(()=>$a93edf4f4f6e0a36$var$proxy.tunnel.connect(ctx)
            ).then(()=>$a93edf4f4f6e0a36$var$proxy.tunnel.dock(ctx)
            ).then(()=>$53dee90c5364eef4$exports.negotiate.before(ctx)
            ).then(()=>$a93edf4f4f6e0a36$var$proxy.tunnel.pipe(ctx)
            ).catch(()=>$a93edf4f4f6e0a36$var$proxy.tunnel.close(ctx)
            );
        }
    },
    abort: (socket)=>{
        if (socket) socket.end();
        if (socket && !socket.destroyed) socket.destroy();
    },
    protect: (ctx)=>{
        const { req: req , res: res , socket: socket  } = ctx;
        if (req) req.on('error', ()=>$a93edf4f4f6e0a36$var$proxy.abort(req.socket, 'req')
        );
        if (res) res.on('error', ()=>$a93edf4f4f6e0a36$var$proxy.abort(res.socket, 'res')
        );
        if (socket) socket.on('error', ()=>$a93edf4f4f6e0a36$var$proxy.abort(socket, 'socket')
        );
    },
    log: (ctx)=>{
        const { req: req , socket: socket , decision: decision  } = ctx;
        if (socket) {
            if (socket) $a93edf4f4f6e0a36$var$logger.debug({
                decision: decision,
                url: req.url
            }, `TUNNEL`);
            else $a93edf4f4f6e0a36$var$logger.debug({
                decision: decision,
                host: $a93edf4f4f6e0a36$require$parse(req.url).host,
                encrypted: req.socket.encrypted
            }, `MITM${req.socket.encrypted ? ' (ssl)' : ''}`);
        }
    },
    authenticate: (ctx)=>{
        const { req: req , res: res , socket: socket  } = ctx;
        const credential = Buffer.from((req.headers['proxy-authorization'] || '').split(/\s+/).pop() || '', 'base64').toString();
        if ('proxy-authorization' in req.headers) delete req.headers['proxy-authorization'];
        if ($a93edf4f4f6e0a36$var$server.authentication && credential !== $a93edf4f4f6e0a36$var$server.authentication && (socket || req.url.startsWith('http://'))) {
            if (socket) socket.write('HTTP/1.1 407 Proxy Auth Required\r\nProxy-Authenticate: Basic realm="realm"\r\n\r\n');
            else res.writeHead(407, {
                'proxy-authenticate': 'Basic realm="realm"'
            });
            return Promise.reject(ctx.error = 'authenticate');
        }
    },
    filter: (ctx)=>{
        if (ctx.decision || ctx.req.local) return;
        const url = $a93edf4f4f6e0a36$require$parse((ctx.socket ? 'https://' : '') + ctx.req.url);
        const match = (pattern)=>url.href.search(new RegExp(pattern, 'g')) !== -1
        ;
        try {
            const allow = $a93edf4f4f6e0a36$var$server.whitelist.some(match);
            const deny = $a93edf4f4f6e0a36$var$server.blacklist.some(match);
            // console.log('allow', allow, 'deny', deny)
            if (!allow && deny) return Promise.reject(ctx.error = 'filter');
        } catch (error) {
            ctx.error = error;
        }
    },
    mitm: {
        request: (ctx)=>new Promise((resolve, reject)=>{
                if (ctx.decision === 'close') return reject(ctx.error = ctx.decision);
                const { req: req  } = ctx;
                if ($a93edf4f4f6e0a36$require$isHost(req.url, 'bilivideo.com')) {
                    req.headers['referer'] = 'https://www.bilibili.com/';
                    req.headers['user-agent'] = 'okhttp/3.4.1';
                }
                if ($a93edf4f4f6e0a36$require$isHost(req.url, 'yt-download.org')) req.headers['referer'] = 'https://www.yt-download.org/';
                const url = $a93edf4f4f6e0a36$require$parse(req.url);
                const options = $1wHCb.configure(req.method, url, req.headers);
                ctx.proxyReq = $1wHCb.create(url)(options).on('response', (proxyRes)=>resolve(ctx.proxyRes = proxyRes)
                ).on('error', (error)=>reject(ctx.error = error)
                );
                req.readable ? req.pipe(ctx.proxyReq) : ctx.proxyReq.end(req.body);
            })
        ,
        response: (ctx)=>{
            const { res: res , proxyRes: proxyRes  } = ctx;
            proxyRes.on('error', ()=>$a93edf4f4f6e0a36$var$proxy.abort(proxyRes.socket, 'proxyRes')
            );
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            proxyRes.readable ? proxyRes.pipe(res) : res.end(proxyRes.body);
        },
        close: (ctx)=>{
            $a93edf4f4f6e0a36$var$proxy.abort(ctx.res.socket, 'mitm');
        }
    },
    tunnel: {
        connect: (ctx)=>new Promise((resolve, reject)=>{
                if (ctx.decision === 'close') return reject(ctx.error = ctx.decision);
                const { req: req  } = ctx;
                const url = $a93edf4f4f6e0a36$require$parse('https://' + req.url);
                if ($parcel$global.proxy && !req.local) {
                    const options = $1wHCb.configure(req.method, url, req.headers);
                    $1wHCb.create($a93edf4f4f6e0a36$var$proxy)(options).on('connect', (_, proxySocket)=>resolve(ctx.proxySocket = proxySocket)
                    ).on('error', (error)=>reject(ctx.error = error)
                    ).end();
                } else {
                    const proxySocket = $lEd20$net.connect(url.port || 443, $1wHCb.translate(url.hostname)).on('connect', ()=>resolve(ctx.proxySocket = proxySocket)
                    ).on('error', (error)=>reject(ctx.error = error)
                    );
                }
            })
        ,
        dock: (ctx)=>new Promise((resolve)=>{
                const { req: req , head: head , socket: socket  } = ctx;
                socket.once('data', (data)=>resolve(ctx.head = Buffer.concat([
                        head,
                        data
                    ]))
                ).write(`HTTP/${req.httpVersion} 200 Connection established\r\n\r\n`);
            }).then((data)=>ctx.socket.sni = $9abc868f61f583c2$exports(data)
            ).catch((e)=>e && $a93edf4f4f6e0a36$var$logger.error(e)
            )
        ,
        pipe: (ctx)=>{
            if (ctx.decision === 'blank') return Promise.reject(ctx.error = ctx.decision);
            const { head: head , socket: socket , proxySocket: proxySocket  } = ctx;
            proxySocket.on('error', ()=>$a93edf4f4f6e0a36$var$proxy.abort(ctx.proxySocket, 'proxySocket')
            );
            proxySocket.write(head);
            socket.pipe(proxySocket);
            proxySocket.pipe(socket);
        },
        close: (ctx)=>{
            $a93edf4f4f6e0a36$var$proxy.abort(ctx.socket, 'tunnel');
        }
    }
};
const $a93edf4f4f6e0a36$var$cert = process.env.SIGN_CERT || $lEd20$path.join(__dirname, '..', 'server.crt');
const $a93edf4f4f6e0a36$var$key = process.env.SIGN_KEY || $lEd20$path.join(__dirname, '..', 'server.key');
const $a93edf4f4f6e0a36$var$options = {
    key: $lEd20$fs.readFileSync($a93edf4f4f6e0a36$var$key),
    cert: $lEd20$fs.readFileSync($a93edf4f4f6e0a36$var$cert)
};


const $a93edf4f4f6e0a36$var$server = {
    http: $lEd20$http.createServer().on('request', $a93edf4f4f6e0a36$var$proxy.core.mitm).on('connect', $a93edf4f4f6e0a36$var$proxy.core.tunnel),
    https: $lEd20$https.createServer($a93edf4f4f6e0a36$var$options).on('request', $a93edf4f4f6e0a36$var$proxy.core.mitm).on('connect', $a93edf4f4f6e0a36$var$proxy.core.tunnel)
};
$a93edf4f4f6e0a36$var$server.whitelist = [];
$a93edf4f4f6e0a36$var$server.blacklist = [
    '://127\\.\\d+\\.\\d+\\.\\d+',
    '://localhost'
];
$a93edf4f4f6e0a36$var$server.authentication = null;
$a93edf4f4f6e0a36$exports = $a93edf4f4f6e0a36$var$server;



var $c3fn4 = parcelRequire("c3fn4");
var $db593f7df22daf92$require$CacheStorageGroup = $c3fn4.CacheStorageGroup;
const $db593f7df22daf92$var$logger = $db593f7df22daf92$require$logScope('app');
const $db593f7df22daf92$var$random = (array)=>array[Math.floor(Math.random() * array.length)]
;
const $db593f7df22daf92$var$target = Array.from($53dee90c5364eef4$exports.target.host);
$parcel$global.port = $db593f7df22daf92$var$config.port;
$parcel$global.proxy = $db593f7df22daf92$var$config.proxyUrl ? $db593f7df22daf92$require$parse($db593f7df22daf92$var$config.proxyUrl) : null;
$parcel$global.hosts = $db593f7df22daf92$var$target.reduce((result, host)=>Object.assign(result, {
        [host]: $db593f7df22daf92$var$config.forceHost
    })
, {
});
$a93edf4f4f6e0a36$exports.whitelist = [
    '://[\\w.]*music\\.126\\.net',
    '://[\\w.]*vod\\.126\\.net'
];
if ($db593f7df22daf92$var$config.strict) $a93edf4f4f6e0a36$exports.blacklist.push('.*');
$a93edf4f4f6e0a36$exports.authentication = $db593f7df22daf92$var$config.token || null;
$parcel$global.endpoint = $db593f7df22daf92$var$config.endpoint;
if ($db593f7df22daf92$var$config.endpoint) $a93edf4f4f6e0a36$exports.whitelist.push(escape($db593f7df22daf92$var$config.endpoint));

// hosts['music.httpdns.c.163.com'] = random(['59.111.181.35', '59.111.181.38'])
// hosts['httpdns.n.netease.com'] = random(['59.111.179.213', '59.111.179.214'])
const $db593f7df22daf92$var$dns = (host)=>new Promise((resolve, reject)=>$lEd20$dns.lookup(host, {
            all: true
        }, (error, records)=>error ? reject(error) : resolve(records.map((record)=>record.address
            ))
        )
    )
;

const $db593f7df22daf92$var$httpdns = (host)=>(parcelRequire("1wHCb"))('POST', 'http://music.httpdns.c.163.com/d', {
    }, host).then((response)=>response.json()
    ).then((jsonBody)=>jsonBody.dns.reduce((result, domain)=>result.concat(domain.ips)
        , [])
    )
;

const $db593f7df22daf92$var$httpdns2 = (host)=>(parcelRequire("1wHCb"))('GET', 'http://httpdns.n.netease.com/httpdns/v2/d?domain=' + host).then((response)=>response.json()
    ).then((jsonBody)=>Object.keys(jsonBody.data).map((key)=>jsonBody.data[key]
        ).reduce((result, value)=>result.concat(value.ip || [])
        , [])
    )
;
// Allow enabling HTTPDNS queries with `ENABLE_HTTPDNS=true`
// It seems broken - BETTER TO NOT ENABLE IT!
const $db593f7df22daf92$var$dnsSource = process.env.ENABLE_HTTPDNS === 'true' ? [
    $db593f7df22daf92$var$httpdns,
    $db593f7df22daf92$var$httpdns2
] : [];
// Start the "Clean Cache" background task.
const $db593f7df22daf92$var$csgInstance = $db593f7df22daf92$require$CacheStorageGroup.getInstance();
setInterval(()=>{
    $db593f7df22daf92$var$csgInstance.cleanup();
}, 900000);
Promise.all($db593f7df22daf92$var$dnsSource.map((query)=>query($db593f7df22daf92$var$target.join(','))
).concat($db593f7df22daf92$var$target.map($db593f7df22daf92$var$dns))).then((result)=>{
    const { host: host  } = $53dee90c5364eef4$exports.target;
    result.forEach((array)=>array.forEach(host.add, host)
    );
    $a93edf4f4f6e0a36$exports.whitelist = $a93edf4f4f6e0a36$exports.whitelist.concat(Array.from(host).map(escape));
    const log = (type)=>$db593f7df22daf92$var$logger.info(`${[
            'HTTP',
            'HTTPS'
        ][type]} Server running @ http://${address || '0.0.0.0'}:${port[type]}`)
    ;
    if (port[0]) $a93edf4f4f6e0a36$exports.http.listen(port[0], address).once('listening', ()=>log(0)
    );
    if (port[1]) $a93edf4f4f6e0a36$exports.https.listen(port[1], address).once('listening', ()=>log(1)
    );
}).catch((error)=>{
    console.log(error);
    process.exit(1);
});


