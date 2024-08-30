import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PetCategory } from '../../models/pet.category.entity';
import { Repository } from 'typeorm';
import { PetInfo } from '../../models/pet.info.entity';
import { PetOwner } from '../../models/pet.owner.entity';
import { NoDataFound } from 'src/common/error.response';

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
      if (!allPets) {
        throw new NoDataFound('no data found of pet info');
      }
      return allPets;
    } catch (error) {
      throw error;
    }
  }

  async AddPetCategory(categoryName: string): Promise<PetCategory> {
    try {
      const newCategory = new PetCategory();
      newCategory.category_name = categoryName;
      return await this.petCategoryRepository.save(newCategory);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async fetchPetOwnerById(ownerId: number): Promise<PetOwner> {
    try {
      const petOwner = await this.petOwnerRepository.findOne({
        where: { owner_id: ownerId },
      });
      if (!petOwner) {
        throw new NoDataFound('no data found with this owner id');
      }
      return petOwner;
    } catch (error) {
      throw error;
    }
  }
}
