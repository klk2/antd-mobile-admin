import { routerRedux } from 'dva/router'
import { login } from 'services/login'
import { querySession } from 'services/app';

export default {
  namespace: 'login',

  state: {},

  effects: {
    * login({
      payload,
    }, { put, call, select }) {
      const session = yield call(querySession, payload)
      if (session.code === 1) {
        const data = yield call(login, payload)
        const { locationQuery } = yield select(_ => _.app)
        if (data.success) {
          const { from } = locationQuery
          yield put({ type: 'app/query' })
          if (from && from !== '/login') {
            yield put(routerRedux.push(from))
          } else {
            yield put(routerRedux.push('/dashboard'))
          }
        } else {
          throw data
        }
      } else {
        throw session;
      }
    },
    *  querySession({ payload }, { call }) {
      const session = yield call(querySession, payload);
      return session;
    },
  },

}
