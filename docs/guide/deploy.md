# 部署

## 部署架构图

![An image](/yqhp-deploy-architecture-v1.png)

## 部署服务

> 如部署架构图所示，中间件与服务较多，服务器内存建议 >= 8GB

1. 将 [docker-compose.yml](https://github.com/yqhp/yqhp/blob/main/docker/docker-compose.yml) 127.0.0.1 全局替换为宿主机局域网 ip
2. 启动服务 docker-compose up -d
3. 连接数据库执行初始化 [sql](https://github.com/yqhp/yqhp/blob/main/db.sql)
   > 数据库用户名密码 root / yqhp@123..Aa88，端口 3306。mysql 在启动过程中可能连接失败，重试即可
4. 初始化 minio 数据
   1. 访问 http://{宿主机 ip}:9001，账号密码 admin / yqhp@123..Aa88
   2. Buckets -> 点击 Create Bucket -> Bucket Name 填写 yqhp -> 点击 Create Bucket，完成创建（若 yqhp 已存在，则忽略这步）
   3. Buckets -> 点击 yqhp 进入编辑页面 -> 将 Access Policy 设置为 public
   4. Access Keys -> 点击 Create Access Key -> Access Key 填写 yqhp -> Secret Key 填写yqhp@123..Aa88 -> 点击 Create 完成创建

## 部署 Agent
