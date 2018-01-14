import React from 'react'
import PropTypes from 'prop-types'
import styles from './quote.less'

function Quote({ name, content, title, avatar, style }) {
  return (
    <div className={styles.quote} style={style}>
      <div className={styles.inner}>
        {content}
      </div>
      <div className={styles.footer}>
        <div className={styles.description}>
          <p>-{name}-</p>
          <p>{title}</p>
        </div>
        <div className={styles.avatar} style={{ backgroundImage: `url(${avatar})` }} />
      </div>
    </div>
  )
}

Quote.propTypes = {
  name: PropTypes.string,
  content: PropTypes.string,
  title: PropTypes.string,
  avatar: PropTypes.string,
  style: PropTypes.object,
}

export default Quote
