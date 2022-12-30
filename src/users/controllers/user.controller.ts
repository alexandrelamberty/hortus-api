import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  // UseGuards,
} from "@nestjs/common";

import { PaginationQueryParams } from "@common/paginationParams";
import { ParseObjectIdPipe } from "@common/pipe/ParseObjectIdPipe";
// import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";

import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserService } from "../providers/user.service";
import { User } from "../schemas/user.schema";
import { UsersResponse } from "../responses/user.responses";

// @UseGuards(JwtAuthGuard)
@Controller("users")
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async getAll(@Query() query: PaginationQueryParams): Promise<UsersResponse> {
    // FIXME: pass query directly ?
    const result = await this.usersService.getAll(query.page, query.limit);
    return result;
  }

  @Get("/:id")
  getById(@Param("id", ParseObjectIdPipe) id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Get("/:id")
  getByUsername(@Param("username") username: string): Promise<User> {
    return this.usersService.findByUsername(username);
  }

  @Get("/:id")
  getByEmail(@Param("email") email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }

  @Post()
  insert(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.insert(user);
  }

  @Patch()
  update(
    @Param("id", ParseObjectIdPipe) id: string,
    @Body() user: UpdateUserDto
  ): Promise<User> {
    return this.usersService.update(id, user);
  }

  @Delete("/:id")
  delete(@Param("id", ParseObjectIdPipe) id: string): Promise<User> {
    return this.usersService.delete(id);
  }
}
