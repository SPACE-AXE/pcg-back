import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1715514865422 implements MigrationInterface {
    name = 'Migration1715514865422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_token\` DROP FOREIGN KEY \`FK_c728d9445f15cd00fb479ad92de\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_00ec72ad98922117bad8a86f980\``);
        await queryRunner.query(`ALTER TABLE \`car\` DROP FOREIGN KEY \`FK_c8d34198d86de9e96aae03b8990\``);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP FOREIGN KEY \`FK_0a8eee9d0b33225c938f8927f89\``);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP FOREIGN KEY \`FK_237b340bd1e5a81eb26f8e3ba6d\``);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP FOREIGN KEY \`FK_f73ecf8aec00a7f79e83ebde2d9\``);
        await queryRunner.query(`DROP INDEX \`REL_c728d9445f15cd00fb479ad92d\` ON \`email_token\``);
        await queryRunner.query(`DROP INDEX \`REL_00ec72ad98922117bad8a86f98\` ON \`card\``);
        await queryRunner.query(`ALTER TABLE \`car\` CHANGE \`user_id\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`email_token\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP COLUMN \`park_id\``);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP COLUMN \`car_id\``);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD \`parkId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD \`carId\` int NULL`);
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
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP COLUMN \`carId\``);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP COLUMN \`parkId\``);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD \`car_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD \`park_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`email_token\` ADD \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`car\` CHANGE \`userId\` \`user_id\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_00ec72ad98922117bad8a86f98\` ON \`card\` (\`user_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_c728d9445f15cd00fb479ad92d\` ON \`email_token\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD CONSTRAINT \`FK_f73ecf8aec00a7f79e83ebde2d9\` FOREIGN KEY (\`park_id\`) REFERENCES \`park\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD CONSTRAINT \`FK_237b340bd1e5a81eb26f8e3ba6d\` FOREIGN KEY (\`car_id\`) REFERENCES \`car\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD CONSTRAINT \`FK_0a8eee9d0b33225c938f8927f89\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`car\` ADD CONSTRAINT \`FK_c8d34198d86de9e96aae03b8990\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_00ec72ad98922117bad8a86f980\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`email_token\` ADD CONSTRAINT \`FK_c728d9445f15cd00fb479ad92de\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
