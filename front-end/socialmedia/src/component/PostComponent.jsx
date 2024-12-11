import { useContext, useEffect, useState } from "react";
import UserContext from "../context/userProvider";
import FetchallPost from "../services/fetchallpost";

function Post() {
  const { user, authUser ,posts} = useContext(UserContext);
 
  return (
    <div className="w-full flex justify-center py-10 bg-black">
      <div className="w-[90%] md:w-[70%] lg:w-[50%] bg-gray-800 p-6 rounded-lg shadow-lg">
        {posts?.map((post, index) => (
          <div
            key={index}
            className="bg-black mb-6 p-6 rounded-lg shadow-xl border border-gray-700 hover:shadow-2xl transition-all"
          >
          
            <div className="flex items-center mb-5">
              <img
                src={post.user.profilePicture}
                alt="profile"
                className="w-14 h-14 rounded-full border-2 border-gray-500"
              />
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white">{post.user.fullname}</h3>
                <p className="text-sm text-gray-400">{post.cr}</p>
              </div>
            </div>

          
            <div className="mb-5">
              <p className="text-gray-300 mb-4">{post.caption}</p>
              {post.type === "video" ? (
                <video
                  controls
                  className="w-full max-h-[400px] rounded-lg border-2 border-gray-700"
                >
                  <source src={post.content} type="video/mp4" />
                
                </video>
              ) : (
                post.content && (
                  <img
                    src={post.content}
                    alt="post"
                    className="w-full max-h-[400px] rounded-lg object-cover border-2 border-gray-700"
                  />
                )
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center text-gray-400 mt-4">
              <button className="flex items-center gap-2 hover:text-blue-400 transition-all">
                <span>👍</span> <span>Like</span>
              </button>
              <button className="flex items-center gap-2 hover:text-blue-400 transition-all">
                <span>💬</span> <span>Comment</span>
              </button>
              <button className="flex items-center gap-2 hover:text-blue-400 transition-all">
                <span>🔗</span> <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;
