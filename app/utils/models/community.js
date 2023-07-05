import mongoose, { Schema } from "mongoose";

const communitySchema = new Schema(
  {
    commName: {
      type: String,
      required: true,
    },
    userComm: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Community ||
  mongoose.model("Community", communitySchema);
