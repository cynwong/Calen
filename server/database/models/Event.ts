import { Document, model, Model, Schema } from 'mongoose';

export interface EventDocument extends Document {
	Owner: Schema.Types.ObjectId,
	title: string, 
	start: Date, 
	end: Date,
	allDay: boolean,
	isDone: boolean,
	desc: string,
}

const EventSchema: Schema<EventDocument> = new Schema<EventDocument>({
	Owner: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	}, 
	title: String, 
	start: Date, 
	end: Date,
	allDay: Boolean,
	isDone: Boolean,
	desc: String,
}, {
	timestamps: true
});

export const Event: Model<EventDocument> = model<EventDocument>('event', EventSchema);