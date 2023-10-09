import React, { Component } from "react";
import Layout from "../../core/Layout";
import Swal from "sweetalert2";
import { Redirect, withRouter } from "react-router-dom";
import { addNewTrain, updateTrain } from "../../../Utils/Requests/Train";

class Success extends Component {
  state = {
    loading: true,
    error: "",
  };

  async componentDidMount() {
    var formData = new FormData();

    for (var key in this.props.values) {
      formData.append(key, this.props.values[key]);
    }

    if (this.props.isUpdate) {
    	const resp = await updateTrain(this.props.match.params.slug, formData).catch(err => {
    		this.setState({ loading: false, error: err.response.data.error });
    	});
    	if (resp && resp.status === 200) {
    		this.setState({ loading: false });
    	}
    } else {
    	// Add the train
    	const resp = await addNewTrain(formData).catch(err => {
    		this.setState({ loading: false, error: err.response.data.error });
    	});
    	if (resp && resp.status === 200) {
    		this.setState({ loading: false });
    	}
    }
  }

  renderMessage = () => {
    const { error } = this.state;
    const message = this.props.isUpdate ? "updated" : "added";
    if (error) {
      Swal.fire({
        type: "error",
        title: error,
      });
      return <Redirect to="/" />;
    } else {
      Swal.fire({
        type: "success",
        title: `Successfully ${message} the train!`,
      });
      return <Redirect to="/" />;
    }
  };

  loadingShow = () => {
    return <h1>Loading...</h1>;
  };

  render() {
    return (
      <Layout>
        {this.state.loading ? this.loadingShow() : this.renderMessage()}
      </Layout>
    );
  }
}

export default withRouter(Success);
