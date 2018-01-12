import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Card, WhiteSpace, Icon } from 'antd-mobile'
import { color } from 'utils'
import { Page } from 'components'
import { NumberCard, Quote, Sales, Weather, Completed, Cpu } from './components'

import styles from './index.less'

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

function Dashboard({ dashboard, loading }) {
  const {
    weather, sales, quote, numbers, completed, cpu,
  } = dashboard
  const numberCards = numbers.map((item, key) => (<div key={key}>
    <NumberCard {...item} />
  </div>))
  // return (<div>dashboard</div>)
  return (
    <Page loading={loading.models.dashboard && sales.length === 0} className={styles.dashboard}>
      <div>
        {numberCards}
      </div>
      <Icon type="home" />
      {/* <Card bordered={false}
        bodyStyle={{
          padding: '24px 36px 24px 0',
        }}
      >
        <Sales data={sales} />
      </Card> */}
      <WhiteSpace size="sm" />
      {/* <Card bordered={false}
        className={styles.weather}
        bodyStyle={{
          padding: 0,
          height: 204,
          background: color.blue,
        }}
      >
        <Weather {...weather} loading={loading.effects['dashboard/queryWeather']} />
      </Card> */}
      {/* <Card bordered={false}
        className={styles.quote}
        bodyStyle={{
          padding: 0,
          height: 204,
          background: color.peach,
        }}
      >
        <Quote {...quote} />
      </Card> */}

      {/* <Card bordered={false} {...bodyStyle}>
        <RecentSales data={recentSales} />
      </Card>

      <Card bordered={false} {...bodyStyle}>
        <Comments data={comments} />
      </Card> */}


      {/* <Card bordered={false}
        bodyStyle={{
          padding: '24px 36px 24px 0',
        }}
      >
        <Completed data={completed} />
      </Card> */}


      {/* <Card bordered={false} {...bodyStyle}>
        <Browser data={browser} />
      </Card> */}

      {/* <Card bordered={false} {...bodyStyle}>
        <Cpu {...cpu} />
      </Card> */}

      {/* <Card bordered={false} bodyStyle={{ ...bodyStyle.bodyStyle, padding: 0 }}>
        <User {...user} />
      </Card> */}
    </Page>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard)
