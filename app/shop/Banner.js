export default function Banner({ categoryType }) {
  return (
    <section className='banner'>
      <span className={`banner-text ${categoryType}`}>{categoryType}</span>
      <img
        src={`/images/banner/banner_${categoryType}.jpg`}
        alt={`${categoryType}`}
      />
    </section>
  );
}
