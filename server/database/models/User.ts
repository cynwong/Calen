import {
	Document, model, Model, Schema,
} from 'mongoose';
import { hashSync, compareSync } from 'bcrypt';

export interface UserDocument extends Document {
	_id: string,
	id: string,
	firstName: string,
	lastName: string,
	email: string,
	password: string,
	passwordResetToken: string,
	passwordResetExpires: Date,
	photo: string,
	settings: string,
	createdAt: Date,
	updatedAt: Date,
	validatePassword: (password: string) => boolean;
}

const UserSchema: Schema<UserDocument> = new Schema<UserDocument>({
	firstName: {
		type: String,
		trim: true,
	},
	lastName: {
		type: String,
		trim: true,
		required: 'Last name is required.',
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		required: true,
		match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
	},
	password: {
		type: String,
		trim: true,
		required: true,
	},
	settings: {
		type: Schema.Types.ObjectId,
		ref: 'Setting',
	},
	passwordResetToken: String,
	passwordResetExpires: Date,
}, {
	timestamps: true,
});

UserSchema.virtual('id').get(function (this:UserDocument) {
	return this?._id;
});

UserSchema.pre<UserDocument>('save', function () {
	if (this.isModified('password')) {
		const saltRounds = Math.random() * (30 - 10) + 10;
		this.password = hashSync(this.password, saltRounds);
	}
	if (this.isModified('email')) {
		this.email = this.email.toLowerCase();
	}
});

UserSchema.methods.validatePassword = function (
	password: string,
): boolean {
	// ref: https://mongoosejs.com/docs/guide.html#methods
	return compareSync(password, this.password);
};

export const User: Model<UserDocument> = model<UserDocument>('user', UserSchema);
