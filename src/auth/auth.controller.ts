import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto'

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }
    @Get()
  getHello(): string {
    return 'this.appService.getHello()';
  }

    @Post() 
    async login(@Body() loginUserDto: LoginUserDto){
        return await this.authService.validateUserByPassword(loginUserDto);
    }

}