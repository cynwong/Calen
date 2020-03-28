import {
	Document, model, Model, Schema,
} from 'mongoose';

export interface EventDocument extends Document {
	_id: string,
	id: string,
	creatorId: string,
	title: string,
	start: string,
	end: string,
	allDay: boolean,
	type: number,
	desc: string[],
	entry: string,
	location: string,
	notes: string[],
	calendarId: string,
	recipes:[],
	totalNutritionalValue: string,
	createdAt: Date,
	updatedAt: Date
}
const EventSchema: Schema<EventDocument> = new Schema<EventDocument>({
	creatorId: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	calendarId: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	title: {
		type: String,
		trim: true,
		required: 'Title is required.',
	},
	start: {
		type: String,
		trim: true,
		required: 'Start Date is required.',
	},
	end: {
		type: String,
		trim: true,
	},
	allDay: Boolean,
	type: { // 0=event, 1=diaryEntry, 2=mealPlan, 3=Todo/Tasks
		type: Number,
		min: 0,
		max: 3,
		index: true,
	},
	desc: {
		type: [String],
		trim: true,
	},
	entry: {
		type: String,
		trim: true,
	},
	location: {
		type: String,
		trim: true,
	},
	notes: {
		type: [String],
		trim: true,
	},
	recipes: {
		type: [Schema.Types.ObjectId],
		ref: 'recipe',
	},
	totalNutritionalValue: String,
// mealType => 0=Breakfast(6-9am), 1=brunch(9-11am), 2=morningTea(11am-12am), 3=Lunch(12-1pm), 4=TeaTime(1pm-6pm), 5=supper(6-7pm), 6=dinner(7-9pm)
	mealType: Number,
}, {
	timestamps: true,
	toObject: { virtuals: true },
	toJSON: { virtuals: true },
});

EventSchema.virtual('id').get(function (this:EventDocument) {
	return this?._id;
});

export const Event: Model<EventDocument> = model<EventDocument>('event', EventSchema);
