import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  Ruler,
  ScanLine,
  Gavel,
  Satellite,
  ClipboardCheck,
  Search,
  ChevronRight,
  CircleCheck,
  CircleAlert,
  Clock,
  CalendarClock,
  ShieldCheck,
  MapPin,
  User,
  Phone,
  Mail,
  FileWarning,
  ScrollText,
  Landmark,
  UserCog,
  X,
} from "lucide-react";

const NAVY = "#14283F";

const SURVEY_TYPES = [
  { id: "boundary", label: "Boundary Demarcation", Icon: Ruler, description: "Mark and confirm exact plot boundaries on the ground." },
  { id: "mutation", label: "Mutation Verification", Icon: ScanLine, description: "Physical verification following a land mutation entry." },
  { id: "resurvey", label: "Resurvey", Icon: Compass, description: "Re-measure a plot where records and ground data differ." },
  { id: "dispute", label: "Dispute Resolution", Icon: Gavel, description: "Independent survey to help resolve a boundary dispute." },
];

const STAGES = ["Request Submitted", "Surveyor Assigned", "Site Visit Scheduled", "Survey Conducted", "Report Generated"];

/* Pre-seeded demo surveys so tracking works immediately, without needing a fresh submission first */
const DEMO_SURVEYS = {
  "FS-2026-000234": {
    applicantName: "Ramesh Kumar",
    surveyType: "boundary",
    village: "Palasia",
    surveyor: "Anil Mishra",
    surveyorPhone: "98261 40032",
    stageIndex: 4,
    status: "completed",
    note: "Survey report generated on 05 Sep 2026. Boundary pillars confirmed at all four corners.",
    submittedOn: "18 Aug 2026",
  },
  "FS-2026-000567": {
    applicantName: "Sunita Verma",
    surveyType: "mutation",
    village: "Bhawarkua",
    surveyor: "Kavita Rao",
    surveyorPhone: "94251 78820",
    stageIndex: 2,
    status: "scheduled",
    note: "Site visit scheduled for 22 Sep 2026. Please ensure the plot is accessible and boundary markers are visible.",
    submittedOn: "01 Sep 2026",
  },
  "FS-2026-000890": {
    applicantName: "Aftab Sheikh",
    surveyType: "dispute",
    village: "Bhopal Rural",
    surveyor: null,
    surveyorPhone: null,
    stageIndex: 1,
    status: "on_hold",
    note: "On hold — the adjoining landowner's NOC has not been received. Survey will resume once submitted.",
    submittedOn: "10 Jul 2026",
  },
};

const statusMeta = {
  completed: { label: "Completed", classes: "bg-emerald-50 text-emerald-700 border-emerald-200", Icon: CircleCheck },
  scheduled: { label: "Scheduled", classes: "bg-blue-50 text-blue-700 border-blue-200", Icon: CalendarClock },
  in_progress: { label: "In Progress", classes: "bg-amber-50 text-amber-700 border-amber-200", Icon: Clock },
  on_hold: { label: "On Hold", classes: "bg-red-50 text-red-700 border-red-200", Icon: CircleAlert },
  submitted: { label: "Submitted", classes: "bg-slate-50 text-slate-700 border-slate-200", Icon: CircleCheck },
};

const emptyForm = {
  applicantName: "",
  mobile: "",
  email: "",
  district: "",
  village: "",
  plotNumber: "",
  surveyType: "",
  reason: "",
  preferredDate: "",
  declaration: false,
};

