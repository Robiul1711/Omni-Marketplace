import React from 'react'
import AllOrders from '@/components/hostDashbaord/totalOrder/AllOrders'
import MyPlacement from '@/components/hostDashbaord/totalOrder/CreatePlacement'

const TotalOrder = () => {
  return (
    <div className="space-y-4">
        <MyPlacement />
        <AllOrders />
    </div>
  )
}

export default TotalOrder