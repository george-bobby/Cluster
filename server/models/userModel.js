import mongoose, { Schema } from "mongoose";


//schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is Required!"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is Required!"],
    },
    email: {
      type: String,
      required: [true, " Email is Required!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required!"],
      minlength: [6, "Password length should be greater than 6 character"],
      select: true,
    },
    location: { type: String },
    profileUrl: { type: String },
    profession: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    views: [{ type: String }],
    tick: { type: Boolean, default: false },
    verified: { type: Boolean, default: true },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    skills: [{type:Array, default:[]}], 
    },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);

export default Users;
