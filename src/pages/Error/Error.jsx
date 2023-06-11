import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
export const Error = () => {
  return (
    <div className="error-page">

      <img src="/images/error.jpg" alt="" />
      <button>
        <Link to={"/"}>Go Home</Link>
      </button>
    </div>
  );
};
