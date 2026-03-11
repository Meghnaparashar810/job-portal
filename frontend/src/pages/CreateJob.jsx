import { useState } from "react";
import axios from "axios";
import "./CreateJob.css";

function CreateJob() {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("pending");
  const [workType, setWorkType] = useState("full-time");
  const [workLocation, setWorkLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/company",
        { company, position, status, workType, workLocation },
        { withCredentials: true } 
      );

      alert("Job Posted Successfully!");
      // clear form
      setCompany("");
      setPosition("");
      setWorkLocation("");
      setStatus("pending");
      setWorkType("full-time");

    } catch (error) {
      console.log(error);
      alert("Error posting job");
    }
  };

  return (
    <div className="job-container">
      <div className="job-card">
        <h2>Create Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
            <label>Company Name</label>
          </div>

          <div className="input-box">
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
            <label>Position</label>
          </div>

          <div className="input-box">
            <input
              type="text"
              value={workLocation}
              onChange={(e) => setWorkLocation(e.target.value)}
            />
            <label>Work Location</label>
          </div>

          <div className="input-box">
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="interview">Interview</option>
              <option value="declined">Declined</option>
            </select>
            <label>Status</label>
          </div>

          <div className="input-box">
            <select value={workType} onChange={(e) => setWorkType(e.target.value)}>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="intership">Internship</option>
              <option value="contract">Contract</option>

            </select>
            <label>Work Type</label>
          </div>

          <button type="submit">Post Job</button>
        </form>
      </div>
    </div>
  );
}

export default CreateJob;