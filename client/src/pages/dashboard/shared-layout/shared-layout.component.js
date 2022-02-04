import React from "react";
import { Outlet } from "react-router-dom";
import SharedLayoutContainer from "./shared-layout.styles";
import Navbar from "../../../components/navbar/navbar.component";
import BigSidebar from "../../../components/big-sidebar/big-sidebar.component";
import SmallSidebar from "../../../components/small-sidebar/small-sidebar.component";

const SharedLayout = () => {
  return (
    <SharedLayoutContainer>
      <main className='dashboard'>
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </SharedLayoutContainer>
  );
};

export default SharedLayout;
