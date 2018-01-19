/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { ListView } from 'antd-mobile';
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import queryString from 'query-string'

import styles from './List.less'


// const List = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {
//   location.query = queryString.parse(location.search)

//   // const handleMenuClick = (record, e) => {
//   //   if (e.key === '1') {
//   //     onEditItem(record)
//   //   } else if (e.key === '2') {
//   //     confirm({
//   //       title: 'Are you sure delete this record?',
//   //       onOk () {
//   //         onDeleteItem(record.id)
//   //       },
//   //     })
//   //   }
//   // }

//   const columns = [
//     {
//       title: 'Avatar',
//       dataIndex: 'avatar',
//       key: 'avatar',
//       width: 64,
//       className: styles.avatar,
//       render: text => <img alt={'avatar'} width={24} src={text} />,
//     }, {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//       render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>,
//     }, {
//       title: 'NickName',
//       dataIndex: 'nickName',
//       key: 'nickName',
//     }, {
//       title: 'Age',
//       dataIndex: 'age',
//       key: 'age',
//     }, {
//       title: 'Gender',
//       dataIndex: 'isMale',
//       key: 'isMale',
//       render: text => (<span>{text
//         ? 'Male'
//         : 'Female'}</span>),
//     }, {
//       title: 'Phone',
//       dataIndex: 'phone',
//       key: 'phone',
//     }, {
//       title: 'Email',
//       dataIndex: 'email',
//       key: 'email',
//     }, {
//       title: 'Address',
//       dataIndex: 'address',
//       key: 'address',
//     }, {
//       title: 'CreateTime',
//       dataIndex: 'createTime',
//       key: 'createTime',
//     }, {
//       title: 'Operation',
//       key: 'operation',
//       width: 100,
//       // render: (text, record) => {
//       //   return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />
//       // },
//     },
//   ]

//   const getBodyWrapperProps = {
//     page: location.query.page,
//     current: tableProps.pagination.current,
//   }

//   // const getBodyWrapper = (body) => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

//   return (
//     <div>
//       {/* <Table
//         {...tableProps}
//         className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
//         bordered
//         scroll={{ x: 1250 }}
//         columns={columns}
//         simple
//         rowKey={record => record.id}
//         getBodyWrapper={getBodyWrapper}
//       /> */}
//     </div>
//   )
// }

// List.propTypes = {
//   onDeleteItem: PropTypes.func,
//   onEditItem: PropTypes.func,
//   location: PropTypes.object,
// }
function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}

class List extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
    };
  }

  componentDidMount() {
    // you can scroll to the specified position
    // this.lv.scrollTo(0, 120);
    const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
    this.setState({
      height: hei,
      dataSource: this.state.dataSource.cloneWithRows(this.props.dataSource),
    });
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
      });
    }
  }

  render() {
    const { onEndReached, loading } = this.props;
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    const row = (rowData, sectionID, rowID) => {
      return (
        <div key={rowID} style={{ padding: '0 15px' }}>
          <div
            style={{
              lineHeight: '50px',
              color: '#888',
              fontSize: 18,
              borderBottom: '1px solid #F6F6F6',
            }}
          >{rowData.name}</div>
          <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
            <img style={{ height: '64px', marginRight: '15px' }} src={rowData.avatar} alt="" />
            <div style={{ lineHeight: 1 }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{rowData.address}</div>
              <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowData.phone}</span></div>
            </div>
          </div>
        </div>
      );
    };
    return (
      <ListView
        ref={el => this.lv = el}
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        dataSource={this.state.dataSource}
        renderHeader={() => <span>header</span>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {loading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        pageSize={4}
        renderBodyComponent={() => <MyBody />}
        onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
        onEndReached={onEndReached}
        onEndReachedThreshold={1000}
      />
    );
  }
}

List.propTypes = {
  dataSource: PropTypes.array,
  onEndReached: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
  loading: PropTypes.bool,
}
export default List
