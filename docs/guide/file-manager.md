# 文件管理

目前 yqhp 使用 minio 管理静态文件，后台管理地址 http://{docker 宿主机 ip}:9001 ([查看详情](/guide/deploy.html#部署服务))

## 上传文件

### 手动上传

> 以管理 app 安装包为例

1. 创建 Bucket: Buckets -> Create Bucket -> Bucket Name: app -> Create Bucket -> app 的 Access Policy 设置为 public
2. 上传文件: Object Browser -> app -> Upload
3. 文件下载: `http://{docker 宿主机 ip}:9000/{bucket}/{paths}(没有创建路径，则忽略)/{filename}`
   > 如: `http://192.168.2.128:9000/app/1.apk http://192.168.2.128:9000/app/android/1.apk`

### 通过接口上传文件

```sh
# Authorization调整为可用token，建议在yqhp平台新建一个专门用来上传文件的用户，登陆获取token
# file: @filePath，filePath可以为相对路径或绝对路径
# isTmpFile: true or false，是否为临时文件，true将被定期清理
# http_base_url: 调整为yqhp前端地址，即nginx地址
$ curl -X POST \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzIyNjU0MDY4fQ.RuICjSVpRdoIU5Cv42_OHudMGYwvx8OQ4TNNoN-qVDw" \
-F "file=@./agent-web-0.2.7.jar" \
-F "isTmpFile=false" \
http://192.168.2.128/api/oss/file

# 返回的url为文件下载地址
{"url":"http://192.168.2.128:9000/yqhp/20230804/bebe3748d5b441baab5741a2364673fd/agent-web-0.2.7.jar","key":"20230804/bebe3748d5b441baab5741a2364673fd/agent-web-0.2.7.jar","name":"agent-web-0.2.7.jar","size":112034}
```
