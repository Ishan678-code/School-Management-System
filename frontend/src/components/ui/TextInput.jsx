/**
 * TextInput.jsx - Form input with optional icon, label, and focus states.
 * Supports all native input props, Tailwind styling with hover/focus rings.
 * Usage: <TextInput label="Email" icon={<MdMailOutline className="w-4 h-4" />} />
 */

import React from 'react';
import { cn } from '../lib/utils.js';

const TextInput = React.forwardRef(({ className, icon, label, type = 'text', ...props }, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-semibold text-slate-700 block">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'w-full px-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all',
            icon ? 'pl-10' : 'pl-4',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    </div>
  );
});

TextInput.displayName = 'TextInput';

export { TextInput };
