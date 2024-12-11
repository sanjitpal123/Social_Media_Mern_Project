import Navbar from "../component/Navbar";
import ProfileCard from "../component/PostCard";
import Post from "../component/PostComponent";
import Sidebar from "../component/sidebar";

function Homepage() {
  return (
    <div >
     
        <Navbar />
        <ProfileCard />
        <Post />
        <Sidebar/>
        <h1>home</h1>
   
     
    </div>
  );
}
export default Homepage;
