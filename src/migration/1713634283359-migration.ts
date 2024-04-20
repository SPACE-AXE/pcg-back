import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1713634283359 implements MigrationInterface {
    name = 'Migration1713634283359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`car\` (\`id\` int NOT NULL AUTO_INCREMENT, \`car_num\` varchar(15) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`car\` ADD CONSTRAINT \`FK_a4f3cb1b950608959ba75e8df36\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`car\` DROP FOREIGN KEY \`FK_a4f3cb1b950608959ba75e8df36\``);
        await queryRunner.query(`DROP TABLE \`car\``);
    }

}
