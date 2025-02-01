import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import JobPostings from "./pages/JobPostings";
import PostJob from "./pages/PostJob";
import JobDetails from "./pages/JobDetails";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="container py-4">
          <Routes>
            <Route path="/" element={<JobPostings />} />
            <Route path="/postJob" element={<PostJob />} />
            <Route path="/jobDetails" element={<JobDetails />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
