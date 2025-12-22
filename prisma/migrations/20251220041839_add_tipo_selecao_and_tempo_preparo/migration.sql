-- AlterTable
ALTER TABLE `grupo_adicional` ADD COLUMN `maximo_selecao` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `minimo_selecao` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `tipo_selecao` VARCHAR(191) NOT NULL DEFAULT 'RADIO';

-- AlterTable
ALTER TABLE `produto` ADD COLUMN `tempo_preparo` INTEGER NULL;
