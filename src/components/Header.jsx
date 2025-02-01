import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-primary shadow">
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <Link className="d-flex align-items-center" to="/">
            <img
              src="/icon.svg"
              alt="brand-icon"
              className="bg-light rounded-pill p-1"
              style={{ width: "35px" }}
            />
            <h1 className="navbar-brand text-light ms-2 pt-2">NextHire</h1>
          </Link>
          <button
            className="navbar-toggler bg-light"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link text-light" to="/">
                  Job Postings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-light" to="/postJob">
                  Post a Job
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
