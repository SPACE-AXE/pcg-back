import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1715927921977 implements MigrationInterface {
    name = 'Migration1715927921977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP COLUMN \`charge_time\``);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD \`charge_time\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP COLUMN \`charge_time\``);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD \`charge_time\` timestamp NULL`);
    }

}
