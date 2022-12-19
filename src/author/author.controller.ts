import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { AuthorDto } from './author.dto'
import { AuthorService } from './author.service'
@Controller('author')
export class AuthorController {
	constructor(private readonly AuthorService: AuthorService) {}

	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.AuthorService.bySlug(slug)
	}

	@Get('by-slug/albums/:slug')
	async bySlugAlbums(@Param('slug') slug: string) {
		return this.AuthorService.bySlugAlbums(slug)
	}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.AuthorService.getAll(searchTerm)
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	async create(@Body() dto: AuthorDto) {
		return this.AuthorService.create(dto)
	}
}
