import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export interface AuthorModel extends Base {}

export class AuthorModel extends TimeStamps {
	@prop()
	name: string

	@prop()
	slug:string

	@prop()
	photo: string
}