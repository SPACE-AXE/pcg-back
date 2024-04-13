import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1713015704257 implements MigrationInterface {
    name = 'Migration1713015704257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`park\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`phone\` varchar(15) NOT NULL, \`lat\` decimal NOT NULL, \`lng\` decimal NOT NULL, \`address\` varchar(100) NOT NULL, \`total_space\` int NOT NULL, \`car_space\` int NOT NULL DEFAULT '0', \`disability_space\` int NOT NULL, \`manage_code\` varchar(100) NOT NULL, UNIQUE INDEX \`IDX_b5ea0947a4727fd7149d9a5345\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_b5ea0947a4727fd7149d9a5345\` ON \`park\``);
        await queryRunner.query(`DROP TABLE \`park\``);
    }

}
