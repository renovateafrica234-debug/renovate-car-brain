import { Router } from "express";
import { logInfo } from "@renovate-car/utils";
const router = Router();
router.post("/", (req, res) => {
    const payload = req.body;
    logInfo("Received WhatsApp webhook", payload.type, payload.timestamp);
    res.status(200).json({ received: true });
});
export { router as webhookRouter };
