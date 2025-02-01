import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postJobThunk } from "../features/jobSlice";

const AddJobForm = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.jobs);

  const initialState = {
    title: "",
    companyName: "",
    location: "",
    jobType: "",
    salary: null,
    description: "",
    qualifications: "",
  };

  const [jobData, setJobData] = useState(initialState);
  const [showNotification, setShowNotification] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleJobPost = (e) => {
    e.preventDefault();
    const normaliseData = {
      ...jobData,
      salary: Number(jobData.salary),
    };
    dispatch(postJobThunk(normaliseData));
  };

  useEffect(() => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 2000);
    if (status === "jobPosted") {
      setJobData(initialState);
    }
    setShowNotification(true);
  }, [status]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const notification = (type, message) => {
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
    return (
      <p
        className={`${type === "success" ? "bg-success" : "bg-danger"} my-3 p-2 rounded`}
      >
        {message}
      </p>
    );
  };

  return (
    <div>
      <form className="my-4" onSubmit={handleJobPost}>
        <div className="mb-3">
          <label htmlFor="jobTitle" className="mb-1">
            Job Title:
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={jobData.title ?? ""}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="companyName" className="mb-1">
            Company Name:
          </label>
          <input
            type="text"
            id="companyName"
            className="form-control"
            name="companyName"
            value={jobData.companyName ?? ""}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="mb-1">
            Location:
          </label>
          <input
            type="text"
            id="location"
            className="form-control"
            name="location"
            value={jobData.location ?? ""}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="mb-1">
            Salary:
          </label>
          <input
            type="number"
            id="salary"
            className="form-control"
            name="salary"
            value={jobData.salary ?? ""}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="jobType" className="mb-1">
            Job Type:
          </label>
          <select
            id="jobType"
            className="form-select"
            name="jobType"
            value={jobData.jobType ?? ""}
            onChange={changeHandler}
            required
          >
            <option value=""> -- Select -- </option>
            <option value="Full-time (On-site)">Full-time (On-site)</option>
            <option value="Full-time (Hybrid)">Full-time (Hybrid)</option>
            <option value="Full-time (Remote)">Full-time (Remote)</option>
            <option value="Part-time (On-site)">Part-time (On-site)</option>
            <option value="Part-time (Hybrid)">Part-time (Hybrid)</option>
            <option value="Part-time (Remote)">Part-time (Remote)</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="jobDescription" className="mb-1">
            Job Description:
          </label>
          <textarea
            id="jobDescription"
            className="form-control"
            name="description"
            value={jobData.description ?? ""}
            onChange={changeHandler}
            rows="2"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="jobQualifications" className="mb-1">
            Job Qualifications:
          </label>
          <textarea
            name="qualifications"
            id="jobQualifications"
            value={jobData.qualifications ?? ""}
            onChange={changeHandler}
            className="form-control"
            rows="2"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isDisabled}>
          Post Job
        </button>
      </form>
      {showNotification &&
        status === "jobPosted" &&
        notification("success", "Job posted successfully!")}
      {showNotification &&
        status === "postFailed" &&
        notification("failure", "Failed to post job. Please try again later!")}
    </div>
  );
};

export default AddJobForm;
