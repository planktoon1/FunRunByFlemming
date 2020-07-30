import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import React, { createContext } from "react";
const poolData = {
  ClientId: "41tm9g8bkpgj2d8orcok0krua",
  UserPoolId: "eu-central-1_vyQqi1bDt",
};
interface AuthContextI {
  authenticate: (Username: any, Password: any) => Promise<unknown>;
  getSession: () => any;
  logout: () => void;
  isLoggedIn: () => boolean;
  getToken: () => string;
  authFetch: (endpoint: any) => Promise<any>;
}
const Pool = new CognitoUserPool(poolData);
const AuthContext = createContext<AuthContextI>({
  authenticate: () => Promise.resolve(),
  getSession: () => Promise.resolve(),
  logout: () => {},
  isLoggedIn: () => false,
  getToken: () => "",
  authFetch: () => Promise.resolve(),
});

const AuthContextProvider = (props) => {
  const getSession = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      const session = user.getSession((err, session) => {
        if (err) {
          throw new Error(err);
        }
        return session;
      });
      return session;
    } else {
      throw new Error(`User is not signed in`);
    }
  };
  const isLoggedIn = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      const session = user.getSession((err, session) => {
        if (err) {
          return false;
        } else if (session.isValid()) {
          return true;
        }
        return false;
      });
      return session;
    } else {
      return false;
    }
  };

  const getToken = (type = "idToken") => {
    // valid arguments: "idToken" and "accessToken"
    try {
      const session = getSession();
      if (session && session.isValid()) {
        return session[type].jwtToken;
      }
    } catch (error) {
      return error;
    }
  };

  const authFetch = async function (endpoint) {
    try {
      const token = getToken();
      console.log(token);

      if (!token) {
        throw new Error("Attempting to get token, but no session");
      }

      const response = await fetch(endpoint, {
        headers: {
          Authorization: token,
          "content-type": "application/json",
        },
      });

      const data = await response.json();

      return data;
    } catch (err) {
      console.error(err.message);
      return undefined;
    }
  };

  const authenticate = async (Username, Password) =>
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });
      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("onSuccess:", data);
          resolve(data);
        },

        onFailure: (err) => {
          console.error("onFailure:", err);
          reject(err);
        },

        newPasswordRequired: (data) => {
          console.log("newPasswordRequired:", data);
          resolve(data);
        },
      });
    });

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authenticate,
        getSession,
        logout,
        isLoggedIn,
        getToken,
        authFetch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
