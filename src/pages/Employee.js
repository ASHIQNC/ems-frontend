import React, { useContext, useEffect, useState } from "react";
import TableContent from "../components/TableContent";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import "./employee.css";
import { registerContext, updateContext } from "../components/ContextShare";
import Alert from "react-bootstrap/Alert";
import {
  deleteEmployee,
  filterStatus,
  getAllEmployee,
} from "../service/allApis";
import AdminHeader from "../components/AdminHeader";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Employee = () => {
  const { registerUpdate, setRegisterUpdate } = useContext(registerContext);

  const { UpdateData, setUpdateData } = useContext(updateContext);

  const [employeeData, setEmployeeData] = useState([]);

  //for search field
  const [searchData, setSearchData] = useState("");
  const getData = async () => {
    //for searching nammal arguement ayakanm
    //argumetn evide nammal search boxil type cheyunnath aaanu

    const result = await getAllEmployee(searchData);
    // console.log(result);
    setEmployeeData(result.data);
  };

  //nammal evide aanu delte cheyanda function vilikunnath

  const removeEmployee = async (id) => {
    const result = await deleteEmployee(id);

    if (result >= 200 && result <= 300) {
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, [searchData]);
  console.log(searchData);

  // console.log(employeeData);

  const filterEmployee = async (data) => {
    const result = await filterStatus(data);
    setEmployeeData(result.data);
  };

  return (
    <Container className="hello" style={{ minHeight: "143vh" }}>
      <AdminHeader className="mt-4"></AdminHeader>
      {registerUpdate ? (
        <Alert
          className="mt-5"
          variant={"success"}
          dismissible
          onClose={() => setRegisterUpdate("")}>
          {registerUpdate} is added sucessfully
        </Alert>
      ) : null}
      {UpdateData ? (
        <Alert
          className="mt-5"
          variant={"success"}
          dismissible
          onClose={() => setUpdateData("")}>
          {UpdateData} is added sucessfully
        </Alert>
      ) : null}
      <div className="mt-5  ps-5 search__style">
        <FloatingLabel
          controlId="floatingInput"
          label="Search Employee"
          className="mb-3">
          <Form.Control
            onChange={(e) => setSearchData(e.target.value)}
            type="text"
            placeholder="employee name"
          />
        </FloatingLabel>
      </div>

      {/* filter */}
      <div className="filter__data text-end p-5">
        <h4 className="mb-3">FilterEmployee</h4>
        <ButtonGroup aria-label="Basic example">
          <Button
            className="mx-1"
            variant="info"
            onClick={() => {
              filterEmployee("active");
            }}>
            Active
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              filterEmployee("inactive");
            }}>
            InActive
          </Button>
          <Button className="mx-1" variant="secondary" onClick={getData}>
            All
          </Button>
        </ButtonGroup>
      </div>
      <div className="table__Wrapper">
        <TableContent
          employeeData={employeeData}
          removeEmployee={removeEmployee}></TableContent>
      </div>
    </Container>
  );
};

export default Employee;
