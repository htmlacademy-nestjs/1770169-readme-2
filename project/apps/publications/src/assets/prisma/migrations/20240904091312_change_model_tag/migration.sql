/*
  Warnings:

  - You are about to drop the column `tag` on the `tags` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tags" DROP COLUMN "tag",
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
