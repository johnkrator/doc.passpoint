import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import FormInput from "@/admin/components/FormInput";
import { LogIn, Shield, Lock, Mail, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/new-logo.png";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login({ email, password });
      navigate("/admin");
    } catch (err: unknown) {
      const errorMessage = axios.isAxiosError(err)
        ? (err.response?.data?.message ??
          "Invalid email or password. Please try again.")
        : "Invalid email or password. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-linear-to-br from-background via-secondary to-muted dark:from-background dark:via-card dark:to-background">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative w-full max-w-6xl mx-4 grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex flex-col justify-center space-y-6 p-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-card/60 border border-border/60 shadow-sm">
              <Shield className="h-4 w-4 text-brand" />
              <span className="text-sm font-medium text-foreground dark:text-muted-foreground">
                Secure Admin Portal
              </span>
            </div>

            <h1 className="text-5xl font-bold text-foreground dark:text-foreground leading-tight">
              Welcome to
              <span className="block text-brand">Passpoint Admin</span>
            </h1>

            <p className="text-lg text-muted-foreground dark:text-muted-foreground leading-relaxed">
              Manage your documentation, users, and settings all in one place.
              Sign in to access your admin dashboard.
            </p>
          </div>

          <div className="space-y-4 pt-8">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/60 dark:bg-card/60 border border-border/60">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-brand/20 dark:bg-brand/30 flex items-center justify-center">
                <Shield className="h-5 w-5 text-brand" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground dark:text-foreground mb-1">
                  Secure Authentication
                </h3>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                  Protected with enterprise-grade security measures
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/60 dark:bg-card/60 border border-border/60">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-brand/20 dark:bg-brand/30 flex items-center justify-center">
                <Lock className="h-5 w-5 text-brand" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground dark:text-foreground mb-1">
                  Role-Based Access
                </h3>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                  Granular permissions for better control
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="bg-white dark:bg-card border border-border rounded-2xl shadow-lg p-8 lg:p-10">
            {/* Logo and Header */}
            <div className="flex flex-col items-center mb-8 space-y-4">
              <div className="bg-white dark:bg-card border border-border p-3 rounded-2xl shadow-sm">
                <img
                  src={Logo}
                  className="h-10 w-auto object-contain"
                  alt="Passpoint Logo"
                />
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground dark:text-foreground mb-2">
                  Admin Sign In
                </h2>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                  Enter your credentials to access the dashboard
                </p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-lg bg-destructive/10 dark:bg-destructive/20 border border-destructive/30 dark:border-destructive/50 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive dark:text-destructive/80 shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive dark:text-destructive/80">
                    {error}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute left-3 top-[38px] pointer-events-none">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <FormInput
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@passpoint.com"
                    className="pl-10"
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-3 top-[38px] pointer-events-none">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <FormInput
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="pl-10"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full gap-2 h-11 text-base font-semibold bg-brand hover:bg-brand-600 shadow-lg shadow-brand/30 transition-all duration-300 hover:shadow-xl hover:shadow-brand/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </>
                )}
              </Button>
            </form>

            {/* Forgot Password Link */}
            <div className="mt-6 text-center">
              <button
                type="button"
                className="text-sm font-medium text-brand hover:text-brand-600 transition-colors inline-flex items-center gap-1 group"
                onClick={() => navigate("/admin/forgot-password")}
              >
                <Lock className="h-3 w-3 group-hover:rotate-12 transition-transform" />
                Forgot your password?
              </button>
            </div>

            {/* Divider */}
            <div className="mt-8 pt-6 border-t border-border dark:border-border">
              <p className="text-xs text-center text-muted-foreground dark:text-muted-foreground">
                Protected by enterprise-grade security. Your data is safe with
                us.
              </p>
            </div>
          </div>

          {/* Mobile Hero Text */}
          <div className="lg:hidden mt-6 text-center">
            <p className="text-sm text-muted-foreground dark:text-muted-foreground">
              Secure admin portal for managing documentation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
