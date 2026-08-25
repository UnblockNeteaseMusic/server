const https = require('https');
const url = require('url');
const { logScope } = require('../logger');

const logger = logScope('provider/tmetu');

/**
 * Search and get audio URL from Tmetu API
 * @param {Object} info - 歌曲信息
 * @param {number} info.id - 网易云歌曲 ID
 * @param {string} info.keyword - 搜索关键词
 * @returns {Promise<Object>} 音频信息对象
 */
async function check(info) {
    const { id, keyword, name } = info;

    if (!keyword) {
        logger.debug({ id, name }, '[Tmetu] No keyword provided');
        return null;
    }

    try {
        // 构建搜索 URL
        const searchUrl = `https://music.tmetu.cn/api/?miss=searchAll&keywords=${encodeURIComponent(keyword)}&pageNum=1&pageSize=200&level=standard&withLyric=false`;

        logger.debug({ id, keyword, name }, `[Tmetu] 歌名: ${name || keyword}`);

        // 使用 Node.js 原生 https 模块发送请求
        const songs = await new Promise((resolve, reject) => {
            const parsedUrl = url.parse(searchUrl);

            const req = https.request({
                hostname: parsedUrl.hostname,
                port: parsedUrl.port || 443,
                path: parsedUrl.path,
                method: 'GET',
                headers: {
                    'accept': 'application/json, text/plain, */*',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                timeout: 5000
            }, (res) => {
                const chunks = [];

                res.on('data', (chunk) => chunks.push(chunk));

                res.on('end', () => {
                    try {
                        const data = Buffer.concat(chunks).toString();
                        const json = JSON.parse(data);
                        req.destroy();
                        resolve(json);
                    } catch (err) {
                        req.destroy();
                        reject(err);
                    }
                });

                res.on('error', (err) => {
                    req.destroy();
                    reject(err);
                });
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

        // 解析响应
        if (!songs || songs.status !== 'success' || !songs.data || !songs.data.songs) {
            logger.debug({ id, keyword }, '[Tmetu] Invalid API response');
            return null;
        }

        const songList = songs.data.songs;
        if (songList.length === 0) {
            logger.debug({ id, keyword }, '[Tmetu] No songs found');
            return null;
        }

        // 选择第一首歌曲（API 已经按相关性排序）
        const song = songList[0];
        const audioUrl = song.audioUrl;

        if (!audioUrl || typeof audioUrl !== 'string') {
            logger.debug({ id, keyword }, '[Tmetu] No audio URL in song');
            return null;
        }

        logger.debug({ id, url: audioUrl }, `[Tmetu] Tmetu音源连接: ${audioUrl}`);

        // 返回完整音频信息
        return {
            id: song.id ? song.id.toString() : id.toString(),
            url: audioUrl,
            br: 128000,
            size: 0,
            md5: null
        };
    } catch (error) {
        logger.error({ id, name, error: error.message }, '[Tmetu] API request failed');
        return null;
    }
}

module.exports = { check };