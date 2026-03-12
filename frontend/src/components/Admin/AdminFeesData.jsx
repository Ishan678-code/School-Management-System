import React from 'react';
import { Search, CheckCircle, AlertCircle, IndianRupee, Eye, Download, MoreVertical } from 'lucide-react';

const AdminFeesData = () => {
  // Sample Data for the Table
  const feeData = [
    { id: 1, name: 'Arjun Mehta', roll: '101', class: '10-A', total: '45,000', paid: '45,000', due: '0', status: 'Paid' },
    { id: 2, name: 'Sana Shaikh', roll: '102', class: '10-A', total: '45,000', paid: '20,000', due: '25,000', status: 'Partial' },
    { id: 3, name: 'Rahul Verma', roll: '105', class: '10-B', total: '42,000', paid: '0', due: '42,000', status: 'Unpaid' },
    { id: 4, name: 'Priya Das', roll: '108', class: '9-C', total: '38,000', paid: '38,000', due: '0', status: 'Paid' },
  ];

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
          <h2 className="text-2xl font-bold text-slate-900">Rs. 12,45,000</h2>
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
          <h2 className="text-2xl font-bold text-slate-900">Rs. 8,12,000</h2>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4">
            <div className="bg-emerald-500 h-1.5 rounded-full w-[65%]"></div>
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
          <h2 className="text-2xl font-bold text-slate-900">Rs. 4,33,000</h2>
          <p className="text-xs text-red-500 mt-2 font-medium">Pending from 42 students</p>
        </div>
      </div>

      {/* --- Table Section --- */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Table Search Header */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="font-bold text-slate-800">Fee Transactions</h3>
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, roll no or class..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Name</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Roll No.</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Class</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Total Fee</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Paid</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Due</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {feeData.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-sm font-semibold text-slate-700">{student.name}</td>
                  <td className="p-4 text-sm text-slate-600">{student.roll}</td>
                  <td className="p-4 text-sm text-slate-600">{student.class}</td>
                  <td className="p-4 text-sm text-slate-600">₹{student.total}</td>
                  <td className="p-4 text-sm text-emerald-600 font-medium">₹{student.paid}</td>
                  <td className="p-4 text-sm text-red-500 font-medium">₹{student.due}</td>
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
                      <button title="View" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button title="Download" className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/30 text-center">
          <button className="text-sm font-semibold text-blue-600 hover:underline">View All Records</button>
        </div>
      </div>
    </div>
  );
};

export default AdminFeesData;