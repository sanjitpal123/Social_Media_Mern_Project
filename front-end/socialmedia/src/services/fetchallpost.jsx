import axios from "axios";
async function FetchallPost(authUser)
{
    try{
        const response=await axios.get("http://localhost:3000/api/post/getallpost",{
            headers: {
                Authorization: `Bearer ${authUser.token}`,
              },
              withCredentials: true, // Ensure cookies are sent with the request
        })
        console.log(response,'fetchallpost');
        return response.data
    }
    catch(error)
    {
        throw error;
    }

}
export default FetchallPost;