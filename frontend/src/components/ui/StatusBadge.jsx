// src/components/ui/StatusBadge.jsx
const StatusBadge = ({ status, variant = "default" }) => {
  const variants = {
    success: "bg-emerald-50 text-emerald-600 border-emerald-100",
    danger: "bg-rose-50 text-rose-600 border-rose-100",
    warning: "bg-orange-50 text-orange-600 border-orange-100",
    info: "bg-blue-50 text-blue-600 border-blue-100",
    default: "bg-slate-50 text-slate-600 border-slate-100"
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${variants[variant] || variants.default}`}>
      {status}
    </span>
  );
};

export default StatusBadge;