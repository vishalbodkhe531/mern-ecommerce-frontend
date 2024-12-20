import { Link } from "react-router-dom";
import ProductCart from "../../components/product/ProductCart";
import { useLatestProductsQuery } from "../../redux/api/productAPI";
import { CartItem, Product } from "../../types/types";
import toast from "react-hot-toast";
import { Skeleton } from "../../components/loader/Loader";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/reduser/cartReducers";

function Home() {
  const { data, isLoading, isError } = useLatestProductsQuery("");

  const dispatch = useDispatch();

  console.log("data : ", data);

  if (isError) toast.error("cannot fatch the product");

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  return (
    <>
      <div className="home">
        <section></section>
        <h1>
          Latest Products
          <Link to="/search" className="findmore">
            More
          </Link>
        </h1>

        <main>
          {isLoading ? (
            <Skeleton width="80vw" />
          ) : (
            data?.products.map((item: Product) => (
              <ProductCart
                productId={item._id}
                key={item._id}
                photo={item.photo}
                name={item.name}
                price={item.price}
                stock={item.stock}
                handler={addToCartHandler}
              />
            ))
          )}
        </main>
      </div>

      <article className="cover-video-container">
        <div className="cover-video-overlay"></div>
      </article>

      <article className="our-clients">
        <div>
          <h2>Our Clients</h2>
          <div>
            {/* {clients.map((client, i) => (
            <motion.img
              initial={{
                opacity: 0,
                x: -10,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  delay: i / 20,
                  ease: "circIn",
                },
              }}
              src={client.src}
              alt={client.alt}
              key={i}
            />
          ))} */}
          </div>
        </div>
      </article>

      <hr
        style={{
          backgroundColor: "rgba(0,0,0,0.1)",
          border: "none",
          height: "1px",
        }}
      />

      <article className="our-services">
        <ul></ul>
      </article>
    </>
  );
}

export default Home;
