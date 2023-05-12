import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const session = await getServerSession(req, res, authOptions);
      const db = (await connectDB).db("paintings_shop");
      const data = await db
        .collection("payment")
        .find({ email: session?.user?.email })
        .toArray();

      res.status(200).json({ success: true, data: data });
    } catch (err) {
      console.error(err);
    }
  }
}
