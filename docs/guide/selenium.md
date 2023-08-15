# Web 自动化 (selenium)

<iframe src="//player.bilibili.com/player.html?aid=446709754&bvid=BV1Uj41167LT&cid=1219804331&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

## 初始化

doc: `初始化chromedriver`

```java
// yqhp-appium插件(非必要)
import com.yqhp.plugin.appium.*;
// yqhp-easyimg插件(非必要)
import com.yqhp.plugin.easyimg.*;

RemoteWebDriver driver;

// yqhp-appium插件(非必要)
RemoteWebDriverWrapper d;
// yqhp-easyimg插件(非必要)
EasyImg img;

void initChromeDriver() {
    if (driver != null) {
        driver.quit();
    }
    driver = new ChromeDriver();
    driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(3)); // 设置隐式等待，按需调整时间或删除

    d = new RemoteWebDriverWrapper(driver); // yqhp-appium插件(非必要)
    img = new EasyImg(driver); // yqhp-easyimg插件(非必要)
    img.setImgDir("download"); // 远程图片存放路径 yqhp-easyimg插件(非必要)
}
```
