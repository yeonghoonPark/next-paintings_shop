export default function Piece() {
  return (
    <section className='piece'>
      <div className='piece-left'>
        <h2>Piece</h2>
      </div>
      <div className='piece-right'>
        <div className='piece-watercolor'>
          <h3>Watercolor</h3>
          <img src='/images/banner/banner_watercolor.jpg' alt='watercolor' />
          <p>
            Watercolor is a type of paint that you can use to solve in water, or
            you can paint with it, so look at a variety of watercolors.
          </p>
        </div>
        <div className='piece-oilcolor'>
          <h3>Oilcolor</h3>
          <img src='/images/banner/banner_oilcolor.jpg' alt='oilcolor' />
          <p>
            It is a method loved by artists even today because it can be painted
            using oil-based paint, painted several times, and expressed using a
            unique texture of paint.
          </p>
        </div>
      </div>
    </section>
  );
}
