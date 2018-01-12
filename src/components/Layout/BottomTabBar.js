import React from 'react'
import PropTypes from 'prop-types'
import { TabBar, Icon } from 'antd-mobile'
import { arrayToTree, queryArray } from 'utils'
import pathToRegexp from 'path-to-regexp'
import { routerRedux } from 'dva/router'

const BottomTabBar = ({ siderFold, menu, location, children }) => {
  // 生成树状
  const menuTree = arrayToTree(menu.filter(_ => _.mpid !== '-1'), 'id', 'mpid')

  // 递归生成菜单
  const getMenus = (menuTreeN, siderFoldN, selectMenu) => {
    return menuTreeN.map((item) => {
      return (
        <TabBar.Item key={item.id}
          title={item.name}
          selected={item.route === selectMenu.route}
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
          onPress={() => {
            routerRedux.push(item.route);
          }
          }
        >
          {location.pathname === item.route ? children : null}
        </TabBar.Item>
      )
    })
  }

  // 寻找选中路由
  let currentMenu

  for (let item of menu) {
    if (item.route && pathToRegexp(item.route).exec(location.pathname)) {
      currentMenu = item
      break
    }
  }
  if (!currentMenu) {
    currentMenu = menu[0]
  }
  const menuItems = getMenus(menuTree, siderFold, currentMenu)

  return (
    <TabBar
      unselectedTintColor="#949494"
      tintColor="#33A3F4"
      barTintColor="white"
    >
      {menuItems}
    </TabBar>

  )
}

BottomTabBar.propTypes = {
  menu: PropTypes.array,
  siderFold: PropTypes.bool,
  location: PropTypes.object,
  children: PropTypes.element,
}

export default BottomTabBar
