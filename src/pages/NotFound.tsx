import { Link } from "react-router-dom";
import React from "react";

function NotFound() {
  return (
    <div>
      <p className="text-4xl font-semibold text-center pt-10">
        Page not found 🤖
      </p>
      <div className="text-center">
        <Link to="/">Back to Home Page</Link>
      </div>
    </div>
  );
}
export default NotFound;
