import React, { useState, useMemo, useRef } from 'react';
import {
  Search, FileText, Map, History, FileSignature, AlertTriangle,
  ShieldCheck, Link as LinkIcon, QrCode, Eye, Download, FileCheck2,
  ChevronDown, MonitorSmartphone, X, Copy, CheckCircle2, Loader2,
  ArrowLeft, MapPin, Ban
} from 'lucide-react';

//   Mock "database" — stands in for a real land-records API          
const RECORDS = [
  {
    id: 'r1',
    ulpin: 'MP0304-01142-002',
    khasra: '142/2',
    khata: '56',
    survey: '142',
    owner: 'Ramesh Kumar Sharma',
    district: 'Indore',
    tehsil: 'Sanwer',
    village: 'Palasia',
    area: '1.450 Ha',
    landType: 'Agricultural (Irrigated)',
    encumbrance: 'No Active Loans',
    encumbranceOk: true,
    lastMutationDate: '12-Aug-2023',
    signatureValid: true,
    litigations: 'None',
    litigationsOk: true,
    hash: '0x8f4c2a91e6d0b3f7c5a12de4f9b6837a91c0e3d2f4b5a6c7d8e9f0a1b2c3b392',
    corners: [
      { label: 'A', lat: '22.7196', lng: '75.8577' },
      { label: 'B', lat: '22.7199', lng: '75.8583' },
      { label: 'C', lat: '22.7192', lng: '75.8586' },
      { label: 'D', lat: '22.7189', lng: '75.8580' }
    ],
    adjoining: { north: 'Khasra 141/1', south: 'Khasra 143', east: 'Village Road', west: 'Khasra 142/1' },
    ownershipHistory: [
      { year: '2023', owner: 'Ramesh Kumar Sharma', mode: 'Inheritance', area: '1.450 Ha' },
      { year: '2005', owner: 'Late Motilal Sharma', mode: 'Sale Deed', area: '1.450 Ha' },
      { year: '1988', owner: 'Late Motilal Sharma', mode: 'Original Settlement', area: '1.620 Ha' }
    ],
    mutationRecords: [
      { id: 'MUT-2023-0456', date: '12-Aug-2023', type: 'Inheritance Mutation', status: 'Approved', description: 'Ownership transferred to legal heir following succession.' },
      { id: 'MUT-2005-0122', date: '03-Mar-2005', type: 'Sale Mutation', status: 'Approved', description: 'Ownership transferred via registered sale deed no. 1122/2005.' }
    ],
    documents: [
      { name: 'RoR (B-1) Extract', type: 'Record of Rights', date: '31-Aug-2026' },
      { name: 'Mutation Order MUT-2023-0456', type: 'Mutation Order', date: '12-Aug-2023' },
      { name: 'Original Sale Deed 1122/2005', type: 'Sale Deed', date: '03-Mar-2005' }
    ],
    ledger: [
      { block: '1,048,221', hash: '0x8f4c2a91e6d0b3f7c5a12de4f9b6837a91c0e3d2f4b5a6c7d8e9f0a1b2c3b392', timestamp: '31-Aug-2026 09:14', action: 'Record synced to ledger' },
      { block: '1,031,884', hash: '0x3a1b9c7e2f4d6a8b0c1e3f5a7b9c0d2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2b4c', timestamp: '12-Aug-2023 11:02', action: 'Mutation MUT-2023-0456 recorded' },
      { block: '0,884,552', hash: '0x1e2d3c4b5a6f7e8d9c0b1a2f3e4d5c6b7a8f9e0d1c2b3a4f5e6d7c8b9a0f1e2d', timestamp: '03-Mar-2005 00:00', action: 'Legacy record migrated' }
    ]
  },
  {
    id: 'r2',
    ulpin: 'MP0304-02089-001',
    khasra: '89/1',
    khata: '23',
    survey: '89',
    owner: 'Sunita Devi Patel',
    district: 'Indore',
    tehsil: 'Depalpur',
    village: 'Bhawarkua',
    area: '0.820 Ha',
    landType: 'Residential Plot',
    encumbrance: 'Bank Loan - SBI (Active)',
    encumbranceOk: false,
    lastMutationDate: '03-Feb-2024',
    signatureValid: true,
    litigations: 'None',
    litigationsOk: true,
    hash: '0x2b7d4e91a3c5f8b0d2e4a6c8f0b2d4e6a8c0f2b4d6e8a0c2f4b6d8e0a2c4f6b8',
    corners: [
      { label: 'A', lat: '22.6789', lng: '75.9012' },
      { label: 'B', lat: '22.6792', lng: '75.9017' },
      { label: 'C', lat: '22.6787', lng: '75.9020' },
      { label: 'D', lat: '22.6784', lng: '75.9015' }
    ],
    adjoining: { north: 'Khasra 88', south: 'Khasra 90/2', east: 'Nala (Drain)', west: 'Main Road' },
    ownershipHistory: [
      { year: '2024', owner: 'Sunita Devi Patel', mode: 'Sale Deed', area: '0.820 Ha' },
      { year: '2011', owner: 'Ashok Patel', mode: 'Gift Deed', area: '0.820 Ha' }
    ],
    mutationRecords: [
      { id: 'MUT-2024-0091', date: '03-Feb-2024', type: 'Sale Mutation', status: 'Approved', description: 'Ownership transferred via registered sale deed no. 445/2024.' },
      { id: 'MUT-2011-0033', date: '19-Jun-2011', type: 'Gift Mutation', status: 'Approved', description: 'Transferred via gift deed to family member.' }
    ],
    documents: [
      { name: 'RoR (P-2) Extract', type: 'Record of Rights', date: '31-Aug-2026' },
      { name: 'Bank Loan Encumbrance Certificate', type: 'Encumbrance Certificate', date: '03-Feb-2024' },
      { name: 'Sale Deed 445/2024', type: 'Sale Deed', date: '03-Feb-2024' }
    ],
    ledger: [
      { block: '1,050,110', hash: '0x2b7d4e91a3c5f8b0d2e4a6c8f0b2d4e6a8c0f2b4d6e8a0c2f4b6d8e0a2c4f6b8', timestamp: '31-Aug-2026 09:14', action: 'Record synced to ledger' },
      { block: '1,038,447', hash: '0x9c1e3f5a7b9d0c2e4f6a8b0d2e4f6a8c0b2d4e6f8a0c2e4b6d8f0a2c4e6b8d0f', timestamp: '03-Feb-2024 14:37', action: 'Mutation MUT-2024-0091 recorded, encumbrance flagged' }
    ]
  },
  {
    id: 'r3',
    ulpin: 'MP0201-00015-003',
    khasra: '15/3',
    khata: '8',
    survey: '15',
    owner: 'Iqbal Ahmed Khan',
    district: 'Bhopal',
    tehsil: 'Berasia',
    village: 'Bhopal Rural',
    area: '2.100 Ha',
    landType: 'Agricultural (Unirrigated)',
    encumbrance: 'No Active Loans',
    encumbranceOk: true,
    lastMutationDate: '22-Nov-2022',
    signatureValid: true,
    litigations: '1 Pending Civil Case',
    litigationsOk: false,
    hash: '0x5d0f2a4c6e8b0d2f4a6c8e0b2d4f6a8c0e2b4d6f8a0c2e4b6d8f0a2c4e6b8d0f',
    corners: [
      { label: 'A', lat: '23.4028', lng: '77.5423' },
      { label: 'B', lat: '23.4034', lng: '77.5431' },
      { label: 'C', lat: '23.4022', lng: '77.5436' },
      { label: 'D', lat: '23.4016', lng: '77.5428' }
    ],
    adjoining: { north: 'Khasra 14', south: 'Khasra 16', east: 'Canal', west: 'Khasra 15/2' },
    ownershipHistory: [
      { year: '2022', owner: 'Iqbal Ahmed Khan', mode: 'Sale Deed', area: '2.100 Ha' },
      { year: '1995', owner: 'Rafiq Ahmed Khan', mode: 'Inheritance', area: '2.100 Ha' }
    ],
    mutationRecords: [
      { id: 'MUT-2022-0210', date: '22-Nov-2022', type: 'Sale Mutation', status: 'Approved', description: 'Ownership transferred via registered sale deed no. 890/2022.' },
      { id: 'MUT-2024-0187', date: '14-Jan-2024', type: 'Boundary Correction', status: 'Under Review', description: 'Survey re-verification requested by tehsildar office.' }
    ],
    documents: [
      { name: 'RoR (B-1) Extract', type: 'Record of Rights', date: '31-Aug-2026' },
      { name: 'Civil Case Notice CC-2024-0056', type: 'Litigation Notice', date: '02-Apr-2024' },
      { name: 'Sale Deed 890/2022', type: 'Sale Deed', date: '22-Nov-2022' }
    ],
    ledger: [
      { block: '1,049,903', hash: '0x5d0f2a4c6e8b0d2f4a6c8e0b2d4f6a8c0e2b4d6f8a0c2e4b6d8f0a2c4e6b8d0f', timestamp: '31-Aug-2026 09:14', action: 'Record synced to ledger' },
      { block: '1,040,215', hash: '0x7a9c1e3f5b7d9f1a3c5e7b9d1f3a5c7e9b1d3f5a7c9e1b3d5f7a9c1e3b5d7f9a', timestamp: '14-Jan-2024 10:20', action: 'Boundary correction request logged' },
      { block: '1,022,671', hash: '0x4b6d8f0a2c4e6b8d0f2a4c6e8b0d2f4a6c8e0b2d4f6a8c0e2b4d6f8a0c2e4b6d', timestamp: '22-Nov-2022 16:45', action: 'Mutation MUT-2022-0210 recorded' }
    ]
  }
];

