import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { UserService } from 'src/user/user.service'
import { CreatePlaylistDto, UpdatePlaylistDto } from './playlist.dto'
import { PlaylistModel } from './playlist.model'

@Injectable()
export class PlaylistService {
	constructor(
		@InjectModel(PlaylistModel)
		private readonly PlaylistModel: ModelType<PlaylistModel>,
		private readonly UserService: UserService
	) {}

	async getAll(searchTerm?: string) {
		let options = {}

		if (searchTerm) {
			options = {
				$or: [
					{
						name: new RegExp(searchTerm.trim(), 'i'),
					},
				],
			}
		}
		return this.PlaylistModel.find(options)
			.select('-updatedAt -__v')
			.populate('author')
			.sort({
				createdAt: 'desc',
			})
			.exec()
	}

	async create(_id: string) {
		const defaultValue: CreatePlaylistDto = {
			name: 'My playlist',
			slug: 'myplaylist',
			poster: '',
			author: [_id],
		}

		const playlist = await this.PlaylistModel.create(defaultValue)
		await this.UserService.createPlaylist(playlist._id, _id)

		return playlist._id
	}

	async delete(id: string) {
		const deleteDoc = this.PlaylistModel.findByIdAndDelete(id).exec()

		if (!deleteDoc) throw new NotFoundException('Playlist not found')

		return deleteDoc
	}

	async updateTracks(
		_id: string,
		track: {
			trackId: Types.ObjectId
		}
	) {
		const { trackId } = track

		const updateDoc = await this.PlaylistModel.findById(_id)

		if (!updateDoc) throw new NotFoundException('Playlist not found')

		updateDoc.tracks = [...updateDoc.tracks, trackId]

		await updateDoc.save()

		return updateDoc
	}

	async updatePlaylist(_id: string, dto: UpdatePlaylistDto) {
		const { name, poster } = dto
		const playlist = await this.byId(_id)
		if (!playlist) throw new NotFoundException('User not found')

		if (name) playlist.name = name
		if (poster) playlist.poster = poster

		await playlist.save()
		return playlist
	}

	async byId(id: string) {
		const playlist = await this.PlaylistModel.findById(id)
			.populate({
				path: 'tracks',
				populate: {
					path: 'author album',
				},
			})
			.populate('author')
			.exec()

		if (!playlist) throw new NotFoundException('Playlist not found')
		return playlist
	}
}
