import axios from "axios";

async function CreatePost(data, authUser) {
    console.log("Token:", authUser.token);

    try {
        const response = await axios.post(
            "http://localhost:3000/api/post/createpost",
            data, // Send the FormData directly
            {
                headers: {
                    Authorization: `Bearer ${authUser.token}`, // Authorization header
                },
                withCredentials: true, // Send cookies with the request
            }
        );

        // Handle or return the response as needed
        return response.data;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error; // Optionally rethrow the error for further handling
    }
}

export default CreatePost;
