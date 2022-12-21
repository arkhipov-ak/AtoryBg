import { Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { TrackService } from 'src/track/track.service'
import { AlbumModel } from './album.model'
import { CreateAlbumDto } from './create-album.dto'

@Injectable()
export class AlbumService {
	constructor(
		@InjectModel(AlbumModel) private readonly AlbumModel: ModelType<AlbumModel>
	) {}

	async bySlug(slug: string) {
		const doc = await this.AlbumModel.findOne({ slug })
			.populate('author')
			.exec()
		if (!doc) throw new Error('Album not found')
		return doc
	}

	async getAll(searchTerm?: string) {
		let options = {}

		if (searchTerm) {
			options = {
				$or: [
					{
						title: new RegExp(searchTerm.trim(), 'i'),
					},
				],
			}
		}
		return this.AlbumModel.find(options)
			.select('-updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.populate('author')
			.exec()
	}

	async create(dto: CreateAlbumDto) {
		const newAlbum = new this.AlbumModel({
			poster: dto.poster,
			title: dto.title,
			slug: dto.slug,
			author: dto.author,
		})

		const album = await newAlbum.save()

		return album
	}

	async getMostPopular() {
		const albums = await this.AlbumModel.aggregate()
			.lookup({
				from: 'Track',
				localField: '_id',
				foreignField: 'album',
				as: 'tracks',
			})
			.addFields({
				amountPlays: {
					$sum: '$tracks.countPlays',
				},
			})
			.project({ __v: 0, updatedAt: 0, tracks: 0 })
			.sort({
				amountPlays: -1,
			})
			.exec()

		return this.AlbumModel.populate(albums, { path: 'author' })
	}
}
