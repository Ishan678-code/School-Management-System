

import React, { useState } from 'react';

const StudentAttendanceData = () => {
  // Default to March 2026
  const [selectedMonth, setSelectedMonth] = useState(2); 
  const currentYear = 2026;

  const student = {
    name: "Ishan Awasthi",
    class: "Grade 10 - Section A",
    rollNo: "CS-24"
  };

  // --- CALENDAR LOGIC ---
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const totalDays = getDaysInMonth(currentYear, selectedMonth);
  const startOffset = getFirstDayOfMonth(currentYear, selectedMonth);

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  const getAttendanceStatus = (day) => {
    const date = new Date(currentYear, selectedMonth, day);
    if (date.getDay() === 0) return 'holiday';
    if (selectedMonth === 2) {
      if (day === 11) return 'absent';
      if (day === 17) return 'late';
    }
    return 'present';
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] p-4 md:p-8 text-slate-700 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* 1. STUDENT INFO CARD (New Top Component) */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-5 mb-6 border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg">
            {getInitials(student.name)}
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:gap-8 grow">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student Name</p>
              <h1 className="text-xl font-black text-slate-800">{student.name}</h1>
            </div>
            <div className="hidden md:block w-px h-10 bg-slate-200"></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Class</p>
              <p className="text-lg font-bold text-slate-600">{student.class}</p>
            </div>
            <div className="hidden md:block w-px h-10 bg-slate-200"></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Roll Number</p>
              <p className="text-lg font-bold text-slate-600">{student.rollNo}</p>
            </div>
          </div>
        </div>

        {/* 2. SUMMARY STATS CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Present", value: "25", color: "text-emerald-600" },
            { label: "Absent", value: "1", color: "text-rose-600" },
            { label: "Holidays", value: "5", color: "text-slate-500" },
            { label: "Attendance", value: "96%", color: "text-slate-900" },
          ].map((stat, i) => (
            <div key={i} className="bg-white/60 rounded-2xl p-5 text-center border border-slate-200 shadow-sm">
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">{stat.label}</p>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* 3. MAIN CALENDAR CARD */}
        <div className="bg-white/50 backdrop-blur-md rounded-[2rem] border border-slate-200 p-6 md:p-10 shadow-sm">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">View Records</label>
              <select 
                className="bg-white border border-slate-200 rounded-xl px-4 py-2 font-bold text-slate-700 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              >
                {months.map((m, i) => <option key={m} value={i}>{m} {currentYear}</option>)}
              </select>
            </div>
            <h2 className="text-2xl font-black text-slate-800">{months[selectedMonth]} {currentYear}</h2>
          </div>

          <div className="grid grid-cols-7 gap-2 md:gap-4">
            {daysOfWeek.map(day => (
              <div key={day} className="text-center text-[10px] font-bold text-slate-400 uppercase mb-2">{day}</div>
            ))}

            {Array.from({ length: startOffset }).map((_, i) => (
              <div key={`offset-${i}`} className="h-12 md:h-16" />
            ))}

            {Array.from({ length: totalDays }).map((_, i) => {
              const day = i + 1;
              const status = getAttendanceStatus(day);
              const styles = {
                present: "bg-green-200 text-green-800",
                absent: "bg-rose-200 text-rose-800",
                late: "bg-yellow-200 text-yellow-800",
                holiday: "bg-slate-200 text-slate-800",
              };

              return (
                <div key={day} className={`h-12 md:h-16 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm transition-transform hover:scale-105 ${styles[status]}`}>
                  {day}
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap gap-6 pt-6 border-t border-slate-100">
            {['Present', 'Absent', 'Late', 'Holiday'].map((label) => (
              <div key={label} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${
                  label === 'Present' ? 'bg-green-400' : 
                  label === 'Absent' ? 'bg-rose-400' : 
                  label === 'Late' ? 'bg-yellow-400' : 'bg-slate-400'
                }`}></span>
                <span className="text-xs font-bold text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceData;