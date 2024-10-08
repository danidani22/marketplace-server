import { MigrationInterface, QueryRunner } from "typeorm"

export class AddOrderStoreId1728349866589 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "order" ADD "store_id" character varying`
        );
        await queryRunner.query(
            `CREATE INDEX "OrderStoreId" ON "order" ("store_id") `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP INDEX "public"."OrderStoreId"`
        )
        await queryRunner.query(
            `ALTER TABLE "user" DROP COLUMN "store_id"`
        )
    }

}
