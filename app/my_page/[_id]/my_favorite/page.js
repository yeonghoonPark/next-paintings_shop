import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import MyFavoriteSection from "./MyFavoriteSection";
import { FaHeart } from "react-icons/fa";

export default async function MyFavoritePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className='my-favorite-page'>
      <h2>
        My Favorite
        <FaHeart className='fa-heart' />
      </h2>
      <hr />
      <MyFavoriteSection session={session} />
    </div>
  );
}
