import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404 Error</h2>
      <p>That page cannot be found</p>
      <Link to="/"> Click Here to go back to homepage!</Link>
    </div>
  );
};

export default NotFound;
