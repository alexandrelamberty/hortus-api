import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePlantDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly binomial: string;

  @IsString()
  @MaxLength(255)
  readonly family: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly genus: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly species: string;

  readonly subspecies: string;
  readonly variety: string;
  readonly forma: string;
  readonly cultivar: string;
  readonly hybrid: string;
  picture: string;
}
