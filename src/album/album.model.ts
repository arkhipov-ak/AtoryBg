import { prop, Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { TrackModel } from "src/track/track.model";

export interface AlbumModel extends Base {}

export class AlbumModel extends TimeStamps {
	@prop()
	title: string;

	@prop()
	slug: string;

	@prop()
	poster: string

	// @prop({ref: () => TrackModel})
	// tracks: Ref<TrackModel>
}