import { UserDocument, User } from '../models/User';

const createUser = async (data: UserDocument):Promise<any> => User.create(data);

export default createUser;
