import firebase from "../Config/firebase";

const loginAuth = async (provider) => {
  try {
    const res = await firebase.auth().signInWithPopup(provider);
    return res;
  } catch (err) {
    var errorCode = err.code;
    console.log(errorCode);
  }
};
export default loginAuth;
