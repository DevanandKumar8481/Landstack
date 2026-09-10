import { useState } from "react";
import { Pause, Play } from "lucide-react";
import NIC from "../assets/NIC.svg";
import digitalindia from "../assets/digitalindia.svg";
import SoI from "../assets/SoI.png";
import DoLR from "../assets/DoLR.jpg";
import Revenue from "../assets/Revenue.png";
// import srrdLogo from "../assets/logos/srrd.png";
// import ngpLogo from "../assets/logos/ngp.png";

const NAVY = "#14283F";

const departments = [
    {
        logo: NIC,
        name: "Department of Land Resources",
        tag: "DoLR",
        url: "https://dolr.gov.in",
    },
    {
        logo: digitalindia,
        name: "Digital India",
        tag: "DI",
        url: "https://digitalindia.gov.in",
    },

    {
        logo: DoLR,
        name: "Department of Land Resources",
        tag: "DoLR",
        url: "https://dolr.gov.in",
    },
    {
        logo: Revenue,
        name: "Department of Revenue",
        tag: "DoR",
        url: "https://revenue.nic.in",
    },
    {
        logo: SoI,
        name: "Survey of India",
        tag: "SoI",
        url: "https://surveyofindia.gov.in",
    },
    // {
    //     logo: srrdLogo,
    //     name: "State Revenue & Registration Department",
    //     tag: "SRRD",
    //     url: "https://example.gov.in",
    // },
    // {
    //     logo: ngpLogo,
    //     name: "National Geospatial Programme",
    //     tag: "NGP",
    //     url: "https://ngp.gov.in",
    // },
];

function DepartmentCard({ logo, name, tag, url }) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={name}
            aria-label={`Visit ${name} website`}
            className="flex h-24 w-40 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
        >
            <img src={logo} alt={`${tag} logo`} className="max-h-full max-w-full object-contain" />
        </a>
    );
}

export default function AffiliatedDepartments() {
    const [playing, setPlaying] = useState(true);
    const loop = [...departments, ...departments];

    return (
        <section className="border-t border-slate-200 bg-slate-50 py-10">
            <style>{`
        @keyframes department-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-6 flex items-end justify-between">
                    <div>
                        <h2 className="font-serif text-xl font-bold sm:text-2xl" style={{ color: NAVY }}>
                            Affiliated Departments &amp; Agencies
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            LandStack works in coordination with these bodies to keep records accurate.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setPlaying((v) => !v)}
                        aria-label={playing ? "Pause scrolling" : "Resume scrolling"}
                        className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition-colors hover:bg-white sm:flex"
                    >
                        {playing ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                </div>
            </div>

            <div className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-50 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-50 to-transparent" />

                <div
                    className="flex w-max gap-4 px-4"
                    style={{
                        animation: "department-scroll 28s linear infinite",
                        animationPlayState: playing ? "running" : "paused",
                    }}
                >
                    {loop.map((dept, i) => (
                        <DepartmentCard key={`${dept.tag}-${i}`} {...dept} />
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:hidden">
                <button
                    type="button"
                    onClick={() => setPlaying((v) => !v)}
                    aria-label={playing ? "Pause scrolling" : "Resume scrolling"}
                    className="mt-4 flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-500"
                >
                    {playing ? <Pause size={14} /> : <Play size={14} />}
                </button>
            </div>
        </section>
    );
}