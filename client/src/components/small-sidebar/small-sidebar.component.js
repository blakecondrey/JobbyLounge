import React from "react";
import SmallSidebarContainer from "./small-sidebar.styles";
import { useAppContext } from "../../context/appContext";
import NavLinks from "../nav-links/nav-links.component";

// import Logo from "../logo/logo.component";
import { FaTimes } from "react-icons/fa";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();

  return (
    <SmallSidebarContainer>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className='content'>
          <button type='button' className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>{/* <Logo /> */}</header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </SmallSidebarContainer>
  );
};

export default SmallSidebar;
