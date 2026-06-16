import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';

@Entity('situations')
export class Situation {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Index('IDX_situations_nameSituation')
  @Column({ type: 'varchar', length: 255 })
  nameSituation!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @OneToMany(() => User, (user) => user.situation)
  users!: User[];
}
