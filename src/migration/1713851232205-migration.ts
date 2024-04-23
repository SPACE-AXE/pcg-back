import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1713851232205 implements MigrationInterface {
    name = 'Migration1713851232205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_token\` DROP COLUMN \`token\``);
        await queryRunner.query(`ALTER TABLE \`email_token\` ADD \`token\` varchar(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_token\` DROP COLUMN \`token\``);
        await queryRunner.query(`ALTER TABLE \`email_token\` ADD \`token\` varchar(25) NOT NULL`);
    }

}
