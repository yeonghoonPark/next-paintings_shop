import Products from "./Products";

export const metadata = {
  title: "All Paintings",
  description: "watercolors, oilcolors and etc",
};

export default function ShopPage() {
  return (
    <div className='container shop-page'>
      <Products />
    </div>
  );
}
