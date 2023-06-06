# Coding 指南

## 内置变量

| 变量名 | API                                                                                                          |
| ------ | ------------------------------------------------------------------------------------------------------------ |
| yqhp   | [查看](https://github.com/yqhp/yqhp/blob/main/agent/agent-web/src/main/java/com/yqhp/agent/jshell/YQHP.java) |

## 初始化

1. 新建`init`目录
2. `init`目录 -> 新建`java导入`Doc（类型为`初始化`） -> 填充以下内容，并设置为`发布`状态

   ```java
   import java.io.*;
   import java.math.*;
   import java.net.*;
   import java.nio.file.*;
   import java.util.*;
   import java.util.concurrent.*;
   import java.util.function.*;
   import java.util.prefs.*;
   import java.util.regex.*;
   import java.util.stream.*;
   import java.time.*;
   ```

3. `init`目录 -> 新建 `appium导入`Doc（类型为`初始化`） -> 填充以下内容，并设置为`发布`状态

   ```java
   import org.openqa.selenium.*;
   import org.openqa.selenium.remote.*;
   import org.openqa.selenium.support.PageFactory;
   import org.openqa.selenium.interactions.*;
   import io.appium.java_client.*;
   import io.appium.java_client.pagefactory.*;
   import io.appium.java_client.android.*;
   import io.appium.java_client.android.nativekey.*;
   ```

4. `init`目录 -> 新建 `断言导入`Doc（类型为`初始化`） -> 填充以下内容，并设置为`发布`状态

   ```java
   import org.junit.jupiter.api.Assertions;
   import static org.junit.jupiter.api.Assertions.*;
   ```

5. [初始化 yqhp 官方 appium 插件] `init`目录 -> 新建 `初始化AppiumDriver`Doc（类型为`初始化`） -> 填充[内容](https://github.com/yqhp/yqhp/tree/main/agent/plugins/appium)，并设置为`发布`状态

## 代码调试

1. 选择设备调试，调试会话建立后，自动加载当前项目配置的`Plugin`，自动执行状态为`可用`的`初始化`doc（顺序从上往下）
2. 新建一个`action` doc，输入`d.text("xxx").click();`，`F1`执行
