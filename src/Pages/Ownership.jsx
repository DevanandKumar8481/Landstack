import { useState } from "react";
import {
  Search,
  MapPin,
  ChevronDown,
  Loader2,
  ShieldCheck,
  AlertTriangle,
  Download,
  History,
  QrCode,
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

// Placeholder register data — stands in for a real state land-record API response.
const MOCK_RECORD = {
  khasraNo: "142/2",
  ownerName: "Ramesh Chandra Patel",
  fatherName: "Late Gopal Das Patel",
  area: "2.428 hectares (6.00 acres)",
  landType: "Agricultural — Irrigated",
  khataNo: "0317",
  mutationNo: "MUT/2023/00417",
  lastUpdated: "18 Nov 2023",
  chain: [
    {
      type: "Inheritance",
      detail: "Transferred from Gopal Das Patel to Ramesh Chandra Patel",
      mutationNo: "MUT/2023/00417",
      date: "18 Nov 2023",
    },
    {
      type: "Sale deed",
      detail: "Purchased by Gopal Das Patel from Suresh Vishwakarma",
      mutationNo: "MUT/2011/00892",
      date: "03 Feb 2011",
    },
    {
      type: "Partition",
      detail: "Parcel separated from joint holding Khasra 142",
      mutationNo: "MUT/1998/00156",
      date: "22 Jul 1998",
    },
  ],
};

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
        className="w-full appearance-none rounded-md border border-slate-300 bg-white pl-3 pr-9 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-0"
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

export default function Ownership() {
  const [mode, setMode] = useState("khasra"); // khasra | owner | propertyId
  const [district, setDistrict] = useState("");
  const [tehsil, setTehsil] = useState("");
  const [village, setVillage] = useState("");
  const [khasraNo, setKhasraNo] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [propertyId, setPropertyId] = useState("");

  const [status, setStatus] = useState("idle"); // idle | loading | found | notfound
  const [record, setRecord] = useState(null);

  const canSubmit =
    mode === "khasra"
      ? district && tehsil && village && khasraNo.trim()
      : mode === "owner"
      ? district && ownerName.trim()
      : propertyId.trim().length > 3;

  function handleVerify(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("loading");
    setRecord(null);
    setTimeout(() => {
      const notFound =
        khasraNo.trim() === "999" || propertyId.trim().toUpperCase() === "NOTFOUND";
      if (notFound) {
        setStatus("notfound");
      } else {
        setRecord(MOCK_RECORD);
        setStatus("found");
      }
    }, 1100);
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2]">

      <main id="main-content" className="max-w-5xl mx-auto px-4 py-8 sm:py-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 mb-4">
          <span>Home</span>
          <span className="mx-1.5 text-slate-300">/</span>
          <span>Land Records</span>
          <span className="mx-1.5 text-slate-300">/</span>
          <span style={{ color: NAVY }} className="font-medium">Ownership Verification</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold" style={{ color: NAVY }}>
            Ownership Verification
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-xl">
            Look up the recorded owner of a parcel directly from the state land
            register, using its Khasra number, the owner's name, or a property ID.
          </p>
        </div>

        {/* Search panel */}
        <form
          onSubmit={handleVerify}
          className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 sm:p-6"
        >
          <div className="inline-flex rounded-md border border-slate-200 p-1 bg-slate-50 mb-5">
            {[
              { id: "khasra", label: "Khasra / Survey No." },
              { id: "owner", label: "Owner name" },
              { id: "propertyId", label: "Property ID" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setMode(t.id);
                  setStatus("idle");
                }}
                className="px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded transition-colors"
                style={
                  mode === t.id
                    ? { backgroundColor: NAVY, color: "white" }
                    : { color: "#475569" }
                }
              >
                {t.label}
              </button>
            ))}
          </div>

          {mode !== "propertyId" && (
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
              {mode === "khasra" && (
                <>
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
                </>
              )}
            </div>
          )}

          <div className="grid sm:grid-cols-3 gap-4 items-end">
            <div className="sm:col-span-2">
              {mode === "khasra" && (
                <Field label="Khasra / Survey number">
                  <input
                    value={khasraNo}
                    onChange={(e) => setKhasraNo(e.target.value)}
                    placeholder="e.g. 142/2"
                    className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
                    style={{ "--tw-ring-color": `${NAVY}55` }}
                  />
                </Field>
              )}
              {mode === "owner" && (
                <Field label="Owner's full name">
                  <input
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="As recorded in the register"
                    className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
                    style={{ "--tw-ring-color": `${NAVY}55` }}
                  />
                </Field>
              )}
              {mode === "propertyId" && (
                <Field label="Property ID (UPIN)">
                  <input
                    value={propertyId}
                    onChange={(e) => setPropertyId(e.target.value)}
                    placeholder="e.g. MP-IND-2023-0417"
                    className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
                    style={{ "--tw-ring-color": `${NAVY}55` }}
                  />
                </Field>
              )}
            </div>
            <button
              type="submit"
              disabled={!canSubmit || status === "loading"}
              className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40 transition-opacity"
              style={{ backgroundColor: NAVY }}
            >
              {status === "loading" ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Search size={16} />
              )}
              {status === "loading" ? "Checking register…" : "Verify ownership"}
            </button>
          </div>
        </form>

        {/* Result area */}
        <div className="mt-6">
          {status === "idle" && (
            <div className="rounded-lg border border-dashed border-slate-300 px-6 py-10 text-center text-sm text-slate-500">
              Enter the parcel details above to pull the current entry from the
              official land register.
            </div>
          )}

          {status === "loading" && (
            <div className="rounded-lg border border-slate-200 bg-white px-6 py-10 text-center">
              <div className="relative h-1.5 w-48 mx-auto rounded-full bg-slate-100 overflow-hidden mb-4">
                <div
                  className="absolute inset-y-0 w-1/3 rounded-full animate-pulse"
                  style={{ backgroundColor: NAVY }}
                />
              </div>
              <p className="text-sm text-slate-500">Checking the state land register…</p>
            </div>
          )}

          {status === "notfound" && (
            <div className="rounded-lg border border-amber-300 bg-amber-50 px-6 py-6 flex gap-3">
              <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-900">
                  No matching entry in the register
                </p>
                <p className="text-sm text-amber-800/90 mt-1">
                  Nothing under these details is on file. Check the Khasra number
                  and village against your document, or search by owner name
                  instead.
                </p>
              </div>
            </div>
          )}

          {status === "found" && record && (
            <div className="relative rounded-lg border border-slate-300 bg-white overflow-hidden">
              {/* corner brackets, certificate-style */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-slate-300" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-slate-300" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-slate-300" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-slate-300" />

              <div className="px-6 sm:px-10 py-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                      Record of Rights extract
                    </p>
                    <h2 className="text-xl font-serif font-bold" style={{ color: NAVY }}>
                      Khasra No. {record.khasraNo}
                    </h2>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin size={13} />
                      {village || "Bicholi Hapsi"}, {tehsil || "Indore"}, {district || "Indore"}
                    </p>
                  </div>

                  <div
                    className="shrink-0 flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 border-dashed rotate-[-8deg]"
                    style={{ borderColor: SEAL_GREEN, color: SEAL_GREEN }}
                  >
                    <ShieldCheck size={20} />
                    <span className="text-[10px] font-bold mt-0.5">VERIFIED</span>
                  </div>
                </div>

                <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 pb-6 mb-6 border-b border-slate-200">
                  {[
                    ["Recorded owner", record.ownerName],
                    ["Father's / husband's name", record.fatherName],
                    ["Area", record.area],
                    ["Land type", record.landType],
                    ["Khata number", record.khataNo],
                    ["Last mutation", `${record.mutationNo} · ${record.lastUpdated}`],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-xs text-slate-500">{label}</dt>
                      <dd className="text-sm font-medium text-slate-800 mt-0.5">{value}</dd>
                    </div>
                  ))}
                </dl>

                {/* Mutation / ownership chain */}
                <div className="mb-6">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                    <History size={15} />
                    Ownership chain
                  </h3>
                  <ol className="relative border-l border-slate-200 pl-5 space-y-5">
                    {record.chain.map((c, i) => (
                      <li key={i} className="relative">
                        <span
                          className="absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: i === 0 ? SEAL_GREEN : "#CBD5E1" }}
                        />
                        <p className="text-sm font-medium text-slate-800">{c.type}</p>
                        <p className="text-sm text-slate-600">{c.detail}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {c.mutationNo} · {c.date}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <button
                    className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-white"
                    style={{ backgroundColor: NAVY }}
                  >
                    <Download size={16} />
                    Download Record of Rights (PDF)
                  </button>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <QrCode size={28} className="text-slate-300" />
                    Scan on the state portal to confirm this extract
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-slate-400 mt-6">
          Register data shown here is synced nightly from the state land-records
          database. For legal proceedings, request a certified copy from the
          Tehsildar's office.
        </p>
      </main>
    </div>
  );
}

