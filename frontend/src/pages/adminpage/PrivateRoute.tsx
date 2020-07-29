import React, { useContext } from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
// Only difference from RouteProps is that component is mandatory
interface PrivateRouteProps extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/admin/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
