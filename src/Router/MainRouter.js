import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import SuperAdminRoute from "./SuperAdminRoute";
import Home from "../Components/pages/Home";
import Signin from "../Components/pages/Signin";
import MyBookings from "../Components/pages/Bookings";
import AllBookings from "../Components/pages/Bookings/all";
import AddNewTrain from "../Components/pages/AddNewTrain";
import Edittrain from "../Components/pages/AddNewTrain/EditTrain";
import EditProfile from "../Components/pages/Profile/edit";
import TrainAvailable from "../Components/pages/TrainAvailable";
import AllTrainAvailable from "../Components/pages/TrainAvailable/all";
import TrainUnavailable from "../Components/pages/TrainUnavailable";
import AllTrainUnavailable from "../Components/pages/TrainUnavailable/all";
import Owners from "../Components/pages/People/Owners";
import AddOwner from "../Components/pages/People/addOwner";
import Users from "../Components/pages/People/Users";
import Guests from "../Components/pages/People/Guests";
import Seats from "../Components/pages/Seats";
import Locations from "../Components/pages/Locations";
import EditLocation from "../Components/pages/Locations/edit";
import AddLocation from "../Components/pages/Locations/add";
import Travels from "../Components/pages/Travels";
import EditTravel from "../Components/pages/Travels/edit";
import AddTravel from "../Components/pages/Travels/add";

const MainRouter = () => (
  <Switch>
    <Route path="/signin" exact component={Signin} />
    <PrivateRoute path="/" exact component={Home} />
    <PrivateRoute path="/my-bookings" exact component={MyBookings} />
    <PrivateRoute path="/add-train" exact component={AddNewTrain} />
    <PrivateRoute path="/edit-train/:slug" exact component={Edittrain} />
    <PrivateRoute path="/train-available" exact component={TrainAvailable} />
    <PrivateRoute path="/train-unavailable" exact component={TrainUnavailable} />
    <PrivateRoute path="/seats-details/:slug" exact component={Seats} />
    <PrivateRoute
      path="/profile/edit"
      exact
      component={EditProfile}
    />
    <SuperAdminRoute path="/all-bookings" exact component={AllBookings} />
    <SuperAdminRoute
      path="/all-train-available"
      exact
      component={AllTrainAvailable}
    />
    <SuperAdminRoute
      path="/all-train-unavailable"
      exact
      component={AllTrainUnavailable}
    />
    <SuperAdminRoute path="/people-owners" exact component={Owners} />
    <SuperAdminRoute path="/people-users" exact component={Users} />
    <SuperAdminRoute path="/people-guests" exact component={Guests} />
    <SuperAdminRoute path="/locations" exact component={Locations} />
    <SuperAdminRoute path="/add-location" exact component={AddLocation} />
    <SuperAdminRoute path="/add-owner" exact component={AddOwner} />
    <SuperAdminRoute path="/edit-location/:slug" exact component={EditLocation} />
    <SuperAdminRoute path="/travels" exact component={Travels} />
    <SuperAdminRoute path="/add-travel" exact component={AddTravel} />
    <SuperAdminRoute path="/edit-travel/:slug" exact component={EditTravel} />
  </Switch>
);

export default MainRouter;
