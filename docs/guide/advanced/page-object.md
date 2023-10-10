# Page Object

Page Object 简称 po 模式，是 UI 自动化常用的代码组织方式，利用 po 模式组织代码，可以让业务代码更容易维护。本质上，po 模式也是使用面向对象的编程思想，将一个个页面定义为不同的`page class`，`page class`对外暴露业务方法，调用方无需关心具体的业务实现，而是交给每个`page class`实现并维护

```java
class HomePage {

    // ios https://github.com/appium/java-client/blob/master/src/main/java/io/appium/java_client/pagefactory/iOSXCUITFindBy.java
    // android https://github.com/appium/java-client/blob/master/src/main/java/io/appium/java_client/pagefactory/AndroidFindBy.java
    // web https://github.com/SeleniumHQ/selenium/blob/trunk/java/src/org/openqa/selenium/support/FindBy.java
    @iOSXCUITFindBy(xpath = "//xxx")
    @AndroidFindBy(accessibility = "登录，按钮")
    @FindBy(xpath="//*[text()='登 录']")
    WebElement loginBtn;

    HomePage(WebDriver ctx) {
        // 移动端
        PageFactory.initElements(new AppiumFieldDecorator(ctx), this);
        // pc web 端
        // PageFactory.initElements(ctx, this);
    }

    void goToLoginPage1() {
        loginBtn.click();
    }

    手机号登录注册页 goToLoginPage2() {
        loginBtn.click();
        return new 手机号登录注册页();
    }
}
```

```java
class 手机号登录注册页 {

    @iOSXCUITFindBy(xpath = "//xxx")
    @AndroidFindBy(id = "xxx:id/et_phone_number")
    WebElement 手机号输入框;

    By 验证码输入框 = By.id("xxx:id/et_capture");
    By 登录按钮 = AppiumBy.id("xxx:id/submit");

    手机号登录注册页(WebDriver ctx) {
        // 移动端
        PageFactory.initElements(new AppiumFieldDecorator(ctx), this);
        // pc web 端
        // PageFactory.initElements(ctx, this);
    }

    手机号登录注册页 输入手机号(String phone) {
        手机号输入框.sendKeys(phone);
        return this;
    }

    手机号登录注册页 输入验证码(String 验证码) {
        d.findElement(验证码输入框).sendKeys(验证码);
        return this;
    }

    void 点击登录() {
        d.findElement(登录按钮).click();
    }
}
```

```java
HomePage homePage = new HomePage(driver);
homePage.goToLoginPage2()
          .输入手机号("18812345678")
          .输入验证码("1234")
          .点击登录();
```
