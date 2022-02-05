import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { startChecking } from "../actions/auth";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <h5>Espere...</h5>;
  }

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/login"
          element={
            <PublicRoute
              isAuthenticated={!!uid}
              element={<LoginScreen />}
            ></PublicRoute>
          }
        />

        <Route
          exact
          path="/"
          element={
            <PrivateRoute
              isAuthenticated={!!uid}
              element={<CalendarScreen />}
            ></PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
};
