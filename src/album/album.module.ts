import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumModel } from './album.model';
import { AlbumService } from './album.service';
import { TypegooseModule } from 'nestjs-typegoose'
import { TrackModule } from 'src/track/track.module';

@Module({
	controllers: [AlbumController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: AlbumModel,
				schemaOptions: {
					collection: 'Album',
				},
			},
		]),
		TrackModule,
	],
	providers: [AlbumService],
})
export class AlbumModule {}

