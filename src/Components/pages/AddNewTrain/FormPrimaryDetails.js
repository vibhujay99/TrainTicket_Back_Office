import React, { Component } from "react";
import Layout from "../../core/Layout";
import Swal from "sweetalert2";

export default class FormPrimaryDetails extends Component {
  continue = e => {
    e.preventDefault();

    if (
      !this.props.values.name ||
      !this.props.values.fare ||
      !this.props.values.trainNumber
    ) {
      return Swal.fire({
        type: "error",
        title: "Fill all the required fields"
      });
    }
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;

    return (
      <Layout title="Add new train (Primary details)">
        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            className="form-control"
            required
            placeholder="Enter the train name"
            onChange={handleChange("name")}
            value={values.name}
          />
        </div>

        <div className="form-group">
          <label>train Number *</label>
          <input
            type="text"
            className="form-control"
            required
            placeholder="Enter the train number"
            onChange={handleChange("trainNumber")}
            value={values.trainNumber}
          />
          <small className="form-text text-muted">
            Enter in the format of AAA - 1111
          </small>
        </div>

        <div className="form-check check-group">
          <input
            type="checkbox"
            id="checkbox"
            className="form-check-input"
            onChange={handleChange("isAvailable")}
            checked={values.isAvailable}
          />
          <label className="checkbox-label" htmlFor="checkbox">
            is Available
          </label>
        </div>

        <div className="form-group">
          <label>train type</label>
          <select
            className="form-control"
            value={values.type}
            onChange={handleChange("type")}
          >
            <option>Normal</option>
            <option>AC</option>
            <option>Delux</option>
            <option>Suspense AC</option>
            <option>Suspense Delux</option>
          </select>
        </div>
        <div className="form-group">
          <label>Travels</label>
          <select
            className="custom-select custom-select-sm form-control"
            onChange={handleChange("travel")}
            value={values.travel}
          >
            <option value="Default" disabled>
              Select Travel
            </option>
            {values.travels.map(travel => (
              <option value={travel._id} key={travel._id}>
                {travel.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Fare (Rs) *</label>
          <input
            type="number"
            className="form-control"
            required
            placeholder="Enter the fare of train"
            onChange={handleChange("fare")}
            value={values.fare}
          />
        </div>

        <div className="form-group">
          <label>Seat Capacity</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter toal seats in the train"
            onChange={handleChange("numberOfSeats")}
            value={values.numberOfSeats}
          />
        </div>

        <button className="btn btn-info" onClick={this.continue}>
          Continue to next form
        </button>
      </Layout>
    );
  }
}
