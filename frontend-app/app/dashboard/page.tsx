"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  CheckCircle,
  FileText,
  Settings,
  Loader2,
  Database,
  X,
  User,
  Home,
  ScanLine,
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
  {
    rollNo: "05",
    name: "Reyansh Kumar",
    attendance: ["P", "P", "P", "P", "P"],
    confidence: [0.99, 0.99, 0.99, 0.99, 0.99],
  },
  {
    rollNo: "06",
    name: "Sai Krishna",
    attendance: ["P", "X", "P", "P", "P"],
    confidence: [0.99, 0.3, 0.99, 0.99, 0.99],
  },
  {
    rollNo: "07",
    name: "Mira Kapoor",
    attendance: ["A", "A", "P", "P", "P"],
    confidence: [0.9, 0.95, 0.99, 0.99, 0.99],
  },
];

export default function AttendanceDashboard() {
  // Shared Application State
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveComplete, setSaveComplete] = useState(false);
  const [results, setResults] = useState<AttendanceRow[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
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
    setIsSuccess(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const processImage = () => {
    if (!file) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setResults(mockApiResponse);
    }, 2000);
  };

  const handleSaveToDatabase = () => {
    if (!results) return;
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveComplete(true);
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
    updated[rowIndex].confidence[colIndex] = 1.0;
    setResults(updated);
  };

  // --- COMPONENT RENDERERS ---

  const renderUploadActionPanel = () => (
    <div className="bg-neutral-900/40 border border-white/10 backdrop-blur-3xl rounded-2xl p-5 flex flex-col h-full shadow-2xl relative overflow-hidden">
      <div className="flex-1 flex flex-col relative z-10">
        {/* Upload Dropzone */}
        <div
          className={cn(
            "relative border-2 border-dashed transition-colors duration-300 ease-out flex items-center justify-center overflow-hidden flex-1 p-3 rounded-xl mb-4 min-h-[120px]",
            file
              ? "border-white/30 bg-white/5"
              : "border-white/20 hover:border-white/40 bg-black/10 hover:bg-black/20 cursor-pointer",
          )}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => !file && fileInputRef.current?.click()}
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
                className="flex flex-col gap-2 items-center text-center relative z-10 w-full justify-center"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                  <UploadCloud className="w-5 h-5 text-white/80" />
                </div>
                <div>
                  <h3 className="font-medium text-white text-sm mb-0.5">
                    Choose Register Image
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    Drag & drop or click to browse
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="file-preview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full relative flex flex-col rounded-xl overflow-hidden h-full shadow-md border border-white/10"
              >
                <button
                  title="Remove file"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="absolute z-20 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-md transition-colors right-3 top-3 border border-white/10"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl!}
                  alt="Preview"
                  className="w-full h-full absolute inset-0 object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col pt-12">
                  <p className="text-sm font-medium text-white truncate z-10">
                    {file.name}
                  </p>
                  <p className="text-xs text-neutral-300 z-10 mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-4">
          <button
            onClick={processImage}
            disabled={!file || isProcessing || isSuccess}
            className={cn(
              "w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors duration-200 text-sm shadow-sm border",
              !file
                ? "bg-black/20 border-white/5 text-neutral-500 cursor-not-allowed"
                : isSuccess
                  ? "bg-white/10 border-white/10 text-white"
                  : "bg-white/20 hover:bg-white/30 border-white/20 text-white",
            )}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Analyzing Image...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="w-4 h-4" /> Extraction Complete
              </>
            ) : (
              <>
                <Settings className="w-4 h-4" /> Start Processing
              </>
            )}
          </button>

          <AnimatePresence>
            {isProcessing && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-black/20 border border-white/10 rounded-2xl p-4 overflow-hidden"
              >
                <div className="space-y-2 font-mono text-xs">
                  <div className="text-neutral-300">
                    &gt; Reading contours...
                  </div>
                  <div
                    className="text-neutral-300"
                    style={{ animationDelay: "400ms" }}
                  >
                    &gt; Classifying marks...
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  const renderDataTable = () => (
    <div className="w-full h-full flex flex-col bg-neutral-900/50 backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 z-10">
        <div>
          <h3 className="font-medium text-base text-white">
            Classroom Records
          </h3>
        </div>
        {results && (
          <button
            onClick={handleSaveToDatabase}
            disabled={isSaving || saveComplete}
            className={cn(
              "px-5 py-2 text-sm font-medium rounded-xl transition-colors flex items-center gap-2 border",
              saveComplete
                ? "bg-white/10 border-white/10 text-white cursor-default"
                : isSaving
                  ? "bg-black/20 border-white/5 text-neutral-500 cursor-not-allowed"
                  : "bg-white text-black hover:bg-neutral-200 border-white",
            )}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving...
              </>
            ) : saveComplete ? (
              <>
                <CheckCircle className="w-4 h-4" /> Saved Successfully
              </>
            ) : (
              <>
                <Database className="w-4 h-4" /> Commit to Database
              </>
            )}
          </button>
        )}
      </div>

      <div className="flex-1 overflow-auto relative p-5">
        {!results ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400 gap-3">
            <div className="w-12 h-12 rounded-xl bg-black/20 flex items-center justify-center border border-white/5">
              <ScanLine className="w-6 h-6 text-white/30" />
            </div>
            <p className="text-sm">Extracted data will be displayed here.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full relative"
          >
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr>
                  <th className="pb-3 px-4 font-medium text-xs text-neutral-400 border-b border-white/10 uppercase tracking-wider">
                    Roll
                  </th>
                  <th className="pb-3 px-4 font-medium text-xs text-neutral-400 border-b border-white/10 uppercase tracking-wider w-1/3">
                    Student Details
                  </th>
                  <th
                    colSpan={5}
                    className="pb-3 px-4 font-medium text-xs text-neutral-400 border-b border-white/10 text-center uppercase tracking-wider"
                  >
                    Recorded Attendance Marks
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((row) => (
                  <tr
                    key={row.rollNo}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="py-3 px-4 border-b border-white/5 font-mono text-neutral-300 text-sm">
                      {row.rollNo}
                    </td>
                    <td className="py-3 px-4 border-b border-white/5 text-neutral-100 text-sm">
                      {row.name}
                    </td>

                    {row.attendance.map((mark, cIndex) => {
                      const conf = row.confidence[cIndex];
                      const isLowConfidence = conf < 0.6;

                      return (
                        <td
                          key={cIndex}
                          className="py-3 px-2 border-b border-white/5 text-center"
                        >
                          <div className="relative mx-auto w-8 h-8">
                            <input
                              type="text"
                              value={mark}
                              onChange={(e) =>
                                handleCellEdit(
                                  results.indexOf(row),
                                  cIndex,
                                  e.target.value,
                                )
                              }
                              className={cn(
                                "w-full h-full text-center rounded-md font-bold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white uppercase",
                                "bg-white/5 border border-white/10 text-white focus:bg-white/10 hover:bg-white/10",
                                isLowConfidence
                                  ? "border-red-400/50 bg-red-400/10 text-red-200"
                                  : "text-white",
                              )}
                              maxLength={1}
                            />
                            {isLowConfidence && (
                              <div className="absolute -top-2 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-neutral-100 font-sans selection:bg-white/30 relative flex flex-col bg-neutral-900 overflow-x-hidden">
      {/* Background Colorful Image Wrapper */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url('/app_bg_premium_dark.png')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xl"></div>
      </div>

      {/* Navbar Minimalist */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-3xl sticky top-0 z-50">
        <div className="px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-semibold text-lg tracking-tight text-white">
              IntelliRegister
            </span>
            <div className="h-4 w-px bg-white/20 hidden sm:block"></div>
            <Link
              href="/"
              className="px-2 py-1 text-sm flex items-center gap-2 text-neutral-300 hover:text-white rounded-md hover:bg-white/10 transition-colors"
            >
              <Home className="w-4 h-4" /> Home
            </Link>
          </div>

          <div className="flex items-center gap-4 text-neutral-300">
            {/* Profile / Sign In Area */}
            <div className="flex items-center gap-3 px-1.5 py-1.5 rounded-full border border-white/20 bg-black/20 hover:bg-black/40 transition-colors cursor-pointer text-sm backdrop-blur-md">
              <span className="text-white font-medium pl-3 hidden sm:block">
                Sign In
              </span>
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Workspace Area (IDE Split) */}
      <main className="flex-1 w-full mx-auto p-4 md:p-8 lg:p-12 xl:p-16 relative z-10 flex flex-col max-w-[1600px] overflow-hidden">
        <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-6 h-full min-h-[60vh]">
          {/* Sidebar (Fixed Width) */}
          <div className="w-full lg:w-[280px] flex-shrink-0 flex flex-col gap-4">
            {renderUploadActionPanel()}
          </div>

          {/* Main Table Area (Expands) */}
          <div className="flex-1 min-w-0">{renderDataTable()}</div>
        </div>
      </main>
    </div>
  );
}
