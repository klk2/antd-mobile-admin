/* global window */
import { request, config, signUtil } from 'utils'

const { api } = config
const { userLogin, userLogout } = api

const { withSignParams } = signUtil;
export async function login(data) {
  data = withSignParams(data, false);
  return request({
    url: userLogin,
    method: 'post',
    data,
  }).then((response) => {
    if (response.success) {
      window.localStorage.setItem('accessToken', response.data.accessToken);
    }
    return Promise.resolve(response);
  })
}
export async function logout(params) {
  return request({
    url: userLogout,
    method: 'get',
    data: params,
  })
}

export function getToken() {
  let token = window.localStorage.getItem('accessToken');
  if (token) {
    return token;
  }
  return '';
}
