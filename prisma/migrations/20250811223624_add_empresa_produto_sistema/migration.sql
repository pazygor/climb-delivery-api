-- CreateTable
CREATE TABLE `empresa_produto_sistema` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empresaId` INTEGER NOT NULL,
    `produtoSistemaId` INTEGER NOT NULL,

    UNIQUE INDEX `empresa_produto_sistema_empresaId_produtoSistemaId_key`(`empresaId`, `produtoSistemaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `empresa_produto_sistema` ADD CONSTRAINT `empresa_produto_sistema_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `empresa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `empresa_produto_sistema` ADD CONSTRAINT `empresa_produto_sistema_produtoSistemaId_fkey` FOREIGN KEY (`produtoSistemaId`) REFERENCES `produto_sistema`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
