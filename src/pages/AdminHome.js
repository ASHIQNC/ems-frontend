import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./adminhome.css";
const AdminHome = () => {
  return (
    <div id="home">
      <Container>
        <Row>
          <Col lg={6} className="p-5">
            <h1 className=" mt-5">Make Employee Management Easy</h1>
            <p>
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum
            </p>
          </Col>
          <Col className="p-5">
            <img
              className="w-100"
              src="https://i.postimg.cc/mrFtp1jb/emplyee-gif.gif"
              alt="employee"></img>
          </Col>
        </Row>

        <Container>
          <Row>
            {/* card 1 */}
            <Col lg={6}>
              <Link to={"/addemployee"} style={{ textDecoration: "none" }}>
                <div className="max-w-sm rounded overflow-hidden shadow-lg my-5 mt-5">
                  <img
                    style={{ height: "300px" }}
                    className="w-full"
                    src="https://i.postimg.cc/DwwyWjMJ/add-employee.gif"
                    alt="add employee"
                  />
                  <div className="px-6 py-4">
                    <h1 className="font-bold text-xl mb-2 text-center">
                      Add employee
                    </h1>
                    <p className="text-gray-700 text-base">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptatibus quia, nulla! Maiores et perferendis eaque,
                      exercitationem praesentium nihil.
                    </p>
                  </div>
                </div>
              </Link>
            </Col>

            {/* card2 */}

            <Col>
              <Link to={"/employee-manage"} style={{ textDecoration: "none" }}>
                <div className="max-w-sm rounded overflow-hidden shadow-lg my-5 mt-5">
                  <img
                    style={{ height: "300px" }}
                    className="w-full"
                    src="https://i.postimg.cc/s28pHZhm/4BI-1.gif"
                    alt="manage"
                  />
                  <div class="px-6 py-4">
                    <h1 className="font-bold text-xl mb-2 text-center">
                      Manage employee
                    </h1>

                    <p className="text-gray-700 text-base">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptatibus quia, nulla! Maiores et perferendis eaque,
                      exercitationem praesentium nihil.
                    </p>
                  </div>
                </div>
              </Link>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default AdminHome;
