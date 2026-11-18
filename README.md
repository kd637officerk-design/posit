# Symphony 6th

Windows 11 desktop app (Electron) built on GitHub Actions.

## Get the installer
1. Upload this folder's contents to a new GitHub repo (keep the `.github` folder).
2. Open the **Actions** tab -> "Build Symphony 6th (Windows)" -> wait for green.
3. Open the finished run -> **Artifacts** -> `Symphony-6th-Windows`.
   Inside: `Symphony-6th-Setup-1.1.1.exe` (installer, adds Desktop + Start menu shortcuts) and a portable .exe.

Windows may show SmartScreen ("More info" -> "Run anyway") since the app is unsigned.

Run locally: `npm install` then `npm start`.

## Features
- Series auto-detection (S01E05, Episode 5, "- 05"), played in numeric order with auto-next; Series and Movies tabs
- Subtitles: .srt / .vtt / .ass, auto-matched by file name or episode number, or added with the CC button
- Ambient music layer (♪) that plays under the video
- Open links (🔗): direct media plays inside the app; YouTube, Netflix, Disney+ and other sites open in Brave (falls back to your default browser if Brave is not installed)
- Line icons in menus tinted from your wallpaper

## Release
Tag a version (`git tag v1.1.1 && git push --tags`) and the installer is attached to a GitHub Release.
