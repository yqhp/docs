# Kafka 配置

| Topic                   | 生产者 -> 消费者                                | 推荐 Partition 数 | 说明                                          |
| ----------------------- | ----------------------------------------------- | ----------------- | --------------------------------------------- |
| DOC_EXECUTION_RECORD    | agent -> console(1 个实例默认配置了 2 个消费者) | 40                | agent 将 doc 执行结果同步给 console           |
| PLUGIN_EXECUTION_RECORD | agent -> console(1 个实例默认配置了 2 个消费者) | 40                | agent 将 plugin 执行结果同步给 console        |
| EXECUTION_REPORT        | console -> ?                                    | 20                | 任务执行完成后 console 将报告数据发送到 kafka |

增大 Topic Partition(分区)数与消费者个数，可以提升系统的并行消费能力。若 topic 出现消费能力不足的情况，可以增加该 topic 的分区数与消费者个数，来提升消费能力。由于 1 个分区只能被 1 个消费者消费，所以 topic 的分区数应>= topic 的消费者个数。

## Topic Partition 数量修改

```sh
# 1.查看kafka容器
docker ps
# 2.进入kafka容器
docker exec -it ${KAFKA_CONTAINER_ID} bash
# 3.修改topic partition数
kafka-topics.sh --bootstrap-server 127.0.0.1:9094 --alter --topic ${TOPIC} --partitions ${PARTITION_COUNT}

# 查看topic列表
kafka-topics.sh --bootstrap-server 127.0.0.1:9094 --list
# 查看topic信息(含topic partition数)
kafka-topics.sh --bootstrap-server 127.0.0.1:9094 --describe --topic ${TOPIC}
```
