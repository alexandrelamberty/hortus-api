import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Plant } from '../../plants/schemas/plant.schema';

export type CropDocument = Crop & Document;

@Schema()
export class Crop {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Plant',
    required: true,
  })
  plant: Plant;
}

export const CropSchema = SchemaFactory.createForClass(Crop);