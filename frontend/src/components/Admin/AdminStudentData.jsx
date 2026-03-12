import React from 'react';
import { Search, Plus, Download, MoreHorizontal, ChevronDown } from 'lucide-react';

const studentStats = [
  { label: 'Total Students', value: '6', color: 'text-slate-800' },
  { label: 'Active', value: '5', color: 'text-green-600' },
  { label: 'Avg Attendance', value: '91%', color: 'text-slate-800' },
  { label: 'Classes', value: '5', color: 'text-slate-800' },
];

const students = [
  { id: 'STU001', name: 'Alex Thompson', email: 'alex.thompson@school.edu', class: '10A', guardian: 'John Thompson', attendance: '96%', status: 'active', initials: 'AT' },
  { id: 'STU002', name: 'Emma Watson', email: 'emma.watson@school.edu', class: '10A', guardian: 'Mary Watson', attendance: '94%', status: 'active', initials: 'EW' },
  { id: 'STU003', name: 'James Miller', email: 'james.miller@school.edu', class: '9B', guardian: 'Robert Miller', attendance: '88%', status: 'active', initials: 'JM' },
  { id: 'STU004', name: 'Sophie Brown', email: 'sophie.brown@school.edu', class: '8A', guardian: 'David Brown', attendance: '92%', status: 'active', initials: 'SB' },
];

const AdminStudentData = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 🔹 Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-100 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-medium text-slate-600 shadow-sm hover:bg-gray-50 transition-all">
            All Classes <ChevronDown size={16} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-medium text-slate-600 shadow-sm hover:bg-gray-50 transition-all">
            <Download size={16} /> Export
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
            <Plus size={18} /> Add Student
          </button>
        </div>
      </div>

      {/* 🔹 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {studentStats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-sm font-medium text-gray-400 mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 🔹 Students Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Student</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Roll No.</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Class</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Guardian</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Attendance</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-100">
                      {student.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 leading-none">{student.name}</p>
                      <p className="text-xs text-gray-400 mt-1">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-600">{student.id}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-600">
                    {student.class}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 font-medium">{student.guardian}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    parseInt(student.attendance) > 90 ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {student.attendance}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-300 hover:text-slate-600 transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStudentData;