import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PetCategory } from '../../models/pet.category.entity';
import { Repository } from 'typeorm';
import { PetInfo } from '../../models/pet.info.entity';
import { PetOwner } from '../../models/pet.owner.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(PetCategory)
    private readonly petCategoryRepository: Repository<PetCategory>,
    @InjectRepository(PetInfo)
    private readonly petInfoRepository: Repository<PetInfo>,
    @InjectRepository(PetOwner)
    private readonly petOwnerRepository: Repository<PetOwner>,
  ) {}

  async getAllPets(): Promise<PetInfo[]> {
    try {
      const allPets = await this.petInfoRepository.find();
      return allPets;
    } catch (error) {
      throw error;
    }
  }
}
