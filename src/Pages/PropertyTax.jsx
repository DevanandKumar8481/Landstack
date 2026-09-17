import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Receipt,
  Calculator,
  Download,
  ShieldCheck,
  BadgeIndianRupee,
  CalendarClock,
  FileWarning,
  ScrollText,
  ChevronRight,
  CircleCheck,
  CircleAlert,
  Landmark,
} from "lucide-react";

const NAVY = "#14283F";

/* Mock property record — swap for a real API lookup */
const DEMO_RECORD = {
  propertyId: "PT-MP-0304-11842",
  ownerName: "Ramesh Kumar",
  address: "House No. 24, Ward 7, Palasia, Indore, MP",
  propertyType: "Residential",
  assessedValue: "₹18,40,000",
  taxYear: "2026–27",
  annualTax: "₹9,280",
  amountPaid: "₹4,640",
  amountDue: "₹4,640",
  dueDate: "31 Dec 2026",
  status: "due", // "paid" | "due" | "overdue"
};

const PAYMENT_HISTORY = [
  { year: "2025–26", amount: "₹8,750", date: "18 Mar 2026", mode: "Online", status: "paid" },
  { year: "2024–25", amount: "₹8,400", date: "22 Feb 2025", mode: "Bank Challan", status: "paid" },
  { year: "2023–24", amount: "₹8,100", date: "05 Jan 2024", mode: "Online", status: "paid" },
];

const searchTabs = [
  { id: "propertyId", label: "Property ID" },
  { id: "khasra", label: "Khasra Number" },
  { id: "owner", label: "Owner Name" },
];

const statusStyles = {
  paid: { label: "Paid", classes: "bg-emerald-50 text-emerald-700 border-emerald-200", Icon: CircleCheck },
  due: { label: "Payment Due", classes: "bg-amber-50 text-amber-700 border-amber-200", Icon: CircleAlert },
  overdue: { label: "Overdue", classes: "bg-red-50 text-red-700 border-red-200", Icon: CircleAlert },
};

