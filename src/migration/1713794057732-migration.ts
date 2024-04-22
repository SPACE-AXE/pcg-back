import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1713794057732 implements MigrationInterface {
    name = 'Migration1713794057732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`nickname\` varchar(20) NOT NULL, \`email\` varchar(100) NOT NULL, \`username\` varchar(20) NOT NULL, \`password\` varchar(200) NOT NULL, \`birth\` date NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, UNIQUE INDEX \`IDX_e2364281027b926b879fa2fa1e\` (\`nickname\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`car\` (\`id\` int NOT NULL AUTO_INCREMENT, \`car_num\` varchar(15) NOT NULL, \`userId\` int NULL, UNIQUE INDEX \`IDX_f561f846f040ec717bc90de267\` (\`car_num\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`park\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`phone\` varchar(15) NOT NULL, \`address\` varchar(100) NOT NULL, \`total_space\` int NOT NULL, \`car_space\` int NOT NULL DEFAULT '0', \`disability_space\` int NOT NULL, \`manage_code\` varchar(100) NOT NULL, \`location\` point NOT NULL, UNIQUE INDEX \`IDX_b5ea0947a4727fd7149d9a5345\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`parking_transaction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`entry_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`exit_time\` datetime NULL, \`payment_time\` datetime NULL, \`charge_amount\` int NULL, \`amount\` int NULL, \`userId\` int NULL, \`parkId\` int NULL, \`carId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`car\` ADD CONSTRAINT \`FK_a4f3cb1b950608959ba75e8df36\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD CONSTRAINT \`FK_6a454dcd8f1a3b30b6b134c5256\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD CONSTRAINT \`FK_2eb7f73d0b351e7c0f40f4ae8a5\` FOREIGN KEY (\`parkId\`) REFERENCES \`park\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD CONSTRAINT \`FK_54bc2e36a3aaba62959da73093b\` FOREIGN KEY (\`carId\`) REFERENCES \`car\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP FOREIGN KEY \`FK_54bc2e36a3aaba62959da73093b\``);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP FOREIGN KEY \`FK_2eb7f73d0b351e7c0f40f4ae8a5\``);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP FOREIGN KEY \`FK_6a454dcd8f1a3b30b6b134c5256\``);
        await queryRunner.query(`ALTER TABLE \`car\` DROP FOREIGN KEY \`FK_a4f3cb1b950608959ba75e8df36\``);
        await queryRunner.query(`DROP TABLE \`parking_transaction\``);
        await queryRunner.query(`DROP INDEX \`IDX_b5ea0947a4727fd7149d9a5345\` ON \`park\``);
        await queryRunner.query(`DROP TABLE \`park\``);
        await queryRunner.query(`DROP INDEX \`IDX_f561f846f040ec717bc90de267\` ON \`car\``);
        await queryRunner.query(`DROP TABLE \`car\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e2364281027b926b879fa2fa1e\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
