// AdminFeesData.jsx - Admin page for managing student fee transactions with summary cards and searchable table.
import React, { useMemo, useState } from 'react';
import { Search, CheckCircle, AlertCircle, IndianRupee, Eye, Download } from 'lucide-react';

const feeData = [
  { id: 1, name: 'Arjun Mehta', roll: '101', class: '10-A', total: 45000, paid: 45000 },
  { id: 2, name: 'Sana Shaikh', roll: '102', class: '10-A', total: 45000, paid: 20000 },
  { id: 3, name: 'Rahul Verma', roll: '105', class: '10-B', total: 42000, paid: 0 },
  { id: 4, name: 'Priya Das', roll: '108', class: '9-C', total: 38000, paid: 38000 },
];

const AdminFeesData = () => {
  const [query, setQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');

  const inrFormatter = useMemo(
    () =>
      new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: 0,
      }),
    []
  );
  const formatINR = (value) =>
    Number.isFinite(value) ? inrFormatter.format(value) : '0';

  const enrichedData = useMemo(
    () =>
      feeData.map((student) => {
        const due = Math.max(student.total - student.paid, 0);
        const status = due === 0 ? 'Paid' : student.paid === 0 ? 'Unpaid' : 'Partial';
        return { ...student, due, status };
      }),
    []
  );

  const filteredData = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base =
      selectedClass === 'All'
        ? enrichedData
        : enrichedData.filter((student) => student.class === selectedClass);
    if (!q) return base;
    return base.filter((student) =>
      `${student.name} ${student.roll} ${student.class}`.toLowerCase().includes(q)
    );
  }, [enrichedData, query, selectedClass]);

  const classOptions = useMemo(() => {
    const classes = new Set(enrichedData.map((student) => student.class));
    return ['All', ...Array.from(classes).sort()];
  }, [enrichedData]);

  const summary = useMemo(() => {
    let total = 0;
    let collected = 0;
    let due = 0;
    let pendingCount = 0;

    for (const student of enrichedData) {
      total += student.total;
      collected += student.paid;
      due += student.due;
      if (student.due > 0) pendingCount += 1;
    }

    const collectedPct = total > 0 ? Math.round((collected / total) * 100) : 0;
    return { total, collected, due, pendingCount, collectedPct };
  }, [enrichedData]);

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans text-slate-900">
      
      {/* --- Top Summary Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Total Fees Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Fees</span>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">₹ {formatINR(summary.total)}</h2>
          <p className="text-xs text-slate-400 mt-2">Expected total for Academic Year 2026</p>
        </div>

        {/* Collected Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Collected</span>
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">₹ {formatINR(summary.collected)}</h2>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all"
              style={{ width: `${summary.collectedPct}%` }}
            ></div>
          </div>
        </div>

        {/* Due Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Due</span>
            <div className="p-2 bg-red-50 rounded-lg text-red-600">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">₹ {formatINR(summary.due)}</h2>
          <p className="text-xs text-red-500 mt-2 font-medium">Pending from {summary.pendingCount} students</p>
        </div>
      </div>

      {/* --- Table Section --- */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Table Search Header */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="font-bold text-slate-800">Fee Transactions</h3>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:flex-1 md:flex-none">
            <label className="w-full sm:w-auto">
              <span className="sr-only">Filter by class</span>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full sm:w-44 px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
              >
                {classOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === 'All' ? 'All Classes' : option}
                  </option>
                ))}
              </select>
            </label>
            <div className="relative w-full sm:w-64 md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by name, roll no or class..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/70">
              <tr>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Name</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Roll No.</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Class</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Total Fee</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Paid</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Due</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-sm font-semibold text-slate-700">{student.name}</td>
                  <td className="p-4 text-sm text-slate-600">{student.roll}</td>
                  <td className="p-4 text-sm text-slate-600">{student.class}</td>
                  <td className="p-4 text-sm text-slate-700 text-right tabular-nums">₹{formatINR(student.total)}</td>
                  <td className="p-4 text-sm text-emerald-600 font-medium text-right tabular-nums">₹{formatINR(student.paid)}</td>
                  <td className="p-4 text-sm text-red-500 font-medium text-right tabular-nums">₹{formatINR(student.due)}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${
                      student.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 
                      student.status === 'Partial' ? 'bg-orange-100 text-orange-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button title="View" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all border border-transparent hover:border-blue-100">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button title="Download" className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all border border-transparent hover:border-emerald-100">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-sm text-slate-500">
                    No fee records found for the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-500">
            Showing <span className="font-semibold text-slate-700">{filteredData.length}</span> of{' '}
            <span className="font-semibold text-slate-700">{enrichedData.length}</span> records
          </p>
          <button className="text-sm font-semibold text-blue-600 hover:underline">View All Records</button>
        </div>
      </div>
    </div>
  );
};

export default AdminFeesData;
