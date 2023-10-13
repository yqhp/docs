# 部署

由于 java 的跨平台特性，所有服务支持 windows/linux/macos 部署

## 部署架构图

![An image](/yqhp-deploy-architecture-v1.png)

## 部署服务

> 如部署架构图所示，中间件与服务较多，服务器内存建议 >= 8GB

1. 启动 [docker-compose.yml](/docker-compose.yml)

   ```sh
   # 下载docker-compose.yml
   curl https://yqhp.github.io/docs/docker-compose.yml > docker-compose.yml

   # docker-compose.yml不适用 mac m芯片，需修改docker-compose.yml
   # mac m芯片: nacos image tag后面添加 -slim，如v2.2.0.1-slim
   # mac m芯片: 除nacos外，其他image下方添加 platform: linux/x86_64

   # 将192.168.2.128替换为宿主机局域网ip
   export MY_IP=192.168.2.128;docker-compose up -d
   ```

2. 连接数据库执行初始化 [sql](/db.sql)
   ```sh
   # 查看mysql容器
   docker ps
   # 进入mysql容器
   docker exec -it ${MYSQL_CONTAINER_ID} bash
   # 下载sql文件
   curl https://yqhp.github.io/docs/db.sql > db.sql
   # 连接mysql
   mysql -uroot -pyqhp@123..Aa88 --default-character-set=utf8mb4
   # 执行sql文件
   source db.sql
   # 查看是否存在auth与console数据库
   show database;
   ```
3. 初始化 minio 数据
   1. 访问 http://{docker 宿主机 ip}:9001，账号密码 admin / yqhp@123..Aa88
   2. Buckets -> 点击 Create Bucket -> Bucket Name 填写 yqhp -> 点击 Create Bucket，完成创建
   3. Buckets -> 点击 yqhp 进入编辑页面 -> 将 Access Policy 设置为 public
   4. Access Keys -> 点击 Create Access Key -> Access Key 填写 yqhp -> Secret Key 填写yqhp@123..Aa88 -> 点击 Create 完成创建

<!-- ## 部署 agent (docker)

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
- NACOS_ADDR / KAFKA_SERVERS / ZK_ADDR 调整为可用的地址 -->

## 部署 agent

:::tip
一台主机只能运行一个 agent，一个 agent 可连接多台移动设备
:::

### 安装 java

OpenJDK 下载: https://jdk.java.net/archive/

要求 java >= 11 (推荐 17)，环境变量配置 JAVA_HOME，并将 $JAVA_HOME/bin (windows: %JAVA_HOME%\bin) 添加到 `PATH`

```bash
# 验证java是否>=11
$ java -version
openjdk version "17.0.2" 2022-01-18
OpenJDK Runtime Environment (build 17.0.2+8-86)
OpenJDK 64-Bit Server VM (build 17.0.2+8-86, mixed mode, sharing)
```

### 移动端自动化环境搭建

1. 安装 nodejs

   官方下载地址: https://nodejs.org/en 推荐 LTS 版本。node -v >= v16.0.0, npm -v >= 8.0.0

   ```bash
   # 验证nodejs
   $ node -v
   v18.16.0
   $ npm -v
   9.5.1
   ```

2. 安装 appium2.x

   如果已经安装了 appium1.x，需卸载。卸载命令: npm uninstall --location=global appium

   ```bash
   # 安装appium2.x
   $ npm i --location=global appium
   # 安装完成后，验证appium版本
   $ appium -v
   2.0.0
   ```

3. (Android 自动化) 安装 android sdk 与 appium uiautomator2 驱动

   > 建议安装 Android Studio 并启动，按照提示下载 android sdk。环境变量配置 ANDROID_HOME，并将$ANDROID_HOME/platform-tools (windows: %ANDROID_HOME%\platform-tools) 添加到 `PATH`

   ```bash
   # 验证ANDROID_HOME
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

   # 安装uiautomator2驱动
   $ appium driver install uiautomator2

   # 验证驱动是否已安装
   $ appium driver list --installed
   ✔ Listing installed drivers
   - uiautomator2@2.29.3 [installed (npm)]
   ```

4. (iOS 自动化) 安装 xcuitest 驱动

   ```bash
   # 安装 xcuitest 驱动
   $ appium driver install xcuitest

   # 验证驱动是否已安装
   $ appium driver list --installed
   ✔ Listing installed drivers
   - xcuitest@4.33.2 [installed (npm)]
   ```

