import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import "./footer.css";
const Footer = () => {
  return (
    <div className="footer__wrapper">
      <Container>
        <Row>
          <Col className="p-5 send__contact-data">
            <div
              className="mt-2 "
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "-20px",
              }}>
              <img
                style={{ height: "50px", width: "50px", marginTop: "-19px" }}
                src="https://i.postimg.cc/66fpHsZs/rc-Loy5-Lpi.gif"
                alt="logo"
              />
              <h3 style={{ color: "red" }}>EmployeeHelpDesk</h3>
            </div>

            <p>
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document
            </p>
          </Col>

          <Col className="p-5 ">
            <h2 className="text-danger ">Contact us</h2>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="enter your email"
            />
            <Button className="btn btn-success w-25 mt-2">Send</Button>
          </Col>
          <Col className="p-5 contact__us">
            <h2 className="text-danger my-3">Connect With Us</h2>

            <div>
              <i
                class="fa-brands fa-instagram fa-xl mt-3 ms-2"
                style={{ cursor: "pointer" }}></i>
              <i
                class="fa-brands fa-facebook fa-xl mt-3 ms-2"
                style={{ cursor: "pointer" }}></i>
              <i
                class="fa-brands fa-linkdin fa-xl mt-3 ms-2"
                style={{ cursor: "pointer" }}></i>
              <i
                class="fa-brands fa-github fa-xl mt-3 ms-2"
                style={{ cursor: "pointer" }}></i>
              <i
                class="fa-brands fa-twitter fa-xl mt-3 ms-2"
                style={{ cursor: "pointer" }}></i>
            </div>
            <div className="mt-3">
              <i
                class="fa-solid fa-envelopes-bulk fa-xl mt-3 ms-2"
                style={{ cursor: "pointer" }}></i>
              demo@gmail.com
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
