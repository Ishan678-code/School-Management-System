// src/components/ui/StatCard.jsx
import React from 'react';

const StatCard = ({ title, value, icon, trend, colorClass = "text-blue-600", bgClass = "bg-blue-50" }) => {
  const Icon = icon;
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${bgClass} ${colorClass}`}>
          {Icon ? <Icon size={24} /> : null}
        </div>
        {trend && (
          <span className={`text-xs font-bold px-2 py-1 rounded-lg ${trend > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    </div>
  );
};

export default StatCard;