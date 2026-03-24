/**
 * Button.jsx - Reusable button component with variants (primary, secondary, ghost, destructive), sizes, and icon-only mode.
 * Features Tailwind variants, hover/active states, focus rings, disabled styles, and clsx class merging.
 * Usage: <Button variant="primary" size="lg">Click me</Button>
 */

import React from 'react';
import { cn } from '../lib/utils.js';

const Button = React.forwardRef(({ className, variant = 'default', size = 'default', iconOnly = false, children, ...props }, ref) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-semibold transition-all shadow-sm border active:scale-95 disabled:pointer-events-none disabled:opacity-50',
        {
          'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-blue-200': variant === 'primary' || variant === 'default',
          'bg-white hover:bg-gray-50 text-slate-700 border-slate-200 shadow-sm hover:border-slate-300': variant === 'secondary',
          'bg-transparent hover:bg-gray-100 text-slate-500 border-transparent hover:border-slate-200': variant === 'ghost',
          'bg-rose-500 hover:bg-rose-600 text-white border-rose-500 shadow-rose-200': variant === 'destructive',
          'w-10 h-10 p-0': iconOnly,
          'px-4 py-2.5 text-sm': size === 'default',
          'px-3 py-2 text-xs': size === 'sm',
          'px-6 py-3 text-sm': size === 'lg',
        },
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
