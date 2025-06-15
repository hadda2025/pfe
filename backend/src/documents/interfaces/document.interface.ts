import { Document } from "mongoose"

  
  
  export interface IDocument extends Document {
    readonly name: string
    readonly type: string
    readonly fileUrl: string
    readonly soutenance: string
    
}