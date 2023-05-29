import Slider from "./components/homepage/slider/Slider";
import Piece from "./components/homepage/piece/Piece";
import NewArrival from "./components/homepage/new-arrival/NewArrival";

export default async function HomePage() {
  return (
    <div className='container home-page'>
      <Slider />
      <Piece />
      <hr className='main-hr' />
      <NewArrival />
    </div>
  );
}
