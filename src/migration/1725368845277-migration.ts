import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1725368845277 implements MigrationInterface {
    name = 'Migration1725368845277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`park\` ADD \`role\` enum ('user', 'admin', 'park') NOT NULL DEFAULT 'park'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`park\` DROP COLUMN \`role\``);
    }

}
