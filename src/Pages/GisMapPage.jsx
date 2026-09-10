import { useEffect, useMemo, useRef, useState } from "react";
import { Layers, Map as MapIcon, Satellite, Search, X, MapPin, Loader2, LocateFixed, Navigation } from "lucide-react";

/* ---------------- Sample Data (real-world coordinates around Ujjain / Indore / Bhopal, MP) - */
const parcels = [
  { ulpin: "MP-UJN-0001-2024", owner: "Ramesh Patel", village: "Chintaman", district: "Ujjain", landUse: "Residential", surveyNumber: "112/3", registrationStatus: "Registered", area: "0.42 ha", lat: 23.1512, lng: 75.7218 },
  { ulpin: "MP-UJN-0002-2024", owner: "Sunita Sharma", village: "Nagda", district: "Ujjain", landUse: "Agricultural", surveyNumber: "45/1", registrationStatus: "Pending", area: "1.8 ha", lat: 23.4534, lng: 75.4155 },
  { ulpin: "MP-UJN-0003-2024", owner: "Vikram Traders", village: "Mahakal", district: "Ujjain", landUse: "Commercial", surveyNumber: "78/2A", registrationStatus: "Registered", area: "0.15 ha", lat: 23.1828, lng: 75.7683 },
  { ulpin: "MP-IND-0004-2024", owner: "Anita Verma", village: "Rau", district: "Indore", landUse: "Industrial", surveyNumber: "201/5", registrationStatus: "Disputed", area: "2.1 ha", lat: 22.6167, lng: 75.7833 },
  { ulpin: "MP-IND-0005-2024", owner: "Govt. Primary School", village: "Depalpur", district: "Indore", landUse: "Institutional", surveyNumber: "9/1", registrationStatus: "Registered", area: "0.6 ha", lat: 22.85, lng: 75.55 },
  { ulpin: "MP-IND-0006-2024", owner: "Forest Department", village: "Sanwer", district: "Indore", landUse: "Green Zone", surveyNumber: "3/2", registrationStatus: "Registered", area: "5.4 ha", lat: 22.9667, lng: 75.75 },
  { ulpin: "MP-BPL-0007-2024", owner: "Deepak Malviya", village: "Kolar", district: "Bhopal", landUse: "Residential", surveyNumber: "56/2", registrationStatus: "Registered", area: "0.35 ha", lat: 23.1793, lng: 77.3910 },
  { ulpin: "MP-BPL-0008-2024", owner: "Meera Agarwal", village: "Bairagarh", district: "Bhopal", landUse: "Commercial", surveyNumber: "22/1B", registrationStatus: "Pending", area: "0.28 ha", lat: 23.2762, lng: 77.3487 },
  { ulpin: "MP-BPL-0009-2024", owner: "Bhopal Municipal Corp.", village: "TT Nagar", district: "Bhopal", landUse: "Institutional", surveyNumber: "5/1", registrationStatus: "Registered", area: "1.1 ha", lat: 23.2340, lng: 77.4013 },
  { ulpin: "MP-BPL-0010-2024", owner: "Suresh Yadav", village: "Berasia", district: "Bhopal", landUse: "Agricultural", surveyNumber: "88/4", registrationStatus: "Registered", area: "2.6 ha", lat: 23.6333, lng: 77.4333 },
  { ulpin: "MP-BPL-0011-2024", owner: "Pragya Industries", village: "Mandideep", district: "Bhopal", landUse: "Industrial", surveyNumber: "17/2", registrationStatus: "Disputed", area: "3.0 ha", lat: 23.1067, lng: 77.5333 },
  { ulpin: "MP-BPL-0012-2024", owner: "Van Vibhag Bhopal", village: "Kerwa", district: "Bhopal", landUse: "Green Zone", surveyNumber: "2/1", registrationStatus: "Registered", area: "6.2 ha", lat: 23.2156, lng: 77.4870 },
];

