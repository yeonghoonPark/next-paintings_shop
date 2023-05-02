import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const db = (await connectDB).db("paintings_shop");
      const data = await db
        .collection("users")
        .findOne({ _id: new ObjectId(req.query._id) });

      res.status(200).json({ success: true, data: data });
    } catch (err) {
      console.error(err);
    }
  }
}
