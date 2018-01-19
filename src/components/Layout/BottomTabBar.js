import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { arrayToTree } from 'utils'
import pathToRegexp from 'path-to-regexp'
import { Iconfont } from 'components'
import styles from './BottomTabBar.less'

let tabCaches = [];

const BottomTabBar = ({
  siderFold, menu, tabContents, location, children, changeLocation,
}) => {
  // 生成树状
  const menuTree = arrayToTree(menu.filter(_ => _.mpid !== '-1'), 'id', 'mpid')
  let { pathname } = location;
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;

  // 递归生成菜单
  const getMenus = (menuTreeN, siderFoldN, selectMenu) => {
    const getBarContent = (item) => {
      const itemc = tabCaches.find(o => o.name === item.route);
      if (itemc && itemc.cache) {
        return itemc.cache;
      } else if (pathname === '/' || pathname.startsWith(item.route)) {
        const el = tabContents.find(o => o.path === item.route);
        if (el && el.dycomponent) {
          const selectV = <el.dycomponent location={location} />;
          tabCaches.push({ name: item.route, cache: selectV });
          return selectV;
        }
      }
      return null;
    };
    return menuTreeN.map((item) => {
      return (
        <TabBar.Item key={item.id}
          title={item.name}
          selected={
            item.route === selectMenu.route
          }
          icon={
            <Iconfont type={item.icon} className={styles.normalBarIcon} />}
          selectedIcon={
            <Iconfont type={item.icon} className={styles.selectedBarIcon} />}
          onPress={() => changeLocation(item.route)
          }
        >
          {
            getBarContent(item)
          }
        </TabBar.Item >
      )
    })
  }

  // 寻找选中路由
  let currentMenu

  for (let item of menu) {
    if (item.route && (pathToRegexp(item.route).exec(location.pathname) || location.pathname.startsWith(item.route))) {
      currentMenu = item
      break
    }
  }
  if (!currentMenu) {
    currentMenu = menu[0];
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
  tabContents: PropTypes.array,
  siderFold: PropTypes.bool,
  location: PropTypes.object,
  children: PropTypes.element,
  changeLocation: PropTypes.func,
}

export default BottomTabBar
