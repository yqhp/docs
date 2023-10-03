# 移动端屏幕录制

## 下载 ffmpeg 并添加到 PATH

官方下载地址 https://ffmpeg.org/download.html [Get packages & executable files]，将 ffmpeg 可执行文件所在目录添加到 `PATH`

```bash
# 验证ffmpeg
$ ffmpeg -version
ffmpeg version 6.0-tessus  https://evermeet.cx/ffmpeg/  Copyright (c) 2000-2023 the FFmpeg developers
```

## 屏幕录制 api

推荐在[任务执行监听](/guide/task-execution-listener)中录制屏幕

```java
// 开启录屏
// android https://github.com/appium/appium-android-driver/blob/master/lib/commands/types.ts StartScreenRecordingOpts
// iOS https://github.com/appium/appium-xcuitest-driver/blob/master/lib/commands/types.ts StartRecordingScreenOptions
device.startRecordingScreen(Map.of(
    // "videoSize", "1920x1080", // android: height x width
    "bitRate", 1000000, // android: 1 Mbit/s
    "videoType", "libx264",// iOS: ffmpeg -vcodec
    "videoQuality", "low", // iOS: 'low' | 'medium' | 'high' | 'photo', mjpegServerScreenshotQuality: 10 | 25 | 75 | 100
    "videoFps", 5, // iOS: mjpegServerFramerate
    "forceRestart", true,
    "timeLimit", 1800 // 单位:second, appium限制录屏最长30分钟
));

// 停止录屏, 得到录屏文件
File videoFile = device.stopRecordingScreen();
// 将录屏文件添加到日志。该方法会上传videoFile到文件服务，并删除本地videoFile
log.video(videoFile);
```
