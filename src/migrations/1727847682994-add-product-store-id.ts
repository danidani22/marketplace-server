// Here we alter the product table to include the store relation and fields

import { MigrationInterface, QueryRunner } from "typeorm"

export class AddProductStoreId1727847682994 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "store_id" character varying`);
        await queryRunner.query(`CREATE INDEX "ProductStoreId" ON "product" ("store_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."ProductStoreId"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "store_id"`);
    }

}
