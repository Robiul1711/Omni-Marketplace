import React from "react";
import OrderHeader from "@/components/hostDashboard/myPlacement/OrderHeader";
import OrderStepper from "@/components/hostDashboard/myPlacement/OrderStepper";
import ProofSubmission from "@/components/hostDashboard/myPlacement/ProofSubmission";
import HostComment from "@/components/hostDashboard/myPlacement/HostComment";
import OrderSidebarInfo from "@/components/hostDashboard/myPlacement/OrderSidebarInfo";
import SupportChat from "@/components/hostDashboard/myPlacement/SupportChat";

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
