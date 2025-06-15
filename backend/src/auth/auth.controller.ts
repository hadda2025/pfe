import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CreatEmailDto } from './create-email.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid credentials' })
  async login(@Body() createLoginDto: CreateLoginDto) {

    return this.authService.signIn(createLoginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

@ApiBearerAuth('access-token') 
@UseGuards(AuthGuard("jwt"))
  @Get('logout')
  logout(@Req() req: Request) {
    const user = req.user as { sub: string };
    return this.authService.logout(user.sub);
  }


  @Patch("updatepassword/:id")
  async updatePassword(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return await this.authService.updatePass(id, UpdateUserDto)
  }
  @Patch('updateProfile/:id')
  async updateProfil(@Param('id') id: string
    , @Body() updateUserDto: UpdateUserDto) {
    return await this.authService.updateProfile(id, updateUserDto)
  }

 @Post('resetpassword')
async resetPassword(@Body() createEmailDto: CreatEmailDto) {
  const tokenPassword = Math.floor(10000 + Math.random() * 9000000).toString();
  await this.authService.resetPassword({ email: createEmailDto.email }, tokenPassword);

  return {
    message: 'Le nouveau mot de passe a été envoyé par email.'
  };
}
}
