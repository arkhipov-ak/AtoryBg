import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Types } from 'mongoose'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { User } from './decorators/user.decorators'
import { UpdateUserDto } from './update-user.dto'
import { UserModel } from './user.model'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly UserService: UserService) {}

	@UsePipes(new ValidationPipe())
	@Put('profile')
	@HttpCode(200)
	@Auth()
	async updateProfile(@User('_id') _id: string, @Body() dto: UpdateUserDto) {
		return this.UserService.updateProfile(_id, dto)
	}

	@Get('profile/favorites')
	@Auth()
	async getFavorites(@User('_id') _id: string) {
		return this.UserService.getFavoriteTracks(_id)
	}

	@Get('profile/:id')
	async getProfile(@Param('id') id: string) {
		return this.UserService.byId(id)
	}

	@Get('/playlists')
	@Auth()
	async getPlaylists(@User('_id') _id: string) {
		return this.UserService.getPlaylists(_id)
	}

	@Put('profile/favorites')
	@HttpCode(200)
	@Auth()
	async toggleFavorite(
		@Body('trackId', IdValidationPipe) trackId: Types.ObjectId,
		@User() user: UserModel
	) {
		return this.UserService.toggleFavorite(trackId, user)
	}
}
