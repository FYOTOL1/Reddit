import connectDB from "@/utils/connectDB";
import user from "@/utils/models/user";

export default async function handlerUser(req, res) {
  try {
    await connectDB();
    const { method } = req;
    if (method === "GET") {
      const data = await user.find();
      res.status(200).json(data);
    } else if (method === "POST") {
      const { username, email, password, country } = req.body;
      const postData = await user.create({
        username,
        email,
        password,
        country,
      });

      res.status(201).json({ postData });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.log("Error Api", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
