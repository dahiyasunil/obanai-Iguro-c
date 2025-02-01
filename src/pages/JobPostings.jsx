import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getJobsThunk } from "../features/jobSlice";
import Search from "../components/Search";
import JobPostingCard from "../components/JobPostingCard";

const JobPostings = () => {
  const dispatch = useDispatch();
  const { jobs, filter, status, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getJobsThunk());
  }, []);

  const jobsList = filter
    ? jobs.filter((job) => job.title.trim().toLowerCase().includes(filter))
    : jobs;

  if (status === "fetchingJobs") {
    return (
      <div className="text-center pt-5 mt-5">
        <h4>Getting jobs for you...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center pt-5 mt-5 text-danger">
        <h4>Oops! An error occured. Please try again later!</h4>
      </div>
    );
  }

  return (
    <div>
      <Search />
      <h2 className="my-3">All Jobs</h2>
      {jobsList.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {jobsList.map((job) => (
            <div key={job._id}>
              <JobPostingCard job={job} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center pt-5 mt-5">
          <h4>No Jobs available!</h4>
        </div>
      )}
    </div>
  );
};

export default JobPostings;
