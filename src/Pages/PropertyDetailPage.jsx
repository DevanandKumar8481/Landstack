import React, { useState } from 'react';
import { 
  ShieldCheck, MapPin, User, FileText, History, Download, AlertCircle,
  CheckCircle2, QrCode, Link as LinkIcon, Map, FileSignature, Landmark,
  ChevronRight, Building2, Eye, Flag, AlertTriangle, Phone
} from 'lucide-react';

export default function PropertyDetailsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample Data to simulate database fetch
  const propertyData = {
    id: "MP-IND-2026-984521",
    status: "Verified",
    khasra: "142/2/1",
    khata: "56",
    survey: "S-892",
    plot: "45-B",
    area: "1.450 Hectares",
    type: "Agricultural (Irrigated)",
    owner: {
      name: "Ramesh Kumar Sharma",
      father: "Late Shri Ramnarayan Sharma",
      share: "100%",
      contact: "+91 98765 *****",
      aadhaarStatus: "Verified (E-KYC Matched)",
      digitalId: "Verified (DigiLocker Linked)"
    },
    location: {
      state: "Madhya Pradesh",
      district: "Indore",
      tehsil: "Sanwer",
      village: "Palasia",
      ward: "Gram Panchayat Palasia",
      pin: "453551",
      gps: "22.8456° N, 75.8765° E"
    }
  };

  const tabs = [
    { id: 'overview', label: 'Property Overview', icon: Map },
    { id: 'owner', label: 'Owner Details', icon: User },
    { id: 'history', label: 'Ownership History', icon: History },
    { id: 'legal', label: 'Legal & Documents', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Page Header */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <Building2 size={32} className="text-[#0f2d5c]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Property Details</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm font-mono bg-slate-100 px-2 py-1 rounded text-slate-600 border border-slate-200">
                  ID: {propertyData.id}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full border border-green-200">
                  <ShieldCheck size={14} /> CLEAR TITLE
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <button className="whitespace-nowrap flex items-center gap-2 bg-[#0f2d5c] hover:bg-blue-900 text-white px-5 py-2.5 rounded-lg shadow font-medium transition-colors text-sm">
              <Download size={16} /> Download Report
            </button>
            <button className="whitespace-nowrap flex items-center gap-2 bg-white border border-[#0f2d5c] text-[#0f2d5c] hover:bg-slate-50 px-5 py-2.5 rounded-lg shadow-sm font-medium transition-colors text-sm">
              <Flag size={16} /> Report Issue
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Column: Navigation & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                Navigation Menu
              </div>
              <nav className="flex flex-col p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#0f2d5c] text-white'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <tab.icon size={18} /> {tab.label}
                    {activeTab === tab.id && <ChevronRight size={16} className="ml-auto" />}
                  </button>
                ))}
              </nav>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h3 className="font-bold text-slate-800 mb-3 text-sm">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between text-sm text-slate-600 hover:text-[#FF9933] bg-slate-50 hover:bg-orange-50 px-3 py-2.5 rounded border border-slate-200 transition-colors">
                  Apply for Mutation <ChevronRight size={14} />
                </button>
                <button className="w-full flex items-center justify-between text-sm text-slate-600 hover:text-[#FF9933] bg-slate-50 hover:bg-orange-50 px-3 py-2.5 rounded border border-slate-200 transition-colors">
                  Pay Land Tax <ChevronRight size={14} />
                </button>
                <button className="w-full flex items-center justify-between text-sm text-slate-600 hover:text-[#FF9933] bg-slate-50 hover:bg-orange-50 px-3 py-2.5 rounded border border-slate-200 transition-colors">
                  Request Demarcation <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Tab Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 min-h-[500px]">
              
              {/* --- TAB 1: OVERVIEW --- */}
              {activeTab === 'overview' && (
                <div className="p-6 animate-in fade-in duration-300">
                  <h2 className="text-xl font-bold text-[#0f2d5c] border-b border-slate-200 pb-3 mb-5">Property Information</h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-slate-50 p-3 rounded border border-slate-100">
                      <p className="text-xs text-slate-500 mb-1">Khasra Number</p>
                      <p className="font-bold text-slate-800">{propertyData.khasra}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded border border-slate-100">
                      <p className="text-xs text-slate-500 mb-1">Khata Number</p>
                      <p className="font-bold text-slate-800">{propertyData.khata}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded border border-slate-100">
                      <p className="text-xs text-slate-500 mb-1">Survey Number</p>
                      <p className="font-bold text-slate-800">{propertyData.survey}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded border border-slate-100">
                      <p className="text-xs text-slate-500 mb-1">Plot Number</p>
                      <p className="font-bold text-slate-800">{propertyData.plot}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded border border-slate-100">
                      <p className="text-xs text-slate-500 mb-1">Land Area</p>
                      <p className="font-bold text-slate-800">{propertyData.area}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded border border-slate-100">
                      <p className="text-xs text-slate-500 mb-1">Land Type</p>
                      <p className="font-bold text-slate-800">{propertyData.type}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded border border-slate-100 md:col-span-2">
                      <p className="text-xs text-slate-500 mb-1">Current Status</p>
                      <p className="font-bold text-green-600 flex items-center gap-1"><CheckCircle2 size={16}/> Active & Verified</p>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-[#0f2d5c] border-b border-slate-200 pb-3 mb-5 mt-8 flex items-center gap-2">
                    <MapPin className="text-[#FF9933]" size={20} /> Location Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                      <div><p className="text-xs text-slate-500">State</p><p className="font-semibold text-sm">{propertyData.location.state}</p></div>
                      <div><p className="text-xs text-slate-500">District</p><p className="font-semibold text-sm">{propertyData.location.district}</p></div>
                      <div><p className="text-xs text-slate-500">Tehsil</p><p className="font-semibold text-sm">{propertyData.location.tehsil}</p></div>
                      <div><p className="text-xs text-slate-500">Village</p><p className="font-semibold text-sm">{propertyData.location.village}</p></div>
                      <div><p className="text-xs text-slate-500">Ward/Panchayat</p><p className="font-semibold text-sm">{propertyData.location.ward}</p></div>
                      <div><p className="text-xs text-slate-500">Pin Code</p><p className="font-semibold text-sm">{propertyData.location.pin}</p></div>
                      <div className="col-span-2"><p className="text-xs text-slate-500">GPS Coordinates</p><p className="font-mono text-sm bg-slate-100 inline-block px-2 py-1 rounded mt-1">{propertyData.location.gps}</p></div>
                    </div>
                    <div className="bg-slate-100 rounded-lg border border-slate-300 flex items-center justify-center relative min-h-[200px]">
                      {/* Placeholder for Interactive GIS Map */}
                      <div className="absolute inset-0 bg-blue-50/50 flex flex-col items-center justify-center text-slate-500">
                        <Map size={48} className="mb-2 opacity-50" />
                        <p className="font-semibold text-sm">Interactive GIS Map</p>
                        <button className="mt-3 bg-white border border-slate-300 shadow-sm text-xs font-bold px-3 py-1.5 rounded hover:bg-slate-50 text-[#0f2d5c]">
                          Open Fullscreen Map
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- TAB 2: OWNER DETAILS --- */}
              {activeTab === 'owner' && (
                <div className="p-6 animate-in fade-in duration-300">
                  <h2 className="text-xl font-bold text-[#0f2d5c] border-b border-slate-200 pb-3 mb-6">Current Ownership Details</h2>
                  
                  <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-green-100 text-green-700 px-4 py-1 text-xs font-bold rounded-bl-lg border-b border-l border-green-200">
                      Primary Owner
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="bg-slate-100 p-4 rounded-full border border-slate-200">
                        <User size={48} className="text-slate-400" />
                      </div>
                      
                      <div className="flex-1 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Full Name</p>
                            <p className="font-bold text-lg text-slate-800">{propertyData.owner.name}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Father's / Guardian's Name</p>
                            <p className="font-semibold text-slate-700">{propertyData.owner.father}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Ownership Share</p>
                            <p className="font-bold text-slate-800 text-lg">{propertyData.owner.share}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Contact Information</p>
                            <p className="font-mono text-sm text-slate-700 flex items-center gap-2"><Phone size={14}/> {propertyData.owner.contact}</p>
                          </div>
                        </div>

                        <div className="mt-6 border-t border-slate-100 pt-4 flex flex-col sm:flex-row gap-4">
                          <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded border border-slate-200 flex-1">
                            <ShieldCheck className="text-green-600" size={18} />
                            <div>
                              <p className="text-[10px] text-slate-500 uppercase font-bold">Aadhaar Status</p>
                              <p className="text-sm font-semibold text-slate-800">{propertyData.owner.aadhaarStatus}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded border border-slate-200 flex-1">
                            <FileSignature className="text-green-600" size={18} />
                            <div>
                              <p className="text-[10px] text-slate-500 uppercase font-bold">Digital Identity</p>
                              <p className="text-sm font-semibold text-slate-800">{propertyData.owner.digitalId}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- TAB 3: OWNERSHIP HISTORY --- */}
              {activeTab === 'history' && (
                <div className="p-6 animate-in fade-in duration-300">
                  <h2 className="text-xl font-bold text-[#0f2d5c] border-b border-slate-200 pb-3 mb-6">Mutation & Transfer History</h2>
                  
                  <div className="relative border-l-2 border-slate-200 ml-3 md:ml-6 space-y-8 pb-4">
                    {/* Event 1 */}
                    <div className="relative pl-6 md:pl-8">
                      <div className="absolute w-4 h-4 bg-green-500 rounded-full -left-[9px] top-1 border-2 border-white shadow"></div>
                      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                        <span className="text-xs font-bold text-[#FF9933] bg-orange-50 px-2 py-1 rounded">12 Aug 2023</span>
                        <h4 className="font-bold text-slate-800 mt-2 text-lg">Inheritance Transfer (Fauti Namanataran)</h4>
                        <p className="text-sm text-slate-600 mt-1">Transferred to <span className="font-semibold text-slate-800">Ramesh Kumar Sharma</span> from Late Shri Ramnarayan Sharma.</p>
                        <div className="mt-3 flex gap-2">
                          <span className="text-xs text-slate-500 flex items-center gap-1"><FileText size={12}/> Order No: 8992/Tehsil/2023</span>
                        </div>
                      </div>
                    </div>

                    {/* Event 2 */}
                    <div className="relative pl-6 md:pl-8">
                      <div className="absolute w-4 h-4 bg-slate-300 rounded-full -left-[9px] top-1 border-2 border-white shadow"></div>
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                        <span className="text-xs font-bold text-slate-500 bg-slate-200 px-2 py-1 rounded">05 Mar 2010</span>
                        <h4 className="font-bold text-slate-700 mt-2">Sale / Purchase Registration</h4>
                        <p className="text-sm text-slate-600 mt-1">Purchased by <span className="font-semibold">Ramnarayan Sharma</span> from Suresh Patel.</p>
                        <div className="mt-3 flex gap-2">
                          <span className="text-xs text-slate-500 flex items-center gap-1"><FileText size={12}/> Registry No: 4521/2010</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- TAB 4: LEGAL & DOCUMENTS --- */}
              {activeTab === 'legal' && (
                <div className="p-6 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Legal Status */}
                    <div>
                      <h2 className="text-lg font-bold text-[#0f2d5c] border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                        <Landmark size={20} /> Legal Status
                      </h2>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="text-green-600" size={20} />
                            <span className="font-semibold text-sm text-green-900">Encumbrance / Loan</span>
                          </div>
                          <span className="text-xs font-bold text-green-700">No Active Loans</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="text-green-600" size={20} />
                            <span className="font-semibold text-sm text-green-900">Court Disputes</span>
                          </div>
                          <span className="text-xs font-bold text-green-700">None Pending</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="text-slate-400" size={20} />
                            <span className="font-semibold text-sm text-slate-700">Govt Acquisition</span>
                          </div>
                          <span className="text-xs font-bold text-slate-500">Not Applicable</span>
                        </div>
                      </div>

                      {/* Blockchain Badge */}
                      <div className="mt-6 bg-slate-800 text-white p-4 rounded-xl shadow-inner flex items-start gap-4">
                        <div className="bg-slate-700 p-2 rounded-lg">
                          <LinkIcon size={24} className="text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold flex items-center gap-2">Blockchain Secured Record <ShieldCheck size={14} className="text-green-400"/></h4>
                          <p className="text-[10px] text-slate-400 font-mono mt-1 break-all">Txn Hash: 0x8f4c9b2e7a1d...f3c9a2b5e8d1</p>
                          <p className="text-[10px] text-slate-400 font-mono">Timestamp: 2026-08-31 14:22:05 UTC</p>
                        </div>
                      </div>
                    </div>

                    {/* Official Documents */}
                    <div>
                      <h2 className="text-lg font-bold text-[#0f2d5c] border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                        <FileText size={20} /> Certified Documents
                      </h2>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { title: 'Record of Rights (B1 / Khatauni)', date: 'Generated Today' },
                          { title: 'Digital Survey Map (Khasra Map)', date: 'Last updated: Jan 2026' },
                          { title: 'Latest Mutation Certificate', date: 'Order Date: Aug 2023' }
                        ].map((doc, idx) => (
                          <div key={idx} className="flex justify-between items-center p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-300 transition-colors shadow-sm group">
                            <div className="flex items-center gap-3">
                              <div className="bg-red-50 text-red-600 p-1.5 rounded">
                                <FileText size={20} />
                              </div>
                              <div>
                                <p className="font-semibold text-sm text-slate-800">{doc.title}</p>
                                <p className="text-[10px] text-slate-500">{doc.date} • Digitally Signed</p>
                              </div>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="text-slate-400 hover:text-[#0f2d5c] p-1"><Eye size={18}/></button>
                              <button className="text-slate-400 hover:text-green-600 p-1"><Download size={18}/></button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex justify-center">
                        <div className="text-center p-4 border border-slate-200 border-dashed rounded-xl bg-slate-50">
                          <QrCode size={80} className="mx-auto text-slate-800 mb-2" />
                          <p className="text-xs text-slate-500 font-medium max-w-[200px]">Scan via LandStack App to verify document authenticity</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}