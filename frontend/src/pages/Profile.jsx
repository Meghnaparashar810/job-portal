import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

function Profile() {

  const [user, setUser] = useState({});

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const res = await axios.get(
          "https://job-portal-1-p5qs.onrender.com/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true
          }
        );

        setUser(res.data.user);

      } catch (error) {
        console.log(error.response);
        console.log(error.message);
      }

    };

    fetchProfile();

  }, []);

  return (

    <div className="profile-page">

      <div className="profile-card">

        <div className="avatar">
          {user.fullname ? user.fullname.charAt(0).toUpperCase() : "U"}
        </div>

        <h2 className="profile-name">{user.fullname}</h2>

        <p className="profile-email">{user.email}</p>

        <div className="profile-info">

          <div className="info-row">
            <span>📍 Location</span>
            <span>{user.location || "Not Added"}</span>
          </div>

          <div className="info-row">
            <span>🧑 Account</span>
            <span>Student</span>
          </div>

        </div>

        <button className="edit-btn">Edit Profile</button>

      </div>

    </div>

  );

}

export default Profile;