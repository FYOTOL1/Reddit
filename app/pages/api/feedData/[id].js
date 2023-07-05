import connectDB from "@/utils/connectDB";
import feed from "@/utils/models/feed";

export default async function handlerFeed(req, res) {
  try {
    await connectDB();
    const { method } = req;
    if (method === "GET") {
      const showOneFeed = await feed.find({
        _id: req.query.id,
      });
      res.status(200).json(showOneFeed);
    } else if (method === "PATCH") {
      const { lvl } = req.body;
    const changeFeed = await feed.findOneAndUpdate(
        { _id: req.query.id },
        {
          $set: {
            lvl: lvl,
          },
        },
        { new: true }
      );
      res.status(200).json(changeFeed);
    } else if (method === "DELETE") {
      const deleteOne = await feed.findOneAndDelete({ _id: req.query.id });
      res.status(200).json(deleteOne);
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.log("Error Api", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
