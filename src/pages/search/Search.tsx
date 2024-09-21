import { useState } from "react";
import ProductCart from "../../components/product/ProductCart";

function Search() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const addToCartHandler = () => {};

  const isPreviosPage = true;
  const isNextPage = true;

  return (
    <>
      <div className="product-search-page">
        <aside>
          <h2>Filters</h2>
          <div className="">
            <h4>Sort</h4>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">None</option>
              <option value="">Price (Low to Heigh)</option>
              <option value="">Price (Heigh to Low )</option>
            </select>
          </div>

          <div className="">
            <h4>Max Price {maxPrice || ""}</h4>
            <input
              type="range"
              min={100}
              max={100000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>

          <div className="">
            <h4>Category</h4>
            <select value={sort} onChange={(e) => setCategory(e.target.value)}>
              <option value="">None</option>
              <option value="">Sample 1</option>
              <option value="">Sample 2</option>
            </select>
          </div>
        </aside>

        <main>
          <h1>Products</h1>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="search-product-list">
            <ProductCart
              productId="0123"
              photo="https://m.media-amazon.com/images/I/61UBJTVndXL._SY450_.jpg"
              name="hp"
              price={34000}
              stock={20}
              handler={addToCartHandler}
            />
          </div>

          <article>
            <button
              disabled={!isPreviosPage}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              {page} of {4}
            </span>
            <button
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
          </article>
        </main>
      </div>
    </>
  );
}

export default Search;
