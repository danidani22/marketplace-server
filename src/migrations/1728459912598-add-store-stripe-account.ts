import { MigrationInterface, QueryRunner } from "typeorm"

export class AddStoreStripeAccount1728459912598 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" ADD "stripe_account_id" character varying`)
        await queryRunner.query(`ALTER TABLE "store" ADD "stripe_account_enabled" boolean NOT NULL DEFAULT false`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "stripe_account_id"`)
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "stripe_account_enabled"`)
    }

}
