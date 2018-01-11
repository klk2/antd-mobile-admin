import React from 'react'
import PropTypes from 'prop-types'
import { TabBar, Icon } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { arrayToTree, queryArray } from 'utils'
import pathToRegexp from 'path-to-regexp'

const TabMenuBar = ({ siderFold, menu, location, children }) => {
  // 生成树状
  const menuTree = arrayToTree(menu.filter(_ => _.mpid !== '-1'), 'id', 'mpid')

  // 递归生成菜单
  const getMenus = (menuTreeN, siderFoldN, selectMenu) => {
    return menuTreeN.map((item) => {
      return (
        <TabBar.Item key={item.id}
          title={item.name}
          selected={item.router === selectMenu.router}
          icon={<Icon type={item.icon} />}
          selectedIcon={<Icon type={item.icon} />}
        >
          {location.pathname === item.router ? children : null}
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

TabMenuBar.propTypes = {
  menu: PropTypes.array,
  siderFold: PropTypes.bool,
  location: PropTypes.object,
  children: PropTypes.element,
}

export default TabMenuBar
