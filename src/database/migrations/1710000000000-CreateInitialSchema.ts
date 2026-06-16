import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateInitialSchema1710000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'situations',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'nameSituation', type: 'varchar', length: '255' },
          { name: 'createdAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
          { name: 'updatedAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }
        ]
      })
    );
    await queryRunner.createIndex('situations', new TableIndex({ name: 'IDX_situations_nameSituation', columnNames: ['nameSituation'] }));

    await queryRunner.createTable(
      new Table({
        name: 'product_categories',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'name', type: 'varchar', length: '255' },
          { name: 'createdAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
          { name: 'updatedAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }
        ]
      })
    );
    await queryRunner.createIndex('product_categories', new TableIndex({ name: 'IDX_product_categories_name', columnNames: ['name'] }));

    await queryRunner.createTable(
      new Table({
        name: 'product_situations',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'name', type: 'varchar', length: '255' },
          { name: 'createdAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
          { name: 'updatedAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }
        ]
      })
    );
    await queryRunner.createIndex('product_situations', new TableIndex({ name: 'IDX_product_situations_name', columnNames: ['name'] }));

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'name', type: 'varchar', length: '255' },
          { name: 'email', type: 'varchar', length: '255', isUnique: true },
          { name: 'password', type: 'varchar', length: '255' },
          { name: 'recoverPassword', type: 'varchar', length: '255', isNullable: true },
          { name: 'situationId', type: 'int' },
          { name: 'createdAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
          { name: 'updatedAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }
        ]
      })
    );
    await queryRunner.createIndex('users', new TableIndex({ name: 'IDX_users_situationId', columnNames: ['situationId'] }));
    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'FK_users_situations',
        columnNames: ['situationId'],
        referencedTableName: 'situations',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'name', type: 'varchar', length: '255' },
          { name: 'slug', type: 'varchar', length: '255', isUnique: true },
          { name: 'description', type: 'longtext', isNullable: true },
          { name: 'price', type: 'decimal', precision: 10, scale: 2 },
          { name: 'productSituationId', type: 'int' },
          { name: 'productCategoryId', type: 'int' },
          { name: 'createdAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
          { name: 'updatedAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }
        ]
      })
    );
    await queryRunner.createIndex('products', new TableIndex({ name: 'IDX_products_productSituationId', columnNames: ['productSituationId'] }));
    await queryRunner.createIndex('products', new TableIndex({ name: 'IDX_products_productCategoryId', columnNames: ['productCategoryId'] }));
    await queryRunner.createForeignKeys('products', [
      new TableForeignKey({
        name: 'FK_products_product_situations',
        columnNames: ['productSituationId'],
        referencedTableName: 'product_situations',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      }),
      new TableForeignKey({
        name: 'FK_products_product_categories',
        columnNames: ['productCategoryId'],
        referencedTableName: 'product_categories',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products', true);
    await queryRunner.dropTable('users', true);
    await queryRunner.dropTable('product_situations', true);
    await queryRunner.dropTable('product_categories', true);
    await queryRunner.dropTable('situations', true);
  }
}
