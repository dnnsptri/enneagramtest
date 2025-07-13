#!/bin/bash

# Create a clean deployment directory
mkdir -p optimized_deployment

# Copy the Next.js deployment files
cp -r nextjs-deployment/* optimized_deployment/

# Copy the optimized package.json
cp cleanup_temp/optimized-package.json optimized_deployment/package.json

# Create necessary directories
mkdir -p optimized_deployment/public
mkdir -p optimized_deployment/styles

# Make sure the data directory exists
mkdir -p optimized_deployment/data

# Copy email storage file if it exists
if [ -f emails.txt ]; then
  cp emails.txt optimized_deployment/
fi

# Create a README.md with instructions
cat > optimized_deployment/README.md << 'EOF'
# Enneagram Test Application

This is a Next.js application for an Enneagram personality test that provides in-depth personality type analysis through an intuitive, user-friendly interface.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

Build the application for production:

```bash
npm run build
# or
yarn build
```

Then start the production server:

```bash
npm start
# or
yarn start
```

This application is optimized for deployment on platforms like Vercel, Netlify, or any other service that supports Next.js.
EOF

echo "Prepared optimized deployment in the 'optimized_deployment' directory"
echo "Size before optimization: $(du -sh .)"
echo "Size of optimized deployment: $(du -sh optimized_deployment)"