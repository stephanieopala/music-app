import { createContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';

const loggedinUser = window.localStorage.getItem('user');
const localData = {
  isAuthenticated: true,
  user: JSON.parse(loggedinUser),
};

const initialState = loggedinUser
  ? localData
  : {
      isAuthenticated: false,
      user: null,
    };

const handlers = {
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

  const login = useGoogleLogin({
    onSuccess: (response) => {
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

  const logout = () => {
    googleLogout();
    localStorage.clear();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
