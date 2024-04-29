import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1713850625261 implements MigrationInterface {
  name = 'Migration1713850625261';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`email_token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(25) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`email_token\``);
  }
}
