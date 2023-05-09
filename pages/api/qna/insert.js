import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions);
      const body = JSON.parse(req.body);

      const qna = {
        title: body.title,
        email: session?.user?.email,
        author: session?.user?.name,
        answer_status: body.answer_status,
        created_at: body.created_at,
        product_id: body.product_id,
        private_type: body.private_type,
        reply: body.reply,
      };

      const db = (await connectDB).db("paintings_shop");
      const result = await db.collection("qna").insertOne(qna);

      res
        .status(200)
        .json({ success: true, message: "Q&A has been registered" });
    } catch (err) {
      console.error(err);
    }
  }
}
