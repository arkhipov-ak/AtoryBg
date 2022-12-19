import { IsArray, IsString } from 'class-validator'

export class CreateAlbumDto {
	@IsString()
	_id: string

	@IsString()
	title: string

	@IsString()
	slug: string

	@IsString()
	poster: string

	@IsArray()
	@IsString({ each: true })
	author: string
}
