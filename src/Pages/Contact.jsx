import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ChevronDown,
  ShieldAlert,
  FileQuestion,
  Headphones,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const NAVY = "#14283F";

const quickContacts = [
  {
    icon: Phone,
    label: "Toll-Free Helpline",
    value: "1800-11-4567",
    note: "Mon–Sat, 9:30 AM – 6:00 PM",
  },
  {
    icon: Mail,
    label: "Email Support",
    value: "support@landstack.gov.in",
    note: "Response within 2 working days",
  },
  {
    icon: MapPin,
    label: "Head Office",
    value: "Department of Rural Development",
    note: "Krishi Bhawan, New Delhi – 110001",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "9:30 AM – 6:00 PM",
    note: "Closed on Sundays & public holidays",
  },
];

const departments = [
  {
    icon: Headphones,
    name: "Technical Helpdesk",
    description: "Login issues, portal errors, document upload problems.",
    phone: "1800-11-4567 (ext. 1)",
    email: "helpdesk@landstack.gov.in",
  },
  {
    icon: ShieldAlert,
    name: "Grievance Cell",
    description: "Disputes, delayed mutations, or complaints against an office.",
    phone: "1800-11-4567 (ext. 2)",
    email: "grievance@landstack.gov.in",
  },
  {
    icon: FileQuestion,
    name: "RTI Cell",
    description: "Right to Information requests and applications.",
    phone: "1800-11-4567 (ext. 3)",
    email: "rti@landstack.gov.in",
  },
];

const subjects = [
  "General Query",
  "Land Record Correction",
  "Mutation Status",
  "Technical Support",
  "Grievance / Complaint",
  "RTI Request",
];

const faqs = [
  {
    q: "How long does a mutation request take to process?",
    a: "Most mutation requests are resolved within 15–21 working days after all required documents are verified by the local revenue office.",
  },
  {
    q: "I filed a grievance — how do I check its status?",
    a: "Use the reference number sent to your email at the time of filing, and check it under Applications → Track Status on the portal.",
  },
  {
    q: "Can I visit an office in person instead of using the portal?",
    a: "Yes. District land record offices accept in-person applications during working hours; carry a valid ID and property documents.",
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm font-medium" style={{ color: NAVY }}>
          {q}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <p className="pb-4 text-sm leading-relaxed text-slate-500">{a}</p>}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: subjects[0],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Wire this up to your API endpoint.
    setSubmitted(true);
  }

  return (
    <main id="main-content" className="bg-white">
      {/* Page intro */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14">
          <p className="text-sm text-slate-500">
            <Link to="/" className="hover:text-amber-600">
              Home
            </Link>{" "}
            <span className="mx-1">/</span> Contact
          </p>
          <h1
            className="mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl"
            style={{ color: NAVY }}
          >
            Get in touch with LandStack
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
            Questions about a land record, a stuck mutation, or the portal itself —
            reach the right desk below, or send a message and we'll route it for you.
          </p>
        </div>
      </div>

      {/* Quick contact cards */}
      <div className="max-w-7xl mx-auto px-4 -mt-6 sm:-mt-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickContacts.map((c) => (
            <div
              key={c.label}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div
                className="mb-3 flex h-9 w-9 items-center justify-center rounded-md"
                style={{ backgroundColor: `${NAVY}0D` }}
              >
                <c.icon size={17} style={{ color: NAVY }} strokeWidth={1.75} />
              </div>
              <p className="text-xs font-medium text-slate-400">{c.label}</p>
              <p className="mt-1 text-sm font-semibold" style={{ color: NAVY }}>
                {c.value}
              </p>
              <p className="mt-1 text-xs text-slate-500">{c.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Form + department directory */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <h2 className="font-serif text-xl font-bold" style={{ color: NAVY }}>
              Send us a message
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              We typically reply within two working days.
            </p>

            {submitted ? (
              <div className="mt-6 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-emerald-600" />
                <div>
                  <p className="text-sm font-semibold text-emerald-800">
                    Message sent
                  </p>
                  <p className="mt-1 text-sm text-emerald-700">
                    Thanks, {form.name.split(" ")[0] || "there"}. Our team will get
                    back to you at {form.email || "the email you provided"}.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-slate-600">
                      Full name
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={handleChange("name")}
                      placeholder="Ramesh Kumar"
                      className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={handleChange("phone")}
                      placeholder="+91 98765 43210"
                      className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600">
                    Email address
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder="ramesh@example.com"
                    className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600">
                    Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={handleChange("subject")}
                    className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  >
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange("message")}
                    placeholder="Describe your issue or question in a few lines..."
                    className="mt-1.5 w-full resize-none rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-md bg-amber-500 px-6 py-2.5 text-sm font-semibold text-[#12203a] transition-colors hover:bg-amber-400"
                >
                  Send message
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>

          {/* Department directory */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-xl font-bold" style={{ color: NAVY }}>
              Reach the right desk
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              For faster resolution, contact the relevant department directly.
            </p>

            <div className="mt-6 space-y-4">
              {departments.map((d) => (
                <div
                  key={d.name}
                  className="flex items-start gap-4 rounded-lg border border-slate-200 p-4"
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md"
                    style={{ backgroundColor: `${NAVY}0D` }}
                  >
                    <d.icon size={18} style={{ color: NAVY }} strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold" style={{ color: NAVY }}>
                      {d.name}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                      {d.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                      <span>{d.phone}</span>
                      <span>{d.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Grievance banner */}
            <div
              className="mt-6 flex items-center justify-between gap-4 rounded-lg px-5 py-4"
              style={{ backgroundColor: NAVY }}
            >
              <div>
                <p className="text-sm font-semibold text-white">
                  Unresolved grievance?
                </p>
                <p className="mt-0.5 text-xs text-white/70">
                  Escalate it through the formal redressal portal.
                </p>
              </div>
              <Link
                to="/grievance"
                className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300"
              >
                Escalate
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <h2 className="font-serif text-xl font-bold" style={{ color: NAVY }}>
            Before you reach out
          </h2>
          <div className="mt-4 max-w-2xl rounded-lg border border-slate-200 bg-white px-5">
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}