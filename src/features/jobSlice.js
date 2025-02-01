import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const JOB_SERVER_URL = import.meta.env.VITE_JOB_SERVER_URL;

export const getJobsThunk = createAsyncThunk("jobs/getJobs", async () => {
  const response = await axios.get(`${JOB_SERVER_URL}/api/jobs`);
  return response.data;
});

export const postJobThunk = createAsyncThunk(
  "jobs/postJob",
  async (jobData) => {
    const response = await axios.post(`${JOB_SERVER_URL}/api/jobs`, jobData);
    return response.data;
  },
);

export const deleteJobThunk = createAsyncThunk(
  "jobs/deleteJob",
  async (jobObjId) => {
    const response = await axios.delete(
      `${JOB_SERVER_URL}/api/jobs/${jobObjId}`,
    );
    return response.data;
  },
);

const initialState = {
  jobs: [],
  filter: "",
  status: "idle",
  error: null,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    updateSearchFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getJobsThunk.pending, (state) => {
      state.status = "fetchingJobs";
    });
    builder.addCase(getJobsThunk.fulfilled, (state, action) => {
      state.status = "fetchSuccessful";
      state.jobs = action.payload;
    });
    builder.addCase(getJobsThunk.rejected, (state, action) => {
      state.status = "fetchFailed";
      state.error = action.payload;
    });
    builder.addCase(postJobThunk.pending, (state) => {
      state.status = "postingJob";
    }),
      builder.addCase(postJobThunk.fulfilled, (state, action) => {
        state.status = "jobPosted";
        state.jobs.push(action.payload.newJob);
      });
    builder.addCase(postJobThunk.rejected, (state, action) => {
      state.status = "postFailed";
      state.error = action.payload;
    });
    builder.addCase(deleteJobThunk.pending, (state) => {
      state.status = "deletingJob";
    });
    builder.addCase(deleteJobThunk.fulfilled, (state, action) => {
      state.status = "jobDeleted";
      state.jobs = state.jobs.filter((job) => job._id != action.payload._id);
    });
    builder.addCase(deleteJobThunk.rejected, (state, action) => {
      state.status = "failedDelete";
      state.error = action.payload;
    });
  },
});

export const { updateSearchFilter } = jobSlice.actions;
export default jobSlice.reducer;
