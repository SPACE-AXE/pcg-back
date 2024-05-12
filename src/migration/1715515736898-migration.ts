import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1715515736898 implements MigrationInterface {
    name = 'Migration1715515736898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_00ec72ad98922117bad8a86f98\` ON \`card\``);
        await queryRunner.query(`ALTER TABLE \`email_token\` ADD \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`email_token\` ADD UNIQUE INDEX \`IDX_c728d9445f15cd00fb479ad92d\` (\`user_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_c728d9445f15cd00fb479ad92d\` ON \`email_token\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`email_token\` ADD CONSTRAINT \`FK_c728d9445f15cd00fb479ad92de\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_token\` DROP FOREIGN KEY \`FK_c728d9445f15cd00fb479ad92de\``);
        await queryRunner.query(`DROP INDEX \`REL_c728d9445f15cd00fb479ad92d\` ON \`email_token\``);
        await queryRunner.query(`ALTER TABLE \`email_token\` DROP INDEX \`IDX_c728d9445f15cd00fb479ad92d\``);
        await queryRunner.query(`ALTER TABLE \`email_token\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_00ec72ad98922117bad8a86f98\` ON \`card\` (\`user_id\`)`);
    }

}
