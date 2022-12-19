import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { UserModule } from 'src/user/user.module'
import { PlaylistController } from './playlist.controller'
import { PlaylistModel } from './playlist.model'
import { PlaylistService } from './playlist.service'

@Module({
	controllers: [PlaylistController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: PlaylistModel,
				schemaOptions: {
					collection: 'Playlist',
				},
			},
		]),
		UserModule,
	],
	providers: [PlaylistService],
})
export class PlaylistModule {}
