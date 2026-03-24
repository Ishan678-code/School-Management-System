/**
 * IconButton.jsx - Compact icon-only button with variants (ghost, destructive, success) and sizes.
 * Perfect for actions like delete, edit, close in tables/cards.
 * Usage: <IconButton variant="destructive" size="sm"><Trash2 className="w-4 h-4" /></IconButton>
 */

import React from 'react';
import { cn } from '../lib/utils.js';

const IconButton = React.forwardRef(({ className, variant = 'ghost', size = 'md', children, ...props }, ref) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg p-2 transition-all border hover:bg-gray-50 active:scale-95 disabled:opacity-50',
        {
          'text-slate-400 hover:text-slate-600 hover:border-slate-200': variant === 'ghost',
          'text-rose-400 hover:text-rose-600 hover:border-rose-200 bg-rose-50': variant === 'destructive',
          'text-emerald-500 hover:text-emerald-600 hover:border-emerald-200 bg-emerald-50': variant === 'success',
          'w-8 h-8': size === 'sm',
          'w-9 h-9': size === 'md',
          'w-10 h-10': size === 'lg',
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

IconButton.displayName = 'IconButton';

export { IconButton };
