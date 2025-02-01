import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteJobThunk } from "../features/jobSlice";

const JobPostingCard = ({ job }) => {
  const dispatch = useDispatch();
  const handleDelete = (jobObjId) => {
    dispatch(deleteJobThunk(jobObjId));
  };

  return (
    <div className="border border-2 rounded p-4">
      <h2>{job.title}</h2>
      <p>
        <strong>Company name: </strong>
        {job.companyName}
      </p>
      <p>
        <strong>Location: </strong>
        {job.location}
      </p>
      <p>
        <strong>Job type: </strong>
        {job.jobType}
      </p>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <div className="col">
          <Link
            to="/jobDetails"
            className="btn btn-primary form-control"
            state={{ job }}
          >
            See Details
          </Link>
        </div>
        <div className="col">
          <button
            className="btn btn-danger form-control"
            onClick={() => handleDelete(job._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobPostingCard;
