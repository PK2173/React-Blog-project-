// Context Creation Complete
// we need a provider
// consumer lenghty remove
// use context hook
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [virifi, setvirifi] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/auth/auth", {
        headers: {
          seingtoken: localStorage.getItem("SetData"),
        },
      })
      .then((result) => {
        // console.log(result.data);
        if (
          localStorage.getItem("SetData") &&
          result.data !== "token has expaire"
        ) {
          setvirifi({
            userName: result.data.userName,
            id: result.data.id,
            status: true,
          });
        } else {
          setvirifi({ userName: "", id: "", status: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <AppContext.Provider value={{ virifi, setvirifi }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };