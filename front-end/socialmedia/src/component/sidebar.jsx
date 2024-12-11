import React, { useContext } from 'react';
import UserContext from '../context/userProvider';
import Logout from '../services/Logout';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
function Sidebar() {
    const {authUser,setAuthUser}=useContext(UserContext);
    const navigate=useNavigate()
    
async function handlelogout()
{
    console.log('dfd',authUser)
   const response=await Logout(authUser);
   toast(response.message);
   setAuthUser(null);
   navigate('/login');

}

  return (
    <div className=" bg-gray-900  text-white w-64 h-screen fixed  top-0 left-0 p-4 flex flex-col shadow-md mt-5">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center">MySocial</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4">
        <button className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded">
          <span className="material-icons">home</span>
          <span>Home</span>
        </button>
        <button className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded">
          <span className="material-icons">movie</span>
          <span>Reels</span>
        </button>
        <button className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded">
          <span className="material-icons">article</span>
          <span>Posts</span>
        </button>
        <button className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded">
          <span className="material-icons">video_library</span>
          <span>Videos</span>
        </button>
        <button className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded">
          <span className="material-icons">message</span>
          <span>Messages</span>
        </button>
        <button className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded">
          <span className="material-icons">notifications</span>
          <span>Notifications</span>
        </button>
        <button className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded">
          <span className="material-icons">person</span>
          <span>Profile</span>
        </button>
        <button className="flex items-center space-x-3 hover:bg-red-700 p-2 rounded" onClick={handlelogout}>
          <span className="material-icons">logout</span>
          <span>Logout</span>
        </button>
      </nav>

  

    
    </div>
  );
}

export default Sidebar;