export default function PropertyTax() {
  const [searchBy, setSearchBy] = useState("propertyId");
  const [query, setQuery] = useState("");
  const [record, setRecord] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const placeholderText =
    searchBy === "propertyId"
      ? "e.g., PT-MP-0304-11842"
      : searchBy === "khasra"
      ? "e.g., 142/2"
      : "e.g., Ramesh Kumar";

  function runSearch(value) {
    const term = (value ?? query).trim().toLowerCase();
    if (!term) return;

    const isMatch =
      term === DEMO_RECORD.propertyId.toLowerCase() ||
      term === "142/2" ||
      DEMO_RECORD.ownerName.toLowerCase().includes(term);

    if (isMatch) {
      setRecord(DEMO_RECORD);
      setNotFound(false);
    } else {
      setRecord(null);
      setNotFound(true);
    }
  }

  function useDemo(value) {
    setQuery(value);
    runSearch(value);
  }

  const status = record ? statusStyles[record.status] : null;

  return (
    <div className="bg-slate-50">
      {/* Page header */}
      <div className="bg-white border-b border-slate-200 relative">
        <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-orange-500 via-white to-green-600" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 pl-6 sm:pl-8">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-3">
            <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
            <ChevronRight size={13} />
            <span className="text-slate-700 font-medium">Property Tax</span>
          </div>
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <Landmark size={22} style={{ color: NAVY }} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold" style={{ color: NAVY }}>
                Property Tax
              </h1>
              <p className="text-slate-500 mt-1.5 text-sm sm:text-base max-w-2xl">
                Look up dues, pay online, and download receipts for any registered property.
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
        {/* Search panel */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 sm:p-6">
          <h2 className="text-sm font-semibold text-slate-700 mb-3">Find a property</h2>

          <div className="flex flex-wrap gap-2 mb-4">
            {searchTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSearchBy(tab.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium border transition-colors ${
                  searchBy === tab.id
                    ? "text-white border-transparent"
                    : "text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
                style={searchBy === tab.id ? { backgroundColor: NAVY } : undefined}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && runSearch()}
                placeholder={placeholderText}
                className="w-full pl-10 pr-3.5 py-3 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                style={{ borderColor: undefined }}
              />
            </div>
            <button
              type="button"
              onClick={() => runSearch()}
              className="!text-white inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity shrink-0"
              style={{ backgroundColor: NAVY }}
            >
              <Search size={16} />
              Check Tax Due
            </button>
          </div>

          <p className="text-xs text-slate-500 mt-3">
            Try a demo record:{" "}
            <button
              type="button"
              onClick={() => useDemo("PT-MP-0304-11842")}
              className="font-medium text-blue-700 hover:underline"
            >
              PT-MP-0304-11842
            </button>
            {" · "}
            <button
              type="button"
              onClick={() => useDemo("Ramesh Kumar")}
              className="font-medium text-blue-700 hover:underline"
            >
              Ramesh Kumar
            </button>
          </p>
        </section>

        {/* Not found state */}
        {notFound && (
          <section className="bg-amber-50 border border-amber-200 rounded-xl p-5 sm:p-6 flex items-start gap-3">
            <FileWarning size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900">No property found for this search</p>
              <p className="text-xs sm:text-sm text-amber-800 mt-1">
                Double-check the {searchTabs.find((t) => t.id === searchBy)?.label.toLowerCase()} and try again, or
                use one of the demo records above.
              </p>
            </div>
          </section>
        )}

        {/* Result: property + tax summary */}
        {record && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Property + dues card */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div
                className="px-5 sm:px-6 py-4 flex items-center justify-between flex-wrap gap-2"
                style={{ backgroundColor: NAVY }}
              >
                <div>
                  <p className="text-white font-semibold text-sm sm:text-base">{record.propertyId}</p>
                  <p className="text-blue-100/80 text-xs sm:text-sm mt-0.5">{record.address}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${status.classes} bg-white`}>
                  <status.Icon size={13} />
                  {status.label}
                </span>
              </div>

              <div className="p-5 sm:p-6 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 text-sm">
                <Field label="Owner Name" value={record.ownerName} />
                <Field label="Property Type" value={record.propertyType} />
                <Field label="Assessed Value" value={record.assessedValue} />
                <Field label="Tax Year" value={record.taxYear} />
                <Field label="Amount Paid" value={record.amountPaid} valueClass="text-emerald-700" />
                <Field label="Due Date" value={record.dueDate} />
              </div>

              <div className="border-t border-slate-100 px-5 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-500">Amount Due</p>
                  <p className="text-2xl sm:text-3xl font-bold" style={{ color: NAVY }}>
                    {record.amountDue}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="!text-white inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: NAVY }}
                  >
                    <BadgeIndianRupee size={16} />
                    Pay Now
                  </button>
                  <button
                    type="button"
                    className="border inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-semibold text-sm bg-white hover:bg-slate-50 transition-colors"
                    style={{ borderColor: NAVY, color: NAVY }}
                  >
                    <Download size={16} />
                    Receipt
                  </button>
                </div>
              </div>
            </div>

            {/* Payment history */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <ScrollText size={16} style={{ color: NAVY }} />
                <h3 className="text-sm font-semibold text-slate-700">Payment History</h3>
              </div>
              <div className="space-y-3">
                {PAYMENT_HISTORY.map((row) => (
                  <div
                    key={row.year}
                    className="flex items-center justify-between border-b border-slate-100 last:border-0 pb-3 last:pb-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-700">{row.year}</p>
                      <p className="text-xs text-slate-500">{row.date} · {row.mode}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-700">{row.amount}</p>
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700">
                        <CircleCheck size={11} />
                        Paid
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Quick actions */}
        <section>
          <h2 className="text-lg sm:text-xl font-serif font-bold mb-4" style={{ color: NAVY }}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
            <ActionCard
              Icon={BadgeIndianRupee}
              title="Pay Property Tax"
              description="Pay current or overdue tax securely online."
              to="/property-tax/pay"
            />
            <ActionCard
              Icon={Calculator}
              title="Tax Calculator"
              description="Estimate annual tax from property details."
              to="/property-tax/calculator"
            />
            <ActionCard
              Icon={Receipt}
              title="Download Receipt"
              description="Get receipts for any previous tax year."
              to="/property-tax/receipts"
            />
            <ActionCard
              Icon={CalendarClock}
              title="Assessment History"
              description="View past assessments and valuation changes."
              to="/property-tax/assessments"
            />
            <ActionCard
              Icon={ShieldCheck}
              title="Exemption Application"
              description="Apply for tax exemption or rebate eligibility."
              to="/property-tax/exemption"
            />
            <ActionCard
              Icon={FileWarning}
              title="Raise a Grievance"
              description="Report a discrepancy in your tax assessment."
              to="/grievance-redressal"
            />
          </div>
        </section>

        {/* Info note */}
        <section className="bg-blue-50 border border-blue-100 rounded-xl p-5 sm:p-6 flex items-start gap-3">
          <ShieldCheck size={18} style={{ color: NAVY }} className="shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Property tax is calculated on the assessed annual value of the property and is payable
            once a year. A rebate applies to payments made before <strong>30 June</strong>. Late
            payments after the due date accrue a 2% monthly penalty.
          </p>
        </section>
      </main>
    </div>
  );
}

/* Small labelled value used inside the property card */
function Field({ label, value, valueClass = "text-slate-700" }) {
  return (
    <div>
      <p className="text-[11px] sm:text-xs text-slate-500">{label}</p>
      <p className={`text-sm sm:text-[15px] font-semibold mt-0.5 ${valueClass}`}>{value}</p>
    </div>
  );
}

/* Quick action card */
function ActionCard({ Icon, title, description, to = "/property-tax" }) {
  return (
    <Link
      to={to}
      className="group border border-slate-200 bg-white rounded-lg p-4 sm:p-6 hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all block"
    >
      <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center mb-3 sm:mb-4 transition-transform group-hover:scale-105">
        <Icon size={19} style={{ color: NAVY }} />
      </div>
      <h3 className="text-base sm:text-lg font-bold" style={{ color: NAVY }}>
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">{description}</p>
      <span
        className="mt-3.5 sm:mt-5 text-xs sm:text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
        style={{ color: NAVY }}
      >
        Open
        <ChevronRight size={14} />
      </span>
    </Link>
  );
}