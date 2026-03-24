// TODO: Needs improvement
import React from 'react';
import { Search, MoreHorizontal, Plus, Mail, Phone, BookOpen } from 'lucide-react';

const teachers = [
  { id: 1, name: 'Dr. Sarah Johnson', initials: 'DSJ', status: 'Active', subject: 'Mathematics', email: 'sarah.johnson@school.edu', phone: '+1 234 567 8901', classes: ['10A', '10B', '9A'] },
  { id: 2, name: 'Prof. Michael Chen', initials: 'PMC', status: 'Active', subject: 'Physics', email: 'michael.chen@school.edu', phone: '+1 234 567 8902', classes: ['10A', '9B', '8A'] },
  { id: 3, name: 'Ms. Emily Davis', initials: 'MED', status: 'Active', subject: 'English', email: 'emily.davis@school.edu', phone: '+1 234 567 8903', classes: ['8A', '8B', '7A'] },
  { id: 4, name: 'Mr. Robert Wilson', initials: 'MRW', status: 'On Leave', subject: 'Chemistry', email: 'robert.wilson@school.edu', phone: '+1 234 567 8904', classes: [] },
  { id: 5, name: 'Dr. Lisa Anderson', initials: 'DLA', status: 'Active', subject: 'Biology', email: 'lisa.anderson@school.edu', phone: '+1 234 567 8905', classes: [] },
];

const AdminTeacherData = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Bar inside the content area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search teachers..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-100 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
          />
        </div>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 active:translate-y-0">
          <Plus size={18} strokeWidth={3} />
          Add Teacher
        </button>
      </div>

      {/* Teacher Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {teacher.initials}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg leading-tight">{teacher.name}</h3>
                  <div className="mt-1">
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                      teacher.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {teacher.status}
                    </span>
                  </div>
                </div>
              </div>
              <button className="text-gray-300 hover:text-slate-600 transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                <BookOpen size={16} className="text-slate-400" />
                <span>{teacher.subject}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                <Mail size={16} className="text-slate-400" />
                <span>{teacher.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                <Phone size={16} className="text-slate-400" />
                <span>{teacher.phone}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-50">
              <p className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest">Assigned Classes</p>
              <div className="flex flex-wrap gap-2">
                {teacher.classes.length > 0 ? (
                  teacher.classes.map((cls) => (
                    <span key={cls} className="bg-slate-50 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold border border-slate-100 hover:bg-white hover:border-blue-200 transition-colors">
                      {cls}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-500 italic font-medium">No classes assigned</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTeacherData;

