import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1715609084127 implements MigrationInterface {
  name = 'Migration1715609084127';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_c728d9445f15cd00fb479ad92d\` ON \`email_token\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_c728d9445f15cd00fb479ad92d\` ON \`email_token\` (\`user_id\`)`,
    );
  }
}
