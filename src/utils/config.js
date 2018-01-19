const APIV1 = '/api/v1'
const APIV2 = '/api/v2'

module.exports = {
  name: 'uvrms-web-mobile-app',
  prefix: 'uvrmsWebMobileApp',
  footerText: 'uvrms-web-mobile-app  © 2018 ',
  logo: '/logo.svg',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  authorityKey: 'account_session_authinfo',
  userTokenKey: 'fanybook_token_key',
  userIdKey: 'fanybook_uid_key',
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  api: {
    userSession: '/uvrms/session/gen.action',
    userLogin: '/uvrms/login/doLogin.action',
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
}
