import React, { useMemo, useState } from 'react';
import { Search, Plus, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button, Card, Input, Select, StatusBadge } from '../ui';

const EVENTS_DATA = [
  {
    id: "event-sports-day-2025",
    type: "Sports",
    title: "Annual Sports Day",
    description: "Annual sports competition featuring track and field events, team sports, and more.",
    date: "Sun, Dec 28, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "Main Sports Ground",
    audience: "All Students",
    variant: "success", // Maps to StatusBadge emerald styling
    borderColor: "border-l-emerald-500"
  },
  {
    id: "event-ptm-2026-01-05",
    type: "Meeting",
    title: "Parent-Teacher Meeting",
    description: "Quarterly meeting to discuss student progress and academic performance.",
    date: "Mon, Jan 5, 2026",
    time: "10:00 AM - 1:00 PM",
    location: "School Auditorium",
    audience: "Parents & Teachers",
    variant: "warning", // Maps to StatusBadge orange styling
    borderColor: "border-l-orange-400"
  },
  {
    id: "event-science-fair-2026-01-15",
    type: "Academic",
    title: "Science Fair",
    description: "Students showcase their science projects and innovations.",
    date: "Thu, Jan 15, 2026",
    time: "11:00 AM - 3:00 PM",
    location: "Science Lab Building",
    audience: "Class 8-10",
    variant: "info", // Maps to StatusBadge blue styling
    borderColor: "border-l-blue-600"
  },
  {
    id: "event-cultural-fest-2026-01-20",
    type: "Cultural",
    title: "Cultural Festival",
    description: "Annual cultural celebration with performances, art exhibitions, and food.",
    date: "Tue, Jan 20, 2026",
    time: "5:00 PM - 9:00 PM",
    location: "School Main Hall",
    audience: "All Students",
    variant: "default", 
    borderColor: "border-l-teal-400"
  }
];

const AdminEventData = () => {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const eventTypes = useMemo(() => {
    return ["All", ...new Set(EVENTS_DATA.map((event) => event.type))];
  }, []);

  const filteredEvents = useMemo(() => {
    const term = query.trim().toLowerCase();
    return EVENTS_DATA.filter((event) => {
      const matchesType = typeFilter === "All" || event.type === typeFilter;
      const matchesQuery = !term || 
        event.title.toLowerCase().includes(term) || 
        event.description.toLowerCase().includes(term) ||
        event.location.toLowerCase().includes(term);
      
      return matchesType && matchesQuery;
    });
  }, [query, typeFilter]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input
              placeholder="Search events..."
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            options={eventTypes}
            className="min-w-[150px]"
          />
        </div>

        <Button className="bg-blue-600 shadow-lg shadow-blue-100">
          <Plus size={18} className="mr-2" />
          Add Event
        </Button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card 
            key={event.id} 
            className={`p-6 border-l-[6px] ${event.borderColor} flex flex-col gap-4 hover:shadow-md transition-all group`}
          >
            {/* Category Badge using Reusable StatusBadge */}
            <div>
              <StatusBadge status={event.type} variant={event.variant} />
            </div>

            {/* Content */}
            <div>
              <h3 className="font-bold text-xl text-slate-800 group-hover:text-blue-600 transition-colors">
                {event.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mt-1">
                {event.description}
              </p>
            </div>

            {/* Metadata Info */}
            <div className="space-y-2.5 pt-2 border-t border-slate-50">
              <div className="flex items-center gap-3 text-slate-500">
                <div className="p-1.5 bg-slate-50 rounded-md">
                  <Calendar size={14} className="text-slate-400" />
                </div>
                <span className="text-xs font-semibold">{event.date}</span>
              </div>
              
              <div className="flex items-center gap-3 text-slate-500">
                <div className="p-1.5 bg-slate-50 rounded-md">
                  <Clock size={14} className="text-slate-400" />
                </div>
                <span className="text-xs font-semibold">{event.time}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-500">
                <div className="p-1.5 bg-slate-50 rounded-md">
                  <MapPin size={14} className="text-slate-400" />
                </div>
                <span className="text-xs font-semibold line-clamp-1">{event.location}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-500">
                <div className="p-1.5 bg-slate-50 rounded-md">
                  <Users size={14} className="text-slate-400" />
                </div>
                <span className="text-xs font-semibold">{event.audience}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="mt-20 flex flex-col items-center justify-center text-slate-400">
          <div className="p-4 bg-slate-50 rounded-full mb-4">
            <Search size={32} />
          </div>
          <p className="text-sm font-medium">No events match your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default AdminEventData;