import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

type JwtPayload={
sub:string,
email:string
}
@Injectable()
export class AccessTokenStrategiy extends PassportStrategy(Strategy, 'jwt'){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.Access_TOKEN_SECRET as string
        })
    }
    validate(payload:JwtPayload){
        return payload
    }
}
