import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  country: String,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
