import React, { useMemo, useRef, useState } from 'react';
import { ChevronDown, Check, Plus, Trash2, X, Printer, Calendar } from 'lucide-react';
import { Button, Select, TextInput, IconButton } from '../ui'; 

const AdminTimetableData = () => {
  const [selectedClass, setSelectedClass] = useState('Class 10A');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const idRef = useRef(1000);

  const classes = ['Class 10A', 'Class 10B', 'Class 9A', 'Class 9B', 'Class 8A'];
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const [timetable, setTimetable] = useState([
    { day: "Monday", isToday: todayName === "Monday", sessions: [
      { id: 1, subject: "English", teacher: "Ms. Emily Davis", time: "8:00 - 8:45", room: "Room 103", color: "border-blue-500", isBreak: false }
    ]},
    { day: "Tuesday", isToday: todayName === "Tuesday", sessions: [] },
    { day: "Wednesday", isToday: todayName === "Wednesday", sessions: [] },
    { day: "Thursday", isToday: todayName === "Thursday", sessions: [] },
    { day: "Friday", isToday: todayName === "Friday", sessions: [] },
  ]);

  const [form, setForm] = useState({
    day: "Monday",
    subject: "",
    teacher: "",
    time: "",
    room: "",
    isBreak: false,
  });

  const dayOptions = useMemo(() => timetable.map((d) => d.day), [timetable]);

  const handleAddSession = (e) => {
    e.preventDefault();
    if (!form.subject.trim() || !form.time.trim()) return;

    const newSession = {
      id: idRef.current++,
      subject: form.subject.trim(),
      teacher: form.isBreak ? "N/A" : form.teacher.trim(),
      time: form.time.trim(),
      room: form.isBreak ? "Cafeteria" : form.room.trim(),
      isBreak: form.isBreak,
      color: form.isBreak ? "border-slate-400" : "border-blue-500",
      bgColor: form.isBreak ? "bg-slate-50" : "bg-white",
    };

    setTimetable(prev => prev.map(day => 
      day.day === form.day ? { ...day, sessions: [...day.sessions, newSession].sort((a, b) => a.time.localeCompare(b.time)) } : day
    ));

    setShowEditor(false);
    setForm({ day: "Monday", subject: "", teacher: "", time: "", room: "", isBreak: false });
  };

  const handleDeleteSession = (dayName, sessionId) => {
    setTimetable(prev => prev.map(day => 
      day.day === dayName ? { ...day, sessions: day.sessions.filter(s => s.id !== sessionId) } : day
    ));
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-6 relative">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Button variant="secondary" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="min-w-[140px] justify-between">
              {selectedClass}
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </Button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-xl z-[60] overflow-hidden">
                {classes.map((cls) => (
                  <button 
                    key={cls} 
                    onClick={() => { setSelectedClass(cls); setIsDropdownOpen(false); }}
                    className="w-full flex items-center px-4 py-2 text-sm hover:bg-slate-50 text-slate-700 transition-colors"
                  >
                    {cls}
                    {cls === selectedClass && <Check className="w-3.5 h-3.5 ml-auto text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Active Schedule
          </span>
        </div>
        
        <Button variant="secondary" size="sm" onClick={() => window.print()}>
          <Printer className="w-4 h-4 mr-2" />
          Print PDF
        </Button>
      </div>

      {/* Sticky Action Bar */}
     <div className="sticky top-0 z-[50] bg-white border-b border-slate-200 shadow-sm py-4 mb-6">
  <div className="max-w-4xl mx-auto px-6 flex gap-3">
    <Button 
      variant="primary" 
      size="xl" 
      className="flex-1 font-bold shadow-lg shadow-blue-500/20" 
      onClick={() => setShowEditor(true)}
    >
      <Plus className="w-6 h-6 mr-2" />
      <span className="text-lg">Edit Timeline</span>
    </Button>
    <Button 
      variant="secondary" 
      onClick={() => window.print()}
      className="flex items-center"
    >
      <Printer className="w-5 h-5 mr-2" />
      Print
    </Button>
  </div>
</div>

      {/* Timetable Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {timetable.map((column) => (
          <div key={column.day} className={`bg-white rounded-2xl border ${column.isToday ? 'border-blue-200 ring-2 ring-blue-500/10' : 'border-slate-200'} shadow-sm overflow-hidden flex flex-col`}>
            <div className={`p-4 border-b flex justify-between items-center ${column.isToday ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-800'}`}>
              <h3 className="font-bold">{column.day}</h3>
              {column.isToday && <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-tighter">Current</span>}
            </div>
            
            <div className="p-3 space-y-3 flex-1">
              {column.sessions.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center opacity-40">
                  <Calendar className="w-8 h-8 mb-2" />
                  <p className="text-xs font-medium">No Sessions</p>
                </div>
              ) : (
                column.sessions.map((session) => (
                  <div key={session.id} className={`p-3 rounded-xl border-l-4 border transition-all ${session.color} ${session.bgColor} group relative`}>
                    <div className="flex justify-between items-start">
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-slate-800 text-sm truncate">{session.subject}</h4>
                        <p className="text-[11px] text-slate-500 font-medium">{session.time}</p>
                        {!session.isBreak && (
                          <p className="text-[10px] text-slate-400 mt-1 truncate">
                            {session.teacher} • {session.room}
                          </p>
                        )}
                      </div>
                      <button 
                        onClick={() => handleDeleteSession(column.day, session.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 text-red-500 rounded transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {showEditor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-slate-800">Add Session</h3>
              <IconButton onClick={() => setShowEditor(false)}>
                <X className="w-5 h-5" />
              </IconButton>
            </div>

            <form onSubmit={handleAddSession} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Day</label>
                  <Select value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })}>
                    {dayOptions.map(d => <option key={d} value={d}>{d}</option>)}
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Time Slot</label>
                  <TextInput
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    placeholder="e.g. 09:00 - 10:00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Subject / Activity Name</label>
                <TextInput
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Mathematics"
                />
              </div>

              <div className="flex items-center gap-2 py-2">
                <input 
                  type="checkbox" 
                  id="isBreak" 
                  checked={form.isBreak}
                  onChange={(e) => setForm({...form, isBreak: e.target.checked})}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isBreak" className="text-sm font-medium text-slate-700">This is a break/recess period</label>
              </div>

              {!form.isBreak && (
                <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Teacher</label>
                    <TextInput
                      value={form.teacher}
                      onChange={(e) => setForm({ ...form, teacher: e.target.value })}
                      placeholder="Ms. Davis"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Room</label>
                    <TextInput
                      value={form.room}
                      onChange={(e) => setForm({ ...form, room: e.target.value })}
                      placeholder="Lab 2"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="secondary" type="button" onClick={() => setShowEditor(false)}>Cancel</Button>
                <Button variant="primary" type="submit">Save Session</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTimetableData;