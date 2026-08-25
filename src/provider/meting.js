const request = require('../request');
const { logScope } = require('../logger');

const logger = logScope('provider/meting');

/**
 * Search and get audio URL from Meting API
 * @param {Object} info - 歌曲信息
 * @param {number} info.id - 网易云歌曲 ID
 * @param {string} info.keyword - 搜索关键词
 * @returns {Promise<string>} 音频 URL
 */
async function check(info) {
    const { id, keyword, name } = info;

    try {
        // 直接使用网易云 ID 获取音频 URL (API 返回 302 重定向)
        const urlApi = `https://api.qijieya.cn/meting/?server=netease&type=url&id=${id}`;

        logger.debug({ id, keyword, name }, `[Meting] 歌名: ${name || keyword}`);

        // 使用 Node.js 原生 https 模块直接请求，避开 request.js 的超时机制
        const https = require('https');
        const url = require('url');

        const parsedUrl = url.parse(urlApi);

        const finalUrl = await new Promise((resolve, reject) => {
            const req = https.request({
                hostname: parsedUrl.hostname,
                port: parsedUrl.port || 443,
                path: parsedUrl.path,
                method: 'GET',
                headers: {
                    'accept': '*/*',
                    'referer': 'https://mscdownload.pages.dev/',
                    'origin': 'https://mscdownload.pages.dev/',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'range': 'bytes=0-0'
                },
                timeout: 5000
            }, (res) => {
                // 获取重定向后的 URL（可能是多级重定向后的最终 URL）
                let resolvedUrl = urlApi;
                if (res.headers.location) {
                    resolvedUrl = res.headers.location;
                }
                // 销毁响应，避免继续下载
                res.destroy();
                req.destroy();
                resolve(resolvedUrl);
            });

            req.on('error', (err) => {
                reject(err);
            });

            req.on('timeout', () => {
                req.destroy();
                reject(new Error('Request timeout'));
            });

            req.end();
        });

        logger.debug({ id, finalUrl }, `[Meting] Meting音源连接: ${finalUrl}`);

        if (!finalUrl || !finalUrl.startsWith('http') || finalUrl === urlApi) {
            logger.debug({ id, finalUrl }, '[Meting] No valid URL found');
            return null;
        }

        // 返回包含完整音频信息的对象
        return {
            id: id.toString(),
            url: finalUrl,
            br: 128000,
            size: 0,
            md5: null
        };
    } catch (error) {
        logger.error({ id, name, error: error.message }, '[Meting] API request failed');
        return null;
    }
}

module.exports = { check };
