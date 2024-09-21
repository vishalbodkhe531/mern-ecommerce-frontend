import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../../components/cart-Item/CartItem";
import { Link } from "react-router-dom";

const cartsItem = [
  {
    productId: "123",
    photo: "https://m.media-amazon.com/images/I/61UBJTVndXL._SY450_.jpg",
    name: "mackbook",
    price: 3000000,
    quantity: 4,
    stock: 10,
  },
];
const subtotle = 27123;
const tax = Math.round(subtotle * 0.18);
const shipingCharges = 200;
const discount = 400;
const totle = subtotle + tax + shipingCharges;

function Cart() {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValideCouponCode, setIsValideCouponCode] = useState<boolean>(false);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (Math.random() > 0.5) setIsValideCouponCode(true);
      else setIsValideCouponCode(false);
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
      setIsValideCouponCode(false);
    };
  }, [couponCode]);

  return (
    <>
      <div className="cart">
        <main>
          {cartsItem.length > 0 ? (
            cartsItem.map((el, idx) => <CartItem key={idx} cartItem={el} />)
          ) : (
            <h1>No Items Added</h1>
          )}
        </main>
        <aside>
          <p>Subtotle : ₹{subtotle}</p>
          <p>Shiping Charges : ₹{shipingCharges}</p>
          <p>Tax : ₹{tax}</p>
          <p>
            Discount : <em> - ₹{discount}</em>
          </p>
          <p>
            <b>Totle : ₹{totle}</b>
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

          {cartsItem.length > 0 && <Link to="/shipping">Checkout</Link>}
        </aside>
      </div>
    </>
  );
}

export default Cart;
