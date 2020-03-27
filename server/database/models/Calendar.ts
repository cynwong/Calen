import {
	Document, model, Model, Schema,
} from 'mongoose';

export interface CalendarDocument extends Document {
	_id: string,
	id: string,
	creatorId: Schema.Types.ObjectId,
	name: string,
	events: Schema.Types.ObjectId[],
	createdAt: Date,
	updatedAt: Date
}

const CalendarScheme: Schema<CalendarDocument> = new Schema<CalendarDocument>({
	creatorId: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	name: {
		type: String,
		trim: true,
		required: 'Name is required.',
	},
	events: {
		type: [Schema.Types.ObjectId],
		ref: 'event',
		trim: true,
	},
}, {
	timestamps: true,
	toObject: { virtuals: true },
	toJSON: { virtuals: true },
});

CalendarScheme.virtual('id').get(function (this:CalendarDocument) {
	return this?._id;
});

export const Calendar: Model<CalendarDocument> = model<CalendarDocument>('calendar', CalendarScheme);
