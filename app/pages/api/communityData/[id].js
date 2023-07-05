import connectDB from "@/utils/connectDB";
import Community from "@/utils/models/community";

export default async function handlerCommunity(req, res) {
  try {
    await connectDB();
    const { method } = req;
    if (method === "GET") {
      const showOne = await Community.findOne({ userComm: req.query.id });
      res.status(200).json(showOne);
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.log("Error API", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
