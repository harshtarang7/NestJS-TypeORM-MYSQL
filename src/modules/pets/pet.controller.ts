import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetInfo } from 'src/models/pet.info.entity';
import { SuccessResponse } from 'src/common/success.response';
import { ErrorResponse, NoDataFound } from 'src/common/error.response';
import { PetCategoryRequestDTo } from './dto/pet.category.dto';
import { PetCategory } from 'src/models/pet.category.entity';

@Controller('pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get('/get-all-pets')
  async getAllPets(): Promise<SuccessResponse<PetInfo[]> | ErrorResponse> {
    try {
      const petInfo = await this.petService.getAllPets();
      return new SuccessResponse(petInfo);
    } catch (error) {
      if (error instanceof NoDataFound) {
        return new ErrorResponse(error.message, true);
      } else {
        return new ErrorResponse(
          'Error occured while fetching the pet info',
          true,
          error,
        );
      }
    }
  }

  @Post('/add-pet-category')
  async AddPetCategory(
    @Body(new ValidationPipe()) dto: PetCategoryRequestDTo,
  ): Promise<SuccessResponse<PetCategory> | ErrorResponse> {
    try {
      const newCategory = await this.petService.AddPetCategory(
        dto.category_name,
      );
      return new SuccessResponse(newCategory);
    } catch (error) {
      console.log(error);
      return new ErrorResponse(
        'error occured while adding the category',
        true,
        error,
      );
    }
  }
}
