import {
  ArrowLeft,
  MapPinned,
  User,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function ParcelDetails() {
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow overflow-hidden">

        {/* Header */}
        <div className="bg-[#12355B] text-white px-4 py-3 flex items-center gap-3">
          <ArrowLeft size={20} />
          <div>
            <h1 className="font-semibold">Parcel Details</h1>
            <p className="text-xs text-blue-100">
              Survey Parcel Information
            </p>
          </div>
        </div>

        {/* Parcel ID Card */}
        <div className="p-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">

            <div className="flex items-center gap-2">
              <MapPinned size={20} className="text-blue-700" />
              <h2 className="font-bold text-blue-900">
                Parcel ID: LS-2026-1045
              </h2>
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Village Rampura, Tehsil Kolaras, District Shivpuri
            </p>

          </div>
        </div>

        {/* Ownership Details */}
        <div className="px-4">
          <h3 className="font-semibold text-[#12355B] mb-3">
            Ownership Details
          </h3>

          <div className="border rounded-lg p-4 space-y-3">

            <div className="flex items-center gap-2">
              <User size={18} className="text-blue-700" />
              <span className="font-medium">
                Ramesh Kumar Sharma
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">

              <div>
                <p className="text-gray-500">Father Name</p>
                <p className="font-medium">Mohan Sharma</p>
              </div>

              <div>
                <p className="text-gray-500">Khata No.</p>
                <p className="font-medium">145</p>
              </div>

              <div>
                <p className="text-gray-500">Khasra No.</p>
                <p className="font-medium">224/1</p>
              </div>

              <div>
                <p className="text-gray-500">Area</p>
                <p className="font-medium">2.35 Hectare</p>
              </div>

            </div>

          </div>
        </div>

        {/* Land Information */}
        <div className="p-4">

          <h3 className="font-semibold text-[#12355B] mb-3">
            Land Information
          </h3>

          <div className="border rounded-lg p-4 space-y-3">

            <div className="flex justify-between">
              <span className="text-gray-500">
                Land Type
              </span>
              <span className="font-medium">
                Agricultural
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Soil Type
              </span>
              <span className="font-medium">
                Black Cotton Soil
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Irrigation
              </span>
              <span className="font-medium">
                Available
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Survey Status
              </span>

              <span className="flex items-center gap-1 text-green-600 font-medium">
                <CheckCircle size={16} />
                Verified
              </span>
            </div>

          </div>

        </div>

        {/* Existing Records */}
        <div className="px-4">

          <h3 className="font-semibold text-[#12355B] mb-3">
            Existing Records
          </h3>

          <div className="border rounded-lg p-4">

            <div className="flex items-start gap-2">
              <FileText
                size={18}
                className="text-blue-700 mt-1"
              />

              <div>
                <h4 className="font-medium">
                  Previous Survey Record
                </h4>

                <p className="text-xs text-gray-500 mt-1">
                  Last updated on 14 June 2025
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Alert */}
        <div className="p-4">

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex gap-2">

            <AlertCircle
              size={18}
              className="text-yellow-600 mt-1"
            />

            <p className="text-sm text-yellow-700">
              Verify parcel boundary and ownership
              details before submitting survey.
            </p>

          </div>

        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t bg-slate-50 flex gap-3">

          <button className="flex-1 border border-gray-300 py-3 rounded-lg font-medium">
            View Map
          </button>

          <button className="flex-1 bg-[#12355B] text-white py-3 rounded-lg font-medium hover:bg-[#0B2948]">
            Start Survey
          </button>

        </div>

      </div>
    </div>
  );
}