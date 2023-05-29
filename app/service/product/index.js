import { connectDB } from "@/util/database";

export async function getAllProducts() {
  const db = (await connectDB).db("paintings_shop");
  const data = await db.collection("products").find().toArray();
  return data;
}

export async function getNewProducts() {
  const db = (await connectDB).db("paintings_shop");
  const data = await db.collection("products").find({ is_new: true }).toArray();
  return data;
}
