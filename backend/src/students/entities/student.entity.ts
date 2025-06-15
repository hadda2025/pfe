import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';

@Schema({ timestamps: true })
export class Student extends User {

    @Prop({ required: true })
    numInscription: string;
      @Prop({ required: true })
      parcours: string;
    
}

export const StudentSchema = SchemaFactory.createForClass(Student);
