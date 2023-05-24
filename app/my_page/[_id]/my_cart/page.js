import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { connectDB } from "@/util/database";
import MyCartSection from "./MyCartSection";
import { FaShoppingCart } from "react-icons/fa";

export const metadata = {
  title: "My Cart",
  description: "Shopping Basket Settings",
};

export default async function MyCartPage() {
  const session = await getServerSession(authOptions);
  const db = (await connectDB).db("paintings_shop");
  const signedUser = await db
    .collection("users")
    .findOne({ email: session?.user.email });
  session && (signedUser._id = await signedUser._id.toString());

  return (
    <div className='my-cart-page'>
      <h2>
        My Cart
        <FaShoppingCart className='fa-shopping-cart' />
      </h2>
      <hr />
      <MyCartSection session={session} signedUser={signedUser} />
    </div>
  );
}
