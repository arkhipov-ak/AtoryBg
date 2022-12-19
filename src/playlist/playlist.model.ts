import { prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { TrackModel } from 'src/track/track.model'
import { UserModel } from 'src/user/user.model'

export interface PlaylistModel extends Base {}

export class PlaylistModel extends TimeStamps {
	@prop()
	name: string

	@prop()
	slug: string

	@prop()
	poster: string

	@prop({ ref: () => UserModel })
	author: string[]

	@prop({ ref: () => TrackModel })
	tracks: Ref<TrackModel>[]
}
