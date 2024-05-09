import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1715222019465 implements MigrationInterface {
  name = 'Migration1715222019465';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`card\` (\`id\` int NOT NULL AUTO_INCREMENT, \`number\` varchar(30) NOT NULL, \`expiry_year\` varchar(2) NOT NULL, \`expiry_month\` varchar(2) NOT NULL, \`userId\` int NULL, UNIQUE INDEX \`IDX_59e0ec91c0cc35060bb0da876f\` (\`number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`park\` ADD \`ip\` varchar(20) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`card\` ADD CONSTRAINT \`FK_77d7cc9d95dccd574d71ba221b0\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_77d7cc9d95dccd574d71ba221b0\``,
    );
    await queryRunner.query(`ALTER TABLE \`park\` DROP COLUMN \`ip\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_59e0ec91c0cc35060bb0da876f\` ON \`card\``,
    );
    await queryRunner.query(`DROP TABLE \`card\``);
  }
}
