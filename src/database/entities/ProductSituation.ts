import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Product } from './Product';

@Entity('product_situations')
export class ProductSituation {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Index('IDX_product_situations_name')
  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @OneToMany(() => Product, (product) => product.productSituation)
  products!: Product[];
}
