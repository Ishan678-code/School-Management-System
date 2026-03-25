import React, { useState,  } from 'react';
import { CheckCircle2, XCircle, Clock, Save, Download } from 'lucide-react';
import { Card, DataTable, Select, Button } from '../ui';

const AdminAttendanceData = () => {
  const [selectedClass, setSelectedClass] = useState('Class 10A');
  const [students, setStudents] = useState(INITIAL_STUDENTS['Class 10A']);

  const updateStatus = (id, newStatus) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const columns = [
    { header: 'Student', render: (row) => (
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full ${row.color} flex items-center justify-center text-[10px] font-bold`}>
          {row.initials}
        </div>
        <div>
          <div className="font-bold text-slate-700">{row.name}</div>
          <div className="text-[10px] text-slate-400">{row.roll}</div>
        </div>
      </div>
    )},
    { header: 'Attendance Status', render: (row) => (
      <div className="flex gap-2">
        <button 
          onClick={() => updateStatus(row.id, 'Present')}
          className={`p-2 rounded-lg border ${row.status === 'Present' ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-slate-400 border-slate-200'}`}
        >
          <CheckCircle2 size={16} />
        </button>
        <button 
          onClick={() => updateStatus(row.id, 'Absent')}
          className={`p-2 rounded-lg border ${row.status === 'Absent' ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-slate-400 border-slate-200'}`}
        >
          <XCircle size={16} />
        </button>
        <button 
          onClick={() => updateStatus(row.id, 'On Leave')}
          className={`p-2 rounded-lg border ${row.status === 'On Leave' ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-slate-400 border-slate-200'}`}
        >
          <Clock size={16} />
        </button>
      </div>
    )}
  ];

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Select value={selectedClass} onChange={(e)=>setSelectedClass(e.target.value)} options={['Class 10A', 'Class 10B']} />
        <div className="flex gap-2">
          <Button variant="outline"><Download size={16} className="mr-2"/> Export</Button>
          <Button className="bg-emerald-600"><Save size={16} className="mr-2"/> Save Attendance</Button>
        </div>
      </div>
      <DataTable columns={columns} data={students} />
    </Card>
  );
};

const INITIAL_STUDENTS = {
  'Class 10A': [
    { id: 1, name: 'Alex Thompson', roll: 'STU001', status: 'Present', initials: 'AT', color: 'bg-blue-100 text-blue-600' },
  ]
};

export default AdminAttendanceData;