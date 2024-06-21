import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../service/allApis";
const Login = ({ setIsLoggedIn, setLogout }) => {
  const navigate = useNavigate();

  //state to hold data
  const [loginData, setLoginData] = useState({
    email: "",
    psw: "",
  });

  //state for validation

  const [emailValid, setEmailValid] = useState(true);
  const [paswValid, setPswValid] = useState(true);

  const setInputs = (e) => {
    const { value, name } = e.target;
    //js akath tha regular expresion check cheyyan vendi aanu "match " use aakunnath
    if (name == "email") {
      if (
        value.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
      ) {
        setEmailValid(true);
        setLoginData({ ...loginData, [name]: value });
      } else {
        setEmailValid(false);
      }
    }

    //password validation
    if (name == "psw") {
      if (value.match(/^[a-zA-Z0-9]+$/)) {
        setPswValid(true);
        setLoginData({ ...loginData, [name]: value });
      } else {
        setPswValid(false);
      }
    }
  };

  console.log(loginData);
  const handleSubmit = async () => {
    const { email, psw } = loginData;
    console.log("hh", email);
    console.log("hhkj", psw);

    if (email == "" || psw == "") {
      alert("please add username and password");
    } else {
      const result = await adminLogin(loginData);
      console.log("hgh", result);

      if (result.status >= 200 && result.status < 300) {
        //alert("login success");
        //tokene strigify cheyyanm
        localStorage.setItem("token", JSON.stringify(result.data.token));
        //  localStorage.setItem("login", JSON.stringify(true));
        //setIsLoggedIn(true);
        // setLogout(true);
        navigate("/home");
      } else {
        toast.error(result.response.data, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  //ggoogle authentication
  const loginWithGoogle = () => {
    //this is the url that we given in the google.console website
    //in this section [Authorized redirect URIs]
    window.open("http://localhost:4000/auth/google/callback", "_self");
  };
  return (
    <div className="container__Wrapper">
      <Container>
        <Row>
          <Col lg={8} className=" p-4 ">
            <img
              className="left-image__Section"
              src="https://i.postimg.cc/7Y6n1JPj/ems-front-page-removebg-preview.png"
              alt="logo"
            />
          </Col>
          <Col lg={4} className="mt-2 p-3  login_input_wrapper">
            <div>
              <h2 className="mb-5 text-center">Admin Login</h2>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3">
                <Form.Control
                  style={{ width: "280px" }}
                  type="email"
                  placeholder="enter email"
                  onChange={(e) => setInputs(e)}
                  name="email"
                />
              </FloatingLabel>

              {/* validation */}
              {/* true aanenkil maathram kaanikullu eee msg,email valid allenkil */}
              {!emailValid && (
                <div>
                  <p className="text-danger font-weight-bold">
                    ! invalid email..
                  </p>
                </div>
              )}

              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  style={{ width: "280px" }}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setInputs(e)}
                  name="psw"
                />
              </FloatingLabel>

              {!paswValid && (
                <div>
                  <p className="text-danger font-weight-bold">
                    ! invalid password..
                  </p>
                </div>
              )}

              <Button
                onClick={handleSubmit}
                style={{ backgroundColor: "#08428c", color: "white" }}
                className="mt-5 w-100 btn">
                Login
              </Button>

              <h5 className="text-center mt-4">Or</h5>

              <button
                className="login-with-google-btn"
                onClick={loginWithGoogle}>
                Sign in with google
              </button>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Login;
