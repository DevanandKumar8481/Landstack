import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  ArrowRight,
  Upload,
  AlertCircle,
  Phone,
  Mail,
  MapIcon,
  X,
  FileCheck,
} from "lucide-react";

const NAVY = "#14283F";

function LandRegistration() {
  const [activeTab, setActiveTab] = useState("new");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [dragActive, setDragActive] = useState(false);

  const [formData, setFormData] = useState({
    propertyName: "",
    propertyType: "Residential",
    areaSize: "",
    district: "",
    plotNumber: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    idNumber: "",
    transfereeDetails: "",
    mutationReason: "",
  });

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.propertyName.trim()) {
      newErrors.propertyName = "Property name is required";
    }
    if (!formData.areaSize || parseFloat(formData.areaSize) <= 0) {
      newErrors.areaSize = "Valid area size is required";
    }
    if (!formData.district.trim()) {
      newErrors.district = "District is required";
    }
    if (!formData.plotNumber.trim()) {
      newErrors.plotNumber = "Plot number is required";
    }
    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "Owner name is required";
    }
    if (!formData.ownerEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.ownerEmail)) {
      newErrors.ownerEmail = "Valid email is required";
    }
    if (!formData.ownerPhone.trim() || !/^\d{10}$/.test(formData.ownerPhone.replace(/\D/g, ""))) {
      newErrors.ownerPhone = "Valid 10-digit phone number is required";
    }
    if (!formData.idNumber.trim()) {
      newErrors.idNumber = "ID/Aadhar number is required";
    }
    if (activeTab === "transfer" && !formData.transfereeDetails.trim()) {
      newErrors.transfereeDetails = "Transferee details are required";
    }
    if (activeTab === "mutation" && !formData.mutationReason.trim()) {
      newErrors.mutationReason = "Mutation reason is required";
    }

    // Check if at least some documents are uploaded
    if (Object.keys(uploadedFiles).length === 0) {
      newErrors.documents = "At least one document is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e, docType) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0], docType);
    }
  };

  const handleFileUpload = (file, docType) => {
    // Validate file type
    const validTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [docType]: "Only PDF, JPG, and PNG files are allowed",
      }));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        [docType]: "File size should not exceed 5MB",
      }));
      return;
    }

    setUploadedFiles((prev) => ({
      ...prev,
      [docType]: file,
    }));

    // Clear error for this field
    if (errors[docType]) {
      setErrors((prev) => ({ ...prev, [docType]: "" }));
    }
  };

  const removeFile = (docType) => {
    setUploadedFiles((prev) => {
      const updated = { ...prev };
      delete updated[docType];
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        propertyName: "",
        propertyType: "Residential",
        areaSize: "",
        district: "",
        plotNumber: "",
        ownerName: "",
        ownerEmail: "",
        ownerPhone: "",
        idNumber: "",
        transfereeDetails: "",
        mutationReason: "",
      });
      setUploadedFiles({});
      setErrors({});
    }, 3000);
  };

  const DocumentUploadField = ({ docType, label }) => {
    const fileInputRef = useRef(null);

    return (
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={(e) => handleDrop(e, docType)}
        onClick={() => !uploadedFiles[docType] && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-6 transition-all cursor-pointer ${
          dragActive
            ? "border-emerald-500 bg-emerald-50"
            : uploadedFiles[docType]
            ? "bg-emerald-50 border-emerald-300"
            : "border-slate-300 hover:border-emerald-400 hover:bg-slate-50"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            {uploadedFiles[docType] ? (
              <>
                <FileCheck size={24} className="text-emerald-600 shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-emerald-900 text-sm sm:text-base break-words">
                    {uploadedFiles[docType].name}
                  </p>
                  <p className="text-xs sm:text-sm text-emerald-700 mt-1">
                    {(uploadedFiles[docType].size / 1024 / 1024).toFixed(2)} MB · {uploadedFiles[docType].type === "application/pdf" ? "PDF" : "Image"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(docType);
                  }}
                  className="p-2 hover:bg-emerald-200 rounded transition-colors shrink-0 ml-2"
                  title="Remove file"
                >
                  <X size={18} className="text-emerald-600" />
                </button>
              </>
            ) : (
              <>
                <Upload size={24} className="text-slate-400 shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-slate-700 text-sm sm:text-base">{label}</p>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Click to browse or drag and drop
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Supported: PDF, JPG, PNG (Max 5MB)
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {errors[docType] && (
          <div className="mt-3 p-3 bg-red-100 rounded border border-red-300">
            <p className="text-red-600 text-xs sm:text-sm flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              {errors[docType]}
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.png,.jpeg"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files[0], docType)}
          aria-label={`Upload ${label}`}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto w-full px-4 py-10 sm:py-14 lg:py-16">
        {/* Registration Form Section */}
        <section id="registration-form" className="mb-12 sm:mb-16">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold" style={{ color: NAVY }}>
                Property Registration Form
              </h2>
              <p className="text-slate-600 mt-2 text-sm sm:text-base">
                {activeTab === "new" && "Register a new property with all required details"}
                {activeTab === "transfer" && "Transfer ownership of an existing property"}
                {activeTab === "mutation" && "Request a mutation for property changes"}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8 border-b border-slate-200 overflow-x-auto">
            {["new", "transfer", "mutation"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setErrors({});
                }}
                className={`px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === tab
                    ? "border-emerald-500 text-emerald-700"
                    : "border-transparent text-slate-600 hover:text-slate-800"
                }`}
              >
                {tab === "new" && "New Registration"}
                {tab === "transfer" && "Property Transfer"}
                {tab === "mutation" && "Mutation"}
              </button>
            ))}
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4 sm:p-5 flex items-start gap-3 animate-in fade-in slide-in-from-top">
              <CheckCircle size={20} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-emerald-900 text-sm sm:text-base">
                  {activeTab === "new" && "Registration Submitted Successfully!"}
                  {activeTab === "transfer" && "Transfer Request Submitted Successfully!"}
                  {activeTab === "mutation" && "Mutation Request Submitted Successfully!"}
                </h3>
                <p className="text-emerald-700 text-xs sm:text-sm mt-1">
                  Your application has been received. Track status with Application ID: {activeTab.toUpperCase()}-2026-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {Object.keys(errors).length > 0 && !submitted && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 sm:p-5 flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 text-sm sm:text-base">
                  Please fix the errors below
                </h3>
                <p className="text-red-700 text-xs sm:text-sm mt-1">
                  {Object.keys(errors).length} field{Object.keys(errors).length !== 1 ? "s" : ""} need attention
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="p-6 sm:p-8 space-y-8">
              {/* Property Details */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-5" style={{ color: NAVY }}>
                  Property Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Property Name / Address *
                    </label>
                    <input
                      type="text"
                      name="propertyName"
                      value={formData.propertyName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base transition-colors ${
                        errors.propertyName ? "border-red-500" : "border-slate-300"
                      }`}
                      placeholder="Enter property address"
                    />
                    {errors.propertyName && (
                      <p className="text-red-600 text-xs sm:text-sm mt-2 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.propertyName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Property Type *
                    </label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base"
                    >
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Agricultural">Agricultural</option>
                      <option value="Industrial">Industrial</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Area Size (sq. ft.) *
                    </label>
                    <input
                      type="number"
                      name="areaSize"
                      value={formData.areaSize}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base transition-colors ${
                        errors.areaSize ? "border-red-500" : "border-slate-300"
                      }`}
                      placeholder="Enter area size"
                    />
                    {errors.areaSize && (
                      <p className="text-red-600 text-xs sm:text-sm mt-2 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.areaSize}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      District *
                    </label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base transition-colors ${
                        errors.district ? "border-red-500" : "border-slate-300"
                      }`}
                      placeholder="Enter district"
                    />
                    {errors.district && (
                      <p className="text-red-600 text-xs sm:text-sm mt-2 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.district}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Plot / Survey Number *
                    </label>
                    <input
                      type="text"
                      name="plotNumber"
                      value={formData.plotNumber}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base transition-colors ${
                        errors.plotNumber ? "border-red-500" : "border-slate-300"
                      }`}
                      placeholder="Enter plot number"
                    />
                    {errors.plotNumber && (
                      <p className="text-red-600 text-xs sm:text-sm mt-2 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.plotNumber}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Owner Details */}
              <div className="border-t border-slate-200 pt-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-5" style={{ color: NAVY }}>
                  Owner Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Owner Name *
                    </label>
                    <input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base transition-colors ${
                        errors.ownerName ? "border-red-500" : "border-slate-300"
                      }`}
                      placeholder="Full name"
                    />
                    {errors.ownerName && (
                      <p className="text-red-600 text-xs sm:text-sm mt-2 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.ownerName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="ownerEmail"
                      value={formData.ownerEmail}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base transition-colors ${
                        errors.ownerEmail ? "border-red-500" : "border-slate-300"
                      }`}
                      placeholder="email@example.com"
                    />
                    {errors.ownerEmail && (
                      <p className="text-red-600 text-xs sm:text-sm mt-2 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.ownerEmail}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="ownerPhone"
                      value={formData.ownerPhone}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base transition-colors ${
                        errors.ownerPhone ? "border-red-500" : "border-slate-300"
                      }`}
                      placeholder="10-digit phone number"
                    />
                    {errors.ownerPhone && (
                      <p className="text-red-600 text-xs sm:text-sm mt-2 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.ownerPhone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      ID / Aadhar Number *
                    </label>
                    <input
                      type="text"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base transition-colors ${
                        errors.idNumber ? "border-red-500" : "border-slate-300"
                      }`}
                      placeholder="12-digit Aadhar"
                    />
                    {errors.idNumber && (
                      <p className="text-red-600 text-xs sm:text-sm mt-2 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.idNumber}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Tab-Specific Fields */}
              {activeTab === "transfer" && (
                <div className="border-t border-slate-200 pt-8">
                  <h3 className="text-lg sm:text-xl font-semibold mb-5" style={{ color: NAVY }}>
                    Transferee Details
                  </h3>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Transferee Name and Details *
                    </label>
                    <textarea
                      name="transfereeDetails"
                      value={formData.transfereeDetails}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base transition-colors ${
                        errors.transfereeDetails ? "border-red-500" : "border-slate-300"
                      }`}
                      placeholder="Enter transferee name, contact details, and relationship to property"
                      rows="4"
                    />
                    {errors.transfereeDetails && (
                      <p className="text-red-600 text-xs sm:text-sm mt-2 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.transfereeDetails}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "mutation" && (
                <div className="border-t border-slate-200 pt-8">
                  <h3 className="text-lg sm:text-xl font-semibold mb-5" style={{ color: NAVY }}>
                    Mutation Details
                  </h3>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Reason for Mutation *
                    </label>
                    <select
                      name="mutationReason"
                      value={formData.mutationReason}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base transition-colors ${
                        errors.mutationReason ? "border-red-500" : "border-slate-300"
                      }`}
                    >
                      <option value="">Select reason</option>
                      <option value="boundary_change">Boundary Change</option>
                      <option value="area_correction">Area Correction</option>
                      <option value="owner_correction">Owner Details Correction</option>
                      <option value="subdivision">Subdivision</option>
                      <option value="consolidation">Consolidation</option>
                    </select>
                    {errors.mutationReason && (
                      <p className="text-red-600 text-xs sm:text-sm mt-2 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.mutationReason}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Document Upload */}
              <div className="border-t border-slate-200 pt-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-5" style={{ color: NAVY }}>
                  Required Documents
                </h3>

                {errors.documents && (
                  <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3">
                    <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
                    <p className="text-red-700 text-xs sm:text-sm">{errors.documents}</p>
                  </div>
                )}

                <div className="space-y-4">
                  <DocumentUploadField docType="propertyDeed" label="Property Deed" />
                  <DocumentUploadField docType="surveyCertificate" label="Survey Certificate" />
                  <DocumentUploadField docType="ownershipProof" label="Ownership Proof" />
                  <DocumentUploadField docType="idProof" label="ID Proof" />

                  {activeTab === "transfer" && (
                    <DocumentUploadField docType="transferAgreement" label="Transfer Agreement" />
                  )}
                  {activeTab === "mutation" && (
                    <DocumentUploadField docType="mutationRequest" label="Mutation Request Form" />
                  )}
                </div>

                {Object.keys(uploadedFiles).length > 0 && (
                  <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                    <p className="text-sm font-semibold text-emerald-900 mb-2">
                      {Object.keys(uploadedFiles).length} document{Object.keys(uploadedFiles).length !== 1 ? "s" : ""} uploaded
                    </p>
                    <div className="space-y-1">
                      {Object.entries(uploadedFiles).map(([key, file]) => (
                        <p key={key} className="text-xs text-emerald-700">
                          ✓ {file.name}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="bg-slate-50 border-t border-slate-200 px-6 sm:px-8 py-6 sm:py-8 flex flex-col xs:flex-row gap-3 sm:gap-4">
              <button
                type="submit"
                className="!text-white inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-lg font-semibold text-sm sm:text-base hover:opacity-90 transition-opacity"
                style={{ backgroundColor: NAVY }}
              >
                Submit {activeTab === "new" ? "Registration" : activeTab === "transfer" ? "Transfer" : "Mutation"}
                <ArrowRight size={18} />
              </button>
              <button
                type="reset"
                onClick={() => {
                  setFormData({
                    propertyName: "",
                    propertyType: "Residential",
                    areaSize: "",
                    district: "",
                    plotNumber: "",
                    ownerName: "",
                    ownerEmail: "",
                    ownerPhone: "",
                    idNumber: "",
                    transfereeDetails: "",
                    mutationReason: "",
                  });
                  setUploadedFiles({});
                  setErrors({});
                }}
                className="border-2 border-slate-300 inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-lg font-semibold text-sm sm:text-base bg-white hover:bg-slate-100 transition-colors"
              >
                Clear Form
              </button>
            </div>
          </form>
        </section>

        {/* Process Steps */}
        <section className="mb-12 sm:mb-16">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-2" style={{ color: NAVY }}>
              Registration Process
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Simple 4-step process for quick verification
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { step: 1, title: "Submit Details", desc: "Fill the registration form" },
              { step: 2, title: "Upload Documents", desc: "Provide required files" },
              { step: 3, title: "Verification", desc: "24-48 hours processing" },
              { step: 4, title: "Confirmation", desc: "Receive registration certificate" },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 text-center">
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mx-auto mb-4"
                    style={{ backgroundColor: NAVY }}
                  >
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm sm:text-base">{item.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight size={24} className="text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-8" style={{ color: NAVY }}>
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 sm:space-y-5">
            {[
              {
                q: "How long does registration take?",
                a: "The standard registration process takes 2-3 working days. You'll receive updates via email and SMS.",
              },
              {
                q: "What documents are required?",
                a: "You'll need property deed, survey certificate, ownership proof, and valid ID proof. Specific requirements depend on your property type.",
              },
              {
                q: "Can I track my application?",
                a: "Yes, you can track your application status 24/7 using your Application ID provided after submission.",
              },
              {
                q: "What is the registration fee?",
                a: "Registration fees are transparent and calculated based on property value. No hidden charges. A fee calculator is available on our portal.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle size={20} className="text-emerald-600 shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 text-sm sm:text-base">{item.q}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-2">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-8 sm:p-10 mb-12">
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: NAVY }}
              >
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-sm sm:text-base">Phone Support</h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">1800-XXX-XXXX</p>
                <p className="text-slate-500 text-xs mt-1">Available 9 AM - 6 PM</p>
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
                <p className="text-slate-600 text-xs sm:text-sm mt-1">support@landstack.gov</p>
                <p className="text-slate-500 text-xs mt-1">Response within 24 hours</p>
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
                <h3 className="font-semibold text-slate-800 text-sm sm:text-base">Office Address</h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Land Registration Office</p>
                <p className="text-slate-500 text-xs mt-1">Govt. Building, City Center</p>
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
                Secure digital land registration and property management portal.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Services</h4>
              <div className="space-y-2 text-xs sm:text-sm text-blue-100/80">
                <a href="#" className="hover:text-amber-400 transition-colors">Registration</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Land Records</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Verification</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Mutation</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Information</h4>
              <div className="space-y-2 text-xs sm:text-sm text-blue-100/80">
                <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Terms & Conditions</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Help Center</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Support</h4>
              <div className="space-y-2 text-xs sm:text-sm text-blue-100/80">
                <a href="#" className="hover:text-amber-400 transition-colors">Contact Us</a>
                <a href="#" className="hover:text-amber-400 transition-colors">FAQs</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Grievance</a>
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

export default LandRegistration;