import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Nave.css";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../constext/Auth";
import { useNavigate } from "react-router-dom";
const Navebar = () => {
  const { isauth, auth } = useContext(AuthContext);
  const Navigate = useNavigate();

  const handlelogout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        { withCredentials: true },
      );
      await auth();
      if (!isauth) {
        Navigate("/login");
      }

      console.log(isauth);
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    auth();
  }, []);

  return (
    <div>
      <nav>
        <div className="logo">
          <Link to="/" className="a">
            Expense Tracker
          </Link>
        </div>

        <div className="sites">
          <Link to="/login" className="a">
            <FaSignInAlt />
            Login
          </Link>
          <Link to="/register" className="a">
            <FaUser />
            Register
          </Link>

          {isauth && (
            <>
              <Link to="/dashboard" className="a">
                Dashboard
              </Link>

              <button onClick={handlelogout} className="btn">
                <FaSignOutAlt />
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navebar;
