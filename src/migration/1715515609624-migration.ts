import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1715515609624 implements MigrationInterface {
    name = 'Migration1715515609624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_77d7cc9d95dccd574d71ba221b0\``);
        await queryRunner.query(`DROP INDEX \`IDX_77d7cc9d95dccd574d71ba221b\` ON \`card\``);
        await queryRunner.query(`DROP INDEX \`REL_77d7cc9d95dccd574d71ba221b\` ON \`card\``);
        await queryRunner.query(`ALTER TABLE \`card\` CHANGE \`userId\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD UNIQUE INDEX \`IDX_00ec72ad98922117bad8a86f98\` (\`user_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_00ec72ad98922117bad8a86f98\` ON \`card\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_00ec72ad98922117bad8a86f980\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_00ec72ad98922117bad8a86f980\``);
        await queryRunner.query(`DROP INDEX \`REL_00ec72ad98922117bad8a86f98\` ON \`card\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP INDEX \`IDX_00ec72ad98922117bad8a86f98\``);
        await queryRunner.query(`ALTER TABLE \`card\` CHANGE \`user_id\` \`userId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_77d7cc9d95dccd574d71ba221b\` ON \`card\` (\`userId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_77d7cc9d95dccd574d71ba221b\` ON \`card\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_77d7cc9d95dccd574d71ba221b0\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
