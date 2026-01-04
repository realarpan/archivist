import dotenv from "dotenv";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

if (!process.env.DATABASE_URL && !process.env.BETTER_AUTH_SECRET) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const rootEnvPath = resolve(__dirname, "../../../.env");
  dotenv.config({ path: rootEnvPath });
}

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.url(),
    CORS_ORIGIN: z.url(),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
