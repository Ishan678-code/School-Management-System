/**
 * Select.jsx - Styled dropdown with custom chevron icon, label, hover/focus states.
 * Native <select>, full-width responsive, appearance-none.
 * Usage: <Select label="Class" onChange={handleClass}><option>All</option><option>10A</option></Select>
 */

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils.js';

const Select = React.forwardRef(({ className, children, label, ...props }, ref) => {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-semibold text-slate-700">{label}</label>}
      <div className="relative">
        <select
          className={cn(
            'w-full appearance-none px-4 py-2.5 pr-9 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:bg-slate-50 transition-all',
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 w-4 h-4" />
      </div>
    </div>
  );
});

Select.displayName = 'Select';

export { Select };
