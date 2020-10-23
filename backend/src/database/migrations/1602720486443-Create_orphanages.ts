import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrphanages1602720486443 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
    name:'orphanages',
    columns:[
            {
              name: 'id',
              type: 'integer',
              isUnique:true,
              isPrimary:true,
              isGenerated:true,
              generationStrategy:'increment'
            },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'latitude',
            type: 'decimal',
            scale:10,
            precision:2
          },
            {
              name: 'longitude',
              type: 'decimal',
              scale:10,
              precision:2
            },
            {
              name: 'about',
              type: 'text',
            },
            {
              name: 'instructions',
              type: 'text',
            },{
              name: 'open_on_weekend',
              type:'boolean'
            },
             {
              name: 'opening_hours',
              type:'varchar'
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            }

  ]
}))
}

public async down(queryRunner: QueryRunner): Promise<void> {
  await queryRunner.dropTable('orphanages')
}

}
