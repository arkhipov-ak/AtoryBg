import { prop, Ref} from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { AlbumModel } from "src/album/album.model";
import { AuthorModel } from "src/author/author.model";

// добавлено
export interface TrackModel extends Base {}

export class TrackModel extends TimeStamps {
	@prop()
	poster: string

	@prop()
	title: string

	@prop()
	slug: string

	@prop({ default: 0})
	countPlays: number

	@prop()
	trackUrl: string

	@prop({ref: () => AlbumModel})
	album: Ref<AlbumModel>[]

	@prop({ref: () => AuthorModel})
	author: Ref<AuthorModel>[]
}