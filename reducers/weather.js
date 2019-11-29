import { SET_CURRENT_WEATHER } from '../action-types';

const initialState = { currentWeather: undefined };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_WEATHER:
      return { currentWeather: { ...state, ...payload } };

    default:
      return state;
  }
};
