-- DropForeignKey
ALTER TABLE `pedido` DROP FOREIGN KEY `pedido_endereco_id_fkey`;

-- DropIndex
DROP INDEX `pedido_endereco_id_fkey` ON `pedido`;

-- AlterTable
ALTER TABLE `pedido` ADD COLUMN `cliente_id` INTEGER NULL,
    ADD COLUMN `tipo_pedido` VARCHAR(191) NOT NULL DEFAULT 'entrega',
    ADD COLUMN `troco_para` DECIMAL(10, 2) NULL,
    MODIFY `usuario_id` INTEGER NULL,
    MODIFY `endereco_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empresa_id` INTEGER NOT NULL,
    `nome` VARCHAR(191) NULL,
    `telefone` VARCHAR(15) NOT NULL,
    `email` VARCHAR(191) NULL,
    `cpf` VARCHAR(11) NULL,
    `cep` VARCHAR(8) NULL,
    `logradouro` VARCHAR(191) NULL,
    `numero` VARCHAR(191) NULL,
    `complemento` VARCHAR(191) NULL,
    `bairro` VARCHAR(191) NULL,
    `cidade` VARCHAR(191) NULL,
    `uf` VARCHAR(2) NULL,
    `referencia` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `cliente_telefone_empresa_id_key`(`telefone`, `empresa_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pedido` ADD CONSTRAINT `pedido_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `cliente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pedido` ADD CONSTRAINT `pedido_endereco_id_fkey` FOREIGN KEY (`endereco_id`) REFERENCES `endereco`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cliente` ADD CONSTRAINT `cliente_empresa_id_fkey` FOREIGN KEY (`empresa_id`) REFERENCES `empresa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
