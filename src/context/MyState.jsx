import React, { useEffect, useState } from "react";
import MyContext from "./MyContext";

import { jwtDecode } from "jwt-decode";

const MyState = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // console.log(token)
    if (!token) return;
    const decoded = jwtDecode(token);
    setUser(decoded);
  }, [token]);

  return <MyContext.Provider value={{ user }}>{children}</MyContext.Provider>;
};

export default MyState;
