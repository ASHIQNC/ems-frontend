import React, { useContext, useEffect, useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addEmployeeData } from "../service/allApis";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { registerContext } from "../components/ContextShare";
import AdminHeader from "../components/AdminHeader";

const Addemployee = () => {
  const navigate = useNavigate();
  //state to store the form inputs

  //accessing the context
  //we need to destructure the "value" that we send from context

  const { registerUpdate, setRegisterUpdate } = useContext(registerContext);

  // console.log("reg", registerUpdate);

  const [inputs, setInputs] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    status: "",
    location: "",
  });

  //state to store image
  const [image, setImage] = useState("");
  //state to hold image preview url
  const [imgPreview, setImgPreview] = useState("");

  //validation
  const [fnameValid, setFnameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [lnameValid, setLnameValid] = useState(true);
  const [locationValid, setLocationValid] = useState(true);
  const [mobileValid, setMobileValid] = useState(true);

  //state to holde error
  const [errorMsg, setErrorMsg] = useState("");

  const setInputData = (e) => {
    const { value, name } = e.target;
    //validation

    //js akath tha regular expresion check cheyyan vendi aanu "match " use aakunnath
    //fname
    if (name == "fname") {
      if (value.match(/^[a-zA-z ]+$/)) {
        setFnameValid(true);
        setInputs({ ...inputs, [name]: value });
      } else {
        setFnameValid(false);
      }
    }

    // email

    if (name == "email") {
      if (
        value.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
      ) {
        setEmailValid(true);
        setInputs({ ...inputs, [name]: value });
      } else {
        setEmailValid(false);
      }
    }

    // lastname
    if (name == "lname") {
      if (value.match(/^[a-zA-z ]+$/)) {
        setLnameValid(true);
        setInputs({ ...inputs, [name]: value });
      } else {
        setLnameValid(false);
      }
    }

    // location
    if (name == "location") {
      if (value.match(/^[a-zA-z0-9  ]+$/)) {
        setLocationValid(true);
        setInputs({ ...inputs, [name]: value });
      } else {
        setLocationValid(false);
      }
    }

    // mobile
    if (name == "mobile") {
      // /^[+][0-9]{10,12}$/
      if (value.match(/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/)) {
        setMobileValid(true);
        setInputs({ ...inputs, [name]: value });
      } else {
        setMobileValid(false);
      }
    }

    if (name == "gender" || name == "status") {
      setInputs({ ...inputs, [name]: value });
    }
  };

  //console.log(inputs);

  //function to upload image

  const imageChoose = (e) => {
    setImage(e.target.files[0]);
  };

  //emplokke aano image upload aakunne appo okke useEffect work aakum

  useEffect(() => {
    //method to create url
    if (image) {
      setImgPreview(URL.createObjectURL(image));
    }
  }, [image]);
  // console.log(imgPreview);

  //handle data
  const handleAdd = async (e) => {
    e.preventDefault();
    const { email, fname, lname, gender, status, location, mobile } = inputs;
    if (fname == "") {
      toast.error("please enter fname");
    } else if (lname == "") {
      toast.error("please enter lname");
    } else if (gender == "") {
      toast.error("please choose gender");
    } else if (status == "") {
      toast.error("please enter status");
    } else if (location == "") {
      toast.error("please enter location");
    } else if (mobile == "") {
      toast.error("please enter mobile");
    } else if (email == "") {
      toast.error("please enter email");
    } else {
      //setting header
      const headerConfig = {
        "Content-Type": "multipart/form-data",
      };

      //file type content sent chyumpo nammal form data typil aayirikanm body akath send cheyunnath
      //for that formtype body object create cheyyanm ennit aakanam data send cheyandath
      const data = new FormData();
      console.log("data", data);
      //form data yilekk data add cheyyan append use aakum
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("status", status);
      data.append("mobile", mobile);
      data.append("location", location);
      data.append("gender", gender);
      data.append("email", email);
      //nammal backend routes akath(multer use cheytha same name thanne key aayit kodukanam)
      data.append("user_profile", image);

      //api call we need to pass header and body
      const result = await addEmployeeData(data, headerConfig);
      // console.log(result.data.fname);
      if (result.status >= 200 && result.status <= 300) {
        //reseting the state
        setInputs({
          ...inputs,
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          status: "",
          location: "",
        });
        setImage("");
        //namukk succes aakumpo ee data ppost aayi enn kaanikanm employeee.js pagile athin vendi nammal create cheytha contextil data edth vech
        setRegisterUpdate(result.data.fname);
        console.log("reg", registerUpdate);
        alert("data added");
        navigate("/employee-manage");
      } else {
        setErrorMsg(result?.response?.data);
      }

      //  console.log("asd", errorMsg);
    }
  };

  return (
    <div className="mb-5 mt-5">
      {errorMsg ? (
        <Alert variant={"danger"} dismissible onClose={() => setErrorMsg("")}>
          {errorMsg}
        </Alert>
      ) : (
        ""
      )}

      <Container>
        <AdminHeader className="mt-4"></AdminHeader>
        <form>
          <h1 className="mt-5 mb-4 text-danger text-center">
            Register Employee Details
          </h1>
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <img
              className=" mt-3 mb-3"
              style={{ height: "100px", width: "100px", borderRadius: "50%" }}
              src={
                imgPreview
                  ? imgPreview
                  : "https://i.postimg.cc/Wbbjm8Th/iprofile.jpg"
              }
              alt="profile"
            />
          </Col>

          <Row>
            <Col>
              {/* firstname */}
              <div class="mb-6">
                <label
                  for="Firstname"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  FirstName
                </label>
                <input
                  onChange={(e) => setInputData(e)}
                  name="fname"
                  required
                  type="text"
                  id="firstname"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="enter first name"
                />
              </div>

              {/* validation */}
              {/* true aanenkil maathram kaanikullu eee msg,email valid allenkil */}
              {!fnameValid && (
                <div>
                  <p className="text-danger font-weight-bold">
                    ! include charectors only..
                  </p>
                </div>
              )}

              {/* email */}
              <div class="mb-6">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your Email
                </label>
                <input
                  onChange={(e) => setInputData(e)}
                  name="email"
                  type="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="enter email"
                />
              </div>
              {/* email validation  */}
              {!emailValid && (
                <div>
                  <p className="text-danger font-weight-bold">
                    ! invalid email..
                  </p>
                </div>
              )}

              {/* gender */}

              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                gender
              </label>
              <div>
                <div class="flex items-center mb-2">
                  <input
                    onChange={(e) => setInputData(e)}
                    name="gender"
                    id="default-radio-1"
                    type="radio"
                    value={"male"}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-1"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Male
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    onChange={(e) => setInputData(e)}
                    name="gender"
                    id="default-radio-2"
                    type="radio"
                    value={"female"}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-2"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Female
                  </label>
                </div>

                {/* file upload */}

                <div className="mt-4 ">
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="large_size">
                    File upload
                  </label>
                  <input
                    onChange={(e) => imageChoose(e)}
                    name="image"
                    class="block w-full text-sm text-slate-500
                       file:mr-4 file:py-2 file:px-4 file:rounded-md
                       file:border-0 file:text-sm file:font-semibold
                       file:bg-pink-50 file:text-pink-700
                       hover:file:bg-pink-100"
                    type="file"
                  />
                  {/* <input
                    class="rounded-lg"
                    cursor-pointer
                    type="file"
                    placeholder="Upload the file "
                  /> */}
                  {/* <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="large_size">
                    File upload
                  </label>
                  <input
                    class="block w-full text-lg text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none  dark:border-gray-600 dark:placeholder-gray-400"
                    id="large_size"
                    type="file"
                  /> */}
                </div>
              </div>
            </Col>

            {/*left side */}
            <Col>
              {/* lastname */}
              <div class="mb-6">
                <label
                  for="lastname"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your Lastname
                </label>
                <input
                  onChange={(e) => setInputData(e)}
                  name="lname"
                  type="text"
                  id="lastname"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=" enter lastname"
                />
              </div>

              {/* validation */}
              {!lnameValid && (
                <div>
                  <p className="text-danger font-weight-bold">
                    ! include charectors only..
                  </p>
                </div>
              )}
              {/* mobile number */}
              <div class="mb-6">
                <label
                  for="mobile"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Mobile number
                </label>
                <input
                  onChange={(e) => setInputData(e)}
                  name="mobile"
                  type="number"
                  id="mobnumber"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="enter mobile number"
                />
              </div>

              {/* validation */}
              {!mobileValid && (
                <div>
                  <p className="text-danger font-weight-bold">
                    ! invalid mobile number..
                  </p>
                </div>
              )}

              {/* drop down */}
              <div class="mb-6">
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Employee Status
                </label>
                <select
                  name="status"
                  onChange={(e) => setInputData(e)}
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option disabled>Choose a status</option>
                  <option value={"active"}>Active</option>
                  <option value={"inactive"}>InActive</option>
                </select>
              </div>

              {/* employee location */}

              <div class="mb-6">
                <label
                  for="mobile"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Enter Employee Locations
                </label>
                <input
                  onChange={(e) => setInputData(e)}
                  name="location"
                  type="text"
                  id="mobnumber"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="enter employee location"
                />
              </div>

              {/* validation */}
              {!locationValid && (
                <div>
                  <p className="text-danger font-weight-bold">
                    ! include charectors only..
                  </p>
                </div>
              )}
            </Col>
          </Row>

          <Row>
            <button
              onClick={(e) => {
                handleAdd(e);
              }}
              type="submit"
              className="mb-5 mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Submit
            </button>
          </Row>
        </form>
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

export default Addemployee;
