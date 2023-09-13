# 数据库操作

:::tip

agent@1.0.8开始支持数据库操作

`agent.createJdbcTemplate` 返回 Spring `JdbcTemplate`。本文提供常用增删改查示例，若不满足需求，可以网上查找 Spring `JdbcTemplate`更多使用方法

:::

## 初始化

```java
// 连接192.168.2.201:3306 console数据库，账号root，密码yqhp@123..Aa88，驱动com.mysql.cj.jdbc.Driver
var consoleJdbc = agent.createJdbcTemplate(
    "jdbc:mysql://192.168.2.201:3306/console?characterEncoding=utf-8&useSSL=false&rewriteBatchedStatements=true&serverTimezone=GMT%2B8",
    "root",
    "yqhp@123..Aa88",
    "com.mysql.cj.jdbc.Driver"
);
// 连接192.168.2.201:3306 auth数据库，账号root，密码yqhp@123..Aa88，驱动com.mysql.cj.jdbc.Driver
var authJdbc = agent.createJdbcTemplate(
    "jdbc:mysql://192.168.2.201:3306/auth?characterEncoding=utf-8&useSSL=false&rewriteBatchedStatements=true&serverTimezone=GMT%2B8",
    "root",
    "yqhp@123..Aa88",
    "com.mysql.cj.jdbc.Driver"
);
```

## Select

```java
// 查询List<Map<String, Object>>
var projects = consoleJdbc.queryForList("select * from project");
var projects = consoleJdbc.queryForList("select * from project where create_time >= '2023-09-13' and deleted = 0");
var projects = consoleJdbc.queryForList("select * from project where create_time >= ? and deleted = ?", "2023-09-13", 0);

// 查询单条记录Map
// {id=1701782581349060608, name=Auto1694571559520, ...}
var project = consoleJdbc.queryForMap("select * from project where id = ?", "1701782581349060608")
// "Auto1694571559520"
var projectName = project.get("name")
```

## Insert

```java
int insertCount = consoleJdbc.update("insert into project (id, name, create_by, update_by) values ('id001', 'project001', '1', '1')");
int insertCount = consoleJdbc.update("insert into project (id, name, create_by, update_by) values (?, ?, ?, ?)", "id002", "project002", "1", "1");
```

## Update

```java
var updateCount = consoleJdbc.update("update project set name = 'project888' where id = ?", "id001");
var updateCount = consoleJdbc.update("update project set name = 'project888' where id = '000'");
```

## Delete

```java
var deleteCount = consoleJdbc.update("delete from project where id = '000'");
var deleteCount = consoleJdbc.update("delete from project where id = ?", "id001");
```
