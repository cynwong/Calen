import { Event } from '../models/Event';

export const createEvent = (data: any):Promise<any> => Event.create(data);

export const deleteEventById = (id: string): any => Event.findByIdAndDelete(id)!;

export const getAllEvents = (userId:string):any => Event.find({ creatorId: userId });

export const getEventById = (id:string):any => Event.findById(id);
