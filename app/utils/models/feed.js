import mongoose, { Schema } from "mongoose";

const FeedSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    lvl: {
      type: Number,
      default: 0,
    },
    userFeed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Feed || mongoose.model("Feed", FeedSchema);
