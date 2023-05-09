import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const body = JSON.parse(req.body);
      const db = (await connectDB).db("paintings_shop");
      const result = await db.collection("qna").updateOne(
        {
          _id: new ObjectId(body._id),
        },
        {
          $set: {
            answer_status: true,
            reply: body.reply,
          },
        },
      );

      res
        .status(200)
        .json({ success: true, data: "Answer has been registered" });
    } catch (err) {
      console.error(err);
    }
  }
}
