import { IsMACAddress , IsString, IsIP, IsNotEmpty, MinLength } from 'class-validator';

export class CreateSensorDto {
  @IsNotEmpty()
  @MinLength(5)
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsIP()
  readonly ip: string;

  @IsNotEmpty()
  @IsMACAddress()
  readonly macaddress: string;
}