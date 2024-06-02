import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717334750403 implements MigrationInterface {
    name = 'Migration1717334750403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP FOREIGN KEY \`FK_2eb7f73d0b351e7c0f40f4ae8a5\``);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP FOREIGN KEY \`FK_54bc2e36a3aaba62959da73093b\``);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP FOREIGN KEY \`FK_6a454dcd8f1a3b30b6b134c5256\``);
        await queryRunner.query(`ALTER TABLE \`email_token\` CHANGE \`created_at\` \`created_at\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`created_at\` \`created_at\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` CHANGE \`entry_time\` \`entry_time\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD CONSTRAINT \`FK_6a454dcd8f1a3b30b6b134c5256\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD CONSTRAINT \`FK_2eb7f73d0b351e7c0f40f4ae8a5\` FOREIGN KEY (\`parkId\`) REFERENCES \`park\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD CONSTRAINT \`FK_54bc2e36a3aaba62959da73093b\` FOREIGN KEY (\`carId\`) REFERENCES \`car\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP FOREIGN KEY \`FK_54bc2e36a3aaba62959da73093b\``);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP FOREIGN KEY \`FK_2eb7f73d0b351e7c0f40f4ae8a5\``);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` DROP FOREIGN KEY \`FK_6a454dcd8f1a3b30b6b134c5256\``);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` CHANGE \`entry_time\` \`entry_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`email_token\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD CONSTRAINT \`FK_6a454dcd8f1a3b30b6b134c5256\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD CONSTRAINT \`FK_54bc2e36a3aaba62959da73093b\` FOREIGN KEY (\`carId\`) REFERENCES \`car\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`parking_transaction\` ADD CONSTRAINT \`FK_2eb7f73d0b351e7c0f40f4ae8a5\` FOREIGN KEY (\`parkId\`) REFERENCES \`park\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
