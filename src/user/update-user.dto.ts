import { prop } from '@typegoose/typegoose'

export class UpdateUserDto {
	@prop()
	name: string

	@prop()
	poster: string

	@prop()
	password: string
}
