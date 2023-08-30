# 插件

## 上传插件

> `系统管理/插件管理`，以 `yqhp-appium` 插件为例

1. 下载 yqhp-appium（见[插件列表](#插件列表)）
2. 新建插件 -> 名称: yqhp-appium -> 保存
3. 上传下载好的插件文件

## 启用插件

`系统管理/项目管理`进行插件设置，不同项目可以启用不同插件

## 插件列表

| 渠道 | 插件         | 说明                                                | 下载地址                                                                                                                                                                     | 说明                  |
| ---- | ------------ | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| yqhp | yqhp-appium  | 包装 AppiumDriver/RemoteWebDriver，提供更简易的 api | [appium-plugin-0.0.6.jar](http://139.9.5.56:9000/yqhp-res/appium-plugin-0.0.6.jar)                                                                                           | [查看](#yqhp-appium)  |
| yqhp | yqhp-easyimg | 图片识别 api                                        | [easyimg-plugin-0.0.5.jar](http://139.9.5.56:9000/yqhp-res/easyimg-plugin-0.0.5.jar) <br> [common-opencv-0.0.2.jar](http://139.9.5.56:9000/yqhp-res/common-opencv-0.0.2.jar) | [查看](#yqhp-easyimg) |

## yqhp-appium

### 初始化

1.  方式 1

    ```java
    import com.yqhp.plugin.appium.*;

    var d = new AppiumDriverWrapper(device.appiumDriver());
    ```

2.  方式 2（推荐）

    > 扩展 AppiumDriverWrapper，根据团队需要，提供更多 API

    ```java
    import com.yqhp.plugin.appium.*;

    class CustomAppiumDriver extends AppiumDriverWrapper {

        CustomAppiumDriver() {
            super(device.appiumDriver());
        }

        void pressAndroidKey(AndroidKey key) {
            androidDriver().pressKey(new KeyEvent(key));
        }

        void pressHome() {
            if (isAndroid()) {
                pressAndroidKey(AndroidKey.HOME);
            } else {
                driver.executeScript("mobile: pressButton", Map.of("name", "home"));
            }
        }

        void pressBack() {
            pressAndroidKey(AndroidKey.BACK);
        }

        /**
        * 启动app
        *
        * @param appId android: package name | ios: bundle id
        */
        void startApp(String appId) {
            ((InteractsWithApps) driver).activateApp(appId);
        }

        /**
        * 停止app
        *
        * @param appId android: package name | ios: bundle id
        */
        boolean stopApp(String appId) {
            return ((InteractsWithApps) driver).terminateApp(appId);
        }

        /**
        * 安装app
        *
        * @param appUri app url or filePath
        */
        void installApp(String appUri) {
            device.installApp(appUri);
        }

        /**
        * app是否已安装
        *
        * @param appId android: package name | ios: bundle id
        */
        boolean isAppInstalled(String appId) {
            return ((InteractsWithApps) driver).isAppInstalled(appId);
        }

        /**
        * 卸载app
        *
        * @param appId android: package name | ios: bundle id
        */
        boolean uninstallApp(String appId) {
            return ((InteractsWithApps) driver).removeApp(appId);
        }

        /**
        * 清除apk数据, 相当于重新安装了app
        *
        * @param pkg package name
        */
        void clearApkData(String pkg) {
            device.androidShell("pm clear " + pkg);
        }
    }

    var d = new CustomAppiumDriver();
    ```

### API

[AppiumDriverWrapper](https://github.com/yqhp/yqhp/blob/main/agent/plugins/appium/src/main/java/com/yqhp/plugin/appium/AppiumDriverWrapper.java)

[RemoteWebDriverWrapper](https://github.com/yqhp/yqhp/blob/main/agent/plugins/appium/src/main/java/com/yqhp/plugin/appium/RemoteWebDriverWrapper.java)

## yqhp-easyimg

### 初始化

```java
import com.yqhp.plugin.easyimg.*;

EasyImg img = new EasyImg(device.appiumDriver());
img.setImgDir("download"); // 远程图片存放路径
```

### API

[EasyImg](https://github.com/yqhp/yqhp/blob/main/agent/plugins/easyimg/src/main/java/com/yqhp/plugin/easyimg/EasyImg.java)
