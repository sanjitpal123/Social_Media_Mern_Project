import axios from "axios";

async function Logout(authUser) {
    console.log('Token:', authUser.token);
    try {
        const response = await axios.post(
            'http://localhost:3000/api/user/logout',
            {},  // empty body because you're only sending headers
            {
                headers: {
                    Authorization: `Bearer ${authUser.token}`,
                },
                withCredentials: true, // Ensure cookies are sent with the request
            }
        );
        console.log('Logout response:', response);
        return response.data;
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
}

export default Logout;
