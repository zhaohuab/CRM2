import Immutable from 'immutable'
import { combineReducers } from 'redux'

import businessObj from './business-obj';
import fieldSetting from './field-setting';
import tplSetting from './tpl-setting';
import listConfig from './list-config';

export default combineReducers({
    businessObj,
    fieldSetting,
    tplSetting,
    listConfig
})