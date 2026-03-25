import React, { useState, useMemo } from 'react';
import { Search, MoreHorizontal, Plus, Mail, Phone, BookOpen } from 'lucide-react';
// Importing your unified UI library components
import { TextInput, Button, Card, IconButton, StatusBadge, Avatar } from '../ui';

const TEACHERS_DATA = [
  { id: 1, name: 'Dr. Sarah Johnson', initials: 'DSJ', status: 'Active', subject: 'Mathematics', email: 'sarah.johnson@school.edu', phone: '+1 234 567 8901', classes: ['10A', '10B', '9A'], variant: 'success' },
  { id: 2, name: 'Prof. Michael Chen', initials: 'PMC', status: 'Active', subject: 'Physics', email: 'michael.chen@school.edu', phone: '+1 234 567 8902', classes: ['10A', '9B', '8A'], variant: 'success' },
  { id: 3, name: 'Ms. Emily Davis', initials: 'MED', status: 'Active', subject: 'English', email: 'emily.davis@school.edu', phone: '+1 234 567 8903', classes: ['8A', '8B', '7A'], variant: 'success' },
  { id: 4, name: 'Mr. Robert Wilson', initials: 'MRW', status: 'On Leave', subject: 'Chemistry', email: 'robert.wilson@school.edu', phone: '+1 234 567 8904', classes: [], variant: 'warning' },
  { id: 5, name: 'Dr. Lisa Anderson', initials: 'DLA', status: 'Active', subject: 'Biology', email: 'lisa.anderson@school.edu', phone: '+1 234 567 8905', classes: [], variant: 'success' },
];

const AdminTeacherData = () => {
  const [query, setQuery] = useState("");

  const filteredTeachers = useMemo(() => {
    const term = query.toLowerCase().trim();
    return TEACHERS_DATA.filter(t => 
      t.name.toLowerCase().includes(term) || 
      t.subject.toLowerCase().includes(term) ||
      t.email.toLowerCase().includes(term)
    );
  }, [query]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Search and Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <TextInput 
            placeholder="Search by name, subject, or email..." 
            className="pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        
        <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
          <Plus size={18} className="mr-2" />
          Add Teacher
        </Button>
      </div>

      {/* Teacher Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id} className="p-6 border-t-4 border-t-transparent hover:border-t-blue-500 hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                {/* Reusable Avatar with Group Hover effect */}
                <Avatar 
                  initials={teacher.initials} 
                  variant="blue" 
                  className="w-14 h-14 text-sm group-hover:scale-105 transition-transform" 
                />
                <div>
                  <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                    {teacher.name}
                  </h3>
                  <div className="mt-1.5">
                    <StatusBadge status={teacher.status} variant={teacher.variant} />
                  </div>
                </div>
              </div>
              <IconButton variant="ghost" className="text-slate-300 hover:text-slate-600">
                <MoreHorizontal size={20} />
              </IconButton>
            </div>

            {/* Contact Details with Stat-Row Styling */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-slate-600 font-semibold">
                <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                  <BookOpen size={14} className="text-slate-400 group-hover:text-blue-500" />
                </div>
                <span>{teacher.subject} Specialist</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 font-semibold">
                <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                  <Mail size={14} className="text-slate-400 group-hover:text-blue-500" />
                </div>
                <span className="truncate">{teacher.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 font-semibold">
                <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                  <Phone size={14} className="text-slate-400 group-hover:text-blue-500" />
                </div>
                <span>{teacher.phone}</span>
              </div>
            </div>

            {/* Footer: Assigned Classes as Elevated Tags */}
            <div className="pt-5 border-t border-slate-50">
              <p className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest">
                Academic Load
              </p>
              <div className="flex flex-wrap gap-2">
                {teacher.classes.length > 0 ? (
                  teacher.classes.map((cls) => (
                    <span 
                      key={cls} 
                      className="bg-white text-slate-700 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-slate-100 shadow-sm hover:border-blue-200 transition-all cursor-default"
                    >
                      Class {cls}
                    </span>
                  ))
                ) : (
                  <span className="text-[11px] text-slate-400 font-bold italic">Unassigned</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTeachers.length === 0 && (
        <div className="mt-20 flex flex-col items-center justify-center text-slate-400 bg-white rounded-3xl p-12 border border-dashed border-slate-200">
          <div className="p-4 bg-slate-50 rounded-full mb-4">
            <Search size={32} />
          </div>
          <p className="text-sm font-bold">No teachers found matching "{query}"</p>
        </div>
      )}
    </div>
  );
};

export default AdminTeacherData;