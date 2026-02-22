"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Server,
  CheckCircle,
  Smartphone,
  Database,
  ScanLine,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans selection:bg-indigo-500/30">
      {/* Navbar Minimalist */}
      <nav className="fixed w-full z-50 border-b border-white/5 bg-neutral-950/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-2xl tracking-tight text-white hover:text-indigo-400 transition-colors">
              IntelliRegister
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/login"
              className="text-neutral-300 hover:text-white font-medium transition-colors hidden sm:block"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="px-5 py-2.5 bg-indigo-600 border border-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-95 flex items-center gap-2"
            >
              Open App <ArrowRight className="w-4 h-4 hidden sm:block" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section (Contains the Background Image) */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
        {/* Background Image restricted to Hero */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen"
          style={{ backgroundImage: "url('/landing_bg.png')" }}
        >
          {/* Fading gradient to blend smoothly into the solid dark background below */}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/80 to-neutral-950"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-5xl mx-auto text-center space-y-8 px-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-4 backdrop-blur-md">
            <Zap className="w-4 h-4" /> Powered By snippet.co
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-indigo-400">
            Digitize Registers <br className="hidden md:block" /> Instantly with
            AI.
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Eliminate manual data entry. Upload photos of your physical
            attendance sheets and let our Computer Vision engine extract student
            names, roll numbers, and attendance records with extreme accuracy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-white text-black font-semibold rounded-xl transition-all shadow-xl hover:bg-neutral-200 active:scale-95 flex items-center gap-2 text-lg w-full sm:w-auto justify-center"
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#what-is-it"
              className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold rounded-xl transition-all active:scale-95 flex items-center gap-2 text-lg w-full sm:w-auto justify-center backdrop-blur-md"
            >
              Learn More
            </a>
          </div>
        </motion.div>
      </section>

      {/* What is it Section */}
      <section id="what-is-it" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Bridging the gap between Physical and Digital.
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed mb-6">
                IntelliRegister is a smart AI-powered platform tailored
                explicitly for educators and institutions. We understand that
                taking attendance on paper is still the fastest method in a
                classroom—but digitizing that data at the end of the month is a
                nightmare.
              </p>
              <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                By combining cutting-edge OpenCV (Computer Vision) table
                extraction and a custom Deep Learning classifier, our platform
                bridges the gap, giving you the best of both worlds: Write on
                paper, store in the cloud.
              </p>

              <ul className="space-y-4">
                {[
                  "No special scanner needed; works with standard smartphone photos.",
                  "Reads messy grid lines natively.",
                  "Identifies handwritten and printed marks (P, A, ✓, ✗).",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Enhanced Mock Dashboard Preview Graphic */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-xl p-2 md:p-3 shadow-2xl overflow-hidden aspect-video flex items-center justify-center group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="w-full h-full border border-neutral-800 rounded-xl bg-neutral-950 flex flex-col overflow-hidden relative z-10 shadow-inner shadow-black/50">
                {/* Window Header */}
                <div className="h-8 md:h-10 border-b border-neutral-800 bg-neutral-900/80 flex items-center justify-between px-3 md:px-4">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors"></div>
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors"></div>
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors"></div>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-0.5 md:px-3 md:py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[8px] md:text-[10px] tracking-widest font-mono">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-indigo-500 animate-[pulse_1.5s_ease-in-out_infinite]"></div>
                    CV_ENGINE_ACTIVE
                  </div>
                </div>

                {/* Split Content */}
                <div className="flex-1 flex flex-row w-full divide-x divide-neutral-800">
                  {/* Left: Simulated Image Processing */}
                  <div className="flex-1 bg-neutral-900/30 p-2 md:p-4 relative overflow-hidden flex flex-col justify-center gap-2">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:0.5rem_0.5rem] md:bg-[size:1rem_1rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]"></div>
                    {/* Scanning Laser */}
                    <motion.div
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute left-0 right-0 h-[1px] md:h-0.5 bg-indigo-500/70 shadow-[0_0_15px_rgba(99,102,241,0.8)] z-20"
                    ></motion.div>

                    {/* Bounding boxes grid (Simulating OpenCV Grid detector) */}
                    {[1, 2, 3].map((row) => (
                      <div key={row} className="flex gap-1 md:gap-2 w-full">
                        <div className="h-4 md:h-6 w-1/3 border border-indigo-500/30 bg-indigo-500/5 rounded-[2px] relative overflow-hidden group-hover:border-indigo-400/60 group-hover:bg-indigo-500/10 transition-colors duration-500"></div>
                        <div className="h-4 md:h-6 flex-1 flex gap-0.5 md:gap-1">
                          {[1, 2, 3, 4, 5].map((col) => (
                            <div
                              key={col}
                              className="h-full flex-1 border border-indigo-500/30 bg-indigo-500/5 rounded-[2px] group-hover:border-indigo-400/60 group-hover:bg-indigo-500/10 transition-colors duration-500"
                              style={{ transitionDelay: `${col * 50}ms` }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="absolute bottom-2 left-2 text-[8px] md:text-[10px] text-indigo-400/70 font-mono">
                      &gt; grid_sliced: 3x6
                    </div>
                  </div>

                  {/* Right: Extracted Live Data */}
                  <div className="flex-[1.2] md:flex-[1.5] bg-neutral-950 p-2 md:p-4 flex flex-col gap-2 md:gap-3">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-1 md:pb-2">
                      <span className="text-[10px] md:text-xs text-neutral-400 font-mono">
                        JSON Roster
                      </span>
                      <span className="text-[8px] md:text-[10px] text-emerald-500/90 bg-emerald-500/10 px-1.5 md:px-2 py-0.5 rounded border border-emerald-500/20 font-bold tracking-wide">
                        99.8% ACCURACY
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5 md:gap-2 font-mono">
                      {/* Row 1 */}
                      <div className="flex items-center justify-between bg-neutral-900/40 p-1.5 md:p-2 rounded border border-neutral-800">
                        <div className="flex flex-col">
                          <span className="text-[10px] md:text-xs text-neutral-200">
                            Aarav S.
                          </span>
                          <span className="text-[8px] md:text-[10px] text-neutral-500">
                            Roll: 01
                          </span>
                        </div>
                        <div className="flex gap-1 md:gap-1.5">
                          {["P", "P", "A", "P", "P"].map((m, i) => (
                            <div
                              key={i}
                              className={`w-3.5 h-3.5 md:w-5 md:h-5 flex items-center justify-center rounded text-[8px] md:text-[10px] font-bold border ${m === "P" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-rose-500/10 border-rose-500/30 text-rose-400"}`}
                            >
                              {m}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Row 2 */}
                      <div className="flex items-center justify-between bg-neutral-900/40 p-1.5 md:p-2 rounded border border-neutral-800">
                        <div className="flex flex-col">
                          <span className="text-[10px] md:text-xs text-neutral-200">
                            Diya P.
                          </span>
                          <span className="text-[8px] md:text-[10px] text-neutral-500">
                            Roll: 02
                          </span>
                        </div>
                        <div className="flex gap-1 md:gap-1.5">
                          {["P", "A", "P", "P", "P"].map((m, i) => (
                            <div
                              key={i}
                              className={`w-3.5 h-3.5 md:w-5 md:h-5 flex items-center justify-center rounded text-[8px] md:text-[10px] font-bold border ${m === "P" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-rose-500/10 border-rose-500/30 text-rose-400"}`}
                            >
                              {m}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Row 3 (highlighted as low confidence) */}
                      <div className="flex items-center justify-between bg-indigo-500/10 p-1.5 md:p-2 rounded border border-indigo-500/40 relative overflow-hidden shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                        <div className="flex flex-col relative z-10">
                          <span className="text-[10px] md:text-xs text-indigo-100">
                            Vivaan S.
                          </span>
                          <span className="text-[8px] md:text-[10px] text-indigo-300">
                            Roll: 03
                          </span>
                        </div>
                        <div className="flex gap-1 md:gap-1.5 relative z-10">
                          {["P", "P", "P", "X", "P"].map((m, i) => (
                            <div
                              key={i}
                              className={`w-3.5 h-3.5 md:w-5 md:h-5 flex items-center justify-center rounded text-[8px] md:text-[10px] font-bold border ${
                                m === "P"
                                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                                  : "bg-amber-500/20 border-amber-500/50 text-amber-400 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                              }`}
                            >
                              {m}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-neutral-900/30 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Three simple steps to transition your classroom records from
              physical paper to a secure, permanent digital format.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-neutral-800 via-indigo-500/50 to-neutral-800 -translate-y-1/2 z-0"></div>

            {[
              {
                step: "01",
                title: "Snap & Upload",
                desc: "Take a picture of the attendance register using any smartphone and upload it straight to our dashboard.",
                icon: <Smartphone className="w-8 h-8 text-indigo-400" />,
              },
              {
                step: "02",
                title: "AI Extraction",
                desc: "Our FastAPI engine slices the grid, runs OCR on student names, and classifies attendance marks automatically.",
                icon: <ScanLine className="w-8 h-8 text-purple-400" />,
              },
              {
                step: "03",
                title: "Verify & Save",
                desc: "Review the beautiful digitized table. AI low-confidence marks are highlighted for you. Once fixed, save it to the DB.",
                icon: <Database className="w-8 h-8 text-emerald-400" />,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative z-10 bg-neutral-950 border border-neutral-800 rounded-3xl p-8 hover:border-indigo-500/50 transition-colors shadow-2xl flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg relative">
                  <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {item.icon}
                </div>
                <div className="text-indigo-500 font-mono text-sm font-bold tracking-widest mb-3">
                  STEP {item.step}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  {item.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Cards */}
      <section className="py-24 relative z-10 overflow-hidden">
        {/* Decorative Background Elements for Glass effect */}
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">
            Platform Capabilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-neutral-900/40 border border-white/10 backdrop-blur-2xl hover:border-indigo-500/30 transition-all duration-500 group overflow-hidden relative shadow-2xl shadow-black/50 hover:shadow-indigo-500/10">
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-20 bg-gradient-to-br from-indigo-500/5 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <ScanLine className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  Computer Vision
                </h3>
                <p className="text-neutral-400 leading-relaxed flex-grow">
                  Our native Python engine slices dynamic table grid layouts
                  from any standard notebook photo, effortlessly handling
                  complex shadows, curved pages, or bad lighting.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-neutral-900/40 border border-white/10 backdrop-blur-2xl hover:border-purple-500/30 transition-all duration-500 group overflow-hidden relative shadow-2xl shadow-black/50 hover:shadow-purple-500/10 md:translate-y-8">
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-20 bg-gradient-to-br from-purple-500/5 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <ShieldCheck className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  Human Verification
                </h3>
                <p className="text-neutral-400 leading-relaxed flex-grow">
                  Low confidence AI readings are distinctly highlighted in our
                  intuitive dashboard. Teachers maintain total control to verify
                  and overwrite anomalies manually before any data is committed.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-neutral-900/40 border border-white/10 backdrop-blur-2xl hover:border-emerald-500/30 transition-all duration-500 group overflow-hidden relative shadow-2xl shadow-black/50 hover:shadow-emerald-500/10">
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-20 bg-gradient-to-br from-emerald-500/5 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Server className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  Cloud Persistence
                </h3>
                <p className="text-neutral-400 leading-relaxed flex-grow">
                  Once perfectly parsed via the review table, seamlessly
                  synchronize your classroom's exact digital records into
                  reliable, high-speed MongoDB servers for permanent
                  decentralized storage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal CTA Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="py-16 md:py-24 border-y border-neutral-800/50 relative">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
              Ready to digitize your classroom?
            </h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-xl mx-auto leading-relaxed">
              Stop wasting hours manually transferring physical attendance marks
              into spreadsheets every week. Reclaim your focus for teaching.
            </p>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-full transition-all active:scale-95 group"
            >
              Open IntelliRegister
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-black py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-neutral-500 text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center">
              <span className="text-xs font-bold text-white">sc</span>
            </div>
            A product proudly built by{" "}
            <span className="text-white font-medium">snippet.co</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <span>
              &copy; {new Date().getFullYear()} snippet.co. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
