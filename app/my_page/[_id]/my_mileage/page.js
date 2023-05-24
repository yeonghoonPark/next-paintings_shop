import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import MyMileageSection from "./MyMileageSection";
import { FaCoins } from "react-icons/fa";

export const metadata = {
  title: "My Mileage",
  description: "My Mileage Settings",
};

export default async function MyMileagePage(props) {
  const session = await getServerSession(authOptions);
  const db = (await connectDB).db("paintings_shop");
  const signedUser = await db
    .collection("users")
    .findOne({ _id: new ObjectId(props.params._id) });
  session && (signedUser._id = await signedUser._id.toString());
  return (
    <div className='my-mileage-page'>
      <h2>
        My Mileage
        <FaCoins className='fa-coins' />
      </h2>
      <hr />
      <MyMileageSection session={session} signedUser={signedUser} />
    </div>
  );
}
