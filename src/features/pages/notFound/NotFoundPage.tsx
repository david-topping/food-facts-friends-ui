import { Link } from "react-router-dom";

export const NotFoundPage = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>404</h1>
    <p>Sorry, that page doesn’t exist.</p>
    <Link to="/">Go back home</Link>
  </div>
);
