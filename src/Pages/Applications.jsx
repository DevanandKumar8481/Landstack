import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  Search,
  FileText,
  Filter,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  Download,
  Eye,
} from "lucide-react";

const NAVY = "#14283F";

/* Mock application data - replace with API data */
const applicationsData = [
  {
    id: "APP-2026-10231",
    type: "Mutation",
    title: "Land Mutation - Khasra No. 245/2",
    submittedOn: "2026-08-28",
    status: "pending",
    department: "Revenue Department",
  },
  {
    id: "APP-2026-10198",
    type: "Building Permission",
    title: "Residential Building Approval - Sector 12",
    submittedOn: "2026-08-20",
    status: "approved",
    department: "Urban Development",
  },
  {
    id: "APP-2026-10176",
    type: "Ownership Verification",
    title: "RoR Verification Request - Plot 88A",
    submittedOn: "2026-08-15",
    status: "in-review",
    department: "Revenue Department",
  },
  {
    id: "APP-2026-10142",
    type: "Land Dispute",
    title: "Boundary Dispute Resolution - Village Rampur",
    submittedOn: "2026-08-05",
    status: "rejected",
    department: "Legal Cell",
  },
  {
    id: "APP-2026-10099",
    type: "Property Tax",
    title: "Tax Reassessment Request - Ward 4",
    submittedOn: "2026-07-29",
    status: "approved",
    department: "Municipal Corporation",
  },
  {
    id: "APP-2026-10087",
    type: "Encroachment Report",
    title: "Unauthorized Occupation Report - Khasra 512",
    submittedOn: "2026-07-22",
    status: "in-review",
    department: "Revenue Department",
  },
];

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    text: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  "in-review": {
    label: "In Review",
    icon: AlertCircle,
    text: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  approved: {
    label: "Approved",
    icon: CheckCircle2,
    text: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    text: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
  },
};

const filterTabs = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "in-review", label: "In Review" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
];

function Applications() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApplications = useMemo(() => {
    return applicationsData.filter((app) => {
      const matchesFilter = activeFilter === "all" || app.status === activeFilter;
      const matchesSearch =
        app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const counts = useMemo(() => {
    const base = { all: applicationsData.length, pending: 0, "in-review": 0, approved: 0, rejected: 0 };
    applicationsData.forEach((app) => {
      base[app.status] += 1;
    });
    return base;
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Page header */}
      <section className="bg-gradient-to-br from-[#EAF2F8] via-[#F3F7FA] to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-14">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-5" style={{ color: NAVY }}>
                <FileText size={16} />
                Application Tracking
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold" style={{ color: NAVY }}>
                My Applications
              </h1>
              <p className="text-slate-600 mt-3 max-w-2xl text-sm sm:text-base leading-relaxed">
                Track the status of all your submitted applications — mutations, permissions,
                verifications, and more — in one place.
              </p>
            </div>

            <Link
              to="/cservices"
              className="!text-white inline-flex items-center gap-2 px-5 py-3 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity shrink-0"
              style={{ backgroundColor: NAVY }}
            >
              <Plus size={18} />
              New Application
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12">
        {/* Summary stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {[
            { key: "pending", label: "Pending", value: counts.pending, color: "#c2410c", border: "#f97316" },
            { key: "in-review", label: "In Review", value: counts["in-review"], color: "#1d4ed8", border: "#3b82f6" },
            { key: "approved", label: "Approved", value: counts.approved, color: "#047857", border: "#059669" },
            { key: "rejected", label: "Rejected", value: counts.rejected, color: "#b91c1c", border: "#ef4444" },
          ].map((stat) => (
            <div
              key={stat.key}
              className="bg-white border-y border-r border-slate-200 rounded-r-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              style={{ borderLeft: `4px solid ${stat.border}` }}
            >
              <p className="text-sm text-slate-500">{stat.label}</p>
              <h3 className="text-3xl font-bold mt-2" style={{ color: stat.color }}>
                {stat.value}
              </h3>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* Search */}
            <div className="flex border border-slate-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#14283F]/20 focus-within:border-[#14283F] transition-shadow max-w-md w-full">
              <div className="pl-3.5 pr-2 flex items-center">
                <Search size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by application ID, title, or type"
                className="flex-1 py-2.5 outline-none text-sm placeholder:text-slate-400"
              />
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveFilter(tab.key)}
                  className={`px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors border ${
                    activeFilter === tab.key
                      ? "!text-white border-transparent"
                      : "text-slate-600 border-slate-300 hover:bg-slate-50"
                  }`}
                  style={activeFilter === tab.key ? { backgroundColor: NAVY } : {}}
                >
                  {tab.label}
                  <span
                    className={`ml-1.5 ${
                      activeFilter === tab.key ? "text-blue-100" : "text-slate-400"
                    }`}
                  >
                    ({counts[tab.key]})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Applications list */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          {filteredApplications.length === 0 ? (
            <div className="p-14 text-center">
              <Filter size={32} className="mx-auto text-slate-300 mb-3" />
              <p className="text-slate-500 font-medium">No applications match your search.</p>
              <p className="text-slate-400 text-sm mt-1">Try a different keyword or filter.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredApplications.map((app) => {
                const status = statusConfig[app.status];
                const StatusIcon = status.icon;
                return (
                  <div
                    key={app.id}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span className="text-xs font-mono text-slate-400">{app.id}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                          {app.type}
                        </span>
                      </div>
                      <h3 className="font-semibold text-slate-800 truncate">{app.title}</h3>
                      <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={13} />
                          Submitted {new Date(app.submittedOn).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <span>{app.department}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${status.bg} ${status.text} ${status.border}`}
                      >
                        <StatusIcon size={13} />
                        {status.label}
                      </span>

                      <button
                        type="button"
                        className="p-2 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                        aria-label="View application"
                      >
                        <Eye size={16} />
                      </button>

                      {app.status === "approved" && (
                        <button
                          type="button"
                          className="p-2 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                          aria-label="Download document"
                        >
                          <Download size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Help footer note */}
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-5 flex items-start gap-3">
          <AlertCircle size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-900">
            Need help with an application?{" "}
            <Link to="/help-support" className="font-semibold underline hover:text-blue-700">
              Visit Help & Support
            </Link>{" "}
            or{" "}
            <Link to="/contact-us" className="font-semibold underline hover:text-blue-700">
              contact us
            </Link>{" "}
            for assistance.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Applications;