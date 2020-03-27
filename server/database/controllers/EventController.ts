import { Event, EventDocument } from '../../database/models/Event';


export const createEvent = (data: any):Promise<any> => Event.create(data);

export const deleteEventById = (id: string): Promise<any> => Event.findByIdAndDelete(id)!;

export const getAllEvents = (userId:string):Promise<any> => Event.find({ creatorId : userId })

export const getEventById = (id:string):Promise<any> => Event.findById(id)

// export const getEvent = async (id:Schema.Types.ObjectId):Promise<any> => {
// 	return Event.findById(id);
// }