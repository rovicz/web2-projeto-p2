import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProductCategory } from './ProductCategory';
import { ProductSituation } from './ProductSituation';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Index('UQ_products_slug', { unique: true })
  @Column({ type: 'varchar', length: 255 })
  slug!: string;

  @Column({ type: 'longtext', nullable: true })
  description!: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: string;

  @Index('IDX_products_productSituationId')
  @Column({ type: 'int' })
  productSituationId!: number;

  @Index('IDX_products_productCategoryId')
  @Column({ type: 'int' })
  productCategoryId!: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @ManyToOne(() => ProductSituation, (productSituation) => productSituation.products, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'productSituationId' })
  productSituation!: ProductSituation;

  @ManyToOne(() => ProductCategory, (productCategory) => productCategory.products, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'productCategoryId' })
  productCategory!: ProductCategory;
}
