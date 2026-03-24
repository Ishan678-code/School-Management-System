/**
 * StatCard.jsx - Dashboard metric card with icon, value, subtitle, colored icons.
 * Hover shadow, responsive layout, color variants (blue/emerald/rose/amber).
 * Usage: <StatCard title="Total Students" value="1,234" icon={<Users className="w-5 h-5" />} color="blue" sub="+12.5%" />
 */

import React from 'react';

const StatCard = ({ title, value, sub, icon, color = 'slate' }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getColorClass(color)}`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      {sub && <p className="text-sm text-slate-500 mt-1">{sub}</p>}
    </div>
  );
};

const getColorClass = (color) => {
  const colors = {
    blue: 'bg-blue-600 text-white shadow-blue-200',
    emerald: 'bg-emerald-500 text-white shadow-emerald-200',
    rose: 'bg-rose-500 text-white shadow-rose-200',
    amber: 'bg-amber-500 text-white shadow-amber-200',
    default: 'bg-slate-100 text-slate-600',
  };
  return colors[color] || colors.default;
};

export { StatCard };
