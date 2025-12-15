// prisma.config.ts - Updated for Vercel compatibility
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Use process.env directly - works with Vercel env vars
    url: process.env.DATABASE_URL,
  },
});
