// AdminStudentData.jsx - Student management page with search, stats cards, DataTable.
// Uses TextInput for search, StatCard for metrics, StatusBadge for status, DataTable for list, IconButton for actions.
// Integrates Zustand store via useStudentsStore for real data.

import React from 'react';
import { Search, Plus, Download, MoreHorizontal, ChevronDown } from 'lucide-react';
import { useStudentsStore } from '@/stores/studentsStore';
import { TextInput, StatCard, StatusBadge, DataTable, IconButton, Button } from '@/components/ui';

const AdminStudentData = () => {
  const { students, loading, fetchStudents } = useStudentsStore();

  React.useEffect(() => {
    fetchStudents();
  }, []);

  const studentStats = [
    { label: 'Total Students', value: students.length.toString(), color: 'default' },
    { label: 'Active', value: students.filter(s => s.status === 'active').length.toString(), color: 'emerald' },
    { label: 'Avg Attendance', value: '91%', color: 'default' },
    { label: 'Classes', value: '5', color: 'default' },
  ];

  const columns = [
    {
      header: 'Student',
      key: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-100">
            {/* Generate initials from name */}
            {row.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 leading-none">{row.name}</p>
            <p className="text-xs text-gray-400 mt-1">{row.email || row.rollNo}</p>
          </div>
        </div>
      ),
    },
    { header: 'Roll No.', key: 'rollNo' },
    { header: 'Class', key: 'class' },
    { header: 'Guardian', key: 'parent' },
    { header: 'Attendance', render: (row) => <StatusBadge variant={row.attendance > 90 ? 'success' : 'warning'}>95%</StatusBadge> },
    { header: 'Status', render: (row) => <StatusBadge variant={row.status}>{row.status}</StatusBadge> },
    { 
      header: 'Actions', 
      render: () => (
        <div className="flex gap-1">
          <IconButton variant="ghost" size="sm"><MoreHorizontal className="w-3 h-3" /></IconButton>
          <Button variant="secondary" size="sm">Edit</Button>
        </div>
      ) 
    },
  ];

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="space-y-6">
      {/* Header with Search + Filters + Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <TextInput icon={<Search />} placeholder="Search students..." />
          <Button variant="secondary">
            All Classes <ChevronDown size={16} />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost">
            <Download size={16} /> Export
          </Button>
          <Button variant="primary">
            <Plus size={18} /> Add Student
          </Button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {studentStats.map((stat, i) => (
          <StatCard key={i} title={stat.label} value={stat.value} />
        ))}
      </div>

      {/* Main Table */}
      <Card>
        <DataTable columns={columns} data={students} />
      </Card>
    </div>
  );
};

export default AdminStudentData;
