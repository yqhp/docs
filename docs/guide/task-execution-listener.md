# 任务执行监听

## API

[点击查看](https://github.com/yqhp/yqhp/blob/main/agent/agent-web/src/main/java/com/yqhp/agent/task/TaskExecutionListener.java)

## 初始化

> 以下为移动端示例，展示了在每个 action 执行前开启录屏，执行后停止录屏，并将录屏添加到 log，以便在报告中展示

```java
import com.yqhp.agent.task.TaskExecutionListener;
import com.yqhp.console.model.vo.Task;
import com.yqhp.console.repository.enums.DocKind;
import com.yqhp.console.repository.entity.DocExecutionRecord;

agent.setTaskExecutionListener(new TaskExecutionListener() {

    @Override
    public void onEvalActionsStarted(Task task) {
        // 开始执行全部action前将调用该方法，可以在这里执行初始化操作，比如安装APP
    }

    @Override
    public void onEvalDocStarted(DocExecutionRecord record) {
        log.info("开始执行: " + record.getDoc().getName());
        // action
        if (record.getDoc().getKind() == DocKind.JSH_ACTION) {
            // 开启录屏
            // android https://github.com/appium/appium-android-driver/blob/master/lib/commands/types.ts StartScreenRecordingOpts
            // iOS https://github.com/appium/appium-xcuitest-driver/blob/master/lib/commands/types.ts StartRecordingScreenOptions
            device.startRecordingScreen(Map.of(
                // "videoSize", "1920x1080", // android: height x width
                "bitRate", 1000000, // android: 1 Mbit/s
                "videoType", "libx264",// iOS: ffmpeg -vcodec
                "videoQuality", "low", // iOS: 'low' | 'medium' | 'high' | 'photo', mjpegServerScreenshotQuality: 10 | 25 | 75 | 100
                "videoFps", 5, // iOS: mjpegServerFramerate
                "forceRestart", true,
                "timeLimit", 1800 // 单位:second, appium限制录屏最长30分钟
            ));
        }
    }

    @Override
    public void onEvalDocSucceed(DocExecutionRecord record) {
        log.info("执行成功: " + record.getDoc().getName());
        // action
        if (record.getDoc().getKind() == DocKind.JSH_ACTION) {
            // 停止录屏并记录到日志
            log.video(device.stopRecordingScreen());
            // 如果执行成功不想保留视频到log，以节省文件服务器存储空间，可以注释上1行代码，并打开下面2行代码
            // File video = device.stopRecordingScreen();
            // if (video != null) video.delete();
        }
    }

    @Override
    public void onEvalDocFailed(DocExecutionRecord record, Throwable cause) {
        log.error("执行失败: " + record.getDoc().getName());
        // action
        if (record.getDoc().getKind() == DocKind.JSH_ACTION) {
            // 截图
            log.screenshot();
            // 停止录屏并记录到日志
            log.video(device.stopRecordingScreen());
        }
    }

    @Override
    public void onEvalDocSkipped(DocExecutionRecord record) {
        log.warn("跳过执行: " + record.getDoc().getName());
        // action
        if (record.getDoc().getKind() == DocKind.JSH_ACTION) {
            // 停止录屏
            File video = device.stopRecordingScreen();
            if (video != null) video.delete();
        }
    }

    @Override
    public void onTaskFinished(Task task) {
    }
});
```
