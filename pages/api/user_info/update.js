import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const body = JSON.parse(req.body);

      const db = (await connectDB).db("paintings_shop");
      const users = await db.collection("users").find().toArray();

      const checkUserName = users.some((user) => {
        return user?.name.toLowerCase() === body.name.toLowerCase();
      });

      if (checkUserName) {
        return res
          .status(200)
          .json({
            success: false,
            data: "Duplicate name Please use a different name.",
          });
      }

      const result = await db.collection("users").updateOne(
        {
          email: body.email,
        },
        {
          $set: {
            name: body.name,
          },
        },
      );

      res.status(200).json({ success: true, data: "Changes have been saved" });
    } catch (err) {
      console.error(err);
    }
  }
}
