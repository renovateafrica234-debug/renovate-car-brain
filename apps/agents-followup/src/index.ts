import { Queue, Worker } from "bullmq";
import { logInfo } from "@renovate-car/utils";
import { createQueueConnection } from "./queue";

const queueName = "agents-followup";
const schedule = "*/15 * * * *";
const connection = createQueueConnection();
const queue = new Queue(queueName, { connection });

new Worker(
  queueName,
  async (job) => {
    logInfo(`Followup worker processing job ${job.id}`);
    return { result: "followup-complete" };
  },
  { connection }
);

queue.add("followup-cycle", { startedAt: new Date().toISOString() }, { repeat: { pattern: schedule } });
logInfo("agents-followup worker initialized", { queueName, schedule });
