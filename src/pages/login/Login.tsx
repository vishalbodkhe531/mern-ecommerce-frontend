import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../firebase";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { messageResponce } from "../../types/api-types";
import { useLoginMutation } from "../../redux/api/userAPI";

function Login() {
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");

  const [login] = useLoginMutation();

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const { displayName, email, photoURL, uid } = user;

      const res = await login({
        _id: uid,
        name: displayName!,
        email: email!,
        photo: photoURL!,
        gender,
        role: "user",
        dob: date,
      });

      if ("data" in res) {
        console.log("res : ", res);
        toast.success(res.data?.message!);
        // toast.success();
      } else {
        const error = res.error as FetchBaseQueryError;
        console.log("Error response:", error);
        const message = error?.data
          ? (error.data as messageResponce).message
          : "An unknown error occurred";
        toast.error(message);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error(`Sign in failed: ${error}`);
    }
  };

  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>

        <div>
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label>Date of birth</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <p>Already Signed In Once</p>
          <button onClick={loginHandler}>
            <FcGoogle /> <span>Sign in with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default Login;
