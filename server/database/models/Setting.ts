import {
	Document, model, Model, Schema,
} from 'mongoose';

export interface SettingDocument extends Document {
	_id: string,
	id: string,
	userId: string,
	calendarColour: string,
	diaryColour: string,
	taskColour: string,
	mealPlanColour: boolean,
	googleCalendarIds: string[],
	createdAt: Date,
	updatedAt: Date
}
const settingSchema: Schema<SettingDocument> = new Schema<SettingDocument>({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	calendarColour: {
		type: String,
		trim: true,
	},
	diaryColour: {
		type: String,
		trim: true,
	},
	taskColour: {
		type: String,
		trim: true,
	},
	mealPlanColour: {
		type: String,
		trim: true,
	},
	googleCalendarIds: {
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
