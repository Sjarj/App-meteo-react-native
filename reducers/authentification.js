import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_ERROR } from '../action-types';

const initialState = {
  token: undefined
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { token: payload };

    case FACEBOOK_LOGIN_ERROR:
      return { token: undefined };

    default:
      return state;
  }
};
