import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = await JSON.parse(req.body);
      const db = (await connectDB).db("paintings_shop");
      const users = await db.collection("users").find().toArray();
      const encryptedPassword = await bcrypt.hash(body.password, 10);

      const newUser = {
        name: body.name,
        email: body.email,
        password: encryptedPassword,
        image: body.image ?? "https://i.pravatar.cc",
        mailage: "0",
        role: "normal",
      };

      const checkUsers = users.some((user) => {
        return user?.email === body.email;
      });

      if (checkUsers) {
        return res
          .status(200)
          .json({ success: false, data: "중복 된 Email입니다." });
      }

      const result = await db.collection("users").insertOne(newUser);
      res
        .status(200)
        .json({ success: true, data: "회원가입이 완료되었습니다." });
    } catch (err) {
      console.error(err);
    }
  }
}
