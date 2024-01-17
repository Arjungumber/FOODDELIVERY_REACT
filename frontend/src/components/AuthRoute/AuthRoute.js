import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function AuthRoute({ children }) {
  const location = useLocation();
  const { user } = useAuth();

  return user ? (
    children
  ) : (
    // returnUrl is current returnUrl i.e checkout.
    // replace means remoe all the history.
    // so user wont be able to press back to go back.
    <Navigate to={`/login?returnUrl=${location.pathname}`} replace />
  );
}
