import React, { useState, useRef } from 'react';
import { 
  ChevronDown, Check, Plus, Trash2, Printer, 
  Calendar, Clock, Coffee, MapPin, Edit3, Save, X 
} from 'lucide-react';
import { Button, Select, Input, Card, StatusBadge } from '../ui'; 

const AdminTimetableData = () => {
  console.log("TIMETABLE COMPONENT IS RENDERING!");
  const [selectedClass, setSelectedClass] = useState('Class 10A');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [editingDay, setEditingDay] = useState(null); // Tracks which day is being edited
  
  const classes = ['Class 10A', 'Class 10B', 'Class 9A', 'Class 9B', 'Class 8A'];
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  // Initial State: Includes all work days
  const [timetable, setTimetable] = useState([
    { day: "Monday", sessions: [
      { id: 1, subject: "English", teacher: "Ms. Emily Davis", time: "08:00 - 08:45", room: "103", isBreak: false },
    ]},
    { day: "Tuesday", sessions: [] },
    { day: "Wednesday", sessions: [] },
    { day: "Thursday", sessions: [] },
    { day: "Friday", sessions: [] },
  ]);

  // Simple incremental id generator to avoid impure calls during render
  const nextId = useRef(2);

  // --- Handlers ---

  const handleAddRow = (dayName) => {
    const newSession = {
      id: nextId.current++,
      subject: "",
      teacher: "",
      time: "00:00 - 00:00",
      room: "",
      isBreak: false
    };
    
    setTimetable(prev => prev.map(d => 
      d.day === dayName ? { ...d, sessions: [...d.sessions, newSession] } : d
    ));
  };

  const updateSession = (dayName, sessionId, field, value) => {
    setTimetable(prev => prev.map(d => {
      if (d.day === dayName) {
        return {
          ...d,
          sessions: d.sessions.map(s => s.id === sessionId ? { ...s, [field]: value } : s)
        };
      }
      return d;
    }));
  };

  const deleteSession = (dayName, sessionId) => {
    setTimetable(prev => prev.map(d => 
      d.day === dayName ? { ...d, sessions: d.sessions.filter(s => s.id !== sessionId) } : d
    ));
  };

  const clearDay = (dayName) => {
    if(window.confirm(`Clear all sessions for ${dayName}?`)) {
        setTimetable(prev => prev.map(d => d.day === dayName ? { ...d, sessions: [] } : d));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Button 
              variant="outline" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
              className="min-w-[180px] justify-between"
            >
              <span className="font-bold text-slate-700">{selectedClass}</span>
            </Button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-full z-[100] p-1 bg-white border border-slate-100 rounded-xl shadow-xl animate-in fade-in zoom-in-95 duration-200">
                {classes.map(cls => (
                  <button 
                    key={cls} 
                    onClick={() => { setSelectedClass(cls); setIsDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 rounded-lg"
                  >
                    {cls}
                  </button>
                ))}
              </div>
            )}
          </div>
          <StatusBadge variant="success">Academic Year 2026</StatusBadge>
        </div>
        
        <Button variant="primary" onClick={() => window.print()} className="bg-blue-600">
          <Printer size={16} className="mr-2" /> Export PDF
        </Button>
      </div>

      {/* Timetable Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {timetable.map((col) => {
          const isToday = col.day === todayName;
          const isEditing = editingDay === col.day;

          return (
            <div key={col.day} className="flex flex-col gap-4">
              {/* Day Header Card */}
              <div className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                isToday ? 'bg-blue-600 border-blue-600 shadow-lg' : 'bg-white border-slate-100 shadow-sm'
              }`}>
                <div>
                  <h3 className={`font-bold text-sm uppercase tracking-widest ${isToday ? 'text-white' : 'text-slate-500'}`}>
                    {col.day}
                  </h3>
                </div>
                {isEditing ? (
                  <Button size="sm" onClick={() => setEditingDay(null)} className="bg-white text-blue-600 h-8 px-2 hover:bg-blue-50">
                    <Save size={14} className="mr-1" /> Done
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" onClick={() => setEditingDay(col.day)} className={`p-1 h-auto ${isToday ? "text-white/70 hover:text-white" : "text-slate-300"}`}>
                    <Edit3 size={14} />
                  </Button>
                )}
              </div>

              {/* Sessions Container */}
              <div className={`space-y-3 min-h-[500px] p-2 rounded-2xl transition-colors ${isEditing ? 'bg-blue-50/50 ring-2 ring-blue-100 ring-dashed' : ''}`}>
                {col.sessions.map((session) => (
                  <Card key={session.id} noPadding className={`p-4 border-l-4 relative group transition-all hover:shadow-md ${
                    session.isBreak ? 'border-amber-400' : 'border-blue-500'
                  }`}>
                    {isEditing ? (
                      <div className="space-y-3 animate-in zoom-in-95">
                        <div className="flex justify-between">
                            <Input 
                                size="sm" 
                                placeholder="Time (08:00 - 08:45)" 
                                value={session.time} 
                                onChange={(e) => updateSession(col.day, session.id, 'time', e.target.value)}
                            />
                            <Button variant="ghost" size="sm" onClick={() => deleteSession(col.day, session.id)} className="text-rose-400 hover:text-rose-600 p-1 h-auto">
                                <Trash2 size={14} />
                            </Button>
                        </div>
                        <Input 
                            placeholder="Subject Name" 
                            value={session.subject} 
                            onChange={(e) => updateSession(col.day, session.id, 'subject', e.target.value)}
                        />
                        <div className="grid grid-cols-2 gap-2">
                            <Input 
                                placeholder="Room" 
                                value={session.room} 
                                onChange={(e) => updateSession(col.day, session.id, 'room', e.target.value)}
                            />
                             <button 
                                onClick={() => updateSession(col.day, session.id, 'isBreak', !session.isBreak)}
                                className={`text-[10px] font-bold rounded-lg border uppercase ${session.isBreak ? 'bg-amber-100 border-amber-200 text-amber-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                             >
                                {session.isBreak ? 'Break' : 'Period'}
                             </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-blue-500 mb-1">
                          <Clock size={12} /> {session.time}
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm mb-2">{session.subject || "Untitled Session"}</h4>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase">
                          <span>{session.room ? `Rm ${session.room}` : 'No Room'}</span>
                          <span className="truncate max-w-[60px]">{session.teacher || 'Staff'}</span>
                        </div>
                      </>
                    )}
                  </Card>
                ))}

                {/* Day Controls */}
                {isEditing ? (
                  <div className="space-y-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full bg-white border-blue-200 text-blue-600 border-dashed hover:bg-blue-50"
                      onClick={() => handleAddRow(col.day)}
                    >
                      <Plus size={14} className="mr-1" /> Add Session
                    </Button>
                    <button 
                        onClick={() => clearDay(col.day)}
                        className="w-full py-2 text-[10px] font-bold text-rose-400 uppercase tracking-tighter hover:text-rose-600 transition-colors"
                    >
                        Clear Entire Day
                    </button>
                  </div>
                ) : col.sessions.length === 0 && (
                  <div className="h-40 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center text-slate-300">
                    <Calendar size={20} className="mb-2 opacity-20" />
                    <button 
                        onClick={() => setEditingDay(col.day)}
                        className="text-[10px] font-bold uppercase hover:text-blue-500 transition-colors"
                    >
                        + Setup {col.day}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminTimetableData;