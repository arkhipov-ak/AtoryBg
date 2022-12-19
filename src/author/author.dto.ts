import { IsOptional, IsString } from 'class-validator'

export class AuthorDto {
	@IsString()
	title: string

	@IsString()
	slug: string

	@IsString()
	poster: string

	@IsString()
	@IsOptional()
	bigPoster: string
}
