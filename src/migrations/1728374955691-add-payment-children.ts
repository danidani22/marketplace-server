// Here we alter the payment table to include a payment parent relation

import { MigrationInterface, QueryRunner } from "typeorm"

export class AddPaymentChildren1728374955691 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ADD "payment_parent_id" character varying`)
        await queryRunner.query(`CREATE INDEX "PaymentParentId" ON "payment" ("payment_parent_id")`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."PaymentParentId"`)
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "payment_parent_id"`)
    }

}
