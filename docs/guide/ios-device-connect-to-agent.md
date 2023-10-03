# iOS 设备接入 agent

:::tip
在 2023-05-14 发布的 WebDriverAgent(v5.0.0)，环境要求: xcode >= 13 & iOS >= 15。如果不满足 xcode 与 iOS 要求，可以安装 v5.0.0 之前的 WebDriverAgent，[github 下载地址](https://github.com/appium/WebDriverAgent)
:::

## 安装 wda

:::tip
个人免费证书安装的 wda，只能使用 7 天。7 天后需要卸载重装
:::

1. 命令行执行 `appium driver run xcuitest open-wda` 将自动打开 xcode 与 wda
2. 安装 wda

   2.1 WebDriverAgentLib
   ![An image](/install_wda/1.png)

   2.2 WebDriverAgentRunner
   ![An image](/install_wda/2.png)
   ![An image](/install_wda/3.png)

   2.3 安装 wda 到设备中
   ![An image](/install_wda/4.png)
   ![An image](/install_wda/5.png)

3. 等待 Test 执行一段时间后，会发现设备已安装 WebDriverAgent APP，设备需信任该 APP: 设置 -> 通用 -> VPN 与设备管理 -> 开发者 APP -> 不受信任 -> 信任

## 安装 go-ios 并测试能否运行 wda

1. 安装 go-ios

   方式 1. `npm install -g go-ios`

   方式 2. [点击下载 go-ios](https://github.com/danielpaulus/go-ios/releases)，解压 zip 获得 ios or ios.exe，将 ios or ios.exe 所在路径添加到 `PATH`，以便命令行与 agent 可以调用

2. 验证 go-ios 能否运行 wda

   2.1 运行 wda

   ```sh
   # 注意: 将com.yqhp.WebDriverAgentRunner调整为你在安装wda时，填写的WebDriverAgentRunner bundle id
   $ ios runwda --bundleid=com.yqhp.WebDriverAgentRunner.xctrunner \
   --testrunnerbundleid=com.yqhp.WebDriverAgentRunner.xctrunner \
   --xctestconfig=WebDriverAgentRunner.xctest
   ```

   2.2 开一个新的终端执行 forward

   ```sh
   $ ios forward 9100 9100
   ```

   2.3 访问 `http://localhost:9100` 能看到手机投屏即可

3. 关闭步骤 2 开启的 2 个终端窗口，以免影响后续操作
