import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

function AestroidCard(props) {
  let history = useHistory();
  return (
    <>
      <div className="d-flex justify-content-center align-items-center container my-3">
        <div className="row ">
          <div className="card" style={{ width: "20rem" }}>
            <div className="card-body">
              <h5 className="card-title">{props.aestroidDetails.name}</h5>
              <p className="card-text">
                <b>Aestroid Id: </b>
                {props.aestroidDetails.aestroid_id}
              </p>
              <p className="card-text">
                <b>Url: </b>
                {props.aestroidDetails.nasa_jpl_url}
              </p>
              <p className="card-text">
                <b>is Safe:</b>{" "}
                {!props.aestroidDetails.is_potentially_hazardous_asteroid
                  ? "potentially_hazardous_asteroid"
                  : "safe"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => history.push("/")}>Go to home</button>
    </>
  );
}

const mapStateToProps = (state) => {
  let { Aestroid } = state;
  return {
    aestroidDetails: Aestroid,
  };
};
export default connect(mapStateToProps)(AestroidCard);
