# 任务执行监听

## API

[点击查看](https://github.com/yqhp/yqhp/blob/main/agent/agent-web/src/main/java/com/yqhp/agent/task/TaskExecutionListener.java)

## 初始化

```java
import com.yqhp.agent.task.TaskExecutionListener;
import com.yqhp.console.model.vo.Task;
import com.yqhp.console.repository.enums.DocKind;
import com.yqhp.console.repository.entity.DocExecutionRecord;

agent.setTaskExecutionListener(new TaskExecutionListener() {

    @Override
    public void onEvalDocSkipped(DocExecutionRecord record) {
        log.warn("跳过执行: " + record.getDoc().getName());
    }

    @Override
    public void onEvalDocStarted(DocExecutionRecord record) {
        log.info("开始执行: " + record.getDoc().getName());
    }

    @Override
    public void onEvalDocSucceed(DocExecutionRecord record) {
        log.info("执行成功: " + record.getDoc().getName());
    }

    @Override
    public void onEvalDocFailed(DocExecutionRecord record, Throwable cause) {
        log.error("执行失败: " + record.getDoc().getName());
        // ui自动化: action失败截图
        if (record.getDoc().getKind() == DocKind.JSH_ACTION) {
            log.screenshot();
        }
    }

    @Override
    public void onTaskFinished(Task task) {
    }
});
```
