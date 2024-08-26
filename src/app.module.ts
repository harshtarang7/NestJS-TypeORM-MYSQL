import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './config/dbConfig';
import { PetModule } from './modules/pets/pet.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig()), PetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
