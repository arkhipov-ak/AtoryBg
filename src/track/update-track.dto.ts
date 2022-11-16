import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateMovieDto {
	@IsString()
	poster: string

	@IsString()
	title: string

	@IsString()
	slug: string

	@IsString()
	trackUrl: string	
	
	@IsArray()
	@IsString({ each: true })
	author: string[]

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	album: string[]
}