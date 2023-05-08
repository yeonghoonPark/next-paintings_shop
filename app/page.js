// import { connectDB } from "@/util/database";
import Slider from "./components/homepage/slider/Slider";
import Piece from "./components/homepage/piece/Piece";
import NewArrival from "./components/homepage/new-arrival/NewArrival";

export default async function HomePage() {
  // const db = (await connectDB).db("paintings_shop");
  // const data = await db.collection("test").find().toArray();

  return (
    <div className='container home-page'>
      <Slider />
      <Piece />
      <hr className='main-hr' />
      <NewArrival />
    </div>
  );
}
