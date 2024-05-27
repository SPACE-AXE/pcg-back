import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1715511010702 implements MigrationInterface {
  name = 'Migration1715511010702';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`parking_transaction\` DROP FOREIGN KEY \`FK_237b340bd1e5a81eb26f8e3ba6d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`parking_transaction\` CHANGE \`car_id\` \`car_num\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`parking_transaction\` ADD CONSTRAINT \`FK_6df406b3678a5eec73c8b4e9477\` FOREIGN KEY (\`car_num\`) REFERENCES \`car\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`parking_transaction\` DROP FOREIGN KEY \`FK_6df406b3678a5eec73c8b4e9477\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`parking_transaction\` CHANGE \`car_num\` \`car_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`parking_transaction\` ADD CONSTRAINT \`FK_237b340bd1e5a81eb26f8e3ba6d\` FOREIGN KEY (\`car_id\`) REFERENCES \`car\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
