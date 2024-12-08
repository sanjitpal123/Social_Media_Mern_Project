import { FindUser, Registerservice } from "../services/userService.js";
import User from "../schema/userSchema.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/generatetoken.js";
import { findAllUser, findbyid, findbyidanddelete } from "../repository/userRepo.js";
import cloudinary from "../config/Cloudinary.js";

export const CreateAccount = async (req, res) => {
    try {
        const { fullname, username, email, password } = req.body;

        if (!fullname || !username || !email || !password) {
            return res.status(400).json({
                message: 'Some fields are missing, please fill all fields',
                success: false
            });
        }

        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(409).json({
                message: 'User already exists with the same email or username',
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userobj = { fullname, username, email, password: hashedPassword };

        const newUser = await Registerservice(userobj);
        return res.status(201).json({
            message: "User created successfully",
            success: true,
            user: newUser
        });
    } catch (error) {
        console.error('Error in CreateAccount:', error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};


export const Signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required',
                success: false,
            });
        }

        // Find user by email
        const user = await FindUser(email);
        if (!user) {
            return res.status(404).json({
                message: 'User not found with this email',
                success: false,
            });
        }

        // Validate password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                message: 'Invalid password',
                success: false,
            });
        }

        // Generate token
        const token = await generateToken(user._id);
        console.log('Generated Token:', token);

        // Set cookie with the token
        res.cookie('token', token, {
            httpOnly: true, // Secure the cookie
            sameSite: 'strict', // Prevent CSRF
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        // Send success response
        return res.status(200).json({
            message: 'Signin successful',
            success: true,
            token,
            user: { id: user._id, email: user.email, username: user.username }, // Exclude sensitive fields
        });
    } catch (error) {
        console.error('Error in Signin:', error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
        });
    }
};
export const  Logout=async(req,res)=>{
    try{
       res.cookie("token","",{
        httpOnly: true, // Secure the cookie
        sameSite: 'strict', // Prevent CSRF
        secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
        expires: new Date(0), // Set the cookie to expire immediately
       })
       return res.status(201).json({
        message:'Logged out successfully',
        success:true
       })
    }catch(error)
    {
        return res.status(501).json({
            message:'Internal server error',
            success:false
        })
    }
}

export const editProfile = async (req, res) => {
    try {
        const { bio } = req.body;
        const profilePic = req.file; // Assuming you're using a middleware like multer for file handling
        const userId = req.user.id; // `req.user` should be set by your authentication middleware

        // Validate user ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({
                message: 'User not found',
                success: false,
            });
        }

        // Validate profile picture file
        if (!profilePic) {
            return res.status(400).json({
                message: 'Profile picture is required',
                success: false,
            });
        }

        // Upload profile picture to Cloudinary
        const uploaded = await cloudinary.uploader.upload(profilePic.path); // Ensure `profilePic.path` is correct

        // Update user details
        user.bio = bio || user.bio; // Only update bio if it's provided
        user.profilePicture = uploaded.secure_url; // Set the Cloudinary URL
        await user.save();

        // Respond with success
        return res.status(200).json({
            message: 'Profile updated successfully',
            success: true,
            user,
        });
    } catch (error) {
        console.error('Error in editProfile:', error.message);
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
        });
    }
};
export const deleteProfile=async(req,res)=>{
    try{
        const userid=req.user.id;
        const user=await findbyid(userid);
        if(!user)
        {
            return res.status(401).json({
                message:'user not found',
                success:true
            })
        }
        const deleted=await findbyidanddelete(userid);
        if(!deleted)
        {
            return res.status(401).json({
                message:'Cloud not delete profile',
                success:false
            })
        }
        return res.status(201).json({
            message:'Acount is deleted successfully ',
            deletedaccount:deleted,
            success:true
        })
    }catch(error)
    {
        return res.status(501).json({
            message:'Internal server error',
            success:false
    })
    }
}
export const getProfileById=async(req,res)=>{
    try{
        const id=req.params.id;
        const user=await findbyid(id);
        if(!user)
        {
            return res.status(401).json({
                message:'User not found',
                success:false
            })
        }
        return res.status(201).json({
            user,
            success:true
        })
    }
    catch(error)
    {
        return res.status(501).json({
            message:"Internal server error",
            success:false
        })
    }
}
export const getUserProfile=async(req,res)=>{
    try{
        const id=req.user.id;
        const user=await findbyid(id);
        if(!user)
        {
            return res.status(401).json({
                message:'User not found',
                success:true
            })
        }
        return res.status(201).json({
         user,
         success:true
        })
    }catch(error)
    {
        return res.status(501).json({
            message:'Internal server error',
            success:false
        })
    }
}
export const followOrUnfollow = async (req, res) => {
    try {
      const whowillfollowId = req.user.id; 
      const whomToFollowId = req.params.id; 
  console.log(whomToFollowId,whowillfollowId)
     
      const whoWillFollowUser = await User.findById(whowillfollowId);
      const whomToFollowUser = await User.findById(whomToFollowId);
      if(whowillfollowId==whomToFollowId)
      {
        return res.status(401).json({
            message:"Can not follow or unfollow yourself",
            success:false
        })
      }
    
      if (!whoWillFollowUser || !whomToFollowUser) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }
  
      
      if (whomToFollowUser.followers.includes(whowillfollowId)) {
       
        await User.findByIdAndUpdate(whomToFollowId, { $pull: { followers: whowillfollowId } });
        await User.findByIdAndUpdate(whowillfollowId, { $pull: { following: whomToFollowId } });
  
        return res.status(200).json({
          message: "Unfollowed successfully",
          success: true,
        });
      } else {
       
        await User.findByIdAndUpdate(whomToFollowId, { $push: { followers: whowillfollowId } });
        await User.findByIdAndUpdate(whowillfollowId, { $push: { following: whomToFollowId } });
  
        return res.status(200).json({
          message: "Followed successfully",
          success: true,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        success: false,
        error: error.message,
      });
    }
  };
  export const getAllUser=async(req,res)=>{
    try{
        const users=await findAllUser();
         if(!users)
         {
            return res.status(401).json({
                message:"no user yet",
                users
            })
         }
         return res.status(201).json({
            users,
            success:true
         })
    }
    catch(error)
    {
        return res.status(501).json({
            message:"Internal server error",
            success:false
        })
    }
  }
  
