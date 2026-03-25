import React from 'react';
import { MoreHorizontal, Users, BookOpen, Plus } from 'lucide-react';
// Importing your reusable components
import { Button, Card, Avatar } from '../ui';

const CLASS_DATA = [
  { id: 1, name: 'Class 10A', room: '101', teacher: 'Dr. Sarah Johnson', initials: 'DSJ', students: 35, subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'], color: 'border-t-blue-500' },
  { id: 2, name: 'Class 10B', room: '102', teacher: 'Prof. Michael Chen', initials: 'PMC', students: 32, subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'], color: 'border-t-blue-500' },
  { id: 3, name: 'Class 9A', room: '103', teacher: 'Ms. Emily Davis', initials: 'MED', students: 38, subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'], color: 'border-t-blue-500' },
  { id: 4, name: 'Class 9B', room: '104', teacher: 'Mr. Robert Wilson', initials: 'MRW', students: 36, subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'], color: 'border-t-teal-400' },
  { id: 5, name: 'Class 8A', room: '105', teacher: 'Dr. Lisa Anderson', initials: 'DLA', students: 40, subjects: ['Mathematics', 'Science', 'English', 'Social Studies'], color: 'border-t-green-500' },
  { id: 6, name: 'Class 8B', room: '106', teacher: 'Mrs. Patricia Brown', initials: 'MPB', students: 38, subjects: ['Mathematics', 'Science', 'English', 'Social Studies'], color: 'border-t-green-500' },
];

const MAX_VISIBLE_SUBJECTS = 3;

const AdminClassData = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section using Reusable Button */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Classes</h1>
          <p className="text-sm text-slate-400">Manage class sections and details.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200">
          <Plus size={18} className="mr-2" />
          Add Class
        </Button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CLASS_DATA.map((cls) => (
          <Card 
            key={cls.id} 
            className={`p-6 border-t-4 ${cls.color} hover:shadow-md transition-all group`}
          >
            {/* Card Header */}
            <div className="flex justify-between items-start mb-1">
              <div>
                <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {cls.name}
                </h2>
                <p className="text-xs font-medium text-slate-400">Room {cls.room}</p>
              </div>
              <button className="p-1.5 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>

            {/* Teacher Section using Reusable Avatar Logic */}
            <div className="flex items-center gap-3 my-6">
              <Avatar 
                initials={cls.initials} 
                variant="blue" 
                className="w-10 h-10 text-xs" 
              />
              <div>
                <p className="text-sm font-bold text-slate-700 leading-tight">{cls.teacher}</p>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Class Teacher</p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-slate-500">
                <div className="p-1.5 bg-slate-50 rounded-md">
                   <Users size={14} className="text-slate-400" />
                </div>
                <span className="text-xs font-semibold">{cls.students} Students</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <div className="p-1.5 bg-slate-50 rounded-md">
                   <BookOpen size={14} className="text-slate-400" />
                </div>
                <span className="text-xs font-semibold">{cls.subjects.length} Subjects</span>
              </div>
            </div>

            {/* Subjects Tags */}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                Curriculum
              </p>
              <div className="flex flex-wrap gap-2">
                {cls.subjects.slice(0, MAX_VISIBLE_SUBJECTS).map((sub) => (
                  <span 
                    key={sub} 
                    className="px-2.5 py-1 bg-white border border-slate-100 rounded-lg text-[10px] font-bold text-slate-600 shadow-sm"
                  >
                    {sub}
                  </span>
                ))}
                {cls.subjects.length > MAX_VISIBLE_SUBJECTS && (
                  <span className="px-2.5 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-bold">
                    +{cls.subjects.length - MAX_VISIBLE_SUBJECTS} More
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminClassData;