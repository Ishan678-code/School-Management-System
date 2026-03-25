// src/components/ui/ChartContainer.jsx
export const ChartContainer = ({ title, children, extra }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[400px]">
    <div className="flex items-center justify-between mb-6">
      <h3 className="font-bold text-slate-800">{title}</h3>
      {extra}
    </div>
    <div className="flex-1 min-h-0 w-full">
      {children}
    </div>
  </div>
);