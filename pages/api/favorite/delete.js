import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const body = await JSON.parse(req.body);
      const session = await getServerSession(req, res, authOptions);

      const db = (await connectDB).db("paintings_shop");
      const result = await db
        .collection("favorite")
        .deleteOne({ email: session.user.email, product_id: body.product_id });

      res.status(200).json({
        success: true,
      });
    } catch (err) {
      console.error(err);
    }
  }
}
