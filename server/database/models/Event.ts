import { Document, model, Model, Schema } from 'mongoose';

export interface EventDocument extends Document {
	_id: string,
	creator: Schema.Types.ObjectId,
	title: string, 
	start: Date, 
	end: Date,
	allDay: boolean,
	desc: string[],
	location: string,
	notes: string[],
	createdAt: Date,
	updatedAt: Date
}
const EventSchema: Schema<EventDocument> = new Schema<EventDocument>({
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	}, 
	title: {
		type: String,
		trim: true,
		required: 'Title is required.', 
	}, 
	start: {
		type: Date,
		trim: true,
		required: 'Start Date is required.', 
	}, 
	end: Date,
	allDay: Boolean,
	desc: {
		type: [String],
		trim: true
	},
	location: {
		type: String,
		trim: true
	},
	notes: {
		type: [String],
		trim: true
	},
}, {
	timestamps: true
});

export const Event: Model<EventDocument> = model<EventDocument>('event', EventSchema);