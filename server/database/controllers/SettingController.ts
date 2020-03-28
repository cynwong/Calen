import { Setting, SettingDocument } from '../models/Setting';

export const createSettings = (data: any):Promise<any> => Setting.create(data);

export const getSetting = (userId: string) => Setting.findOne({ userId });

export const putSetting = (userId: string, body: SettingDocument) => Setting.findOneAndUpdate({ userId }, body);