function generateSurveyId() {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `FS-2026-${num}`;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function FieldManagement() {
  const [activeTab, setActiveTab] = useState("request");
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [docs, setDocs] = useState({});
  const [submittedSurveys, setSubmittedSurveys] = useState({});
  const [successId, setSuccessId] = useState(null);

  const [trackId, setTrackId] = useState("");
  const [trackResult, setTrackResult] = useState(null);
  const [trackNotFound, setTrackNotFound] = useState(false);

  const formTopRef = useRef(null);

  const requiredDocs = getRequiredDocs(form.surveyType);

  function setField(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  }

  function scrollToFormTop() {
    if (typeof formTopRef.current?.scrollIntoView === "function") {
      formTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function selectSurveyType(id) {
    setField("surveyType", id);
    scrollToFormTop();
  }

  function toggleDoc(key) {
    setDocs((d) => ({ ...d, [key]: !d[key] }));
  }

  function validate() {
    const e = {};
    if (!form.applicantName.trim()) e.applicantName = "Enter the applicant's full name.";
    if (!/^\d{10}$/.test(form.mobile.trim())) e.mobile = "Enter a valid 10-digit mobile number.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = "Enter a valid email address.";
    if (!form.district.trim()) e.district = "Select a district.";
    if (!form.village.trim()) e.village = "Select a village or ward.";
    if (!form.plotNumber.trim()) e.plotNumber = "Enter the plot or Khasra number.";
    if (!form.surveyType) e.surveyType = "Choose a survey type.";
    if (!form.reason.trim() || form.reason.trim().length < 10) {
      e.reason = "Describe the reason for this survey in at least 10 characters.";
    }
    if (!form.preferredDate) {
      e.preferredDate = "Choose a preferred date.";
    } else if (form.preferredDate < todayISO()) {
      e.preferredDate = "Preferred date cannot be in the past.";
    }
    const missingDocs = requiredDocs.filter((d) => !docs[d.key]);
    if (missingDocs.length) e.documents = `Confirm you have: ${missingDocs.map((d) => d.label).join(", ")}.`;
    if (!form.declaration) e.declaration = "You must accept the declaration to submit.";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      scrollToFormTop();
      return;
    }

    const id = generateSurveyId();
    const record = {
      applicantName: form.applicantName,
      surveyType: form.surveyType,
      village: form.village,
      surveyor: null,
      surveyorPhone: null,
      stageIndex: 0,
      status: "submitted",
      note: "Request received. A surveyor is typically assigned within 3–5 working days.",
      submittedOn: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    };

    setSubmittedSurveys((s) => ({ ...s, [id]: record }));
    setSuccessId(id);
    setForm(emptyForm);
    setDocs({});
    setErrors({});
  }

  function startNewRequest() {
    setSuccessId(null);
    scrollToFormTop();
  }

  function runTrackSearch(idOverride) {
    const id = (idOverride ?? trackId).trim().toUpperCase();
    if (!id) return;
    const found = submittedSurveys[id] || DEMO_SURVEYS[id];
    if (found) {
      setTrackResult({ id, ...found });
      setTrackNotFound(false);
    } else {
      setTrackResult(null);
      setTrackNotFound(true);
    }
  }

  function useDemoTrack(id) {
    setTrackId(id);
    runTrackSearch(id);
  }

  return (
    <div className="bg-slate-50">
      {/* Page header */}
      <div className="bg-white border-b border-slate-200 relative">
        <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-orange-500 via-white to-green-600" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 pl-6 sm:pl-8">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-3">
            <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
            <ChevronRight size={13} />
            <span className="text-slate-700 font-medium">Field Survey Management</span>
          </div>
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <Satellite size={22} style={{ color: NAVY }} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold" style={{ color: NAVY }}>
                Field Survey Management
              </h1>
              <p className="text-slate-500 mt-1.5 text-sm sm:text-base max-w-2xl">
                Request a boundary, mutation, resurvey, or dispute-resolution survey — and follow
                its progress from request to report.
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8" ref={formTopRef}>
        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-200">
          {[
            { id: "request", label: "Request a Survey" },
            { id: "track", label: "Track Survey" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-5 py-3 text-sm font-semibold border-b-2 transition-colors -mb-px ${
                activeTab === tab.id ? "border-current" : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
              style={activeTab === tab.id ? { color: NAVY } : undefined}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ---------------- REQUEST TAB ---------------- */}
        {activeTab === "request" && (
          <>
            {successId ? (
              <SuccessCard
                id={successId}
                onNew={startNewRequest}
                onTrack={() => {
                  setActiveTab("track");
                  useDemoTrack(successId);
                }}
              />
            ) : (
              <>
                {/* Survey type picker */}
                <section>
                  <h2 className="text-lg sm:text-xl font-serif font-bold mb-4" style={{ color: NAVY }}>
                    1. Choose a Survey Type
                  </h2>
                  <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
                    {SURVEY_TYPES.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => selectSurveyType(type.id)}
                        className={`text-left border rounded-lg p-4 sm:p-5 transition-all hover:shadow-md hover:-translate-y-0.5 ${
                          form.surveyType === type.id
                            ? "border-blue-300 bg-blue-50 ring-2 ring-blue-100"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center mb-3">
                          <type.Icon size={19} style={{ color: NAVY }} />
                        </div>
                        <h3 className="text-sm sm:text-base font-bold" style={{ color: NAVY }}>
                          {type.label}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                          {type.description}
                        </p>
                      </button>
                    ))}
                  </div>
                  {errors.surveyType && <ErrorText>{errors.surveyType}</ErrorText>}
                </section>

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate>
                  <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-serif font-bold mb-5" style={{ color: NAVY }}>
                      2. Applicant &amp; Plot Details
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <TextField
                        label="Applicant Full Name"
                        icon={User}
                        value={form.applicantName}
                        onChange={(v) => setField("applicantName", v)}
                        placeholder="e.g., Ramesh Kumar"
                        error={errors.applicantName}
                      />
                      <TextField
                        label="Mobile Number"
                        icon={Phone}
                        value={form.mobile}
                        onChange={(v) => setField("mobile", v.replace(/\D/g, "").slice(0, 10))}
                        placeholder="10-digit mobile number"
                        error={errors.mobile}
                      />
                      <TextField
                        label="Email (optional)"
                        icon={Mail}
                        value={form.email}
                        onChange={(v) => setField("email", v)}
                        placeholder="name@example.com"
                        error={errors.email}
                      />
                      <SelectField
                        label="District"
                        icon={MapPin}
                        value={form.district}
                        onChange={(v) => setField("district", v)}
                        options={["Indore", "Bhopal", "Ujjain", "Gwalior"]}
                        placeholder="Select District"
                        error={errors.district}
                      />
                      <SelectField
                        label="Village / Ward"
                        icon={MapPin}
                        value={form.village}
                        onChange={(v) => setField("village", v)}
                        options={["Palasia", "Bhawarkua", "Bhopal Rural", "Rajendra Nagar"]}
                        placeholder="Select Village / Ward"
                        error={errors.village}
                      />
                      <TextField
                        label="Plot / Khasra Number"
                        icon={ScrollText}
                        value={form.plotNumber}
                        onChange={(v) => setField("plotNumber", v)}
                        placeholder="e.g., 142/2"
                        error={errors.plotNumber}
                      />
                      <TextField
                        label="Preferred Survey Date"
                        icon={CalendarClock}
                        type="date"
                        value={form.preferredDate}
                        onChange={(v) => setField("preferredDate", v)}
                        error={errors.preferredDate}
                        min={todayISO()}
                      />
                    </div>

                    <div className="mt-4 sm:mt-5">
                      <label className="text-xs sm:text-sm font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
                        <ScrollText size={13} className="text-slate-400" />
                        Reason for Survey
                      </label>
                      <textarea
                        value={form.reason}
                        onChange={(e) => setField("reason", e.target.value)}
                        placeholder="Briefly describe why this survey is needed — e.g., unclear boundary with the adjoining plot after a recent sale."
                        rows={3}
                        className={`w-full px-3.5 py-2.5 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 ${
                          errors.reason ? "border-red-300" : "border-slate-200"
                        }`}
                      />
                      {errors.reason && <ErrorText>{errors.reason}</ErrorText>}
                    </div>
                  </section>

                  {/* Documents */}
                  <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 sm:p-6 mt-6">
                    <div className="flex items-center gap-2 mb-1">
                      <ClipboardCheck size={17} style={{ color: NAVY }} />
                      <h2 className="text-lg sm:text-xl font-serif font-bold" style={{ color: NAVY }}>
                        3. Required Documents
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mb-4">
                      {form.surveyType
                        ? "Confirm you have each document ready. The assigned surveyor may request the originals on-site."
                        : "Choose a survey type above to see the exact documents needed."}
                    </p>

                    {requiredDocs.length > 0 && (
                      <div className="space-y-2.5">
                        {requiredDocs.map((doc) => (
                          <label
                            key={doc.key}
                            className="flex items-start gap-3 border border-slate-200 rounded-md p-3 hover:border-slate-300 cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={!!docs[doc.key]}
                              onChange={() => toggleDoc(doc.key)}
                              className="mt-0.5 accent-current"
                              style={{ color: NAVY }}
                            />
                            <span className="text-sm text-slate-700">{doc.label}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {errors.documents && <ErrorText>{errors.documents}</ErrorText>}
                  </section>

                  {/* Declaration + submit */}
                  <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 sm:p-6 mt-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.declaration}
                        onChange={(e) => setField("declaration", e.target.checked)}
                        className="mt-0.5 accent-current"
                        style={{ color: NAVY }}
                      />
                      <span className="text-sm text-slate-700">
                        I declare that the information provided is true, and I will ensure the plot
                        is accessible to the assigned surveyor on the scheduled date.
                      </span>
                    </label>
                    {errors.declaration && <ErrorText>{errors.declaration}</ErrorText>}

                    <button
                      type="submit"
                      className="!text-white w-full sm:w-auto mt-5 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: NAVY }}
                    >
                      <ClipboardCheck size={17} />
                      Submit Survey Request
                    </button>
                  </section>
                </form>
              </>
            )}
          </>
        )}

        {/* ---------------- TRACK TAB ---------------- */}
        {activeTab === "track" && (
          <section className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-sm font-semibold text-slate-700 mb-3">Track a survey request</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={trackId}
                    onChange={(e) => setTrackId(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && runTrackSearch()}
                    placeholder="e.g., FS-2026-000234"
                    className="w-full pl-10 pr-3.5 py-3 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => runTrackSearch()}
                  className="!text-white inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity shrink-0"
                  style={{ backgroundColor: NAVY }}
                >
                  <Search size={16} />
                  Track Status
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                Try a demo survey:{" "}
                {Object.keys(DEMO_SURVEYS).map((id, i) => (
                  <span key={id}>
                    <button
                      type="button"
                      onClick={() => useDemoTrack(id)}
                      className="font-medium text-blue-700 hover:underline"
                    >
                      {id}
                    </button>
                    {i < Object.keys(DEMO_SURVEYS).length - 1 ? " · " : ""}
                  </span>
                ))}
              </p>
            </div>

            {trackNotFound && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 sm:p-6 flex items-start gap-3">
                <FileWarning size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-900">No survey found with that ID</p>
                  <p className="text-xs sm:text-sm text-amber-800 mt-1">
                    Check the survey ID and try again, or use a demo ID above.
                  </p>
                </div>
              </div>
            )}

            {trackResult && <TrackTimeline survey={trackResult} />}
          </section>
        )}

        {/* Fees & processing time — informational, always visible */}
        <section className="bg-blue-50 border border-blue-100 rounded-xl p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck size={17} style={{ color: NAVY }} />
            <h2 className="text-sm font-semibold text-slate-700">Fees &amp; Turnaround Time</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <FeeFact label="Boundary Demarcation" value="₹1,200 flat" sub="7–10 working days" />
            <FeeFact label="Mutation Verification" value="₹600 flat" sub="5–7 working days" />
            <FeeFact label="Resurvey" value="₹2,000 flat" sub="10–15 working days" />
            <FeeFact label="Dispute Resolution" value="₹2,500 flat" sub="15–20 working days" />
          </div>
        </section>
      </main>
    </div>
  );
}

/* --------------------- helpers & sub-components --------------------- */

function getRequiredDocs(surveyType) {
  if (!surveyType) return [];
  const base = [
    { key: "id_proof", label: "Applicant ID proof (Aadhaar / Voter ID)" },
    { key: "ownership", label: "Proof of land ownership or sale deed" },
  ];
  const byType = {
    boundary: [{ key: "prev_map", label: "Previous survey map or tehsil map copy" }],
    mutation: [{ key: "mutation_order", label: "Copy of the mutation order" }],
    resurvey: [{ key: "prev_map", label: "Previous survey map or tehsil map copy" }],
    dispute: [
      { key: "prev_map", label: "Previous survey map or tehsil map copy" },
      { key: "dispute_note", label: "Written note describing the dispute" },
      { key: "neighbor_noc", label: "Adjoining landowner's contact details, for notice" },
    ],
  };
  return [...base, ...(byType[surveyType] || [])];
}

function TextField({ label, icon: Icon, value, onChange, placeholder, error, type = "text", min }) {
  return (
    <div>
      <label className="text-xs sm:text-sm font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
        <Icon size={13} className="text-slate-400" />
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        className={`w-full px-3.5 py-2.5 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 ${
          error ? "border-red-300" : "border-slate-200"
        }`}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function SelectField({ label, icon: Icon, value, onChange, options, placeholder, error }) {
  return (
    <div>
      <label className="text-xs sm:text-sm font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
        <Icon size={13} className="text-slate-400" />
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3.5 py-2.5 rounded-md border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 ${
          error ? "border-red-300" : "border-slate-200"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ children }) {
  return (
    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
      <CircleAlert size={12} />
      {children}
    </p>
  );
}

function SuccessCard({ id, onNew, onTrack }) {
  return (
    <section className="bg-white border border-emerald-200 rounded-xl shadow-sm p-6 sm:p-8 text-center">
      <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
        <CircleCheck size={28} className="text-emerald-600" />
      </div>
      <h2 className="text-xl sm:text-2xl font-serif font-bold" style={{ color: NAVY }}>
        Survey Request Submitted
      </h2>
      <p className="text-slate-500 mt-2 text-sm sm:text-base">
        Your request has been received. A surveyor is typically assigned within 3–5 working days.
      </p>
      <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-md px-4 py-2.5 mt-5">
        <span className="text-xs text-slate-500">Survey ID</span>
        <span className="font-mono font-semibold text-sm" style={{ color: NAVY }}>{id}</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
        <button
          type="button"
          onClick={onTrack}
          className="!text-white inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity"
          style={{ backgroundColor: NAVY }}
        >
          <Search size={15} />
          Track This Survey
        </button>
        <button
          type="button"
          onClick={onNew}
          className="border inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-semibold text-sm bg-white hover:bg-slate-50 transition-colors"
          style={{ borderColor: NAVY, color: NAVY }}
        >
          Submit Another Request
        </button>
      </div>
    </section>
  );
}

function TrackTimeline({ survey }) {
  const meta = statusMeta[survey.status];
  const typeLabel = SURVEY_TYPES.find((t) => t.id === survey.surveyType)?.label || survey.surveyType;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 sm:px-6 py-4 flex items-center justify-between flex-wrap gap-2" style={{ backgroundColor: NAVY }}>
        <div>
          <p className="text-white font-semibold text-sm sm:text-base font-mono">{survey.id}</p>
          <p className="text-blue-100/80 text-xs sm:text-sm mt-0.5">
            {survey.applicantName} · {typeLabel} · {survey.village}
          </p>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${meta.classes} bg-white`}>
          <meta.Icon size={13} />
          {meta.label}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-1.5 mb-1.5 text-xs text-slate-500">
          <CalendarClock size={13} />
          Requested on {survey.submittedOn}
        </div>

        {survey.surveyor && (
          <div className="mt-4 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-md p-3.5">
            <div className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
              <UserCog size={16} style={{ color: NAVY }} />
            </div>
            <div>
              <p className="text-xs text-slate-500">Assigned Surveyor</p>
              <p className="text-sm font-semibold text-slate-700">
                {survey.surveyor} · {survey.surveyorPhone}
              </p>
            </div>
          </div>
        )}

        <ol className="flex flex-col sm:flex-row gap-4 sm:gap-0 mt-6">
          {STAGES.map((stage, i) => {
            const isOnHoldHere = survey.status === "on_hold" && i === survey.stageIndex;
            const done = i < survey.stageIndex || (i === survey.stageIndex && survey.status === "completed");
            const current = i === survey.stageIndex && !done;
            return (
              <li key={stage} className="flex-1 flex sm:flex-col items-start sm:items-center relative">
                {i > 0 && (
                  <div
                    className={`hidden sm:block absolute top-3.5 right-1/2 w-full h-0.5 ${
                      i <= survey.stageIndex ? "bg-emerald-400" : "bg-slate-200"
                    }`}
                  />
                )}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 z-10 ${
                    isOnHoldHere
                      ? "bg-red-500 text-white"
                      : done
                      ? "bg-emerald-500 text-white"
                      : current
                      ? "border-2 text-white"
                      : "bg-slate-100 text-slate-400 border border-slate-200"
                  }`}
                  style={current && !isOnHoldHere ? { backgroundColor: NAVY, borderColor: NAVY } : undefined}
                >
                  {isOnHoldHere ? <X size={14} /> : done ? <CircleCheck size={15} /> : i + 1}
                </div>
                <p className={`mt-0 sm:mt-2 ml-3 sm:ml-0 text-xs sm:text-center font-medium ${
                  current || done || isOnHoldHere ? "text-slate-700" : "text-slate-400"
                }`}>
                  {stage}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="mt-6 border-t border-slate-100 pt-5 flex items-start gap-2.5">
          <ScrollText size={16} style={{ color: NAVY }} className="shrink-0 mt-0.5" />
          <p className="text-sm text-slate-700 leading-relaxed">{survey.note}</p>
        </div>
      </div>
    </div>
  );
}

function FeeFact({ label, value, sub }) {
  return (
    <div className="bg-white border border-slate-200 rounded-md p-3.5">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-base font-bold mt-0.5" style={{ color: NAVY }}>{value}</p>
      <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
    </div>
  );
}