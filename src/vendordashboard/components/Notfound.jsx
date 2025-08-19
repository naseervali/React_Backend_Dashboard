import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
      <h1 className="text-9xl font-extrabold text-indigo-600 drop-shadow-lg">
        404
      </h1>
      <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-800">
        Oops! Page not found
      </h2>
      

      <Link
        to="/"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Notfound;
