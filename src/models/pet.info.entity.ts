import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PetCategory } from './pet.category.entity';
import { PetOwner } from './pet.owner.entity';

@Entity('pet_info')
export class PetInfo {
  @PrimaryGeneratedColumn({ type: 'int' })
  info_id: number;

  @Column({ type: 'int', nullable: false })
  cat_id: number;

  @Column({ type: 'varchar', length: 128, nullable: false })
  pet_name: string;

  @Column({ type: 'int', nullable: false })
  owner_id: number;

  @Column({ type: 'datetime', nullable: false })
  birthdate: Date;

  @Column({ type: 'varchar', length: 45, nullable: false })
  gender: string;

  @ManyToOne(() => PetCategory, (petCategory) => petCategory.cat_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'cat_id' })
  category: PetCategory;

  @ManyToOne(() => PetOwner, (petOwner) => petOwner.pet, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'owner_id' })
  owner: PetOwner;
}
