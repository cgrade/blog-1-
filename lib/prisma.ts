import { PrismaClient } from "@prisma/client"

/**
 * @dev Prisma client instance
 * @notice Creates a new PrismaClient instance or reuses an existing one
 */
let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma

