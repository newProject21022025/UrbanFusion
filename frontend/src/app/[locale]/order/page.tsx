// app/[locale]/order/page.tsx

// import dynamic from "next/dynamic";

// const OrderContent = dynamic(() => import("../../../components/orderContent/OrderContent"), {
//   ssr: false,
// });

// export default function OrderPage() {
//   return <OrderContent />;
// }
import React from 'react'
import OrderContent from '@/components/orderContent/OrderContent'
import OrderForm from '@/components/orderForm/OrderForm'

export default function page() {
  return (
    <div><OrderContent />
    <OrderForm/>
    </div>
  )
}
