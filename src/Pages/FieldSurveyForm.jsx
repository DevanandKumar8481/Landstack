// import { useState, useMemo, useEffect } from 'react';
// import {
//   ClipboardList,
//   MapPin,
//   Navigation2,
//   User,
//   Ruler,
//   FileText,
//   Camera,
//   Save,
//   UploadCloud,
//   CloudOff,
//   CheckCircle2,
//   Circle,
//   ChevronRight,
//   ChevronLeft,
//   X,
//   Landmark,
//   ShieldCheck,
//   Calendar,
//   Signal,
//   Check,
// } from 'lucide-react';

// // ---------------------------------------------------------------------------
// // Static config
// // ---------------------------------------------------------------------------
// const STEPS = [
//   { id: 'parcel', label: 'Parcel Information', icon: ClipboardList },
//   { id: 'location', label: 'Location Details', icon: MapPin },
//   { id: 'ownership', label: 'Ownership Details', icon: User },
//   { id: 'land', label: 'Land Details', icon: Ruler },
//   { id: 'verify', label: 'Verification', icon: ShieldCheck },
//   { id: 'remarks', label: 'Remarks & Photos', icon: Camera },
//   { id: 'review', label: 'Review & Submit', icon: FileText },
// ];

// const LAND_USE_OPTIONS = ['Agricultural', 'Residential', 'Commercial', 'Industrial'];
// const OWNERSHIP_TYPES = ['Individual', 'Joint', 'Government', 'Disputed'];

// const initialForm = {
//   ulpin: '',
//   village: '',
//   landUse: 'Agricultural',
//   surveyDate: new Date().toISOString().slice(0, 10),
//   latitude: '',
//   longitude: '',
//   ownerName: '',
//   ownershipType: 'Individual',
//   area: '',
//   cropUsage: '',
//   verification: '',
//   remarks: '',
//   photoAttached: false,
// };

// // ---------------------------------------------------------------------------
// // Small presentational helpers
// // ---------------------------------------------------------------------------
// function FieldLabel({ children, required }) {
//   return (
//     <label className="block text-sm font-medium text-slate-700 mb-1.5">
//       {children}
//       {required && <span className="text-amber-600 ml-0.5">*</span>}
//     </label>
//   );
// }

// function TextInput({ value, onChange, placeholder, type = 'text', mono, ...rest }) {
//   return (
//     <input
//       type={type}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       className={`w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#14283F]/20 focus:border-[#14283F] transition-colors ${
//         mono ? 'font-mono tracking-wide' : ''
//       }`}
//       {...rest}
//     />
//   );
// }

// function SelectInput({ value, onChange, options }) {
//   return (
//     <select
//       value={value}
//       onChange={onChange}
//       className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#14283F]/20 focus:border-[#14283F] transition-colors"
//     >
//       {options.map((opt) => (
//         <option key={opt} value={opt}>
//           {opt}
//         </option>
//       ))}
//     </select>
//   );
// }

// function SectionCard({ icon: Icon, title, description, children }) {
//   return (
//     <div>
//       <div className="flex items-start gap-3 mb-5">
//         <div className="w-9 h-9 rounded-lg bg-[#14283F]/5 flex items-center justify-center shrink-0 mt-0.5">
//           <Icon className="w-4.5 h-4.5 text-[#14283F]" />
//         </div>
//         <div>
//           <h3 className="text-base font-semibold text-[#14283F]">{title}</h3>
//           {description && <p className="text-sm text-slate-500 mt-0.5">{description}</p>}
//         </div>
//       </div>
//       {children}
//     </div>
//   );
// }

// // ---------------------------------------------------------------------------
// // Main component
// // ---------------------------------------------------------------------------
// export default function FieldSurveyForm() {
//   const [form, setForm] = useState(initialForm);
//   const [stepIndex, setStepIndex] = useState(0);
//   const [visited, setVisited] = useState({ 0: true });
//   const [syncQueue, setSyncQueue] = useState([]);
//   const [queueOpen, setQueueOpen] = useState(false);
//   const [toast, setToast] = useState(null);
//   const [locating, setLocating] = useState(false);

//   const step = STEPS[stepIndex];

//   useEffect(() => {
//     if (!toast) return;
//     const timer = setTimeout(() => setToast(null), 3200);
//     return () => clearTimeout(timer);
//   }, [toast]);

//   const update = (key) => (e) =>
//     setForm((f) => ({ ...f, [key]: e.target.value }));

//   const isStepComplete = (idx) => {
//     if (idx === 0) return form.ulpin.trim() !== '' && form.village.trim() !== '';
//     if (idx === 1) return form.latitude !== '' && form.longitude !== '';
//     if (idx === 2) return form.ownerName.trim() !== '';
//     if (idx === 3) return form.area !== '';
//     if (idx === 4) return form.verification !== '';
//     return true;
//   };

