import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717242246521 implements MigrationInterface {
    name = 'Migration1717242246521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`created_at\` \`created_at\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
