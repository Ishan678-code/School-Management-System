

import { useState, useEffect, useRef } from "react";

import { Building2 } from "lucide-react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
        import { useNavigate } from "react-router";
        import gsap from "gsap";
        import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
export default function LoginPage() {
  const [email, setEmail] = useState("admin@school.edu");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeRole, setActiveRole] = useState("Admin");

  const navigate = useNavigate();

  // Refs for GSAP
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    // Animate left and right sections
    const tl = gsap.timeline();
    // Left section (desktop only)
    tl.from(leftRef.current, {
      x: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
    // Right section (login form)
    tl.from(
      rightRef.current,
      {
        x: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5" // overlap by 0.5s for smooth stagger
    );
  }, []);

  return (
    <div className="min-h-screen font-sans flex">
      {/* LEFT SECTION: hidden on mobile */}
      <div
        ref={leftRef}
        className="hidden lg:flex flex-1 bg-[#0057ff] text-white px-24 py-16 items-center justify-center"
      >
        <div className="w-full max-w-md text-left">
          {/* Logo */}
          <div className="flex items-center gap-4 mb-3">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Building2 size={24} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold">EduManage</h1>
          </div>

          <p className="text-lg opacity-90 mb-16">School Management System</p>

          <h2 className="text-5xl font-extrabold leading-tight tracking-tight mb-7">
            Streamline Your <br />
            Educational Journey
          </h2>

          <p className="text-lg leading-relaxed opacity-95 mb-11">
            A comprehensive platform designed to manage students, teachers,
            attendance, and academic activities with ease.
          </p>

          <ul className="space-y-3 text-lg">
            {[
              "Role-based access control",
              "Real-time attendance tracking",
              "Event management",
              "Performance analytics",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-3xl text-blue-200 leading-none">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT SECTION: login form */}
      <div
        ref={rightRef}
        className="flex-1 bg-slate-50 flex items-center justify-center p-8 sm:p-16"
      >
        <div className="w-full max-w-2xl bg-white p-8 sm:p-16 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.05),0_20px_60px_rgba(0,0,0,0.06)] flex flex-col">
          <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
          <p className="text-center text-slate-500 text-sm mb-8">
            Sign in to access your portal
          </p>

<div className="flex gap-3 mb-6 flex-wrap justify-center">
            {["Admin", "Teacher", "Student", "Parent"].map((role) => (
              <Button
                key={role}
                variant={activeRole === role ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setActiveRole(role)}
              >
                {role}
              </Button>
            ))}
          </div>

          {/* Role Info */}
          <div className="bg-slate-100 p-4 rounded-xl text-sm mb-7 text-center lg:text-left">
            <strong className="block font-semibold">{activeRole}</strong>
            <span className="text-slate-600">
              Full system access and management
            </span>
          </div>

          {/* Form */}
          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              switch (activeRole) {
                case "Admin":
                  navigate("/admin");
                  break;
                case "Teacher":
                  navigate("/teacher");
                  break;
                case "Student":
                  navigate("/student");
                  break;
                case "Parent":
                  navigate("/parent");
                  break;
                default:
                  navigate("/admin");
              } 
            }}
          >
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Email</label>
<Input
                label="Email"
                icon={<MdMailOutline className="w-4 h-4" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@school.edu"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-200 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg"
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                Remember me
              </label>
              <a href="#" className="text-blue-600 font-medium hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Button */}
<Button variant="primary" size="lg" className="mt-3 w-full">
              Login
            </Button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-6">
            Demo: Enter any email/password to login
          </p>
        </div>
      </div>
    </div>
  );
}