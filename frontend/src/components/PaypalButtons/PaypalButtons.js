import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
// this react-paypal-js is a libarary that paypal provides in react.
import React, { useEffect } from "react";
import { useLoading } from "../../hooks/useLoading";
import { pay } from "../../services/orderService";
import { useCart } from "../../hooks/useCart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function PaypalButtons({ order }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AY6dfZrf_iO1NY82ZWfi40I4k7uVJ2zcn-P0K3BnLx_4CcLVIEbpOmltr4zJyq_SBW4zw9Fv3fBwUBYa",
        // this comes from the developer acct we created with paypal
      }}
    >
      <Buttons order={order} />
      {/* reason we r using button here is paypalscriptprovider provides hooks to it child component that we want to use. */}
    </PayPalScriptProvider>
  );
}

function Buttons({ order }) {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [{ isPending }] = usePayPalScriptReducer();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    isPending ? showLoading() : hideLoading();
  });

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: order.totalPrice,
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const payment = await actions.order.capture();
      const orderId = await pay(payment.id);
      //pay is coming from orderService
      clearCart();
      toast.success("Payment Saved Successfully", "Success");
      navigate("/track/" + orderId);
    } catch (error) {
      toast.error("Payment Save Failed", "Error");
    }
  };

  const onError = (err) => {
    toast.error("Payment Failed", "Error");
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onError}
    />
  );
}
