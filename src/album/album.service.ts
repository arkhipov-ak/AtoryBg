import { Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { TrackService } from 'src/track/track.service'
import { ICollection } from './album.interface'
import { AlbumModel } from './album.model'
import { CreateAlbumDto } from './create-album.dto'

@Injectable()
export class AlbumService {
	constructor(
		@InjectModel(AlbumModel) private readonly AlbumModel: ModelType<AlbumModel>,
		private readonly TrackService: TrackService
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
		const albums = await this.getAll()

		const collections = await Promise.all(
			albums.map(async (album) => {
				const tracksByAlbums = await this.TrackService.byAlbum([album._id])

				return tracksByAlbums
			})
		)

		return collections
	}
}
