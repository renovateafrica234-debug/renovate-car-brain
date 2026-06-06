import { Queue, Worker } from "bullmq";
import { logInfo } from "@renovate-car/utils";
import { createQueueConnection } from "./queue";

const queueName = "agents-social";
const schedule = "*/30 * * * *";
const connection = createQueueConnection();
const queue = new Queue(queueName, { connection });

new Worker(
  queueName,
  async (job) => {
    logInfo(`Social worker processing job ${job.id}`);
    return { result: "social-cycle-complete" };
  },
  { connection }
);

queue.add("social-cycle", { startedAt: new Date().toISOString() }, { repeat: { pattern: schedule } });
logInfo("agents-social worker initialized", { queueName, schedule });
