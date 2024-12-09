import axios from "axios";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export default UserContext;

export const UserProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    const storeuser = localStorage.getItem("authUser");
    return storeuser ? JSON.parse(storeuser) : null;
  });
  const [user,setUser]=useState(null)
  console.log("auth", authUser);
  async function getuserProfile() {
    const response = await axios.get(
      `http://localhost:3000/api/user/getprofilebyid/${authUser.user.id}`,
      {
        headers: {
          Authorization: `Bearer ${authUser.token}`,
        },
        withCredentials: true, // Ensure cookies are sent with the request
      }
    );
    setUser(response.data.user);
  }
  console.log('ds',user);

  useEffect(() => {
    setAuthUser(authUser);
    if (authUser) {
      localStorage.setItem("authUser", JSON.stringify(authUser));
      getuserProfile();
    } else {
      localStorage.removeItem("authUser");
    }
  }, [authUser]);
  return (
    <UserContext.Provider value={{ authUser, setAuthUser , user}}>
      {children}
    </UserContext.Provider>
  );
};
