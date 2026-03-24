import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const StudentTimetableData = () => {
  const [selectedClass, setSelectedClass] = useState('Class 10A');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Get current day name (e.g., "Monday", "Tuesday")
  const currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());

  const classes = ['Class 10A', 'Class 10B', 'Class 9A', 'Class 9B', 'Class 8A'];

  const timetable = [
     {
      day: "Sunday",
      // isToday is now calculated dynamically
      sessions: [
        { subject: "English", teacher: "Ms. Emily Davis", time: "8:00 - 8:45", room: "Room 103", color: "border-blue-500" },
        { subject: "Mathematics", teacher: "Dr. Sarah Johnson", time: "8:50 - 9:35", room: "Room 101", color: "border-blue-500" },
        { subject: "Biology", teacher: "Dr. Lisa Anderson", time: "9:40 - 10:25", room: "Room 105", color: "border-blue-500" },
        { subject: "Break", time: "10:25 - 10:45", isBreak: true, color:"border-blue-500" },
        { subject: "Chemistry Lab", teacher: "Mr. Robert Wilson", time: "10:50 - 11:35", room: "Lab 1", color: "border-emerald-500", bgColor: "bg-emerald-50" },
        { subject: "Chemistry Lab", teacher: "Mr. Robert Wilson", time: "11:40 - 12:25", room: "Lab 1", color: "border-emerald-500", bgColor: "bg-emerald-50" },
        { subject: "Lunch", time: "12:25 - 1:10", isBreak: true },
        { subject: "History", teacher: "Mrs. Patricia Brown", time: "1:15 - 2:00", room: "Room 104", color: "border-blue-500" },
      ]
    },
    {
      day: "Monday",
      // isToday is now calculated dynamically
      sessions: [
        { subject: "English", teacher: "Ms. Emily Davis", time: "8:00 - 8:45", room: "Room 103", color: "border-blue-500" },
        { subject: "Mathematics", teacher: "Dr. Sarah Johnson", time: "8:50 - 9:35", room: "Room 101", color: "border-blue-500" },
        { subject: "Biology", teacher: "Dr. Lisa Anderson", time: "9:40 - 10:25", room: "Room 105", color: "border-blue-500" },
        { subject: "Break", time: "10:25 - 10:45", isBreak: true, color:"border-blue-500" },
        { subject: "Chemistry Lab", teacher: "Mr. Robert Wilson", time: "10:50 - 11:35", room: "Lab 1", color: "border-emerald-500", bgColor: "bg-emerald-50" },
        { subject: "Chemistry Lab", teacher: "Mr. Robert Wilson", time: "11:40 - 12:25", room: "Lab 1", color: "border-emerald-500", bgColor: "bg-emerald-50" },
        { subject: "Lunch", time: "12:25 - 1:10", isBreak: true },
        { subject: "History", teacher: "Mrs. Patricia Brown", time: "1:15 - 2:00", room: "Room 104", color: "border-blue-500" },
      ]
    },
    {
      day: "Tuesday",
      sessions: [
        { subject: "English", teacher: "Ms. Emily Davis", time: "8:00 - 8:45", room: "Room 103", color: "border-blue-500" },
        { subject: "Mathematics", teacher: "Dr. Sarah Johnson", time: "8:50 - 9:35", room: "Room 101", color: "border-blue-500" },
        { subject: "Biology", teacher: "Dr. Lisa Anderson", time: "9:40 - 10:25", room: "Room 105", color: "border-blue-500" },
        { subject: "Break", time: "10:25 - 10:45", isBreak: true },
        { subject: "Physics", teacher: "Prof. Michael Chen", time: "10:50 - 11:35", room: "Room 102", color: "border-blue-500" },
        { subject: "Geography", teacher: "Mr. James Wilson", time: "11:40 - 12:25", room: "Room 106", color: "border-blue-500" },
        { subject: "Lunch", time: "12:25 - 1:10", isBreak: true },
        { subject: "Physical Education", teacher: "Coach Miller", time: "1:15 - 2:00", room: "Sports Ground", color: "border-blue-500" },
      ]
    },
    {
      day: "Wednesday",
      sessions: [
        { subject: "Chemistry", teacher: "Mr. Robert Wilson", time: "8:00 - 8:45", room: "Room 102", color: "border-blue-500" },
        { subject: "Mathematics", teacher: "Dr. Sarah Johnson", time: "8:50 - 9:35", room: "Room 101", color: "border-blue-500" },
        { subject: "English", teacher: "Ms. Emily Davis", time: "9:40 - 10:25", room: "Room 103", color: "border-blue-500" },
        { subject: "Break", time: "10:25 - 10:45", isBreak: true },
        { subject: "Biology Lab", teacher: "Dr. Lisa Anderson", time: "10:50 - 11:35", room: "Lab 2", color: "border-emerald-500", bgColor: "bg-emerald-50" },
        { subject: "Biology Lab", teacher: "Dr. Lisa Anderson", time: "11:40 - 12:25", room: "Lab 2", color: "border-emerald-500", bgColor: "bg-emerald-50" },
        { subject: "Lunch", time: "12:25 - 1:10", isBreak: true },
        { subject: "Art", teacher: "Ms. Anna White", time: "1:15 - 2:00", room: "Art Room", color: "border-blue-500" },
      ]
    },
     {
      day: "Thursday",
      sessions: [
        { subject: "Chemistry", teacher: "Mr. Robert Wilson", time: "8:00 - 8:45", room: "Room 102", color: "border-blue-500" },
        { subject: "Mathematics", teacher: "Dr. Sarah Johnson", time: "8:50 - 9:35", room: "Room 101", color: "border-blue-500" },
        { subject: "English", teacher: "Ms. Emily Davis", time: "9:40 - 10:25", room: "Room 103", color: "border-blue-500" },
        { subject: "Break", time: "10:25 - 10:45", isBreak: true },
        { subject: "Biology Lab", teacher: "Dr. Lisa Anderson", time: "10:50 - 11:35", room: "Lab 2", color: "border-emerald-500", bgColor: "bg-emerald-50" },
        { subject: "Biology Lab", teacher: "Dr. Lisa Anderson", time: "11:40 - 12:25", room: "Lab 2", color: "border-emerald-500", bgColor: "bg-emerald-50" },
        { subject: "Lunch", time: "12:25 - 1:10", isBreak: true },
        { subject: "Art", teacher: "Ms. Anna White", time: "1:15 - 2:00", room: "Art Room", color: "border-blue-500" },
      ]
    },
    {
      day: "Friday",
      sessions: [
        { subject: "Chemistry", teacher: "Mr. Robert Wilson", time: "8:00 - 8:45", room: "Room 102", color: "border-blue-500" },
        { subject: "Mathematics", teacher: "Dr. Sarah Johnson", time: "8:50 - 9:35", room: "Room 101", color: "border-blue-500" },
        { subject: "English", teacher: "Ms. Emily Davis", time: "9:40 - 10:25", room: "Room 103", color: "border-blue-500" },
        { subject: "Break", time: "10:25 - 10:45", isBreak: true },
        { subject: "Biology Lab", teacher: "Dr. Lisa Anderson", time: "10:50 - 11:35", room: "Lab 2", color: "border-emerald-500", bgColor: "bg-emerald-50" },
        { subject: "Biology Lab", teacher: "Dr. Lisa Anderson", time: "11:40 - 12:25", room: "Lab 2", color: "border-emerald-500", bgColor: "bg-emerald-50" },
        { subject: "Lunch", time: "12:25 - 1:10", isBreak: true },
        { subject: "Art", teacher: "Ms. Anna White", time: "1:15 - 2:00", room: "Art Room", color: "border-blue-500" },
      ]
    },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-4">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between gap-8 bg-white px-4 py-2 border border-slate-200 rounded-lg min-w-50 text-sm font-medium shadow-sm"
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

      {/* Timetable Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {timetable.map((column, idx) => {
          // Dynamic check for "Today"
          const isToday = column.day === currentDay;

          return (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Day Header */}
              <div className={`p-4 border-b border-slate-100 flex justify-between items-center ${isToday ? 'bg-blue-600 text-white' : 'bg-white text-slate-800'}`}>
                <h3 className="font-bold text-lg">{column.day}</h3>
                {isToday && (
                  <span className="bg-white/20 px-3 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm">
                    Today
                  </span>
                )}
              </div>

              {/* Sessions List */}
              <div className="flex flex-col">
                {column.sessions.map((session, sIdx) => (
                  <div 
                    key={sIdx} 
                    className={`p-4 border-b border-slate-50 last:border-0 flex flex-col gap-1 relative ${session.bgColor || ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <div 
                            className={`absolute left-0 top-0 bottom-0 w-1 border-l-4 ${
                              session.isBreak ? 'border-l-neutral-400' : session.color
                            }`}
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
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentTimetableData;