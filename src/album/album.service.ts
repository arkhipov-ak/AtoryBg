import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { ICollection } from './album.interface';
import { AlbumModel } from './album.model';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
	constructor(@InjectModel(AlbumModel) private readonly AlbumModel: ModelType<AlbumModel>, private readonly TrackService: TrackService) {}

	async getAll(searchTerm?: string){
		let options = {}

		if(searchTerm) {
			options = {
				$or: [
					{
						name: new RegExp(searchTerm.trim(), 'i')
					},
					{
						slug: new RegExp(searchTerm.trim(), 'i')
					}
				]
			}
		}
		return this.AlbumModel.find(options).select('-updatedAt -__v').sort({createdAt: 'desc'}).exec()
	}

	async getCollections(): Promise<ICollection[]> {
		const albums = await this.getAll()

		const collections = await Promise.all(
			albums.map(async (album) => {
				const moviesByAlbum = await this.TrackService.byAlbum([album._id])

				const result: ICollection = {
					_id: String(album._id),
					title: album.title,
					slug: album.slug,
					poster: moviesByAlbum[0]?.poster,
				}

				return result
			})
		)

		return collections
	}

	async create(dto: ICollection){
		const newAlbum = new this.AlbumModel({
			poster: dto.poster,
			title: dto.title,
			slug: dto.slug,
		})

		const album = await newAlbum.save()

		return {
			album
		}
		
	}


	

	
}
