import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = JSON.parse(req.body);

      const session = await getServerSession(req, res, authOptions);

      const cartItem = {
        email: session.user.email,
        product_id: body.product_id,
      };

      const db = (await connectDB).db("paintings_shop");

      const result = await db.collection("cart").insertOne(cartItem);

      res.status(200).json({
        success: true,
        data: "Added to cart, you want to go to the cart page?",
      });
    } catch (err) {
      console.error(err);
    }
  }
}
