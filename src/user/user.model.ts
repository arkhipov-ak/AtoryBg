import { prop, Ref } from '@typegoose/typegoose'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'
import { IsOptional } from 'class-validator'
import { TrackModel } from 'src/track/track.model'

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
	@prop({ unique: true })
	email: string

	@prop()
	password: string

	@prop({default : 'Guest'})
	name: string

	@IsOptional()
	@prop()
	avatar: string

	@prop({ default: false })
	isAdmin?: boolean

	@prop({default: [], ref: () => TrackModel})
	favorites?: Ref<TrackModel>[]
}
