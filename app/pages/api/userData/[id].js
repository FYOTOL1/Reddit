import connectDB from "@/utils/connectDB";
import user from "@/utils/models/user";

export default async function handlerOneUser(req, res) {
  try {
    await connectDB();
    const { method } = req;
    if (method === "GET") {
      const data = await user.findOne({ _id: req.query.id });
      res.status(200).json(data);
    } else {
      res.status(300).json({ MSG: "NOTHING" });
    }
  } catch (error) {
    res.status(400).json(error + "error");
  }
}
