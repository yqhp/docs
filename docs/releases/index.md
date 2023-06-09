# 版本发布记录

## v5 -> v6 (2023-07-05)

- web-ui: 增加取色功能
- agent: 脚本内置 print(Object obj)
- plugin: 增加图片识别插件 easyimg@0.0.1

| 项目         | 版本           | 说明                             |
| ------------ | -------------- | -------------------------------- |
| yqhp-web-ui  | 0.0.4 -> 0.0.5 | docker image tag: 0.0.4 -> 0.0.5 |
| yqhp-agent   | 0.0.4 -> 0.0.7 | docker image tag: 0.0.4 -> 0.0.7 |
| yqhp-easyimg | 0.0.1          | [查看](/guide/plugins)           |

## v4 -> v5 (2023-07-04)

- 增加 HttpClient(rest-assured)支持 [查看使用说明](/guide/rest-assured)

| 项目       | 版本           | 说明                             |
| ---------- | -------------- | -------------------------------- |
| yqhp-agent | 0.0.3 -> 0.0.4 | docker image tag: 0.0.3 -> 0.0.4 |

## v3 -> v4 (2023-06-29)

- fix: agent 在 java17 下，page factory 报错
- 新增一种安装 app 方式
- 优化移动端按键处理，以支持长按效果

| 项目        | 版本           | 说明                             |
| ----------- | -------------- | -------------------------------- |
| yqhp-web-ui | 0.0.3 -> 0.0.4 | docker image tag: 0.0.3 -> 0.0.4 |
| yqhp-agent  | 0.0.2 -> 0.0.3 | docker image tag: 0.0.2 -> 0.0.3 |

## v2 -> v3 (2023-06-25)

- fix: report 接口不校验 token

| 项目         | 版本           | 说明                             |
| ------------ | -------------- | -------------------------------- |
| yqhp-gateway | 0.0.2 -> 0.0.3 | docker image tag: 0.0.2 -> 0.0.3 |

## v1 -> v2 (2023-06-22)

- 添加 webview 调试功能

| 项目         | 版本           | 说明                                                         |
| ------------ | -------------- | ------------------------------------------------------------ |
| yqhp-web-ui  | 0.0.1 -> 0.0.3 | docker image tag: 0.0.1 -> 0.0.3                             |
| yqhp-gateway | 0.0.1 -> 0.0.2 | docker image tag: 0.0.1 -> 0.0.2                             |
| yqhp-agent   | 0.0.1 -> 0.0.2 | 下载 [yqhp-agent.zip](https://github.com/yqhp/yqhp/releases) |
