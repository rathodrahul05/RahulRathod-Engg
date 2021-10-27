import React from "react";
import { connect } from "react-redux";
import Container from "@mui/material/Container";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";


function CountryCard(props: any) {
  return (
    <Container
      sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}
    >
      {props.countries.map((country: any, index: number) => {
        return (
          <Card sx={{ maxWidth: 345, margin: "10px" }} key={index}>
            <CardMedia
              component="img"
              alt=""
              width="200rem"
              height="200rem"
              image={country["flags"]["png"]}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {country["capital"]}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                Population: {country["population"]}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                Lat/Long:
                {country["latlng"].map((item: any) => {
                  return <b>{item},</b>;
                })}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() =>
                  props.displayWeather(country["capital"], country["name"])
                }
              >
                Display Weather
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </Container>
  );
}
const mapStateToProps = (state: any) => {
  return {
    countries: state.Country,
  };
};
export default connect(mapStateToProps)(CountryCard);
