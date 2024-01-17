import React from "react";
import { useCart } from "../../hooks/useCart";
// get the content of the cart for checkoutPage
import { useAuth } from "../../hooks/useAuth";
// to check if the user s logged in to proceed for checkout
import { useNavigate } from "react-router-dom";
// to navigaet it to payment when checout is done
import { useState } from "react";
// to define state of the order
import { useForm } from "react-hook-form";
// to get data from the form
import { toast } from "react-toastify";
import { createOrder } from "../../services/orderService";
import classes from "./CheckoutPage.module.css";
import Title from "../../components/Title/Title";
import Input from "../../components/input/input";
import Button from "../../components/Button/Button";
import OrderItemsList from "../../components/OrderItemsList/OrderItemsList";
import Map from "../../components/Map/Map";


export default function CheckoutPage() {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState({ ...cart });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = async data => {
    // i.e means user has not select the address on the map.
    if (!order.addressLatLng) {
      toast.warning("Please select your location on the map");
      return;
    }

    await createOrder({ ...order, name: data.name, address: data.address });
    navigate('/payment');
  };
  return (
    <>
      <form onSubmit={handleSubmit(submit)} className={classes.container}>
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem" />
          <div className={classes.inputs}>
            <Input
              defaultValue={user.name}
              label="Name"
              {...register("name")}
              error={errors.name}
            />
            <Input
              defaultValue={user.address}
              label="Address"
              {...register("address")}
              error={errors.address}
            />
          </div>
          <OrderItemsList order={order} />
        </div>
        <div>
          <Title title="Choose Your Location" fontSize="1.6rem" />
          <Map
            location={order.addressLatLng}
            onChange={latlng => {
              console.log(latlng);
              setOrder({ ...order, addressLatLng: latlng });
            }}
          />
        </div>
        <div className={classes.buttons_container}>
          <div className={classes.buttons}>
            <Button
              type="submit"
              text="Go to Payment"
              width="100%"
              height="3rem"
            />
          </div>
        </div>
      </form>
    </>
  );
}
