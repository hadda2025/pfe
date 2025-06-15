import { Document } from "mongoose"


export interface ISession extends Document {
    readonly namesession: string
    readonly dateD: Date
    readonly dateF: Date
    readonly Filiere:string
}