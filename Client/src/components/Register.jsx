import React, { useState } from "react";
import "../styles/Login.css";
import { FaUser } from "react-icons/fa";
import axios from "axios";

const Register = () => {
  const [passOrText, setPassOrText] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");
  const [errOrCor, setErrOrCor] = useState(false);
  const [inpError, setInpError] = useState({
    name: false,
    pass: false,
    conpass: false,
    email: false,
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
        email: email == "",
        conpass: conPassword == "",
      });

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        { name: userName, password: password, email: email },
        { withCredentials: true },
      );

      console.log(response);
      setError(response.data.message);
      setErrOrCor(true);
    } catch (err) {
      console.log(err.response);
      setError(err.response.data.message);
      setErrOrCor(false);
    }
  };

  return (
    <div className="containers">
      <h1>
        <FaUser />
        Register
      </h1>

      {error && <p className={errOrCor ? "cor" : "err"}>{error}</p>}

      <div className="input">
        <label htmlFor="name">UserName</label>
        <input
          type="text"
          id="name"
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter Username"
          className={inpError.name ? "error" : ""}
        />
      </div>

      <div className="input">
        <label htmlFor="name">Email</label>
        <input
          type="email"
          required
          id="name"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          className={inpError.email ? "error" : ""}
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

      <div className="input">
        <label htmlFor="password">Confirm Password</label>
        <input
          onChange={(e) => setConPassword(e.target.value)}
          type={passOrText ? "text" : "password"}
          id="password"
          placeholder="Confirm Password"
          className={inpError.conpass ? "error" : ""}
        />
      </div>

      <div className="showpass">
        <input type="checkbox" id="checkpass" onClick={ChangePass} />
        <label htmlFor="checkpass">Show Password</label>
      </div>

      <div className="input">
        <button onClick={handleSubmit} className="btn btn-primary">
          <FaUser /> Register
        </button>
      </div>
    </div>
  );
};

export default Register;
