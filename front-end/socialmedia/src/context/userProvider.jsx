import axios from "axios";
import { createContext, useEffect, useState } from "react";
import FetchallPost from "../services/fetchallpost";

const UserContext = createContext();
export default UserContext;

export const UserProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("authUser");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [ispostCreated,setIsPostCreated]=useState("");

  async function getuserProfile() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/user/getprofilebyid/${authUser.user.id}`,
        {
          headers: { Authorization: `Bearer ${authUser.token}` },
          withCredentials: true,
        }
      );
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }

  async function fetchallpost() {
    try {
      const response = await FetchallPost(authUser);
      console.log('res',response)
      const modifiedPosts = response.posts?.map((post) => {
        const splited = post.content.split(".");
        return {
          ...post,
          type: splited.at(-1) === "mp4" ? "video" : "photo",
        };
      });

      setPosts((prevPosts) => {
        if (JSON.stringify(prevPosts) !== JSON.stringify(modifiedPosts)) {
          return modifiedPosts;
        }
        return prevPosts;
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("authUser", JSON.stringify(authUser));
      getuserProfile();
    } else {
      localStorage.removeItem("authUser");
    }
  }, [authUser]);

  useEffect(() => {
    if (authUser) {
      fetchallpost();
    }
  }, [authUser, ispostCreated]);

  return (
    <UserContext.Provider value={{ authUser, setAuthUser, user,posts ,setIsPostCreated}}>
      {children}
    </UserContext.Provider>
  );
};
