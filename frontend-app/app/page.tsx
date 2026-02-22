"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  CheckCircle,
  FileText,
  Settings,
  HelpCircle,
  Loader2,
  Save,
  X,
  Eye,
} from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// Mock Data Structure
interface AttendanceRow {
  rollNo: string;
  name: string;
  attendance: string[];
  confidence: number[];
}

const mockApiResponse: AttendanceRow[] = [
  {
    rollNo: "01",
    name: "Aarav Sharma",
    attendance: ["P", "P", "A", "P", "P"],
    confidence: [0.99, 0.95, 0.45, 0.99, 0.98],
  },
  {
    rollNo: "02",
    name: "Diya Patel",
    attendance: ["P", "A", "P", "P", "P"],
    confidence: [0.98, 0.99, 0.99, 0.98, 0.99],
  },
  {
    rollNo: "03",
    name: "Vivaan Singh",
    attendance: ["P", "P", "P", "P", "A"],
    confidence: [0.99, 0.99, 0.98, 0.99, 0.99],
  },
  {
    rollNo: "04",
    name: "Ananya Gupta",
    attendance: ["A", "P", "P", "P", "P"],
    confidence: [0.55, 0.99, 0.99, 0.99, 0.99],
  },
];

export default function AttendanceDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveComplete, setSaveComplete] = useState(false);
  const [results, setResults] = useState<AttendanceRow[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      // Reset state on new file
      setIsSuccess(false);
      setResults(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
      setPreviewUrl(URL.createObjectURL(droppedFile));
      setIsSuccess(false);
      setResults(null);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setResults(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const processImage = () => {
    if (!file) return;

    setIsProcessing(true);
    // Simulate API call to the Python Backend
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setResults(mockApiResponse);
    }, 2500);
  };

  const handleSaveToDatabase = () => {
    if (!results) return;
    setIsSaving(true);
    // Simulate DB operation
    setTimeout(() => {
      setIsSaving(false);
      setSaveComplete(true);

      // Reset after a while
      setTimeout(() => setSaveComplete(false), 3000);
    }, 1500);
  };

  const handleCellEdit = (
    rowIndex: number,
    colIndex: number,
    newValue: string,
  ) => {
    if (!results) return;
    const updated = [...results];
    updated[rowIndex].attendance[colIndex] = newValue.toUpperCase().slice(0, 1);
    updated[rowIndex].confidence[colIndex] = 1.0; // Manual edit means 100% confidence
    setResults(updated);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-indigo-500/30">
      {/* Navbar Minimalist */}
      <nav className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-xl tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
              IntelliRegister
            </span>
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <button className="hover:text-white transition-colors duration-200">
              <Settings className="w-5 h-5" />
            </button>
            <button className="hover:text-white transition-colors duration-200">
              <HelpCircle className="w-5 h-5" />
            </button>
            <Link
              href="/login"
              className="px-4 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-lg shadow-indigo-500/20 ml-2"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center space-y-3"
        >
          <h1 className="text-4xl font-bold tracking-tight">
            Digitize Your Attendance Register
          </h1>
          <p className="text-neutral-400 max-w-xl mx-auto text-lg leading-relaxed">
            Upload a snapshot of your physical register. Our Computer Vision
            engine will automatically extract names, roll numbers, and marks
            with high accuracy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Upload & Control Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div
              className={cn(
                "relative group flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed transition-all duration-300 ease-out overflow-hidden bg-neutral-900/40",
                file
                  ? "border-indigo-500 bg-indigo-500/5"
                  : "border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800/40",
              )}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <AnimatePresence mode="wait">
                {!file ? (
                  <motion.div
                    key="upload-prompt"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-4 text-center cursor-pointer relative z-10"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-neutral-700">
                      <UploadCloud className="w-8 h-8 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        Upload Register Image
                      </h3>
                      <p className="text-sm text-neutral-400 mt-1">
                        Drag and drop or click to browse
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="file-preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full relative rounded-xl overflow-hidden shadow-2xl"
                  >
                    <button
                      title="Remove file"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile();
                      }}
                      className="absolute top-3 right-3 z-10 p-1.5 bg-black/60 hover:bg-red-500/80 rounded-full text-white backdrop-blur-md transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewUrl!}
                      alt="Preview"
                      className="w-full h-auto object-cover max-h-[300px] hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none flex flex-col justify-end p-4">
                      <p className="text-sm font-medium text-white truncate flex items-center gap-2">
                        <FileText className="w-4 h-4 text-indigo-300" />{" "}
                        {file.name}
                      </p>
                      <p className="text-xs text-neutral-300 mt-0.5">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-400" /> Action Panel
              </h3>

              <button
                onClick={processImage}
                disabled={!file || isProcessing || isSuccess}
                className={cn(
                  "w-full py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-all duration-300",
                  !file
                    ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                    : isSuccess
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                      : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 active:scale-[0.98]",
                )}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Processing AI
                    Pipeline...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle className="w-5 h-5" /> Analysed Successfully
                  </>
                ) : (
                  "Process with Engine"
                )}
              </button>

              {/* Process Details (Mock Details) */}
              <AnimatePresence>
                {isProcessing && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-6 flex flex-col gap-3 overflow-hidden"
                  >
                    <div className="bg-neutral-950 rounded-lg p-3 text-sm font-mono text-indigo-300/80 relative">
                      <span className="animate-pulse">
                        [*] Extracting OpenCV grids...
                      </span>
                    </div>
                    <div className="bg-neutral-950 rounded-lg p-3 text-sm font-mono text-purple-300/80 relative">
                      <span
                        className="animate-pulse"
                        style={{ animationDelay: "500ms" }}
                      >
                        [*] Running Deep Learning OCR...
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Column: Interactive Results Table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7"
          >
            <div className="h-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
              <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/80 backdrop-blur top-0 z-10">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-400" /> Digitized
                  Record
                </h3>
                {results && (
                  <button
                    onClick={handleSaveToDatabase}
                    disabled={isSaving || saveComplete}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 active:scale-95",
                      saveComplete
                        ? "bg-emerald-500/20 text-emerald-400 cursor-default"
                        : isSaving
                          ? "bg-neutral-800 text-neutral-400 cursor-not-allowed"
                          : "bg-white text-black hover:bg-neutral-200",
                    )}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                      </>
                    ) : saveComplete ? (
                      <>
                        <CheckCircle className="w-4 h-4" /> Saved
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" /> Save to Database
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="flex-1 p-5 overflow-auto relative min-h-[400px]">
                {!results ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500 gap-3">
                    <CheckCircle className="w-12 h-12 text-neutral-700/50" />
                    <p>Upload and process an image to see the output here.</p>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full relative"
                  >
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr>
                          <th className="pb-3 px-3 font-medium text-neutral-400 border-b border-neutral-800">
                            Roll No.
                          </th>
                          <th className="pb-3 px-3 font-medium text-neutral-400 border-b border-neutral-800">
                            Student Name
                          </th>
                          <th
                            colSpan={5}
                            className="pb-3 px-3 font-medium text-neutral-400 border-b border-neutral-800 text-center"
                          >
                            Recent Attendance (Last 5 days)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((row, rIndex) => (
                          <motion.tr
                            key={row.rollNo}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: rIndex * 0.1 }}
                            className="hover:bg-neutral-800/50 transition-colors group"
                          >
                            <td className="py-4 px-3 border-b border-neutral-800/50 font-mono text-neutral-300">
                              {row.rollNo}
                            </td>
                            <td className="py-4 px-3 border-b border-neutral-800/50 font-medium">
                              {row.name}
                            </td>

                            {row.attendance.map((mark, cIndex) => {
                              const conf = row.confidence[cIndex];
                              // AI Confidence UI highlighting
                              const isLowConfidence = conf < 0.6;

                              return (
                                <td
                                  key={cIndex}
                                  className="py-4 px-1 border-b border-neutral-800/50 text-center"
                                >
                                  <div className="relative group/cell mx-auto w-10 h-10">
                                    <input
                                      type="text"
                                      value={mark}
                                      onChange={(e) =>
                                        handleCellEdit(
                                          rIndex,
                                          cIndex,
                                          e.target.value,
                                        )
                                      }
                                      className={cn(
                                        "w-full h-full text-center rounded-lg font-bold text-base transition-all bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-neutral-800 uppercase caret-indigo-500",
                                        mark === "P"
                                          ? "text-emerald-400"
                                          : mark === "A"
                                            ? "text-red-400"
                                            : "text-amber-400",
                                        isLowConfidence
                                          ? "bg-rose-500/20 border border-rose-500/50 animate-pulse"
                                          : "border border-transparent hover:bg-neutral-800",
                                      )}
                                      maxLength={1}
                                    />
                                    {/* Tooltip for Low Confidence */}
                                    {isLowConfidence && (
                                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none opacity-0 group-hover/cell:opacity-100 transition-opacity z-20 whitespace-nowrap">
                                        Review Needed
                                      </div>
                                    )}
                                  </div>
                                </td>
                              );
                            })}
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
