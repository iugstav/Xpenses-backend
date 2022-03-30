import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient({
  log: ["info", "warn"],
});

export { prismaClient };
