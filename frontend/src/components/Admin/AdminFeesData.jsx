import React, { useState, useMemo } from 'react';
import { Search, IndianRupee, Download, Eye } from 'lucide-react';
import { StatCard, DataTable, StatusBadge, Card, Input, Select, Button } from '../ui';

const AdminFeesData = () => {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = useMemo(() => {
    return FEE_DATA.filter(item => {
      const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase()) || item.roll.includes(query);
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  const columns = [
    { header: 'Student', render: (row) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
          {row.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div className="font-bold text-slate-700">{row.name}</div>
          <div className="text-[10px] text-slate-400">Roll: {row.roll}</div>
        </div>
      </div>
    )},
    { header: 'Class', accessor: 'class' },
    { header: 'Total (₹)', accessor: 'total' },
    { header: 'Paid (₹)', accessor: 'paid', render: (row) => <span className="text-emerald-600 font-bold">{row.paid}</span> },
    { header: 'Balance (₹)', accessor: 'due', render: (row) => <span className="text-rose-600 font-bold">{row.due}</span> },
    { header: 'Status', render: (row) => (
      <StatusBadge 
        status={row.status} 
        variant={row.status === 'Paid' ? 'success' : row.status === 'Partial' ? 'warning' : 'danger'} 
      />
    )},
    { header: 'Actions', render: () => (
      <div className="flex gap-2">
        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><Eye size={16}/></button>
        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><Download size={16}/></button>
      </div>
    )}
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Collection" value="₹4.2L" icon={IndianRupee} colorClass="text-blue-600" />
        <StatCard title="Outstanding" value="₹85K" icon={IndianRupee} colorClass="text-rose-600" bgClass="bg-rose-50" />
        <StatCard title="Paid Students" value="85%" icon={IndianRupee} colorClass="text-emerald-600" bgClass="bg-emerald-50" />
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input placeholder="Search name or roll..." className="pl-10" value={query} onChange={(e)=>setQuery(e.target.value)} />
          </div>
          <Select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)} options={['All', 'Paid', 'Partial', 'Unpaid']} />
          <Button variant="outline"><Download size={16} className="mr-2"/> Export</Button>
        </div>
        <DataTable columns={columns} data={filtered} />
      </Card>
    </div>
  );
};

const FEE_DATA = [
  { id: 1, name: 'Arjun Mehta', roll: '101', class: '10-A', total: 45000, paid: 45000, due: 0, status: 'Paid' },
  { id: 2, name: 'Sana Shaikh', roll: '102', class: '10-A', total: 45000, paid: 20000, due: 25000, status: 'Partial' },
];

export default AdminFeesData;