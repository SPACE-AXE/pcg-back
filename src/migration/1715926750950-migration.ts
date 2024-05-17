import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1715926750950 implements MigrationInterface {
    name = 'Migration1715926750950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD \`charge_start_time\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD \`charge_time\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD \`parking_amount\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD \`total_amount\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP COLUMN \`total_amount\``);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP COLUMN \`parking_amount\``);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP COLUMN \`charge_time\``);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP COLUMN \`charge_start_time\``);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD \`amount\` int NULL`);
    }

}
