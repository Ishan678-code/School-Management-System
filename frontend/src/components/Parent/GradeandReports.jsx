import React from 'react';

const GradeandReports = () => {
  const performanceData = [
    { subject: "Mathematics", marks: "87/100", progress: 87, grade: "A", date: "2026-03-10" },
    { subject: "Science", marks: "92/100", progress: 92, grade: "A+", date: "2026-03-10" },
    { subject: "English", marks: "78/100", progress: 78, grade: "B+", date: "2026-03-08" },
    { subject: "Hindi", marks: "85/100", progress: 85, grade: "A", date: "2026-03-08" },
    { subject: "Social Studies", marks: "74/100", progress: 74, grade: "B", date: "2026-03-05" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Average", value: "85%" },
          { label: "Highest", value: "95%" },
          { label: "Lowest", value: "74%" }
        ].map((item, idx) => (
          <div key={idx} className="bg-white rounded-[1.5rem] border border-gray-100 p-8 shadow-sm text-center">
            <p className="text-gray-400 font-medium text-sm mb-2">{item.label}</p>
            <p className="text-4xl font-black text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>

      {/* 2. Detailed Performance Table Card */}
      <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50">
          <h3 className="text-xl font-black text-gray-900">Subject-wise Performance</h3>
        </div>

        <div className="p-8 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-xs font-bold uppercase tracking-widest border-b border-gray-50">
                <th className="pb-6 px-4">Subject</th>
                <th className="pb-6 px-4">Marks</th>
                <th className="pb-6 px-4">Progress</th>
                <th className="pb-6 px-4">Grade</th>
                <th className="pb-6 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {performanceData.map((row, i) => (
                <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="py-6 px-4 font-black text-gray-800">{row.subject}</td>
                  <td className="py-6 px-4 text-gray-500 font-medium">{row.marks}</td>
                  <td className="py-6 px-4 w-48">
                    {/* Custom Progress Bar */}
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gray-900 rounded-full" 
                        style={{ width: `${row.progress}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="py-6 px-4">
                    <span className={`
                      inline-flex items-center justify-center px-3 py-1 rounded-lg text-xs font-black
                      ${row.grade === 'A+' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}
                    `}>
                      {row.grade}
                    </span>
                  </td>
                  <td className="py-6 px-4 text-gray-400 text-sm font-medium">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default GradeandReports;