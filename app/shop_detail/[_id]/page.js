import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import ProductDetail from "./ProductDetail";
import ProductNotice from "./ProductNotcie";

export async function generateMetadata(props) {
  const db = (await connectDB).db("paintings_shop");
  const data = await db
    .collection("products")
    .findOne({ _id: new ObjectId(props.params._id) });
  data._id = data._id.toString();

  const { product_name, paintings_type, producer } = data;

  return {
    title: `${product_name}`,
    description: `type: ${paintings_type}, producer: ${producer}`,
  };
}

export default async function ShopDetailPage(props) {
  const session = await getServerSession(authOptions);
  const db = (await connectDB).db("paintings_shop");
  const data = await db
    .collection("products")
    .findOne({ _id: new ObjectId(props.params._id) });
  data._id = data._id.toString();
  const signedUser = await db
    .collection("users")
    .findOne({ email: session?.user.email });
  session && (signedUser._id = await signedUser._id.toString());

  return (
    <div className='container shop-detail-page'>
      <ProductDetail
        data={data}
        _id={props.params._id}
        session={session}
        signedUser={signedUser}
      />
      <hr />
      <ProductNotice _id={props.params._id} session={session} />
    </div>
  );
}
