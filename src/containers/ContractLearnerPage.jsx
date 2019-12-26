import React from "react";
import ContractLearnerList from "../components/ContractLearnerList";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { actLoginRequest, actGetUser, actLogout } from "../actions/Auth";

class ContractLearnerPage extends React.Component {
  componentDidUpdate() {
    const { actGetUser } = this.props;
    actGetUser();
  }

  history = type => {
    const { history } = this.props;
    if (type === "/contract-detail") {
      history.push("/contract-detail");
    } else {
      history.push("/contract-detail");
      history.push("/contract-learner");
    }
  };

  render() {
    const { username } = this.props;
    if (username && username !== undefined) {
      return (
        <div>
          <p className="title">CONTRACT LEARNER PAGE</p>
          <ContractLearnerList history={type => this.history(type)} />
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  email: state.auth.email,
  avatar: state.auth.avatar,

  token: state.auth.token,
  err: state.auth.err
});

const mapDispatchToProps = dispatch => ({
  actLoginRequest: user => dispatch(actLoginRequest(user)),
  actGetUser: () => dispatch(actGetUser()),
  actLogout: () => dispatch(actLogout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractLearnerPage);
