/* global window */
import md5 from 'blueimp-md5';
import { Helper } from './Helper.js';
import { getAuthorityInfo, setAuthorityInfo, removeAuthorityInfo, getToken } from './Auth.js';


/**
 * 签名帮助类
 */
const signUtil = {
  withSignParams(payload, isWithToken = true) {
    let newPayload = {
      ...payload,
      timestamp: new Date().getTime(),
      sessionKey: window.localStorage.getItem('sessionKey') || '',
      sessionSecret: window.localStorage.getItem('sessionSecret') || '',
    };
    if (isWithToken) {
      newPayload = {
        ...newPayload,
        accessToken: window.localStorage.getItem('accessToken') || '',
      }
    }
    newPayload.sign = signUtil.sign(newPayload);
    return newPayload;
  },
  sign(paramsMap) {
    // 对参数进行排序
    const me = this;

    let paramsStr = Helper.parseToUrlParam(Helper.deepSort(paramsMap));
    paramsStr = paramsStr.replace(/(\/)/g, '\\$1');
    let authInfo = me.getAuthInfo() || {};
    authInfo = {
      timestamp: paramsMap.timestamp,
      sessionKey: paramsMap.sessionKey || authInfo.sessionKey,
      sessionSecret: paramsMap.sessionSecret || authInfo.sessionSecret,
    };
    me.setAuthoInfo(authInfo);
    const mix = paramsStr + authInfo.sessionSecret;
    return md5(mix);
  },
  getAuthInfo() {
    return getAuthorityInfo() && JSON.parse(getAuthorityInfo());
  },

  setAuthoInfo(authInfo) {
    setAuthorityInfo(JSON.stringify(authInfo));
  },
}
export default signUtil;
