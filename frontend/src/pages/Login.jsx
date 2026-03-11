
import { useState } from "react";
import './register.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner.jsx";
import { showLoading, hideLoading } from "../redux/features/alertSlice.js"
import { toast } from 'react-toastify';

function Login() {

  const { loading } = useSelector(state => state.alert);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ email, password })

    try {
      dispatch(showLoading())
      const res = await axios.post('http://localhost:8000/api/auth/login',
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {

        dispatch(hideLoading());

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);

        alert("login successfully");

        if (res.data.user.role === "student") {
          navigate("/dashboard");
        } else {
          navigate("/facultydashboard");
        }

      } else {
        toast.success(res.data.message);
      }

    } catch (error) {

      dispatch(hideLoading());


      toast.error(" incorrect data please try again")
    }
  }



  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      {loading ? (<Spinner />) : (
        <div className="signup-page">
          <div className="signup-card">
            {/* Left side: form */}
            <div className="signup-left">
              <h2>login</h2>

              <form onSubmit={handleSubmit}>


                <div className="input-group">
                  <input type="email" placeholder=" " required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label>Email</label>
                </div>

                <div className="input-group">
                  <input type="password" placeholder=" " required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label>Password</label>
                </div>


                <button type="submit">Login</button>
              </form>
              <p>
                create a new account
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/register")}> Register</span>
              </p>
            </div>

            {/* Right side: */}
            <div className="signup-right">
              <h1>WELCOME!</h1>
              <p>login your account to start your journey with us.</p>
            </div>
          </div>
        </div>
      )}


    </div>
  )
}

export default Login;
