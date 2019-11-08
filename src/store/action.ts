import * as user from './action-type'

// 保存用户信息
export const saveUserInfo = (userName: any) => {
  return {
    type: user.SAVE_USERINFO,
    userName
  }
}

export default {saveUserInfo}