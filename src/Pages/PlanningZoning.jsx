import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  FileText,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Building2,
  Layers,
  BarChart3,
  Filter,
  Search,
  Download,
  Phone,
  Mail,
  MapIcon,
  ChevronDown,
  Zap,
} from "lucide-react";

const NAVY = "#14283F";

function PlanningZoning() {
  const [activeTab, setActiveTab] = useState("zones");
  const [selectedZone, setSelectedZone] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const zoningTypes = [
    {
      id: "r1",
      name: "Residential - Single Family (R-1)",
      color: "bg-blue-100 border-blue-300",
      colorDot: "bg-blue-500",
      description: "Single-family residential properties",
      density: "Low",
      minLotSize: "5,000 sq ft",
      maxHeight: "35 ft",
      allowedUses: ["Single-family homes", "Accessory dwelling units", "Home offices"],
      restrictions: ["No commercial activities", "Maximum 1 dwelling unit per lot"],
      coverage: "~15% of total area",
    },
    {
      id: "r2",
      name: "Residential - Multi-Family (R-2)",
      color: "bg-cyan-100 border-cyan-300",
      colorDot: "bg-cyan-500",
      description: "Multi-family residential properties",
      density: "Medium",
      minLotSize: "3,000 sq ft",
      maxHeight: "55 ft",
      allowedUses: ["Apartments", "Townhouses", "Condominiums", "Mixed-use residential"],
      restrictions: ["Limited commercial use", "Parking requirements apply"],
      coverage: "~25% of total area",
    },
    {
      id: "c1",
      name: "Commercial - Local (C-1)",
      color: "bg-orange-100 border-orange-300",
      colorDot: "bg-orange-500",
      description: "Neighborhood commercial zones",
      density: "Medium",
      minLotSize: "2,000 sq ft",
      maxHeight: "75 ft",
      allowedUses: ["Retail stores", "Restaurants", "Professional offices", "Banks"],
      restrictions: ["No heavy manufacturing", "Limited industrial activities"],
      coverage: "~10% of total area",
    },
    {
      id: "c2",
      name: "Commercial - Regional (C-2)",
      color: "bg-amber-100 border-amber-300",
      colorDot: "bg-amber-500",
      description: "Major commercial zones",
      density: "High",
      minLotSize: "1,500 sq ft",
      maxHeight: "120 ft",
      allowedUses: ["Shopping centers", "Hotels", "Office buildings", "Major retail"],
      restrictions: ["Conditional use permit required for some uses"],
      coverage: "~8% of total area",
    },
    {
      id: "i1",
      name: "Industrial - Light (I-1)",
      color: "bg-gray-100 border-gray-300",
      colorDot: "bg-gray-600",
      description: "Light industrial and manufacturing",
      density: "Medium",
      minLotSize: "5,000 sq ft",
      maxHeight: "65 ft",
      allowedUses: ["Assembly", "Manufacturing", "Warehousing", "Laboratories"],
      restrictions: ["Noise and emission controls", "Buffer zone required"],
      coverage: "~12% of total area",
    },
    {
      id: "i2",
      name: "Industrial - Heavy (I-2)",
      color: "bg-slate-100 border-slate-300",
      colorDot: "bg-slate-700",
      description: "Heavy industrial operations",
      density: "Low",
      minLotSize: "10,000 sq ft",
      maxHeight: "85 ft",
      allowedUses: ["Heavy manufacturing", "Processing plants", "Bulk storage"],
      restrictions: ["Strict environmental controls", "Large buffer zones required"],
      coverage: "~5% of total area",
    },
    {
      id: "ag",
      name: "Agricultural (AG)",
      color: "bg-green-100 border-green-300",
      colorDot: "bg-green-600",
      description: "Agricultural and open space",
      density: "Very Low",
      minLotSize: "20,000 sq ft",
      maxHeight: "35 ft",
      allowedUses: ["Farming", "Forestry", "Open space", "Farm structures"],
      restrictions: ["Limited residential development", "No industrial use"],
      coverage: "~25% of total area",
    },
  ];

  const filteredZones = zoningTypes.filter((zone) =>
    zone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    zone.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const regulations = [
    {
      title: "Building Height Restrictions",
      desc: "Maximum building height varies by zone from 35 ft in residential to 120 ft in regional commercial.",
      icon: Building2,
    },
    {
      title: "Lot Coverage Limits",
      desc: "Maximum percentage of lot that can be covered by building structures, typically 60-80%.",
      icon: Layers,
    },
    {
      title: "Setback Requirements",
      desc: "Minimum distances buildings must be set back from property lines and streets.",
      icon: MapPin,
    },
    {
      title: "Parking Standards",
      desc: "Required number of parking spaces based on use type and square footage.",
      icon: BarChart3,
    },
  ];

  const permissions = [
    { type: "Permitted", desc: "Allowed by right without special approval" },
    { type: "Conditional Use", desc: "Allowed with special permit and conditions" },
    { type: "Variance", desc: "Requires Board approval to deviate from regulations" },
    { type: "Non-Conforming", desc: "Existing uses that don't comply with current zoning" },
  ];

  const developmentProcess = [
    {
      step: 1,
      title: "Pre-Application Consultation",
      desc: "Meet with planning staff to review project requirements",
      timeline: "1-2 weeks",
    },
    {
      step: 2,
      title: "Submit Application",
      desc: "Complete zoning application with site plans and documentation",
      timeline: "1 week",
    },
    {
      step: 3,
      title: "Application Review",
      desc: "Planning department reviews completeness and compliance",
      timeline: "2-3 weeks",
    },
    {
      step: 4,
      title: "Public Notice",
      desc: "Notice published for public comment period",
      timeline: "2 weeks",
    },
    {
      step: 5,
      title: "Planning Board Review",
      desc: "Board hearing and recommendation on application",
      timeline: "3-4 weeks",
    },
    {
      step: 6,
      title: "Decision & Permits",
      desc: "Final decision issued and permits granted if approved",
      timeline: "1-2 weeks",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto w-full px-4 py-10 sm:py-14 lg:py-16">
        {/* Zoning Map & Info */}
        <section id="zones-section" className="mb-12 sm:mb-16">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-2" style={{ color: NAVY }}>
              Zoning Classifications
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Explore all zoning categories and their specific regulations
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search zones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              />
            </div>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium"
            >
              <Filter size={18} />
              Filters
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium" style={{ backgroundColor: NAVY }}>
              <Download size={18} />
              Export
            </button>
          </div>

          {/* Zones Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredZones.map((zone) => (
              <div
                key={zone.id}
                onClick={() => setSelectedZone(selectedZone?.id === zone.id ? null : zone)}
                className={`border-2 rounded-lg p-5 sm:p-6 cursor-pointer transition-all hover:shadow-md ${
                  selectedZone?.id === zone.id
                    ? `${zone.color} ring-2 ring-emerald-500`
                    : "bg-white border-slate-200 hover:border-emerald-300"
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-4 h-4 rounded-full mt-1 shrink-0 ${zone.colorDot}`} />
                  <div className="flex-1">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">{zone.name}</h3>
                    <p className="text-xs text-slate-600 mt-1">{zone.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-slate-100 px-2 py-1 rounded">Density: {zone.density}</span>
                  <span className="text-xs bg-slate-100 px-2 py-1 rounded">Coverage: {zone.coverage}</span>
                </div>

                {selectedZone?.id === zone.id && (
                  <div className="border-t border-slate-300 pt-4 mt-4 space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-slate-700 mb-1">Min Lot Size</p>
                      <p className="text-sm text-slate-600">{zone.minLotSize}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-700 mb-1">Max Height</p>
                      <p className="text-sm text-slate-600">{zone.maxHeight}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-700 mb-2">Allowed Uses</p>
                      <ul className="space-y-1">
                        {zone.allowedUses.map((use, idx) => (
                          <li key={idx} className="text-xs text-slate-600 flex items-center gap-2">
                            <span className="w-1 h-1 bg-slate-400 rounded-full" />
                            {use}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-700 mb-2">Restrictions</p>
                      <ul className="space-y-1">
                        {zone.restrictions.map((restriction, idx) => (
                          <li key={idx} className="text-xs text-red-600 flex items-center gap-2">
                            <AlertCircle size={12} className="shrink-0" />
                            {restriction}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredZones.length === 0 && (
            <div className="text-center py-12 bg-white border border-slate-200 rounded-lg">
              <Search size={32} className="mx-auto text-slate-300 mb-3" />
              <p className="text-slate-600 text-sm">No zones match your search</p>
            </div>
          )}
        </section>

        {/* Regulations Section */}
        <section className="mb-12 sm:mb-16">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-2" style={{ color: NAVY }}>
              Development Regulations
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Key regulations that apply across all zones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regulations.map((reg, idx) => {
              const Icon = reg.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                      <Icon size={24} className="text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 text-sm sm:text-base mb-2">
                        {reg.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm">{reg.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Permission Types */}
        <section className="mb-12 sm:mb-16">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-2" style={{ color: NAVY }}>
              Types of Permissions
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Different approval pathways for property development
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {permissions.map((perm, idx) => (
              <div key={idx} className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-lg p-5 sm:p-6 text-center">
                <Zap size={24} className="mx-auto text-emerald-600 mb-3" />
                <h3 className="font-semibold text-slate-800 text-sm sm:text-base mb-2">{perm.type}</h3>
                <p className="text-slate-600 text-xs sm:text-sm">{perm.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Development Process */}
        <section className="mb-12 sm:mb-16">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-2" style={{ color: NAVY }}>
              Development Approval Process
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Step-by-step timeline for property development approvals
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {developmentProcess.map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold shrink-0 text-sm sm:text-base"
                    style={{ backgroundColor: NAVY }}
                  >
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-slate-800 text-sm sm:text-base">
                        {item.title}
                      </h3>
                      <span className="text-xs sm:text-sm text-emerald-600 font-medium inline-block">
                        {item.timeline}
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm">{item.desc}</p>
                  </div>
                </div>
                {idx < developmentProcess.length - 1 && (
                  <div className="ml-5 sm:ml-6 mt-4 h-6 border-l-2 border-slate-200" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-8" style={{ color: NAVY }}>
            Helpful Resources
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Zoning Map", desc: "Interactive GIS zoning map", icon: MapPin },
              { title: "Development Guide", desc: "Complete development handbook", icon: FileText },
              { title: "Fee Schedule", desc: "Application and permit fees", icon: BarChart3 },
              { title: "Design Guidelines", desc: "Architectural standards", icon: Building2 },
              { title: "Forms & Templates", desc: "Download application forms", icon: FileText },
              { title: "Code of Ordinances", desc: "Complete zoning code", icon: FileText },
            ].map((resource, idx) => {
              const Icon = resource.icon;
              return (
                <a
                  key={idx}
                  href="#"
                  className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 hover:shadow-md hover:border-emerald-300 transition-all group"
                >
                  <Icon size={24} className="text-emerald-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-slate-800 text-sm sm:text-base mb-1">
                    {resource.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm">{resource.desc}</p>
                  <span className="inline-flex items-center gap-1 mt-3 text-emerald-600 text-xs font-medium group-hover:gap-2 transition-all">
                    Download <ArrowRight size={14} />
                  </span>
                </a>
              );
            })}
          </div>
        </section>

        {/* Contact Support */}
        <section className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-8 sm:p-10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6" style={{ color: NAVY }}>
            Need Help?
          </h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: NAVY }}
              >
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-sm sm:text-base">Planning Department</h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">1800-PLAN-XXX</p>
                <p className="text-slate-500 text-xs mt-1">Mon-Fri 9 AM - 5 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: NAVY }}
              >
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-sm sm:text-base">Email Support</h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">planning@landstack.gov</p>
                <p className="text-slate-500 text-xs mt-1">24-48 hour response</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: NAVY }}
              >
                <MapIcon size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-sm sm:text-base">Visit Us</h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Planning Department</p>
                <p className="text-slate-500 text-xs mt-1">Govt. Building, Floor 3</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-white mt-auto" style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto px-4 py-9 sm:py-12">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-7 sm:gap-10 mb-8 sm:mb-10">
            <div className="xs:col-span-2 md:col-span-1">
              <h3 className="text-xl sm:text-2xl font-serif font-bold">LandStack</h3>
              <p className="text-blue-100/80 mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed">
                Digital Land Management & Planning Portal
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Services</h4>
              <div className="space-y-2 text-xs sm:text-sm text-blue-100/80">
                <a href="#" className="hover:text-amber-400 transition-colors">Registration</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Land Records</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Planning & Zoning</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Mapping</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Information</h4>
              <div className="space-y-2 text-xs sm:text-sm text-blue-100/80">
                <a href="#" className="hover:text-amber-400 transition-colors">Zoning Code</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Development Guide</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Regulations</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Forms</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Support</h4>
              <div className="space-y-2 text-xs sm:text-sm text-blue-100/80">
                <a href="#" className="hover:text-amber-400 transition-colors">Contact Us</a>
                <a href="#" className="hover:text-amber-400 transition-colors">FAQs</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Help Center</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Report Issue</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-4 sm:pt-5 text-center text-[11px] sm:text-sm text-blue-200/80">
            <p>© 2026 LandStack. All Rights Reserved. | Prototype Digital Government Portal</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PlanningZoning;