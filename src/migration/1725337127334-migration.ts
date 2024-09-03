import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1725337127334 implements MigrationInterface {
    name = 'Migration1725337127334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` enum ('user', 'admin', 'park') NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    }

}
