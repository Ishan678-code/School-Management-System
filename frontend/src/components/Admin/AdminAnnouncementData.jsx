import React, { useState, useMemo } from 'react';
import { Search, Plus, Pin, Calendar, User as UserIcon } from 'lucide-react';
import { Card, Button, TextInput } from '../ui';

const AdminAnnouncementData = () => {
  const [query, setQuery] = useState('');

  const filteredPinned = useMemo(() => 
    PINNED.filter(a => a.title.toLowerCase().includes(query.toLowerCase())), [query]
  );

  return (
    <div className="space-y-8">
      {/* Search & Actions Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <TextInput placeholder="Search announcements..." className="pl-10" value={query} onChange={(e)=>setQuery(e.target.value)} />
        </div>
        <Button className="bg-blue-600"><Plus size={18} className="mr-2"/> Post Announcement</Button>
      </div>

      {/* Pinned Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPinned.map(item => (
          <Card key={item.id} className="p-6 border-l-4 border-l-blue-600">
            <div className="flex justify-between items-start mb-4">
              <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase">
                {item.priority}
              </span>
              <Pin size={16} className="text-blue-600 fill-blue-600" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg mb-2">{item.title}</h3>
            <p className="text-slate-500 text-sm line-clamp-3 mb-6">{item.content}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <UserIcon size={14} />
                </div>
                <span className="text-xs font-semibold text-slate-600">{item.author}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400 text-[10px]">
                <Calendar size={12} /> {item.date}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const PINNED = [
  { id: 1, priority: 'High Priority', title: 'Annual Sports Day 2026', author: 'Dr. Sarah Johnson', content: 'The annual sports meet is scheduled for next month...', date: 'Oct 24, 2026' },
];

export default AdminAnnouncementData;