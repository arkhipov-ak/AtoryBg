import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { AuthorModel } from './author.model';
import { AuthorDto } from './author.dto'
@Injectable()
export class AuthorService {
	constructor(@InjectModel(AuthorModel) private readonly AuthorModel: ModelType<AuthorModel>) {}

	async getAll(searchTerm?: string) {
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

		return this.AuthorModel.aggregate()
			.match(options)
			.lookup({
				from: 'Movie',
				foreignField: 'actors',
				localField: '_id',
				as: 'tracks',
			})
			.addFields({
				countTracks: {
					$size: '$tracks',
				},
			})
			.project({ __v: 0, updatedAt: 0, tracks: 0 })
			.sort({
				createdAt: -1,
			})
			.exec()
	}

	async create(dto: AuthorDto) {
		const newAuthor = new this.AuthorModel({
			name: dto.name,
			slug: dto.slug,
			photo: dto.photo,
		})

		const author = await newAuthor.save()

		return {
			author
		}
	}



}
