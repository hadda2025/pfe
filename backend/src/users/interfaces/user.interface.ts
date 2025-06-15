import { Document } from "mongoose"
export interface IUser extends Document {
    readonly firstName: string
    readonly lastName: string
    readonly email: string
    readonly phone: string
    readonly adress: string
    readonly password: string
    role: string
    readonly numInscription:string
    readonly cin:string

    readonly entreprise:string
     readonly _id:string
     readonly refreshToken:string
     
     readonly sujetfinetude:string

     readonly dateCreation:string
     
    readonly classeDepartement:string
    
    readonly statut:string

}