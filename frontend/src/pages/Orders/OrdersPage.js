import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { getAll } from "../../services/orderService";
import classes from "./ordersPage.module.css";
import Title from "../../components/Title/Title";
import DateTime from "../../components/DateTime/DateTime";

const initialState = {};
const reducer = (state, action) => {
  // these are properties we want to pass to the reducer
  const { type, payload } = action;
  // based on type we can decide what kind of action we will take
  // inside the payload we have data along with action type.
  switch (type) {
    case "ORDERS_FETCHED":
      return { ...state, orders: payload };
    default:
      return state;
  }
};

export default function OrdersPage() {
  const [{ allStatus, orders }, dispatch] = useReducer(reducer, initialState);

  const { filter } = useParams();

  useEffect(() => {
    getAll(filter).then((orders) => {
      dispatch({ type: "ORDERS_FETCHED", payload: orders });
    });
  }, [filter]);
  // so when the filter changes the handler will be called.

  return (
    <div className={classes.container}>
      <Title title="Orders" margin="1.5rem 0 0 .2rem" fontSize="1.9rem" />

      {orders &&
        orders.map((order) => (
          <div key={order.id} className={classes.order_summary}>
            <div className={classes.header}>
              <span>{order.id}</span>
              <span>
                <DateTime date={order.createdAt} />
              </span>
              <span>{order.status}</span>
            </div>
          </div>
        ))}
    </div>
  );
}
