import { Queue, Worker } from "bullmq";
import { logInfo } from "@renovate-car/utils";
import { createQueueConnection } from "./queue";
const queueName = "agents-leads";
const schedule = "0 * * * *";
const connection = createQueueConnection();
const queue = new Queue(queueName, { connection });
new Worker(queueName, async (job) => {
    logInfo(`Leads worker processing job ${job.id}`);
    return { result: "lead-score-complete" };
}, { connection });
queue.add("leads-cycle", { startedAt: new Date().toISOString() }, { repeat: { pattern: schedule } });
logInfo("agents-leads worker initialized", { queueName, schedule });
