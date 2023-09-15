# 接口自动化(rest-assured)

## 初始化

:::tip
注意，请勿全局修改 RestAssured，如: RestAssured.baseURI="https://xxx"，会影响到其他项目。
:::

### RestAssured 配置(按需调整)

```java
// 输出请求响应详情
class LogFilter implements Filter {
    @Override
    public Response filter(FilterableRequestSpecification requestSpec, FilterableResponseSpecification responseSpec, FilterContext ctx) {
        String reqLog = RequestPrinter.print(requestSpec, requestSpec.getMethod(), requestSpec.getURI(), LogDetail.ALL, Set.of(), System.out, true);
        log.info(reqLog);
        Response response = ctx.next(requestSpec, responseSpec);
        String respLog = ResponsePrinter.print(response, response, System.out, LogDetail.ALL, true, Set.of());
        log.info(respLog);
        return response;
    }
}

// 通用请求配置
RequestSpecification reqSpec = new RequestSpecBuilder()
                                .setBaseUri("http://192.168.2.201")
                                .setBasePath("/api")
                                .addFilter(new LogFilter())
                                .build();
```

### Token 管理(按需调整)

```java
// 调用接口获取token
String getToken(String username, String password) {
    return given().spec(reqSpec)
            .formParam("username", username)
            .formParam("password", password)
            .post("/auth/token")
            .path("token");
}

// 认证请求头
String authValue = "Bearer " + getToken("api-test", "api-test");
Header authHeader = new Header("Authorization", authValue);
```

## 发送请求

```java
// get
get("http://www.baidu.com");

// get with param => http://www.baidu.com?aa=1&bb=2
given().param("aa", 1).param("bb", "2").get("http://www.baidu.com")

// path替换 => /console/executionRecord/1674671582888464384/report
given().spec(reqSpec).get("/console/executionRecord/{id}/report", "1674671582888464384")

// post form
given().spec(reqSpec).formParam("username", "test").formParam("password", "test123").post("/auth/token");

// post json => {"name":"hello","description":"this is hello project"}
// 方式1
Map body1 = Map.of("name", "hello", "description", "this is hello project");
given().spec(reqSpec).header(authHeader).contentType(ContentType.JSON).body(body1).post("/console/project");
// 方式2
Map<String, Object> body2 = new HashMap();
body2.put("name", "hello");
body2.put("description", "this is hello project");
given().spec(reqSpec).header(authHeader).contentType(ContentType.JSON).body(body2).post("/console/project");
// 方式3
String body3 = "{\"name\":\"hello\",\"description\":\"this is hello project\"}";
given().spec(reqSpec).header(authHeader).contentType(ContentType.JSON).body(body3).post("/console/project");
// 方式4(java>=15)
String body4 = """
    {
        "name": "hello",
        "description": "this is hello project"
    }
""";
given().spec(reqSpec).header(authHeader).contentType(ContentType.JSON).body(body4).post("/console/project");
// 方式5
// object为某一个对象，如Project对象
given().spec(reqSpec).header(authHeader).contentType(ContentType.JSON).body(object).post("/console/project");
```

## 请求头配置

```java
given().header("aaa", "123").header("bbb", "1234").get("https://www.baidu.com");

// 若reqSpec也配置了请求头，会与当前配置的header合并，若header key重复则以当前header为准
given().spec(reqSpec).header("aaa", "123").get("/hello");
```

## 响应

```java
// 响应体
// {
// 	"token": "xxx",
// 	"ttl": 31536000,
// 	"userInfo": {
// 		"id": "1676043247233015808",
// 		"username": "test",
// 		"nickname": "test",
// 		"email": "test@test.com",
// 		"avatar": ""
// 	}
// }
// 发送请求获取响应对象
var response = given().spec(reqSpec).formParam("username", "test").formParam("password", "test123").post("/auth/token");
// http响应状态码
response.statusCode();
// 提取json值
response.path("token"); // xxx
response.path("userInfo.id"); // 1676043247233015808
// 获取所有响应头
response.getHeaders();
// 根据key获取响应头值
response.getHeader("Keep-Alive")
```

## 校验响应

```java
class ProjectApi {
    // 查询项目
    static Response queryProject(Map<String, ?> params) {
        return given().spec(reqSpec)
            .header(authHeader)
            .params(params)
            .get("/console/project/page");
    }

    // 创建项目
    static Response createProject(Object body) {
        return given().spec(reqSpec)
            .header(authHeader)
            .contentType(ContentType.JSON)
            .body(body)
            .post("/console/project");
    }

    // 删除项目
    static Response deleteProject(String projectId) {
        return given().spec(reqSpec)
            .header(authHeader)
            .delete("/console/project/{id}", projectId);
    }

}

// 响应
// {
//     "records": [
//         {
//             "id": "1693960845672976384",
//             "name": "api-demo",
//             "description": "",
//         }
//     ],
//     "total": 1,
//     "size": 10
// }
// 使用queryParam查询
var queryParam = Map.of("keyword", "api-demo");
// 校验http响应码，records个数=1，第1个record.name包含api-demo，total=1
ProjectApi.queryProject(queryParam).then()
    .statusCode(200)
    .body("records", hasSize(1))
    .body("records[0].name", containsString("api-demo"))
    .body("total", equalTo(1));

// 校验body，并提取第1个records的id
String projectId = ProjectApi.queryProject(queryParam).then()
    .body("records", hasSize(1))
    .extract().path("records[0].id")
// 校验body，并提取total
int total = ProjectApi.queryProject(queryParam).then()
    .body("total", greaterThan(0))
    .extract().path("total")
```

## 动态调整通用请求配置

```java
// 获取登录返回的token
var token = given().spec(reqSpec).formParam("username", "test").formParam("password", "test123").post("/auth/token").path("token");
// 动态调整通用请求配置，添加请求头Authorization
reqSpec.header("Authorization", "Bearer " + token);
// 后续使用reqSpec发送请求，将携带Authorization请求头
given().spec(reqSpec).get("/console/executionRecord/1674671582888464384/report")
```

## 官方文档

[rest-assured 文档](https://github.com/rest-assured/rest-assured/wiki/Usage)
