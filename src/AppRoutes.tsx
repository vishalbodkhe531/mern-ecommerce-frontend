import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/loader/Loader";
//
const Home = lazy(() => import("./pages/home/Home"));
const Search = lazy(() => import("./pages/search/Search"));
const Cart = lazy(() => import("./pages/cart/Cart"));

function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRoutes;
