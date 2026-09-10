import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FileBarChart2,
  ClipboardList,
  FileCheck2,
  AlertTriangle,
  MapPinned,
  Receipt,
  ShieldCheck,
  Search,
  Download,
  Calendar,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

const NAVY = "#14283F";

const quickStats = [
  { label: "Reports Generated (Aug 2026)", value: "1,284" },
  { label: "Pending Reviews", value: "37" },
  { label: "Avg. Processing Time", value: "6.2 days" },
  { label: "Districts Covered", value: "42" },
];

const reportCategories = [
  {
    icon: ClipboardList,
    name: "Mutation Reports",
    description: "District-wise summary of processed and pending mutation applications.",
    to: "/reports/mutations",
  },
  {
    icon: FileCheck2,
    name: "Ownership Verification Reports",
    description: "RoR issuance volumes and verification turnaround by office.",
    to: "/reports/ownership",
  },
  {
    icon: AlertTriangle,
    name: "Encroachment Reports",
    description: "Reported, investigated, and resolved encroachment cases.",
    to: "/reports/encroachment",
  },
  {
    icon: MapPinned,
    name: "Survey Reports",
    description: "Field survey completion status across parcels and zones.",
    to: "/reports/survey",
  },
  {
    icon: Receipt,
    name: "Property Tax Reports",
    description: "Collection totals, dues, and defaulter summaries by district.",
    to: "/reports/property-tax",
  },
  {
    icon: ShieldCheck,
    name: "Grievance Resolution Reports",
    description: "Grievance volumes, resolution time, and escalation rates.",
    to: "/reports/grievance",
  },
];

const districts = ["All Districts", "Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"];
const reportTypes = ["All Types", "Mutation", "Ownership", "Encroachment", "Survey", "Property Tax", "Grievance"];

const recentReports = [
  {
    name: "Monthly Mutation Summary — August 2026",
    type: "Mutation",
    district: "Indore",
    date: "01 Sep 2026",
    format: "PDF",
  },
  {
    name: "Ownership Verification Turnaround — Q2 2026",
    type: "Ownership",
    district: "Bhopal",
    date: "28 Aug 2026",
    format: "XLSX",
  },
  {
    name: "Encroachment Case Status — August 2026",
    type: "Encroachment",
    district: "Gwalior",
    date: "27 Aug 2026",
    format: "PDF",
  },
  {
    name: "Field Survey Completion — Zone 3",
    type: "Survey",
    district: "Jabalpur",
    date: "25 Aug 2026",
    format: "XLSX",
  },
  {
    name: "Property Tax Collection — August 2026",
    type: "Property Tax",
    district: "Ujjain",
    date: "24 Aug 2026",
    format: "PDF",
  },
  {
    name: "Grievance Resolution Time Report",
    type: "Grievance",
    district: "Indore",
    date: "20 Aug 2026",
    format: "PDF",
  },
];

export default function Reports() {
  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState(districts[0]);
  const [type, setType] = useState(reportTypes[0]);

  const filteredReports = useMemo(() => {
    return recentReports.filter((r) => {
      const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
      const matchesDistrict = district === "All Districts" || r.district === district;
      const matchesType = type === "All Types" || r.type === type;
      return matchesSearch && matchesDistrict && matchesType;
    });
  }, [search, district, type]);

  return (
    <main id="main-content" className="bg-white">
      {/* Page intro */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14">
          <p className="text-sm text-slate-500">
            <Link to="/" className="hover:text-amber-600">
              Home
            </Link>{" "}
            <span className="mx-1">/</span> Reports
          </p>
          <h1
            className="mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl"
            style={{ color: NAVY }}
          >
            Reports &amp; Analytics
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
            Track mutation, verification, and grievance activity across districts —
            generate, filter, and download reports for your department.
          </p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="max-w-7xl mx-auto px-4 -mt-6 sm:-mt-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {quickStats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-medium text-slate-400">{s.label}</p>
              <p className="mt-1.5 text-2xl font-bold" style={{ color: NAVY }}>
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Report categories */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="font-serif text-xl font-bold sm:text-2xl" style={{ color: NAVY }}>
          Report Categories
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Jump to a category to view detailed, district-wise breakdowns.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reportCategories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.to}
              className="group flex flex-col rounded-lg border border-slate-200 p-5 transition-colors hover:border-amber-400 hover:bg-slate-50"
            >
              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-md"
                style={{ backgroundColor: `${NAVY}0D` }}
              >
                <cat.icon size={19} style={{ color: NAVY }} strokeWidth={1.75} />
              </div>
              <h3 className="text-sm font-semibold" style={{ color: NAVY }}>
                {cat.name}
              </h3>
              <p className="mt-1 flex-1 text-xs leading-relaxed text-slate-500">
                {cat.description}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-amber-600 transition-colors group-hover:text-amber-700">
                View reports
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Filters + report table */}
      <div className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-bold sm:text-2xl" style={{ color: NAVY }}>
                Recent Reports
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Filter by district or type, then download what you need.
              </p>
            </div>
          </div>

          {/* Filter bar */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 sm:max-w-xs">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search reports..."
                className="w-full rounded-md border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="relative">
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full appearance-none rounded-md border border-slate-300 bg-white py-2.5 pl-3 pr-9 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 sm:w-44"
              >
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            <div className="relative">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full appearance-none rounded-md border border-slate-300 bg-white py-2.5 pl-3 pr-9 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 sm:w-44"
              >
                {reportTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          {/* Table */}
          <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3">Report</th>
                  <th className="hidden px-5 py-3 sm:table-cell">District</th>
                  <th className="hidden px-5 py-3 md:table-cell">Date</th>
                  <th className="px-5 py-3">Format</th>
                  <th className="px-5 py-3 text-right">Download</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-400">
                      No reports match your filters.
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((r) => (
                    <tr key={r.name} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50">
                      <td className="px-5 py-3.5">
                        <p className="font-medium" style={{ color: NAVY }}>
                          {r.name}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400 sm:hidden">
                          <Calendar size={11} />
                          {r.date} · {r.district}
                        </p>
                      </td>
                      <td className="hidden px-5 py-3.5 text-slate-500 sm:table-cell">{r.district}</td>
                      <td className="hidden px-5 py-3.5 text-slate-500 md:table-cell">{r.date}</td>
                      <td className="px-5 py-3.5">
                        <span className="rounded border border-slate-200 px-2 py-0.5 text-xs font-medium text-slate-500">
                          {r.format}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          type="button"
                          aria-label={`Download ${r.name}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-amber-600"
                        >
                          <Download size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Custom report CTA */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div
          className="flex flex-col items-start gap-4 rounded-lg px-6 py-8 sm:flex-row sm:items-center sm:justify-between"
          style={{ backgroundColor: NAVY }}
        >
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white/10">
              <FileBarChart2 size={20} className="text-amber-400" />
            </div>
            <div>
              <p className="text-base font-semibold text-white">Need a custom report?</p>
              <p className="mt-1 text-sm text-white/70">
                Departments can request a tailored report with specific filters and date ranges.
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-amber-500 px-5 py-2.5 text-sm font-semibold text-[#12203a] transition-colors hover:bg-amber-400"
          >
            Request a report
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </main>
  );
}