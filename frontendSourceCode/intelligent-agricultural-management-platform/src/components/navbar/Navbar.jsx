import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { IoIosLogOut } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigator = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const handleUserIconClick = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = () => {
    // Implement logout logic here
    localStorage.removeItem("username");
    navigator("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.appName}>App Name</div>
      <div className={styles.rightContianer}>
        <div onClick={handleUserIconClick} className={styles.userIcon}>
          <FaUser />
          <h4>{localStorage.getItem("username")}</h4>
        </div>
        {showProfile && (
          <div className={styles.modal}>
            <div className={styles.modalItem}>
              <FaUser className={styles.liIcon} />
              Profile
            </div>
            <div className={styles.modalItem} onClick={handleLogout}>
              <IoIosLogOut className={styles.liIcon} />
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
