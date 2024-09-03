import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1725337443601 implements MigrationInterface {
    name = 'Migration1725337443601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`role\` \`role\` enum ('user', 'admin', 'park') NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`role\` \`role\` enum ('user', 'admin', 'park') NULL DEFAULT 'user'`);
    }

}
