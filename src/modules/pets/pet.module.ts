import { Module } from '@nestjs/common';
import { PetCategory } from 'src/models/pet.category.entity';
import { PetInfo } from 'src/models/pet.info.entity';
import { PetOwner } from 'src/models/pet.owner.entity';
import { PetService } from './pet.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PetInfo, PetCategory, PetOwner])],
  providers: [PetService],
  exports: [PetService],
})
export class PetModule {}
