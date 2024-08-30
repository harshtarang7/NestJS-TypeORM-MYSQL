import { IsNotEmpty } from 'class-validator';

export class FetchPetOwnerIdRequestDTO {
  @IsNotEmpty()
  owner_id: number;
}
