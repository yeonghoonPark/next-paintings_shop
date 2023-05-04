import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const db = (await connectDB).db("paintings_shop");
      const data = await db
        .collection("products")
        .find({ is_new: true })
        .toArray();

      res.status(200).json({ success: true, data: data });
    } catch (err) {
      console.error(err);
    }
  }
}
