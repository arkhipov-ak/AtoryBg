import { IsArray, IsString } from 'class-validator'

export class CreatePlaylistDto {
	@IsString()
	name: string

	@IsString()
	slug: string

	@IsString()
	poster: string

	@IsArray()
	@IsString()
	author: string[]
}

export class UpdatePlaylistDto {
	@IsString()
	name: string

	@IsString()
	poster: string
}
