# YouTube 音源实现说明

## 当前状态

YouTube 音源已添加到项目中，但由于 YouTube 的严格反爬虫机制，直接提取音频 URL 面临技术挑战。

## 技术难点

1. **YouTube 的防护机制**
   - YouTube 频繁更改其页面结构和 API
   - 音频流 URL 需要动态签名，有时效性（几小时后过期）
   - 大多数第三方库和 API 服务不稳定

2. **尝试过的方案**
   - `ytdl-core` / `@distube/ytdl-core` - 无法找到可播放格式
   - `ytsr` - 已废弃，解析错误
   - `play-dl` - 可以搜索但无法获取直接音频 URL
   - Invidious API - 公共实例不稳定
   - YouTube get_video_info API - 已不再返回流信息

## 推荐的解决方案

### 方案 1：使用 yt-dlp（推荐）

安装系统级 yt-dlp：
\`\`\`bash
# Windows (使用 scoop)
scoop install yt-dlp

# 或下载 exe 文件到项目目录
# https://github.com/yt-dlp/yt-dlp/releases
\`\`\`

然后修改 `src/provider/youtube.js` 使用子进程调用 yt-dlp：
\`\`\`javascript
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function getAudioStream(videoId) {
    try {
        const { stdout } = await execPromise(
            \`yt-dlp -f "ba" -g --no-playlist "https://www.youtube.com/watch?v=${videoId}"\`
        );
        return { url: stdout.trim() };
    } catch (error) {
        return null;
    }
}
\`\`\`

### 方案 2：仅作为备用音源

由于 YouTube 提取的不稳定性，建议：
- 将 YouTube 放在音源列表的最后
- 主要依赖 meting 和 tmetu 等更稳定的音源
- YouTube 仅作为其他音源都失败时的最后尝试

修改 `src/consts.js`：
\`\`\`javascript
const DEFAULT_SOURCE = ['meting', 'tmetu', 'youtube'];  // YouTube 在最后
\`\`\`

### 方案 3：暂时禁用

如果遇到问题，可以先禁用 YouTube 音源：
\`\`\`javascript
const DEFAULT_SOURCE = ['meting', 'tmetu'];  // 移除 youtube
\`\`\`

## 当前实现

当前代码实现了：
- ✅ YouTube 视频搜索（通过解析搜索结果页面）
- ❌ 音频流 URL 提取（由于 YouTube 限制而失败）

## 后续改进

如果要完善 YouTube 支持，需要：
1. 集成 yt-dlp 作为外部依赖
2. 实现音频 URL 缓存机制（因为 URL 有时效性）
3. 添加重试和降级机制
4. 考虑使用 YouTube Data API（需要 API 密钥）

## 使用说明

目前 YouTube 音源已在配置中，但可能无法正常工作。建议：
- 优先使用其他音源
- 如需 YouTube 支持，请按方案 1 安装 yt-dlp
- 或暂时从配置中移除 YouTube
