import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Types } from 'mongoose'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { User } from 'src/user/decorators/user.decorators'
import { UpdatePlaylistDto } from './playlist.dto'
import { PlaylistService } from './playlist.service'

@Controller('playlist')
export class PlaylistController {
	constructor(public readonly PlaylistService: PlaylistService) {}

	@UsePipes(new ValidationPipe())
	@Put('update/:id')
	@HttpCode(200)
	@Auth()
	async updatePlaylist(
		@Param('id', IdValidationPipe) _id: string,
		@Body() dto: UpdatePlaylistDto
	) {
		return this.PlaylistService.updatePlaylist(_id, dto)
	}

	@Put('tracks-update/:id')
	@HttpCode(200)
	async deleteTrack(
		@Param('id', IdValidationPipe) _id: string,
		@Body()
		track: {
			trackId: Types.ObjectId
		}
	) {
		return this.PlaylistService.updateTracks(_id, track)
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	@Auth()
	async create(@User('_id') _id: string) {
		return this.PlaylistService.create(_id)
	}

	@UsePipes(new ValidationPipe())
	@Delete(':id')
	@HttpCode(200)
	@Auth()
	async delete(@Param('id', IdValidationPipe) id: string) {
		return this.PlaylistService.delete(id)
	}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.PlaylistService.getAll(searchTerm)
	}

	@Get(':id')
	async byId(@Param('id', IdValidationPipe) id: string) {
		return this.PlaylistService.byId(id)
	}
}
