import type { RedisOptions } from "ioredis";

export const createQueueConnection = (): RedisOptions => ({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT || 6379)
});
