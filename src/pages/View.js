import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { singleEmployee } from "../service/allApis";
import { Col, Container, Row } from "react-bootstrap";
import { BASE_URL } from "../service/base_url";
import ListGroup from "react-bootstrap/ListGroup";
import AdminHeader from "../components/AdminHeader";
const View = () => {
  const { id } = useParams();

  const [empl, setEmpl] = useState({});
  //headers
  const token = localStorage.getItem("token");
  //console.log(id);
  const getSingleEmp = async () => {
    const result = await singleEmployee(id);

    if (result.status >= 200 && result.status < 300) {
      setEmpl(result?.data);
    }
  };

  useEffect(() => {
    getSingleEmp();
  }, []);
  console.log(empl);
  return (
    <Container className="mt-5 mb-5 ">
      <AdminHeader className="mt-4 mb-4"></AdminHeader>
      <Row>
        <Col>
          <h1 className="mt-3 text-center">
            {empl?.fname + " " + empl?.lname}
          </h1>
          <img
            className="w-75 p-5"
            style={{ height: "600px" }}
            src={`${BASE_URL}/upload/${empl?.profile}`}
            alt="profile"
          />
        </Col>
        <Col>
          <ListGroup className="mt-5">
            <ListGroup.Item className="mt-5">
              FullName: {empl?.fname + " " + empl?.lname}
            </ListGroup.Item>
            <ListGroup.Item>Email: {empl?.email} </ListGroup.Item>
            <ListGroup.Item>Gender: {empl?.gender} </ListGroup.Item>
            <ListGroup.Item>Location: {empl?.location}</ListGroup.Item>
            <ListGroup.Item>Mobile: {empl?.mobile}</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default View;
