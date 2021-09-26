import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './user.schema';
import { RolesGuard } from './roles.guards';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },,]
})
export class UsersModule {}
