import { TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getCountry } from "../Redux/Actions/CountryAction";
import Container from "@mui/material/Container";

import {
  Button,
  Card,
  CardMedia,
} from "@mui/material";

function FormComponent() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [country, setCountry] = useState("");
  const [error, seterror] = useState("");
  

  const getCountryData = async () => {
    await axios
      .get(`https://restcountries.com/v2/name/${country}`)
      .then((response) => {
        console.log(response);
        if (response["data"]["status"] !== 404) {
          dispatch(getCountry(response["data"]));
          history.push("/countries");
        } else {
          seterror("No Records..!!");
        }
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getCountryData();
  };

  return (
    <>
     <Container
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Card sx={{ width: 345, margin: "10px" }}>
          <CardMedia
            component="img"
            alt=""
            width="200rem"
            height="300rem"
            image="https://is5-ssl.mzstatic.com/image/thumb/Purple125/v4/8e/6f/58/8e6f582b-7501-4fc7-1b81-89c6c28815aa/source/512x512bb.jpg"
          />
      <h1 className="text-center">Weather App</h1>
      <div className="d-flex justify-content-center align-items-center container my-3">
        <div className="row ">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
            {/* <TextField id="filled-basic" label="Filled" variant="filled" /> */}
              <TextField
              variant="standard"
                type="text"
                value={country}
                onChange={handleChange}
                placeholder="enter country name"
              />
            </div>
            <Button
            type="submit"
            variant="contained"
              className="btn btn-info m-2"
              disabled={country.length === 0}
            >
              Submit
            </Button>
            {error && (
              <Typography gutterBottom variant="h5" component="div">
                {error}
              </Typography>
            )}
          </form>
        </div>
      </div>
      </Card>
      </Container>
    </>
  );
}

export default FormComponent;
