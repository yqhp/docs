# Coding 指南

## 内置变量

> 内置变量为 doc 可以直接使用的变量，如获取 appiumDriver: yqhp.appiumDriver()

| 变量名 | API                                                                                                          |
| ------ | ------------------------------------------------------------------------------------------------------------ |
| yqhp   | [查看](https://github.com/yqhp/yqhp/blob/main/agent/agent-web/src/main/java/com/yqhp/agent/jshell/YQHP.java) |

## 初始化

:::tip
调试会话建立后将自动完成以下动作

1. 自动加载当前项目配置的`plugin`
2. 自动执行类型为`初始化`且状态`可用`的`doc`

:::

1. 新建`init`目录
2. 在`init`目录下新建以下 doc（类型为`初始化`, 状态为`发布`）

   doc: `java 导入`

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

   doc: `appium导入`

   ```java
   import org.openqa.selenium.*;
   import org.openqa.selenium.remote.*;
   import org.openqa.selenium.support.PageFactory;
   import org.openqa.selenium.interactions.*;
   import io.appium.java_client.*;
   import io.appium.java_client.remote.*;
   import io.appium.java_client.pagefactory.*;
   import io.appium.java_client.android.*;
   import io.appium.java_client.android.nativekey.*;
   ```

   doc: `断言导入`

   ```java
   import org.junit.jupiter.api.Assertions;
   import static org.junit.jupiter.api.Assertions.*;
   ```

3. 在`init`目录下新建初始化插件 doc（类型为`初始化`, 状态为`发布`）

[查看](/guide/plugins#插件列表)

## 代码调试

1. 选择设备调试
2. 新建一个`action` doc，输入`d.text("xxx").click();`，`F1`执行
