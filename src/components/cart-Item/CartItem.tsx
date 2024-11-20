import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../../redux/store";
import { CartItem } from "../../types/types";

type CartItemProps = {
  cartItem: CartItem;
  incrementHandler: (cartItem: CartItem) => void;
  decrementHandler: (cartItem: CartItem) => void;
  removeHandler: (productId: string) => void;
};

function CartItemComponent({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartItemProps) {
  const { productId, photo, name, price, quantity, stock } = cartItem;

  return (
    <>
      <div className="cart-item">
        <img src={`${server}/${photo}`} alt={name} />
        <article>
          <Link to={`\product\${productId}`}>{name}</Link>
          <span>₹{price}</span>
        </article>
        <div className="">
          <button onClick={() => decrementHandler(cartItem)}>-</button>
          <p>{quantity}</p>
          <button onClick={() => incrementHandler(cartItem)}>+</button>
        </div>
        <button onClick={() => removeHandler(productId)}>
          <FaTrash />
        </button>
      </div>
    </>
  );
}

export default CartItemComponent;
