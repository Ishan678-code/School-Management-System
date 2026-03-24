// cleanup and revision of AdminClassData component. Added more details and improved styling.
import { MoreHorizontal, Users, BookOpen, Plus } from 'lucide-react';

const classData = [
  { id: 1, name: 'Class 10A', room: '101', teacher: 'Dr. Sarah Johnson', initials: 'DSJ', students: 35, subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'], color: 'border-blue-500' },
  { id: 2, name: 'Class 10B', room: '102', teacher: 'Prof. Michael Chen', initials: 'PMC', students: 32, subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'], color: 'border-blue-500' },
  { id: 3, name: 'Class 9A', room: '103', teacher: 'Ms. Emily Davis', initials: 'MED', students: 38, subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'], color: 'border-blue-500' },
  { id: 4, name: 'Class 9B', room: '104', teacher: 'Mr. Robert Wilson', initials: 'MRW', students: 36, subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'], color: 'border-teal-400' },
  { id: 5, name: 'Class 8A', room: '105', teacher: 'Dr. Lisa Anderson', initials: 'DLA', students: 40, subjects: ['Mathematics', 'Science', 'English', 'Social Studies'], color: 'border-green-500' },
  { id: 6, name: 'Class 8B', room: '106', teacher: 'Mrs. Patricia Brown', initials: 'MPB', students: 38, subjects: ['Mathematics', 'Science', 'English', 'Social Studies'], color: 'border-green-500' },
];

const MAX_VISIBLE_SUBJECTS = 3;

const AdminClassData = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-700">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Classes</h1>
          <p className="text-sm text-slate-400">Manage class sections and details.</p>
        </div>
        <button className="bg-[#2540D0] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold transition-all">
          <Plus size={18} />
          Add Class
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classData.map((cls) => (
          <div key={cls.id} className={`bg-white rounded-2xl shadow-sm border-t-8 ${cls.color} p-6 hover:shadow-md transition-shadow`}>
            <div className="flex justify-between items-start mb-1">
              <h2 className="text-xl font-bold text-slate-800">{cls.name}</h2>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
           
            <p className="text-sm text-slate-400 mb-4">Room {cls.room}</p>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs border border-blue-100">
                {cls.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700 leading-tight">{cls.teacher}</p>
                <p className="text-xs text-slate-400">Class Teacher</p>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-6 text-slate-500">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">{cls.students} students</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">{cls.subjects.length} subjects</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Subjects</p>
              <div className="flex flex-wrap gap-2">
                {cls.subjects.slice(0, MAX_VISIBLE_SUBJECTS).map((sub) => (
                  <span key={sub} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[11px] font-bold text-slate-700">
                    {sub}
                  </span>
                ))}
                {cls.subjects.length > MAX_VISIBLE_SUBJECTS && (
                  <span className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[11px] font-bold text-slate-700">
                    +{cls.subjects.length - MAX_VISIBLE_SUBJECTS}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminClassData;
