import axios from 'axios';
import { API_KEY, FACEBOOK_APP_ID } from '../constant';
import { SET_CURRENT_WEATHER, SET_FORECAST_WEATHER } from '../action-types';
import { Facebook } from 'expo';

const WEATHER_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';
const FORECAST_WEATHER_BASE_URL =
  'http://api.openweathermap.org/data/2.5/forecast';

export const getCurrentWeatherByCity = city => async dispatch => {
  const response = await axios.get(
    `${WEATHER_BASE_URL}?q=${city}&appid=${API_KEY}`
  );
  dispatch({ type: SET_CURRENT_WEATHER, payload: response.data });
};

export const getForecastWeatherByCity = city => async dispatch => {
  const response = await axios.get(
    `${FORECAST_WEATHER_BASE_URL}?q=${city}&appid=${API_KEY}`
  );
  dispatch({ type: SET_FORECAST_WEATHER, payload: response.data });
};

export const facebookConnexion = (onSucces, onError) => dispatch => {
  Facebook.loginWithReadPermissionsAsync(FACEBOOK_APP_ID, {
    permission: ['public_profil']
  })
    .then(fbresponse => {
      if (fbResonse.type === 'succes') {
        // dispatcher success fbResponse.token
      } else {
        // dispatcher une erreur
      }
    })
    .catch(error => {
      // dispatcher une erreur
    });
};
