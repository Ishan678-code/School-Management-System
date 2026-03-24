// Pinned and search functionality added to announcements page. --- revised
import { useMemo, useState } from 'react';
import { Search, Plus, Pin, Calendar, User } from 'lucide-react';

const pinnedAnnouncements = [
  {
    id: 1,
    priority: 'High Priority',
    audience: 'Everyone',
    title: 'Annual Sports Day 2026',
    author: 'Dr. Sarah Johnson',
    content: 'The annual sports meet is scheduled for next month. Please ensure all student registrations are completed.',
    date: 'Oct 24, 2026',
  },
  {
    id: 2,
    priority: 'High Priority',
    audience: 'Students',
    title: 'Mid-Term Examination Schedule',
    author: 'Academic Office',
    content: 'The detailed schedule for the upcoming mid-term examinations has been uploaded.',
    date: 'Oct 22, 2026',
  }
];

const recentAnnouncements = [
  { id: 3, title: 'Library New Arrivals', date: 'Oct 20, 2026', author: 'Librarian' },
  { id: 4, title: 'Canteen Menu Update', date: 'Oct 19, 2026', author: 'Admin Staff' },
  { id: 5, title: 'Tech Club Meeting', date: 'Oct 18, 2026', author: 'John Doe' },
];

const searchFields = (announcement) => {
  const parts = [
    announcement.title,
    announcement.content,
    announcement.author,
    announcement.audience,
    announcement.priority,
  ];
  return parts.filter(Boolean).join(' ').toLowerCase();
};

const getInitials = (name) => {
  if (!name) return 'NA';
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 3);
};

const AdminAnnouncementData = () => {
  const [query, setQuery] = useState('');

  const normalizedQuery = query.trim().toLowerCase();
  const filteredPinned = useMemo(() => {
    if (!normalizedQuery) return pinnedAnnouncements;
    return pinnedAnnouncements.filter((announcement) =>
      searchFields(announcement).includes(normalizedQuery)
    );
  }, [normalizedQuery]);

  const filteredRecent = useMemo(() => {
    if (!normalizedQuery) return recentAnnouncements;
    return recentAnnouncements.filter((announcement) =>
      searchFields(announcement).includes(normalizedQuery)
    );
  }, [normalizedQuery]);

  const hasResults = filteredPinned.length + filteredRecent.length > 0;

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans text-slate-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search announcement..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all active:scale-95">
          <Plus className="w-4 h-4" /> New Announcement
        </button>
      </div>

      {/* Pinned Section */}
      <div className="flex items-center gap-2 mb-6">
        <Pin className="w-5 h-5 text-blue-600 fill-blue-600" />
        <h2 className="text-lg font-bold">Pinned Announcements</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {filteredPinned.map((item) => (
          <div key={item.id} className="bg-gray-100 border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Pin className="w-4 h-4 text-blue-600 fill-blue-600" />
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold  rounded-full border border-red-100">{item.priority}</span>
                <span className="px-3 py-1 bg-slate-100 text-blue-600  text-[10px] font-bold  rounded-full">{item.audience}</span>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-2">{item.content}</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">{getInitials(item.author)}</div>
                <span className="text-sm font-semibold text-slate-700">{item.author}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Calendar className="w-3.5 h-3.5" /> <span className="text-xs">{item.date}</span>
              </div>
            </div>
          </div>
        ))}
        {!filteredPinned.length && (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-500">
            No pinned announcements match your search.
          </div>
        )}
      </div>

      {/* --- RECENT ANNOUNCEMENTS SECTION --- */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800">Recent Announcements</h2>
      </div>

      {/* Flex container for 3 cards */}
      <div className="flex flex-col lg:flex-row gap-6">
        {filteredRecent.map((item) => (
          <div key={item.id} className="flex-1 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-blue-200 transition-colors">
            
            {/* Badges Flex */}
            <div className="flex gap-2 mb-4">
              <button className="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold uppercase rounded-md border border-orange-100">
                Medium
              </button>
              <button className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-md border border-blue-100">
                Students
              </button>
            </div>

            {/* Title and Text */}
            <div className="mb-5">
              <h3 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                This is a sample description for the recent announcement to keep the community updated.
              </p>
            </div>

            {/* User Profile and Date Flex */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-slate-600">{item.author}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <Calendar className="w-3 h-3" />
                <span className="text-[10px]">{item.date}</span>
              </div>
            </div>

          </div>
        ))}
        {!filteredRecent.length && (
          <div className="flex-1 rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-500">
            No recent announcements match your search.
          </div>
        )}
      </div>

      {!hasResults && (
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
          Try clearing your search to see all announcements.
        </div>
      )}
    </div>
  );
};

export default AdminAnnouncementData;
