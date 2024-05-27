import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1715928669437 implements MigrationInterface {
  name = 'Migration1715928669437';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`parking_transaction\` ADD \`is_paid\` tinyint NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`parking_transaction\` DROP COLUMN \`is_paid\``,
    );
  }
}
