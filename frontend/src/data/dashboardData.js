import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  Clock,
  CalendarDays,
  Megaphone,
  BarChart3,
  Settings,
  UserPlus,
  CheckCircle2,
  ReceiptText,
  Building2,
  ChartBar
} from "lucide-react";


// Sidebar Items
export const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Users, label: "Teachers" },
  { icon: GraduationCap, label: "Students" },
  { icon: Building2, label: "Classes" },
  { icon: ReceiptText, label: "Fees" },
  { icon: ClipboardCheck, label: "Attendance" },
  { icon: Clock, label: "Timetable" },
  { icon: ChartBar, label: "Results" },

  { icon: CalendarDays, label: "Events" },
  { icon: Megaphone, label: "Announcements" },
  { icon: BarChart3, label: "Reports" },
  { icon: Settings, label: "Settings" },
];


// Stats Cards
export const statsCards = [
  {
    title: "Total Students",
    value: "1,234",
    sub: "Active enrollments",
    change: "+12%",
    changeLabel: "from last month",
    icon: GraduationCap,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Total Teachers",
    value: "89",
    sub: "Across all departments",
    change: "+5%",
    changeLabel: "from last month",
    icon: Users,
    color: "bg-cyan-100 text-cyan-600"
  },
  {
    title: "Active Classes",
    value: "45",
    sub: "12 sections",
    change: null,
    changeLabel: null,
    icon: BookOpen,
    color: "bg-orange-100 text-orange-600"
  },
  {
    title: "Today's Attendance",
    value: "92%",
    sub: "1,135 students present",
    change: "+3%",
    changeLabel: "from last month",
    icon: CheckCircle2,
    color: "bg-emerald-100 text-emerald-600"
  },
];


// Chart Data
export const chartData = [
  { day: "Mon", value: 85 },
  { day: "Tue", value: 78 },
  { day: "Wed", value: 90 },
  { day: "Thu", value: 88 },
  { day: "Fri", value: 92 },
  { day: "Sat", value: 70 },
  { day: "Sun", value: 95 },
];


// Activities
export const activities = [
  {
    icon: UserPlus,
    title: "New student enrolled",
    desc: "Emma Watson joined Class 10A",
    time: "5 minutes ago",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: ClipboardCheck,
    title: "Attendance marked",
    desc: "Class 8B attendance completed",
    time: "15 minutes ago",
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    icon: Megaphone,
    title: "New announcement",
    desc: "Annual sports day schedule published",
    time: "1 hour ago",
    color: "bg-orange-100 text-orange-600"
  },
];