// Here we alter the shipping profile table to include the store relation

import { MigrationInterface, QueryRunner } from "typeorm"

export class AddShippingProfileStoreId1728354944481 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipping_profile" ADD "store_id" character varying`)
        await queryRunner.query(`CREATE INDEX "ShippingProfileStoreId" ON "shipping_profile" ("store_id")`)
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."ShippingProfileStoreId"`)
        await queryRunner.query(`ALTER TABLE "shipping_profile" DROP COLUMN "store_id"`)
    }

}
