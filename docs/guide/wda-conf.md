# iOS wda 设置

https://appium.github.io/appium-xcuitest-driver/4.30/settings/

<iframe src="//player.bilibili.com/player.html?aid=617349421&bvid=BV1n84y1o721&cid=1234959347&page=1" allowfullscreen="true" width="100%" height="400px" />

## mjpeg 视频流

```java
// wda视频流每秒截图次数 | 1~60 | 默认10
driver.setSetting("mjpegServerFramerate", 10);
// wda视频流截图缩放比 | 1~100 | 默认100
driver.setSetting("mjpegScalingFactor", 100);
// wda视频流截图质量 | 1~100 | 默认25
driver.setSetting("mjpegServerScreenshotQuality", 25);
```

## PageSource

```java
// PageSource树的最大深度，越小获取越快，默认50
driver.setSetting("snapshotMaxDepth", 50);
```

## 提升 Touch 响应速度

如点击/滑动屏幕

```java
driver.setSetting("snapshotMaxDepth", 0);
```
