import { SET_CURRENT_WEATHER } from '../action-types';

const initialState = { data: undefined };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_WEATHER:
      return { data: { ...state, ...payload } };

    default:
      return state;
  }
};
