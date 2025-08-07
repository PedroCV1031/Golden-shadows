import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'Cases' })
export class Case extends Document {
  @Prop({ required: true })
  caseId: string;

  @Prop({ type: [String] }) 
  victimNames: string[];

  @Prop()
  detectives: string[];

  @Prop({ type: [String] })  
  murderMethods: string[];

  @Prop()
  relatedCases: string[];
}

export const CaseSchema = SchemaFactory.createForClass(Case);
