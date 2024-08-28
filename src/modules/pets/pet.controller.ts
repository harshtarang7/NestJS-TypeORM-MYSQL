import { Controller, Get } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetInfo } from 'src/models/pet.info.entity';
import { SuccessResponse } from 'src/common/success.response';
import { ErrorResponse } from 'src/common/error.response';

@Controller('pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get('/get-all-pets')
  async getAllPets(): Promise<SuccessResponse<PetInfo[]> | ErrorResponse> {
    try {
      const petInfo = await this.petService.getAllPets();

      return new SuccessResponse(petInfo);
    } catch (error) {
      return new ErrorResponse(
        'Error occured while fetching the pet info',
        true,
        error,
      );
    }
  }
}
