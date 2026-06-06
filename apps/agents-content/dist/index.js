import { Queue, Worker } from "bullmq";
import { logInfo } from "@renovate-car/utils";
import { createQueueConnection } from "./queue";
const queueName = "agents-content";
const schedule = "0 8,20 * * *";
const connection = createQueueConnection();
const queue = new Queue(queueName, { connection });
new Worker(queueName, async (job) => {
    logInfo(`Content worker processing job ${job.id}`);
    return { result: "content-cycle-complete" };
}, { connection });
queue.add("content-cycle", { startedAt: new Date().toISOString() }, { repeat: { pattern: schedule } });
logInfo("agents-content worker initialized", { queueName, schedule });
