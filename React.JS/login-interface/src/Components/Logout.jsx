import NotyfContext from "../utill/NotyfContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Logout = () => {
  //useHistory
  const history = useHistory();
  //notyf
  const notyf = useContext(NotyfContext);
  //current user
  const [userUID] = useState(localStorage.getItem("currentUser"));

  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = async () => {
    if (userUID) {
      localStorage.clear();
      await axios.delete(`http://localhost:8080/user/${userUID}`);
      notyf.success("logged out successfully");
      history.push("/login-auth");
    } else {
      history.push("/login-auth");
    }
  };

  return <div></div>;
};

export default Logout;
