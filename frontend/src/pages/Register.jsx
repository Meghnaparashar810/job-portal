
import { useState } from "react";
import './register.css'
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice.js"
import Spinner from "../components/Spinner.jsx";



function Register() {
  let [fullname, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("student");

  const { loading } = useSelector(state => state.alert);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ fullname, email, password, role })

    try {
      if (!fullname || !email || !password) {
        return alert("please provide all field")
      }
      dispatch(showLoading())
      const res = await axios.post('https://job-portal-1-p5qs.onrender.com/api/auth/register',
        { fullname, email, password, role },

        { withCredentials: true });


      dispatch(hideLoading())
      console.log("RESPONSE:", res.data);



      if (res.data.success) {

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);

        alert("successfully created");

        if (res.data.user.role === "student") {
          navigate("/dashboard");
        } else {
          navigate("/facultydashboard");
        }

      } else {
        alert(res.data.message);
      }

    }

    catch (error){
      console.log(error.message)
    }
  }

  const navigate = useNavigate();

  return (
    <div>
      {loading ? (<Spinner />) : (

        <div className="signup-page">
          <div className="signup-card">
            {/* Left side: form */}
            <div className="signup-left">
              <h2>Sign Up</h2>

              <form onSubmit={handleSubmit}>

                <div className="input-group">
                  <input type="text"
                    placeholder=" " required

                    onChange={(e) => setName(e.target.value)}
                  />

                  <label>fullname</label>
                </div>

                <div className="input-group">
                  <input type="email" placeholder=" " required
                    value={email}

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



                <div className="role-box">

                  <label className="role-option">
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={role === "student"}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    Student
                  </label>

                  <label className="role-option">
                    <input
                      type="radio"
                      name="role"
                      value="faculty"
                      checked={role === "faculty"}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    Faculty
                  </label>

                </div>



                <button type="submit" >Register</button>
              </form>
              <p>
                Already have an account?
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/login")}> Login</span>
              </p>
            </div>

            {/* Right side: */}
            <div className="signup-right">
              <h1>WELCOME!</h1>
              <p>Create your account to start your journey with us.</p>
            </div>
          </div>
        </div>
      )}


    </div>
  )
}

export default Register;
