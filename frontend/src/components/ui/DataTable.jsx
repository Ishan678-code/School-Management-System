/**
 * DataTable.jsx - Responsive table with hover rows, sticky header bg, column rendering.
 * Props: columns[] (header, key/render fn), data[], className.
 * Usage: <DataTable columns={[{header: 'Name', key: 'name'}]} data={students} />
 * Note: Ready for TanStack React Table upgrade.
 */

import React from 'react';
import { cn } from '../../lib/utils';

const DataTable = ({ columns, data, className }) => {
  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full text-left border-collapse">
        <thead>
          {Array.isArray(columns) && columns.map((column, idx) => (
            <tr key={idx} className="bg-slate-50/50">
              <th className={cn('px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider', column.className || '')}>
                {column.header}
              </th>
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-slate-50">
          {Array.isArray(data) && data.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-slate-50/50 transition-colors group">
              {columns.map((column, colIdx) => (
                <td key={colIdx} className={cn('px-6 py-4', column.className || '')}>
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { DataTable };
