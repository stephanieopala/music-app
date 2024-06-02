import { createContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

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
  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      try {
        const loggedInUser = window.localStorage.getItem('user');
        if (loggedInUser) {
          console.log('loggedInUser', loggedInUser);
          const userData = JSON.parse(loggedInUser);
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user: userData,
            },
          });
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
      if (response.access_token) {
        const getUser = async () => {
          try {
            const userData = await axios.get(
              `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`,
              {
                headers: {
                  Authorization: `Bearer ${response.access_token}`,
                  Accept: 'application/json',
                },
              }
            );
            console.log('user data', userData.data);
            localStorage.setItem('user', JSON.stringify(userData.data));
            navigate('/users');
            dispatch({
              type: 'LOGIN',
              payload: {
                user: userData.data,
              },
            });
          } catch (error) {
            console.log(error);
            dispatch({
              type: 'LOGIN',
              payload: {
                user: null,
              },
            });
          }
        };
        getUser();
      }
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
