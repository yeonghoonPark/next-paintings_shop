import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import MyProfileSection from "./MyProfileSection";

export default async function MyProfilePage(props) {
  const session = await getServerSession(authOptions);
  const db = (await connectDB).db("paintings_shop");
  const signedUser = await db
    .collection("users")
    .findOne({ _id: new ObjectId(props.params._id) });
  session && (signedUser._id = signedUser._id.toString());

  return (
    <div className='my-profile-page'>
      <h2>My Profile</h2>
      <hr />
      <MyProfileSection session={session} signedUser={signedUser} />
    </div>
  );
}
