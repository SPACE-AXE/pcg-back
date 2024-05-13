import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1715609504113 implements MigrationInterface {
    name = 'Migration1715609504113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_59e0ec91c0cc35060bb0da876f\` ON \`card\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP COLUMN \`number\``);
        await queryRunner.query(`ALTER TABLE \`card\` ADD \`number\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD UNIQUE INDEX \`IDX_59e0ec91c0cc35060bb0da876f\` (\`number\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card\` DROP INDEX \`IDX_59e0ec91c0cc35060bb0da876f\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP COLUMN \`number\``);
        await queryRunner.query(`ALTER TABLE \`card\` ADD \`number\` varchar(30) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_59e0ec91c0cc35060bb0da876f\` ON \`card\` (\`number\`)`);
    }

}
