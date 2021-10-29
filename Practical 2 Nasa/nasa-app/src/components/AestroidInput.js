import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getRandomAestroid } from "../Redux/Actions/aestroidAction";
import { useHistory } from "react-router-dom";
import Spinner from "./Spinner";
import { getAllAestroid } from "../Redux/Actions/GetAllAestroids";

function AestroidInput(props) {
  let history = useHistory();

  const key = "bBQRIDOqkzdeDbBVEzrsOj8nG3C3bCusnl9I0HDp";
  const [aestroidId, setaestroidId] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  useEffect(() => {
    const getAestroids = async () => {
      setloading(true);
      let response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${key}`
      );
      props.dispatch(getAllAestroid(response["data"]["near_earth_objects"]));
      setloading(false);
    };
    if (props.totalAestroids.length === 0) {
      getAestroids();
    }
  }, []);

  const getAestroidDetails = async () => {
    await axios
      .get(`https://api.nasa.gov/neo/rest/v1/neo/${aestroidId}?api_key=${key}`)
      .then((response) => {
        props.dispatch(getRandomAestroid(response["data"], aestroidId));
        history.push("/info");
      })
      .catch((error) => {
        seterror("No Aestroid Found");
      });
  };

  const handleSubmit = () => {
    setloading(true);
    getAestroidDetails();
    setloading(false);
    setaestroidId("");
    seterror("");
  };

  const handleRandomAestroid = async () => {
    seterror("");
    setloading(true);
    const index = Math.floor(
      Math.random() * (props.totalAestroids.length - 0) + 0
    );
    let randomId = props.totalAestroids[index]["id"];
    setaestroidId(randomId);

    setloading(false);
  };

  const handleChange = (e) => {
    setaestroidId(e.target.value);
  };

  return (
    <>
      <h1 className="text-center">NASA App</h1>
      <div className="d-flex justify-content-center align-items-center container my-3">
        <div className="row ">
          <div>
            <div className="form-group">
              <input
                type="text"
                value={aestroidId}
                name="aestroid_id"
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Aestroid Id"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={aestroidId === ""}
              className="btn btn-info m-2"
            >
              Submit
            </button>
            <button
              onClick={handleRandomAestroid}
              disabled={props.totalAestroids.length === 0}
              className="btn btn-info m-2"
            >
              Random Aestroid
            </button>
            {loading && <Spinner />}
            {error && <p>{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  let { Aestroid, TotalAestroids } = state;
  return {
    aestroidDetails: Aestroid,
    totalAestroids: TotalAestroids,
  };
};
export default connect(mapStateToProps)(AestroidInput);
