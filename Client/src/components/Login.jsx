import React, { useContext, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../constext/Auth";

const Login = () => {
  const { isauth, auth } = useContext(AuthContext);
  const Navigate = useNavigate();
  const [passOrText, setPassOrText] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errOrCor, setErrOrCor] = useState(false);
  const [inpError, setInpError] = useState({
    name: false,
    pass: false,
  });

  const ChangePass = () => {
    if (passOrText) return setPassOrText(false);
    setPassOrText(true);
  };

  const handleSubmit = async () => {
    try {
      setInpError({
        name: userName == "",
        pass: password == "",
      });
      console.log(inpError);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { name: userName, password: password },
        { withCredentials: true },
      );

      setError(response.data.message);
      setErrOrCor(true);
      window.scroll(top);
      console.log(response);
      await auth();
      if (isauth) {
        Navigate("/dashboard");
      }
    } catch (err) {
      window.scroll(top);
      console.log(err.response);
      setError(err.response.data.message);
      setErrOrCor(false);
    }
  };

  return (
    <div className="containers">
      <h1>
        <FaSignInAlt />
        Login
      </h1>

      {error && <p className={errOrCor ? "cor" : "err"}>{error}</p>}

      <div className="input">
        <label htmlFor="name">UserName or Email</label>
        <input
          type="text"
          id="name"
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter Username or Email"
          className={inpError.name ? "error" : ""}
        />
      </div>

      <div className="input">
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type={passOrText ? "text" : "password"}
          id="password"
          placeholder="Enter password"
          className={inpError.pass ? "error" : ""}
        />
      </div>

      <div className="showpass">
        <input type="checkbox" id="checkpass" onClick={ChangePass} />
        <label htmlFor="checkpass">Show Password</label>
      </div>

      <div className="input">
        <button onClick={handleSubmit} className="btn btn-primary">
          <FaSignInAlt /> Login
        </button>
      </div>
    </div>
  );
};

export default Login;
