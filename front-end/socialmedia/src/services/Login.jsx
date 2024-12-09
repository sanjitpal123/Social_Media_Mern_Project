import axios from 'axios'
async function LoginService(obj)
{
    try{
        console.log('fldfd',obj)
        const response=await axios.post('http://localhost:3000/api/user/login',obj);
        console.log('res',response)
        return response.data;

    }catch(error)
    {
      throw error;
    }
    

}
export default LoginService