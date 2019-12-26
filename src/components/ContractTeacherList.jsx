import React from 'react';
import { connect } from 'react-redux';
import { actSaveData } from '../actions/Manage';
import { actSetCurrentContract } from '../actions/Detail';
import { Table, Button } from 'antd';
import {
  callApiGetUser,
  callApiChangeStatusContractAdmin,
  callApiChangeStatusContractUser
} from '../utils/apiCaller';

class ContractTeacherList extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null
  };

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  handleDetail = item => {
    const { actSetCurrentContract } = this.props;
    actSetCurrentContract(item);
    const { history } = this.props;
    history('/contract-detail');
  };

  handleChangeStatus = item => {
    return callApiChangeStatusContractAdmin(item).then(result => {
      item.id = result.data.id;
      callApiChangeStatusContractUser(item).then(() => {
        item.status = 'finished';
        const { actSetCurrentContract } = this.props;
        actSetCurrentContract(item);
        const { history } = this.props;
        history('/contract-teacher');
      });
    });
  };

  componentDidMount() {
    const { _id } = this.props;
    callApiGetUser(_id).then(result => {
      let data = [];
      result.data.contract.forEach(item => {
        data.push({
          key: item._id,
          learner: item.current_learner.fullname,
          status: item.status,
          action:
            item.status === 'still validate' ? (
              <div>
                <Button type="primary" onClick={() => this.handleDetail(item)}>
                  Xem chi tiết
                </Button>
                <Button
                  type="primary"
                  onClick={() => this.handleOpenChatBox(item)}
                >
                  Chat
                </Button>
              </div>
            ) : (
              <div>
                <Button type="primary" onClick={() => this.handleDetail(item)}>
                  Xem chi tiết
                </Button>
              </div>
            )
        });
      });
      const { actSaveData } = this.props;
      actSaveData(data);
    });
  }

  render() {
    const { data } = this.props;
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'Learner',
        dataIndex: 'learner',
        key: 'learner',
        sorter: (a, b) => a.learner.length - b.learner.length,
        sortOrder: sortedInfo.columnKey === 'learner' && sortedInfo.order,
        ellipsis: true
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        filters: [
          { text: 'finished', value: 'finished' },
          { text: 'still validate', value: 'still validate' },
          { text: 'forced terminate', value: 'forced terminate' },
          { text: 'pending complaint', value: 'pending complaint' }
        ],
        filteredValue: filteredInfo.status || null,
        onFilter: (value, record) => record.status.includes(value),
        ellipsis: true
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        ellipsis: true
      }
    ];
    return (
      <div>
        <Table
          columns={columns}
          dataSource={data}
          onChange={this.handleChange}
          className="contract-table-list"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  _id: state.auth._id,
  data: state.manage.data,
  current_user: state.detail.current_user
});

const mapDispatchToProps = dispatch => ({
  actSaveData: data => dispatch(actSaveData(data)),
  actSetCurrentContract: current_contract =>
    dispatch(actSetCurrentContract(current_contract))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractTeacherList);
