import { useState, useRef, useLayoutEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import govLogo from "../assets/Govlogo.png";
import digitalindia from "../assets/digitalindia.svg";
import {
  Accessibility,
  Languages,
  Menu,
  X,
} from "lucide-react";

const NAVY = "#14283F";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Land Records", to: "/landrecords" },
  { label: "Services", to: "/services" },
  { label: "Applications", to: "/Applications" },
  { label: "Land Maps", to: "/gis-map" },
  { label: "Reports", to: "/reports" },
  { label: "Contact", to: "/contact" },
];

export default function Header({ activePath = "/" }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const utilityRef = useRef(null);
  const tricolorRef = useRef(null);

  // Heights are measured (not hardcoded) because the utility bar wraps
  // to a different height on mobile vs desktop.
  const [utilityH, setUtilityH] = useState(0);
  const [tricolorH, setTricolorH] = useState(0);

  const measure = useCallback(() => {
    if (utilityRef.current) setUtilityH(utilityRef.current.offsetHeight);
    if (tricolorRef.current) setTricolorH(tricolorRef.current.offsetHeight);
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    // Re-measure once fonts/images settle (e.g. Hindi text reflow).
    const t = setTimeout(measure, 300);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [measure]);

  return (
    <div>
      {/* Utility bar — always stuck to the very top */}
      <div
        ref={utilityRef}
        className="text-white text-xs sm:text-sm sticky top-0 z-[60]"
        style={{ backgroundColor: NAVY }}
      >
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/90">Government Digital Land Management Platform</p>

          <div className="flex items-center gap-4 sm:gap-5">
            <button className="flex items-center gap-1.5 text-white/80 hover:text-amber-400 transition-colors">
              <Accessibility size={14} />
              Accessibility
            </button>
            <span className="hidden sm:inline text-white/20">|</span>
            <button className="flex items-center gap-1.5 text-white/80 hover:text-amber-400 transition-colors">
              <Languages size={14} />
              हिंदी | English
            </button>
            <span className="hidden sm:inline text-white/20">|</span>
            <a href="#main-content" className="hidden sm:inline text-white/80 hover:text-amber-400 transition-colors">
              Skip to Main Content
            </a>
          </div>
        </div>
      </div>

      {/* Tricolor strip — sticks directly beneath the utility bar */}
      <div
        ref={tricolorRef}
        className="h-1 flex shrink-0 sticky z-[55]"
        style={{ top: utilityH }}
      >
        <div className="w-1/3 bg-orange-500" />
        <div className="w-1/3 bg-white" />
        <div className="w-1/3 bg-green-600" />
      </div>

      {/* Official header — scrolls away normally */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 p-1.5">
                <img src={govLogo} alt="Government of India" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-tight">Government of India</p>
                <h1 className="text-lg sm:text-2xl font-serif font-bold leading-tight" style={{ color: NAVY }}>
                  Department of Rural Development
                </h1>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-tight hidden sm:block">
                  Digital Land Records &amp; Management Portal
                </p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4 text-right">
              <div>
                <p className="font-serif font-bold text-3xl leading-none" style={{ color: NAVY }}>
                  LandStack
                </p>
                <p className="text-xs text-amber-600 font-medium tracking-wide uppercase mt-1">
                  Digital India Initiative
                </p>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="w-12 h-9 rounded flex items-center justify-center">
                <img src={digitalindia} alt="Digital India" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation — sticks once it reaches the bottom of the tricolor strip */}
      <nav
        className="sticky text-white shadow-md z-50"
        style={{ backgroundColor: NAVY, top: utilityH + tricolorH }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="hidden md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`px-5 py-4 text-sm font-medium flex items-center gap-1 transition-colors ${
                    activePath === item.to ? "bg-black/20 text-white" : "text-white/85 hover:bg-black/15 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <button
              onClick={() => setMobileNavOpen((v) => !v)}
              className="md:hidden p-2 text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <div className="hidden md:flex items-center gap-3 my-2">
              <Link
                to="/register"
                className="inline-flex items-center border border-amber-400/70 text-amber-400 hover:bg-amber-400 hover:text-[#12203a] px-5 py-2.5 rounded-md font-semibold text-sm transition-colors"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center bg-amber-500 hover:bg-amber-400 text-[#12203a] px-5 py-2.5 rounded-md font-semibold text-sm transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>

        {mobileNavOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#0d1c2e]">
            <div className="px-4 py-2 flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="py-3 text-sm font-medium text-white/90 border-b border-white/5 flex items-center justify-between"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 mb-3 flex flex-col gap-2">
                <Link
                  to="/register"
                  className="text-center border border-amber-400/70 text-amber-400 hover:bg-amber-400 hover:text-[#12203a] px-5 py-2.5 rounded-md font-semibold text-sm transition-colors"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="text-center bg-amber-500 hover:bg-amber-400 text-[#12203a] px-5 py-2.5 rounded-md font-semibold text-sm transition-colors"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}