import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthorController } from './author.controller';
import { AuthorModel } from './author.model';
import { AuthorService } from './author.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: AuthorModel,
        schemaOptions: {
          collection: 'Author'
        }
      }
    ])
  ],
  controllers: [AuthorController],
  providers: [AuthorService]
})
export class AuthorModule {}
