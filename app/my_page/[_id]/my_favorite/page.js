import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import MyFavoriteSection from "./MyFavoriteSection";

export default async function MyFavoritePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className='my-favorite-page'>
      <h2>My Favorite</h2>
      <hr />
      <MyFavoriteSection session={session} />
    </div>
  );
}
