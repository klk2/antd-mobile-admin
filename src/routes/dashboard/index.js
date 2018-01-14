import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Card, WhiteSpace, Icon } from 'antd-mobile'
import { color } from 'utils'
import { Page, Iconfont } from 'components'
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
      <Card style={{
        padding: '24px 36px 24px 0',
      }}
      >
        <Sales data={sales} />
      </Card>
      <WhiteSpace size="lg" />
      <Card className={styles.weather}
        style={{
          padding: 0,
          height: 204,
          background: color.blue,
        }}
      >
        <Weather {...weather} loading={loading.effects['dashboard/queryWeather']} />
      </Card>
      <WhiteSpace size="lg" />
      <Card className={styles.quote}  >
        <Quote {...quote}
          style={{
            padding: 0,
            height: 204,
            background: color.peach,
          }}
        />
      </Card>
      <WhiteSpace size="lg" />
      <Card style={{
        padding: '24px 36px 24px 0',
      }}
      >
        <Completed data={completed} />
      </Card>
      <WhiteSpace size="lg" />
      <Card>
        <Cpu {...cpu} />
      </Card>
    </Page>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard)
