import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const db = (await connectDB).db("paintings_shop");

      const userFavoriteList = await db
        .collection("favorite")
        .find({ email: req.query.email })
        .toArray();

      const productIdList = userFavoriteList.map((cV) =>
        new ObjectId(cV.product_id).toString(),
      );

      const allProducts = await db.collection("products").find().toArray();

      const result = [];
      for (let i = 0; i < productIdList.length; i++) {
        allProducts.map(
          (cV) => cV._id.toString() === productIdList[i] && result.push(cV),
        );
      }

      res.status(200).json({ success: true, data: result });
    } catch (err) {
      console.error(err);
    }
  }
}
