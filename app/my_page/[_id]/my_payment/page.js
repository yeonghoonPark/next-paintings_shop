import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import MyPaymentSection from "./MyPaymentSection";
import { FaCreditCard } from "react-icons/fa";

export default async function MyPaymentPage() {
  const session = await getServerSession(authOptions);
  return (
    <div className='my-payment'>
      <h2>
        My Payment Information
        <FaCreditCard className='fa-credit-card' />
      </h2>
      <hr />
      <MyPaymentSection />
    </div>
  );
}
