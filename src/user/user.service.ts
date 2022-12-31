import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { UpdateUserDto } from './update-user.dto'
import { UserModel } from './user.model'
import { genSalt, hash } from 'bcryptjs'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
	) {}

	async byId(_id: string) {
		const user = await this.UserModel.findById(_id)
			.populate({
				path: 'playlists',
				populate: {
					path: 'author',
				},
			})
			.exec()

		if (!user) throw new NotFoundException('User not found')
		return user
	}

	async updateProfile(_id: string, dto: UpdateUserDto) {
		const { name, poster, password } = dto
		const user = await this.byId(_id)
		if (!user) throw new NotFoundException('User not found')

		if (name) user.name = name
		if (poster) user.poster = poster
		if (password) {
			const salt = await genSalt(10)
			user.password = await hash(dto.password, salt)
		}

		await user.save()
		return user
	}

	async getFavoriteTracks(_id: string) {
		return this.UserModel.findById(_id, 'favorites')
			.populate({
				path: 'favorites',
				populate: {
					path: 'album author',
				},
			})
			.exec()
			.then((data) => {
				return data.favorites
			})
	}

	async toggleFavorite(trackId: Types.ObjectId, user: UserModel) {
		const { favorites, _id } = user

		await this.UserModel.findByIdAndUpdate(_id, {
			favorites: favorites.includes(trackId)
				? favorites.filter((id) => String(id) !== String(trackId))
				: [...favorites, trackId],
		})
	}

	async getPlaylists(_id: string) {
		return this.UserModel.findById(_id, 'playlists')
			.populate({
				path: 'playlists',
				populate: {
					path: 'tracks',
				},
			})
			.exec()
			.then((data) => {
				return data.playlists
			})
	}

	async createPlaylist(playlistId: Types.ObjectId, _id: string) {
		const user = await this.byId(_id)
		user.playlists = [...user.playlists, playlistId]
		await user.save()
		return
	}
}
