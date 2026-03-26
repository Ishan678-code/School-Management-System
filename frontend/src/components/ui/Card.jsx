import React from 'react';

export const Card = ({ children, className = '', noPadding = false }) => {
  return (
    <div className={`
      bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden
      ${!noPadding ? 'p-6' : ''} 
      ${className}
    `}>
      {children}
    </div>
  );
};