/*
  Warnings:

  - You are about to drop the column `usuario_proprietario` on the `projeto` table. All the data in the column will be lost.
  - Added the required column `local_armazenamento` to the `projeto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `projeto` DROP COLUMN `usuario_proprietario`,
    ADD COLUMN `local_armazenamento` VARCHAR(191) NOT NULL;
