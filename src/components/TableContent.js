import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import "./table.css";
import { BASE_URL } from "../service/base_url";
import { Link } from "react-router-dom";

const TableContent = ({ employeeData, removeEmployee }) => {
  console.log("emplo", employeeData);
  return (
    <Container className="table__container-wrapper">
      {employeeData.length > 0 ? (
        <>
          <h1 className="text-danger mb-4 text-center">Employee Details </h1>

          <Table className="table__style" bordered responsive>
            <thead>
              <tr>
                <th scope="col" className="px-6 py-4">
                  #
                </th>
                <th scope="col" className="px-6 py-4">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-4">
                  Gender
                </th>
                <th scope="col" className="px-6 py-4">
                  Mobile
                </th>
                <th scope="col" className="px-6 py-4">
                  Status
                </th>
                <th scope="col" className="px-6 py-4">
                  Profile
                </th>
                <th scope="col" className="px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {employeeData?.map((data, index) => (
                <tr className=" dark:border-neutral-500">
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {data?.fname + " " + data?.lname}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {data?.gender}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {data?.mobile}
                  </td>
                  <td className="text-center">
                    <Button
                      variant={data.status === "active" ? "info" : "warning"}
                      className="bg-info text-center rounded">
                      {data?.status}
                    </Button>
                  </td>
                  <td>
                    {/* baseurl pinna nammmal backend use cheytha path name and pinna api vilicha image url */}
                    <img
                      className="rounded-5 text-center"
                      src={`${BASE_URL}/upload/${data.profile}`}
                      style={{ height: "100px", width: "100px" }}
                      alt="profile"
                    />
                  </td>

                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <i class="fa-solid fa-list fa-xl"></i>
                      </Dropdown.Toggle>

                      <Dropdown.Menu style={{ zIndex: "10000" }}>
                        <Link
                          to={`/view/${data._id}`}
                          style={{ textDecoration: "none" }}>
                          <Dropdown.Item href="abc">
                            <i class="fa-solid fa-chalkboard-user fa-lg mr-3"></i>
                            View
                          </Dropdown.Item>
                        </Link>

                        <Link
                          to={`/edit/${data._id}`}
                          style={{ textDecoration: "none" }}>
                          <Dropdown.Item href="bbn">
                            <i class="fa-solid fa-user-pen fa-lg mr-3"></i> Edit
                          </Dropdown.Item>
                        </Link>

                        <Dropdown.Item
                          onClick={() => {
                            removeEmployee(data._id);
                          }}>
                          <i class="fa-solid fa-user-xmark fa-lg mr-3"></i>
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <h1 className="text-danger">No employee added</h1>
      )}
    </Container>
  );
};

export default TableContent;
