import { Facebook, Google, Twitter } from "../Config/authProvider";
import loginAuth from "../Service/AuthFunc";
import NotyfContext from "../utill/NotyfContext";
import { useContext, useState } from "react";
import RegisterHandler from "../Service/RegisterHandler";
import { useHistory } from "react-router";

export const Login = () => {
  const history = useHistory();
  //notyf
  const notyf = useContext(NotyfContext);
  //current logged user
  const [currentUserUID, setCurrentUserUID] = useState();

  const handleOnClick = async (provider) => {
    try {
      if (currentUserUID) {
        notyf.error("user already logged in");
        return null;
      }
      const res = await loginAuth(provider); //handle the login through the providers
      if (res === undefined) {
        notyf.error("please log in");
        return null;
      }
      localStorage.setItem("currentUser", res.user.uid);
      setCurrentUserUID(res.user.uid); //saves the uid for log out
      await RegisterHandler(res.user); //handle the creation in firestore
      notyf.success("logged in successfully");
      history.push("/table");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <button
          onClick={() => {
            handleOnClick(Google);
          }}
        >
          google
        </button>
        <button
          onClick={() => {
            handleOnClick(Twitter);
          }}
        >
          twitter
        </button>
        <button
          onClick={() => {
            handleOnClick(Facebook);
          }}
        >
          facebook
        </button>
      </div>
    </div>
  );
};
