import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import ProductDetail from "./ProductDetail";

export default async function ShopDetailPage(props) {
  const db = (await connectDB).db("paintings_shop");
  const data = await db
    .collection("products")
    .findOne({ _id: new ObjectId(props.params._id) });
  data._id = data._id.toString();

  return (
    <div className='container shop-detail-page'>
      <ProductDetail data={data} />
      <section>
        <h1>Detail Notice</h1>
      </section>
    </div>
  );
}
