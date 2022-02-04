import React from "react";
import { useAppContext } from "../../context/appContext";
import Logo from "../logo/logo.component";
import NavLinks from "../nav-links/nav-links.component";
import BigSidebarContainer from "./big-sidebar.styles";

const BidSidebar = () => {
  const { showSidebar } = useAppContext();
  return (
    <BigSidebarContainer>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </BigSidebarContainer>
  );
};

export default BidSidebar;