//   const canAdvance = useMemo(() => isStepComplete(stepIndex), [stepIndex, form]);

//   const goToStep = (idx) => {
//     setVisited((v) => ({ ...v, [idx]: true }));
//     setStepIndex(idx);
//   };

//   const handleNext = () => {
//     if (stepIndex < STEPS.length - 1) goToStep(stepIndex + 1);
//   };

//   const handleBack = () => {
//     if (stepIndex > 0) goToStep(stepIndex - 1);
//   };

//   const captureLocation = () => {
//     setLocating(true);
//     if (!navigator.geolocation) {
//       // Fallback simulated coordinates (typical for central India) for demo/offline devices
//       setTimeout(() => {
//         setForm((f) => ({ ...f, latitude: '23.1793', longitude: '75.7849' }));
//         setLocating(false);
//       }, 700);
//       return;
//     }
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setForm((f) => ({
//           ...f,
//           latitude: pos.coords.latitude.toFixed(6),
//           longitude: pos.coords.longitude.toFixed(6),
//         }));
//         setLocating(false);
//       },
//       () => {
//         setForm((f) => ({ ...f, latitude: '23.1793', longitude: '75.7849' }));
//         setLocating(false);
//       },
//       { timeout: 4000 }
//     );
//   };

//   const addToQueue = (label) => {
//     const entry = {
//       id: Date.now(),
//       ulpin: form.ulpin || 'Untitled parcel',
//       village: form.village || '—',
//       label,
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//     };
//     setSyncQueue((q) => [entry, ...q]);
//     setToast(label);
//   };

//   const progressCount = STEPS.slice(0, 6).filter((_, i) => isStepComplete(i)).length;

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* Header */}
//       <header className="bg-[#14283F] text-white">
//         <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4 flex flex-wrap gap-3 justify-between items-center">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 ring-1 ring-white/15">
//               <Landmark className="w-5 h-5 text-amber-400" />
//             </div>
//             <div>
//               <h1 className="text-lg sm:text-xl font-serif font-bold leading-tight">
//                 LandStack <span className="text-white/50 font-normal">/ Field Survey Module</span>
//               </h1>
//               <p className="text-xs text-blue-200/80 leading-tight">
//                 Department of Land Resources · Government of India
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setQueueOpen(true)}
//               className="relative flex items-center gap-1.5 bg-white/10 hover:bg-white/15 transition-colors px-3 py-2 rounded-lg text-xs font-medium"
//             >
//               <UploadCloud className="w-3.5 h-3.5 text-amber-300" />
//               Sync Queue
//               {syncQueue.length > 0 && (
//                 <span className="ml-1 min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-amber-400 text-[#14283F] text-[10px] font-bold flex items-center justify-center">
//                   {syncQueue.length}
//                 </span>
//               )}
//             </button>

//             <div className="flex items-center gap-2 bg-amber-500/95 text-[#14283F] px-3.5 py-2 rounded-lg font-semibold text-xs">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14283F]/60 opacity-75" />
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-[#14283F]" />
//               </span>
//               <CloudOff className="w-3.5 h-3.5" />
//               OFFLINE MODE
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Notice */}
//       <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-6">
//         <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex items-start gap-3">
//           <Signal className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
//           <p className="text-sm text-amber-900">
//             All survey data is stored locally on this device and will sync automatically once
//             internet connectivity is restored. Nothing is lost if the app closes or the device
//             restarts.
//           </p>
//         </div>
//       </div>

//       {/* Body */}
//       <main className="max-w-7xl mx-auto px-5 sm:px-6 py-6 grid lg:grid-cols-[260px_1fr] gap-6">
//         {/* Step rail — desktop */}
//         <aside className="hidden lg:block">
//           <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 sticky top-6">
//             <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-2 py-2">
//               {progressCount}/6 sections complete
//             </p>
//             <nav className="space-y-0.5">
//               {STEPS.map((s, idx) => {
//                 const complete = isStepComplete(idx) && idx < 6;
//                 const active = idx === stepIndex;
//                 const Icon = s.icon;
//                 return (
//                   <button
//                     key={s.id}
//                     onClick={() => goToStep(idx)}
//                     className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${
//                       active
//                         ? 'bg-[#14283F] text-white font-medium'
//                         : 'text-slate-600 hover:bg-slate-50'
//                     }`}
//                   >
//                     {complete ? (
//                       <CheckCircle2 className={`w-4 h-4 shrink-0 ${active ? 'text-amber-400' : 'text-emerald-600'}`} />
//                     ) : (
//                       <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-amber-400' : 'text-slate-400'}`} />
//                     )}
//                     <span className="truncate">
//                       {idx + 1}. {s.label}
//                     </span>
//                   </button>
//                 );
//               })}
//             </nav>
//           </div>
//         </aside>

//         {/* Step rail — mobile */}
//         <div className="lg:hidden -mx-1 px-1 overflow-x-auto">
//           <div className="flex gap-2 pb-1 min-w-max">
//             {STEPS.map((s, idx) => {
//               const complete = isStepComplete(idx) && idx < 6;
//               const active = idx === stepIndex;
//               return (
//                 <button
//                   key={s.id}
//                   onClick={() => goToStep(idx)}
//                   className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-colors ${
//                     active
//                       ? 'bg-[#14283F] text-white border-[#14283F]'
//                       : 'bg-white text-slate-600 border-slate-200'
//                   }`}
//                 >
//                   {complete ? (
//                     <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
//                   ) : (
//                     <Circle className="w-3.5 h-3.5 text-slate-300" />
//                   )}
//                   {idx + 1}. {s.label}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Form card */}
//         <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
//           <div className="px-6 sm:px-8 py-7 min-h-[420px]">
//             {step.id === 'parcel' && (
//               <SectionCard icon={ClipboardList} title="Parcel Information" description="Identify the parcel being surveyed.">
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <FieldLabel required>ULPIN / Parcel ID</FieldLabel>
//                     <TextInput
//                       mono
//                       value={form.ulpin}
//                       onChange={update('ulpin')}
//                       placeholder="MP-23-06-00103-1024"
//                     />
//                   </div>
//                   <div>
//                     <FieldLabel required>Village</FieldLabel>
//                     <TextInput value={form.village} onChange={update('village')} placeholder="Rampura" />
//                   </div>
//                   <div>
//                     <FieldLabel>Land Use</FieldLabel>
//                     <SelectInput value={form.landUse} onChange={update('landUse')} options={LAND_USE_OPTIONS} />
//                   </div>
//                   <div>
//                     <FieldLabel>Survey Date</FieldLabel>
//                     <div className="relative">
//                       <TextInput type="date" value={form.surveyDate} onChange={update('surveyDate')} />
//                       <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
//                     </div>
//                   </div>
//                 </div>
//               </SectionCard>
//             )}

//             {step.id === 'location' && (
//               <SectionCard icon={MapPin} title="Location Details" description="Capture the parcel's coordinates in the field.">
//                 <div className="grid sm:grid-cols-2 gap-5 mb-5">
//                   <div>
//                     <FieldLabel required>Latitude</FieldLabel>
//                     <TextInput mono value={form.latitude} onChange={update('latitude')} placeholder="23.179300" />
//                   </div>
//                   <div>
//                     <FieldLabel required>Longitude</FieldLabel>
//                     <TextInput mono value={form.longitude} onChange={update('longitude')} placeholder="75.784900" />
//                   </div>
//                 </div>
//                 <button
//                   onClick={captureLocation}
//                   disabled={locating}
//                   className="flex items-center gap-2 text-sm font-medium text-[#14283F] border border-[#14283F]/20 bg-[#14283F]/5 hover:bg-[#14283F]/10 px-4 py-2.5 rounded-lg transition-colors disabled:opacity-60"
//                 >
//                   <Navigation2 className={`w-4 h-4 ${locating ? 'animate-spin' : ''}`} />
//                   {locating ? 'Locating…' : 'Capture Current GPS Location'}
//                 </button>
//               </SectionCard>
//             )}

//             {step.id === 'ownership' && (
//               <SectionCard icon={User} title="Ownership Details" description="Record the current owner of record.">
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <FieldLabel required>Owner Name</FieldLabel>
//                     <TextInput value={form.ownerName} onChange={update('ownerName')} placeholder="e.g. Suresh Patel" />
//                   </div>
//                   <div>
//                     <FieldLabel>Ownership Type</FieldLabel>
//                     <SelectInput value={form.ownershipType} onChange={update('ownershipType')} options={OWNERSHIP_TYPES} />
//                   </div>
//                 </div>
//               </SectionCard>
//             )}

//             {step.id === 'land' && (
//               <SectionCard icon={Ruler} title="Land Details" description="Describe the physical use of the parcel.">
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <FieldLabel required>Area (Hectare)</FieldLabel>
//                     <TextInput type="number" value={form.area} onChange={update('area')} placeholder="1.42" />
//                   </div>
//                   <div>
//                     <FieldLabel>Current Crop / Usage</FieldLabel>
//                     <TextInput value={form.cropUsage} onChange={update('cropUsage')} placeholder="e.g. Wheat, fallow, built-up" />
//                   </div>
//                 </div>
//               </SectionCard>
//             )}

//             {step.id === 'verify' && (
//               <SectionCard icon={ShieldCheck} title="Verification" description="Confirm the status of this survey visit.">
//                 <div className="flex flex-wrap gap-3">
//                   {['Verified', 'Pending'].map((option) => {
//                     const active = form.verification === option;
//                     return (
//                       <button
//                         key={option}
//                         onClick={() => setForm((f) => ({ ...f, verification: option }))}
//                         className={`flex items-center gap-2 px-5 py-3 rounded-lg border text-sm font-medium transition-colors ${
//                           active
//                             ? option === 'Verified'
//                               ? 'bg-emerald-600 border-emerald-600 text-white'
//                               : 'bg-amber-500 border-amber-500 text-white'
//                             : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
//                         }`}
//                       >
//                         {active ? <Check className="w-4 h-4" /> : <Circle className="w-4 h-4 text-slate-300" />}
//                         {option}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </SectionCard>
//             )}

//             {step.id === 'remarks' && (
//               <SectionCard icon={Camera} title="Remarks & Photos" description="Add any field notes or supporting photos.">
//                 <FieldLabel>Remarks</FieldLabel>
//                 <textarea
//                   rows={4}
//                   value={form.remarks}
//                   onChange={update('remarks')}
//                   placeholder="Enter observations, discrepancies, or notes for the reviewing officer…"
//                   className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#14283F]/20 focus:border-[#14283F] transition-colors mb-5"
//                 />
//                 <button
//                   onClick={() => setForm((f) => ({ ...f, photoAttached: !f.photoAttached }))}
//                   className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
//                     form.photoAttached
//                       ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
//                       : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
//                   }`}
//                 >
//                   <Camera className="w-4 h-4" />
//                   {form.photoAttached ? 'Photo attached' : 'Attach site photo'}
//                 </button>
//               </SectionCard>
//             )}

//             {step.id === 'review' && (
//               <SectionCard icon={FileText} title="Review & Submit" description="Confirm the details below before adding to the sync queue.">
//                 <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm mb-6">
//                   {[
//                     ['ULPIN / Parcel ID', form.ulpin || '—'],
//                     ['Village', form.village || '—'],
//                     ['Land Use', form.landUse],
//                     ['Survey Date', form.surveyDate],
//                     ['Coordinates', form.latitude && form.longitude ? `${form.latitude}, ${form.longitude}` : '—'],
//                     ['Owner Name', form.ownerName || '—'],
//                     ['Ownership Type', form.ownershipType],
//                     ['Area', form.area ? `${form.area} ha` : '—'],
//                     ['Crop / Usage', form.cropUsage || '—'],
//                     ['Verification', form.verification || 'Not set'],
//                   ].map(([label, value]) => (
//                     <div key={label} className="flex justify-between border-b border-slate-100 pb-2">
//                       <dt className="text-slate-500">{label}</dt>
//                       <dd className="font-medium text-slate-900 text-right">{value}</dd>
//                     </div>
//                   ))}
//                 </dl>
//                 {form.remarks && (
//                   <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600 mb-2">
//                     <span className="font-medium text-slate-700">Remarks: </span>
//                     {form.remarks}
//                   </div>
//                 )}
//               </SectionCard>
//             )}
//           </div>

//           {/* Footer actions */}
//           <div className="border-t border-slate-100 bg-slate-50 px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3">
//             <div className="flex gap-2">
//               <button
//                 onClick={handleBack}
//                 disabled={stepIndex === 0}
//                 className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 border border-slate-300 hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
//               >
//                 <ChevronLeft className="w-4 h-4" />
//                 Back
//               </button>
//               <button
//                 onClick={() => addToQueue('Draft saved')}
//                 className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 border border-slate-300 hover:bg-white transition-colors"
//               >
//                 <Save className="w-4 h-4" />
//                 Save Draft
//               </button>
//             </div>

//             {step.id !== 'review' ? (
//               <button
//                 onClick={handleNext}
//                 className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#14283F] text-white hover:bg-[#0e1e30] transition-colors"
//               >
//                 Next: {STEPS[stepIndex + 1]?.label}
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             ) : (
//               <button
//                 onClick={() => addToQueue('Added to sync queue')}
//                 className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold bg-amber-500 text-[#14283F] hover:bg-amber-400 transition-colors"
//               >
//                 <UploadCloud className="w-4 h-4" />
//                 Add to Sync Queue
//               </button>
//             )}
//           </div>
//         </div>
//       </main>

//       {/* Sync queue drawer */}
//       {queueOpen && (
//         <>
//           <div className="fixed inset-0 bg-black/30 z-[60]" onClick={() => setQueueOpen(false)} />
//           <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-[70] shadow-2xl flex flex-col">
//             <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
//               <h3 className="font-semibold text-[#14283F]">Sync Queue ({syncQueue.length})</h3>
//               <button onClick={() => setQueueOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100">
//                 <X className="w-4 h-4 text-slate-500" />
//               </button>
//             </div>
//             <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
//               {syncQueue.length === 0 && (
//                 <p className="text-sm text-slate-400 text-center pt-10">
//                   No surveys queued yet. Saved drafts and submissions will appear here until
//                   connectivity is restored.
//                 </p>
//               )}
//               {syncQueue.map((item) => (
//                 <div key={item.id} className="border border-slate-200 rounded-lg p-3.5">
//                   <div className="flex items-center justify-between mb-1">
//                     <span className="text-xs font-mono text-slate-500">{item.ulpin}</span>
//                     <span className="text-[11px] text-slate-400">{item.time}</span>
//                   </div>
//                   <p className="text-sm font-medium text-slate-800">{item.village}</p>
//                   <span className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
//                     <CloudOff className="w-3 h-3" /> {item.label} · pending upload
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </>
//       )}

//       {/* Toast */}
//       {toast && (
//         <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[80] bg-[#14283F] text-white text-sm font-medium px-4 py-3 rounded-lg shadow-xl flex items-center gap-2">
//           <CheckCircle2 className="w-4 h-4 text-emerald-400" />
//           {toast}
//         </div>
//       )}
//     </div>
//   );
// }

// src/Pages/FieldSurveyForm.jsx
import { useState, useRef } from "react";
import {
  ClipboardList,
  MapPin,
  User,
  Camera,
  AlertTriangle,
  CheckCircle2,
  LocateFixed,
  Loader2,
  Trash2,
  ChevronRight,
  FileCheck2,
  Compass,
} from "lucide-react";

const NAVY = "#14283F";

/* ---------------- Shared primitives (kept local to this page, same pattern as other pages) ---------------- */

function Field({ label, required, error, hint, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-amber-600 ml-0.5">*</span>}
      </span>
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
      {error && (
        <span className="mt-1.5 flex items-center gap-1 text-[13px] text-red-600">
          <AlertTriangle size={13} />
          {error}
        </span>
      )}
    </label>
  );
}

function Input({ error, className = "", ...props }) {
  return (
    <input
      {...props}
      className={`h-11 w-full rounded-lg border px-3 text-[15px] outline-none transition-colors focus:ring-2 focus:ring-[#14283F]/15 focus:border-[#14283F] ${
        error ? "border-red-400" : "border-slate-300"
      } ${className}`}
    />
  );
}

function Textarea({ error, className = "", ...props }) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg border px-3 py-2.5 text-[15px] outline-none transition-colors focus:ring-2 focus:ring-[#14283F]/15 focus:border-[#14283F] resize-none ${
        error ? "border-red-400" : "border-slate-300"
      } ${className}`}
    />
  );
}

function Select({ options, placeholder, error, ...props }) {
  return (
    <select
      {...props}
      className={`h-11 w-full rounded-lg border px-3 text-[15px] outline-none bg-white transition-colors focus:ring-2 focus:ring-[#14283F]/15 focus:border-[#14283F] ${
        error ? "border-red-400" : "border-slate-300"
      }`}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function SectionCard({ number, title, description, icon: Icon, children }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-start gap-3 px-5 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/60">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white text-sm font-bold"
          style={{ backgroundColor: NAVY }}
        >
          {number}
        </div>
        <div className="min-w-0">
          <h2 className="text-base font-semibold flex items-center gap-2" style={{ color: NAVY }}>
            {Icon && <Icon size={17} className="text-amber-600" />}
            {title}
          </h2>
          {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
        </div>
      </div>
      <div className="p-5 sm:p-6 space-y-5">{children}</div>
    </section>
  );
}

const districts = ["Ujjain", "Indore", "Bhopal", "Dewas"];
const tehsilMap = {
  Ujjain: ["Ujjain City", "Nagda", "Mahidpur"],
  Indore: ["Sanwer", "Depalpur", "Rau"],
  Bhopal: ["Huzur", "Berasia"],
  Dewas: ["Dewas", "Sonkatch"],
};
const landTypes = ["Agricultural", "Residential", "Commercial", "Industrial", "Institutional", "Green Zone"];
const areaUnits = ["Hectare", "Acre", "Sq. Meter"];

function generateSurveyId() {
  const rand = Math.floor(1000 + Math.random() * 9000);
  const date = new Date();
  return `FS-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}-${rand}`;
}

export default function FieldSurveyForm() {
  const [surveyId] = useState(generateSurveyId);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    surveyorName: "",
    surveyorId: "",
    surveyDate: new Date().toISOString().slice(0, 10),
    district: "",
    tehsil: "",
    village: "",
    khasraNumber: "",
    khataNumber: "",
    landType: "",
    area: "",
    areaUnit: "Hectare",
    boundaryNorth: "",
    boundarySouth: "",
    boundaryEast: "",
    boundaryWest: "",
    ownerName: "",
    guardianName: "",
    mobile: "",
    idNumber: "",
    latitude: "",
    longitude: "",
    encroachment: "",
    disputeStatus: "None",
    remarks: "",
    declaration: false,
  });

  const [photos, setPhotos] = useState([]); // { id, url, name }
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState("");

  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const captureLocation = () => {
    if (!navigator.geolocation) {
      setLocateError("Location services are not available on this device.");
      return;
    }
    setLocating(true);
    setLocateError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        update("latitude", pos.coords.latitude.toFixed(6));
        update("longitude", pos.coords.longitude.toFixed(6));
        setLocating(false);
      },
      () => {
        setLocateError("Couldn't get your location. Enable location access and try again.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const addPhotos = (fileList) => {
    const files = Array.from(fileList).slice(0, 6 - photos.length);
    const next = files.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setPhotos((p) => [...p, ...next]);
  };

  const removePhoto = (id) => {
    setPhotos((p) => p.filter((ph) => ph.id !== id));
  };

  const validate = () => {
    const req = {
      surveyorName: "Surveyor name is required.",
      district: "Select a district.",
      tehsil: "Select a tehsil.",
      village: "Village name is required.",
      khasraNumber: "Khasra / Survey number is required.",
      landType: "Select the land type.",
      area: "Enter the surveyed area.",
      ownerName: "Owner name is required.",
    };
    const next = {};
    Object.entries(req).forEach(([key, msg]) => {
      if (!String(form[key]).trim()) next[key] = msg;
    });
    if (!form.declaration) next.declaration = "You must certify this survey before submitting.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const firstKey = Object.keys(errors)[0];
      document.getElementById(firstKey)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setPhotos([]);
    setErrors({});
    setForm({
      surveyorName: "",
      surveyorId: "",
      surveyDate: new Date().toISOString().slice(0, 10),
      district: "",
      tehsil: "",
      village: "",
      khasraNumber: "",
      khataNumber: "",
      landType: "",
      area: "",
      areaUnit: "Hectare",
      boundaryNorth: "",
      boundarySouth: "",
      boundaryEast: "",
      boundaryWest: "",
      ownerName: "",
      guardianName: "",
      mobile: "",
      idNumber: "",
      latitude: "",
      longitude: "",
      encroachment: "",
      disputeStatus: "None",
      remarks: "",
      declaration: false,
    });
  };

  /* ---------------- Success state ---------------- */
  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
            <CheckCircle2 size={30} className="text-emerald-600" />
          </div>
          <h1 className="text-xl font-serif font-bold" style={{ color: NAVY }}>
            Survey submitted
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            The field survey has been recorded and queued for departmental review.
          </p>

          <div className="mt-6 rounded-lg bg-slate-50 border border-slate-200 p-4 text-left text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Survey ID</span>
              <span className="font-mono font-semibold" style={{ color: NAVY }}>{surveyId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Khasra Number</span>
              <span className="font-medium text-slate-800">{form.khasraNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Village</span>
              <span className="font-medium text-slate-800">{form.village}, {form.tehsil}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Photos attached</span>
              <span className="font-medium text-slate-800">{photos.length}</span>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="mt-7 w-full h-11 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: NAVY }}
          >
            Start a new survey
          </button>
        </div>
      </main>
    );
  }

  /* ---------------- Form ---------------- */
  return (
    <main className="min-h-screen bg-slate-100">
      {/* Page header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
          <p className="text-xs font-medium tracking-wide text-amber-600 uppercase">Field Operations</p>
          <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold flex items-center gap-2.5" style={{ color: NAVY }}>
                <ClipboardList size={26} />
                Land Parcel Survey Form
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Record on-site parcel details, ownership and photographic evidence.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-right">
              <p className="text-[11px] text-slate-500">Survey ID</p>
              <p className="font-mono text-sm font-semibold" style={{ color: NAVY }}>{surveyId}</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-4xl px-4 sm:px-6 py-8 space-y-5">
        {/* 1. Survey Identification */}
        <SectionCard number={1} icon={Compass} title="Survey Identification" description="Who is conducting this survey, and where.">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Surveyor Name" required error={errors.surveyorName}>
              <Input
                id="surveyorName"
                placeholder="Enter surveyor's full name"
                value={form.surveyorName}
                error={errors.surveyorName}
                onChange={(e) => update("surveyorName", e.target.value)}
              />
            </Field>
            <Field label="Surveyor ID" hint="Optional, if issued">
              <Input
                placeholder="e.g. FO-2381"
                value={form.surveyorId}
                onChange={(e) => update("surveyorId", e.target.value)}
              />
            </Field>
            <Field label="Survey Date" required>
              <Input
                type="date"
                value={form.surveyDate}
                onChange={(e) => update("surveyDate", e.target.value)}
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <Field label="District" required error={errors.district}>
              <Select
                id="district"
                placeholder="Select district"
                options={districts}
                value={form.district}
                error={errors.district}
                onChange={(e) => {
                  update("district", e.target.value);
                  update("tehsil", "");
                }}
              />
            </Field>
            <Field label="Tehsil" required error={errors.tehsil}>
              <Select
                id="tehsil"
                placeholder={form.district ? "Select tehsil" : "Select district first"}
                options={form.district ? tehsilMap[form.district] : []}
                value={form.tehsil}
                error={errors.tehsil}
                disabled={!form.district}
                onChange={(e) => update("tehsil", e.target.value)}
              />
            </Field>
            <Field label="Village" required error={errors.village}>
              <Input
                id="village"
                placeholder="Enter village name"
                value={form.village}
                error={errors.village}
                onChange={(e) => update("village", e.target.value)}
              />
            </Field>
          </div>
        </SectionCard>

        {/* 2. Parcel Details */}
        <SectionCard number={2} icon={MapPin} title="Parcel Details" description="Identification and physical characteristics of the land.">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Khasra / Survey Number" required error={errors.khasraNumber}>
              <Input
                id="khasraNumber"
                placeholder="e.g. 142/2"
                value={form.khasraNumber}
                error={errors.khasraNumber}
                onChange={(e) => update("khasraNumber", e.target.value)}
              />
            </Field>
            <Field label="Khata Number">
              <Input
                placeholder="e.g. 56"
                value={form.khataNumber}
                onChange={(e) => update("khataNumber", e.target.value)}
              />
            </Field>
            <Field label="Land Type" required error={errors.landType}>
              <Select
                id="landType"
                placeholder="Select land type"
                options={landTypes}
                value={form.landType}
                error={errors.landType}
                onChange={(e) => update("landType", e.target.value)}
              />
            </Field>
            <Field label="Surveyed Area" required error={errors.area}>
              <div className="flex gap-2">
                <Input
                  id="area"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={form.area}
                  error={errors.area}
                  onChange={(e) => update("area", e.target.value)}
                  className="flex-1"
                />
                <select
                  value={form.areaUnit}
                  onChange={(e) => update("areaUnit", e.target.value)}
                  className="h-11 rounded-lg border border-slate-300 px-2 text-sm bg-white outline-none focus:ring-2 focus:ring-[#14283F]/15"
                >
                  {areaUnits.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
            </Field>
          </div>

          <div>
            <span className="block text-sm font-medium text-slate-700 mb-2">Adjoining Boundaries</span>
            <div className="grid grid-cols-2 gap-4">
              <Field label="North">
                <Input placeholder="Neighboring plot / owner" value={form.boundaryNorth} onChange={(e) => update("boundaryNorth", e.target.value)} />
              </Field>
              <Field label="South">
                <Input placeholder="Neighboring plot / owner" value={form.boundarySouth} onChange={(e) => update("boundarySouth", e.target.value)} />
              </Field>
              <Field label="East">
                <Input placeholder="Neighboring plot / owner" value={form.boundaryEast} onChange={(e) => update("boundaryEast", e.target.value)} />
              </Field>
              <Field label="West">
                <Input placeholder="Neighboring plot / owner" value={form.boundaryWest} onChange={(e) => update("boundaryWest", e.target.value)} />
              </Field>
            </div>
          </div>
        </SectionCard>

        {/* 3. Owner Details */}
        <SectionCard number={3} icon={User} title="Owner Details" description="Recorded owner or occupant present at the time of survey.">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Owner Name" required error={errors.ownerName}>
              <Input
                id="ownerName"
                placeholder="Full name"
                value={form.ownerName}
                error={errors.ownerName}
                onChange={(e) => update("ownerName", e.target.value)}
              />
            </Field>
            <Field label="Father's / Husband's Name">
              <Input
                placeholder="Full name"
                value={form.guardianName}
                onChange={(e) => update("guardianName", e.target.value)}
              />
            </Field>
            <Field label="Mobile Number">
              <Input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="10-digit mobile number"
                value={form.mobile}
                onChange={(e) => update("mobile", e.target.value.replace(/\D/g, ""))}
              />
            </Field>
            <Field label="ID Number" hint="Aadhaar / Voter ID, last 4 digits recommended">
              <Input
                placeholder="XXXX-XXXX-1234"
                value={form.idNumber}
                onChange={(e) => update("idNumber", e.target.value)}
              />
            </Field>
          </div>
        </SectionCard>

        {/* 4. GPS Location */}
        <SectionCard number={4} icon={LocateFixed} title="GPS Coordinates" description="Capture the exact on-ground location of the parcel.">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Latitude">
              <Input placeholder="Not captured" value={form.latitude} onChange={(e) => update("latitude", e.target.value)} />
            </Field>
            <Field label="Longitude">
              <Input placeholder="Not captured" value={form.longitude} onChange={(e) => update("longitude", e.target.value)} />
            </Field>
          </div>

          <button
            type="button"
            onClick={captureLocation}
            disabled={locating}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-slate-300 text-sm font-medium hover:bg-slate-50 transition-colors disabled:opacity-60"
            style={{ color: NAVY }}
          >
            {locating ? <Loader2 size={16} className="animate-spin" /> : <LocateFixed size={16} />}
            {locating ? "Capturing location…" : "Capture current location"}
          </button>

          {locateError && (
            <p className="flex items-center gap-1.5 text-[13px] text-red-600">
              <AlertTriangle size={13} />
              {locateError}
            </p>
          )}
          {form.latitude && form.longitude && !locateError && (
            <p className="flex items-center gap-1.5 text-[13px] text-emerald-600">
              <CheckCircle2 size={13} />
              Location captured successfully.
            </p>
          )}
        </SectionCard>

        {/* 5. Site Photographs */}
        <SectionCard number={5} icon={Camera} title="Site Photographs" description="Attach up to 6 photos as visual evidence of the survey.">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {photos.map((p) => (
              <div key={p.id} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 group">
                <img src={p.url} alt={p.name} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(p.id)}
                  aria-label="Remove photo"
                  className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}

            {photos.length < 6 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-lg border-2 border-dashed border-slate-300 text-slate-400 hover:border-slate-400 hover:text-slate-500 flex flex-col items-center justify-center gap-1.5 transition-colors"
              >
                <Camera size={20} />
                <span className="text-[11px] font-medium">Add photo</span>
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            capture="environment"
            className="hidden"
            onChange={(e) => e.target.files && addPhotos(e.target.files)}
          />
          <p className="text-xs text-slate-400">{photos.length} of 6 photos attached</p>
        </SectionCard>

        {/* 6. Observations */}
        <SectionCard number={6} icon={AlertTriangle} title="Observations & Remarks" description="Note any discrepancies found during the survey.">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Encroachment Found">
              <div className="flex gap-3">
                {["No", "Yes"].map((opt) => (
                  <label
                    key={opt}
                    className={`flex-1 flex items-center justify-center gap-2 h-11 rounded-lg border text-sm font-medium cursor-pointer transition-colors ${
                      form.encroachment === opt
                        ? "border-[#14283F] bg-[#14283F]/5 text-[#14283F]"
                        : "border-slate-300 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="encroachment"
                      value={opt}
                      checked={form.encroachment === opt}
                      onChange={(e) => update("encroachment", e.target.value)}
                      className="sr-only"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </Field>
            <Field label="Dispute Status">
              <Select
                options={["None", "Under Review", "Litigation Pending"]}
                value={form.disputeStatus}
                onChange={(e) => update("disputeStatus", e.target.value)}
                placeholder="Select status"
              />
            </Field>
          </div>

          <Field label="Additional Remarks">
            <Textarea
              rows={4}
              placeholder="Describe any relevant on-site observations…"
              value={form.remarks}
              onChange={(e) => update("remarks", e.target.value)}
            />
          </Field>
        </SectionCard>

        {/* 7. Declaration */}
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm p-5 sm:p-6">
          <label id="declaration" className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.declaration}
              onChange={(e) => update("declaration", e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 accent-[#14283F]"
            />
            <span className="text-sm text-slate-600 leading-relaxed">
              I certify that the details recorded in this form were observed and verified by me at the survey
              site on the date indicated above, to the best of my knowledge.
            </span>
          </label>
          {errors.declaration && (
            <p className="mt-2 flex items-center gap-1.5 text-[13px] text-red-600">
              <AlertTriangle size={13} />
              {errors.declaration}
            </p>
          )}
        </section>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            <FileCheck2 size={14} />
            This record will be queued for departmental review after submission.
          </p>
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-7 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: NAVY }}
          >
            Submit Survey
            <ChevronRight size={17} />
          </button>
        </div>
      </form>
    </main>
  );
}