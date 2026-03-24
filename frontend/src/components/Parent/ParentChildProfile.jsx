import React from 'react';

const ParentChildProfile = () => {
  // Mock data for the attendance calendar
 
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 1. Header Profile Card */}
      <div className="bg-white rounded-[1.5rem] border border-gray-200 p-8 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-[#0f172a] flex items-center justify-center text-white text-3xl font-black">
            AS
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Aarav Sharma</h1>
            <p className="text-gray-400 font-medium mt-1 text-lg">
              Class 8th-A • Roll No. 2024-08A-12
            </p>
          </div>
        </div>
      </div>

      {/* 2. Student Details Table Card */}
      <div className="bg-white rounded-[1.5rem] border border-gray-200 p-8 shadow-sm">
        <h3 className="text-xl font-black text-gray-900 mb-8">Student Details</h3>
        <div className="space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-gray-50">
            <span className="text-gray-400 font-medium">Full Name</span>
            <span className="font-bold text-gray-800">Aarav Sharma</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-gray-50">
            <span className="text-gray-400 font-medium">Class</span>
            <span className="font-bold text-gray-800">8th - A</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 font-medium">Roll Number</span>
            <span className="font-bold text-gray-800">2024-08A-12</span>
          </div>
        </div>
      </div>

 <div className="bg-white rounded-[1.5rem] border border-gray-200 p-8 shadow-sm">
        <h3 className="text-xl font-black text-gray-900 mb-8">Subjects Enrolled</h3>
       
     <div className="flex flex-wrap gap-3">
    {[
      "Mathematics", 
      "Science", 
      "English", 
      "Hindi", 
      "Social Studies", 
      "Computer Science"
    ].map((subject) => (
      <span 
        key={subject}
        className="px-6 py-2 bg-slate-100 text-slate-700 font-bold rounded-full border border-slate-100 text-sm hover:bg-slate-100 transition-colors cursor-default"
      >
        {subject}
      </span>
    ))}
  </div>
     
      </div>


    </div>
  );
};

export default ParentChildProfile;