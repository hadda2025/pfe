import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import *  as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateLoginDto } from './dto/create-login.dto';
@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private mailerService: MailerService
    ) { }

    async generateToken(userId: string, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email
                },
                {
                    secret: this.configService.get<string>('Access_TOKEN_SECRET'),
                    expiresIn: "30d"

                }

            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email
                },
                {
                    secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
                    expiresIn: '30d'

                }

            )
        ])
        return { accessToken, refreshToken }
    }
    //add refreshToken to the connect user
    async updateRereshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await argon2.hash(refreshToken)
        await this.usersService.update(userId, { refreshToken: hashedRefreshToken })

    }
    async logout(userId: string) {
        await this.usersService.update(userId, { refreshToken: null })

    }
    async updatePass(userId: string, updateUserDto: UpdateUserDto) {

        const user = await this.usersService.findOne(userId)
        if (!user) throw new NotFoundException("User does not found")

        if (!updateUserDto.password) {
            throw new BadRequestException("Password is required");
        }
        const hashedPassword = await argon2.hash(updateUserDto.password)
        await this.usersService.update(userId, { ...updateUserDto, password: hashedPassword })
        const tokens = await this.generateToken(user._id, user.email)
        //appel add refreshToken to user
        await this.updateRereshToken(user._id, tokens.refreshToken)
        return { user, tokens }

    }
    async updateProfile(userId: string, updateUserDto: UpdateUserDto) {
        const user = await this.usersService.update(userId, updateUserDto)
        if (!user) throw new NotFoundException("User does not found")
        const tokens = await this.generateToken(user._id, user.email)
        //appel add refreshToken to user
        await this.updateRereshToken(user._id, tokens.refreshToken)
        return { user, tokens }
    }

   async resetPassword(payload: { email: string }, tokenPassword: string) {
  const user = await this.usersService.findUserByEmail(payload.email);
  if (!user) throw new NotFoundException('Utilisateur introuvable');

  await this.mailerService.sendMail({
    to: user.email,
    template: './resetPassword',
    context: {
      name: user.firstName,
      email: user.email,
      newPassword: tokenPassword
    }
  });

  const hashedPassword = await argon2.hash(tokenPassword);
  await this.usersService.findUserAndResetPassword({ email: user.email }, { password: hashedPassword });
}

    async register(createUserDto: CreateUserDto) {
        const existingUser = await this.usersService.findUserByEmailForLogin(createUserDto.email);
        if (existingUser) {
            throw new BadRequestException('User already exists with this email');
        }

        const newUser = await this.usersService.create({
            ...createUserDto
        });

        const tokens = await this.generateToken(newUser._id, newUser.email);
        await this.updateRereshToken(newUser._id, tokens.refreshToken);

        return { user: newUser, tokens };
    }
    /**
     * 
     * @param createLoginDto 
     * @returns 
     */
    async signIn(createLoginDto: CreateLoginDto) {
        // Récupérer l'utilisateur avec l'email
        const user = await this.usersService.findUserByEmail(createLoginDto.email);
        if (!user) throw new BadRequestException('User not found');

        // Afficher dans les logs le hash du mot de passe stocké et le mot de passe entré
        console.log('Hash from DB:', user.password);
        console.log('Password entered:', createLoginDto.password);

        // Comparer le mot de passe entré avec le hash stocké dans la base de données
        const passwordMatches = await argon2.verify(user.password, createLoginDto.password);
        console.log("passwordMatches ", passwordMatches); // Afficher si le mot de passe correspond

        // Si les mots de passe ne correspondent pas, envoyer une erreur
        if (!passwordMatches) throw new BadRequestException('Password is incorrect');

        // Si le mot de passe est correct, générer les tokens
        const tokens = await this.generateToken(user._id, user.email);

        // Mettre à jour le refresh token de l'utilisateur
        await this.updateRereshToken(user._id, tokens.refreshToken);

        return { user, tokens };
    }


}

