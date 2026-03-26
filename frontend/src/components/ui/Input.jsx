import React from 'react';

export const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label className="text-sm font-semibold text-slate-700 ml-1">
          {label}
        </label>
      )}
      <input
        className={`
          px-4 py-2.5 bg-white border rounded-xl text-sm transition-all outline-none
          placeholder:text-slate-400
          ${error 
            ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-50' 
            : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50'
          }
        `}
        {...props}
      />
      {error && <span className="text-xs font-medium text-rose-500 ml-1">{error}</span>}
    </div>
  );
};