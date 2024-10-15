// Here we alter the order table to include a order parent relation

import { MigrationInterface, QueryRunner } from "typeorm"

export class AddOrderChildren1728356974281 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "order_parent_id" character varying`)
        await queryRunner.query(`CREATE INDEX "OrderParentId" ON "order" ("order_parent_id")`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."OrderParentId"`)
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "order_parent_id"`)
    }

}
