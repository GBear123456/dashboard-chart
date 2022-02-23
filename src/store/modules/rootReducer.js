import { combineReducers } from 'redux';

import sidebarMenu from './sidebarMenu/reducer';
import testReducer from './testReducer';

export default combineReducers({
    menu: sidebarMenu,
    test: testReducer
});
