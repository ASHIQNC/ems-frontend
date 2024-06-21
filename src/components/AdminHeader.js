import React from "react";
import Nav from "react-bootstrap/Nav";
const AdminHeader = ({ className }) => {
  return (
    <div className={className}>
      <Nav justify variant="tabs" ActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" href="/addemployee">
            AddEmployee
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" href="/employee-manage">
            ListEmployee
          </Nav.Link>
        </Nav.Item>
        <Nav.Item></Nav.Item>
      </Nav>
    </div>
  );
};

export default AdminHeader;
