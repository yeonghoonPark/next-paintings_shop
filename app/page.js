import { connectDB } from "@/util/database";

export default async function HomePage() {
  const db = (await connectDB).db("paintings_shop");
  const data = await db.collection("test").find().toArray();

  return (
    <div>
      <h1>테스트</h1>
      <p>타이틀 {data.title}</p>
      <p>콘텐트{data.content}</p>
    </div>
  );
}
