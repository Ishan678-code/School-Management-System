import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { 
  ChevronDown, ChevronLeft, ChevronRight, 
  Download, Save, CheckCircle2, XCircle, Clock 
} from 'lucide-react';

const STATUS = {
  PRESENT: 'Present',
  ABSENT: 'Absent',
  LEAVE: 'On Leave',
};

const STUDENTS = [
  { id: 1, name: 'Alex Thompson', roll: 'STU001', status: STATUS.PRESENT, initials: 'AT', color: 'bg-blue-100 text-blue-600' },
  { id: 2, name: 'Emma Watson', roll: 'STU002', status: STATUS.PRESENT, initials: 'EW', color: 'bg-purple-100 text-purple-600' },
  { id: 3, name: 'John Doe', roll: 'STU003', status: STATUS.ABSENT, initials: 'JD', color: 'bg-emerald-100 text-emerald-600' },
];

const CLASSES = ['Class 10A', 'Class 10B', 'Class 9A', 'Class 9B', 'Class 8A'];

const toLocalInputDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const parseLocalInputDate = (value) => {
  if (!value) return new Date();
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const AdminAttendanceData = () => {
  const [selectedClass, setSelectedClass] = useState('Class 10A');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [students, setStudents] = useState(STUDENTS);

  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const formattedDate = useMemo(
    () =>
      selectedDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    [selectedDate]
  );

  const stats = useMemo(() => {
    const total = students.length;
    const present = students.filter((s) => s.status === STATUS.PRESENT).length;
    const absent = students.filter((s) => s.status === STATUS.ABSENT).length;
    const leave = students.filter((s) => s.status === STATUS.LEAVE).length;
    const rate = total === 0 ? 0 : Math.round((present / total) * 100);
    return { total, present, absent, leave, rate };
  }, [students]);

  const updateStatus = useCallback((id, status) => {
    setStudents((prev) =>
      prev.map((student) => (student.id === id ? { ...student, status } : student))
    );
  }, []);

  const handleClassToggle = useCallback(
    () => setIsDropdownOpen((open) => !open),
    []
  );

  const handleClassSelect = useCallback((cls) => {
    setSelectedClass(cls);
    setIsDropdownOpen(false);
  }, []);

  const handlePrevDate = useCallback(() => {
    setSelectedDate((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() - 1);
      return next;
    });
  }, []);

  const handleNextDate = useCallback(() => {
    setSelectedDate((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() + 1);
      return next;
    });
  }, []);

  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleClick = (event) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isDropdownOpen]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-50 via-white to-amber-50/60 rounded-[28px] ring-1 ring-slate-200/70">
      
      {/* Action Header: Stacks on Mobile, Row on Desktop */}
      <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto'>
          
          {/* Class Dropdown */}
          <div className='relative w-full sm:w-auto' ref={dropdownRef}>
            <button 
              onClick={handleClassToggle}
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
              className='flex items-center justify-between gap-4 bg-white/90 px-4 py-2.5 border border-slate-200/80 rounded-2xl w-full sm:min-w-[170px] shadow-sm hover:border-slate-400 transition-all'
            >
              <span className='text-sm font-semibold text-slate-700 tracking-tight'>{selectedClass}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white border border-slate-200/80 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2" role="listbox">
                {CLASSES.map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => handleClassSelect(cls)}
                    role="option"
                    aria-selected={cls === selectedClass}
                    className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-slate-50 ${cls === selectedClass ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600'}`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date Picker Group */}
          <div className='flex items-center bg-white/90 border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden w-full sm:w-auto'>
            <button 
              className='p-2.5 hover:bg-slate-50 border-r border-slate-100 text-slate-500'
              onClick={handlePrevDate}
              aria-label="Previous day"
            >
              <ChevronLeft className='w-4 h-4' />
            </button>

            <input
              type="date"
              value={toLocalInputDate(selectedDate)}
              onChange={(e) => setSelectedDate(parseLocalInputDate(e.target.value))}
              className="px-3 py-2 text-sm font-semibold outline-none bg-transparent flex-grow text-center text-slate-700 tracking-tight"
            />

            <button 
              className='p-2.5 hover:bg-slate-50 border-l border-slate-100 text-slate-500'
              onClick={handleNextDate}
              aria-label="Next day"
            >
              <ChevronRight className='w-4 h-4' />
            </button>
          </div>
        </div>

        {/* Buttons: Side-by-side on Mobile */}
        <div className="flex gap-3 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white/90 border border-slate-200/80 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
            <Download className="w-4 h-4" /> <span className="hidden sm:inline">Export</span>
          </button>
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-2xl text-sm font-semibold hover:bg-slate-800 transition-all active:scale-95 shadow-[0_16px_30px_-20px_rgba(15,23,42,0.7)]">
            <Save className="w-4 h-4" /> Save <span className="hidden sm:inline">Attendance</span>
          </button>
        </div>
      </div>

      {/* Stats Grid: 1 Col (Mobile), 2 Cols (Tablet), 4 Cols (Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/90 p-5 rounded-3xl border border-slate-200/70 shadow-sm">
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.22em] mb-1">Total Students</p>
          <h3 className="text-3xl font-black text-slate-800 tracking-tight">{stats.total}</h3>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 via-white to-white p-5 rounded-3xl border border-emerald-100/80 flex justify-between items-center">
          <div>
            <p className="text-emerald-700/60 text-[11px] font-bold uppercase tracking-[0.22em] mb-1">Present</p>
            <h3 className="text-3xl font-black text-emerald-600 tracking-tight">{stats.present}</h3>
          </div>
          <div className="bg-emerald-500 text-white p-2.5 rounded-2xl shadow-lg shadow-emerald-200"><CheckCircle2 className="w-6 h-6" /></div>
        </div>
        <div className="bg-gradient-to-br from-rose-50 via-white to-white p-5 rounded-3xl border border-rose-100/80 flex justify-between items-center">
          <div>
            <p className="text-rose-700/60 text-[11px] font-bold uppercase tracking-[0.22em] mb-1">Absent</p>
            <h3 className="text-3xl font-black text-rose-600 tracking-tight">{stats.absent}</h3>
          </div>
          <div className="bg-rose-500 text-white p-2.5 rounded-2xl shadow-lg shadow-rose-200"><XCircle className="w-6 h-6" /></div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 via-white to-white p-5 rounded-3xl border border-orange-100/80 flex justify-between items-center">
          <div>
            <p className="text-orange-700/60 text-[11px] font-bold uppercase tracking-[0.22em] mb-1">On Leave</p>
            <h3 className="text-3xl font-black text-orange-600 tracking-tight">{stats.leave}</h3>
          </div>
          <div className="bg-orange-500 text-white p-2.5 rounded-2xl shadow-lg shadow-orange-200"><Clock className="w-6 h-6" /></div>
        </div>
      </div>

      {/* Progress Bar Section */}
      <div className="bg-gradient-to-br from-white via-white to-slate-50 p-6 rounded-3xl border border-slate-200/70 shadow-sm mb-8">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h4 className="font-bold text-slate-800 tracking-tight">Attendance Rate</h4>
            <p className="text-xs text-slate-400">Class performance for today</p>
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tight">{stats.rate}%</span>
        </div>
        <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${stats.rate}%` }}
            role="progressbar"
            aria-valuenow={stats.rate}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
        </div>
      </div>

      {/* Table Card with Horizontal Scroll for Mobile */}
      <div className="bg-white/90 rounded-[28px] border border-slate-200/70 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100/60 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="font-black text-lg text-slate-800 tracking-tight">{selectedClass}</h3>
          <span className="text-xs font-semibold text-slate-500 bg-white/80 px-3 py-1 rounded-full border border-slate-200/70">{formattedDate}</span>
        </div>

        <div className="overflow-x-auto overflow-y-hidden">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase font-black tracking-[0.28em] border-b border-slate-100/70">
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Roll No.</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/70">
              {students.map((student, idx) => (
                <tr key={student.id} className="hover:bg-amber-50/40 transition-colors">
                  <td className="px-6 py-4 text-xs font-bold text-slate-300">{idx + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-black shadow-sm ${student.color}`}>
                        {student.initials}
                      </div>
                      <span className="text-sm font-semibold text-slate-700">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-500 tracking-tight">{student.roll}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide flex items-center gap-1.5 w-fit ${
                      student.status === STATUS.PRESENT ? 'bg-emerald-100 text-emerald-600' :
                      student.status === STATUS.ABSENT ? 'bg-rose-100 text-rose-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {student.status === STATUS.PRESENT && <CheckCircle2 className="w-3 h-3" />}
                      {student.status === STATUS.ABSENT && <XCircle className="w-3 h-3" />}
                      {student.status === STATUS.LEAVE && <Clock className="w-3 h-3" />}
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => updateStatus(student.id, STATUS.PRESENT)}
                        aria-label={`Mark ${student.name} present`}
                        className={`p-2 rounded-2xl transition-all shadow-lg active:scale-90 ${
                          student.status === STATUS.PRESENT
                            ? 'bg-emerald-600 text-white shadow-emerald-200'
                            : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-100'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => updateStatus(student.id, STATUS.ABSENT)}
                        aria-label={`Mark ${student.name} absent`}
                        className={`p-2 rounded-2xl transition-all active:scale-90 ${
                          student.status === STATUS.ABSENT
                            ? 'bg-rose-500 text-white border border-rose-500 shadow-lg shadow-rose-100'
                            : 'bg-white border border-slate-200 text-slate-400 hover:border-rose-300 hover:text-rose-500'
                        }`}
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => updateStatus(student.id, STATUS.LEAVE)}
                        aria-label={`Mark ${student.name} on leave`}
                        className={`p-2 rounded-2xl transition-all active:scale-90 ${
                          student.status === STATUS.LEAVE
                            ? 'bg-orange-500 text-white border border-orange-500 shadow-lg shadow-orange-100'
                            : 'bg-white border border-slate-200 text-slate-400 hover:border-orange-300 hover:text-orange-500'
                        }`}
                      >
                        <Clock className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Mobile Swipe Hint */}
        <div className="sm:hidden p-4 bg-slate-50 text-center border-t border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em]">Swipe left to see more info →</p>
        </div>
      </div>
    </div> 
  );
}

export default AdminAttendanceData;
