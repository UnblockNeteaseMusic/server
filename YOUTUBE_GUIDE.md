# YouTube 音源使用说明

## ✅ 已完成

YouTube 音源已成功添加到项目中，并使用 yt-dlp 实现音频提取。

## 实现方式

- **搜索**：使用 yt-dlp 的 `ytsearch` 功能搜索 YouTube 视频
- **音频提取**：使用 yt-dlp 提取最佳音质的音频流 URL
- **依赖**：项目目录中的 `yt-dlp.exe`（已下载）

## 音源配置

当前音源顺序（在 `src/consts.js` 中）：
```javascript
const DEFAULT_SOURCE = ['meting', 'tmetu', 'youtube'];
```

系统会按顺序尝试这些音源，直到找到可用的为止。

## 特点

- ✅ 自动搜索最相关的 YouTube 视频
- ✅ 提取高音质音频流（通常 128kbps+）
- ✅ 返回 Google Video 服务器的直链
- ✅ URL 有效期通常为几小时

## 注意事项

1. **性能**：YouTube 音源比其他音源稍慢（需要调用 yt-dlp）
2. **网络**：需要能够访问 YouTube
3. **更新**：定期更新 yt-dlp.exe 以应对 YouTube 的变化
4. **顺序**：建议将 YouTube 作为备用音源（放在列表最后）

## 更新 yt-dlp

定期更新 yt-dlp 以保持兼容性：

```bash
# Windows
cd D:\Github\node\server
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe -o yt-dlp.exe
```

或从 https://github.com/yt-dlp/yt-dlp/releases 下载最新版本。

## 测试

启动服务器后，YouTube 音源会自动生效。日志中会显示：

```
[YouTube] 歌名: 歌曲名
[YouTube] Found video: 视频ID
[YouTube] YouTube音源连接 (128kbps)
```

## 故障排除

如果 YouTube 音源不工作：

1. **检查 yt-dlp**：确保 `yt-dlp.exe` 在项目根目录
2. **测试 yt-dlp**：在命令行运行 `yt-dlp.exe --version`
3. **更新 yt-dlp**：下载最新版本
4. **网络问题**：确认可以访问 YouTube
5. **查看日志**：使用 `LOG_LEVEL=debug` 启动服务器查看详细日志

## 调整音源顺序

如果想更改音源优先级，编辑 `src/consts.js`：

```javascript
// YouTube 作为首选（不推荐，较慢）
const DEFAULT_SOURCE = ['youtube', 'meting', 'tmetu'];

// YouTube 作为备用（推荐）
const DEFAULT_SOURCE = ['meting', 'tmetu', 'youtube'];

// 禁用 YouTube
const DEFAULT_SOURCE = ['meting', 'tmetu'];
```
