import React from "react";
import { Link } from "react-router-dom";
import img from "../../assets/images/not-found.svg";
import ErrorWrapper from "./error.styles";

const ErrorPage = () => {
  return (
    <ErrorWrapper className='full-page'>
      <div>
        <img src={img} alt='not found' />
        <h3>D'oh! Page Not Found!</h3>
        <p>We can't seem to find the page you're looking for.</p>
        <Link to='/'>back to dashboard</Link>
      </div>
    </ErrorWrapper>
  );
};

export default ErrorPage;
