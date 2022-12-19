import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateTrackDto {
	@IsString()
	poster: string

	@IsString()
	title: string

	@IsString()
	slug: string

	@IsString()
	trackUrl: string

	@IsNumber()
	duration: number

	@IsArray()
	@IsString({ each: true })
	author: string[]

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	album: string[]
}
