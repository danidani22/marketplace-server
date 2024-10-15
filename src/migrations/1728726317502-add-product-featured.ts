// Here we alter the product table to add our featured field

import { MigrationInterface, QueryRunner } from "typeorm"

export class AddProductFeatured1728726317502 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "featured" boolean DEFAULT false`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "featured"`)
    }

}
