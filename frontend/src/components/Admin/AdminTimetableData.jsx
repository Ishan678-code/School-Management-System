// reviesed
import React, { useMemo, useRef, useState } from 'react';
import { ChevronDown, Check, Plus, Trash2 } from 'lucide-react';

const AdminTimetableData = () => {
  const [selectedClass, setSelectedClass] = useState('Class 10A');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const idRef = useRef(1000);

  const classes = ['Class 10A', 'Class 10B', 'Class 9A', 'Class 9B', 'Class 8A'];
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const [timetable, setTimetable] = useState([
    {
      day: "Monday",
      isToday: todayName === "Monday",
      sessions: [
        { id: 1, subject: "English", teacher: "Ms. Emily Davis", time: "8:00 - 8:45", room: "Room 103", color: "border-blue-500" },
        { id: 2, subject: "Mathematics", teacher: "Dr. Sarah Johnson", time: "8:50 - 9:35", room: "Room 101", color: "border-blue-500" },
        { id: 3, subject: "Biology", teacher: "Dr. Lisa Anderson", time: "9:40 - 10:25", room: "Room 105", color: "border-blue-500" },
        { id: 4, subject: "Break", time: "10:25 - 10:45", isBreak: true, color:"border-blue-500" },
        { id: 5, subject: "Chemistry Lab", teacher: "Mr. Robert Wilson", time: "10:50 - 11:35", room: "Lab 1", color: "border-emerald-500", bgColor: "bg-emerald-50" },
        { id: 6, subject: "Chemistry Lab", teacher: "Mr. Robert Wilson", time: "11:40 - 12:25", room: "Lab 1", color: "border-emerald-500", bgColor: "bg-emerald-50" },
        { id: 7, subject: "Lunch", time: "12:25 - 1:10", isBreak: true },
        { id: 8, subject: "History", teacher: "Mrs. Patricia Brown", time: "1:15 - 2:00", room: "Room 104", color: "border-blue-500" },
      ]
    },
    {
      day: "Tuesday",
      isToday: todayName === "Tuesday",
      sessions: [
        { id: 9, subject: "English", teacher: "Ms. Emily Davis", time: "8:00 - 8:45", room: "Room 103", color: "border-blue-500" },
        { id: 10, subject: "Mathematics", teacher: "Dr. Sarah Johnson", time: "8:50 - 9:35", room: "Room 101", color: "border-blue-500" },
        { id: 11, subject: "Biology", teacher: "Dr. Lisa Anderson", time: "9:40 - 10:25", room: "Room 105", color: "border-blue-500" },
        { id: 12, subject: "Break", time: "10:25 - 10:45", isBreak: true },
        { id: 13, subject: "Physics", teacher: "Prof. Michael Chen", time: "10:50 - 11:35", room: "Room 102", color: "border-blue-500" },
        { id: 14, subject: "Geography", teacher: "Mr. James Wilson", time: "11:40 - 12:25", room: "Room 106", color: "border-blue-500" },
        { id: 15, subject: "Lunch", time: "12:25 - 1:10", isBreak: true },
        { id: 16, subject: "Physical Education", teacher: "Coach Miller", time: "1:15 - 2:00", room: "Sports Ground", color: "border-blue-500" },
      ]
    },
    {
      day: "Wednesday",
      isToday: todayName === "Wednesday",
      sessions: [
        { id: 17, subject: "Chemistry", teacher: "Mr. Robert Wilson", time: "8:00 - 8:45", room: "Room 102", color: "border-blue-500" },
        { id: 18, subject: "Mathematics", teacher: "Dr. Sarah Johnson", time: "8:50 - 9:35", room: "Room 101", color: "border-blue-500" },
        { id: 19, subject: "English", teacher: "Ms. Emily Davis", time: "9:40 - 10:25", room: "Room 103", color: "border-blue-500" },
        { id: 20, subject: "Break", time: "10:25 - 10:45", isBreak: true },
        { id: 21, subject: "Biology Lab", teacher: "Dr. Lisa Anderson", time: "10:50 - 11:35", room: "Lab 2", color: "border-emerald-500", bgColor: "bg-emerald-50" },
        { id: 22, subject: "Biology Lab", teacher: "Dr. Lisa Anderson", time: "11:40 - 12:25", room: "Lab 2", color: "border-emerald-500", bgColor: "bg-emerald-50" },
        { id: 23, subject: "Lunch", time: "12:25 - 1:10", isBreak: true },
        { id: 24, subject: "Art", teacher: "Ms. Anna White", time: "1:15 - 2:00", room: "Art Room", color: "border-blue-500" },
      ]
    }
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
    if (!form.day || !form.subject.trim() || !form.time.trim()) return;
    const newSession = {
      id: idRef.current++,
      subject: form.subject.trim(),
      teacher: form.isBreak ? "" : form.teacher.trim(),
      time: form.time.trim(),
      room: form.isBreak ? "" : form.room.trim(),
      isBreak: form.isBreak,
      color: form.isBreak ? "border-neutral-500" : "border-blue-500",
      bgColor: form.isBreak ? "bg-slate-50" : "",
    };
    setTimetable((prev) =>
      prev.map((day) =>
        day.day === form.day
          ? { ...day, sessions: [...day.sessions, newSession] }
          : day
      )
    );
    setForm((prev) => ({
      ...prev,
      subject: "",
      teacher: "",
      time: "",
      room: "",
      isBreak: false,
    }));
  };

  const handleDeleteSession = (dayName, sessionId) => {
    setTimetable((prev) =>
      prev.map((day) =>
        day.day === dayName
          ? { ...day, sessions: day.sessions.filter((s) => s.id !== sessionId) }
          : day
      )
    );
  };

  const handleDeleteDay = (dayName) => {
    setTimetable((prev) =>
      prev.map((day) =>
        day.day === dayName ? { ...day, sessions: [] } : day
      )
    );
  };

  const canSave = form.day && form.subject.trim() && form.time.trim();

  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-4">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between gap-8 bg-white px-4 py-2 border border-slate-200 rounded-lg min-w-[200px] text-sm font-medium shadow-sm"
          >
            {selectedClass}
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-xl z-50 overflow-hidden">
              {classes.map((cls) => (
                <button
                  key={cls}
                  onClick={() => { setSelectedClass(cls); setIsDropdownOpen(false); }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm  ${cls === selectedClass ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'text-slate-600'}`}
                >
                  {cls}
                  {cls === selectedClass && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {selectedClass}
        </span>
      </div>

      {/* Edit Timeline Button */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => setShowEditor(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800"
        >
          <Plus className="w-4 h-4" />
          Edit Timeline
        </button>
      </div>

      {/* Modal Form */}
      {showEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowEditor(false)}
          />
          <form
            onSubmit={(e) => {
              handleAddSession(e);
              setShowEditor(false);
            }}
            className="relative w-[95%] max-w-2xl bg-white border border-slate-200 rounded-2xl p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-800">Add Timetable</h3>
              <button
                type="button"
                onClick={() => setShowEditor(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500">Day</label>
                <select
                  value={form.day}
                  onChange={(e) => setForm((prev) => ({ ...prev, day: e.target.value }))}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white"
                >
                  {dayOptions.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500">Subject</label>
                <input
                  value={form.subject}
                  onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  placeholder="Subject"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500">Teacher</label>
                <input
                  value={form.teacher}
                  onChange={(e) => setForm((prev) => ({ ...prev, teacher: e.target.value }))}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  placeholder="Teacher"
                  disabled={form.isBreak}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500">Time</label>
                <input
                  value={form.time}
                  onChange={(e) => setForm((prev) => ({ ...prev, time: e.target.value }))}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  placeholder="8:00 - 8:45"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500">Room</label>
                <input
                  value={form.room}
                  onChange={(e) => setForm((prev) => ({ ...prev, room: e.target.value }))}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  placeholder="Room 101"
                  disabled={form.isBreak}
                />
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 px-2 py-2">
                <input
                  type="checkbox"
                  checked={form.isBreak}
                  onChange={(e) => setForm((prev) => ({ ...prev, isBreak: e.target.checked }))}
                />
                Break
              </label>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                type="button"
                onClick={() => setShowEditor(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!canSave}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${
                  canSave
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "bg-slate-200 text-slate-500 cursor-not-allowed"
                }`}
              >
                <Plus className="w-4 h-4" />
                Save Timetable
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Timetable Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {timetable.map((column, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Day Header */}
            <div className={`p-4 border-b border-slate-100 flex justify-between items-center ${column.isToday ? 'bg-blue-600 text-white' : 'bg-white text-slate-800'}`}>
              <h3 className="font-bold text-lg">{column.day}</h3>
              <div className="flex items-center gap-2">
                {column.isToday && (
                  <span className="bg-white/20 px-3 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm">
                    Today
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteDay(column.day)}
                  className={`p-2 rounded-lg ${
                    column.isToday ? "text-white/80 hover:text-white" : "text-slate-400 hover:text-rose-500"
                  }`}
                  aria-label={`Clear ${column.day}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sessions List */}
            <div className="flex flex-col">
              {column.sessions.map((session) => (
                <div 
                  key={session.id} 
                  className={`p-4 border-b border-slate-50 last:border-0 flex flex-col gap-1 relative ${session.bgColor || ''}`}
                >
                  {/* Subject and Time Row */}
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                         
                        <div 
                          className={`absolute left-0 top-0 bottom-0 w-1 border-l-4 ${
                            session.isBreak ? 'border-l-neutral-500' : session.color
                          } rounded-l-full `}
                              ></div>

                        <h4 className={`font-bold text-sm ${session.isBreak ? 'text-slate-500 uppercase tracking-widest' : 'text-slate-800'}`}>
                          {session.subject}
                        </h4>
                      </div>
                      {!session.isBreak && (
                        <p className="text-xs text-slate-500 mt-0.5">{session.teacher}</p>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xs font-semibold text-slate-500">{session.time}</p>
                      {!session.isBreak && (
                        <p className="text-[10px] text-slate-400 font-medium">{session.room}</p>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteSession(column.day, session.id)}
                    className="absolute right-3 top-3 text-slate-300 hover:text-rose-500 transition-colors"
                    aria-label={`Delete ${session.subject}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTimetableData;
