import React from 'react';
import StatsCards from '@/components/hostDashboard/dashboard/StatsCards';
import RevenueChart from '@/components/hostDashboard/dashboard/RevenueChart';
import DisputeOverview from '@/components/hostDashboard/dashboard/DisputeOverview';
import RecentOrders from '@/components/hostDashboard/dashboard/RecentOrders';

const Dashboard = () => {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* Stats Cards Section */}
      <StatsCards />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
          <DisputeOverview />
        </div>
      </div>

      {/* Recent Orders Section */}
      <RecentOrders />
    </div>
  );
};

export default Dashboard;