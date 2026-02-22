# Intelligent Attendance Register Digitization

A modern, production-ready web application designed to digitize physical attendance registers using Computer Vision, AI, and a premium Next.js interface.

## 🚀 Project Overview

The system automates the tedious task of manually logging attendance records. Teachers take a snapshot of a physical attendance paper register, upload it to the platform, and the intelligent backend engine (using OpenCV grid detection and OCR/ML models) automatically extracts student names, roll numbers, and daily attendance marks (Present/Absent). The data is presented in an interactive UI where teachers can verify, correct, and confidently save it to a database.

### Core Features

- **Smart Image Processing Pipeline:** Automatically handles grid slicing from images.
- **Deep Learning Mark Classification:** Classifies ticks, crosses, P's, and A's with intelligent confidence scoring.
- **Premium User Dashboard:** A stunning, interactive interface built with Framer Motion, Tailwind CSS, and Next.js 15.
- **Low-Confidence UI Handling:** The interface specifically flags and pulses items that the AI is unsure about, requiring human verification and preventing bad data from entering the database.

## 🏗️ Technical Architecture

This repository adopts a decoupled architecture to accommodate both heavy Python-based machine learning inference and high-performance serverless React web apps.

### 1. `frontend-app/` (Web Platform)

- **Framework:** Next.js (React 19)
- **Styling:** Tailwind CSS + Framer Motion (Micro-animations)
- **Database:** MongoDB (using Mongoose)
- **State:** Full React state management for optimistic UI updates and interactive table editing.

### 2. `Backend/` (AI Engine)

- **Framework:** FastAPI (Python)
- **Computer Vision Engine:** OpenCV (Dynamic grid detection, slicing)
- **OCR Engine:** EasyOCR / Text extraction
- **Machine Learning Engine:** Custom trained classifier for diverse attendance marks.

## 💻 Getting Started (Local Development)

### Running the Frontend

```bash
cd frontend-app
npm install
npm run dev
```

The modern dashboard will be available at `http://localhost:3000`.

### Running the AI Backend

```bash
cd Backend
pip install -r requirements.txt
uvicorn api:app --reload
```

The FastAPI engine will be available at `http://localhost:8000`.

## 🔒 Environment Variables

To fully run the application, you'll need the following environment variables.

In `frontend-app/.env.local`:

```
MONGODB_URI=your_mongodb_connection_string
```

_(Currently, DB integration is mocked in development but ready to be hooked up when the URI is provided via `lib/mongodb.ts`)_

## 📄 Documentation & Roadmap

See the `Intelligent_Attendance_Project_Plan.md` file for details on hosting strategies (Vercel vs VPS deployments) and the project's development roadmap.
