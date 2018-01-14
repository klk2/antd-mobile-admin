import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd-mobile'
import CountUp from 'react-countup'
import { Iconfont } from 'components';
import styles from './numberCard.less'

function NumberCard({
  icon, color, title, number, countUp,
}) {
  return (
    <Card className={styles.numberCard} >
      <div>
        <Iconfont className={styles.iconWarp} style={{ color }} type={icon} />
        <div className={styles.content}>
          <p className={styles.title}>{title || 'No Title'}</p>
          <p className={styles.number}>
            <CountUp
              start={0}
              end={number}
              duration={2.75}
              useEasing
              useGrouping
              separator=","
              {...countUp || {}}
            />
          </p>
        </div></div>

    </Card>
  )
}

NumberCard.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.number,
  countUp: PropTypes.object,
}

export default NumberCard
