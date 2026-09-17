import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  FileQuestion,
  LifeBuoy,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const NAVY = "#14283F";

const CATEGORIES = [
  "All",
  "Land Records",
  "GIS Mapping",
  "Ownership Verification",
  "Mutation Services",
  "Account & Login",
];

const FAQS = [
  {
    category: "Land Records",
    question: "How do I search for my land record?",
    answer:
      "Go to Land Records from the main menu and search using your survey number, khata number, or owner name. Matching records appear with an option to view or download the certified copy.",
  },
  {
    category: "Land Records",
    question: "Why does my record show as 'Under Verification'?",
    answer:
      "Records recently updated by the local revenue office are held for a short review before they're published. This usually clears within 3-5 working days. No action is needed on your part.",
  },
  {
    category: "Land Records",
    question: "Can I download a certified copy of my land record?",
    answer:
      "Yes. Open the record and select Download Certified Copy. The document carries a digital seal and QR code that any office can scan to verify its authenticity.",
  },
  {
    category: "GIS Mapping",
    question: "How accurate is the land parcel map?",
    answer:
      "Maps are drawn from the latest survey data provided by the state land records department and are updated as new surveys are completed. For legal boundary disputes, request an official resurvey through Mutation Services.",
  },
  {
    category: "GIS Mapping",
    question: "I can't find my plot on the map. What should I do?",
    answer:
      "Some older or recently subdivided plots haven't been digitized yet. Submit a Map Correction Request from the GIS Mapping page and our team will locate and add your plot.",
  },
  {
    category: "Ownership Verification",
    question: "How long does ownership verification take?",
    answer:
      "Standard verification requests are completed within 7 working days. You can track progress anytime from Applications using your reference number.",
  },
  {
    category: "Ownership Verification",
    question: "What documents do I need for verification?",
    answer:
      "You'll need a valid ID proof, the latest land record copy, and any prior sale deed or mutation certificate. Upload clear scans in PDF or JPG format when applying.",
  },
  {
    category: "Mutation Services",
    question: "How do I apply for a mutation?",
    answer:
      "Open Mutation Services, select Apply, and fill in the transfer details along with supporting documents such as the sale deed. You'll receive a reference number to track the application.",
  },
  {
    category: "Mutation Services",
    question: "Why was my mutation application rejected?",
    answer:
      "Rejections are usually due to a mismatch between submitted documents and existing records, or missing signatures. Check the remarks on your application for the specific reason and resubmit with corrections.",
  },
  {
    category: "Account & Login",
    question: "I forgot my password. How do I reset it?",
    answer:
      "Select Forgot Password on the login page and enter your registered mobile number or email. You'll receive a one-time code to set a new password.",
  },
  {
    category: "Account & Login",
    question: "Can I update my registered mobile number?",
    answer:
      "Yes, from Account Settings under Profile. You'll need to verify the new number with an OTP before the change takes effect.",
  },
];

