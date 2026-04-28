import React from "react";
import OrderHeader from "@/components/hostDashbaord/myPlacement/OrderHeader";
import OrderStepper from "@/components/hostDashbaord/myPlacement/OrderStepper";
import ProofSubmission from "@/components/hostDashbaord/myPlacement/ProofSubmission";
import HostComment from "@/components/hostDashbaord/myPlacement/HostComment";
import OrderSidebarInfo from "@/components/hostDashbaord/myPlacement/OrderSidebarInfo";
import SupportChat from "@/components/hostDashbaord/myPlacement/SupportChat";

const OrderDetails = () => {
  return (
    <div className="max-w-[1600px] mx-auto relative pb-20 md:pb-10">
      <OrderHeader />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
        {/* Main Content */}
        <div className="xl:col-span-2 flex flex-col gap-6 md:gap-8">
          <OrderStepper />
          <ProofSubmission />
          <HostComment />
        </div>

        {/* Sidebar Info */}
        <div className="xl:col-span-1">
          <OrderSidebarInfo />
        </div>
      </div>

      {/* Floating Support Chat */}
      <SupportChat />
    </div>
  );
};

export default OrderDetails;
