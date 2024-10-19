import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingBag,
  // FaSignInAlt,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import { useState } from "react";
import { User } from "../../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";
// import toast from "react-hot-toast";

// interface PropsType {
//   user: User | null;
// }

interface PropsType {
  user: User | null;
}

// const Header = ({ user }: PropsType) => {
const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  return (
    <nav className="header">
      <Link onClick={() => setIsOpen(false)} to={"/"}>
        HOME
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/search"}>
        <FaSearch />
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/cart"}>
        <FaShoppingBag />
      </Link>

      {/* {user?._id ? ( */}
      {/* <>
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <FaUser />
        </button>
        <dialog open={isOpen}>
          <div>
            {user.role === "admin" && (
            <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
              Admin
            </Link>
             )} 

            <Link onClick={() => setIsOpen(false)} to="/orders">
              Orders
            </Link>
            <button onClick={logoutHandler}>
              <FaSignOutAlt />
            </button>
          </div>
        </dialog>
      </> */}

      {user?._id ? (
        <>
          {/* <Link to={""> */}
          <button>
            <FaUser onClick={() => setIsOpen((prev) => !prev)} />
          </button>
          {/* </Link> */}
          <dialog open={isOpen}>
            <div>
              {user.role === "admin" && (
                <Link to={"/admin/dashboard"}>admin</Link>
              )}
              <Link to={"/orders"}>orders</Link>
              <button onClick={logoutHandler}>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <>
          <Link to={"/login"}>
            <FaSignInAlt />
          </Link>
        </>
      )}

      {/* ) : ( */}
      {/* <Link to={"/login"}>
          <FaSignInAlt />
        </Link> */}
      {/* )} */}
    </nav>
  );
};

export default Header;
