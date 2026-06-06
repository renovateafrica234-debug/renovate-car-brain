import { Queue, Worker } from "bullmq";
import { logInfo } from "@renovate-car/utils";
import { createQueueConnection } from "./queue";
const queueName = "agents-whatsapp";
const schedule = "0 8 * * *";
const connection = createQueueConnection();
const queue = new Queue(queueName, { connection });
new Worker(queueName, async (job) => {
    logInfo(`WhatsApp worker processing job ${job.id}`);
    return { result: "whatsapp-cycle-complete" };
}, { connection });
queue.add("whatsapp-digest", { startedAt: new Date().toISOString() }, { repeat: { pattern: schedule } });
logInfo("agents-whatsapp worker initialized", { queueName, schedule });
