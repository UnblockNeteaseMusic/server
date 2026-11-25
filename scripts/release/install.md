## Download / 下载

| System / 系统                      | File / 文件                                         |
| ---------------------------------- | --------------------------------------------------- |
| Windows x64                        | `unblockneteasemusic-win-x64.exe` or / 或 `.zip`    |
| Windows ARM64                      | `unblockneteasemusic-win-arm64.exe` or / 或 `.zip`  |
| macOS (Apple silicon / Apple 芯片) | `unblockneteasemusic-macos-arm64` or / 或 `.tar.xz` |
| Linux x64                          | `unblockneteasemusic-linux-x64` or / 或 `.tar.xz`   |
| Linux ARM64                        | `unblockneteasemusic-linux-arm64` or / 或 `.tar.xz` |

<details>
<summary><b>English: how to run it</b></summary>

**Windows**: download the `.exe` and double-click it, or run it in a terminal. With the `.zip`, unzip it first.

**macOS**: the file is signed ad hoc only, not notarized by Apple. After a browser download, remove the quarantine flag, then run it:

```bash
chmod +x unblockneteasemusic-macos-arm64
xattr -d com.apple.quarantine unblockneteasemusic-macos-arm64
./unblockneteasemusic-macos-arm64
```

**Linux**:

```bash
chmod +x unblockneteasemusic-linux-x64
./unblockneteasemusic-linux-x64
```

With a `.tar.xz`, run `tar -xf <file>.tar.xz` first; it holds one file named `unblockneteasemusic`.

Then set the proxy and install the CA certificate of your Netease Cloud Music client as the [README](https://github.com/UnblockNeteaseMusic/server#readme) says.

</details>

<details>
<summary><b>中文：怎么运行</b></summary>

**Windows**：下载 `.exe`，双击或在终端运行即可。如果下载的是 `.zip`，请先解压。

**macOS**：文件只有临时签名（ad hoc），没有经过 Apple 公证。从浏览器下载后，请先移除隔离属性，再运行：

```bash
chmod +x unblockneteasemusic-macos-arm64
xattr -d com.apple.quarantine unblockneteasemusic-macos-arm64
./unblockneteasemusic-macos-arm64
```

**Linux**：

```bash
chmod +x unblockneteasemusic-linux-x64
./unblockneteasemusic-linux-x64
```

如果下载的是 `.tar.xz`，请先运行 `tar -xf <文件>.tar.xz`，里面只有一个名为 `unblockneteasemusic` 的文件。

之后请按照 [README](https://github.com/UnblockNeteaseMusic/server#readme) 设置代理，并安装 CA 证书。

</details>

<details>
<summary><b>Verify / 验证</b></summary>

Every file is signed with [cosign](https://github.com/sigstore/cosign), and `SHA256SUMS` lists the checksums. 每个文件都用 cosign 签名，`SHA256SUMS` 列出校验值：

```bash
cosign verify-blob unblockneteasemusic-linux-x64 \
  --bundle unblockneteasemusic-linux-x64.sigstore.json \
  --certificate-identity 'https://github.com/UnblockNeteaseMusic/server/.github/workflows/release.yml@refs/tags/{{TAG}}' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```

</details>
