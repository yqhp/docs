# Webview

<iframe src="//player.bilibili.com/player.html?aid=615059286&bvid=BV11h4y1u7UL&cid=1172358443&page=1" allowfullscreen="true" width="100%" height="400px" />

## 切换 Context 到 Webview

```java
// 获取当前有哪些Context可以切换
// 返回示例: [NATIVE_APP, WEBVIEW_io.appium.android.apis, WEBVIEW_chrome, WEBVIEW_com.android.browser]
driver.getContextHandles();

// 切换到你想操作的webview，如: WEBVIEW_io.appium.android.apis
driver.context("WEBVIEW_io.appium.android.apis");

// 获取当前的Context，默认为原生NATIVE_APP
driver.getContext();

// 切换回原生
driver.context("NATIVE_APP");
```

## Webview 调试

1. 设备调试页面，点击`chrome小图标`，点击`刷新`获取所有 webview
2. 选择目标页面，点击`调试`将跳转到 webview 调试页面
