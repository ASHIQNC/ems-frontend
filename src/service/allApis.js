import axios from "axios";
import { BASE_URL } from "./base_url";
import { commonStructure } from "./commonStructure";

// //headers
// const token = localStorage.getItem("token");

//method to add tocken in api header
// const createHeader=()=> {
//   //header create cheyyan nammal use cheyyunna class aanu http header
//   //we need create an object
//   //http headers

//   const headers = new HttpHeaders();

//   //accesss tocken from local storage
//   if (localStorage.getItem('token')) {
//     //evide json.parse cheyyumpo || ettit empty string kodukkanm
//     //athava local storage token ellenkil empty sting edutholum
//     let token = JSON.parse(localStorage.getItem('token') || '');

//     //namml mele create cheytha header akath kodukanm
//     option.headers = headers.append('access_token', token);
//   }
//   return option;

//   //headerne overload cheyyanm ennale work cheyyullu
//   //outside classl headering overload cheyyanm
//   //overload means same namil header create cheya
// }

//const headers = { Authorization: `Bearer ${token}` };
//adminlogin

export const adminLogin = async (body) => {
  return await commonStructure("POST", `${BASE_URL}/admin/login`, body);
};

//adding employee

export const addEmployeeData = async (body, header) => {
  return await commonStructure(
    "POST",
    `${BASE_URL}/admin/add-employee`,
    body,
    header
  );
};

//getallemployee

export const getAllEmployee = async (searchdata) => {
  // nammmal evide query parameter aaytt ayakanm
  return await commonStructure(
    "GET",
    `${BASE_URL}/admin/getemployee?search=${searchdata}`,
    {}
  );
};

//get single employee

export const singleEmployee = async (id) => {
  return await commonStructure(
    "GET",
    `${BASE_URL}/admin/getsingleemployee/${id}`,
    {}
  );
};

//delete employee

export const deleteEmployee = async (id) => {
  return await commonStructure("DELETE", `${BASE_URL}/admin/delete/${id}`, {});
};

//update employee

export const updateEmployee = async (id, body, headers) => {
  return await commonStructure(
    "PUT",
    `${BASE_URL}/admin/updateemployee/${id}`,
    body,
    headers
  );
};

//filter status api

export const filterStatus = async (data) => {
  return await commonStructure(
    "GET",
    `${BASE_URL}/admin/filter?filterData=${data}`,
    {}
  );
};

//google auth data
export const googleAuthData = async () => {
  return await commonStructure("GET", `${BASE_URL}/login/success`, {
    withCredentials: true,
  });
};
