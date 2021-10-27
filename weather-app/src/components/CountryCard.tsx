import { connect, useDispatch } from "react-redux";
import Container from "@mui/material/Container";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
import { getCapitalWeather } from "../Redux/Actions/WeatherAction";
import { useHistory } from "react-router";

function CountryCard(props: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const getWeatherData = async (city: string) => {
    await axios
      .get(
        `http://api.weatherstack.com/current?access_key=fd17f3bb156bd16e7618c1a91fcdd880&query=${city}`
      )
      .then((response) => {
        console.log(response["data"]["current"]);
        dispatch(getCapitalWeather(response["data"]["current"]));
        history.push(`/weatherinfo/${city}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const displayWeather = (city: string, name: string) => {
    console.log(city);
    getWeatherData(city);
  };

  return (
    <>
      <button style={{ position: "fixed" }} onClick={() => history.push("/")}>
        Go back To Home
      </button>

      <Container
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
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
                  Lat/Long:{country.latlng}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() =>
                    displayWeather(country["capital"], country["name"])
                  }
                >
                  Display Weather
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Container>
    </>
  );
}
const mapStateToProps = (state: any) => {
  return {
    countries: state.Country,
  };
};
export default connect(mapStateToProps)(CountryCard);
