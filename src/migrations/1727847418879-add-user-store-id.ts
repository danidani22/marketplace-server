// Here we add the store relation and fields to the user

import { MigrationInterface, QueryRunner } from "typeorm"

export class AddUserStoreId1727847418879 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `ALTER TABLE "user" ADD "store_id" character varying`
        )
        await queryRunner.query(
          `CREATE INDEX "UserStoreId" ON "user" ("store_id")`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `DROP INDEX "public"."UserStoreId"`
        )
        await queryRunner.query(
          `ALTER TABLE "user" DROP COLUMN "store_id"`
        )
    }

}
