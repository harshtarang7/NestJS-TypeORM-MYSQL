import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PetInfo } from './pet.info.entity';

@Entity('pet_owner')
export class PetOwner {
  @PrimaryGeneratedColumn({ type: 'int' })
  owner_id: number;

  @Column({ type: 'varchar', length: 129, nullable: false })
  owner_name: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  owner_city: string;

  @Column({ type: 'int', nullable: false })
  pet_info_id: number;

  @Column({ type: 'tinyint', default: 1 })
  active: boolean;

  @ManyToOne(() => PetInfo, (petInfo) => petInfo.owner, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'pet_info_id' })
  pet: PetInfo;
}
