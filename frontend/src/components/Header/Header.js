import React from "react";
import classes from "./header.module.css"; // this is how we can import every class from header module.css so that we need not to
// import them singularly as strings.
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
// we've install react-router-dom package to manage the header links.

export default function Header() {
  const { user, logout } = useAuth();

  const { cart } = useCart(); // updating in the header as well earlier we were using a static cartnow we have updating using hooks

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to="/" className={classes.logo}>
          Food Mine!
        </Link>
        <nav>
          <ul>
            {user ? ( // if user is authenticated
              <li className={classes.menu_container}>
                <Link to="/profile">{user.name}</Link>
                <div className={classes.menu}>
                  <Link to={"/profile"}>Profile</Link>
                  <Link to={"/orders"}>Orders</Link>
                  <a onClick={logout}>Logout</a>
                </div>
              </li>
            ) : (
              // otherwise will be redirected to login page.
              <Link to={"/login"}>Login</Link>
            )}
            <li>
              <Link to={"/cart"}>
                Cart
                {cart.totalCount > 0 && (
                  <span className={classes.cart_count}>{cart.totalCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
