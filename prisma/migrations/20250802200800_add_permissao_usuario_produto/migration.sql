/*
  Warnings:

  - Added the required column `sistema_id` to the `produto` table without a default value. This is not possible if the table is not empty.
  - Made the column `permissao` on table `usuarios` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `produto` ADD COLUMN `sistema_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `permissao` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `usuario_produto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `produtoId` INTEGER NOT NULL,

    UNIQUE INDEX `usuario_produto_usuarioId_produtoId_key`(`usuarioId`, `produtoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,

    UNIQUE INDEX `permissao_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produto_sistema` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `produto_sistema_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_permissao_fkey` FOREIGN KEY (`permissao`) REFERENCES `permissao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario_produto` ADD CONSTRAINT `usuario_produto_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario_produto` ADD CONSTRAINT `usuario_produto_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `produto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produto` ADD CONSTRAINT `produto_sistema_id_fkey` FOREIGN KEY (`sistema_id`) REFERENCES `produto_sistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO `permissao` (`nome`, `descricao`) VALUES
  ('admin_global', 'Admin da plataforma. Pode cadastrar empresas, admins dos clientes e gerir tudo.'),
  ('admin_cliente', 'Admin de uma empresa cliente. Pode gerir dados da própria empresa e cadastrar usuários.'),
  ('usuario', 'Usuário operacional. Pode criar/editar projetos, servidores, monitoramentos, etc.'),
  ('viewer', 'Perfil de visualização. Pode acompanhar o andamento dos projetos, sem editar.');

INSERT INTO `produto_sistema` (`id`, `nome`) VALUES
  (1, 'monitoramento'),
  (2, 'deploy');

INSERT INTO `produto` (`nome_produto`, `status`, `sistema_id`, `created_at`, `updated_at`) VALUES
  ('Monitor', 'ativo', 1, NOW(), NOW()),
  ('Insights', 'ativo', 1, NOW(), NOW());