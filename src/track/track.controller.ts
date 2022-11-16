import { Body, Controller, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Types } from 'mongoose';
import { TrackService } from './track.service'
import { UpdateMovieDto } from './update-track.dto';

@Controller('track')
export class TrackController {
	constructor(private readonly TrackService: TrackService ) {}
	
	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.TrackService.getAll(searchTerm)
	}

	@Post('/update-count-opened')
	@HttpCode(200)
	async updateCountOpened(@Body('slug') slug:string) {
		return this.TrackService.updateCountOpened(slug)
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	async create(@Body() dto: UpdateMovieDto) {
		return this.TrackService.create(dto)
	}

	// ДОБАВИТЬ ВАЛИДАЦИЮ IDVALIDATIONPIPE
	@Get('by-author/:authorIds')
	async byAuthor(@Param('authorIds') authorIds: Types.ObjectId) {
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

}
