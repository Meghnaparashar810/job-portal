
import "./Home.css"
import { useState } from "react";

import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>

      <div className='hero1'>
       

        <div className='navbar'>
          <nav className="navbar">

            <div className="logo"> <span className=" logo"> Job Portal </span> </div>

            <ul className={menuOpen ? "nav-links active" : "nav-links"}>
              <li>Home</li>
              <li>About</li>

              <li>Contact</li>
            </ul>

            <div
              className="menu-icon"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </div>
          </nav>
        </div>

        <div className="hero">

          <img
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
            className="hero-img"
          />

          <div className="hero-content">
            <h1>Find Your Dream Job</h1>
            <p>Explore thousands of job opportunities</p>

            <div className="search-box">
             
              <button onClick={()=> navigate("/register")}>register</button>
            </div>
          </div>

        </div>


      </div>
    </div>

  )
}

export default HomePage
