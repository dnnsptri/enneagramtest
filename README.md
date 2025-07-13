# Enneagram Test Application

A comprehensive Dutch Enneagram personality test application that provides in-depth personality type analysis through an intuitive, user-friendly interface.

## Project Description

This project is a clone of the Enneagram personality test from eclecticenergies.com, implemented as a modern web application. The test includes 234 questions (26 per type) and follows the original scoring method, showing both primary type and tri-type results.

## Project Structure

This repository contains two versions of the application:

1. **Main Application (React + Express)**: Located in the root directory, this version uses React for the frontend and Express for the backend. It's optimized for development and testing within Replit.

2. **Optimized Next.js Deployment**: Located in the `optimized_deployment` directory, this version is a Next.js implementation ready for deployment to production environments. This version is much smaller in size and only includes the necessary dependencies.

## Features

- Complete Enneagram test with 234 questions in Dutch
- Calculation of primary type and tri-type (primary, secondary, tertiary)
- Detailed descriptions for each Enneagram type
- Email capture before downloading results (emails stored in emails.txt)
- Responsive design for all device sizes
- PDF generation for test results

## Deployment Instructions

For deploying the application:

1. Use the files in the `optimized_deployment` directory for a small and efficient Next.js deployment
2. Follow the instructions in `optimized_deployment/README.md`

The optimized version is significantly smaller:
- Original project size: ~434MB
- Optimized deployment: ~128KB

## Technology Stack

- TypeScript for type-safe development
- React for interactive frontend
- Express for backend API
- Next.js for the optimized deployment
- Tailwind CSS for styling
- PDF generation with react-pdf/renderer
- PostgreSQL database support (optional)

## Getting Started

To run the development version:

```bash
npm run dev
```

To use the optimized Next.js version:

```bash
cd optimized_deployment
npm install
npm run dev
```