import React from 'react';
import { Link } from 'react-router-dom';

const NoMatchFound = () => {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center text-center">
      <div>
        <h1 className="display-4">404</h1>
        <p className="lead">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">Go Home</Link>
      </div>
    </div>
  );
};

export default NoMatchFound;
