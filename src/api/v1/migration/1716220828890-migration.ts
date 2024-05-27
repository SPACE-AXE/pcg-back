import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1716220828890 implements MigrationInterface {
  name = 'Migration1716220828890';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`parking_transaction\` ADD \`payment_id\` varchar(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`parking_transaction\` ADD UNIQUE INDEX \`IDX_57e603e30b535dda516831ae3a\` (\`payment_id\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`parking_transaction\` DROP INDEX \`IDX_57e603e30b535dda516831ae3a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`parking_transaction\` DROP COLUMN \`payment_id\``,
    );
  }
}
