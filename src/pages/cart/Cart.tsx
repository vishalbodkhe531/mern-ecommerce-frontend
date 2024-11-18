import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../../components/cart-Item/CartItem";
import {
  addToCart,
  calculatePrice,
  discoutApplied,
  removeCartItem,
} from "../../redux/reduser/cartReducers";
import { RootState, server } from "../../redux/store";
import { CartItem } from "../../types/types";

function Cart() {
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector((state: RootState) => state.cartReducer);

  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValideCouponCode, setIsValideCouponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock)
      return toast.error("stocks are limited");
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };

  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return toast.error("Invalide stocks");
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };

  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const timeOutId = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
          cancelToken,
        })
        .then((res) => {
          dispatch(discoutApplied(res.data.discount));
          setIsValideCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(discoutApplied(0));
          setIsValideCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
      cancel();
      setIsValideCouponCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    <>
      <div className="cart">
        <main>
          {cartItems.length > 0 ? (
            cartItems.map((el, idx) => (
              <CartItemCard
                key={idx}
                cartItem={el}
                incrementHandler={incrementHandler}
                decrementHandler={decrementHandler}
                removeHandler={removeHandler}
              />
            ))
          ) : (
            <h1>No Items Added</h1>
          )}
        </main>
        <aside>
          <p>Subtotle : ₹{subtotal}</p>
          <p>Shiping Charges : ₹{shippingCharges}</p>
          <p>Tax : ₹{tax}</p>
          <p>
            Discount : <em> - ₹{discount}</em>
          </p>
          <p>
            <b>Totle : ₹{total}</b>
          </p>

          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />

          {couponCode &&
            (isValideCouponCode ? (
              <span className="green">
                ₹{discount} off using <code>{couponCode}</code>
              </span>
            ) : (
              <span className="red">
                Invalide Coupon <VscError />
              </span>
            ))}

          {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
        </aside>
      </div>
    </>
  );
}

export default Cart;
