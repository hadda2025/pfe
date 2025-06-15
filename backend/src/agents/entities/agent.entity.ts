import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

import { Document } from 'mongoose';
import * as argon2 from 'argon2';

@Schema({ timestamps: true })

export class Agent {
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
          
            @Prop({ required: true })
            cin: string
           
    
    }
    export const AgentSchema = SchemaFactory.createForClass(Agent);

