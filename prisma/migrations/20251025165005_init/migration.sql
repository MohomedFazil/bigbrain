/*
  Warnings:

  - Added the required column `gradeId` to the `Mark` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mark" ADD COLUMN     "gradeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Mark" ADD CONSTRAINT "Mark_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
