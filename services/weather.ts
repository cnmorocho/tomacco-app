import axios, { AxiosResponse } from "axios";

type GeocodingApiResponse = {
  results: City[]
}

type City = {
  name: string,
  latitude: string,
  longitude: string,
  country: string,
}

type Weather = {
  current: {
    "temperature_2m": string;
  }
}

export async function getLatitudeAndLongitude(location: string) {
  const res: AxiosResponse<GeocodingApiResponse> = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${location.replace(' ', '+')}`);
  const cities: City[] = res.data.results;
  return cities;
}

export async function getWeather(latitude: string, longitude: string) {
  const res: AxiosResponse<Weather> = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&forecast_days=1`);
  const weather: Weather = res.data;
  return weather;
}
