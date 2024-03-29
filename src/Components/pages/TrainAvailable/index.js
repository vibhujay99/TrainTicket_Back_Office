/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import Layout from "../../core/Layout";
import {
  getAvailableTrainsOfOwner,
  removeTrain
} from "../../../Utils/Requests/Train";
import ReactDatatable from "@ashvin27/react-datatable";
import moment from "moment";
import Swal from "sweetalert2";
import { SERVER_ROUTE } from "../../../Utils/config";
import Loading from "../../core/Loading";

class TrainAvailable extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        key: "sn",
        text: "S.N",
        className: "id",
        align: "left",
        sortable: true
      },
      {
        key: "image",
        text: "Image",
        className: "image",
        width: 100,
        align: "left",
        sortable: false,
        cell: record => {
          console.log(record);
          return (
            <>
              <img
                className="trainImage"
                src={`${SERVER_ROUTE}/uploads/` + record.image}
              />
            </>
          );
        }
      },
      {
        key: "name",
        text: "Name",
        className: "name",
        align: "left",
        sortable: true
      },
      {
        key: "trainNumber",
        text: "train Number",
        className: "trainNumber",
        align: "left",
        sortable: true
      },
      {
        key: "journeyDate",
        text: "Journey Date",
        className: "date",
        align: "left",
        sortable: true
      },
      {
        key: "departure_time",
        text: "Departure Time",
        className: "date",
        align: "left",
        sortable: true
      },
      {
        key: "action",
        text: "Action",
        className: "action",
        width: 100,
        align: "left",
        sortable: false,
        cell: record => {
          return (
            <>
              <button
                data-toggle="modal"
                data-target="#update-user-modal"
                className="btn btn-primary btn-sm"
                onClick={() =>
                  this.props.history.push(`/edit-train/${record.slug}`)
                }
                style={{ marginRight: "5px" }}
              >
                <i className="fa fa-edit"></i>
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => this.deleteRecord(record.slug)}
                style={{ marginRight: "5px" }}
              >
                <i className="fa fa-trash"></i>
              </button>
              <button
                className="btn btn-default btn-sm"
                onClick={() =>
                  this.props.history.push(`/seats-details/${record.slug}`)
                }
              >
                <i className="fa fa-eye" />
              </button>
            </>
          );
        }
      }
    ];

    this.config = {
      page_size: 10,
      length_menu: [10, 20, 50],
      filename: "trains",
      no_data_text: "No train found!",
      button: {
        excel: true,
        print: true,
        csv: true
      },
      language: {
        length_menu: "Show _MENU_ result per page",
        filter: "Filter in records...",
        info: "Showing _START_ to _END_ of _TOTAL_ records",
        pagination: {
          first: "First",
          previous: "Previous",
          next: "Next",
          last: "Last"
        }
      },
      show_length_menu: true,
      show_filter: true,
      show_pagination: true,
      show_info: true
    };

    this.state = {
      trains: [],
      isLoading: true,
      error: ""
    };
  }

  componentDidMount() {
    this.fetchAvailabletrains();
  }

  componentDidUpdate(nextProps, nextState) {
    if (nextState.trains === this.state.trains) {
      this.fetchAvailabletrains();
    }
  }

  deleteRecord = slug => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async result => {
      if (result.value) {
        const resp = await removeTrain(slug).catch(err => {
          this.setState({ error: err.response.data.error });
        });
        if (resp && resp.status === 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          this.setState({});
        }
      }
    });
  };

  fetchAvailabletrains = async () => {
    const trains = await getAvailableTrainsOfOwner().catch(err => {
      this.setState({ error: err.response.data.error, isLoading: false });
    });
    if (trains && trains.status === 200) {
      let counter = 1;
      trains.data.map(train => {
        train.journeyDate = moment(train.journeyDate).format("MMMM Do, YYYY");
        train.sn = counter;
        counter++;
        return train;
      });
      this.setState({ trains: trains.data, isLoading: false });
    }
  };

  pageChange = pageData => {
    console.log("OnPageChange", pageData);
  };

  render() {
    return (
      <Layout title="My trains > Available trains">
        <div className="d-flex" id="wrapper">
          <div id="page-content-wrapper">
            <div className="container-fluid">
              <button className="btn btn-link mt-3" id="menu-toggle"></button>
              <button
                className="btn btn-outline-primary float-right mt-3 mr-2"
                data-toggle="modal"
                data-target="#add-user-modal"
                onClick={() => this.props.history.push("/add-train")}
              >
                {" "}
                Add train
              </button>
              <h1 className="mt-2 text-primary">My Available trains</h1>
              {this.state.isLoading ? (
                <Loading />
              ) : (
                <ReactDatatable
                  config={this.config}
                  records={this.state.trains}
                  columns={this.columns}
                  onPageChange={this.pageChange}
                />
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default TrainAvailable;
