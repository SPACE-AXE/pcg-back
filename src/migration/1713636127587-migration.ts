import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1713636127587 implements MigrationInterface {
    name = 'Migration1713636127587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`parking_transaction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`entry_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`exit_time\` datetime NULL, \`payment_time\` datetime NULL, \`charge_amount\` int NULL, \`amount\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`car\` ADD UNIQUE INDEX \`IDX_f561f846f040ec717bc90de267\` (\`car_num\`)`);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD CONSTRAINT \`FK_6a454dcd8f1a3b30b6b134c5256\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP FOREIGN KEY \`FK_6a454dcd8f1a3b30b6b134c5256\``);
        await queryRunner.query(`ALTER TABLE \`car\` DROP INDEX \`IDX_f561f846f040ec717bc90de267\``);
        await queryRunner.query(`DROP TABLE \`parking_transaction\``);
    }

}
