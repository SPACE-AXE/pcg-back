import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1713615613493 implements MigrationInterface {
  name = 'Migration1713615613493';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`nickname\` varchar(20) NOT NULL, \`email\` varchar(100) NOT NULL, \`username\` varchar(20) NOT NULL, \`password\` varchar(200) NOT NULL, \`birth\` date NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, UNIQUE INDEX \`IDX_e2364281027b926b879fa2fa1e\` (\`nickname\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`park\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`phone\` varchar(15) NOT NULL, \`address\` varchar(100) NOT NULL, \`total_space\` int NOT NULL, \`car_space\` int NOT NULL DEFAULT '0', \`disability_space\` int NOT NULL, \`manage_code\` varchar(100) NOT NULL, \`location\` point NOT NULL, UNIQUE INDEX \`IDX_b5ea0947a4727fd7149d9a5345\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_b5ea0947a4727fd7149d9a5345\` ON \`park\``,
    );
    await queryRunner.query(`DROP TABLE \`park\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e2364281027b926b879fa2fa1e\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
