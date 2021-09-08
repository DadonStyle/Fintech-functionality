import axios from "axios";

const RegisterHandler = async (credential) => {
  const user = {
    uid: credential.uid,
    email: credential.email,
  };
  const res = await axios.post(
    `http://localhost:8080/create/${credential.uid}`,
    user
  );
  return res;
};

export default RegisterHandler;