function Help() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesCategory =
        activeCategory === "All" || faq.category === activeCategory;
      const matchesQuery =
        query.trim() === "" ||
        faq.question.toLowerCase().includes(query.trim().toLowerCase()) ||
        faq.answer.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Page header */}
      <section
        className="border-b border-slate-200"
        style={{ backgroundColor: NAVY }}
      >
        <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-sm font-semibold mb-4 sm:mb-5 text-blue-100">
            <LifeBuoy size={14} className="sm:hidden" />
            <LifeBuoy size={16} className="hidden sm:block" />
            Help &amp; Support
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
            How can we help you today?
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-blue-100/80 max-w-xl leading-relaxed">
            Find answers about land records, mapping, verification and
            mutation services, or reach our support team directly.
          </p>

          {/* Search */}
          <div className="mt-6 sm:mt-8 relative max-w-xl">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a topic, e.g. 'mutation status'"
              className="w-full pl-10 pr-4 py-3 rounded-md border border-slate-200 bg-white text-sm sm:text-base text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </section>

      <main id="main-content" className="flex-1">
        {/* Category filters + FAQ list */}
        <section className="max-w-7xl mx-auto px-4 py-10 sm:py-14">
          <div className="flex items-center justify-between mb-5 sm:mb-6 flex-wrap gap-3">
            <div>
              <p className="text-[11px] sm:text-xs font-semibold tracking-wide uppercase text-amber-600 mb-1">
                Common questions
              </p>
              <h2
                className="text-xl sm:text-2xl font-serif font-bold"
                style={{ color: NAVY }}
              >
                Frequently Asked Questions
              </h2>
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-6 sm:mb-8">
            {CATEGORIES.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    setOpenIndex(null);
                  }}
                  className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border transition-colors ${
                    isActive
                      ? "text-white border-transparent"
                      : "text-slate-600 border-slate-200 bg-white hover:border-slate-300"
                  }`}
                  style={isActive ? { backgroundColor: NAVY } : undefined}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* FAQ accordion */}
          {filteredFaqs.length > 0 ? (
            <div className="border border-slate-200 rounded-lg bg-white divide-y divide-slate-200 overflow-hidden">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={faq.question}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 text-left px-4 sm:px-6 py-4 sm:py-5 hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-sm sm:text-base font-semibold text-slate-800">
                        {faq.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-slate-400 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-6 pb-4 sm:pb-5 -mt-1">
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="border border-dashed border-slate-300 rounded-lg bg-white p-8 sm:p-10 text-center">
              <FileQuestion size={28} className="mx-auto text-slate-400 mb-3" />
              <p className="text-sm sm:text-base font-semibold text-slate-700">
                No results for "{query}"
              </p>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Try a different search term, or contact support below.
              </p>
            </div>
          )}
        </section>

        {/* Contact options */}
        <section className="bg-white border-y border-slate-200 py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-6 sm:mb-8">
              <p className="text-[11px] sm:text-xs font-semibold tracking-wide uppercase text-amber-600 mb-1">
                Still need help
              </p>
              <h2
                className="text-xl sm:text-2xl font-serif font-bold"
                style={{ color: NAVY }}
              >
                Contact Support
              </h2>
              <p className="text-slate-500 mt-1 text-xs sm:text-sm lg:text-base">
                Our team is available to assist with land record queries and
                technical issues.
              </p>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
              <ContactCard
                icon={<Phone size={19} style={{ color: NAVY }} />}
                title="Call Helpline"
                description="1800-000-000 (toll-free)"
                meta="Mon-Sat, 9:00 AM - 6:00 PM"
              />
              <ContactCard
                icon={<Mail size={19} style={{ color: NAVY }} />}
                title="Email Support"
                description="support@landstack.gov.in"
                meta="Response within 24-48 hours"
              />
              <ContactCard
                icon={<MessageCircle size={19} style={{ color: NAVY }} />}
                title="Live Chat"
                description="Chat with a support agent"
                meta="Mon-Fri, 10:00 AM - 5:00 PM"
              />
              <ContactCard
                icon={<MapPin size={19} style={{ color: NAVY }} />}
                title="Visit an Office"
                description="Find your nearest revenue office"
                meta="Bring a valid ID for in-person queries"
              />
            </div>
          </div>
        </section>

        {/* Grievance banner */}
        <section className="max-w-7xl mx-auto px-4 py-10 sm:py-14">
          <div
            className="rounded-lg p-5 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 sm:gap-6"
            style={{ backgroundColor: NAVY }}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <AlertCircle size={20} className="text-amber-400" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  Not satisfied with a response?
                </h3>
                <p className="text-xs sm:text-sm text-blue-100/80 mt-1 max-w-lg leading-relaxed">
                  File a formal grievance and track its resolution through
                  our Grievance Redressal system.
                </p>
              </div>
            </div>
            <Link
              to="/grievance-redressal"
              className="!text-white inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-md font-semibold text-xs sm:text-sm bg-amber-600 hover:bg-amber-500 transition-colors shrink-0"
            >
              File a Grievance
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        {/* Related links */}
        <section className="max-w-7xl mx-auto px-4 pb-10 sm:pb-14">
          <div className="border border-slate-200 rounded-lg bg-white p-5 sm:p-6">
            <div className="flex items-center gap-2.5 mb-3.5 sm:mb-4">
              <ShieldCheck size={18} style={{ color: NAVY }} />
              <h3 className="text-sm sm:text-base font-semibold" style={{ color: NAVY }}>
                You might also need
              </h3>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
              <RelatedLink label="Download Forms" to="/download-forms" />
              <RelatedLink label="RTI Requests" to="/rti" />
              <RelatedLink label="Track an Application" to="/applications" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ContactCard({ icon, title, description, meta }) {
  return (
    <div className="border border-slate-200 bg-slate-50 rounded-lg p-4 sm:p-6">
      <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-white border border-slate-200 flex items-center justify-center mb-3 sm:mb-4">
        {icon}
      </div>
      <h3 className="text-sm sm:text-base font-bold" style={{ color: NAVY }}>
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-slate-700 mt-1.5">{description}</p>
      <p className="text-[11px] sm:text-xs text-slate-500 mt-2.5 sm:mt-3 flex items-center gap-1.5">
        <Clock size={12} className="shrink-0" />
        {meta}
      </p>
    </div>
  );
}

function RelatedLink({ label, to }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-md border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
      style={{ color: NAVY }}
    >
      <span className="font-medium">{label}</span>
      <ArrowRight size={14} className="text-slate-400" />
    </Link>
  );
}

export default Help;