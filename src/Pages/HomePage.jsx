import digitalindia from "../assets/digitalindia.svg";
import LandMap from "../assets/LandMap.jpeg";
import AffiliatedDepartments from "../Components/affilated";
import { Link } from "react-router-dom";
import Landrecord from "../icons/Landrecord.png";
import Landmap from "../icons/Landmap.jpg";
import Verification from "../icons/Verification.jpg";
import Mutation from "../icons/Mutation.png";
import {
  MapPinned,
  FileText,
  ShieldCheck,
  ArrowRight,
  Bell,
  ChevronLeft,
  ChevronRight,
  Users,
  FileCheck2,
} from "lucide-react";

import { useState, useEffect } from "react";

import banner1 from "../Banner/1.jpeg";
import banner2 from "../Banner/2.jpeg";
import banner3 from "../Banner/3.jpeg";
import banner4 from "../Banner/4.jpeg";
import banner5 from "../Banner/5.jpeg";
import banner6 from "../Banner/6.jpeg";
import banner7 from "../Banner/7.jpeg";
import banner8 from "../Banner/8.jpeg";

const NAVY = "#14283F";

function HomePage() {
  const slides = [
    { image: banner1 },
    { image: banner2 },
    { image: banner3 },
    { image: banner4 },
    { image: banner5 },
    { image: banner6 },
    { image: banner7 },
    { image: banner8 },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">

      {/* Notice bar */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-start gap-2.5 sm:gap-3">
          <Bell size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-amber-900 leading-snug">
            <span className="font-semibold">Important Notice:</span> Citizens can now access digital
            land records and ownership verification services online.
          </p>
        </div>
      </div>

      <section className="relative overflow-hidden">
        {/* Slider */}
        <div className="relative h-[220px] xs:h-[260px] sm:h-[380px] md:h-[460px] lg:h-[550px] bg-slate-200">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            >
              <img src={slide.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          ))}

          <button
            type="button"
            onClick={() => setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)}
            aria-label="Previous slide"
            className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md p-1.5 sm:p-3 rounded-full text-white hover:bg-white hover:text-[#14283F] transition-colors"
          >
            <ChevronLeft size={18} className="sm:hidden" />
            <ChevronLeft size={22} className="hidden sm:block" />
          </button>

          <button
            type="button"
            onClick={() => setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)}
            aria-label="Next slide"
            className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md p-1.5 sm:p-3 rounded-full text-white hover:bg-white hover:text-[#14283F] transition-colors"
          >
            <ChevronRight size={18} className="sm:hidden" />
            <ChevronRight size={22} className="hidden sm:block" />
          </button>

          <div className="absolute bottom-3 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2.5 z-20">
            {slides.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-1.5 sm:h-2.5 rounded-full transition-all ${currentSlide === index ? "w-5 sm:w-8 bg-amber-500" : "w-1.5 sm:w-2.5 bg-white/70 hover:bg-white"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Trust info strip */}
        <div className="bg-white shadow-sm relative z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div className="flex items-center justify-center sm:justify-center gap-3 p-4 sm:p-5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                <ShieldCheck size={17} className="text-emerald-600 sm:hidden" />
                <ShieldCheck size={19} className="text-emerald-600 hidden sm:block" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Platform Security</p>
                <p className="text-sm sm:text-base font-semibold" style={{ color: NAVY }}>
                  Secure &amp; Verified
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 p-4 sm:p-5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <FileText size={17} style={{ color: NAVY }} className="sm:hidden" />
                <FileText size={19} style={{ color: NAVY }} className="hidden sm:block" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Digital Records</p>
                <p className="text-sm sm:text-base font-semibold" style={{ color: NAVY }}>
                  1.2M+ Records
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 p-4 sm:p-5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                <MapPinned size={17} className="text-amber-600 sm:hidden" />
                <MapPinned size={19} className="text-amber-600 hidden sm:block" />
              </div>
              <div>
                <p className="text-xs text-slate-500">GIS Mapping</p>
                <p className="text-sm sm:text-base font-semibold" style={{ color: NAVY }}>
                  Accurate Land Maps
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main id="main-content">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#EAF2F8] via-[#F3F7FA] to-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
              {/* Left */}
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-100 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-sm font-semibold mb-4 sm:mb-5" style={{ color: NAVY }}>
                  <ShieldCheck size={14} className="sm:hidden" />
                  <ShieldCheck size={16} className="hidden sm:block" />
                  Secure Government Digital Service
                </div>

                <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight" style={{ color: NAVY }}>
                  Digital Land Records
                  <span className="block text-emerald-700 mt-1.5 sm:mt-2">
                    Simple. Secure. Transparent.
                  </span>
                </h2>

                <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-slate-600 max-w-xl leading-relaxed">
                  Access, search and verify land ownership records through a unified digital
                  platform designed to provide transparent and citizen-friendly services.
                </p>

                <div className="mt-6 sm:mt-8 flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4">
                  <Link
                    to="/landrecords"
                    className="!text-white inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-md font-semibold text-sm sm:text-base hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: NAVY }}
                  >
                    Search Land Records
                    <ArrowRight size={17} />
                  </Link>

                  <Link
                    to="/services"
                    className="border-2 inline-flex items-center justify-center px-5 sm:px-6 py-3 rounded-md font-semibold text-sm sm:text-base bg-white hover:bg-slate-50 transition-colors"
                    style={{ borderColor: NAVY, color: NAVY }}
                  >
                    View All Services
                  </Link>
                </div>

                <div className="mt-8 sm:mt-10 flex flex-col xs:flex-row xs:items-center gap-2.5 xs:gap-6 text-xs sm:text-sm text-slate-500 ">
                  <div className="flex items-center gap-2">
                    <Users size={15} className="text-slate-400 shrink-0" />
                    300K+ registered citizens
                  </div>
                  <div className="flex items-center gap-2">
                    <FileCheck2 size={15} className="text-slate-400 shrink-0" />
                    950K+ verified properties
                  </div>
                </div>
              </div>

              {/* Land Parcel Map panel */}
              <div className="order-1 lg:order-2 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                <div className="px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between" style={{ backgroundColor: NAVY }}>
                  <div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white">
                      Land Parcel Map
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-100/90 mt-0.5 sm:mt-1">
                      GIS view of registered land plots
                    </p>
                  </div>
                  <MapPinned size={19} className="text-white/80 shrink-0 sm:hidden" />
                  <MapPinned size={22} className="text-white/80 shrink-0 hidden sm:block" />
                </div>

                <div className="relative h-48 xs:h-56 sm:h-64 lg:h-80 bg-emerald-50 overflow-hidden">
                  <img
                    src={LandMap}
                    alt="Land parcel map showing plot boundaries"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-white/95 backdrop-blur px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md shadow text-[11px] sm:text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-600" />
                    Live GIS Data
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-slate-600 mb-4 sm:mb-5 flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm bg-[#BFE3C6] border border-emerald-600" />
                      Agricultural
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm bg-[#BFDDF2] border border-[#14283F]" />
                      Residential
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm bg-[#F6D9A8] border border-orange-600" />
                      Commercial
                    </span>
                  </div>

                  <Link
                    to="/gis-map"
                    className="!text-white w-full inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-md font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: NAVY }}
                  >
                    View Full Land Map
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="max-w-7xl mx-auto px-4 py-10 sm:py-14 lg:py-16">
          <div className="flex flex-col xs:flex-row xs:items-end xs:justify-between gap-2 sm:gap-3 mb-6 sm:mb-8">
            <div>
              <p className="text-[11px] sm:text-xs font-semibold tracking-wide uppercase text-amber-600 mb-1">
                At a glance
              </p>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold" style={{ color: NAVY }}>
                Portal Statistics
              </h2>
              <p className="text-slate-500 mt-1 text-xs sm:text-sm lg:text-base">
                Overview of digital land services
              </p>
            </div>
            <span className="text-xs sm:text-sm text-slate-500">Last updated: August 2026</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {[
              { label: "Digital Land Records", value: "1.2M+", color: NAVY, border: NAVY },
              { label: "Verified Properties", value: "950K+", color: "#047857", border: "#059669" },
              { label: "Registered Citizens", value: "300K+", color: "#c2410c", border: "#f97316" },
              { label: "Applications Processed", value: "2.5M+", color: "#7e22ce", border: "#a855f7" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white border-y border-r border-slate-200 rounded-r-lg p-3.5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
                style={{ borderLeft: `4px solid ${stat.border}` }}
              >
                <p className="text-[11px] sm:text-sm text-slate-500 leading-tight">{stat.label}</p>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-1.5 sm:mt-2" style={{ color: stat.color }}>
                  {stat.value}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="bg-white border-y border-slate-200 py-10 sm:py-14 lg:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8 sm:mb-10">
              <p className="text-[11px] sm:text-xs font-semibold tracking-wide uppercase text-amber-600 mb-1">
                What we offer
              </p>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold" style={{ color: NAVY }}>
                Citizen Services
              </h2>
              <p className="text-slate-500 mt-2 text-xs sm:text-sm lg:text-base">
                Access important land-related government services
              </p>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
              <ServiceCard
                iconSrc={Landrecord}
                iconAlt="Land Records"
                title="Land Records"
                description="View and download digital land ownership records."
                to="/landrecords"
              />
              <ServiceCard
                iconSrc={Landmap}
                iconAlt="Land Mapping"
                title="Land Mapping"
                description="View property boundaries and digital land maps."
                to="/gis-map"
              />
              <ServiceCard
                iconSrc={Verification}
                iconAlt="Ownership Verification"
                title="Ownership Verification"
                description="Verify land ownership and property details."
                to="/ownership"
              />
              <ServiceCard
                iconSrc={Mutation}
                iconAlt="Mutation Services"
                title="Mutation Services"
                description="Apply and track land mutation applications."
                to="/Mutation"
              />
            </div>
          </div>
        </section>
      </main>

      <AffiliatedDepartments />

      {/* Footer */}
      <footer className="text-white" style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto px-4 py-9 sm:py-12">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-7 sm:gap-10">
            <div className="xs:col-span-2 md:col-span-1">
              <h3 className="text-xl sm:text-2xl font-serif font-bold">LandStack</h3>
              <p className="text-blue-100/80 mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed">
                Digital Land Records &amp; Management Portal providing transparent, secure and
                accessible government services.
              </p>
              <img src={digitalindia} alt="Digital India" className="h-8 sm:h-9 w-auto mt-4 sm:mt-5 opacity-90" />
            </div>

            <div>
              <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4 text-white">Quick Links</h4>
              <div className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-blue-100/80">
                <FooterLink label="Land Records" to="/landrecords" />
                <FooterLink label="Citizen Services" to="/services" />
                <FooterLink label="Applications" to="/applications" />
                <FooterLink label="Reports" to="/reports" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4 text-white">Information</h4>
              <div className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-blue-100/80">
                <FooterLink label="Privacy Policy" to="/privacy-policy" />
                <FooterLink label="Terms & Conditions" to="/terms-conditions" />
                <FooterLink label="Accessibility Statement" to="/accessibility-statement" />
                <FooterLink label="Website Policies" to="/website-policies" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4 text-white">Important Links</h4>
              <div className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-blue-100/80">
                <FooterLink label="Help & Support" to="/help" />
                <FooterLink label="Contact Us" to="/contact-us" />
                <FooterLink label="Download Forms" to="/download-forms" />
                <FooterLink label="RTI" to="/rti" />
                <FooterLink label="Grievance Redressal" to="/grievance-redressal" />
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 sm:mt-10 pt-4 sm:pt-5 text-center text-[11px] sm:text-sm text-blue-200/80">
            <p>© 2026 LandStack. All Rights Reserved.</p>
            <p className="mt-1">This is a prototype digital government portal.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* Service Card */
function ServiceCard({ iconSrc, iconAlt, title, description, to = "/cservices" }) {
  return (
    <Link
      to={to}
      className="group border border-slate-200 bg-slate-50 rounded-lg p-4 sm:p-6 hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all block"
    >
      <div className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 overflow-hidden rounded-lg bg-white border border-slate-200 flex items-center justify-center mb-3 sm:mb-4 p-1.5 transition-transform group-hover:scale-105">
        <img
          src={iconSrc}
          alt={iconAlt}
          className="max-w-full max-h-full w-auto h-auto object-contain"
        />
      </div>
      <h3 className="text-base sm:text-lg font-bold" style={{ color: NAVY }}>
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-slate-600 mt-1.5 sm:mt-2 leading-relaxed">{description}</p>
      <span
        className="mt-3.5 sm:mt-5 text-xs sm:text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
        style={{ color: NAVY }}
      >
        View Service
        <ArrowRight size={14} />
      </span>
    </Link>
  );
}

/* Footer link  */
function FooterLink({ label, to }) {
  return (
    <Link
      to={to || "#"}
      className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer"
    >
      <ChevronRight size={12} className="shrink-0" />
      {label}
    </Link>
  );
}

export default HomePage;
