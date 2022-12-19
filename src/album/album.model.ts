import { prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { AuthorModel } from 'src/author/author.model'

export interface AlbumModel extends Base {}

export class AlbumModel extends TimeStamps {
	@prop()
	title: string

	@prop()
	slug: string

	@prop()
	poster: string

	@prop({ ref: () => AuthorModel })
	author: Ref<AuthorModel>[]
}
