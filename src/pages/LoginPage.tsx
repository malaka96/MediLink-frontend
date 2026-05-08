import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowRight,
  Lock,
  Mail,
  Phone,
  Shield,
  Store,
  User,
} from "lucide-react";
import { login, register } from "../services/apis/AuthApi";
import API from "../services/apis/Api";
import { AuthContext } from "../context/AuthContext";

type LoginRole = "admin" | "pharmacy";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser, setIsLoading } = useContext(AuthContext)!;
  const [mode, setMode] = useState<"login" | "register">("login");
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);
  const [isSubmittingRegister, setIsSubmittingRegister] = useState(false);

  const [loginRole, setLoginRole] = useState<LoginRole>("admin");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const canLogin = useMemo(() => {
    return loginEmail.trim().length > 0 && loginPassword.trim().length > 0;
  }, [loginEmail, loginPassword]);

  const canRegister = useMemo(() => {
    return (
      firstName.trim().length > 0 &&
      lastName.trim().length > 0 &&
      registerEmail.trim().length > 0 &&
      registerPhone.trim().length > 0 &&
      registerPassword.trim().length >= 6 &&
      confirmPassword.trim().length >= 6
    );
  }, [
    confirmPassword,
    firstName,
    lastName,
    registerEmail,
    registerPhone,
    registerPassword,
  ]);

  const onSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!canLogin) {
      setMessage({ type: "error", text: "Please enter email and password." });
      return;
    }

    setIsSubmittingLogin(true);
    setIsLoading(true);

    try {
      await login(loginEmail.trim(), loginPassword);
      const meResponse = await API.get("/api/users/me");
      setUser(meResponse.data);

      setMessage({ type: "success", text: "Signed in successfully." });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setUser(null);
      const errorText = axios.isAxiosError(err)
        ? (err.response?.data as { message?: string } | undefined)?.message ??
          err.response?.statusText ??
          "Login failed."
        : "Login failed.";

      setMessage({ type: "error", text: errorText });
    } finally {
      setIsSubmittingLogin(false);
      setIsLoading(false);
    }
  };

  const onSubmitRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!canRegister) {
      setMessage({
        type: "error",
        text: "Please fill all fields. Password must be at least 6 characters.",
      });
      return;
    }

    if (registerPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    if (isSubmittingRegister) return;

    setIsSubmittingRegister(true);

    register({
      name: `${firstName.trim()} ${lastName.trim()}`.trim(),
      email: registerEmail.trim(),
      password: registerPassword,
      phone: registerPhone.trim(),
      roleId: 2,
    })
      .then(() => {
        setMessage({
          type: "success",
          text: "Account created. Please sign in.",
        });

        setLoginRole("pharmacy");
        setLoginEmail(registerEmail.trim());
        setLoginPassword("");

        setFirstName("");
        setLastName("");
        setRegisterEmail("");
        setRegisterPhone("");
        setRegisterPassword("");
        setConfirmPassword("");

        setMode("login");
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        const errorText = axios.isAxiosError(err)
          ? (err.response?.data as { message?: string } | undefined)?.message ??
            err.response?.statusText ??
            "Registration failed."
          : "Registration failed.";

        setMessage({ type: "error", text: errorText });
      })
      .finally(() => {
        setIsSubmittingRegister(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Brand / Info */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">MediLink</p>
              <p className="text-sm text-gray-500">Smart Healthcare Management</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              Admins and users can securely access the system here. Create an
              account to get started.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-800 font-medium">
                  <Shield className="w-4 h-4 text-blue-600" />
                  Admin Access
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Manage users, reservations, and system settings.
                </p>
              </div>

              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-800 font-medium">
                  <User className="w-4 h-4 text-blue-600" />
                  User Portal
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Access your dashboard and manage your work efficiently.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="p-4 sm:p-5 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setMessage(null);
                  setMode("login");
                }}
                className={
                  mode === "login"
                    ? "px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white shadow-sm"
                    : "px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-white border border-transparent hover:border-gray-200 transition"
                }
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMessage(null);
                  setMode("register");
                }}
                className={
                  mode === "register"
                    ? "px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white shadow-sm"
                    : "px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-white border border-transparent hover:border-gray-200 transition"
                }
              >
                Register
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {message ? (
              <div
                className={
                  message.type === "success"
                    ? "mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
                    : "mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                }
              >
                {message.text}
              </div>
            ) : null}

            {mode === "login" ? (
              <form onSubmit={onSubmitLogin} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Login As
                  </label>
                  <select
                    value={loginRole}
                    onChange={(e) => setLoginRole(e.target.value as LoginRole)}
                    className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="admin">Admin</option>
                    <option value="pharmacy">Pharmacy</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-2 flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
                    <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="outline-none w-full text-sm min-w-0"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-2 flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
                    <Lock className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="outline-none w-full text-sm min-w-0"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!canLogin || isSubmittingLogin}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {isSubmittingLogin ? "Signing In..." : "Sign In"}{" "}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center text-xs text-gray-600">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMessage(null);
                      setMode("register");
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2"
                  >
                    Create one
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={onSubmitRegister} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <div className="mt-2 flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
                      <User className="w-4 h-4 text-gray-400 shrink-0" />
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Kasun"
                        className="outline-none w-full text-sm min-w-0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <div className="mt-2 flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
                      <User className="w-4 h-4 text-gray-400 shrink-0" />
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Perera"
                        className="outline-none w-full text-sm min-w-0"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-2 flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
                    <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="outline-none w-full text-sm min-w-0"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-2 flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
                    <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="tel"
                      value={registerPhone}
                      onChange={(e) => setRegisterPhone(e.target.value)}
                      placeholder="+94 77 123 4567"
                      className="outline-none w-full text-sm min-w-0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-2 flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
                      <Lock className="w-4 h-4 text-gray-400 shrink-0" />
                      <input
                        type="password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        className="outline-none w-full text-sm min-w-0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <div className="mt-2 flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
                      <Lock className="w-4 h-4 text-gray-400 shrink-0" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat password"
                        className="outline-none w-full text-sm min-w-0"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!canRegister || isSubmittingRegister}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {isSubmittingRegister ? "Creating..." : "Create Account"}{" "}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center text-xs text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMessage(null);
                      setMode("login");
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
