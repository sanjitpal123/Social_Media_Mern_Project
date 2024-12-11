import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Homepage from "./pages/Homepage";
import UserContext from "./context/userProvider";

function App() {
  const { authUser } = useContext(UserContext);
  console.log('user',authUser);

  return (
    <Router>
      <Routes>
       
        <Route path="/home" element={authUser ? <Homepage /> : <Navigate to="/login" />} />
      
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
     
        <Route path="*" element={<Navigate to={authUser ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
