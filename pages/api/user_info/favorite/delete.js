import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const body = JSON.parse(req.body);

      const db = (await connectDB).db("paintings_shop");

      for (let i = 0; i < body.checked_Id_list.length; i++) {
        const result = await db.collection("favorite").deleteOne({
          email: body.email,
          product_id: body.checked_Id_list[i],
        });
      }

      res.status(200).json({ success: true, data: "Product has been deleted" });
    } catch (err) {
      console.error(err);
    }
  }
}
