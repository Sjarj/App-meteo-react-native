import axios from 'axios';
import { API_KEY, FACEBOOK_APP_ID } from '../constant';
import {
  SET_CURRENT_WEATHER,
  SET_FORECAST_WEATHER,
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_ERROR
} from '../action-types';
import * as Facebook from 'expo-facebook';
import { AsyncStorage } from 'react-native';

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

export const facebookLogin = (onSucces, onError) => dispatch => {
  Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
    permissions: ['public_profil']
  })
    .then(fbresponse => {
      if (fbResonse.type === 'succes') {
        // dispatcher success fbResponse.token
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: fbresponse.token });
        AsyncStorage.setItem('fbToken', fbresponse.token);
        onSucces && onSucces();
      } else {
        // dispatcher une erreur
        dispatch({ type: FACEBOOK_LOGIN_ERROR });
        onError && onError();
      }
    })
    .catch(error => {
      // dispatcher une erreur
      dispatch({ type: FACEBOOK_LOGIN_ERROR });
      onError && onError();
    });
};
