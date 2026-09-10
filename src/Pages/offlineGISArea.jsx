import {
  ArrowLeft,
  Download,
  HardDrive,
  Map,
  CheckCircle,
  Search,
} from "lucide-react";

export default function OfflineGISArea() {
  const areas = [
    {
      id: 1,
      village: "Rampura",
      tehsil: "Kolaras",
      district: "Shivpuri",
      size: "45 MB",
      status: "Not Downloaded",
    },
    {
      id: 2,
      village: "Bhainsa",
      tehsil: "Kolaras",
      district: "Shivpuri",
      size: "38 MB",
      status: "Downloaded",
    },
    {
      id: 3,
      village: "Khajuri",
      tehsil: "Kolaras",
      district: "Shivpuri",
      size: "52 MB",
      status: "Not Downloaded",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center p-4">
      <div className="w-full max-w-md bg-white shadow rounded-lg overflow-hidden">

        {/* Header */}
        <div className="bg-[#12355B] text-white px-4 py-3 flex items-center gap-3">
          <ArrowLeft size={20} />
          <div>
            <h1 className="font-semibold">
              Download Offline GIS Area
            </h1>
            <p className="text-xs text-blue-100">
              Select area for offline usage
            </p>
          </div>
        </div>

        {/* Storage Card */}
        <div className="p-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">

            <div className="flex items-center gap-2">
              <HardDrive className="text-blue-700" size={20} />
              <h2 className="font-semibold text-blue-900">
                Device Storage
              </h2>
            </div>

            <div className="mt-3">
              <div className="flex justify-between text-sm">
                <span>Available Space</span>
                <span className="font-semibold">
                  12.5 GB
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full w-3/4"></div>
              </div>
            </div>

          </div>
        </div>

        {/* Search */}
        <div className="px-4">
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search village..."
              className="ml-2 flex-1 outline-none"
            />
          </div>
        </div>

        {/* Area List */}
        <div className="p-4 space-y-3">

          {areas.map((area) => (
            <div
              key={area.id}
              className="border rounded-lg p-4 hover:shadow-sm"
            >
              <div className="flex justify-between items-start">

                <div>
                  <h3 className="font-semibold text-[#12355B]">
                    {area.village}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {area.tehsil}, {area.district}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <Map size={14} />
                    <span className="text-xs text-gray-500">
                      GIS Area Package
                    </span>
                  </div>
                </div>

                <span className="text-sm font-medium">
                  {area.size}
                </span>

              </div>

              <div className="mt-4 flex justify-between items-center">

                {area.status === "Downloaded" ? (
                  <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                    <CheckCircle size={16} />
                    Downloaded
                  </div>
                ) : (
                  <div className="text-orange-600 text-sm font-medium">
                    Not Downloaded
                  </div>
                )}

                <button
                  className={`px-4 py-2 rounded text-sm font-medium ${
                    area.status === "Downloaded"
                      ? "bg-green-100 text-green-700"
                      : "bg-[#12355B] text-white hover:bg-[#0B2948]"
                  }`}
                >
                  {area.status === "Downloaded" ? (
                    "Open"
                  ) : (
                    <span className="flex items-center gap-2">
                      <Download size={14} />
                      Download
                    </span>
                  )}
                </button>

              </div>
            </div>
          ))}

        </div>

        {/* Footer */}
        <div className="border-t bg-slate-50 p-4">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium">
            Continue to Offline GIS Map
          </button>
        </div>

      </div>
    </div>
  );
}