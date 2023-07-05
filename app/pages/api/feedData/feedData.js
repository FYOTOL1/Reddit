import connectDB from "@/utils/connectDB";
import feed from "@/utils/models/feed";

export default async function handlerFeed(req, res) {
  try {
    await connectDB();
    const { method } = req;
    if (method === "GET") {
      const showAllFeed = await feed.find().populate("userFeed");
      res.status(200).json(showAllFeed);
    } else if (method === "POST") {
      const { title, description, userFeed } = req.body;
      const feedPost = await feed.create({ title, description, userFeed });
      res.status(201).json(feedPost);
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.log("Error Api", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
