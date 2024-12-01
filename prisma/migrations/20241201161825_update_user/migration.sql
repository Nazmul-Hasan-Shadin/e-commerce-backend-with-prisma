-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('block', 'active');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'active';
