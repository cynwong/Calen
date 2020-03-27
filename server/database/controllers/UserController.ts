import { UserDocument, User } from '../../database/models/User';

export const createUser = async (data: UserDocument):Promise<any> => {
	return User.create(data);
}