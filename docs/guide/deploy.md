# 部署

由于 java 的跨平台特性，所有服务支持 windows/linux/macos 部署

## 部署架构图

![An image](/yqhp-deploy-architecture-v1.png)

## 部署服务

> 如部署架构图所示，中间件与服务较多，服务器内存建议 >= 8GB

1. 启动 [docker-compose.yml](http://139.9.5.56:9000/yqhp-res/docker-compose.yml)

```sh
# 将192.168.2.128替换为宿主机局域网ip
export MY_IP=192.168.2.128;docker-compose up -d
```

2. 连接数据库执行初始化 [sql](http://139.9.5.56:9000/yqhp-res/db.sql)
   > 数据库用户名密码 root / yqhp@123..Aa88，端口 3306。mysql 在启动过程中可能连接失败，重试即可
3. 初始化 minio 数据
   1. 访问 `http://{宿主机 ip}:9001`，账号密码 admin / yqhp@123..Aa88
   2. Buckets -> 点击 Create Bucket -> Bucket Name 填写 yqhp -> 点击 Create Bucket，完成创建（若 yqhp 已存在，则忽略这步）
   3. Buckets -> 点击 yqhp 进入编辑页面 -> 将 Access Policy 设置为 public
   4. Access Keys -> 点击 Create Access Key -> Access Key 填写 yqhp -> Secret Key 填写yqhp@123..Aa88 -> 点击 Create 完成创建

## 部署 agent (docker)

:::tip
宿主机必须为 linux，非 linux 请使用非 docker 方式部署 agent
:::

```sh
docker run --privileged -d \
 -p 10004:10004 \
 -e NACOS_DISCOVERY_IP=192.168.2.201 \
 -e NACOS_ADDR=192.168.2.128:8848 \
 -e KAFKA_SERVERS=192.168.2.128:9094 \
 -e ZK_ADDR=192.168.2.128:2181 \
 -v /dev/bus/usb:/dev/bus/usb \
 -v ~/.android:/home/androidusr/.android \
 --name yqhp-agent registry.cn-hangzhou.aliyuncs.com/jiangyitao/yqhp-agent:latest
```

- NACOS_DISCOVERY_IP 调整为`当前宿主机ip`
- NACOS_ADDR / KAFKA_SERVERS / ZK_ADDR 调整为可用的地址

## 部署 agent (非 docker)

### 安装 java

`>=java11`(oraclejdk 与 openjdk 都可以)，环境变量配置 `JAVA_HOME`，并将 `$JAVA_HOME/bin` (win: `%JAVA_HOME%\bin`) 添加到 `Path`

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
$ npm install -g appium
# 查看appium版本
$ appium -v
2.0.0

# 安装uiautomator2驱动(由于部分资源来自github，没有梯子的话需要多试n次)
$ appium driver install uiautomator2
# 查看已安装的驱动
$ appium driver list --installed
✔ Listing installed drivers
- uiautomator2@2.29.2 [installed (npm)]

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

## agent 常用配置说明

> ${NACOS_ADDR:127.0.0.1:8848} 代表默认读取环境变量 NACOS_ADDR，不存在则为 127.0.0.1:8848

| 配置                                     | 说明                     | 默认                              | since |
| ---------------------------------------- | ------------------------ | --------------------------------- | ----- |
| spring.cloud.nacos.discovery.ip          | 客户端注册到 nacos 的 ip | `${NACOS_DISCOVERY_IP:}`          | 0.0.1 |
| spring.cloud.nacos.discovery.server-addr | nacos 地址               | `${NACOS_ADDR:127.0.0.1:8848}`    | 0.0.1 |
| spring.kafka.bootstrap-servers           | kafka 地址               | `${KAFKA_SERVERS:127.0.0.1:9094}` | 0.0.1 |
| zk.addr                                  | zookeeper 地址           | `${ZK_ADDR:127.0.0.1:2181}`       | 0.0.1 |

## 验证所有服务是否部署完成

- 登录 nacos 注册中心，`http://{宿主机 ip}:8848/nacos`，账号密码: `nacos / nacos`
- 进入`服务管理/服务列表`，列表内展示`agent-service` `auth-service` `console-service` `file-service` `gateway-service` 代表服务部署完成
