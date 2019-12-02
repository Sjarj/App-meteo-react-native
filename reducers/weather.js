import { SET_CURRENT_WEATHER, SET_FORECAST_WEATHER } from '../action-types';

const initialState = { currentWeather: undefined };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_WEATHER:
      return { ...state, currentWeather: payload };

    case SET_FORECAST_WEATHER:
      return { ...state, forecastWeather: payload };

    default:
      return state;
  }
};
