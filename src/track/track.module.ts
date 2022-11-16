import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { TrackController } from './track.controller';
import { TrackModel } from './track.model';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TrackModel,
        schemaOptions: {
          collection: 'Track'
        }
      }
    ])
  ],
  providers: [TrackService],
  exports: [TrackService]
})
export class TrackModule {}