const landUseColor = {
  Residential: "#1E40AF",
  Commercial: "#B45309",
  Agricultural: "#15803D",
  Industrial: "#7C2D12",
  Institutional: "#4338CA",
  "Green Zone": "#047857",
};

const NAVY = "#14283F";

const statusHex = {
  Registered: { bg: "#ecfdf5", text: "#047857" },
  Pending: { bg: "#fffbeb", text: "#b45309" },
  Disputed: { bg: "#fef2f2", text: "#b91c1c" },
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parcelPopupHtml(p) {
  const tone = statusHex[p.registrationStatus] || { bg: "#f1f5f9", text: "#334155" };
  const headerColor = landUseColor[p.landUse] || NAVY;
  return `
    <div style="min-width:230px;font-family:inherit;">
      <div style="margin:-10px -13px 10px -13px;padding:10px 13px;border-radius:10px 10px 0 0;background:${headerColor};color:#ffffff;">
        <div style="font-weight:700;font-size:14px;line-height:1.3;">${escapeHtml(p.owner)}</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.85);margin-top:2px;">${escapeHtml(p.village)}, ${escapeHtml(p.district)}</div>
      </div>
      <div style="font-family:monospace;font-size:11px;color:${NAVY};margin-bottom:8px;">${escapeHtml(p.ulpin)}</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;">
        <span style="font-size:11px;font-weight:600;padding:2px 9px;border-radius:9999px;background:#eff6ff;color:#1d4ed8;">${escapeHtml(p.landUse)}</span>
        <span style="font-size:11px;font-weight:600;padding:2px 9px;border-radius:9999px;background:${tone.bg};color:${tone.text};">${escapeHtml(p.registrationStatus)}</span>
      </div>
      <div style="font-size:12px;color:#475569;display:grid;grid-template-columns:auto 1fr;row-gap:5px;column-gap:12px;">
        <span style="color:#94a3b8;">Survey No.</span><span style="font-weight:500;color:#0f172a;">${escapeHtml(p.surveyNumber)}</span>
        <span style="color:#94a3b8;">Area</span><span style="font-weight:500;color:#0f172a;">${escapeHtml(p.area)}</span>
      </div>
    </div>
  `;
}

function searchPopupHtml(label) {
  return `
    <div style="min-width:210px;font-family:inherit;">
      <div style="margin:-10px -13px 10px -13px;padding:8px 13px;border-radius:10px 10px 0 0;background:#F59E0B;color:#1f2937;font-weight:700;font-size:11px;letter-spacing:0.03em;text-transform:uppercase;">Searched Location</div>
      <div style="font-size:12.5px;color:#0f172a;line-height:1.45;">${escapeHtml(label)}</div>
    </div>
  `;
}

function userLocationPopupHtml(label) {
  return `
    <div style="min-width:190px;font-family:inherit;">
      <div style="margin:-10px -13px 10px -13px;padding:8px 13px;border-radius:10px 10px 0 0;background:#2563EB;color:#ffffff;font-weight:700;font-size:11px;letter-spacing:0.03em;text-transform:uppercase;">Your Location</div>
      <div style="font-size:12.5px;color:#0f172a;line-height:1.45;">${escapeHtml(label)}</div>
    </div>
  `;
}

/* ---------------- Tiny i18n helper ---------------- */
function useApp() {
  const [lang, setLang] = useState("en");
  const t = (en, hi) => (lang === "hi" ? hi : en);
  return { t, lang, setLang };
}

/* ---------------- Inline UI primitives ---------------- */
function Button({ children, variant = "solid", size = "md", className = "", ...props }) {
  const base = "inline-flex items-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none";
  const sizes = { sm: "h-9 px-3 text-sm", md: "h-10 px-4 text-sm" };
  const variants = {
    solid: "text-white hover:opacity-90",
    outline: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
  };
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      style={variant === "solid" ? { backgroundColor: NAVY } : undefined}
      {...props}
    >
      {children}
    </button>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className={`h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#14283F]/15 focus:border-[#14283F] transition-colors ${props.className || ""}`}
    />
  );
}

