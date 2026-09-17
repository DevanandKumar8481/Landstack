import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Search,
  FileCheck,
  Activity,
  Receipt,
  Building2,
  Scale,
  AlertTriangle,
  MapPinned,
  Map,
  FileSignature,
  LayoutGrid,
  Landmark,
  BrainCircuit,
  Radar,
  LayoutDashboard,
  ArrowRight,
  Users,
} from "lucide-react";

const NAVY = "#14283F";

const citizenServices = [
  {
    icon: Search,
    title: "Search Land Parcel",
    description: "Find a parcel by khasra number, owner, or location.",
    to: "/landrecords",
  },
  {
    icon: FileCheck,
    title: "Ownership Verification",
    description: "View Record of Rights (RoR) and ownership details.",
    to: "/ownership",
  },
  {
    icon: Activity,
    title: "Track Mutation Status",
    description: "Monitor a mutation application's progress.",
    to: "/Mutation",
  },
  {
    icon: Receipt,
    title: "Property Tax",
    description: "Check dues and past payment history.",
    to: "/PropertyTax",
  },
  {
    icon: Building2,
    title: "Building Permission",
    description: "Apply for and track building approvals.",
    to: "/BuildingPermission",
  },
  {
    icon: Scale,
    title: "Raise Land Dispute",
    description: "Register a dispute and follow its resolution.",
    to: "/services/land-dispute",
  },
  {
    icon: AlertTriangle,
    title: "Report Encroachment",
    description: "Report unauthorized occupation of land.",
    to: "/services/report-encroachment",
  },
];

const governmentServices = [
  {
    icon: MapPinned,
    title: "Field Survey Management",
    description: "Coordinate and monitor field survey operations.",
    to: "/FieldManagement",
  },
  {
    icon: Map,
    title: "GIS Parcel Mapping",
    description: "Edit and review parcel boundaries on GIS layers.",
    to: "/gis-map",
  },
  {
    icon: FileSignature,
    title: "Land Registration",
    description: "Process and record new land registrations.",
    to: "/LandRegistration",
  },
  {
    icon: LayoutGrid,
    title: "Planning & Zoning",
    description: "Manage zoning classifications and land-use plans.",
    to: "/planning-zoning",
  },
  {
    icon: Landmark,
    title: "Property Tax Administration",
    description: "Administer tax assessments and collections.",
    to: "/property-tax-admin",
  },
  {
    icon: BrainCircuit,
    title: "AI Risk Analysis",
    description: "Flag anomalies and risk patterns across records.",
    to: "/gov/ai-risk-analysis",
  },
  {
    icon: Radar,
    title: "Encroachment Monitoring",
    description: "Track and act on reported encroachment cases.",
    to: "/gov/encroachment-monitoring",
  },
  {
    icon: LayoutDashboard,
    title: "Department Dashboard",
    description: "See department metrics and activity at a glance.",
    to: "/field-officer",
  },
];

function AllServicesPage() {
  const [activeTab, setActiveTab] = useState("citizen");

  const activeList = activeTab === "citizen" ? citizenServices : governmentServices;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Page header */}
      <section
        className="bg-gradient-to-br from-[#EAF2F8] via-[#F3F7FA] to-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-14">
        
          <h1 className="text-3xl sm:text-4xl font-serif font-bold" style={{ color: NAVY }}>
            All Services
          </h1>
          <p className="text-slate-600 mt-3 max-w-2xl text-sm sm:text-base leading-relaxed">
            Browse citizen-facing services and department tools available on the digital land
            records platform.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="inline-flex bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab("citizen")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold transition-colors ${
              activeTab === "citizen"
                ? "text-white"
                : "text-slate-600 hover:text-slate-800"
            }`}
            style={activeTab === "citizen" ? { backgroundColor: NAVY } : {}}
          >
            <Users size={16} />
            Citizen Services
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("government")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold transition-colors ${
              activeTab === "government"
                ? "text-white"
                : "text-slate-600 hover:text-slate-800"
            }`}
            style={activeTab === "government" ? { backgroundColor: NAVY } : {}}
          >
            <Landmark size={16} />
            Government / Department
          </button>
        </div>
      </div>

      {/* Services grid */}
      <section className="max-w-7xl mx-auto px-4 py-10 sm:py-12">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-2">
          <div>
            <p className="text-xs font-semibold tracking-wide uppercase text-amber-600 mb-1">
              {activeTab === "citizen" ? "For citizens" : "For officials"}
            </p>
            <h2 className="text-2xl font-serif font-bold" style={{ color: NAVY }}>
              {activeTab === "citizen" ? "Citizen Services" : "Government Services"}
            </h2>
          </div>
          <span className="text-sm text-slate-500">
            {activeList.length} service{activeList.length !== 1 ? "s" : ""} available
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeList.map((service) => (
            <ServiceCard key={service.to} {...service} />
          ))}
        </div>
      </section>
    </div>
  );
}

/* Individual service card */
function ServiceCard({ icon: Icon, title, description, to }) {
  return (
    <Link
      to={to}
      className="group border border-slate-200 bg-white rounded-lg p-6 hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all block"
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-white transition-transform group-hover:scale-105"
        style={{ backgroundColor: NAVY }}
      >
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-bold" style={{ color: NAVY }}>
        {title}
      </h3>
      <p className="text-sm text-slate-600 mt-2 leading-relaxed">{description}</p>
      <span
        className="mt-5 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
        style={{ color: NAVY }}
      >
        Open Service
        <ArrowRight size={15} />
      </span>
    </Link>
  );
}

export default AllServicesPage;