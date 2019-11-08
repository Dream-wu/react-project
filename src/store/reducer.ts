import * as types from './action-type'
import { StoreState } from '../types/index';

let defaultState: StoreState = {
  userName: 'wumj'
}

export default (state = defaultState, action: any = {}) => {
  switch (action.type) {
    case types.SAVE_USERINFO:
      return {
        ...state,
        userName: action.userName
      }
    // case user.SAVE_ATTRINFO:
    //   return {...state, ...{[action.datatype]: action.value}};
    // case user.MODIFY_USERINFO:
    //   return {...state, userInfo: {...state.userInfo, [action.key]: action.value}};
    default:
      return state
  }
}