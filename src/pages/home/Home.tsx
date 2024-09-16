import { Link } from "react-router-dom";
// import Products from "../admin/products";
import ProductCart, {
  ProductProps,
} from "../../components/product/ProductCart";

function Home() {
  // const categories = [
  //   "Electronics",
  //   "Mobiles",
  //   "Laptops",
  //   "Books",
  //   "Fashion",
  //   "Appliances",
  //   "Furniture",
  //   "Home Decor",
  //   "Grocery",
  //   "Beauty",
  //   "Toys",
  //   "Fitness",
  // ];

  const addToCartHandler = () => {};

  const productData: ProductProps[] = [
    {
      productId: "0123",
      photo: "https://m.media-amazon.com/images/I/61UBJTVndXL._SY450_.jpg",
      name: "hp",
      price: 34000,
      stoke: 20,
      handler: () => addToCartHandler,
    },

    {
      productId: "0213",
      photo: "https://m.media-amazon.com/images/I/711v0d6yDLL._SY679_.jpg",
      name: "Poco M6 5G",
      price: 9998,
      stoke: 32,
      handler: () => addToCartHandler,
    },

    {
      productId: "0432",
      photo: "https://m.media-amazon.com/images/I/71d7UKkg6xL._SX522_.jpg",
      name: "hp",
      price: 2499,
      stoke: 52,
      handler: () => addToCartHandler,
    },

    {
      productId: "2328",
      photo: "https://m.media-amazon.com/images/I/61egMfcDWlL._SX679_.jpg",
      name: "hp",
      price: 32342,
      stoke: 12,
      handler: () => addToCartHandler,
    },

    {
      productId: "3211",
      photo: "https://m.media-amazon.com/images/I/71VgbcbNFHL._SY450_.jpg",
      name: "hp",
      price: 8237,
      stoke: 12,
      handler: () => addToCartHandler,
    },
  ];

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
          {productData.map((item) => (
            <ProductCart
              productId={item.productId}
              photo={item.photo}
              name={item.name}
              price={item.price}
              stoke={item.stoke}
              handler={item.handler}
            />
          ))}
        </main>
      </div>

      <article className="cover-video-container">
        <div className="cover-video-overlay"></div>
        {/* <video autoPlay loop muted src={videoCover} />
      <div className="cover-video-content">
        <motion.h2
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Fashion
        </motion.h2>
        {coverMessage.map((el, i) => (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.25,
              delay: i / 10,
            }}
            key={i}
          >
            {el}{" "}
          </motion.span>
        ))}
      </div>
      <motion.span
        animate={{
          y: [0, 10, 0],
          transition: {
            duration: 1,
            repeat: Infinity,
          },
        }}
      >
        <FaAnglesDown />
      </motion.span> */}
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

          {/* <motion.p
          initial={{ opacity: 0, y: -100 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              delay: clients.length / 20,
            },
          }}
        >
          Trusted By 100+ Companies in 30+ countries
        </motion.p> */}
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
        <ul>
          {/* {services.map((service, i) => (
          <motion.li
            initial={{ opacity: 0, y: -100 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                delay: i / 20,
              },
            }}
            key={service.title}
          >
            <div>{service.icon}</div>
            <section>
              <h3>{service.title}Y</h3>
              <p>{service.title}</p>
            </section>
          </motion.li>
        ))} */}
        </ul>
      </article>
    </>
  );
}

export default Home;
