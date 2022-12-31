import { prop, Ref } from '@typegoose/typegoose'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'
import { IsOptional } from 'class-validator'
import { ObjectId } from 'mongoose'
import { PlaylistModel } from 'src/playlist/playlist.model'
import { TrackModel } from 'src/track/track.model'

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
	@prop({ unique: true })
	email: string

	@prop()
	password: string

	@prop({ default: 'Guest' })
	name: string

	@IsOptional()
	@prop({ default: null })
	poster: string

	@prop({ default: false })
	isAdmin?: boolean

	@prop({ default: [], ref: () => TrackModel })
	favorites?: Ref<TrackModel>[]

	@prop({ default: [], ref: () => PlaylistModel })
	playlists?: Ref<PlaylistModel>[]
}
