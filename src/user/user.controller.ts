import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Resource, Roles, Scopes, Unprotected } from 'nest-keycloak-connect';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/public')
  @Unprotected()
  getpublic(): string {
    return `${this.userService.getHello()} from public`;
  }

  @Get('/user')
  @Roles({ roles: ['manage-account'] })
  getUser(): string {
    return `${this.userService.getHello()} from user`;
  }

  @Get('/admin')
  @Roles({ roles: ['realm:admin'] })
  getAdmin(): string {
    return `${this.userService.getHello()} from admin`;
  }

  @Get('/all')
  getAll(): string {
    return `${this.userService.getHello()} from all`;
  }
}
