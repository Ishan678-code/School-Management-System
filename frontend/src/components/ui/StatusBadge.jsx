/**
 * StatusBadge.jsx - Color-coded pill badge for statuses (paid/active/absent/unpaid etc.).
 * Auto-maps variant to Tailwind colors/borders, uppercase text.
 * Usage: <StatusBadge variant="active">Active</StatusBadge> or <StatusBadge variant="unpaid">Unpaid</StatusBadge>
 */

import React from 'react';
import { cn } from '../../lib/utils';

const StatusBadge = ({ children, variant = 'default', className, ...props }) => {
  return (
    <span
      className={cn(
        'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block',
        {
          'bg-emerald-100 text-emerald-700 border border-emerald-200': variant === 'success' || variant === 'paid' || variant === 'active' || variant === 'pass',
          'bg-orange-100 text-orange-700 border border-orange-200': variant === 'warning' || variant === 'partial' || variant === 'onLeave',
          'bg-rose-100 text-rose-700 border border-rose-200': variant === 'error' || variant === 'absent' || variant === 'fail' || variant === 'unpaid',
          'bg-slate-100 text-slate-700 border border-slate-200': variant === 'default' || variant === 'medium',
          'bg-red-50 text-red-600 border border-red-100': variant === 'high',
          'bg-blue-50 text-blue-600 border border-blue-100': variant === 'students',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export { StatusBadge };
