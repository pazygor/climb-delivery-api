-- AlterTable
ALTER TABLE `empresa` ADD COLUMN `chave_pix` VARCHAR(191) NULL,
    ADD COLUMN `descricao` TEXT NULL,
    ADD COLUMN `facebook` VARCHAR(191) NULL,
    ADD COLUMN `instagram` VARCHAR(191) NULL,
    ADD COLUMN `pedido_minimo` DECIMAL(10, 2) NULL DEFAULT 0,
    ADD COLUMN `whatsapp` VARCHAR(191) NULL;
