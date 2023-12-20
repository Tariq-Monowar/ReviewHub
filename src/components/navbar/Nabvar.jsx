import "./navbar.css";
import { NavLink, useLocation } from "react-router-dom";
const Nabvar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const Path = currentPath === "/"?true:false
  
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>ReviewHub</h2>
      </div>
      {
        Path&&
        <div className="homeTitle">
          <p>Review</p>
        </div>
      }
      <div className="navItem">
        <NavLink className="entity" to="/">Review</NavLink>
        <NavLink className="entity" to="/addreview">Add Review</NavLink>
      </div>
    </nav>
  );
};

export default Nabvar;
