import { useLocation } from "react-router-dom";

const JobDetails = () => {
  const location = useLocation();
  const job = location.state?.job;

  if (!job) {
    return (
      <div className="text-center pt-5 mt-5">
        <h4>No job details available</h4>
      </div>
    );
  }

  return (
    <div>
      <h2>{job.title}</h2>
      <div className="my-4 border border-2 rounded p-4">
        <p>
          <strong>Company Name: </strong>
          {job.title}
        </p>
        <p>
          <strong>Location: </strong>
          {job.location}
        </p>
        <p>
          <strong>Salary: </strong>
          {job.salary}
        </p>
        <p>
          <strong>Job Type: </strong>
          {job.jobType}
        </p>
        <p>
          <strong>Description: </strong>
          {job.description}
        </p>
        <div>
          <strong>Qualifications: </strong>
          <ol>
            {job.qualifications.split(",").map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
