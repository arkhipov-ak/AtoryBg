import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { UpdateUserDto } from './update-user.dto';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
	constructor( @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>) {}

		async getFavoriteTracks(_id: string) {
		return this.UserModel
			.findById(_id, 'favorites')
			.populate({
				path: 'favorites',
				populate: {
					path: 'albums',
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
			favorites: favorites.includes(trackId) ? favorites.filter((id) => String(id) !== String(trackId)) : [...favorites, trackId]
		})
	}

	async updateProfile(_id: string, dto: UpdateUserDto) {
		const user = await this.UserModel.findById(_id)
		if(!user) throw new NotFoundException('User not found')
		if(user.name) {
			user.name = dto.name
		}
		if(user.avatar){
			user.avatar = dto.avatar
		}

		await user.save()
		return
	}
}
