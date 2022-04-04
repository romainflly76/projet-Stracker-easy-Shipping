// ******************** Authetification API ***********************// Recuperer de la partie Front ************$

import React, { useState, useEffect, useContext, createContext } from "react";
import jwt_decode from "jwt-decode";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

const setAccessToken = (token) =>
  token && sessionStorage.setItem("accessToken", token);

const setRefreshToken = (token) =>
  token && localStorage.setItem("refreshToken", token);

const setOAuthToken = (oAuth) => sessionStorage.setItem("oAuth", oAuth);

const getAccessToken = () => sessionStorage.getItem("accessToken");

const getRefreshToken = () => localStorage.getItem("refreshToken");

const getOAuthToken = () => sessionStorage.getItem("oAuth");

const api_url = process.env.REACT_APP_API_URL;

const getUser = (jwt) => {
  const token = jwt || getAccessToken();
  const user = token ? jwt_decode(token) : null;
  return user;
};

const isTokenExpired = (token) => {
  try {
    const decoded = jwt_decode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("accessToken");
    return false;
  }
};

const loggedIn = () => {
  const token = getAccessToken();
  if (!!token && !isTokenExpired(token)) {
    return true;
  }
  return false;
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [load, setLoad] = useState(false);

  const [oAuth, setOAuth] = useState(null);

  const getAuthorization = async () => {
    setLoad(true);

    const formData = new FormData();

    formData.append("grant_type", "client_credentials");
    formData.append("client_id", process.env.REACT_APP_CLIENT_ID);
    formData.append("client_secret", process.env.REACT_APP_CLIENT_SECRET);

    const response = await fetch(`${api_url}/authorization`, {
      method: "POST",
      body: formData,
    });

    const body = await response.json();
    setOAuth(body.access_token);
    setOAuthToken(body.access_token);
    setLoad(false);
    return body.access_token;
  };

  useEffect(() => {
    !oAuth && getAuthorization();
    return () => {
      getOAuthToken();
    };
  }, [oAuth]);

  const refreshToken = async (refresh_token) => {
    const r_token = refresh_token || getRefreshToken();

    if (!r_token) {
      return logout();
    }

    setLoad(true);
    return await fetch(`${api_url}/refresh_token`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getOAuthToken()}`,
      },
      method: "POST",
      body: JSON.stringify({
        refresh_token: r_token,
      }),
    })
      .then(async (resp) => {
        if (resp.status === 403) {
          await getAuthorization().then(
            async () => await refreshToken(refresh_token)
          );
        }
        return await resp.json();
      })
      .then((body) => {
        setLoad(false);
        setAccessToken(body.access_token);
        setRefreshToken(body.refresh_token);
        setUser(getUser(body.access_token));
        return body;
      });
  };

  const login = async (email, password) => {
    setLoad(true);
    return await fetch(`${api_url}/v1/signin`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getOAuthToken()}`,
      },
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(async (resp) => {
        if (resp.status === 403) {
          await getAuthorization().then(
            async () => await login(email, password)
          );
        }
        return await resp.json();
      })
      .then((body) => {
        setLoad(false);
        setAccessToken(body.access_token);
        setRefreshToken(body.refresh_token);
        setUser(getUser());
        return body;
      });
  };

  const logout = () => {
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("accessToken");
    setUser(false);
  };

  useEffect(() => {
    if (loggedIn()) {
      setUser(getUser());
    } else {
      refreshToken();
    }
    // eslint-disable-next-line
  }, []);

  // Return the user object and auth methods
  return {
    getAuthorization,
    getOAuthToken,
    getAccessToken,
    getUser,
    loggedIn,
    refreshToken,
    load,
    user,
    login,
    logout,
    // lost,
    // newPassword
  };
}
