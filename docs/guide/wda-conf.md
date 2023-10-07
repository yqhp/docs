# iOS wda 设置

https://appium.github.io/appium-xcuitest-driver/4.30/settings/

<iframe src="//player.bilibili.com/player.html?aid=617349421&bvid=BV1n84y1o721&cid=1234959347&page=1" allowfullscreen="true" width="100%" height="400px" />

## mjpeg 视频流

```java
// wda视频流每秒截图次数 | 1~60
driver.setSetting("mjpegServerFramerate", 10);
// wda视频流截图缩放比 | 1~100
driver.setSetting("mjpegScalingFactor", 100);
// wda视频流截图质量 | 1~100
driver.setSetting("mjpegServerScreenshotQuality", 25);
```

## PageSource

```java
// PageSource树的最大深度，越小获取越快，默认50
driver.setSetting("snapshotMaxDepth", 50);
```

## 提升 Touch 操作速度

注意: `snapshotMaxDepth: 0`可以大幅提升操作速度，但会影响自动化（如: 获取页面布局，根据 xpath 定位元素等等）

```java
driver.setSetting("snapshotMaxDepth", 0);
```
