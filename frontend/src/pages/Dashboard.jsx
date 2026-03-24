import "./dashboard.css";
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react';
import pic from "../assets/student.png"
import axios from "axios";
function Dashboard() {

    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        const fetchJobs = async () => {

            try {

                const res = await axios.get(
                    "https://job-portal-1-p5qs.onrender.com/api/auth/getcompany",
                    { withCredentials: true }
                );

                console.log(res.data);
                setJobs(res.data.job || res.data);

            } catch (error) {
                console.log(error);
            }

        };

        fetchJobs();

    }, []);

    return (
        <div>
            <div className='dashboard'>

                <div>
                    <nav>
                        <ul>
                            <li> <a href="" onClick={() => navigate("/")}> Home</a></li>
                            <li>  <a href="#about">About</a> </li>
                            <li> <a href=""> Contact</a></li>

                            <button className='profile' onClick={() => navigate("/profile")}> My profile</button>

                        </ul>
                    </nav>
                </div>


                <div className="container">

                    <h1> Suits job for your</h1>
                    <ul className="ul">
                        <li>Discover job opportunities that match your skills</li>
                        <li>Apply easily to jobs from trusted companies</li>
                        <li>Connect with recruiters and grow your career</li>
                    </ul>
                    <button className="knowbtn"> know more</button>

                    <div className="img">
                        <img src={pic} alt="myimge" />
                    </div>

                </div>

                <div> <h2> Recent job listing</h2></div>

                <div className="jobGrid">
                    {jobs.map((job) => (
                        <div key={job._id} className="jobCard">

                            <h3 className="company">{job.company}</h3>

                            <p><strong>Position:</strong> {job.position}</p>
                            <p><strong>Work Type:</strong> {job.workType}</p>
                            <p><strong>Status:</strong> {job.status}</p>
                            <p><strong>Location:</strong> {job.workLocation}</p>

                            <button className="applyBtn" onClick={() => alert("apply successfully")}>Apply Now

                            </button>

                        </div>
                    ))}

                </div>

                {/* ABOUT SECTION */}
                <div id="about" className="aboutSection">

                    <h2>About Our Job Portal</h2>

                    <p>
                        Our Job Portal helps students and professionals find the best job opportunities.
                        Users can explore jobs, apply easily and connect with trusted companies.
                        Our goal is to make the job search simple and accessible for everyone.
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Dashboard
