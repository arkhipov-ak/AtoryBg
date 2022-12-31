import {
	Body,
	Controller,
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
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { TrackService } from './track.service'
import { UpdateTrackDto } from './update-track.dto'

@Controller('track')
export class TrackController {
	constructor(private readonly TrackService: TrackService) {}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.TrackService.getAll(searchTerm)
	}

	@Put('/update-count-opened')
	@HttpCode(200)
	async updateCountOpened(@Body('_id') _id: string) {
		return this.TrackService.updateCountOpened(_id)
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	async create(@Body() dto: UpdateTrackDto) {
		return this.TrackService.create(dto)
	}

	@Get('by-author/:authorIds')
	async byAuthor(
		@Param('authorIds', IdValidationPipe) authorIds: Types.ObjectId
	) {
		return this.TrackService.byAuthor(authorIds)
	}

	@UsePipes(new ValidationPipe())
	@Post('by-album')
	@HttpCode(200)
	async byAlbum(
		@Body('albumIds')
		albumIds: Types.ObjectId[]
	) {
		return this.TrackService.byAlbum(albumIds)
	}

	@Get('most-popular')
	async getMostPopular() {
		return this.TrackService.getMostPopular()
	}

	@Get('most-new')
	async getMostNew() {
		return this.TrackService.getMostNew()
	}
}
