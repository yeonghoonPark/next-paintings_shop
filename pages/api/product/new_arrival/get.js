import { getNewProducts } from "@/app/service/product";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await getNewProducts();
      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error(err);
    }
  }
}
