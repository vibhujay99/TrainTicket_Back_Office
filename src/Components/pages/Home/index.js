import React from "react";
import { Doughnut } from "react-chartjs-2";
import Layout from "../../core/Layout";
import {
  getAllAvailableTrains,
  getAllUnavailableTrains,
  getAvailableTrainsOfOwner,
  getUnavailableTrainsOfOwner,
} from "../../../Utils/Requests/Train";
import { getOwners, getGuests, getUsers } from "../../../Utils/Requests/People";
import { isAuthenticated } from "../../../Utils/Requests/Auth";
import { getOwnerBookings } from "../../../Utils/Requests/Booking";

class Home extends React.Component {
  state = {
    totaltrain: {},
    totalPeople: {},
    mytrain: {},
    myBookings: {},
    allBookings: {},
    user: { role: "owner" },
  };

  componentDidMount() {
    const { user } = isAuthenticated();
    this.setState({ user });
    this.fetchAlltrainData();
    this.fetchAllPeopleData();
    this.fetchMytrainData();
    this.fetchBookingData();
  }

  handleRedirect = (e) => {
    this.props.history.push(`${e._url[e._index]}`);
  };

  fetchAlltrainData = async () => {
    let availablecount = 0;
    let unavailablecount = 0;
    const avialable = await getAllAvailableTrains();
    if (avialable && avialable.status === 200) {
      availablecount = avialable.data.length;
    }
    const unavailable = await getAllUnavailableTrains();
    if (unavailable && unavailable.status === 200) {
      unavailablecount = unavailable.data.length;
    }
    this.setState({
      totaltrain: {
        labels: ["Available", "Unavailable"],
        datasets: [
          {
            data: [availablecount, unavailablecount],
            backgroundColor: ["#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#36A2EB", "#FFCE56"],
          },
        ],
      },
    });
  };

  fetchAllPeopleData = async () => {
    let guestscount = 0;
    let userscount = 0;
    let ownerscount = 0;

    const owners = await getOwners();
    if (owners && owners.status === 200) {
      ownerscount = owners.data.length;
    }

    const guests = await getGuests();
    if (guests && guests.status === 200) {
      guestscount = guests.data.length;
    }

    const users = await getUsers();
    if (users && users.status === 200) {
      userscount = users.data.length;
    }

    this.setState({
      totalPeople: {
        labels: ["Owners", "Users", "Guests"],
        datasets: [
          {
            data: [ownerscount, userscount, guestscount],
            backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
            hoverBackgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
          },
        ],
      },
    });
  };

  fetchMytrainData = async () => {
    let availablecount = 0;
    let unavailablecount = 0;
    const avialable = await getAvailableTrainsOfOwner();
    if (avialable && avialable.status === 200) {
      availablecount = avialable.data.length;
    }
    const unavailable = await getUnavailableTrainsOfOwner();
    if (unavailable && unavailable.status === 200) {
      unavailablecount = unavailable.data.length;
    }
    this.setState({
      mytrain: {
        labels: ["Available", "Unavailable"],
        datasets: [
          {
            data: [availablecount, unavailablecount],
            backgroundColor: ["#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#36A2EB", "#FFCE56"],
          },
        ],
      },
    });
  };

  fetchBookingData = async () => {
    let verifiedcount = 0;
    let unverifiedcount = 0;
    let payedcount = 0;
    const resp = await getOwnerBookings();

    if (resp && resp.status === 200) {
      resp.data.map((booking) => {
        if (booking.verification === "verified") {
          verifiedcount++;
        } else if (booking.verification === "notverified") {
          unverifiedcount++;
        } else if (booking.verification === "payed") {
          payedcount++;
        }
      });
    }

    this.setState({
      myBookings: {
        labels: ["Verfied", "UnVerified", "Payed"],
        datasets: [
          {
            data: [verifiedcount, unverifiedcount, payedcount],
            backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
            hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
          },
        ],
      },
    });
  };

  render() {
    const { totaltrain, totalPeople, mytrain, myBookings } = this.state;
    const { role } = this.state.user;
    return (
      <Layout>
        <div className="container">
          {role === "superadmin" && (
            <div className="row">
              <div className="col-md-6">
                <h3>Total Trains</h3>
                <Doughnut
                  data={totaltrain}
                  height={20}
                  width={50}
                  onElementsClick={(e) => {
                    e[0]._url = [
                      "all-train-available",
                      "all-train-unavailable",
                    ];
                    this.handleRedirect(e[0]);
                  }}
                />
              </div>
              <div className="col-md-6">
                <h3>Total People</h3>
                <Doughnut
                  data={totalPeople}
                  height={20}
                  width={50}
                  onElementsClick={(e) => {
                    e[0]._url = [
                      "people-owners",
                      "people-users",
                      "people-guests",
                    ];
                    this.handleRedirect(e[0]);
                  }}
                />
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-md-6">
              <h3>My train</h3>
              <Doughnut
                data={mytrain}
                height={20}
                width={50}
                onElementsClick={(e) => {
                  e[0]._url = ["train-available", "train-unavailable"];
                  this.handleRedirect(e[0]);
                }}
              />
            </div>
            <div className="col-md-6">
              <h3>Booking Status</h3>
              <Doughnut
                data={myBookings}
                height={20}
                width={50}
                onElementsClick={(e) => {
                  e[0]._url = ["my-bookings", "my-bookings", "my-bookings"];
                  this.handleRedirect(e[0]);
                }}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Home;
