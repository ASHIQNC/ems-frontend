import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
//import AdminHome from "./pages/AdminHome";

import Header from "./components/Header";
import Footer from "./components/Footer";
// import Addemployee from "./pages/Addemployee";

import Pnf from "./pages/pnf";
//loader
import { ColorRing } from "react-loader-spinner";
import Protected from "./auth/protectedRoute";

// lazyloading
const LazyHome = React.lazy(() => import("./pages/AdminHome"));
const LazyAddEmployee = React.lazy(() => import("./pages/Addemployee"));
const LazyEmployee = React.lazy(() => import("./pages/Employee"));
const LazyView = React.lazy(() => import("./pages/View"));

const LazyEdit = React.lazy(() => import("./pages/editEmployee"));
function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(
  //   localStorage.getItem("token") ? true : false
  // );
  // const [logout, setLogout] = useState(
  //   localStorage.getItem("login") ? true : false
  // );

  // useEffect(() => {
  //   // Update the isLoggedIn state when the token in localStorage changes
  //   const token = localStorage.getItem("token");
  //   const toggle = localStorage.getItem("login");
  //   setIsLoggedIn(!!token);
  //   setLogout(!!toggle);
  // }, [logout, isLoggedIn]);

  // console.log("islogged", isLoggedIn);
  // console.log("isloout", logout);

  return (
    <div className="App">
      {/* <Header logoutData={logout} setLogout={setLogout}></Header> */}
      <Header></Header>
      <Suspense
        fallback={
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{ margin: "0 auto" }}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        }>
        <Routes>
          <Route
            path="/"
            element={
              <Login
              //setLogout={setLogout}
              ></Login>
            }></Route>

          {/* <Route path="/" element={<Login></Login>}></Route> */}

          {/* <Route
            path="home"
            element={
              isTokenPresent ? <LazyHome /> : <Navigate to={"/"} />
            }></Route> */}

          <Route
            path="home"
            element={
              <Protected>
                <LazyHome />
              </Protected>
            }
          />

          {/* <Route path="home" element={<LazyHome />} /> */}

          {/* <Route path="home" element={<AdminHome />}></Route> */}

          <Route
            path="addemployee"
            element={
              <Protected>
                <LazyAddEmployee />
              </Protected>
            }></Route>

          <Route path="employee-manage" element={<LazyEmployee />}></Route>
          <Route path="view/:id" element={<LazyView></LazyView>}></Route>

          <Route
            path="edit/:id"
            element={
              <Protected>
                <LazyEdit></LazyEdit>
              </Protected>
            }></Route>

          <Route path="*" element={<Pnf></Pnf>}></Route>
        </Routes>
      </Suspense>
      <Footer></Footer>
    </div>
  );
}

export default App;
