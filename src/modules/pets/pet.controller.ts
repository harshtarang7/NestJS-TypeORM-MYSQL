import { Controller, Get } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetInfo } from 'src/models/pet.info.entity';

@Controller('pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get('/get-all-pets')
  async getAllPets(): Promise<PetInfo[]> {
    try {
      return this.petService.getAllPets();
    } catch (error) {
      throw error;
    }
  }
}
