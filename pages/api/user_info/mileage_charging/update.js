import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = await JSON.parse(req.body);
      const db = (await connectDB).db("paintings_shop");
      const user = await db.collection("users").findOne({ email: body.email });

      user.mailage = user.mailage ?? "0";
      const calculatedmileage = parseInt(user.mailage) + parseInt(body.mailage);

      const result = await db
        .collection("users")
        .updateOne(
          { email: body.email },
          { $set: { mailage: calculatedmileage.toString() } },
        );

      res
        .status(200)
        .json({ success: true, data: "마일리지 충전이 완료되었습니다." });
    } catch (err) {
      console.error(err);
    }
  }
}
