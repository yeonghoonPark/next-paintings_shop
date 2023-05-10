import MyPageNav from "./MyPageNav";

export default async function MyPageLayout({ params, children }) {
  return (
    <div className='container'>
      <div className='my-page'>
        <div className='my-page-left'>
          <MyPageNav _id={params._id} />
        </div>

        <div className='my-page-right'>{children}</div>
      </div>
    </div>
  );
}
