import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { AuthorModel } from './author.model'
import { AuthorDto } from './author.dto'
@Injectable()
export class AuthorService {
	constructor(
		@InjectModel(AuthorModel)
		private readonly AuthorModel: ModelType<AuthorModel>
	) {}

	async bySlug(slug: string) {
		const doc = await this.AuthorModel.findOne({ slug }).exec()

		if (!doc) throw new Error('Author not found')

		return doc
	}

	async bySlugAlbums(slug: string) {
		const albums = await this.AuthorModel.aggregate([
			{ $match: { slug: slug } },
		])
			.lookup({
				from: 'Album',
				localField: '_id',
				foreignField: 'author',
				as: 'albums',
			})
			.addFields({
				albums: '$albums',
			})
			.project({ __v: 0, updatedAt: 0 })
			.exec()

		return albums
	}

	async getAll(searchTerm?: string) {
		let options = {}

		if (searchTerm) {
			options = {
				$or: [
					{
						title: new RegExp(searchTerm.trim(), 'i'),
					},
					{
						slug: new RegExp(searchTerm.trim(), 'i'),
					},
				],
			}
		}

		return (
			this.AuthorModel.aggregate()
				.match(options)
				.lookup({
					from: 'Track',
					localField: '_id',
					foreignField: 'author',
					as: 'tracks',
				})
				.addFields({
					countTracks: {
						$size: '$tracks',
					},
					amountPlays: {
						$sum: '$tracks.countPlays',
					},
				})
				.project({ __v: 0, updatedAt: 0, tracks: 0 })
				// .sort({
				// 	countTracks: -1,
				// 	amountPlays: -1,
				// })
				.exec()
		)
	}

	async create(dto: AuthorDto) {
		const newAuthor = new this.AuthorModel({
			title: dto.title,
			slug: dto.slug,
			poster: dto.poster,
			bigPoster: dto.poster,
		})

		const author = await newAuthor.save()

		return {
			author,
		}
	}
}
