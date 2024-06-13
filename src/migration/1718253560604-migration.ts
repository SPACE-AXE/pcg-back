import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1718253560604 implements MigrationInterface {
  name = 'Migration1718253560604';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE card DROP FOREIGN KEY FK_00ec72ad98922117bad8a86f980`,
    );

    // 유니크 인덱스 제거
    await queryRunner.query(
      `ALTER TABLE card DROP INDEX REL_00ec72ad98922117bad8a86f98`,
    );

    // 외래 키 제약 조건 복구 (필요한 경우)
    await queryRunner.query(
      `ALTER TABLE card ADD CONSTRAINT FK_00ec72ad98922117bad8a86f980 FOREIGN KEY (user_id) REFERENCES user (id) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 외래 키 제약 조건 제거
    await queryRunner.query(
      `ALTER TABLE card DROP CONSTRAINT FK_00ec72ad98922117bad8a86f980`,
    );

    // 유니크 인덱스 복구
    await queryRunner.query(
      `ALTER TABLE card ADD CONSTRAINT REL_00ec72ad98922117bad8a86f98 UNIQUE (user_id)`,
    );

    // 외래 키 제약 조건 복구
    await queryRunner.query(
      `ALTER TABLE card ADD CONSTRAINT FK_00ec72ad98922117bad8a86f980 FOREIGN KEY (user_id) REFERENCES user (id) NOT NULL`,
    );
  }
}
