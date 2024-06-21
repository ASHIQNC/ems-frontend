//import { Navigate } from "react-router-dom";
// //children are the props
// const Protected = ({ isLoggedIn, children }) => {
//   if (!isLoggedIn) {
//     return <Navigate to="/" replace />;
//   } else {
//     // return <Navigate to="/home" replace />;
//   }
//   return children;
// };
// export default Protected;

import { useState } from "react";
import { Navigate } from "react-router-dom";
//children are the props
const Protected = ({ children }) => {
  const token = localStorage.getItem("token");
  const [jwt, setJwt] = useState(token);
  return jwt ? children : <Navigate to="/" replace />;
};
export default Protected;
