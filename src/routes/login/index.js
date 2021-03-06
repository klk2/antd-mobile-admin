import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, List, InputItem } from 'antd-mobile'
import { config } from 'utils'
import styles from './index.less'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      namevalue: null,
      pwdvalue: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    let formV = {
      loginName: this.state.namevalue,
      password: this.state.pwdvalue,
      loginType: 5,
    }
    dispatch({ type: 'login/login', payload: formV })
  }
  render() {
    const {
      loading,
    } = this.props;
    return (
      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt="logo" src={config.logo} />
          <span>{config.name}</span>
        </div>
        <List>
          <InputItem value={this.state.namevalue}
            onChange={e => this.setState({ namevalue: e })}
            placeholder="Username"
            clear
          >Name</InputItem>

          <InputItem value={this.state.pwdvalue}
            onChange={e => this.setState({ pwdvalue: e })}
            type="password"
            placeholder="Password"
            clear
          >Password</InputItem>
        </List>
        <div>
          <Button type="primary" onClick={this.handleSubmit} loading={loading.effects.login}>
            Sign in
          </Button>
          <p>
            <span>Username：guest</span>
            <span>Password：guest</span>
          </p>
        </div>


      </div>
    )
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ loading }) => ({ loading }))(Login)
