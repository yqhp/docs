# 数据库操作

:::tip

agent@1.0.8开始支持数据库操作

`agent.createJdbcTemplate` 返回 Spring `JdbcTemplate`。本文提供常用的增删改查示例，若不满足需求，可以网上查找 Spring `JdbcTemplate`更多使用方法

:::

## 初始化
```java
import org.springframework.jdbc.datasource.DriverManagerDataSource;

// console数据库
var consoleDS = new DriverManagerDataSource();
consoleDS.setUrl("jdbc:mysql://192.168.2.201:3306/console?characterEncoding=utf-8&useSSL=false&rewriteBatchedStatements=true&serverTimezone=GMT%2B8");
consoleDS.setUsername("root");
consoleDS.setPassword("yqhp@123..Aa88");
consoleDS.setDriverClassName("com.mysql.cj.jdbc.Driver");
var consoleJdbcTemplate = agent.createJdbcTemplate(consoleDS);

// auth数据库
var authDS = new DriverManagerDataSource();
authDS.setUrl("jdbc:mysql://192.168.2.201:3306/auth?characterEncoding=utf-8&useSSL=false&rewriteBatchedStatements=true&serverTimezone=GMT%2B8");
authDS.setUsername("root");
authDS.setPassword("yqhp@123..Aa88");
authDS.setDriverClassName("com.mysql.cj.jdbc.Driver");
var authJdbcTemplate = agent.createJdbcTemplate(authDS);
```

## Select

```java
// 查询List<Map<String, Object>>
var projects = consoleJdbcTemplate.queryForList("select * from project");
var projects = consoleJdbcTemplate.queryForList("select * from project where create_time >= '2023-09-13' and deleted = 0");
var projects = consoleJdbcTemplate.queryForList("select * from project where create_time >= ? and deleted = ?", "2023-09-13", 0);

// 查询单条记录Map
// {id=1701782581349060608, name=Auto1694571559520, ...}
var project = consoleJdbcTemplate.queryForMap("select * from project where id = ?", "1701782581349060608")
// "Auto1694571559520"
var projectName = project.get("name")
```

## Insert

```java
int insertCount = consoleJdbcTemplate.update("insert into project (id, name, create_by, update_by) values ('id001', 'project001', '1', '1')");
int insertCount = consoleJdbcTemplate.update("insert into project (id, name, create_by, update_by) values (?, ?, ?, ?)", "id002", "project002", "1", "1");
```

## Update

```java
var updateCount = consoleJdbcTemplate.update("update project set name = 'project888' where id = ?", "id001");
var updateCount = consoleJdbcTemplate.update("update project set name = 'project888' where id = '000'");
```

## Delete

```java
var deleteCount = consoleJdbcTemplate.update("delete from project where id = '000'");
var deleteCount = consoleJdbcTemplate.update("delete from project where id = ?", "id001");
```
