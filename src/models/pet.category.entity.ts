import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pet_category')
export class PetCategory {
  @PrimaryGeneratedColumn({ type: 'int' })
  cat_id: number;

  @Column({ type: 'varchar', length: 128, nullable: false })
  category_name: string;

  @Column({ type: 'tinyint', default: 1 })
  active: boolean;
}
