import ApiError from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/User.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";




const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation -not empty
  //check if user already exists:username or email
  //check for images,check for avata
  //upload image to cloudinary,avtar
  //create user object-create entry in db
  //remove password and refresh token from response
  //check for user creation
  //retunn response

  const {username, email, password, fullName} = req.body;
console.log("email",email);
if([username,email,password,fullName].some((field)=>field?.trim()===""))
  {
  throw new ApiError(400,"All fields are required")
}
const userExists = await User.findOne({$or:[{email},{username}]});
if(userExists){
  throw new ApiError(409,"User already exists with the provided email or username")
}
const avatarlocalpath=req.files?.avatar?.[0]?.path;
const coverImagelocalpath=req.files?.coverImage?.[0]?.path;
if(!avatarlocalpath){
  throw new ApiError(400,"Avatar image is required")
}
const avatar = await uploadOnCloudinary(avatarlocalpath);
const coverImage = await uploadOnCloudinary(coverImagelocalpath); 
if(!avatar){
  throw new ApiError(500,"Failed to upload avatar image")
}
const newUser = await User.create({
  username:username.toLowerCase(),
  email,
  password,
  fullname,
  avatar:avatar.url,
  coverImage:coverImage?.url || ""  
})
 const createdUser = await newUser.findById(newUser._id).select("-password -refreshToken");
 if(!createdUser){
  throw new ApiError(500,"Failed to create user")
 }
 return res.status(201).json(new ApiResponse(true, "User registered successfully", createdUser))
})


export {registerUser};