import { IsNotEmpty, IsString, MaxLength, IsNumber, IsDate, ValidateNested, IsDefined, IsNotEmptyObject } from 'class-validator';
import { Type as TypeClass } from 'class-transformer';
import { Crop } from '../../crop/schemas/crop.schema';
import { Harvesting } from '../schemas/harvesting.schema ';
import { Planting } from '../schemas/planting.schema';
import { Seeding } from '../schemas/seeding.schema';
import { Transplanting } from '../schemas/transplanting.schema';

export class CreateCultureDto {

  readonly crop: Crop;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @TypeClass(() => Seeding)
  readonly seeding: Seeding;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @TypeClass(() => Transplanting)
  readonly transplanting: Transplanting;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @TypeClass(() => Planting)
  readonly planting: Planting;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @TypeClass(() => Harvesting)
  readonly harvesting: Harvesting;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}