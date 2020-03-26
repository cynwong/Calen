import { Event } from '../../database/models/Event';


export const createEvent = async (data: any):Promise<any> => {
	return Event.create(data);
}

export const getAllEvents = async (userId:string):Promise<any> => {
	return Event.find({ creatorId : userId });
}

export const getEventById = async (id:string):Promise<any> => {
	return Event.findById(id);
}

// export const getEvent = async (id:Schema.Types.ObjectId):Promise<any> => {
// 	return Event.findById(id);
// }