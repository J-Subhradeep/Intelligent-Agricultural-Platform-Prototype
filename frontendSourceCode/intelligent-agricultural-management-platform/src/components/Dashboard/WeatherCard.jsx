import { Card, CardContent, Grid, Typography } from "@mui/material";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import AirIcon from '@mui/icons-material/Air';
const WeatherCard = ({ weatherData }) => {
    const {
      main: { temp, feels_like, humidity, temp_min, temp_max },
      weather: [{ main, description }],
      wind: { speed },
      sys: { country }
    } = weatherData;
  
    const formattedTemp = `${(temp - 273.15).toFixed(1)}°C`;
    const formattedFeelsLike = `${(feels_like - 273.15).toFixed(1)}°C`;
  
    return (
      <Card sx={{ maxWidth: 750}}>
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            {main} - {description}
          </Typography>
          <Grid container spacing={3} rowGap={3}>
            <Grid item md={6} lg={4}>
              <Typography variant="body1" display="flex">
                Temperature: <ThermostatIcon sx={{ mr: 1 }} color="warning"/></Typography>
              <Typography variant="body2">{formattedTemp}</Typography>
            </Grid>
            <Grid item md={6} lg={4}>
              <Typography variant="body1 " display="flex">Maximum Temperature: <ThermostatIcon sx={{ mr: 1 }} color="error"/></Typography>
              <Typography variant="body2">{`${(temp_max - 273.15).toFixed(1)}°C`}</Typography>
            </Grid>
            <Grid item md={6} lg={4}>
              <Typography variant="body1" display="flex">Minimum Temperature: <ThermostatIcon sx={{ mr: 1 }} color="info"/></Typography>
              <Typography variant="body2">{`${(temp_min - 273.15).toFixed(1)}°C`}</Typography>
            </Grid>
            <Grid item md={6} lg={4}>
              <Typography variant="body1"  display="flex">Feels like:  <ThermostatIcon sx={{ mr: 1 }} color="warning"/></Typography>
              <Typography variant="body2">{formattedFeelsLike}</Typography>
            </Grid>
            <Grid item md={6} lg={4}>
              <Typography variant="body1"  display="flex">Humidity:<InvertColorsIcon sx={{ mr: 1 }} color="info"/></Typography>
              <Typography variant="body2">{humidity}%</Typography>
            </Grid>
            <Grid item md={6} lg={4}>
              <Typography variant="body1"  display="flex">Wind Speed:<AirIcon  sx={{ mr: 1 }} color="info"/></Typography>
              <Typography variant="body2">{speed} m/s</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

export default WeatherCard;