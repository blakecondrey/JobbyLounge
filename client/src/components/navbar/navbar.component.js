import React, { useState } from "react";

import { useAppContext } from "../../context/appContext";

import NavbarContainer from "./navbar.styles";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
// import Logo from "../logo/logo.component";

const Navbar = () => {
  const { user, logoutUser, toggleSidebar } = useAppContext();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <NavbarContainer>
      <div className='nav-center'>
        <button className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          {/* <Logo /> */}
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button className='btn' onClick={() => setShowLogout(!showLogout)}>
            <FaUserCircle />
            {user?.name} {/* optional chaining */}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button onClick={logoutUser} className='dropdown-btn'>
              logout
            </button>
          </div>
        </div>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
