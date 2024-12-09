import axios from "axios";
async function Register(obj)
{
    try{
        const response=await axios.post('http://localhost:3000/api/user/register',obj);
        console.log(response,'fd');
        return response.data;

    }catch(error)
    {
      throw error;
    }

}
export default Register;