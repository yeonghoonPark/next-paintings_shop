import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import ProductDetail from "./ProductDetail";
import ProductNotice from "./ProductNotcie";

export default async function ShopDetailPage(props) {
  const session = await getServerSession(authOptions);
  console.log("ShopDetailPage컴포넌트 session =", session);
  const db = (await connectDB).db("paintings_shop");
  const data = await db
    .collection("products")
    .findOne({ _id: new ObjectId(props.params._id) });
  data._id = data._id.toString();

  return (
    <div className='container shop-detail-page'>
      <ProductDetail data={data} />
      <hr />
      <ProductNotice _id={props.params._id} session={session} />
    </div>
  );
}
