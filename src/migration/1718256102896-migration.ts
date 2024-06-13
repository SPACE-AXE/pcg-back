import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1718256102896 implements MigrationInterface {
  name = 'Migration1718256102896';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table if exists card;`);
    await queryRunner.query(
      `CREATE TABLE \`card\` (\`id\` int NOT NULL AUTO_INCREMENT, \`number\` varchar(100) NOT NULL, \`expiry_year\` varchar(2) NOT NULL, \`expiry_month\` varchar(2) NOT NULL, \`user_id\` int NOT NULL, UNIQUE INDEX \`IDX_59e0ec91c0cc35060bb0da876f\` (\`number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`card\` ADD CONSTRAINT \`FK_00ec72ad98922117bad8a86f980\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_00ec72ad98922117bad8a86f980\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_59e0ec91c0cc35060bb0da876f\` ON \`card\``,
    );
    await queryRunner.query(`DROP TABLE \`card\``);
  }
}
