import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1715927977356 implements MigrationInterface {
  name = 'Migration1715927977356';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`parking_transaction\` CHANGE \`charge_time\` \`charge_time\` int NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`parking_transaction\` CHANGE \`charge_time\` \`charge_time\` int NOT NULL`,
    );
  }
}
