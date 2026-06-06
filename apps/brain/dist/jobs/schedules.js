import { Queue, Worker } from "bullmq";
import { logInfo } from "@renovate-car/utils";
import { createQueueConnection } from "./queue";
const createWorkerForQueue = (name) => {
    const connection = createQueueConnection();
    const queue = new Queue(name, { connection });
    new Worker(name, async (job) => {
        logInfo(`Processing job ${name}`, job.id);
        return { completed: true };
    }, { connection });
    return queue;
};
const schedules = [
    { name: "agents-scraper", cron: "0 */2 * * *" },
    { name: "agents-social", cron: "*/30 * * * *" },
    { name: "agents-content", cron: "0 0,12 * * *" },
    { name: "agents-leads", cron: "0 * * * *" },
    { name: "agents-followup", cron: "*/15 * * * *" },
    { name: "agents-whatsapp", cron: "0 8 * * *" },
    { name: "analytics-sync", cron: "*/10 * * * *" }
];
export const startRecurringJobs = () => {
    schedules.forEach(({ name, cron }) => {
        const queue = createWorkerForQueue(name);
        queue.add(`${name}-schedule`, { scheduledAt: new Date().toISOString() }, { repeat: { pattern: cron } });
    });
    logInfo("Started Brain recurring job schedules", schedules.map((job) => job.name));
};
