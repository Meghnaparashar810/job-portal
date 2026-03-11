import { useEffect, useState } from "react";
import axios from "axios";
import "./faculty.css";
import { useNavigate } from "react-router-dom";

function FacultyDashboard() {

  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();


  // FETCH JOBS
  useEffect(() => {

    const fetchJobs = async () => {
      try {

        const res = await axios.get(
          "http://localhost:8000/api/auth/getcompany",
          { withCredentials: true }
        );

        setJobs(res.data.job || res.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();

  }, []);



  // DELETE
  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `http://localhost:8000/api/auth/deletecompany/${id}`,
        { withCredentials: true }
      );
      if (!window.confirm("Are you sure you want to delete this job?"))
        return;

      setJobs(jobs.filter(job => job._id !== id));

    } catch (error) {
      console.log(error);
    }

  };


  // EDIT
  const handleEdit = (job) => {
    setEditingId(job._id);
    setEditData(job);
  };


  // INPUT CHANGE
  const handleChange = (e) => {

    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });

  };


  // UPDATE
  const handleUpdate = async () => {

    try {

      await axios.patch(
        `http://localhost:8000/api/auth/getcompany/${editingId}`,
        editData,
        { withCredentials: true }
      );

      setJobs(
        jobs.map(job =>
          job._id === editingId ? editData : job
        )
      );

      setEditingId(null);

    } catch (error) {
      console.log(error);
    }

  };

  return (

    <div className="faculty-container">

      {/* Navbar */}
      <div className="faculty-navbar">

        <h2>Faculty Dashboard</h2>

        <div className="nav-buttons">

          <button
            className="profile-btn"
            onClick={() => navigate("/profile")}
          >
            My Profile
          </button>

          <button
            className="create-btn"
            onClick={() => navigate("/createjob")}
          >
            + Create Job
          </button>

        </div>

      </div>


      {/* Jobs Table */}

      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Work Type</th>
              <th>Status</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            {jobs.map((job) => (

              <tr key={job._id}>

                <td>

                  {editingId === job._id ? (
                    <input
                      name="company"
                      value={editData.company}
                      onChange={handleChange}
                    />
                  ) : (
                    job.company
                  )}

                </td>

                <td>

                  {editingId === job._id ? (
                    <input
                      name="position"
                      value={editData.position}
                      onChange={handleChange}
                    />
                  ) : (
                    job.position
                  )}

                </td>

                <td>

                  {editingId === job._id ? (
                    <input
                      name="workType"
                      value={editData.workType}
                      onChange={handleChange}
                    />
                  ) : (
                    job.workType
                  )}

                </td>

                <td>

                  {editingId === job._id ? (
                    <input
                      name="status"
                      value={editData.status}
                      onChange={handleChange}
                    />
                  ) : (
                    job.status
                  )}

                </td>

                <td>

                  {editingId === job._id ? (
                    <input
                      name="workLocation"
                      value={editData.workLocation}
                      onChange={handleChange}
                    />
                  ) : (
                    job.workLocation
                  )}

                </td>

                <td>

                  {editingId === job._id ? (

                    <button onClick={handleUpdate}>
                      Save
                    </button>

                  ) : (

                    <button onClick={() => handleEdit(job)}>
                      Edit
                    </button>

                  )}

                  <button onClick={() => handleDelete(job._id)}>
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default FacultyDashboard;