function Select({ value, onValueChange, options, ariaLabel, placeholder }) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      aria-label={ariaLabel}
      className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#14283F]/15 focus:border-[#14283F] transition-colors"
    >
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function SectionCard({ title, description, children, className = "" }) {
  return (
    <section className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}>
      <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      {description && <p className="mt-0.5 text-xs text-slate-500">{description}</p>}
      <div className="mt-3">{children}</div>
    </section>
  );
}

function PageHeader({ crumb, title, subtitle, actions }) {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-xs font-medium tracking-wide text-amber-600 uppercase">{crumb}</p>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold" style={{ color: NAVY }}>
              {title}
            </h1>
            <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
          </div>
          {actions}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Leaflet loader (CDN, no bundler dependency) ---------------- */
const LEAFLET_CSS = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
const LEAFLET_JS = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";

const MAP_POPUP_STYLE_ID = "landstack-map-popup-style";

function injectMapPopupStyles() {
  if (document.getElementById(MAP_POPUP_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = MAP_POPUP_STYLE_ID;
  style.textContent = `
    .landstack-popup .leaflet-popup-content-wrapper {
      border-radius: 10px;
      box-shadow: 0 10px 28px rgba(15,23,42,0.22);
    }
    .landstack-popup .leaflet-popup-content {
      margin: 10px 13px;
    }
    .landstack-popup .leaflet-popup-tip-container {
      width: 26px;
      height: 13px;
    }
    .landstack-village-tooltip {
      background: #14283F;
      color: #ffffff;
      border: none;
      border-radius: 6px;
      padding: 3px 8px;
      font-size: 11px;
      font-weight: 500;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }
    .landstack-village-tooltip::before {
      border-top-color: #14283F;
    }
  `;
  document.head.appendChild(style);
}

function useLeaflet() {
  const [ready, setReady] = useState(typeof window !== "undefined" && !!window.L);

  useEffect(() => {
    if (ready) return;
    injectMapPopupStyles();
    if (!document.querySelector(`link[href="${LEAFLET_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = LEAFLET_CSS;
      document.head.appendChild(link);
    }
    if (window.L) {
      setReady(true);
      return;
    }
    let script = document.querySelector(`script[src="${LEAFLET_JS}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = LEAFLET_JS;
      script.async = true;
      document.body.appendChild(script);
    }
    const onLoad = () => setReady(true);
    script.addEventListener("load", onLoad);
    if (window.L) setReady(true);
    return () => script.removeEventListener("load", onLoad);
  }, [ready]);

  return ready;
}

/* ---------------- Leaflet-powered parcel map ---------------- */
function ParcelMap({ parcels: items, selected, onSelect, layer, searchMarker, userLocation }) {
  const leafletReady = useLeaflet();
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersRef = useRef({});
  const searchMarkerRef = useRef(null);
  const userMarkerRef = useRef(null);
  const userAccuracyRef = useRef(null);

  // Initialize map once Leaflet is ready
  useEffect(() => {
    if (!leafletReady || mapRef.current || !containerRef.current) return;
    const L = window.L;
    const map = L.map(containerRef.current, {
      zoomControl: true,
      attributionControl: true,
    }).setView([23.0, 75.7], 9);
    mapRef.current = map;

    // Leaflet measures its container's pixels at construction time. If the
    // container hasn't finished laying out yet (common right after mount in
    // a CSS-grid/flex parent), the map locks in the wrong size and the tiles
    // overflow / only partially fill the box. Re-measuring after layout
    // settles — and whenever the container is resized — fixes it.
    const fix = () => map.invalidateSize();
    requestAnimationFrame(fix);
    const t1 = setTimeout(fix, 150);
    const t2 = setTimeout(fix, 500);

    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(fix);
      ro.observe(containerRef.current);
    } else {
      window.addEventListener("resize", fix);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", fix);
      map.remove();
      mapRef.current = null;
    };
  }, [leafletReady]);

  // Swap tile layer between street / satellite
  useEffect(() => {
    if (!mapRef.current) return;
    const L = window.L;
    if (tileLayerRef.current) {
      mapRef.current.removeLayer(tileLayerRef.current);
    }
    const tiles =
      layer === "satellite"
        ? L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            { attribution: "Tiles &copy; Esri", maxZoom: 19 }
          )
        : L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          });
    tiles.addTo(mapRef.current);
    tileLayerRef.current = tiles;
    // Tile-layer swaps can also leave stale sizing on some browsers.
    mapRef.current.invalidateSize();
  }, [layer, leafletReady]);

  // Sync parcel markers with filtered list
  useEffect(() => {
    if (!mapRef.current) return;
    const L = window.L;
    const map = mapRef.current;

    Object.values(markersRef.current).forEach((m) => map.removeLayer(m));
    markersRef.current = {};

    items.forEach((p) => {
      const marker = L.circleMarker([p.lat, p.lng], {
        radius: selected === p.ulpin ? 11 : 8,
        color: selected === p.ulpin ? "#ffffff" : landUseColor[p.landUse],
        weight: selected === p.ulpin ? 3 : 1,
        fillColor: landUseColor[p.landUse],
        fillOpacity: 0.9,
      })
        .bindTooltip(p.village, { direction: "top", offset: [0, -6], className: "landstack-village-tooltip" })
        .bindPopup(parcelPopupHtml(p), { className: "landstack-popup", closeButton: true })
        .on("click", () => onSelect(p.ulpin))
        .addTo(map);
      marker.__landUse = p.landUse;
      markersRef.current[p.ulpin] = marker;
    });

    if (!searchMarker && !userLocation && items.length > 0) {
      const bounds = L.latLngBounds(items.map((p) => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, leafletReady]);

  // Re-style / fly to selected parcel marker
  useEffect(() => {
    if (!mapRef.current) return;
    Object.entries(markersRef.current).forEach(([ulpin, marker]) => {
      const isSel = ulpin === selected;
      marker.setStyle({
        radius: isSel ? 11 : 8,
        weight: isSel ? 3 : 1,
        color: isSel ? "#ffffff" : landUseColor[marker.__landUse] || "#334155",
      });
    });
    if (selected) {
      const p = items.find((i) => i.ulpin === selected);
      const marker = markersRef.current[selected];
      if (p) mapRef.current.flyTo([p.lat, p.lng], Math.max(mapRef.current.getZoom(), 13), { duration: 0.6 });
      if (marker && !marker.isPopupOpen()) marker.openPopup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  // Drop / move / clear the geocoded search marker and fly to it
  useEffect(() => {
    if (!mapRef.current) return;
    const L = window.L;
    const map = mapRef.current;

    if (searchMarkerRef.current) {
      map.removeLayer(searchMarkerRef.current);
      searchMarkerRef.current = null;
    }

    if (searchMarker) {
      const marker = L.circleMarker([searchMarker.lat, searchMarker.lng], {
        radius: 13,
        color: "#ffffff",
        weight: 3,
        fillColor: "#F59E0B",
        fillOpacity: 0.95,
      })
        .bindPopup(searchPopupHtml(searchMarker.label), {
          className: "landstack-popup",
          closeButton: true,
        })
        .addTo(map)
        .openPopup();
      searchMarkerRef.current = marker;
      map.flyTo([searchMarker.lat, searchMarker.lng], 14, { duration: 0.7 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchMarker, leafletReady]);

  // Drop / move / clear the "Use my location" marker (with accuracy ring) and fly to it
  useEffect(() => {
    if (!mapRef.current) return;
    const L = window.L;
    const map = mapRef.current;

    if (userMarkerRef.current) {
      map.removeLayer(userMarkerRef.current);
      userMarkerRef.current = null;
    }
    if (userAccuracyRef.current) {
      map.removeLayer(userAccuracyRef.current);
      userAccuracyRef.current = null;
    }

    if (userLocation) {
      if (userLocation.accuracy) {
        userAccuracyRef.current = L.circle([userLocation.lat, userLocation.lng], {
          radius: userLocation.accuracy,
          color: "#2563EB",
          weight: 1,
          fillColor: "#2563EB",
          fillOpacity: 0.1,
        }).addTo(map);
      }
      const marker = L.circleMarker([userLocation.lat, userLocation.lng], {
        radius: 10,
        color: "#ffffff",
        weight: 3,
        fillColor: "#2563EB",
        fillOpacity: 1,
      })
        .bindPopup(userLocationPopupHtml(userLocation.label), {
          className: "landstack-popup",
          closeButton: true,
        })
        .addTo(map)
        .openPopup();
      userMarkerRef.current = marker;
      map.flyTo([userLocation.lat, userLocation.lng], 15, { duration: 0.7 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation, leafletReady]);

  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-xl border border-slate-200 shadow-inner">
      <div ref={containerRef} className="h-full w-full" />
      {!leafletReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-50 text-slate-400">
          <Loader2 className="size-6 animate-spin" style={{ color: NAVY }} />
          <p className="text-sm">Loading map…</p>
        </div>
      )}
      {leafletReady && items.length === 0 && !searchMarker && !userLocation && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <p className="rounded-lg bg-white/90 px-3 py-1.5 text-sm text-slate-400 shadow">No parcels to display</p>
        </div>
      )}
    </div>
  );
}

/* Main Page  */
export default function GisMapPage() {
  const { t } = useApp();
  const [query, setQuery] = useState("");
  const [landUse, setLandUse] = useState("all");
  const [district, setDistrict] = useState("all");
  const [layer, setLayer] = useState("street");
  const [selected, setSelected] = useState(null);

  // Live geocoding state — powers "search a place or ULPIN and auto-locate it"
  const [geocoding, setGeocoding] = useState(false);
  const [geocodeResult, setGeocodeResult] = useState(null); // { lat, lng, label }
  const [geocodeError, setGeocodeError] = useState(null);
  const searchIdRef = useRef(0);

  // Browser-geolocation state — powers the "Use my location" button
  const [locating, setLocating] = useState(false);
  const [userLocation, setUserLocation] = useState(null); // { lat, lng, label, accuracy }
  const [locationError, setLocationError] = useState(null);

  const districts = useMemo(() => Array.from(new Set(parcels.map((p) => p.district))), []);

  const filtered = useMemo(
    () =>
      parcels.filter(
        (p) =>
          (landUse === "all" || p.landUse === landUse) &&
          (district === "all" || p.district === district) &&
          (query.trim() === "" ||
            [p.ulpin, p.owner, p.village, p.surveyNumber].some((v) =>
              v.toLowerCase().includes(query.trim().toLowerCase()),
            )),
      ),
    [query, landUse, district],
  );

  const selectParcel = (ulpin) => {
    setSelected(ulpin);
    setGeocodeResult(null);
    setGeocodeError(null);
    setUserLocation(null);
    setLocationError(null);
  };

  const useMyLocation = () => {
    setLocationError(null);
    if (!("geolocation" in navigator)) {
      setLocationError(t("Geolocation isn't supported in this browser.", "इस ब्राउज़र में जियोलोकेशन समर्थित नहीं है।"));
      return;
    }
    setLocating(true);
    setSelected(null);
    setGeocodeResult(null);
    setGeocodeError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setUserLocation({
          lat: latitude,
          lng: longitude,
          accuracy,
          label: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}${
            accuracy ? ` (±${Math.round(accuracy)} m)` : ""
          }`,
        });
        setLocating(false);
      },
      (err) => {
        setLocating(false);
        const msg =
          err.code === err.PERMISSION_DENIED
            ? t("Location access denied. Enable it in your browser settings.", "स्थान पहुंच अस्वीकृत। इसे ब्राउज़र सेटिंग्स में सक्षम करें।")
            : t("Couldn't get your location. Try again.", "आपका स्थान नहीं मिल सका। पुनः प्रयास करें।");
        setLocationError(msg);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  };

  const clearUserLocation = () => {
    setUserLocation(null);
    setLocationError(null);
  };

  // Whenever the search box changes: auto-select a unique local match, or
  // fall back to a live OpenStreetMap geocode lookup for a place name.
  useEffect(() => {
    const q = query.trim();
    searchIdRef.current += 1;
    const id = searchIdRef.current;

    if (!q) {
      setGeocodeResult(null);
      setGeocodeError(null);
      setGeocoding(false);
      return;
    }

    const localMatches = parcels.filter((p) =>
      [p.ulpin, p.owner, p.village, p.surveyNumber].some((v) => v.toLowerCase().includes(q.toLowerCase())),
    );

    if (localMatches.length === 1) {
      setSelected(localMatches[0].ulpin);
      setGeocodeResult(null);
      setGeocodeError(null);
      setGeocoding(false);
      return;
    }

    if (localMatches.length > 1) {
      // Multiple parcels match — let the results list handle selection.
      setGeocodeResult(null);
      setGeocodeError(null);
      setGeocoding(false);
      return;
    }

    // No local match: treat it as a place search and geocode it.
    setGeocoding(true);
    setGeocodeError(null);
    const handle = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in&q=${encodeURIComponent(
            `${q}, Madhya Pradesh, India`,
          )}`,
        );
        const data = await res.json();
        if (searchIdRef.current !== id) return; // a newer search superseded this one
        if (data && data[0]) {
          setGeocodeResult({
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
            label: data[0].display_name,
          });
          setGeocodeError(null);
        } else {
          setGeocodeResult(null);
          setGeocodeError(t("No location found for that search.", "उस खोज के लिए कोई स्थान नहीं मिला।"));
        }
      } catch {
        if (searchIdRef.current !== id) return;
        setGeocodeResult(null);
        setGeocodeError(t("Location search failed. Check your connection.", "स्थान खोज विफल रही।"));
      } finally {
        if (searchIdRef.current === id) setGeocoding(false);
      }
    }, 600);

    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <main id="main-content" className="min-h-screen bg-slate-100">
      <PageHeader
        crumb={t("GIS Map", "जीआईएस मानचित्र")}
        title={t("GIS Parcel Map", "जीआईएस भूखंड मानचित्र")}
        subtitle={t(
          "Search any ULPIN or place name — the map finds and centers it automatically.",
          "कोई भी ULPIN या स्थान नाम खोजें — मानचित्र स्वतः उसे ढूंढ लेगा।",
        )}
        actions={
          <Button variant="outline" size="sm" onClick={() => setLayer((l) => (l === "street" ? "satellite" : "street"))}>
            {layer === "street" ? <Satellite className="size-4" /> : <MapIcon className="size-4" />}
            {layer === "street" ? t("Satellite View", "उपग्रह दृश्य") : t("Street View", "सड़क दृश्य")}
          </Button>
        }
      />

      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:px-6 lg:grid-cols-[20rem_1fr] lg:px-8">
        <aside className="space-y-4">
          <SectionCard title={t("Filters", "फ़िल्टर")}>
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 size-4 text-slate-400" aria-hidden />
                <Input
                  className="pl-9 pr-9"
                  placeholder={t("ULPIN, owner, village, or a place name", "ULPIN, स्वामी, ग्राम या स्थान")}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search parcels or locations"
                />
                {geocoding && (
                  <Loader2 className="absolute right-3 top-2.5 size-4 animate-spin text-slate-400" aria-hidden />
                )}
                {!geocoding && query && (
                  <button
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-2 rounded p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>

              {/* Use my location */}
              <button
                onClick={userLocation ? clearUserLocation : useMyLocation}
                disabled={locating}
                className={`flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:opacity-60 ${
                  userLocation
                    ? "border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {locating ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                ) : (
                  <Navigation className="size-4" aria-hidden />
                )}
                {locating
                  ? t("Locating…", "पता लगाया जा रहा है…")
                  : userLocation
                  ? t("Clear my location", "मेरा स्थान हटाएँ")
                  : t("Use my location", "मेरा स्थान उपयोग करें")}
              </button>

              {geocodeResult && (
                <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                  <LocateFixed className="mt-0.5 size-3.5 shrink-0" />
                  <span className="leading-snug">{geocodeResult.label}</span>
                </div>
              )}
              {geocodeError && (
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
                  {geocodeError}
                </div>
              )}
              {userLocation && (
                <div className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-800">
                  <Navigation className="mt-0.5 size-3.5 shrink-0" />
                  <span className="leading-snug">{userLocation.label}</span>
                </div>
              )}
              {locationError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                  {locationError}
                </div>
              )}

              <Select
                value={landUse}
                onValueChange={setLandUse}
                ariaLabel="Land use"
                options={[
                  { value: "all", label: "All Land Use" },
                  ...["Residential", "Commercial", "Agricultural", "Industrial", "Institutional", "Green Zone"].map((l) => ({
                    value: l,
                    label: l,
                  })),
                ]}
              />
              <Select
                value={district}
                onValueChange={setDistrict}
                ariaLabel="District"
                options={[{ value: "all", label: "All Districts" }, ...districts.map((d) => ({ value: d, label: d }))]}
              />
            </div>
          </SectionCard>

          <SectionCard title={t("Map Layers", "मानचित्र परतें")}>
            <ul className="space-y-2.5 text-sm">
              {["Cadastral Boundaries", "Zoning / Master Plan", "Ownership", "Disputes", "Encroachment Alerts"].map((l) => (
                <li key={l} className="flex items-center gap-2 text-slate-700">
                  <Layers className="size-4 text-amber-600" aria-hidden />
                  {l}
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title={`${t("Results", "परिणाम")} (${filtered.length})`}>
            {filtered.length === 0 ? (
              <p className="text-sm text-slate-500">
                {query.trim()
                  ? t("No matching parcels — showing place search instead.", "कोई मिलान भूखंड नहीं — स्थान खोज दिखाई जा रही है।")
                  : t("No parcels match your filters.", "कोई भूखंड नहीं मिला।")}
              </p>
            ) : (
              <ul className="max-h-80 space-y-2 overflow-y-auto pr-1">
                {filtered.map((p) => {
                  const active = p.ulpin === selected;
                  return (
                    <li key={p.ulpin}>
                      <button
                        onClick={() => selectParcel(p.ulpin)}
                        className={`w-full rounded-lg border p-2.5 text-left text-sm transition-colors ${
                          active ? "border-[#14283F] bg-[#14283F]/5" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <MapPin className="size-3.5 shrink-0" style={{ color: landUseColor[p.landUse] }} />
                          <p className="font-mono text-xs" style={{ color: NAVY }}>{p.ulpin}</p>
                        </div>
                        <p className="mt-0.5 font-medium text-slate-900">{p.owner}</p>
                        <p className="text-xs text-slate-500">
                          {p.village}, {p.district} · {p.landUse}
                        </p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </SectionCard>
        </aside>

        <div className="space-y-4">
          <SectionCard
            title={t("Parcel Map", "भूखंड मानचित्र")}
            description={t(
              "Click a marker to open its profile, search above to jump anywhere, or use your location",
              "प्रोफ़ाइल हेतु मार्कर पर क्लिक करें, ऊपर खोजें, या अपना स्थान उपयोग करें",
            )}
          >
            <ParcelMap
              parcels={filtered}
              selected={selected}
              onSelect={selectParcel}
              layer={layer}
              searchMarker={geocodeResult}
              userLocation={userLocation}
            />
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs">
              {Object.entries(landUseColor).map(([label, color]) => (
                <span key={label} className="inline-flex items-center gap-1.5">
                  <span className="size-3 rounded-full" style={{ backgroundColor: color }} aria-hidden />
                  {label}
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5">
                <span className="size-3 rounded-full bg-amber-500" aria-hidden />
                {t("Searched location", "खोजा गया स्थान")}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-3 rounded-full bg-blue-600" aria-hidden />
                {t("Your location", "आपका स्थान")}
              </span>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}

