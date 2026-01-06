/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `empresa` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `empresa` ADD COLUMN `slug` VARCHAR(100) NULL;

-- CreateTable
CREATE TABLE `configuracao_link_publico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empresa_id` INTEGER NOT NULL,
    `banner_url` TEXT NULL,
    `banner_mobile_url` TEXT NULL,
    `exibir_banner` BOOLEAN NOT NULL DEFAULT true,
    `mensagem_banner` TEXT NULL,
    `cor_primaria` VARCHAR(7) NOT NULL DEFAULT '#cc0000',
    `cor_secundaria` VARCHAR(7) NOT NULL DEFAULT '#b30000',
    `cor_acento` VARCHAR(7) NOT NULL DEFAULT '#ff0000',
    `cor_texto` VARCHAR(7) NOT NULL DEFAULT '#212121',
    `cor_fundo` VARCHAR(7) NOT NULL DEFAULT '#ffffff',
    `cor_header_background` VARCHAR(7) NOT NULL DEFAULT '#cc0000',
    `cor_header_texto` VARCHAR(7) NOT NULL DEFAULT '#ffffff',
    `logo_url` TEXT NULL,
    `favicon_url` TEXT NULL,
    `logo_header_url` TEXT NULL,
    `estilo_botao` VARCHAR(20) NOT NULL DEFAULT 'rounded',
    `estilo_card` VARCHAR(20) NOT NULL DEFAULT 'shadow',
    `tamanho_fonte` VARCHAR(20) NOT NULL DEFAULT 'medium',
    `exibir_promocoes` BOOLEAN NOT NULL DEFAULT true,
    `exibir_destaques` BOOLEAN NOT NULL DEFAULT true,
    `meta_titulo` VARCHAR(191) NULL,
    `meta_descricao` TEXT NULL,
    `meta_keywords` TEXT NULL,
    `url_facebook` VARCHAR(191) NULL,
    `url_instagram` VARCHAR(191) NULL,
    `url_twitter` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `configuracao_link_publico_empresa_id_key`(`empresa_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `empresa_slug_key` ON `empresa`(`slug`);

-- AddForeignKey
ALTER TABLE `configuracao_link_publico` ADD CONSTRAINT `configuracao_link_publico_empresa_id_fkey` FOREIGN KEY (`empresa_id`) REFERENCES `empresa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
