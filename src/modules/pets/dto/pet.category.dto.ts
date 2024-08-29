import { IsNotEmpty } from 'class-validator';

export class PetCategoryRequestDTo {
  @IsNotEmpty()
  category_name: string;
}
