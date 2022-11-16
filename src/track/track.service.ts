import { Injectable, NotFoundException } from "@nestjs/common";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { InjectModel } from "nestjs-typegoose";
import { TrackModel } from "./track.model";
import { UpdateMovieDto } from "./update-track.dto";

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(TrackModel) private readonly TrackModel: ModelType<TrackModel>
  ) {}

  async getAll(searchTerm?: string) {
    console.log(searchTerm);
    let options = {};

    if (searchTerm) {
      options = {
        $or: [
          {
            title: new RegExp(searchTerm.trim(), "i"),
          },
          {
            authors: new RegExp(searchTerm.trim(), "gi"),
          },
        ],
      };
    }

    return this.TrackModel.find(options)
      .select("-updatedAt -__v")
      .sort({ createdAt: "desc" })
      .populate("album author")
      .exec();
  }

  async create(dto: UpdateMovieDto) {
    const newTrack = new this.TrackModel({
      poster: dto.poster,
      title: dto.title,
      slug: dto.slug,
      album: dto.album,
      trackUrl: dto.trackUrl,
      author: dto.author,
    });

    const track = await newTrack.save();

    return {
      track,
    };
  }

  async updateCountOpened(slug: string) {
    return this.TrackModel.findOneAndUpdate(
      { slug },
      { $inc: { countPlays: 1 } }
    ).exec();
  }

  async byAuthor(authorIds: Types.ObjectId) {
    if (!authorIds) throw new NotFoundException("Missing authorId");
    const data = await this.TrackModel.find({ author: authorIds }).exec();

    if (!data) throw new NotFoundException("Tracks not found");

    const totalPlays = data.reduce(
      (amount, track) => amount + track.countPlays,
      0
    );

    return {
      totalPlays: totalPlays,
      data,
    };
  }

  async byAlbum(albumIds: Types.ObjectId[]) {
    if (!albumIds) throw new NotFoundException("Missing albumIds");
    const data = await this.TrackModel.find({
      album: { $in: albumIds },
    }).exec();

    if (!data) throw new NotFoundException("Tracks not found");

    const totalPlays = data.reduce(
      (amount, track) => amount + track.countPlays,
      0
    );

    return {
      totalPlays: totalPlays,
      data,
    };
  }
}
