import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as FBSignout,
} from "firebase/auth";
import { app } from "../configs/firebase.ts";
import Cookie from "js-cookie";

const googleProvider = new GoogleAuthProvider();

const auth = getAuth(app);

import { AppDispatch } from "../app/store.ts";
import { signIn, signOut } from "../features/user/userSlice";

export const signInWithGoogle = async (dispatch: AppDispatch) => {
  const response = await signInWithPopup(auth, googleProvider);
  const credential = GoogleAuthProvider.credentialFromResult(response);
  const token = credential?.accessToken;
  // The signed-in user info.
  const user = response.user;
  dispatch(signIn());
  Cookie.set("token", token!, { expires: 1 / 24 }); // Expires in 7 days
  Cookie.set("email", user.email!, { expires: 1 / 24 });

  // console.log("sign in credential of this user: ", credential);
  // console.log("sign in token of this user: ", token);
  // console.log("sign in user: ", user);
};

// const getUser = async () => {
//   const response = await getRedirectResult(auth);
//   const credential = GoogleAuthProvider.credentialFromResult(response!);
//   const token = credential?.accessToken;
//   console.log("getRedirect token of this user: ", token);
//   // console.log(localStorage.getItem("AuthToken"));
// };

// getRedirectResult(auth)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access Google APIs.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential?.accessToken;
//     // The signed-in user info.
//     const user = result?.user;
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//     console.log("credential of this user: ", credential);
//     console.log("token of this user: ", token);
//     console.log("user: ", user);
//     localStorage.setItem("authToken", token!);
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     // const errorCode = error.code;
//     // const errorMessage = error.message;
//     // // The email of the user's account used.
//     // const email = error.customData.email;
//     // // The AuthCredential type that was used.
//     // const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//     console.log("getRedirectResult");
//   });

const logOut = async (dispatch: AppDispatch) => {
  try {
    await FBSignout(auth);
    // console.log("sign out");
    Cookie.remove("token");
    Cookie.remove("email");
    dispatch(signOut());
  } catch (err) {
    console.error(err);
  }
};

export { logOut };