const SEARCH_TYPES = ['ULPIN/Parcel ID', 'Khasra Number', 'Khata Number', 'Survey Number', 'Owner Name'];

const FIELD_BY_TYPE = {
  'ULPIN/Parcel ID': 'ulpin',
  'Khasra Number': 'khasra',
  'Khata Number': 'khata',
  'Survey Number': 'survey',
  'Owner Name': 'owner'
};

const PLACEHOLDER_BY_TYPE = {
  'ULPIN/Parcel ID': 'Enter ULPIN (e.g., MP0304-01142-002)',
  'Khasra Number': 'Enter Khasra Number (e.g., 142/2)',
  'Khata Number': 'Enter Khata Number (e.g., 56)',
  'Survey Number': 'Enter Survey Number (e.g., 142)',
  'Owner Name': 'Enter Owner Name (e.g., Ramesh Kumar Sharma)'
};

const DISTRICTS = ['Select District', 'Indore', 'Bhopal'];
const TEHSILS_BY_DISTRICT = {
  'Select District': ['Select Tehsil'],
  Indore: ['Select Tehsil', 'Sanwer', 'Depalpur'],
  Bhopal: ['Select Tehsil', 'Berasia']
};
const VILLAGES_BY_TEHSIL = {
  'Select Tehsil': ['Select Village'],
  Sanwer: ['Select Village', 'Palasia'],
  Depalpur: ['Select Village', 'Bhawarkua'],
  Berasia: ['Select Village', 'Bhopal Rural']
};

