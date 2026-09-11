import { useState } from "react";
import {
  FileSignature,
  Users,
  Scale,
  Gavel,
  ScrollText,
  HeartHandshake,
  UploadCloud,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Loader2,
  AlertTriangle,
} from "lucide-react";

const NAVY = "#14283F";
const SEAL_GREEN = "#0F7A45";

const DISTRICTS = ["Indore", "Bhopal", "Ujjain", "Dewas", "Dhar"];
const TEHSILS = {
  Indore: ["Indore", "Depalpur", "Mhow", "Sanwer"],
  Bhopal: ["Bhopal", "Berasia", "Huzur"],
  Ujjain: ["Ujjain", "Ghatiya", "Tarana"],
  Dewas: ["Dewas", "Sonkatch", "Kannod"],
  Dhar: ["Dhar", "Badnawar", "Manawar"],
};
const VILLAGES = {
  Indore: ["Bicholi Hapsi", "Rau", "Khajrana", "Niranjanpur"],
  Depalpur: ["Depalpur", "Chirakhan", "Manpur"],
  Mhow: ["Mhow", "Choral", "Gawla"],
  Sanwer: ["Sanwer", "Hatod", "Palda"],
};

const MUTATION_TYPES = [
  {
    id: "sale",
    label: "Sale deed",
    description: "Ownership passed through a registered sale",
    icon: FileSignature,
    docs: [
      "Registered sale deed (copy)",
      "Applicant's ID proof",
      "Previous Record of Rights",
      "Seller's no-objection certificate",
    ],
  },
  {
    id: "inheritance",
    label: "Inheritance",
    description: "Ownership passed to a legal heir",
    icon: Users,
    docs: [
      "Death certificate",
      "Legal heir certificate",
      "Applicant's ID proof",
      "Previous Record of Rights",
    ],
  },
  {
    id: "gift",
    label: "Gift deed",
    description: "Ownership transferred as a registered gift",
    icon: HeartHandshake,
    docs: [
      "Registered gift deed",
      "Donor's ID proof",
      "Applicant's ID proof",
      "Previous Record of Rights",
    ],
  },
  {
    id: "partition",
    label: "Partition",
    description: "A joint holding split among co-owners",
    icon: Scale,
    docs: [
      "Partition deed or court order",
      "ID proof of all parties",
      "Previous Record of Rights",
    ],
  },
  {
    id: "court",
    label: "Court decree",
    description: "Ownership settled by a court order",
    icon: Gavel,
    docs: [
      "Certified copy of the decree",
      "Applicant's ID proof",
      "Previous Record of Rights",
    ],
  },
  {
    id: "will",
    label: "Will / succession",
    description: "Ownership passed by a probated will",
    icon: ScrollText,
    docs: [
      "Probated will or succession certificate",
      "Death certificate",
      "Applicant's ID proof",
      "Previous Record of Rights",
    ],
  },
];

const TRACK_STAGES = [
  "Application submitted",
  "Verified by Patwari",
  "Approved by Tehsildar",
  "Record updated",
];

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-slate-600">{label}</span>
      {children}
    </label>
  );
}

function Select({ value, onChange, options, placeholder }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full appearance-none rounded-md border border-slate-300 bg-white pl-3 pr-9 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2"
        style={{ "--tw-ring-color": `${NAVY}55` }}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
      style={{ "--tw-ring-color": `${NAVY}55` }}
    />
  );
}

const STEP_LABELS = ["Mutation type", "Details", "Documents", "Review"];

