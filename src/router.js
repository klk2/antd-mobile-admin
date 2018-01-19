import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from 'routes/app'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })

  const routes = [
    {
      path: '/dashboard',
      dycomponent: dynamic({
        app,
        models: () => [import('./models/dashboard')],
        component: () => import('./routes/dashboard/'),
      }),
    }, {
      path: '/user',
      dycomponent: dynamic({
        app,
        models: () => [import('./models/user')],
        component: () => import('./routes/user/'),
      }),

    }, {
      //     path: '/user/:id',
      //     models: () => [import('./models/user/detail')],
      //     component: () => import('./routes/user/detail/'),
      //   }, {
      path: '/login',
      dycomponent: dynamic({
        app,
        models: () => [import('./models/login')],
        component: () => import('./routes/login/'),
      }),

    }, {
      path: '/UIElement/iconfont',
      dycomponent: dynamic({
        app,
        component: () => import('./routes/UIElement/iconfont/'),
      }),
    }, // {
  ]

  return (
    <ConnectedRouter history={history}>
      <App tabContents={routes}>
        <div>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/dashboard" />)} />
            {
              routes.map(({ path, dycomponent }, key) => (
                <Route key={key}
                  exact
                  path={path}
                  component={dycomponent}
                />
              ))
            }
            <Route component={error} />
          </Switch>
        </div>
      </App>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
