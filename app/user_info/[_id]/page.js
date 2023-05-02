import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

import MileageChargingPage from "./MileageChargingPage";

export default async function UserInfo(props) {
  const session = await getServerSession(authOptions);
  const db = (await connectDB).db("paintings_shop");
  const signedUser = await db
    .collection("users")
    .findOne({ _id: new ObjectId(props.params._id) });
  session && (signedUser._id = signedUser._id.toString());

  return (
    <div>
      <MileageChargingPage signedUser={signedUser} />
    </div>
  );
}
