import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface AuthorModel extends Base {}

export class AuthorModel extends TimeStamps {
	@prop()
	title: string

	@prop()
	slug: string

	@prop()
	poster: string

	@prop()
	bigPoster: string
}
