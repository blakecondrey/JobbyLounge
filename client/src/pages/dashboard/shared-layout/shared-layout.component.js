import React from "react";
import { Outlet, Link } from "react-router-dom";
import SharedLayoutContainer from "./shared-layout.styles";

const SharedLayout = () => {
  return (
    <SharedLayoutContainer>
      <nav>
        <Link to='all-jobs'>All Jobs</Link>
        <Link to='add-job'>Add Job</Link>
      </nav>
      <Outlet />
    </SharedLayoutContainer>
  );
};

export default SharedLayout;
