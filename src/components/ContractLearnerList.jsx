import React from 'react';
import { connect } from 'react-redux';
import { actSaveData } from '../actions/Manage';
import { actSetCurrentContract } from '../actions/Detail';
import { Table, Button, Modal } from 'antd';
import {
  callApiGetUser,
  callApiChangeStatusContractAdmin,
  callApiChangeStatusContractUser
} from '../utils/apiCaller';

class ContractLearnerList extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,

    loading: false,
    visible: false
  };

  showModal = item => {
    const { actSetCurrentContract } = this.props;
    actSetCurrentContract(item);

    this.setState({
      visible: true
    });
  };

  handleOk = item => {
    item.pending_complaint = true;
    this.handleChangeStatus(item);
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = item => {
    this.handleChangeStatus(item);
    this.setState({ visible: false });
  };

  handleOpenChatBox = () => {};

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
        item.status =
          item.pending_complaint === true ? 'pending complaint' : 'finished';
        delete item.pending_complaint;
        const { actSetCurrentContract } = this.props;
        actSetCurrentContract(item);
        const { history } = this.props;
        history('/contract-learner');
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
          teacher: item.current_teacher.fullname,
          status: item.status,
          action:
            item.status === 'still validate' ? (
              <div>
                <Button type="primary" onClick={() => this.handleDetail(item)}>
                  Xem chi tiết
                </Button>
                <Button type="danger" onClick={() => this.showModal(item)}>
                  Kết thúc hợp đồng
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
        title: 'Teacher',
        dataIndex: 'teacher',
        key: 'teacher',
        sorter: (a, b) => a.teacher.length - b.teacher.length,
        sortOrder: sortedInfo.columnKey === 'teacher' && sortedInfo.order,
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
    const { visible, loading } = this.state;
    const { current_contract } = this.props;
    return (
      <div>
        <Modal
          visible={visible}
          title="Title"
          onOk={() => this.handleOk(current_contract)}
          onCancel={() => this.handleCancel(current_contract)}
          footer={[
            <Button
              key="back"
              onClick={() => this.handleCancel(current_contract)}
            >
              Kết thúc hợp đồng
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={() => this.handleOk(current_contract)}
            >
              Khiếu nại
            </Button>
          ]}
        >
          <p>Bạn có muốn khiếu nại hay không?</p>
        </Modal>
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
  current_user: state.detail.current_user,
  current_contract: state.detail.current_contract
});

const mapDispatchToProps = dispatch => ({
  actSaveData: data => dispatch(actSaveData(data)),
  actSetCurrentContract: current_contract =>
    dispatch(actSetCurrentContract(current_contract))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractLearnerList);
