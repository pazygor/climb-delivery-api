-- CreateTable
CREATE TABLE `usuario_produto_sistema` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `produtoSistemaId` INTEGER NOT NULL,

    UNIQUE INDEX `usuario_produto_sistema_usuarioId_produtoSistemaId_key`(`usuarioId`, `produtoSistemaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuario_produto_sistema` ADD CONSTRAINT `usuario_produto_sistema_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario_produto_sistema` ADD CONSTRAINT `usuario_produto_sistema_produtoSistemaId_fkey` FOREIGN KEY (`produtoSistemaId`) REFERENCES `produto_sistema`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
