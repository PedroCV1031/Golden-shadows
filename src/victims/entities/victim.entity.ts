import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'Victims' })
export class Victim extends Document{
  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;

  @Prop()
  family: string;

  @Prop()
  murderMethod: string;

  @Prop()
  caseId: string;
}

export const VictimSchema = 
SchemaFactory.createForClass(Victim);