5. (iOS 自动化) 安装 wda 到 iOS 设备中
   [点击查看](/guide/ios-device-connect-to-agent)

6. 移动端屏幕录制
   [点击查看](/guide/recording-video)

### 启动 agent 服务

> 下载 [yqhp-agent.zip](https://github.com/yqhp/yqhp/releases)并解压

```sh
# 进入yqhp-agent目录
$ cd yqhp-agent
# 解压后文件夹内应包含agent-web-{version}.jar lib.{version} vendor
$ ls
agent-web-0.0.1.jar lib.v1  vendor
# 注意：先进入jar所在目录，再用java -jar启动服务，因为配置文件包含vendor相对路径
$ java -jar agent-web-{version}.jar \
--spring.cloud.nacos.discovery.server-addr=192.168.2.128:8848 \
--spring.kafka.bootstrap-servers=192.168.2.128:9094 \
--zk.addr=192.168.2.128:2181 \
--agent.schedule.receive-task-enabled=true \
--agent.android.enabled=true \
--agent.iOS.realDevice.enabled=true \
--agent.iOS.wda-bundle-id=com.yqhp.WebDriverAgentRunner \
--agent.opencv.enabled=true
```

### agent 常用配置说明

> ${NACOS_ADDR:127.0.0.1:8848} 代表默认读取环境变量 NACOS_ADDR，不存在则为 127.0.0.1:8848

| 配置                                     | 说明                                                                                                                    | 默认                              | since |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----- |
| spring.cloud.nacos.discovery.ip          | agent 注册到 nacos 的 ip                                                                                                | `${NACOS_DISCOVERY_IP:}`          | 0.0.1 |
| spring.cloud.nacos.discovery.server-addr | nacos 地址                                                                                                              | `${NACOS_ADDR:127.0.0.1:8848}`    | 0.0.1 |
| spring.kafka.bootstrap-servers           | kafka 地址                                                                                                              | `${KAFKA_SERVERS:127.0.0.1:9094}` | 0.0.1 |
| zk.addr                                  | zookeeper 地址                                                                                                          | `${ZK_ADDR:127.0.0.1:2181}`       | 0.0.1 |
| agent.description                        | agent 调试页面展示的描述                                                                                                | `${AGENT_DESC:}`                  | 0.2.0 |
| agent.schedule.receive-task-enabled      | 是否领取计划任务，`true` or `false`                                                                                     | `false`                           | 0.2.7 |
| agent.android.enabled                    | 是否开启 android 自动化功能，`true` or `false`                                                                          | `false`                           | 0.0.1 |
| agent.iOS.realDevice.enabled             | 是否开启 iOS 真机自动化功能，`true` or `false`                                                                          | `false`                           | 0.3.0 |
| agent.iOS.wda-bundle-id                  | iOS 自动化必填，为[iOS 设备接入 agent](/guide/ios-device-connect-to-agent)安装 wda 时填写的 `Product Bundle Identifier` | `${WDA_BUNDLE_ID:}`               | 0.3.0 |
| agent.opencv.enabled                     | 是否开启图像识别功能，`true` or `false`                                                                                 | `false`                           | 0.2.7 |

## 验证所有服务是否部署完成

- 登录 nacos 注册中心 http://{docker 宿主机 ip}:8848/nacos，账号密码: nacos / nacos
- 进入`服务管理/服务列表`，列表内展示`agent-service` `auth-service` `console-service` `file-service` `gateway-service` 代表服务部署完成

## 集群部署(高可用)

对服务要求高的同学，可以使用集群部署方案。这样的好处是，防止单点故障，更好的性能，并支持不停服更新，保证服务一直可用

1. 只保留[docker-compose.yml](/docker-compose.yml)里的中间件并启动，若要部署中间件(如 nacos，redis，kafka)集群，需调整服务配置，请自行解决
2. `yqhp-gateway` `yqhp-auth` `yqhp-console` `yqhp-file`，每个服务至少部署 2 个节点
3. 调整`yqhp-web-ui`镜像内的 nginx 配置，使流量能转发到所有`yqhp-gateway`节点

---

不停服更新流程(以`yqhp-console`为例说明):

1. `nacos` 下线 1 个`yqhp-console`节点 (配置管理 -> 服务列表 -> console-service 详情 -> 集群下线一个节点)，下线后流量将不会流入到该节点
2. kill 下线的节点，启动更新后的服务，启动完成后，观察`nacos`该服务是否已上线
3. 若上一个节点成功在`nacos`上线，则更新下一个节点，直到所有节点全部更新完成
