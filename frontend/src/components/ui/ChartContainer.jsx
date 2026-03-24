/**
 * ChartContainer.jsx - Wrapper for charts (Recharts) with title and responsive height.
 * Clean card styling, fixed height viewport.
 * Usage: <ChartContainer title="Weekly Attendance"><AreaChart data={data}>...</AreaChart></ChartContainer>
 */

import React from 'react';

const ChartContainer = ({ title, children }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <h2 className="text-lg font-bold text-slate-800 mb-6">{title}</h2>
    <div className="h-64 w-full">{children}</div>
  </div>
);

export { ChartContainer };
