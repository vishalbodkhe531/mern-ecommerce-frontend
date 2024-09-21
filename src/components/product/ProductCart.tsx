import { FaExpandAlt, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export type ProductProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: () => void;
};

function ProductCart({
  productId,
  photo,
  name,
  price,
  stock,
  handler,
}: ProductProps) {
  return (
    <div className="product-card">
      <img src={photo} />
      <p>{name}</p>
      <span>₹{price}</span>

      <div>
        <button onClick={() => handler()}>
          <FaPlus />
        </button>

        {/* <Link to={`/product/${productId}`}> */}
        <Link to={`/product/`}>
          <FaExpandAlt />
        </Link>
      </div>
    </div>
  );
}

export default ProductCart;
