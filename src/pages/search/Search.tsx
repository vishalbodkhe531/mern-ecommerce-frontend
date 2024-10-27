import { useState } from "react";
import ProductCart from "../../components/product/ProductCart";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../../redux/api/productAPI";
import { customeError } from "../../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../../components/loader/Loader";

function Search() {
  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const {
    isLoading: productLoading,
    data: searchedData,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: maxPrice,
  });

  const addToCartHandler = () => {};

  const isPreviosPage = page > 1;
  const isNextPage = page < 4;

  if (isError) {
    const err = error as customeError;
    toast.error(err.data.message);
  }

  if (productError) {
    const err = productError as customeError;
    toast.error(err.data.message);
  }

  return (
    <>
      <div className="product-search-page">
        <aside>
          <h2>Filters</h2>
          <div className="">
            <h4>Sort</h4>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">None</option>
              <option value="asc">Price (Low to Heigh)</option>
              <option value="dsc">Price (Heigh to Low )</option>
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
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              {!loadingCategories &&
                categoriesResponse?.categories.map((i) => (
                  <option key={i} value={i}>
                    {i.toUpperCase()}
                  </option>
                ))}
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

          {productLoading ? (
            <Skeleton length={10} />
          ) : (
            <div className="search-product-list">
              {searchedData?.products.map((i) => (
                <ProductCart
                  productId={i._id}
                  photo={i.photo}
                  name={i.name}
                  price={i.price}
                  stock={i.stock}
                  handler={addToCartHandler}
                />
              ))}
            </div>
          )}

          {searchedData && searchedData.totlePage > 1 && (
            <article>
              <button
                disabled={!isPreviosPage}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Prev
              </button>
              <span>
                {page} of {searchedData.totlePage}
              </span>
              <button
                disabled={!isNextPage}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Prev
              </button>
            </article>
          )}
        </main>
      </div>
    </>
  );
}

export default Search;
