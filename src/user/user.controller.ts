import { Body, Controller, Get, HttpCode, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Types } from 'mongoose';
import { User } from './decorators/user.decorators';
import { UpdateUserDto } from './update-user.dto';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor( private readonly UserService: UserService) {}

	@UsePipes(new ValidationPipe())
	@Put('profile')
	@HttpCode(200)
	async updateProfile(@User('_id') _id: string, @Body() dto: UpdateUserDto) {
		return this.UserService.updateProfile(_id,dto)
	}

	@Post('profile/favorites')
	async getFavorites(@Body('_id') _id: string) {
		return this.UserService.getFavoriteTracks(_id)
	}

	@Put('profile/favorites')
	@HttpCode(200)
	async toggleFavorite(@Body('trackId') trackId: Types.ObjectId, @User() user: UserModel) {
		return this.UserService.toggleFavorite(trackId,user)
	}
}
