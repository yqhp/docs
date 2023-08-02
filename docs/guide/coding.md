# Coding 指南

## 内置变量

> 内置变量为 doc 可以直接使用的变量，如 device.appiumDriver()

| 变量名 | 说明       | API                                                                                                            |
| ------ | ---------- | -------------------------------------------------------------------------------------------------------------- |
| device | 设备调试   | [查看](https://github.com/yqhp/yqhp/blob/main/agent/agent-web/src/main/java/com/yqhp/agent/jshell/Device.java) |
| agent  | agent 调试 | [查看](https://github.com/yqhp/yqhp/blob/main/agent/agent-web/src/main/java/com/yqhp/agent/jshell/Agent.java)  |

## 初始化

:::tip
调试会话建立后将自动完成以下动作

1. 自动加载当前项目配置的`plugin`
2. 自动执行类型为`初始化`且`状态可用`的`doc`

:::

1. 新建`init`目录
2. 在`init`目录下新建以下 doc（类型为`初始化`, 流程为`失败终止`, 状态为`发布`）

   doc: `java导入`

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

   (app/web 自动化)doc: `selenium导入`

   ```java
   import org.openqa.selenium.*;
   import org.openqa.selenium.remote.*;
   import org.openqa.selenium.interactions.*;
   import org.openqa.selenium.support.*;
   import org.openqa.selenium.support.ui.*;
   import org.openqa.selenium.support.locators.RelativeLocator;
   import org.openqa.selenium.chrome.ChromeDriver;
   ```

   (app 自动化)doc: `appium导入`

   ```java
   import io.appium.java_client.*;
   import io.appium.java_client.remote.*;
   import io.appium.java_client.pagefactory.*;
   import io.appium.java_client.android.*;
   import io.appium.java_client.android.nativekey.*;
   ```

   (接口自动化)doc: `rest-assured导入`

   ```java
   import static io.restassured.RestAssured.*;
   import io.restassured.RestAssured;
   import io.restassured.http.Headers;
   import io.restassured.http.ContentType;
   import io.restassured.builder.RequestSpecBuilder;
   import io.restassured.specification.RequestSpecification;
   import io.restassured.filter.log.LogDetail;
   import io.restassured.response.Response;
   ```

   doc: `断言导入`

   ```java
   import org.junit.jupiter.api.Assertions;
   import static org.junit.jupiter.api.Assertions.*;
   ```

3. 在`init`目录下按需新建初始化插件 doc（类型为`初始化`, 流程为`失败终止`, 状态为`发布`）

[查看](/guide/plugins#插件列表)

## 代码调试

1. 选择设备/agent 调试
2. 新建一个 action doc -> 输入 print("hello world"); -> `F1`执行
