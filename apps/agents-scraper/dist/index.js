import { Queue, Worker } from "bullmq";
import { logInfo } from "@renovate-car/utils";
import { createQueueConnection } from "./queue";
const queueName = "agents-scraper";
const schedule = "0 */2 * * *";
const connection = createQueueConnection();
const queue = new Queue(queueName, { connection });
new Worker(queueName, async (job) => {
    logInfo(`Scraper worker processing job ${job.id}`);
    return { result: "scrape-complete" };
}, { connection });
queue.add("scrape-cycle", { startedAt: new Date().toISOString() }, { repeat: { pattern: schedule } });
logInfo("agents-scraper worker initialized", { queueName, schedule });
