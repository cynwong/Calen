import { Router } from 'express';

import postNewSettingAPI from './postNewSetting';
import putSettingAPI from './putSetting';

const settingsRoutes = Router();

settingsRoutes.post('/', postNewSettingAPI);
settingsRoutes.put('/', putSettingAPI);

export default settingsRoutes;
