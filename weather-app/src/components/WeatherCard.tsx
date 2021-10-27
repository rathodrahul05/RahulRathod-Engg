import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import Container from "@mui/material/Container";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { WeatherInfo } from "../types/WeatherInfo";
function WeatherCard(props: any) {
  const history = useHistory();

  console.log(props.weather);
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
            width="100rem"
            height="200rem"
            image={props.weather.weather_icons}
          />
          <CardContent>
            <Typography gutterBottom variant="h2" component="div">
              {props.match.params.id}
            </Typography>
            <Typography gutterBottom variant="h2" component="div">
              {props.weather.temperature}°C
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              Wind Speed:{props.weather.wind_speed} m/s
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              Precip:{props.weather.precip} mm
            </Typography>
          </CardContent>
        </Card>
        );
      </Container>
      <Button onClick={() => history.push("/countries")}>Go back</Button>
    </>
  );
}
const mapStateToProps = (state: any) => {
  return {
    weather: state.Weather
  };
};
export default connect(mapStateToProps)(WeatherCard);
