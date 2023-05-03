// import { connectDB } from "@/util/database";
import Slider from "./components/homepage/slider/Slider";

export default async function HomePage() {
  // const db = (await connectDB).db("paintings_shop");
  // const data = await db.collection("test").find().toArray();

  return (
    <div className='container home-page'>
      <Slider />

      <section className='piece'>
        <div>
          <h2>Piece</h2>
        </div>
        <div></div>
      </section>
    </div>
  );
}
