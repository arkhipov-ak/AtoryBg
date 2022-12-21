import { IsArray, IsOptional, IsString } from 'class-validator'
import { Types } from 'mongoose'

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
	@IsOptional()
	name: string

	@IsOptional()
	@IsString()
	poster: string
}
