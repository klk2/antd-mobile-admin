import Cookies from 'js-cookie'
import config from './config.js'

export function getToken() {
  return Cookies.get(config.userTokenKey)
}

export function setToken(token) {
  return Cookies.set(config.userTokenKey, token)
}

export function removeToken() {
  return Cookies.remove(config.userTokenKey)
}

export function getUID() {
  return Cookies.get(config.userIdKey)
}

export function setUID(uid) {
  return Cookies.set(config.userIdKey, uid)
}

export function removeUID() {
  return Cookies.remove(config.userIdKey)
}

export function getAuthorityInfo() {
  return Cookies.get(config.authorityKey)
}

export function setAuthorityInfo(authInfo) {
  return Cookies.set(config.authorityKey, authInfo)
}

export function removeAuthorityInfo() {
  return Cookies.remove(config.authorityKey)
}
