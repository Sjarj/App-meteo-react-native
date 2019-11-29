import { SET_CURRENT_WEATHER } from '../action-types';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_WEATHER:
      return { ...state, ...payload };

    default:
      return state;
  }
};
