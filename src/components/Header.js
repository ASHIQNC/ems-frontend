import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { googleAuthData } from "../service/allApis";

const Header = ({ logoutData, setLogout }) => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("login");
    setLogout(false);

    navigate("/");
  };
  const getData = async () => {
    const result = await googleAuthData();
    console.log("result", result);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbar className="navbar__style__wrapper">
        <Container>
          <Link to={"/home"} style={{ textDecoration: "none" }}>
            <Navbar.Brand style={{ display: "flex", alignItems: "center" }}>
              <img
                style={{ height: "50px", width: "80px", marginTop: "-19px" }}
                src="https://i.postimg.cc/66fpHsZs/rc-Loy5-Lpi.gif"
                alt="logo"
              />
              <h3 style={{ color: "red" }}>EmployeeHelpDesk</h3>
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {/* <Navbar.Text>
              <h1>Login</h1>
            </Navbar.Text> */}
          </Navbar.Collapse>

          {logoutData ? (
            <button onClick={logout} className="btn btn-danger">
              Logout
            </button>
          ) : (
            ""
          )}
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
