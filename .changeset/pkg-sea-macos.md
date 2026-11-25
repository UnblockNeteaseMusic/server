---
default: minor
---

# Standalone executables embed Node.js 26 and run on macOS

The executables are built with the official Node.js 26 instead of Node.js 18, and a build for Apple silicon (`unblockneteasemusic-macos-arm64`) joins the Linux and Windows ones. Each file keeps its name and also comes as a `.tar.xz` (`.zip` on Windows) archive. The macOS file is signed ad hoc only: run `xattr -d com.apple.quarantine` on it after a browser download.
