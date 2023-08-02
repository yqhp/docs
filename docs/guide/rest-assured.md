# rest-assured

:::tip
agent>=0.0.4 支持 rest-assured
:::

## 初始化(非必要)

:::tip
注意，请勿全局修改 RestAssured，如: RestAssured.baseURI="https://xxx"，会影响到其他项目。
:::

```java
// 按需调整通用请求配置
RequestSpecification yqhpReqSpec = new RequestSpecBuilder()
                .setBaseUri("http://192.168.2.128")
                .setBasePath("/api")
                .addHeader("header1", "123456")
                .addHeader("header2", "abcdefg")
                .log(LogDetail.ALL)
                .build();
```

## 发送请求

```java
// get
get("http://www.baidu.com");

// get with param => http://www.baidu.com?aa=1&bb=2
given().param("aa", 1).param("bb", "2").get("http://www.baidu.com")

// path替换 => /console/executionRecord/1674671582888464384/report
given().spec(yqhpReqSpec).get("/console/executionRecord/{id}/report", "1674671582888464384")

// post form
given().spec(yqhpReqSpec).formParam("username", "test").formParam("password", "test123").post("/auth/token");

// post json => {"name":"hello","description":"this is hello project"}
// 方式1
Map body1 = Map.of("name", "hello", "description", "this is hello project");
given().spec(yqhpReqSpec).contentType(ContentType.JSON).body(body1).post("/console/project");
// 方式2
Map<String, Object> body2 = new HashMap();
body2.put("name", "hello");
body2.put("description", "this is hello project");
given().spec(yqhpReqSpec).contentType(ContentType.JSON).body(body2).post("/console/project");
// 方式3
var body3 = "{\"name\":\"hello\",\"description\":\"this is hello project\"}";
given().spec(yqhpReqSpec).contentType(ContentType.JSON).body(body3).post("/console/project");
// 方式4
// object为某一个对象，如project对象
given().spec(yqhpReqSpec).contentType(ContentType.JSON).body(object).post("/console/project");
```

## 请求头配置

```java
given().header("aaa", "123").header("bbb", "1234").get("https://www.baidu.com");

// 若yqhpReqSpec也配置了请求头，会与当前配置的header合并，若header key重复则以当前header为准
given().spec(yqhpReqSpec).header("aaa", "123").get("/hello");
```

## 响应

```java
// 响应体{"token":"xxx","ttl":31536000,"userInfo":{"id":"1676043247233015808","username":"test","nickname":"test","email":"test@test.com","avatar":""}}

// 发送请求获取响应对象
var response = given().spec(yqhpReqSpec).formParam("username", "test").formParam("password", "test123").post("/auth/token");
// http响应状态码
response.statusCode();
// 提取json值
response.path("token"); // xxx
response.path("userInfo.id"); // 1676043247233015808
// 获取所有响应头
response.getHeaders();
// 根据key获取响应头值
response.getHeader("Keep-Alive")

// 一行代码获取token -> xxx
var token = given().spec(yqhpReqSpec).formParam("username", "test").formParam("password", "test123").post("/auth/token").path("token");
// 一行代码获取用户id -> 1676043247233015808
var userId = given().spec(yqhpReqSpec).formParam("username", "test").formParam("password", "test123").post("/auth/token").path("userInfo.id")
```

## 动态调整通用请求配置

```java
// 获取登录返回的token
var token = given().spec(yqhpReqSpec).formParam("username", "test").formParam("password", "test123").post("/auth/token").path("token");
// 动态调整通用请求配置，添加请求头Authorization
yqhpReqSpec.header("Authorization", "Bearer " + token);
// 后续使用yqhpReqSpec发送请求，将携带Authorization请求头
given().spec(yqhpReqSpec).get("/console/executionRecord/1674671582888464384/report")
```

## 官方文档

[rest-assured 文档](https://github.com/rest-assured/rest-assured/wiki/Usage)
