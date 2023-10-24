import React from "react";
import classes from "./header.module.css"; // this is how we can import every class from header module.css so that we need not to
// import them singularly as strings.
import { Link } from "react-router-dom";
// we've install react-router-dom package to manage the header links.

export default function Header() {
  const user = {
    name: "John",
  };

  const cart = {
    totalCount: 10,
  };

  const logout = () => {};

  return (
    <header className={classes.header}>
      <div className={classes.container}>

      <Link to="/" className={classes.logo}>
        Food Mine!
      </Link>
      <nav>
        <ul>
          {user ? ( // if user is authenticated
            <l1 className={classes.menu_container}>
              <Link to="/profile">{user.name}</Link>
              <div className={classes.menu}>
                <Link to={"/profile"}>Profile</Link>
                <Link to={"/orders"}>Orders</Link>
                <a onClick={logout}>Logout</a>
              </div>
            </l1>
          ) : (
            // otherwise will be redirected to login page.
            <Link to={"/login"}></Link>
          )}
          <li>
            <Link to={"/cart"}>
              Cart
              {cart.totalCount > 0 && <span className={classes.cart_count}>{cart.totalCount}</span>}
            </Link>
          </li>
        </ul>
      </nav>
      </div>
    </header>
  );
}
