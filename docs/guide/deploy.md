# 部署

由于 java 的跨平台特性，所有服务支持 windows/linux/macos 部署

## 部署架构图

![An image](/yqhp-deploy-architecture-v1.png)

## 部署服务

> 如部署架构图所示，中间件与服务较多，服务器内存建议 >= 8GB

1. 将 [docker-compose.yml](https://github.com/yqhp/yqhp/blob/main/docker/docker-compose.yml) 127.0.0.1 全局替换为宿主机局域网 ip
2. 启动服务 docker-compose up -d （等待镜像下载完成）
3. 连接数据库执行初始化 [sql](https://github.com/yqhp/yqhp/blob/main/db.sql)
   > 数据库用户名密码 root / yqhp@123..Aa88，端口 3306。mysql 在启动过程中可能连接失败，重试即可
4. 初始化 minio 数据
   1. 访问 `http://{宿主机 ip}:9001`，账号密码 admin / yqhp@123..Aa88
   2. Buckets -> 点击 Create Bucket -> Bucket Name 填写 yqhp -> 点击 Create Bucket，完成创建（若 yqhp 已存在，则忽略这步）
   3. Buckets -> 点击 yqhp 进入编辑页面 -> 将 Access Policy 设置为 public
   4. Access Keys -> 点击 Create Access Key -> Access Key 填写 yqhp -> Secret Key 填写yqhp@123..Aa88 -> 点击 Create 完成创建

## 部署 agent

> Agent 暂不支持 docker 部署。注意，请勿在一台主机上运行多个 agent 服务

### 安装 java

`java>=11`(oraclejdk 与 openjdk 都可以)，环境变量配置 `JAVA_HOME`，并将 `$JAVA_HOME/bin` (win: `%JAVA_HOME%\bin`) 添加到 `Path`

```bash
# 验证java版本是否>=11
$ java -version
java version "11.0.14" 2022-01-18 LTS
Java(TM) SE Runtime Environment 18.9 (build 11.0.14+8-LTS-263)
Java HotSpot(TM) 64-Bit Server VM 18.9 (build 11.0.14+8-LTS-263, mixed mode)
```

### 安装 Android SDK

> 建议安装 Android Studio 并启动，会自动下载 android sdk

环境变量配置 `ANDROID_HOME`，并将`$ANDROID_HOME/platform-tools` (win: `%ANDROID_HOME%\platform-tools`) 添加到 `Path`

```bash
# linux / macos
$ echo $ANDROID_HOME
/Users/jiangyitao/Library/Android/sdk
# windows
$ echo %ANDROID_HOME%
C:\Users\jiangyitao\AppData\Local\Android\Sdk

# 验证adb
$ adb version
Android Debug Bridge version 1.0.41
Version 30.0.5-6877874
Installed as /Users/jiangyitao/Library/Android/sdk/platform-tools/adb

# 验证build-tools是否存在
# linux / macos
$ ls $ANDROID_HOME/build-tools
30.0.3
# windows
$ dir %ANDROID_HOME%\build-tools
2023/05/22  11:51    <DIR>          33.0.2
```

### 安装 appium2.x

```bash
# 安装nodejs，推荐最新LTS版本
$ node -v
v18.16.0
$ npm -v
9.5.1

# 安装appium2.x
$ npm install -g appium@next
# 查看appium版本
$ appium -v
2.0.0-beta.66

# 安装uiautomator2驱动(由于部分资源来自github，没有梯子的话需要多试n次)
$ appium driver install uiautomator2
# 查看已安装的驱动
$ appium driver list --installed
✔ Listing installed drivers
- uiautomator2@2.14.0 [installed (npm)]

```

### 启动 agent 服务

> 下载 [yqhp-agent.zip](https://github.com/yqhp/yqhp/releases)并解压

```sh
# 进入yqhp-agent目录
$ cd yqhp-agent
# 解压后文件夹内应包含agent-web-{version}.jar lib.{version} vendor
$ ls
agent-web-0.0.1.jar lib.v1  vendor
# 启动agent服务，注意：先进入jar所在目录，再用java -jar启动服务，因为配置文件包含vendor相对路径
# 通常，启动参数只需要指定这3个地址即可。当然，如果是同一台主机，可以不指定
$ java -jar agent-web-{version}.jar --spring.cloud.nacos.discovery.server-addr=192.168.2.128:8848 --spring.kafka.bootstrap-servers=192.168.2.128:9094 --zk.addr=192.168.2.128:2181

```

#### agent 常用配置说明

> ${NACOS_ADDR:127.0.0.1:8848} 代表默认读取环境变量 NACOS_ADDR，不存在则为 127.0.0.1:8848

| 配置                                     | 说明           | 默认                              | since |
| ---------------------------------------- | -------------- | --------------------------------- | ----- |
| spring.cloud.nacos.discovery.server-addr | nacos 地址     | `${NACOS_ADDR:127.0.0.1:8848}`    | 0.0.1 |
| spring.kafka.bootstrap-servers           | kafka 地址     | `${KAFKA_SERVERS:127.0.0.1:9094}` | 0.0.1 |
| zk.addr                                  | zookeeper 地址 | `${ZK_ADDR:127.0.0.1:2181}`       | 0.0.1 |

## 关于配置的说明

以 agent 为例，可以将配置文件[application.yml](https://github.com/yqhp/yqhp/blob/main/agent/agent-web/src/main/resources/application.yml)放到 agent-web-{version}.jar 所在目录，根据需要修改 application.yml 内容，再使用 java -jar agent-web-{version}.jar 启动服务，`但这不是推荐的做法`，因为后续版本更新，配置文件可能发生变化。`推荐`使用环境变量或启动参数的方式修改配置，如: `java -jar agent-web-0.0.1.jar --spring.cloud.nacos.discovery.server-addr=192.168.2.128:8848`

## 验证所有服务是否部署完成

- 登录 nacos 注册中心，`http://{宿主机 ip}:8848/nacos`，账号密码: `nacos / nacos`
- 进入`服务管理/服务列表`，列表内展示`agent-service` `auth-service` `console-service` `file-service` `gateway-service` 代表服务部署完成
