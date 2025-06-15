

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { Encadrant } from "src/encadrants/entities/encadrant.entity";

import { User } from "src/users/entities/user.entity";

@Schema({ timestamps: true })
export class Teacher extends User {
    
    


    
    @Prop({ required: false })
    matricule: string
    @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'sujetfinetudes' }] })
    sujet: Types.ObjectId[];



}
export const teacherSchema = SchemaFactory.createForClass(Teacher)