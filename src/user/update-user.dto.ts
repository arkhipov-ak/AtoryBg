import { prop } from "@typegoose/typegoose";

export class UpdateUserDto {
	@prop()
	name: string

	@prop()
	avatar: string
}