# Webview

<iframe src="//player.bilibili.com/player.html?aid=615059286&bvid=BV11h4y1u7UL&cid=1172358443&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

## 切换 Context 到 Webview

```java
// 获取当前有哪些Context可以切换
// 返回示例: [NATIVE_APP, WEBVIEW_io.appium.android.apis, WEBVIEW_chrome, WEBVIEW_com.android.browser]
d.androidDriver().getContextHandles();

// 切换到你想操作的webview，如: WEBVIEW_io.appium.android.apis
d.androidDriver().context("WEBVIEW_io.appium.android.apis");

// 获取当前的Context，默认为原生NATIVE_APP
d.androidDriver().getContext();

// 切换回原生
d.androidDriver().context("NATIVE_APP");
```

## Webview 调试

> 由于目前调试页面依赖 google 提供的地址，浏览器需要能访问"外网"

:::tip
由于浏览器安全限制，需要添加白名单

1. chrome 浏览器，访问 chrome://settings/content/insecureContent
2. 允许显示不安全的内容 -> 添加 -> https://chrome-devtools-frontend.appspot.com

:::

1. 设备调试页面，点击`chrome小图标`，点击`刷新`获取所有 webview
2. 选择目标页面，点击`调试`将跳转到 webview 调试页面
