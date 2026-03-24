/**
 * Card.jsx - Content container with rounded corners, border, subtle shadow.
 * Accepts all div props, perfect for stats, forms, data sections.
 * Usage: <Card>
 *   <h3 className="font-bold">Title</h3>
 *   <p>Description...</p>
 * </Card>
 */

import React from 'react';
import { cn } from '../../lib/utils';

const Card = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    className={cn('bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden', className)}
    ref={ref}
    {...props}
  >
    {children}
  </div>
));

Card.displayName = 'Card';

export { Card };
