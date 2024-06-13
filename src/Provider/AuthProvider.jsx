import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "@/Firebase/firebase.config";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState(null);

  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // google log in
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //   set current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      console.log("current user from auth provider", currentuser);
      if (currentuser) {
        // get token and store client
        const userInfo = { email: currentuser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        });
      } else {
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [axiosPublic]);

  const authInfo = {
    googleLogin,
    loading,
    user,
    createUser,
    logIn,
    logOut,
    updateUserProfile,
    payment,
    setPayment,
  };

  return (
    <AuthContext.Provider value={authInfo}> {children}</AuthContext.Provider>
  );
};

export default AuthProvider;
