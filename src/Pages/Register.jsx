import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  Building2,
  Landmark,
  CheckCircle2,
  Fingerprint,
  Briefcase,
  Users,
} from "lucide-react";

const NAVY = "#14283F";

const STATES = ["Chandigarh", "Tamil Nadu", "Madhya Pradesh", "Other"];

const DEPARTMENTS = [
  "Revenue & Land Records",
  "Registration & Stamps",
  "Town & Country Planning",
  "Municipal / Property Tax",
  "Survey & Settlement",
  "GIS / IT Cell",
];

const initialForm = {
  fullName: "",
  mobile: "",
  email: "",
  aadhaar: "",
  employeeId: "",
  department: "",
  designation: "",
  state: "",
  district: "",
  password: "",
  confirmPassword: "",
  agree: false,
};

function FieldShell({ icon: Icon, children }) {
  return (
    <div className="relative">
      <Icon size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      {children}
    </div>
  );
}

const inputClasses =
  "w-full rounded-md border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#14283F] focus:outline-none focus:ring-2 focus:ring-[#14283F]/15 transition-colors";

export default function RegisterPage() {
  const [role, setRole] = useState("citizen");
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  const passwordStrength = useMemo(() => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score += 1;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score += 1;
    if (/\d/.test(p)) score += 1;
    if (/[^A-Za-z0-9]/.test(p)) score += 1;
    return score;
  }, [form.password]);

  const strengthLabel = ["Too short", "Weak", "Fair", "Good", "Strong"][passwordStrength];
  const strengthColor = ["bg-slate-200", "bg-red-400", "bg-amber-400", "bg-lime-500", "bg-green-600"][
    passwordStrength
  ];

  function validate() {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Enter your full name.";
    if (role === "citizen") {
      if (!/^\d{10}$/.test(form.mobile)) next.mobile = "Enter a valid 10-digit mobile number.";
      if (!/^\d{12}$/.test(form.aadhaar)) next.aadhaar = "Enter a valid 12-digit Aadhaar number.";
    } else {
      if (!form.employeeId.trim()) next.employeeId = "Enter your employee or government ID.";
      if (!form.department) next.department = "Select a department.";
      if (!form.designation.trim()) next.designation = "Enter your designation.";
      if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid official email address.";
    }
    if (role === "citizen" && form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!form.state) next.state = "Select a state or UT.";
    if (!form.district.trim()) next.district = "Enter your district.";
    if (form.password.length < 8) next.password = "Password must be at least 8 characters.";
    if (form.confirmPassword !== form.password) next.confirmPassword = "Passwords do not match.";
    if (!form.agree) next.agree = "You must accept the terms to continue.";
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSubmitted(true);
      // Replace with real API call, e.g. POST /api/auth/register with { role, ...form }
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: `${NAVY}0D` }}
          >
            <CheckCircle2 size={28} style={{ color: NAVY }} />
          </div>
          <h1 className="mt-5 font-serif text-2xl font-bold" style={{ color: NAVY }}>
            Registration submitted
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {role === "citizen"
              ? "We've received your details. Verify your mobile number to activate your citizen account."
              : "Your request has been sent to your department administrator for verification before activation."}
          </p>
          <Link
            to="/login"
            className="mt-6 rounded-md bg-amber-500 px-6 py-2.5 text-sm font-semibold text-[#12203a] transition-colors hover:bg-amber-400"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-14">
      <div className="mx-auto max-w-2xl px-4">
        <div className="rounded-lg bg-white px-6 py-8 shadow-xl sm:px-10 sm:py-10">
          <div className="text-center">
            <p className="text-xs uppercase tracking-wide text-amber-600">Digital India Initiative</p>
            <h1 className="mt-2 font-serif text-2xl font-bold sm:text-3xl" style={{ color: NAVY }}>
              Create your LandStack account
            </h1>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Register as a citizen to access land services, or as a department official to manage them.
            </p>
          </div>

          {/* Role selector */}
          <div className="mx-auto mt-7 grid max-w-md grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("citizen")}
              className={`flex items-center justify-center gap-2.5 rounded-md border px-4 py-3 text-sm font-medium transition-colors ${
                role === "citizen"
                  ? "border-amber-500 bg-amber-50 text-[#14283F]"
                  : "border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              <Users size={17} className={role === "citizen" ? "text-amber-600" : "text-slate-400"} />
              Citizen
            </button>
            <button
              type="button"
              onClick={() => setRole("government")}
              className={`flex items-center justify-center gap-2.5 rounded-md border px-4 py-3 text-sm font-medium transition-colors ${
                role === "government"
                  ? "border-amber-500 bg-amber-50 text-[#14283F]"
                  : "border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              <Landmark size={17} className={role === "government" ? "text-amber-600" : "text-slate-400"} />
              Government Official
            </button>
          </div>

          <form className="mx-auto mt-6 max-w-md space-y-4" onSubmit={handleSubmit} noValidate>
            {/* Full name */}
            <div>
              <FieldShell icon={User}>
                <input
                  className={inputClasses}
                  placeholder="Full name"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                />
              </FieldShell>
              {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
            </div>

            {role === "citizen" ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <FieldShell icon={Phone}>
                      <input
                        className={inputClasses}
                        placeholder="Mobile number"
                        value={form.mobile}
                        onChange={(e) => update("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                      />
                    </FieldShell>
                    {errors.mobile && <p className="mt-1 text-xs text-red-600">{errors.mobile}</p>}
                  </div>
                  <div>
                    <FieldShell icon={Mail}>
                      <input
                        className={inputClasses}
                        placeholder="Email (optional)"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                      />
                    </FieldShell>
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <FieldShell icon={Fingerprint}>
                    <input
                      className={inputClasses}
                      placeholder="Aadhaar number"
                      value={form.aadhaar}
                      onChange={(e) => update("aadhaar", e.target.value.replace(/\D/g, "").slice(0, 12))}
                    />
                  </FieldShell>
                  {errors.aadhaar ? (
                    <p className="mt-1 text-xs text-red-600">{errors.aadhaar}</p>
                  ) : (
                    <p className="mt-1 text-xs text-slate-400">
                      Used only to verify identity and link existing land records.
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <FieldShell icon={Fingerprint}>
                      <input
                        className={inputClasses}
                        placeholder="Employee / govt ID"
                        value={form.employeeId}
                        onChange={(e) => update("employeeId", e.target.value)}
                      />
                    </FieldShell>
                    {errors.employeeId && <p className="mt-1 text-xs text-red-600">{errors.employeeId}</p>}
                  </div>
                  <div>
                    <FieldShell icon={Mail}>
                      <input
                        className={inputClasses}
                        placeholder="Official email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                      />
                    </FieldShell>
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <FieldShell icon={Building2}>
                      <select
                        className={`${inputClasses} appearance-none`}
                        value={form.department}
                        onChange={(e) => update("department", e.target.value)}
                      >
                        <option value="">Select department</option>
                        {DEPARTMENTS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </FieldShell>
                    {errors.department && <p className="mt-1 text-xs text-red-600">{errors.department}</p>}
                  </div>
                  <div>
                    <FieldShell icon={Briefcase}>
                      <input
                        className={inputClasses}
                        placeholder="Designation"
                        value={form.designation}
                        onChange={(e) => update("designation", e.target.value)}
                      />
                    </FieldShell>
                    {errors.designation && <p className="mt-1 text-xs text-red-600">{errors.designation}</p>}
                  </div>
                </div>
                <p className="text-xs text-slate-400">
                  Government accounts are activated after verification by your department administrator.
                </p>
              </>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldShell icon={MapPin}>
                  <select
                    className={`${inputClasses} appearance-none`}
                    value={form.state}
                    onChange={(e) => update("state", e.target.value)}
                  >
                    <option value="">Select state / UT</option>
                    {STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </FieldShell>
                {errors.state && <p className="mt-1 text-xs text-red-600">{errors.state}</p>}
              </div>
              <div>
                <FieldShell icon={MapPin}>
                  <input
                    className={inputClasses}
                    placeholder="District"
                    value={form.district}
                    onChange={(e) => update("district", e.target.value)}
                  />
                </FieldShell>
                {errors.district && <p className="mt-1 text-xs text-red-600">{errors.district}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldShell icon={Lock}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`${inputClasses} pr-9`}
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
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
                {form.password && (
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex h-1 flex-1 gap-1">
                      {[0, 1, 2, 3].map((i) => (
                        <span
                          key={i}
                          className={`h-full flex-1 rounded-full ${
                            i < passwordStrength ? strengthColor : "bg-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400">{strengthLabel}</span>
                  </div>
                )}
                {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
              </div>
              <div>
                <FieldShell icon={Lock}>
                  <input
                    type={showConfirm ? "text" : "password"}
                    className={`${inputClasses} pr-9`}
                    placeholder="Confirm password"
                    value={form.confirmPassword}
                    onChange={(e) => update("confirmPassword", e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </FieldShell>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div>
              <label className="flex items-start gap-2.5 text-xs text-slate-500">
                <input
                  type="checkbox"
                  className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-[#14283F] focus:ring-[#14283F]/30"
                  checked={form.agree}
                  onChange={(e) => update("agree", e.target.checked)}
                />
                I agree to the LandStack Terms of Use and Privacy Policy, and confirm the information
                provided is accurate.
              </label>
              {errors.agree && <p className="mt-1 text-xs text-red-600">{errors.agree}</p>}
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-amber-500 py-3 text-sm font-semibold text-[#12203a] transition-colors hover:bg-amber-400"
            >
              {role === "citizen" ? "Create citizen account" : "Submit for department verification"}
            </button>

            <p className="text-center text-xs text-slate-500">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-[#14283F] hover:text-amber-600">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}