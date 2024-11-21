import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../../redux/api/orderAPI";
import { resetCart } from "../../redux/reduser/cartReducers";
import { RootState } from "../../redux/store";
import { newOrderRequest } from "../../types/api-types";
import { responceTost } from "../../utils/features";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckOutForm = () => {
  const stripe = useStripe();

  const elements = useElements();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.userReducers);

  const {
    shippingInfo,
    cartItems,
    subtotal,
    discount,
    tax,
    shippingCharges,
    total,
  } = useSelector((state: RootState) => state.cartReducer);

  const [newOrder] = useNewOrderMutation();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsProcessing(true);

    const orderData: newOrderRequest = {
      shippingInfo,
      orderItems: cartItems,
      subtotal,
      discount,
      tax,
      shippingCharges,
      total,
      user: user?._id!,
    };

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    if (error) {
      setIsProcessing(false);
      return toast.error(error.message || "Something wen't wrong");
    }

    if (paymentIntent.status === "succeeded") {
      // console.log("orderData : ", orderData);
      const res = await newOrder(orderData);
      console.log("res : ", res);
      dispatch(resetCart());
      console.log("Placing Order");
      responceTost(res, navigate, "/orders");
    }

    setIsProcessing(false);
  };

  return (
    <>
      <div className="checkout-container">
        <form onSubmit={submitHandler}>
          <PaymentElement />
          <button type="submit" disabled={isProcessing}>
            {isProcessing ? "Processing...." : "Pay"}
          </button>
        </form>
      </div>
    </>
  );
};

function Checkout() {
  const location = useLocation();

  const clientSecret: string | undefined = location.state;

  if (!clientSecret) return <Navigate to={"/shipping"} />;

  return (
    <Elements options={{ clientSecret }} stripe={stripePromise}>
      <CheckOutForm />
    </Elements>
  );
}

export default Checkout;

// clientSecret :  "pi_3QLfJLBm9mmfZOGL1EBZr9nX_secret_pAAkvaxRKRUrWWWd4588WosmE",