export default function Mutation() {
  const [mode, setMode] = useState("apply"); // apply | track

  // ---- application flow state ----
  const [step, setStep] = useState(1);
  const [typeId, setTypeId] = useState("");
  const [district, setDistrict] = useState("");
  const [tehsil, setTehsil] = useState("");
  const [village, setVillage] = useState("");
  const [khasraNo, setKhasraNo] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [relation, setRelation] = useState("");
  const [mobile, setMobile] = useState("");
  const [otherParty, setOtherParty] = useState("");
  const [uploaded, setUploaded] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [refNo, setRefNo] = useState("");

  const selectedType = MUTATION_TYPES.find((t) => t.id === typeId);

  const otherPartyLabel =
    typeId === "sale"
      ? "Seller's name"
      : typeId === "gift"
      ? "Donor's name"
      : typeId === "inheritance" || typeId === "will"
      ? "Deceased's name"
      : "Other party's name";

  const step2Valid =
    district && tehsil && village && khasraNo.trim() && applicantName.trim() && mobile.trim().length >= 10;
  const allDocsUploaded = selectedType ? selectedType.docs.every((d) => uploaded[d]) : false;

  function handleUpload(doc) {
    setUploaded((prev) => ({ ...prev, [doc]: true }));
  }

  function handleSubmit() {
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    setRefNo(`MUT/${year}/${random}`);
    setSubmitted(true);
  }

  function resetApplication() {
    setStep(1);
    setTypeId("");
    setDistrict("");
    setTehsil("");
    setVillage("");
    setKhasraNo("");
    setApplicantName("");
    setRelation("");
    setMobile("");
    setOtherParty("");
    setUploaded({});
    setSubmitted(false);
    setRefNo("");
  }

  // ---- track flow state ----
  const [trackInput, setTrackInput] = useState("");
  const [trackStatus, setTrackStatus] = useState("idle"); // idle | loading | found | notfound

  function handleTrack(e) {
    e.preventDefault();
    if (!trackInput.trim()) return;
    setTrackStatus("loading");
    setTimeout(() => {
      if (trackInput.trim().toUpperCase() === "NOTFOUND") {
        setTrackStatus("notfound");
      } else {
        setTrackStatus("found");
      }
    }, 900);
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2]">
      <main id="main-content" className="max-w-4xl mx-auto px-4 py-8 sm:py-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 mb-4">
          <span>Home</span>
          <span className="mx-1.5 text-slate-300">/</span>
          <span>Services</span>
          <span className="mx-1.5 text-slate-300">/</span>
          <span style={{ color: NAVY }} className="font-medium">Mutation Service</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold" style={{ color: NAVY }}>
            Mutation Service
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-xl">
            Apply to update the recorded owner of a parcel after a sale,
            inheritance, gift, or court order — or track an application already
            in progress.
          </p>
        </div>

        {/* Mode switch */}
        <div className="inline-flex rounded-md border border-slate-200 p-1 bg-slate-50 mb-6">
          {[
            { id: "apply", label: "New application" },
            { id: "track", label: "Track application" },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setMode(t.id)}
              className="px-4 py-1.5 text-sm font-medium rounded transition-colors"
              style={mode === t.id ? { backgroundColor: NAVY, color: "white" } : { color: "#475569" }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {mode === "apply" && (
          <>
            {!submitted && (
              <>
                {/* Stepper header */}
                <ol className="flex items-center mb-7">
                  {STEP_LABELS.map((label, i) => {
                    const n = i + 1;
                    const active = n === step;
                    const done = n < step;
                    return (
                      <li key={label} className="flex items-center flex-1 last:flex-none">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                            style={{
                              backgroundColor: done ? SEAL_GREEN : active ? NAVY : "#E2E8F0",
                              color: done || active ? "white" : "#64748B",
                            }}
                          >
                            {done ? <CheckCircle2 size={14} /> : n}
                          </span>
                          <span
                            className="text-xs font-medium hidden sm:inline"
                            style={{ color: active ? NAVY : "#64748B" }}
                          >
                            {label}
                          </span>
                        </div>
                        {n !== STEP_LABELS.length && (
                          <div
                            className="h-px flex-1 mx-3"
                            style={{ backgroundColor: done ? SEAL_GREEN : "#E2E8F0" }}
                          />
                        )}
                      </li>
                    );
                  })}
                </ol>

                <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 sm:p-7">
                  {/* Step 1 — mutation type */}
                  {step === 1 && (
                    <div>
                      <h2 className="text-sm font-semibold text-slate-700 mb-4">
                        What triggered this mutation?
                      </h2>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {MUTATION_TYPES.map((t) => {
                          const Icon = t.icon;
                          const active = typeId === t.id;
                          return (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setTypeId(t.id)}
                              className="text-left rounded-md border px-4 py-3.5 flex items-start gap-3 transition-colors"
                              style={{
                                borderColor: active ? NAVY : "#E2E8F0",
                                backgroundColor: active ? `${NAVY}0D` : "white",
                              }}
                            >
                              <Icon size={18} style={{ color: active ? NAVY : "#64748B" }} className="mt-0.5 shrink-0" />
                              <span>
                                <span className="block text-sm font-medium text-slate-800">{t.label}</span>
                                <span className="block text-xs text-slate-500 mt-0.5">{t.description}</span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 2 — details */}
                  {step === 2 && (
                    <div className="space-y-5">
                      <div>
                        <h2 className="text-sm font-semibold text-slate-700 mb-3">Property</h2>
                        <div className="grid sm:grid-cols-3 gap-4 mb-4">
                          <Field label="District">
                            <Select
                              value={district}
                              onChange={(e) => {
                                setDistrict(e.target.value);
                                setTehsil("");
                                setVillage("");
                              }}
                              options={DISTRICTS}
                              placeholder="Select district"
                            />
                          </Field>
                          <Field label="Tehsil">
                            <Select
                              value={tehsil}
                              onChange={(e) => {
                                setTehsil(e.target.value);
                                setVillage("");
                              }}
                              options={district ? TEHSILS[district] || [] : []}
                              placeholder={district ? "Select tehsil" : "Select district first"}
                            />
                          </Field>
                          <Field label="Village">
                            <Select
                              value={village}
                              onChange={(e) => setVillage(e.target.value)}
                              options={tehsil ? VILLAGES[tehsil] || [] : []}
                              placeholder={tehsil ? "Select village" : "Select tehsil first"}
                            />
                          </Field>
                        </div>
                        <Field label="Khasra / Survey number">
                          <Input value={khasraNo} onChange={(e) => setKhasraNo(e.target.value)} placeholder="e.g. 142/2" />
                        </Field>
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold text-slate-700 mb-3">Applicant</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Field label="Full name">
                            <Input value={applicantName} onChange={(e) => setApplicantName(e.target.value)} placeholder="As per ID proof" />
                          </Field>
                          <Field label="Relation to previous owner">
                            <Input value={relation} onChange={(e) => setRelation(e.target.value)} placeholder="e.g. Son, Purchaser" />
                          </Field>
                          <Field label="Mobile number">
                            <Input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="10-digit mobile number" type="tel" />
                          </Field>
                          <Field label={otherPartyLabel}>
                            <Input value={otherParty} onChange={(e) => setOtherParty(e.target.value)} placeholder="As recorded in the document" />
                          </Field>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3 — documents */}
                  {step === 3 && selectedType && (
                    <div>
                      <h2 className="text-sm font-semibold text-slate-700 mb-1">
                        Documents required for {selectedType.label.toLowerCase()}
                      </h2>
                      <p className="text-xs text-slate-500 mb-4">
                        Upload clear scans or photos. Each file should be under 5 MB.
                      </p>
                      <ul className="space-y-2.5">
                        {selectedType.docs.map((doc) => (
                          <li
                            key={doc}
                            className="flex items-center justify-between gap-3 rounded-md border border-slate-200 px-4 py-3"
                          >
                            <div className="flex items-center gap-2.5">
                              {uploaded[doc] ? (
                                <CheckCircle2 size={16} style={{ color: SEAL_GREEN }} />
                              ) : (
                                <Circle size={16} className="text-slate-300" />
                              )}
                              <span className="text-sm text-slate-700">{doc}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleUpload(doc)}
                              disabled={uploaded[doc]}
                              className="inline-flex items-center gap-1.5 text-xs font-medium rounded px-3 py-1.5 border disabled:opacity-50"
                              style={{ borderColor: NAVY, color: uploaded[doc] ? SEAL_GREEN : NAVY }}
                            >
                              <UploadCloud size={13} />
                              {uploaded[doc] ? "Uploaded" : "Upload"}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Step 4 — review */}
                  {step === 4 && selectedType && (
                    <div>
                      <h2 className="text-sm font-semibold text-slate-700 mb-4">Review before you submit</h2>
                      <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-5 pb-5 border-b border-slate-200">
                        {[
                          ["Mutation type", selectedType.label],
                          ["Khasra / Survey number", khasraNo],
                          ["Location", `${village}, ${tehsil}, ${district}`],
                          ["Applicant", applicantName],
                          ["Relation", relation || "—"],
                          ["Mobile", mobile],
                          [otherPartyLabel, otherParty || "—"],
                          ["Documents", `${selectedType.docs.length} of ${selectedType.docs.length} uploaded`],
                        ].map(([label, value]) => (
                          <div key={label}>
                            <dt className="text-xs text-slate-500">{label}</dt>
                            <dd className="text-sm font-medium text-slate-800 mt-0.5">{value}</dd>
                          </div>
                        ))}
                      </dl>
                      <div className="flex items-center justify-between rounded-md bg-slate-50 px-4 py-3">
                        <span className="text-sm text-slate-600">Mutation processing fee</span>
                        <span className="text-sm font-semibold text-slate-800">₹250</span>
                      </div>
                    </div>
                  )}

                  {/* Nav buttons */}
                  <div className="flex items-center justify-between mt-7 pt-5 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setStep((s) => Math.max(1, s - 1))}
                      disabled={step === 1}
                      className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 disabled:opacity-0"
                    >
                      <ChevronLeft size={16} />
                      Back
                    </button>

                    {step < 4 ? (
                      <button
                        type="button"
                        onClick={() => setStep((s) => s + 1)}
                        disabled={
                          (step === 1 && !typeId) ||
                          (step === 2 && !step2Valid) ||
                          (step === 3 && !allDocsUploaded)
                        }
                        className="inline-flex items-center gap-1.5 rounded-md px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
                        style={{ backgroundColor: NAVY }}
                      >
                        Continue
                        <ChevronRight size={16} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="rounded-md px-5 py-2.5 text-sm font-semibold text-white"
                        style={{ backgroundColor: SEAL_GREEN }}
                      >
                        Submit application
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Confirmation */}
            {submitted && (
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 sm:p-8 text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${SEAL_GREEN}1A` }}
                >
                  <CheckCircle2 size={26} style={{ color: SEAL_GREEN }} />
                </div>
                <h2 className="text-lg font-serif font-bold" style={{ color: NAVY }}>
                  Application submitted
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Your mutation reference number is
                </p>
                <p className="text-xl font-mono font-semibold mt-1 mb-6" style={{ color: NAVY }}>
                  {refNo}
                </p>

                <ol className="max-w-sm mx-auto text-left space-y-4 mb-7">
                  {TRACK_STAGES.map((s, i) => (
                    <li key={s} className="flex items-center gap-3">
                      {i === 0 ? (
                        <CheckCircle2 size={16} style={{ color: SEAL_GREEN }} className="shrink-0" />
                      ) : (
                        <Circle size={16} className="text-slate-300 shrink-0" />
                      )}
                      <span className={`text-sm ${i === 0 ? "text-slate-800 font-medium" : "text-slate-400"}`}>
                        {s}
                      </span>
                    </li>
                  ))}
                </ol>

                <p className="text-xs text-slate-500 mb-6">
                  Verification by the Patwari typically takes 7–10 working days.
                  You'll get an SMS at {mobile || "your registered number"} at
                  each stage.
                </p>
                <button
                  type="button"
                  onClick={resetApplication}
                  className="text-sm font-medium underline"
                  style={{ color: NAVY }}
                >
                  Start another application
                </button>
              </div>
            )}
          </>
        )}

        {mode === "track" && (
          <div>
            <form onSubmit={handleTrack} className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 sm:p-6 mb-6">
              <Field label="Mutation reference number">
                <div className="flex gap-3 mt-1.5">
                  <Input value={trackInput} onChange={(e) => setTrackInput(e.target.value)} placeholder="e.g. MUT/2026/4821" />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white shrink-0"
                    style={{ backgroundColor: NAVY }}
                  >
                    {trackStatus === "loading" ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                    Track
                  </button>
                </div>
              </Field>
            </form>

            {trackStatus === "notfound" && (
              <div className="rounded-lg border border-amber-300 bg-amber-50 px-6 py-6 flex gap-3">
                <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-900">No application found</p>
                  <p className="text-sm text-amber-800/90 mt-1">
                    Check the reference number against your acknowledgement slip
                    and try again.
                  </p>
                </div>
              </div>
            )}

            {trackStatus === "found" && (
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 sm:p-8">
                <p className="text-xs text-slate-500 mb-1">Reference number</p>
                <p className="text-lg font-mono font-semibold mb-6" style={{ color: NAVY }}>
                  {trackInput}
                </p>
                <ol className="space-y-4">
                  {TRACK_STAGES.map((s, i) => {
                    const currentIndex = 1; // mock: currently under Patwari verification
                    const done = i < currentIndex;
                    const active = i === currentIndex;
                    return (
                      <li key={s} className="flex items-center gap-3">
                        {done ? (
                          <CheckCircle2 size={16} style={{ color: SEAL_GREEN }} className="shrink-0" />
                        ) : active ? (
                          <span className="w-4 h-4 rounded-full border-2 shrink-0" style={{ borderColor: NAVY }} />
                        ) : (
                          <Circle size={16} className="text-slate-300 shrink-0" />
                        )}
                        <span
                          className={`text-sm ${
                            done || active ? "text-slate-800 font-medium" : "text-slate-400"
                          }`}
                        >
                          {s}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}