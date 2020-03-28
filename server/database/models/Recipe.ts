import {
	Document, model, Model, Schema,
} from 'mongoose';

export interface SettingDocument extends Document {
	_id: string,
	id: string,
	userId: string,
	title: string,
	ingredients: string[],
	method: string,
	source: string,
	nutritionalValue: string[],
	notes: string[],
	createdAt: Date,
	updatedAt: Date
}
const settingSchema: Schema<SettingDocument> = new Schema<SettingDocument>({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	title: {
		type: String,
		trim: true,
		required: true,
	},
	ingredients: {
		type: [String],
		trim: true,
	},
	method: {
		type: String,
		trim: true,
	},
	source: {
		type: String,
		trim: true,
	},
	nutritionalValue: {
		type: [String],
		trim: true,
	},
	notes: {
		type: [String],
		trim: true,
	},
}, {
	timestamps: true,
	toObject: { virtuals: true },
	toJSON: { virtuals: true },
});

settingSchema.virtual('id').get(function (this:SettingDocument) {
	return this?._id;
});

export const Setting: Model<SettingDocument> = model<SettingDocument>('setting', settingSchema);
