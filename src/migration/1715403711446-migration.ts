import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1715403711446 implements MigrationInterface {
  name = 'Migration1715403711446';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`email_token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(50) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`user_id\` int NULL, UNIQUE INDEX \`REL_c728d9445f15cd00fb479ad92d\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`nickname\` varchar(20) NOT NULL, \`email\` varchar(100) NOT NULL, \`username\` varchar(20) NOT NULL, \`password\` varchar(200) NOT NULL, \`birth\` date NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, UNIQUE INDEX \`IDX_e2364281027b926b879fa2fa1e\` (\`nickname\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`card\` (\`id\` int NOT NULL AUTO_INCREMENT, \`number\` varchar(30) NOT NULL, \`expiry_year\` varchar(2) NOT NULL, \`expiry_month\` varchar(2) NOT NULL, \`user_id\` int NULL, UNIQUE INDEX \`IDX_59e0ec91c0cc35060bb0da876f\` (\`number\`), UNIQUE INDEX \`REL_00ec72ad98922117bad8a86f98\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`car\` (\`id\` int NOT NULL AUTO_INCREMENT, \`car_num\` varchar(15) NOT NULL, \`user_id\` int NULL, UNIQUE INDEX \`IDX_f561f846f040ec717bc90de267\` (\`car_num\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`park\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`phone\` varchar(15) NOT NULL, \`address\` varchar(100) NOT NULL, \`total_space\` int NOT NULL, \`car_space\` int NOT NULL DEFAULT '0', \`disability_space\` int NOT NULL, \`manage_code\` varchar(100) NOT NULL, \`location\` point NOT NULL, \`ip\` varchar(20) NOT NULL, UNIQUE INDEX \`IDX_b5ea0947a4727fd7149d9a5345\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`parking_transaction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`entry_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`exit_time\` datetime NULL, \`payment_time\` datetime NULL, \`charge_amount\` int NULL, \`amount\` int NULL, \`user_id\` int NULL, \`park_id\` int NULL, \`car_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`email_token\` ADD CONSTRAINT \`FK_c728d9445f15cd00fb479ad92de\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`card\` ADD CONSTRAINT \`FK_00ec72ad98922117bad8a86f980\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`car\` ADD CONSTRAINT \`FK_c8d34198d86de9e96aae03b8990\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`parking_transaction\` ADD CONSTRAINT \`FK_0a8eee9d0b33225c938f8927f89\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`parking_transaction\` ADD CONSTRAINT \`FK_f73ecf8aec00a7f79e83ebde2d9\` FOREIGN KEY (\`park_id\`) REFERENCES \`park\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`parking_transaction\` ADD CONSTRAINT \`FK_237b340bd1e5a81eb26f8e3ba6d\` FOREIGN KEY (\`car_id\`) REFERENCES \`car\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`parking_transaction\` DROP FOREIGN KEY \`FK_237b340bd1e5a81eb26f8e3ba6d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`parking_transaction\` DROP FOREIGN KEY \`FK_f73ecf8aec00a7f79e83ebde2d9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`parking_transaction\` DROP FOREIGN KEY \`FK_0a8eee9d0b33225c938f8927f89\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`car\` DROP FOREIGN KEY \`FK_c8d34198d86de9e96aae03b8990\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_00ec72ad98922117bad8a86f980\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`email_token\` DROP FOREIGN KEY \`FK_c728d9445f15cd00fb479ad92de\``,
    );
    await queryRunner.query(`DROP TABLE \`parking_transaction\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_b5ea0947a4727fd7149d9a5345\` ON \`park\``,
    );
    await queryRunner.query(`DROP TABLE \`park\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_f561f846f040ec717bc90de267\` ON \`car\``,
    );
    await queryRunner.query(`DROP TABLE \`car\``);
    await queryRunner.query(
      `DROP INDEX \`REL_00ec72ad98922117bad8a86f98\` ON \`card\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_59e0ec91c0cc35060bb0da876f\` ON \`card\``,
    );
    await queryRunner.query(`DROP TABLE \`card\``);
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
    await queryRunner.query(
      `DROP INDEX \`REL_c728d9445f15cd00fb479ad92d\` ON \`email_token\``,
    );
    await queryRunner.query(`DROP TABLE \`email_token\``);
  }
}
