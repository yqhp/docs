# 平台快速入门

登录 yqhp 系统，`http://{宿主机 ip}`，账号密码: `admin / admin`

## 系统管理

### 项目管理

- 项目之间数据相互隔离
- `设置插件`，配置项目可用的插件

### 插件管理

以 Appium 插件为例

1. 下载 Appium 插件: [appium-plugin-{version}.jar](https://github.com/yqhp/yqhp/releases)
2. 新建插件 -> 名称: `Appium-{version}` -> 保存
3. 上传下载好的插件: `appium-plugin-{version}.jar`
4. 项目配置 Appium 插件: 系统管理/项目管理 -> 设置插件 -> 勾选 `Appium-{version}`

### 用户管理

- `设置角色`，`超级管理员`拥有所有权限
- `设置项目`，配置用户参与的项目。拥有`超级管理员`角色的用户，无需设置，默认参与所有项目

## Coding

### 设备调试区域（左侧）

- 选择设备调试
- 设备管理
- 远程真机服务

### 目录文件树（右侧）

目录与 doc（java 脚本） 管理，目录与 doc 支持`拖拽排序`。

doc 状态:

- 草稿: 不可用
- 禁用: 不可用
- 过时: 可用
- 发布: 可用

doc 类型:

- 初始化: 设备调试会话建立后，`自动执行的doc（状态需为可用）`
- Action: 可以理解为一个用例

### 代码编辑区域（中间）

- 代码自动保存
- 设备调试会话建立后，输入代码自动提示
- 快捷键
  - F1: 执行当前选中的代码 或 光标所在行的代码
  - Ctrl + Space: 代码提示

### 控制台（底部）

#### JShell

代码与插件执行日志

#### AppiumLog

Appium 日志

#### Plugin

当前项目配置的插件，设备调试会话建立后将`自动加载`

## 计划

### 运行模式

- 高效模式: 将 Action 平均分配给设备执行，尽快执行完所有 Action。如: 该计划添加了 2 个可用 Action: `a1, a2`，2 个设备: `d1, d2`，则 `d1` 执行 `a1` ， `d2` 执行 `a2`
- 兼容模式: 每个设备执行相同的 Action。如: 该计划添加了 2 个可用 Action: `a1, a2`，2 个设备: `d1, d2`，则`d1`执行`a1, a2`，`d2`也执行`a1, a2`

### 排序

- 设备排序: 拖拽已添加的设备调整顺序。设备排序只对`高效模式`有用，排在上面的设备，优先分配到 Action。如: 有 3 个设备，2 个 Action，排在最后的设备分配不到 Action

- Action 排序: 拖拽已添加的 Action 调整顺序，设备将按序执行 Action。

## 执行记录

`计划`提交执行后，将生成执行记录。闲置设备领取到任务后，开始执行，并实时同步执行结果，可以点击`详情`跳转到`报告`页面，查看当前执行状态。`报告`页面无需登录状态即可访问，可以将`报告`页面分享给任意人查看。