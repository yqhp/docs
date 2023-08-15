# iOS wda 设置

https://appium.github.io/appium-xcuitest-driver/4.30/settings/

<iframe src="//player.bilibili.com/player.html?aid=617349421&bvid=BV1n84y1o721&cid=1234959347&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

## mjpeg 视频流

```sh
// wda视频流每秒截图次数 | 1~60 | 默认10
device.appiumDriver().setSetting("mjpegServerFramerate", 10);
// wda视频流截图缩放比 | 1~100 | 默认100
device.appiumDriver().setSetting("mjpegScalingFactor", 100);
// wda视频流截图质量 | 1~100 | 默认25
device.appiumDriver().setSetting("mjpegServerScreenshotQuality", 25);
```

## PageSource

```sh
// PageSource树的最大深度，越小获取越快，默认50
device.appiumDriver().setSetting("snapshotMaxDepth", 50);
```
