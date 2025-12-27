/*
  Warnings:

  - You are about to drop the column `status` on the `historico_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `pedido` table. All the data in the column will be lost.
  - Added the required column `status_id` to the `historico_pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_id` to the `pedido` table without a default value. This is not possible if the table is not empty.

*/

-- Step 1: Criar a tabela status_pedido
CREATE TABLE `status_pedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(50) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `descricao` TEXT NULL,
    `cor` VARCHAR(20) NULL,
    `ordem` INTEGER NOT NULL DEFAULT 0,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `status_pedido_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Step 2: Popular a tabela com os status padrão
INSERT INTO `status_pedido` (`codigo`, `nome`, `descricao`, `cor`, `ordem`, `created_at`, `updated_at`) VALUES
('pendente', 'Em Análise', 'Pedido recebido e aguardando confirmação', '#f59e0b', 1, NOW(), NOW()),
('confirmado', 'Confirmado', 'Pedido confirmado e aguardando preparo', '#3b82f6', 2, NOW(), NOW()),
('em_preparo', 'Em Produção', 'Pedido está sendo preparado', '#3b82f6', 3, NOW(), NOW()),
('pronto', 'Pronto', 'Pedido pronto para entrega', '#8b5cf6', 4, NOW(), NOW()),
('em_entrega', 'Saiu para Entrega', 'Pedido saiu para entrega', '#06b6d4', 5, NOW(), NOW()),
('entregue', 'Entregue', 'Pedido foi entregue ao cliente', '#10b981', 6, NOW(), NOW()),
('cancelado', 'Cancelado', 'Pedido foi cancelado', '#ef4444', 7, NOW(), NOW());

-- Step 3: Adicionar coluna status_id nas tabelas (com valor temporário)
ALTER TABLE `pedido` ADD COLUMN `status_id` INTEGER NULL;
ALTER TABLE `historico_pedido` ADD COLUMN `status_id` INTEGER NULL;

-- Step 4: Migrar dados existentes (mapeamento status string para status_id)
-- Atualizar pedidos com valores válidos
UPDATE `pedido` p
INNER JOIN `status_pedido` sp ON (
    (p.`status` = 'pendente' AND sp.`codigo` = 'pendente') OR
    (p.`status` = 'confirmado' AND sp.`codigo` = 'confirmado') OR
    (p.`status` IN ('preparando', 'em_preparo') AND sp.`codigo` = 'em_preparo') OR
    (p.`status` = 'pronto' AND sp.`codigo` = 'pronto') OR
    (p.`status` IN ('saiu_entrega', 'em_entrega') AND sp.`codigo` = 'em_entrega') OR
    (p.`status` = 'entregue' AND sp.`codigo` = 'entregue') OR
    (p.`status` = 'cancelado' AND sp.`codigo` = 'cancelado')
)
SET p.`status_id` = sp.`id`;

-- Pedidos sem status válido recebem 'pendente' como padrão
UPDATE `pedido` p
SET p.`status_id` = (SELECT id FROM `status_pedido` WHERE `codigo` = 'pendente' LIMIT 1)
WHERE p.`status_id` IS NULL;

-- Atualizar histórico com valores válidos
UPDATE `historico_pedido` hp
INNER JOIN `status_pedido` sp ON (
    (hp.`status` = 'pendente' AND sp.`codigo` = 'pendente') OR
    (hp.`status` = 'confirmado' AND sp.`codigo` = 'confirmado') OR
    (hp.`status` IN ('preparando', 'em_preparo') AND sp.`codigo` = 'em_preparo') OR
    (hp.`status` = 'pronto' AND sp.`codigo` = 'pronto') OR
    (hp.`status` IN ('saiu_entrega', 'em_entrega') AND sp.`codigo` = 'em_entrega') OR
    (hp.`status` = 'entregue' AND sp.`codigo` = 'entregue') OR
    (hp.`status` = 'cancelado' AND sp.`codigo` = 'cancelado')
)
SET hp.`status_id` = sp.`id`;

-- Histórico sem status válido recebe 'pendente' como padrão
UPDATE `historico_pedido` hp
SET hp.`status_id` = (SELECT id FROM `status_pedido` WHERE `codigo` = 'pendente' LIMIT 1)
WHERE hp.`status_id` IS NULL;

-- Step 5: Tornar status_id NOT NULL e remover status antigo
ALTER TABLE `pedido` MODIFY COLUMN `status_id` INTEGER NOT NULL;
ALTER TABLE `historico_pedido` MODIFY COLUMN `status_id` INTEGER NOT NULL;

ALTER TABLE `pedido` DROP COLUMN `status`;
ALTER TABLE `historico_pedido` DROP COLUMN `status`;

-- Step 6: Adicionar as foreign keys
ALTER TABLE `pedido` ADD CONSTRAINT `pedido_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `status_pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `historico_pedido` ADD CONSTRAINT `historico_pedido_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `status_pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