const TABS = ['Overview', 'Ownership History', 'Mutation Records', 'Documents', 'GIS Map', 'Activity History'];

// Minimal, dependency-free PDF generator(produces a real, valid single-page PDF file client-side) 
function sanitizeForPdf(str) {
  return String(str)
    .replace(/₹/g, 'Rs.')
    .replace(/[^\x20-\x7E]/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function buildPdfBlob(title, lines) {
  const allLines = [title, ''].concat(lines);
  let content = 'BT /F1 11 Tf 50 742 Td\n';
  allLines.forEach((line, idx) => {
    const isTitle = idx === 0;
    if (isTitle) content += '/F1 15 Tf\n';
    content += `(${sanitizeForPdf(line)}) Tj\n0 -${isTitle ? 24 : 16} Td\n`;
    if (isTitle) content += '/F1 11 Tf\n';
  });
  content += 'ET';

  const objs = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>\nendobj\n',
    `4 0 obj\n<< /Length ${content.length} >>\nstream\n${content}\nendstream\nendobj\n`,
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n'
  ];

  let pdf = '%PDF-1.4\n';
  const offsets = [];
  objs.forEach((obj) => {
    offsets.push(pdf.length);
    pdf += obj;
  });
  const xrefStart = pdf.length;
  let xref = `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((off) => {
    xref += `${String(off).padStart(10, '0')} 00000 n \n`;
  });
  pdf += xref;
  pdf += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return new Blob([pdf], { type: 'application/pdf' });
}

function downloadPdf(filename, title, lines) {
  const blob = buildPdfBlob(title, lines);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function recordToRorLines(r) {
  return [
    `ULPIN: ${r.ulpin}`,
    `Khasra No.: ${r.khasra}   Khata No.: ${r.khata}   Survey No.: ${r.survey}`,
    `Village: ${r.village}   Tehsil: ${r.tehsil}   District: ${r.district}`,
    '',
    `Current Owner: ${r.owner}`,
    `Land Area: ${r.area}`,
    `Land Type / Usage: ${r.landType}`,
    `Encumbrance Status: ${r.encumbrance}`,
    `Last Mutation Date: ${r.lastMutationDate}`,
    `Litigations: ${r.litigations}`,
    '',
    `Digital Signature: Valid`,
    `Ledger Hash: ${r.hash.slice(0, 18)}...${r.hash.slice(-6)}`,
    `Generated: ${new Date().toLocaleString()}`,
    '',
    'This is a system-generated Record of Rights (RoR) extract.'
  ];
}

export default function LandRecords() {
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [activeRecord, setActiveRecord] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [verifyOpen, setVerifyOpen] = useState(false);

  const [searchType, setSearchType] = useState('Khasra Number');
  const [queryValue, setQueryValue] = useState('');
  const [district, setDistrict] = useState('Select District');
  const [tehsil, setTehsil] = useState('Select Tehsil');
  const [village, setVillage] = useState('Select Village');

  const searchTimer = useRef(null);

  const tehsilOptions = TEHSILS_BY_DISTRICT[district] || ['Select Tehsil'];
  const villageOptions = VILLAGES_BY_TEHSIL[tehsil] || ['Select Village'];

  const placeholder = PLACEHOLDER_BY_TYPE[searchType];

  function runSearch(type, query, opts = {}) {
    const field = FIELD_BY_TYPE[type];
    const q = query.trim().toLowerCase();
    let results = RECORDS.filter((r) => {
      const val = String(r[field]).toLowerCase();
      return field === 'owner' ? val.includes(q) : val === q;
    });
    if (opts.district && opts.district !== 'Select District') {
      results = results.filter((r) => r.district === opts.district);
    }
    if (opts.tehsil && opts.tehsil !== 'Select Tehsil') {
      results = results.filter((r) => r.tehsil === opts.tehsil);
    }
    if (opts.village && opts.village !== 'Select Village') {
      results = results.filter((r) => r.village === opts.village);
    }
    return results;
  }

  function handleSearch(e) {
    e.preventDefault();
    if (!queryValue.trim()) {
      setError('Enter a value to search, or try one of the demo records below.');
      return;
    }
    setError('');
    setIsSearching(true);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      const results = runSearch(searchType, queryValue, { district, tehsil, village });
      setIsSearching(false);
      setHasSearched(true);
      if (results.length > 0) {
        setActiveRecord(results[0]);
        setActiveTab('Overview');
        setNotFound(false);
      } else {
        setActiveRecord(null);
        setNotFound(true);
      }
    }, 550);
  }

// demo record loader for quick services and testing
  function loadDemo(record, tab, type = 'Khasra Number') {
    setError('');
    setSearchType(type);
    setQueryValue(type === 'ULPIN/Parcel ID' ? record.ulpin : record.khasra);
    setDistrict(record.district);
    setTehsil(record.tehsil);
    setVillage(record.village);
    setActiveRecord(record);
    setNotFound(false);
    setHasSearched(true);
    setActiveTab(tab || 'Overview');
  }

  function resetSearch() {
    setHasSearched(false);
    setActiveRecord(null);
    setNotFound(false);
    setQueryValue('');
    setError('');
  }

  function copyHash(hash) {
    navigator.clipboard?.writeText(hash).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  const quickServices = useMemo(
    () => [
      { icon: FileText, title: 'View Property Details', action: () => loadDemo(RECORDS[0], 'Overview', 'ULPIN/Parcel ID') },
      { icon: Download, title: 'Download RoR (B1/P2)', action: () => downloadPdf(`RoR-${RECORDS[0].khasra.replace('/', '-')}.pdf`, 'Record of Rights Extract', recordToRorLines(RECORDS[0])) },
      { icon: FileCheck2, title: 'Property Verification', action: () => { loadDemo(RECORDS[0], 'Overview', 'ULPIN/Parcel ID'); setVerifyOpen(true); } },
      { icon: History, title: 'Ownership History', action: () => loadDemo(RECORDS[1], 'Ownership History') },
      { icon: FileSignature, title: 'Mutation Status', action: () => loadDemo(RECORDS[2], 'Mutation Records') },
      { icon: Map, title: 'Land Maps (GIS)', action: () => loadDemo(RECORDS[0], 'GIS Map') },
      { icon: ShieldCheck, title: 'Fraud Check (AI)', action: () => { loadDemo(RECORDS[2], 'Overview'); setVerifyOpen(true); } },
      { icon: LinkIcon, title: 'Blockchain Ledger', action: () => loadDemo(RECORDS[0], 'Activity History') }
    ],
    []
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 border-l-4 border-[#FF9933] pl-4">
          <h2 className="text-3xl font-bold text-slate-800">Land Records Management</h2>
          <p className="text-slate-500 mt-1">Search, verify, and download official records (RoR) instantly.</p>
        </div>

        {/* Search Section  */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">District</label>
                <div className="relative">
                  <select
                    value={district}
                    onChange={(e) => {
                      setDistrict(e.target.value);
                      setTehsil('Select Tehsil');
                      setVillage('Select Village');
                    }}
                    className="w-full appearance-none border border-slate-300 rounded-lg py-2.5 px-4 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0f2d5c]"
                  >
                    {DISTRICTS.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 text-slate-400 pointer-events-none" size={18} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tehsil / Taluka</label>
                <div className="relative">
                  <select
                    value={tehsil}
                    onChange={(e) => {
                      setTehsil(e.target.value);
                      setVillage('Select Village');
                    }}
                    className="w-full appearance-none border border-slate-300 rounded-lg py-2.5 px-4 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0f2d5c]"
                  >
                    {tehsilOptions.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 text-slate-400 pointer-events-none" size={18} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Village</label>
                <div className="relative">
                  <select
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full appearance-none border border-slate-300 rounded-lg py-2.5 px-4 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0f2d5c]"
                  >
                    {villageOptions.map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 text-slate-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Search By</label>
              <div className="flex flex-wrap gap-4 mb-4">
                {SEARCH_TYPES.map((type) => (
                  <label
                    key={type}
                    className={`flex items-center gap-2 cursor-pointer border px-4 py-2 rounded-lg transition-colors ${
                      searchType === type
                        ? 'bg-[#0f2d5c]/5 border-[#0f2d5c] text-[#0f2d5c]'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="radio"
                      name="searchType"
                      checked={searchType === type}
                      onChange={() => {
                        setSearchType(type);
                        setQueryValue('');
                        setError('');
                      }}
                      className="text-[#0f2d5c] focus:ring-[#0f2d5c]"
                    />
                    <span className="text-sm font-medium">{type}</span>
                  </label>
                ))}
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                  <Search className="absolute left-3 top-3 text-slate-400" size={20} />
                  <input
                    type="text"
                    value={queryValue}
                    onChange={(e) => {
                      setQueryValue(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder={placeholder}
                    className="w-full border border-slate-300 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#0f2d5c]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearching}
                  className="bg-[#0f2d5c] hover:bg-blue-900 disabled:opacity-70 text-white px-8 py-2.5 rounded-lg shadow-md font-medium transition-all flex items-center justify-center gap-2"
                >
                  {isSearching ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                  {isSearching ? 'Searching…' : 'Search Record'}
                </button>
              </div>
              {error && (
                <p className="text-sm text-red-600 mt-2 flex items-center gap-1.5">
                  <AlertTriangle size={14} /> {error}
                </p>
              )}

              {/* Demo shortcuts so the search is easy to try, by Khasra Number */}
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-xs text-slate-400">Try a demo record (Khasra No.):</span>
                {RECORDS.map((r) => (
                  <button
                    type="button"
                    key={r.id}
                    onClick={() => loadDemo(r, 'Overview', 'Khasra Number')}
                    className="text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1 rounded-full transition-colors"
                  >
                    Khasra {r.khasra} · {r.village}
                  </button>
                ))}
              </div>

              {/* Demo shortcuts by ULPIN / Parcel ID */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-xs text-slate-400">Try a demo record (ULPIN):</span>
                {RECORDS.map((r) => (
                  <button
                    type="button"
                    key={`ulpin-${r.id}`}
                    onClick={() => loadDemo(r, 'Overview', 'ULPIN/Parcel ID')}
                    className="text-xs font-mono font-medium bg-blue-50 hover:bg-blue-100 text-[#0f2d5c] border border-blue-100 px-3 py-1 rounded-full transition-colors"
                  >
                    {r.ulpin}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Quick Services (shown when no search is active) */}
        {!hasSearched && (
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MonitorSmartphone className="text-[#FF9933]" /> Quick Digital Services
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickServices.map((service, index) => (
                <button
                  key={index}
                  onClick={service.action}
                  className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-[#FF9933] cursor-pointer transition-all flex flex-col items-center text-center gap-3"
                >
                  <div className="bg-slate-50 p-3 rounded-full text-[#0f2d5c]">
                    <service.icon size={24} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{service.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Not found state */}
        {hasSearched && notFound && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-10 flex flex-col items-center text-center gap-3">
            <div className="bg-red-50 p-3 rounded-full text-red-500">
              <Ban size={28} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No record found</h3>
            <p className="text-sm text-slate-500 max-w-md">
              No record matches "{queryValue}" under {searchType.toLowerCase()}
              {district !== 'Select District' ? ` in ${district}` : ''}. Check the spelling, clear the
              location filters, or try one of the demo records above.
            </p>
            <button
              onClick={resetSearch}
              className="mt-2 text-sm font-semibold text-[#0f2d5c] bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 flex items-center gap-2"
            >
              <ArrowLeft size={16} /> Back to search
            </button>
          </div>
        )}

        {/* Search Results & Detailed Record View  */}
        {hasSearched && activeRecord && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={resetSearch}
                className="text-sm font-semibold text-slate-500 hover:text-[#0f2d5c] flex items-center gap-1.5"
              >
                <ArrowLeft size={15} /> New search
              </button>
              <div className="flex gap-3">
                <span className="bg-green-100 text-green-800 border border-green-200 text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5">
                  <ShieldCheck size={14} /> AI Fraud Detection Passed
                </span>
                <span className="bg-blue-100 text-[#0f2d5c] border border-blue-200 text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5">
                  <LinkIcon size={14} /> Blockchain Verified Record
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden mb-6">
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0f2d5c]">Khasra No: {activeRecord.khasra}</h3>
                  <p className="text-sm text-slate-500 font-medium">
                    ULPIN: <span className="font-mono">{activeRecord.ulpin}</span> • Village: {activeRecord.village} • Tehsil: {activeRecord.tehsil} • District: {activeRecord.district}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('GIS Map')}
                    className="text-[#0f2d5c] bg-white border border-[#0f2d5c] hover:bg-slate-50 px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2"
                  >
                    <Eye size={16} /> View Map
                  </button>
                  <button
                    onClick={() =>
                      downloadPdf(
                        `RoR-${activeRecord.khasra.replace('/', '-')}.pdf`,
                        'Record of Rights Extract',
                        recordToRorLines(activeRecord)
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
                  >
                    <Download size={16} /> Digitally Signed PDF
                  </button>
                </div>
              </div>

              <div className="border-b border-slate-200 flex overflow-x-auto">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab
                        ? 'border-[#FF9933] text-[#FF9933] bg-orange-50/30'
                        : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'Overview' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b pb-2">
                        Property Details
                      </h4>
                      <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                        <div>
                          <p className="text-xs text-slate-500">ULPIN</p>
                          <p className="font-bold text-slate-800 text-lg font-mono">{activeRecord.ulpin}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Current Owner Name</p>
                          <p className="font-bold text-slate-800 text-lg">{activeRecord.owner}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Khata Number</p>
                          <p className="font-bold text-slate-800 text-lg">{activeRecord.khata}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Land Area</p>
                          <p className="font-bold text-slate-800 text-lg">{activeRecord.area}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Land Type / Usage</p>
                          <p className="font-bold text-slate-800 text-lg">{activeRecord.landType}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Encumbrance / Loan Status</p>
                          <p className={`font-bold text-lg ${activeRecord.encumbranceOk ? 'text-green-600' : 'text-red-600'}`}>
                            {activeRecord.encumbrance}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Last Mutation Date</p>
                          <p className="font-bold text-slate-800 text-lg">{activeRecord.lastMutationDate}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 flex flex-col items-center text-center justify-center">
                      <QrCode size={120} className="text-slate-800 mb-4" />
                      <p className="text-xs text-slate-500 mb-2">
                        Scan to verify authenticity of this record via LandStack Mobile App
                      </p>
                      <button
                        onClick={() => setVerifyOpen(true)}
                        className="text-xs font-bold text-[#0f2d5c] underline underline-offset-2 mb-3"
                      >
                        Or verify here
                      </button>

                      <div className="w-full mt-1 space-y-2">
                        <div className="flex items-center justify-between bg-white p-2 rounded border border-green-200 text-sm">
                          <span className="flex items-center gap-1.5 text-slate-600">
                            <FileSignature size={14} className="text-green-600" /> Digital Signature
                          </span>
                          <span className="font-bold text-green-600">{activeRecord.signatureValid ? 'Valid' : 'Invalid'}</span>
                        </div>
                        <div
                          className={`flex items-center justify-between bg-white p-2 rounded border text-sm ${
                            activeRecord.litigationsOk ? 'border-slate-200' : 'border-red-200'
                          }`}
                        >
                          <span className="flex items-center gap-1.5 text-slate-600">
                            <AlertTriangle size={14} className={activeRecord.litigationsOk ? 'text-yellow-500' : 'text-red-500'} /> Litigations
                          </span>
                          <span className={`font-bold ${activeRecord.litigationsOk ? 'text-slate-800' : 'text-red-600'}`}>
                            {activeRecord.litigations}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Ownership History' && (
                  <div className="space-y-3">
                    {activeRecord.ownershipHistory.map((h, i) => (
                      <div key={i} className="flex items-center gap-4 border border-slate-200 rounded-lg p-4">
                        <div className="bg-slate-50 text-[#0f2d5c] font-bold text-sm px-3 py-1.5 rounded-lg border border-slate-200 whitespace-nowrap">
                          {h.year}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-slate-800">{h.owner}</p>
                          <p className="text-xs text-slate-500">{h.mode} • Area: {h.area}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'Mutation Records' && (
                  <div className="space-y-3">
                    {activeRecord.mutationRecords.map((m) => (
                      <div key={m.id} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex flex-wrap justify-between items-center gap-2 mb-1.5">
                          <p className="font-bold text-slate-800">{m.type} <span className="text-slate-400 font-normal text-sm">· {m.id}</span></p>
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                              m.status === 'Approved'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {m.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500">{m.description}</p>
                        <p className="text-xs text-slate-400 mt-1">Date: {m.date}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'Documents' && (
                  <div className="space-y-3">
                    {activeRecord.documents.map((d, i) => (
                      <div key={i} className="flex items-center justify-between border border-slate-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-slate-50 p-2.5 rounded-lg text-[#0f2d5c]">
                            <FileText size={18} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{d.name}</p>
                            <p className="text-xs text-slate-500">{d.type} • {d.date}</p>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            downloadPdf(
                              `${d.name.replace(/[^a-z0-9]+/gi, '-')}.pdf`,
                              d.name,
                              [
                                `Document Type: ${d.type}`,
                                `Related Khasra: ${activeRecord.khasra}`,
                                `Village: ${activeRecord.village}, ${activeRecord.tehsil}, ${activeRecord.district}`,
                                `Issued: ${d.date}`,
                                '',
                                'This is a system-generated placeholder copy for demonstration.'
                              ]
                            )
                          }
                          className="text-[#0f2d5c] bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded text-sm font-bold flex items-center gap-1.5"
                        >
                          <Download size={14} /> Download
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'GIS Map' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-slate-50 border border-slate-200 rounded-lg p-4">
                      <svg viewBox="0 0 400 260" className="w-full h-auto">
                        <rect x="0" y="0" width="400" height="260" fill="#eef2f7" />
                        {[...Array(9)].map((_, i) => (
                          <line key={'v' + i} x1={i * 50} y1="0" x2={i * 50} y2="260" stroke="#e2e8f0" strokeWidth="1" />
                        ))}
                        {[...Array(6)].map((_, i) => (
                          <line key={'h' + i} x1="0" y1={i * 52} x2="400" y2={i * 52} stroke="#e2e8f0" strokeWidth="1" />
                        ))}
                        <polygon points="120,60 300,75 275,190 95,175" fill="#0f2d5c22" stroke="#0f2d5c" strokeWidth="2.5" />
                        <text x="120" y="55" fontSize="11" fill="#0f2d5c" fontWeight="bold">A</text>
                        <text x="305" y="75" fontSize="11" fill="#0f2d5c" fontWeight="bold">B</text>
                        <text x="280" y="205" fontSize="11" fill="#0f2d5c" fontWeight="bold">C</text>
                        <text x="75" y="180" fontSize="11" fill="#0f2d5c" fontWeight="bold">D</text>
                        <text x="180" y="128" fontSize="12" fill="#0f2d5c" fontWeight="bold">
                          Khasra {activeRecord.khasra}
                        </text>
                      </svg>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Boundary Corners</h4>
                        <div className="space-y-1.5">
                          {activeRecord.corners.map((c) => (
                            <div key={c.label} className="flex items-center justify-between text-sm bg-slate-50 border border-slate-200 rounded px-3 py-1.5">
                              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                                <MapPin size={13} className="text-[#FF9933]" /> {c.label}
                              </span>
                              <span className="text-slate-500 font-mono text-xs">{c.lat}, {c.lng}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Adjoining Plots</h4>
                        <div className="text-sm text-slate-600 space-y-1">
                          <p>North: {activeRecord.adjoining.north}</p>
                          <p>South: {activeRecord.adjoining.south}</p>
                          <p>East: {activeRecord.adjoining.east}</p>
                          <p>West: {activeRecord.adjoining.west}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Activity History' && (
                  <div className="space-y-3">
                    {activeRecord.ledger.map((entry, i) => (
                      <div key={i} className="border border-slate-200 rounded-lg p-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{entry.action}</p>
                          <p className="text-xs text-slate-500">Block #{entry.block} • {entry.timestamp}</p>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">
                            {entry.hash.slice(0, 14)}…{entry.hash.slice(-6)}
                          </p>
                        </div>
                        <button
                          onClick={() => copyHash(entry.hash)}
                          className="text-xs font-bold text-[#0f2d5c] bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded flex items-center gap-1.5"
                        >
                          <Copy size={13} /> Copy hash
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
              <span>Last Synced: Just now (Offline Sync Enabled)</span>
              <span>Unique Hash: {activeRecord.hash.slice(0, 10)}...{activeRecord.hash.slice(-4)}</span>
            </div>
          </div>
        )}
      </main>

      {/* Verification modal */}
      {verifyOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
          onClick={() => setVerifyOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVerifyOpen(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
            >
              <X size={18} />
            </button>
            <div className="flex flex-col items-center text-center gap-3 pt-2">
              <div className="bg-green-50 p-3 rounded-full text-green-600">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Record Verified</h3>
              <p className="text-sm text-slate-500">
                {activeRecord ? `Khasra ${activeRecord.khasra}` : 'This record'} matches the state ledger.
                Digital signature and blockchain hash both check out.
              </p>
              <button
                onClick={() => setVerifyOpen(false)}
                className="mt-2 bg-[#0f2d5c] text-white text-sm font-bold px-5 py-2 rounded-lg hover:bg-blue-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Copy toast */}
      {copied && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50">
          <CheckCircle2 size={15} className="text-green-400" /> Hash copied to clipboard
        </div>
      )}
    </div>
  );
}