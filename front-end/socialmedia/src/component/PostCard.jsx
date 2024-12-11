import { useContext, useState } from "react";
import UserContext from "../context/userProvider";
import CreatePost from "../services/CreatePost";
import toast from 'react-hot-toast'

function ProfileCard() {
  const { user, authUser,setIsPostCreated } = useContext(UserContext);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  function handleChange(e) {
    const selected = e.target.files[0];
    console.log('file selected', selected);

    if (selected) {
      setFile(selected);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreview(fileReader.result); 
      };
      fileReader.readAsDataURL(selected);
    }
  }

  async function handlePost() {
    if (!file && !caption) {
      alert("Please add a caption or a file!");
      return;
    }

    const formData = new FormData();
    formData.append("content", file); 
    formData.append("caption", caption);
    
    
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    
    

    try {
      const response = await CreatePost(formData, authUser);
      console.log('Post Created:', response);
      toast.success(response.message);
      setIsPostCreated(response.message);
      setFile(null);
      setPreview(null);
      setCaption("")
   
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  return (
    <div className="flex justify-center w-full bg-black">
      <div className="w-[90%] md:w-[70%] lg:w-[50%] bg-gray-900 mt-[100px] text-white rounded-lg shadow-xl p-6 transition-transform transform hover:scale-105">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={user?.profilePicture}
            alt="profile"
            className="w-14 h-14 rounded-full border-2 border-gray-500 transition-all hover:border-gray-400"
          />
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What's on your mind?"
            className="flex-grow bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
          />
        </div>

        {/* Display Preview Image */}
        {preview && (
          <div className="mb-4">
            <img src={preview} alt="preview" className="w-full h-auto object-contain" />
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="file"
              onChange={handleChange}
              className="hidden"
            />
            <div className="flex items-center gap-1 text-gray-400 hover:text-gray-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M16.05 3.05a7.007 7.007 0 011.06 7.96l-1.035-.605a6.007 6.007 0 00-2.54-8.12 6.007 6.007 0 00-8.12 2.54L1.5 7.58A8.007 8.007 0 0116.05 3.05zM5.582 12.42l2.94-4.94a3.978 3.978 0 00.08 3.45l-2.64 3.52A4.978 4.978 0 015.582 12.42z" />
              </svg>
              <span className="text-sm font-medium">Add Photo</span>
            </div>
          </label>
          <button
            className="px-6 py-2 border-2 border-gray-600 text-white rounded-full hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 transition-all"
            onClick={handlePost}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
