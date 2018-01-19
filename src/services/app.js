/* global window */
import { request, config } from 'utils'

const { api } = config
const {
  user, userSession,
} = api
export async function querySession() {
  return request({
    url: userSession,
    method: 'post',
    cache: false,
  }).then((response) => {
    if (response && response.code === 1) {
      const { sessionKey, sessionSecret } = response.data;
      window.localStorage.setItem('sessionKey', sessionKey);
      window.localStorage.setItem('sessionSecret', sessionSecret);
    }
    return Promise.resolve(response);
  })
}

export async function query(params) {
  return request({
    url: user.replace('/:id', ''),
    method: 'get',
    data: params,
  })
}
