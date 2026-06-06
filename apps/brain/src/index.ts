import express from "express";
import "dotenv/config";
import { logInfo, logError } from "@renovate-car/utils";
import { webhookRouter } from "./routes/webhook";
import { startRecurringJobs } from "./jobs/schedules";

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
const app = express();

app.use(express.json());
app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/webhook/whatsapp", webhookRouter);

app.listen(port, () => {
  logInfo(`Brain API listening on http://localhost:${port}`);
  try {
    startRecurringJobs();
  } catch (error) {
    logError("Failed to start recurring jobs", error);
  }
});
