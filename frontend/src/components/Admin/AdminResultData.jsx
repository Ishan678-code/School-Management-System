import React, { useMemo, useState } from 'react';
import { Search, Trophy, TrendingUp, Users } from 'lucide-react';
import { Input, Select, StatCard, DataTable, StatusBadge, Card } from '../ui';

const AdminResultData = () => {
  const [selectedClass, setSelectedClass] = useState('Class 10A');
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [query, setQuery] = useState('');

  const classes = ['Class 10A', 'Class 10B', 'Class 9A', 'Class 9B', 'Class 8A'];
  const terms = ['Term 1', 'Term 2', 'Term 3'];

  // 1. Logic: Filter results based on Class, Term, and Search Query
  const filteredResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    return RESULT_DATA.filter((row) => {
      const matchesClass = row.className === selectedClass;
      const matchesTerm = row.term === selectedTerm;
      const matchesQuery = !trimmed || 
        row.name.toLowerCase().includes(trimmed) || 
        row.roll.toLowerCase().includes(trimmed);
      return matchesClass && matchesTerm && matchesQuery;
    });
  }, [selectedClass, selectedTerm, query]);

  // 2. Table Column Definitions
  const columns = [
    { 
      header: 'Student', 
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full ${row.color} flex items-center justify-center text-[10px] font-bold`}>
            {row.initials}
          </div>
          <div>
            <div className="font-bold text-slate-700">{row.name}</div>
            <div className="text-[10px] text-slate-400">{row.roll}</div>
          </div>
        </div>
      )
    },
    { header: 'Class', accessor: 'className' },
    { 
      header: 'Scores', 
      render: (row) => (
        <div className="flex gap-2">
          {row.subjects.map((s) => (
            <span key={s.name} className="text-[10px] bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
              {s.name}: <span className="font-bold text-slate-700">{s.score}</span>
            </span>
          ))}
        </div>
      )
    },
    { header: 'Total', accessor: 'total' },
    { 
      header: 'Grade', 
      render: (row) => (
        <span className={`px-2 py-0.5 rounded text-xs font-bold ${row.gradeColor}`}>
          {row.grade}
        </span>
      )
    },
    { 
      header: 'Status', 
      render: (row) => <StatusBadge status={row.status} variant={row.status === 'Pass' ? 'success' : 'danger'} />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Class Average" value="84.2%" icon={TrendingUp} colorClass="text-blue-600" bgClass="bg-blue-50" />
        <StatCard title="Pass Rate" value="96%" icon={Users} colorClass="text-emerald-600" bgClass="bg-emerald-50" />
        <StatCard title="Top Scorer" value="98.5%" icon={Trophy} colorClass="text-orange-500" bgClass="bg-orange-50" />
      </div>

      <Card className="p-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              placeholder="Search by name or roll..." 
              className="pl-10" 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
            />
          </div>
          <Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} options={classes} />
          <Select value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)} options={terms} />
        </div>

        {/* Reusable Data Table */}
        <DataTable columns={columns} data={filteredResults} />
      </Card>
    </div>
  );
};

// Mock Data (Shortened for brevity)
const RESULT_DATA = [
  { id: 1, name: 'Alex Thompson', roll: 'STU001', className: 'Class 10A', term: 'Term 1', initials: 'AT', color: 'bg-blue-100 text-blue-600', subjects: [{name: 'Math', score: 85}], total: 255, grade: 'A', gradeColor: 'bg-emerald-100 text-emerald-600', status: 'Pass' },
];

export default AdminResultData;