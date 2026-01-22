<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# PsycheGuide - Student Career Discovery Platform

A full-stack web application that conducts psychometric assessments for students to identify their interests, strengths, personality traits, and suitable career paths.

## Features

- **Psychometric Assessment**: Based on Big Five personality model and RIASEC interest profiling
- **Comprehensive Analysis**: Multi-dimensional profile analysis using established psychometric frameworks
- **Career Recommendations**: Personalized career paths with match percentages and suggested educational paths
- **Detailed Reports**: Personality traits, strengths, interest profiles, and actionable guidance

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express
- **Styling**: Tailwind CSS
- **Charts**: Recharts

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file (or `.env.local`) and set your Replit backend URL:
   ```
   VITE_API_BASE_URL=https://your-replit-backend-url.replit.app
   ```
   If you don't set this, it will default to: `https://nodejs-1--hrutiknaik30.replit.app`

3. Run the app:
   ```bash
   npm run dev
   ```

## Backend Setup

The backend uses psychometric analysis algorithms based on:
- **Big Five Personality Model** (OCEAN)
- **RIASEC Interest Profiling** (Holland Codes)

See `backend-reference/index.js` for the complete backend implementation.
