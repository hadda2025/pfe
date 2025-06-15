import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Student } from "src/students/entities/student.entity";
import { Teacher } from "src/teachers/entities/teacher.entity";
import * as argon2 from 'argon2';
import { SchemaTypes, Types } from "mongoose";


@Schema({ timestamps: true })
export class User {

    @Prop({ required: true, type: String, enum: ['Student', 'Teacher','Admin',"Agent"] })
    
    @Prop({ required: true })
    role: string

    @Prop({ required: true })
    firstName: string
    @Prop({ required: true })
    lastName: string
    @Prop({ required: true, unique: true })
    email: string
    @Prop({ required: true })
    phone: string
    @Prop({ required: true })
    adress: string
    @Prop({ required: true })
    password: string
  
    @Prop({ required: false })
    cin: string
    @Prop({ required: false })
    dateCreation: string
    
    @Prop({ required: false })
    statut: string

    @Prop({ required: false })
    classeDepartement: string
    @Prop()
    refreshToken: string


    @Prop([{ type: SchemaTypes.ObjectId, ref: "soutenances" }])
    soutenance: Types.ObjectId[]


}
export const UserSchema = SchemaFactory.createForClass(User).pre('save', async function () {
    this.password = await argon2.hash(this.password)
})