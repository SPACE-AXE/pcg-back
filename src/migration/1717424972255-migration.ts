import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717424972255 implements MigrationInterface {
    name = 'Migration1717424972255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`birth\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`birth\` date NOT NULL`);
    }

}
