import { Body, Controller, Get, HttpCode, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ICollection } from './album.interface';
import { AlbumService } from './album.service'

@Controller('album')
export class AlbumController {
	constructor(public readonly AlbumService: AlbumService) {}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.AlbumService.getAll(searchTerm)
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	async create(@Body() dto: ICollection) {
		return this.AlbumService.create(dto)
	}

}
