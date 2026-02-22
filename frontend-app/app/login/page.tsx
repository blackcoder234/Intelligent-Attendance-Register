"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Mail, Lock, User, ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock authentication delay
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, successful auth would redirect here.
      // For now, it just stops loading.
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-indigo-500/30 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Authentication Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-neutral-900/80 backdrop-blur-2xl border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden relative z-10"
      >
        <div className="p-8">
          {/* Logo & Header */}
          <div className="flex flex-col items-center mb-8">
            <Link
              href="/"
              className="flex items-center gap-3 mb-6 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-indigo-500/30">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                IntelliRegister
              </span>
            </Link>

            <h2 className="text-2xl font-semibold mb-2">
              {isLogin ? "Welcome back" : "Create an account"}
            </h2>
            <p className="text-neutral-400 text-sm text-center">
              {isLogin
                ? "Sign in to manage your digital attendance records."
                : "Sign up to start digitizing your physical registers."}
            </p>
          </div>

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name-input"
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <label className="text-sm font-medium text-neutral-300 ml-1">
                    Full Name
                  </label>
                  <div className="relative group">
                    <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-neutral-600"
                      required={!isLogin}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="teacher@school.edu"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-neutral-600"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-medium text-neutral-300">
                  Password
                </label>
                {isLogin && (
                  <button
                    type="button"
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative group">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-neutral-600"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:pointer-events-none"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Social Logins / OAuth (Mocked) */}
          <div className="mt-8">
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-neutral-800"></div>
              <span className="flex-shrink-0 mx-4 text-neutral-500 text-sm">
                or continue with
              </span>
              <div className="flex-grow border-t border-neutral-800"></div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                className="flex-1 bg-neutral-950 border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700 text-white py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="flex-1 bg-neutral-950 border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700 text-white py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Github className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Toggle Login/Signup */}
          <div className="mt-8 text-center text-sm text-neutral-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setEmail("");
                setPassword("");
                setName("");
              }}
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Footer Link */}
      <div className="absolute bottom-6 text-sm text-neutral-600 z-10">
        <Link
          href="/"
          className="hover:text-neutral-400 transition-colors flex items-center gap-1"
        >
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
