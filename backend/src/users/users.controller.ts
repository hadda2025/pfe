import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Users')
// @ApiBearerAuth() // Uncomment if using JWT authentication
// @UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);
    return {
      message: 'User created successfully',
      data: newUser,
    };
  }

  @Post('/create-agent')
  @ApiOperation({ summary: 'Create a new Agent user' })
  @ApiResponse({ status: 201, description: 'Agent user created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async createAgent(@Body() createUserDto: CreateUserDto) {
    const agentUser = await this.usersService.createAgent(createUserDto);
    return {
      message: 'Agent user created successfully',
      data: agentUser,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully.' })
  async findAll() {
    const allUsers = await this.usersService.findAll();
    return {
      message: 'Users retrieved successfully',
      data: allUsers,
    };
  }

  @Get('/find/email')
  @ApiOperation({ summary: 'Find a user by email' })
  @ApiQuery({ name: 'email', required: true, description: 'User email' })
  @ApiResponse({ status: 200, description: 'User found.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findUserByEmail(@Query('email') email: string) {
    const user = await this.usersService.findUserByEmail(email);
    return {
      message: 'User found by email',
      data: user,
    };
  }

  @Get('/find/role')
  @ApiOperation({ summary: 'Find users by role' })
  @ApiQuery({ name: 'role', required: true, description: 'User role' })
  @ApiResponse({ status: 200, description: 'Users with specified role found.' })
  async findUserByRole(@Query('role') role: string) {
    const users = await this.usersService.findUserByRole(role);
    return {
      message: 'Users found by role',
      data: users,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User found.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return {
      message: 'User found by ID',
      data: user,
    };
  }
@Patch(':id')
@ApiOperation({ summary: 'Update user by ID' })
@ApiParam({ name: 'id', description: 'User ID' })
@ApiResponse({ status: 200, description: 'User updated successfully.' })
@ApiResponse({ status: 400, description: 'Invalid update data.' })
@ApiBody({
  description: 'Updated user data',
  type: UpdateUserDto,
  examples: {
    updateExample: {
      summary: 'Example of user update payload',
      value: {
        firstName: 'Ali',
        lastName: 'Mansour',
        email: 'ali.mansour@example.com',
        phone: '555123456',
        adress: '123 Rue de Tunis',
        password: 'newPassword@123',
        cin: '12345678',
        dateCreation: '2024-01-01',
        classeDepartement: 'GL4',
        statut: 'actif'
      },
    },
  },
})
async update(
  @Param('id') id: string,
  @Body() updateUserDto: UpdateUserDto,
) {
  const updatedUser = await this.usersService.update(id, updateUserDto);
  return {
    message: 'User updated successfully',
    data: updatedUser,
  };
}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async remove(@Param('id') id: string) {
    const deletedUser = await this.usersService.remove(id);
    return {
      message: 'User deleted successfully',
      data: deletedUser,
    };
  }
}
