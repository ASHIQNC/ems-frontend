import React, { createContext, useState } from "react";

//context creation
export const registerContext = createContext();

//update context
export const updateContext = createContext();

const ContextShare = ({ children }) => {
  //state for registerContext
  const [registerUpdate, setRegisterUpdate] = useState("");

  //update context

  const [UpdateData, setUpdateData] = useState("");

  return (
    <div>
      <updateContext.Provider value={{ UpdateData, setUpdateData }}>
        <registerContext.Provider value={{ registerUpdate, setRegisterUpdate }}>
          {children}
        </registerContext.Provider>
      </updateContext.Provider>
    </div>
  );
};

export default ContextShare;
