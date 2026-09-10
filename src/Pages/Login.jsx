import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Landmark,
  Users,
  ArrowRight,
} from "lucide-react";

const NAVY = "#14283F";

function FieldShell({ icon: Icon, children }) {
  return (
    <div className="relative">
      <Icon size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      {children}
    </div>
  );
}

const inputClasses =
  "w-full rounded-md border border-slate-300 bg-white py-3 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#14283F] focus:outline-none focus:ring-2 focus:ring-[#14283F]/15 transition-colors";

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("citizen");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const identifierLabel =
    role === "citizen" ? "Mobile number or email" : "Employee / Government ID";
  const identifierIcon = role === "citizen" ? User : Landmark;

  function validate() {
    const next = {};
    if (!identifier.trim()) next.identifier = `Enter your ${identifierLabel.toLowerCase()}.`;
    if (!password) next.password = "Enter your password.";
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setLoading(true);
      // Replace with real API call, e.g. POST /api/auth/login with { role, identifier, password }
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 900);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      {/* Soft background accent */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, rgba(20,40,63,0.06), transparent 40%), radial-gradient(circle at 85% 80%, rgba(217,119,6,0.07), transparent 45%)",
        }}
      />

      <div className="w-full max-w-[420px]">
        {/* Brand header */}
        <div className="mb-6 text-center">
         
          <p className="text-xs uppercase tracking-wide text-amber-600 font-semibold">
            Digital India Initiative
          </p>
          <h1 className="mt-1.5 font-serif text-2xl sm:text-3xl font-bold" style={{ color: NAVY }}>
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Log in to LandStack to access your land records and services.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-xl bg-white px-6 py-8 shadow-xl border border-slate-100 sm:px-8 sm:py-9">
          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-7">
            <button
              type="button"
              onClick={() => setRole("citizen")}
              className={`flex items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors ${
                role === "citizen"
                  ? "border-amber-500 bg-amber-50 text-[#14283F]"
                  : "border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              <Users size={16} className={role === "citizen" ? "text-amber-600" : "text-slate-400"} />
              Citizen
            </button>
            <button
              type="button"
              onClick={() => setRole("government")}
              className={`flex items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors ${
                role === "government"
                  ? "border-amber-500 bg-amber-50 text-[#14283F]"
                  : "border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              <Landmark size={16} className={role === "government" ? "text-amber-600" : "text-slate-400"} />
              Official
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                {identifierLabel}
              </label>
              <FieldShell icon={identifierIcon}>
                <input
                  className={inputClasses}
                  placeholder={role === "citizen" ? "98765 43210 or name@email.com" : "e.g. FO0231"}
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    setErrors((prev) => ({ ...prev, identifier: undefined }));
                  }}
                />
              </FieldShell>
              {errors.identifier && <p className="mt-1 text-xs text-red-600">{errors.identifier}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-slate-600">Password</label>
                <Link to="/forgot-password" className="text-xs font-medium text-[#14283F] hover:text-amber-600">
                  Forgot password?
                </Link>
              </div>
              <FieldShell icon={Lock}>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`${inputClasses} pr-9`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </FieldShell>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>

            <label className="flex items-center gap-2 text-xs text-slate-500 select-none">
              <input
                type="checkbox"
                className="h-3.5 w-3.5 rounded border-slate-300 text-[#14283F] focus:ring-[#14283F]/30"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Keep me signed in on this device
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-md bg-amber-500 py-3 text-sm font-semibold text-[#12203a] transition-colors hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-[#12203a]/30 border-t-[#12203a] animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  {role === "citizen" ? "Log in to your account" : "Secure department login"}
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            {role === "government" && (
              <p className="text-center text-[11px] text-slate-400">
                Department logins are protected by two-factor verification.
              </p>
            )}
          </form>

          <div className="mt-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="text-[11px] uppercase tracking-wide text-slate-400">or</span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <p className="mt-5 text-center text-sm text-slate-500">
            New to LandStack?{" "}
            <Link to="/register" className="font-semibold text-[#14283F] hover:text-amber-600">
              Create an account
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-[12px] text-slate-400">
          © 2026 LandStack. Government of India — Digital Land Management Platform.
        </p>
      </div>
    </div>
  );
}
