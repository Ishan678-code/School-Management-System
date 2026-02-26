



import { useState } from "react";
import { Search, Bell, Menu } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import AdminSidebar from "../components/AdminSidebar";
import {
  sidebarItems,
  statsCards,
  chartData,
  activities,
} from "../data/dashboardData";

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f5f7fb] overflow-hidden">

      {/* Sidebar */}
      <AdminSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        sidebarItems={sidebarItems}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 lg:py-5 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger */}
            <button
              className="lg:hidden text-gray-600"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} />
            </button>

            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
                Welcome back, Dr.!
              </h1>
              <p className="text-xs lg:text-sm text-gray-500">
                School overview and analytics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button className="relative text-gray-500 hover:text-gray-800">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-8">

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {statsCards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}
                  >
                    <card.icon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1">
                  {card.value}
                </p>
                <p className="text-sm text-gray-500">{card.sub}</p>
              </div>
            ))}
          </div>

          {/* Chart + Activity */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-6">
                Weekly Attendance Overview
              </h3>

              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" domain={[0, 100]} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    fill="#3b82f620"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-6">
                Recent Activity
              </h3>

              <div className="space-y-5">
                {activities.map((a, i) => (
                  <div key={i} className="flex gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${a.color}`}
                    >
                      <a.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">
                        {a.title}
                      </p>
                      <p className="text-xs text-gray-500">{a.desc}</p>
                    </div>
                    <span className="text-xs text-gray-400">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;