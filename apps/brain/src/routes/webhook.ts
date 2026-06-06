import { Router } from "express";
import { logInfo } from "@renovate-car/utils";
import { WebhookPayload } from "@renovate-car/types";

const router = Router();

router.post("/", (req, res) => {
  const payload = req.body as WebhookPayload;
  logInfo("Received WhatsApp webhook", payload.type, payload.timestamp);
  res.status(200).json({ received: true });
});

export { router as webhookRouter };
