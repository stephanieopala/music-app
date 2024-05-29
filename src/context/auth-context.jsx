import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { useGoogleLogin } from '@react-oauth/google';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const loggedInUser = window.localStorage.getItem('user');
        if (loggedInUser) {
          console.log('loggedInUser', loggedInUser);

          // continue setup
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
    initialize();
  }, []);

  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log('login response', response);
      // complete login
      // dispatch({
      //   type: 'LOGIN',
      //   payload: {
      //     user: response,
      //   },
      // });
    },
    onError: (error) => {
      console.log(error);
      dispatch({
        type: 'LOGIN',
        payload: {
          user: null,
        },
      });
    },
  });

  //add logout

  return (
    <AuthContext.Provider value={{ ...state, login }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
