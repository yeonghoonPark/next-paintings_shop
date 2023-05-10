import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = await JSON.parse(req.body);
      const db = (await connectDB).db("paintings_shop");
      const user = await db.collection("users").findOne({ email: body.email });

      user.mileage = user.mileage ?? "0";

      const result = await db
        .collection("users")
        .updateOne(
          { email: body.email },
          { $set: { mileage: body.mileage.toString() } },
        );

      res.status(200).json({
        success: true,
        data: "Mileage charging completed successfully.",
      });
    } catch (err) {
      console.error(err);
    }
  }
}
