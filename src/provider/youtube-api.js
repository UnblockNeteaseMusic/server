const https = require('https');
const { logScope } = require('../logger');

const logger = logScope('provider/youtube');

// YouTube API 配置
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8'; // 默认 Web 客户端密钥
const YOUTUBE_CLIENT_VERSION = '2.20260824.01.00';

// YouTube Cookies（从环境变量读取）
const YOUTUBE_COOKIES = process.env.YOUTUBE_COOKIES || '';

/**
 * 构建 YouTube API 请求头
 * @param {string} cookies - Cookie 字符串
 * @returns {Object} 请求头
 */
function buildHeaders(cookies) {
    const headers = {
        'accept': '*/*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'content-type': 'application/json',
        'origin': 'https://www.youtube.com',
        'referer': 'https://www.youtube.com/',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        'x-youtube-client-name': '1',
        'x-youtube-client-version': YOUTUBE_CLIENT_VERSION,
    };

    if (cookies) {
        headers['cookie'] = cookies;
    }

    return headers;
}

/**
 * 搜索 YouTube 视频
 * @param {string} keyword - 搜索关键词
 * @returns {Promise<string|null>} 视频 ID 或 null
 */
async function searchYouTube(keyword) {
    return new Promise((resolve, reject) => {
        const requestData = JSON.stringify({
            context: {
                client: {
                    clientName: 'WEB',
                    clientVersion: YOUTUBE_CLIENT_VERSION,
                    hl: 'zh-CN',
                    gl: 'US',
                }
            },
            query: keyword
        });

        const options = {
            hostname: 'www.youtube.com',
            port: 443,
            path: `/youtubei/v1/search?key=${YOUTUBE_API_KEY}`,
            method: 'POST',
            headers: {
                ...buildHeaders(YOUTUBE_COOKIES),
                'content-length': Buffer.byteLength(requestData)
            },
            timeout: 10000
        };

        const req = https.request(options, (res) => {
            const chunks = [];

            res.on('data', (chunk) => chunks.push(chunk));

            res.on('end', () => {
                try {
                    const data = Buffer.concat(chunks).toString();
                    const json = JSON.parse(data);

                    // 从搜索结果中提取第一个视频 ID
                    const contents = json?.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents;

                    if (contents) {
                        for (const section of contents) {
                            const items = section?.itemSectionRenderer?.contents;
                            if (items) {
                                for (const item of items) {
                                    const videoId = item?.videoRenderer?.videoId;
                                    if (videoId) {
                                        resolve(videoId);
                                        return;
                                    }
                                }
                            }
                        }
                    }

                    resolve(null);
                } catch (err) {
                    reject(err);
                } finally {
                    req.destroy();
                }
            });

            res.on('error', reject);
        });

        req.on('error', reject);
        req.on('timeout', () => {
            req.destroy();
            reject(new Error('Search timeout'));
        });

        req.write(requestData);
        req.end();
    });
}

/**
 * 获取视频的音频流 URL
 * @param {string} videoId - YouTube 视频 ID
 * @returns {Promise<Object|null>} 音频信息或 null
 */
async function getAudioStream(videoId) {
    return new Promise((resolve, reject) => {
        const requestData = JSON.stringify({
            context: {
                client: {
                    clientName: 'WEB',
                    clientVersion: YOUTUBE_CLIENT_VERSION,
                    hl: 'zh-CN',
                    gl: 'US',
                }
            },
            videoId: videoId
        });

        const options = {
            hostname: 'www.youtube.com',
            port: 443,
            path: `/youtubei/v1/player?key=${YOUTUBE_API_KEY}`,
            method: 'POST',
            headers: {
                ...buildHeaders(YOUTUBE_COOKIES),
                'content-length': Buffer.byteLength(requestData)
            },
            timeout: 15000
        };

        const req = https.request(options, (res) => {
            const chunks = [];

            res.on('data', (chunk) => chunks.push(chunk));

            res.on('end', () => {
                try {
                    const data = Buffer.concat(chunks).toString();
                    const json = JSON.parse(data);

                    // 获取音频格式
                    const formats = json?.streamingData?.adaptiveFormats;

                    if (formats) {
                        // 过滤纯音频格式
                        const audioFormats = formats.filter(f =>
                            f.mimeType && f.mimeType.startsWith('audio/')
                        );

                        if (audioFormats.length > 0) {
                            // 选择最高音质
                            const bestAudio = audioFormats.reduce((best, current) => {
                                const bestBitrate = best.bitrate || 0;
                                const currentBitrate = current.bitrate || 0;
                                return currentBitrate > bestBitrate ? current : best;
                            });

                            if (bestAudio.url) {
                                resolve({
                                    url: bestAudio.url,
                                    bitrate: bestAudio.bitrate || 128000,
                                    size: parseInt(bestAudio.contentLength) || 0
                                });
                                return;
                            }
                        }
                    }

                    resolve(null);
                } catch (err) {
                    reject(err);
                } finally {
                    req.destroy();
                }
            });

            res.on('error', reject);
        });

        req.on('error', reject);
        req.on('timeout', () => {
            req.destroy();
            reject(new Error('Player API timeout'));
        });

        req.write(requestData);
        req.end();
    });
}

/**
 * Search and get audio URL from YouTube
 * @param {Object} info - 歌曲信息
 * @param {number} info.id - 网易云歌曲 ID
 * @param {string} info.keyword - 搜索关键词
 * @returns {Promise<Object>} 音频信息对象
 */
async function check(info) {
    const { id, keyword, name } = info;

    // 记录收到的完整信息（用于调试）
    logger.debug({
        id,
        keyword,
        name,
        keywordLength: keyword ? keyword.length : 0,
        hasCookies: !!YOUTUBE_COOKIES
    }, '[YouTube] Received request');

    if (!keyword) {
        logger.debug({ id, name }, '[YouTube] No keyword provided');
        return null;
    }

    // 检查关键词是否有效
    const cleanKeyword = keyword.trim();
    if (!cleanKeyword || cleanKeyword === '?' || cleanKeyword === ' - ' || cleanKeyword.length < 2) {
        logger.info({
            id,
            keyword,
            name,
            cleanKeyword,
            reason: 'Invalid keyword - skipping YouTube search'
        }, '[YouTube] Skipping invalid keyword');
        return null;
    }

    try {
        logger.debug({ id, keyword, name }, `[YouTube] 歌名: ${name || keyword}`);

        // 搜索 YouTube 视频
        const videoId = await searchYouTube(cleanKeyword);

        if (!videoId) {
            logger.debug({ id, keyword }, '[YouTube] No video found');
            return null;
        }

        logger.debug({ id, videoId }, `[YouTube] Found video: ${videoId}`);

        // 获取音频流
        const audioStream = await getAudioStream(videoId);

        if (!audioStream || !audioStream.url) {
            logger.debug({ id, videoId }, '[YouTube] No audio stream available');
            return null;
        }

        const audioUrl = audioStream.url;
        const bitrate = audioStream.bitrate;

        logger.debug({ id, bitrate }, `[YouTube] YouTube音源连接 (${Math.floor(bitrate / 1000)}kbps)`);

        // 返回完整音频信息
        return {
            id: id.toString(),
            url: audioUrl,
            br: bitrate,
            size: audioStream.size,
            md5: null
        };
    } catch (error) {
        logger.error({ id, name, error: error.message }, '[YouTube] Failed to get audio');
        return null;
    }
}

module.exports = { check };
