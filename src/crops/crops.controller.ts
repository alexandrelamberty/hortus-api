import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CropsService } from './crops.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { Crop } from './schemas/crop.schema';

@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) { }

  // @Post()
  // create(@Body() createPlantationDto: CreateCropDto) {
  //   return this.cropsService.create(createPlantationDto);
  // }

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  create(
    @Body() createPlantationDto: CreateCropDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    //file: file.buffer.toString();
    return this.cropsService.create(createPlantationDto);
  }

  @Get()
  findAll() {
    return this.cropsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cropsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCropDto: UpdateCropDto) {
    return this.cropsService.update(id, updateCropDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cropsService.delete(id);
  }
}