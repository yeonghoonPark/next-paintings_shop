import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { myTimeStamp } from "@/app/functions/common";
import { createOrderNum } from "@/app/functions/common";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = JSON.parse(req.body);
      const db = (await connectDB).db("paintings_shop");

      /* Update user's mileage */
      const updateUser = await db.collection("users").updateOne(
        { email: body.email },
        {
          $set: {
            mileage: (
              parseInt(body.mileage) - parseInt(body.total_price)
            ).toString(),
          },
        },
      );

      /* stock update of products */
      const orderIdList = body.checked_id_list.map((cV) => new ObjectId(cV));

      for (let i = 0; i < orderIdList.length; i++) {
        const updateProducts = await db.collection("products").updateOne(
          { _id: orderIdList[i] },
          {
            $set: { stock: "0" },
          },
        );
      }

      /* create a document in a payment */
      const payment = {
        email: body.email,
        order_name_list: body.checked_name_list,
        order_num: createOrderNum(),
        time_stamp: myTimeStamp(),
        payment_amount: body.total_price.toString(),
        payment_type: "mileage",
      };

      const result = await db.collection("payment").insertOne(payment);

      res.status(200).json({
        success: true,
        data: "The payment has been completed, thank you.",
      });
    } catch (err) {
      console.error(err);
    }
  }
}
