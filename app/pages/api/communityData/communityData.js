import connectDB from "@/utils/connectDB";
import Community from "@/utils/models/community";

export default async function handlerCommunity(req, res) {
  try {
    await connectDB();
    const { method } = req;
    if (method === "GET") {
      const showAllFeed = await Community.find().populate("userComm");
      res.status(200).json(showAllFeed);
    } else if (method === "POST") {
      const { commName, userComm } = req.body;
      const creator = await Community.create({
        commName,
        userComm,
      });
      res.status(201).json(creator);
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" + error });
  }
}
