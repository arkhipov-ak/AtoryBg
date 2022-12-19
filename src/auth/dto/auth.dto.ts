import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsEmail()
	email: string

	@MinLength(6, {
		message: 'Password must be at least 6 characters',
	})
	@IsString()
	password: string

	@IsOptional()
	@IsString()
	name?: string

	@IsOptional()
	@IsString()
	poster?: string
}
