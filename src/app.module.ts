import { Module } from '@nestjs/common'
import { getMongoDbConfig } from './config/mongo.config'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { TrackModule } from './track/track.module'
import { FilesModule } from './files/files.module'
import { AlbumModule } from './album/album.module'
import { AuthorModule } from './author/author.module'
import { PlaylistModule } from './playlist/playlist.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoDbConfig,
		}),
		UserModule,
		AuthModule,
		AlbumModule,
		TrackModule,
		FilesModule,
		AuthorModule,
		PlaylistModule,
	],
})
export class AppModule {}
