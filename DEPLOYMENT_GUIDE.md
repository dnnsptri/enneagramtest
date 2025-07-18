# Enneagram Test - Deployment Guide

This guide will help you deploy the Enneagram Test application both locally and to Vercel.

## 🚀 Quick Start

### Option 1: Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy via Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy"

3. **Set Environment Variables** (Optional)
   - In your Vercel project settings
   - Add `SENDGRID_API_KEY` for email functionality

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   ./deploy.sh
   ```

### Option 3: Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   - Go to [http://localhost:3000](http://localhost:3000)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Git account
- Vercel account (for deployment)

## 🔧 Environment Setup

### Local Development

Create a `.env.local` file in the root directory:

```env
# Optional: For email functionality
SENDGRID_API_KEY=your_sendgrid_api_key_here
```

### Vercel Deployment

Add these environment variables in your Vercel project settings:

- `SENDGRID_API_KEY` - Your SendGrid API key (optional)

## 🏗️ Build Process

The application uses Next.js with the following build process:

1. **Development**: `npm run dev`
2. **Build**: `npm run build`
3. **Production**: `npm run start`

## 📁 Project Structure

```
├── pages/           # Next.js pages
│   ├── api/        # API routes
│   ├── _app.js     # App wrapper
│   ├── index.js    # Home page
│   ├── test.js     # Test page
│   └── results.js  # Results page
├── data/           # Application data
│   └── questions.js # Test questions and types
├── styles/         # CSS styles
│   └── globals.css # Global styles
├── public/         # Static assets
├── next.config.js  # Next.js configuration
├── tailwind.config.js # Tailwind CSS configuration
├── package.json    # Dependencies and scripts
└── vercel.json     # Vercel configuration
```

## 🔍 Troubleshooting

### Common Issues

1. **Build fails with module not found**
   ```bash
   npm install
   npm run build
   ```

2. **Port already in use**
   ```bash
   # Kill process on port 3000
   lsof -ti:3000 | xargs kill -9
   ```

3. **Environment variables not working**
   - Check `.env.local` file exists
   - Restart development server
   - Verify variable names match exactly

### Vercel Deployment Issues

1. **Build fails on Vercel**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

2. **Environment variables not available**
   - Add them in Vercel project settings
   - Redeploy after adding variables

## 🎯 Performance Optimization

The application is optimized for:

- **Fast loading**: Static generation where possible
- **SEO friendly**: Server-side rendering for dynamic content
- **Mobile responsive**: Tailwind CSS responsive design
- **Accessibility**: ARIA labels and semantic HTML

## 🔒 Security Considerations

- API routes are protected with proper error handling
- Environment variables are used for sensitive data
- Input validation on all forms
- Rate limiting on API endpoints

## 📊 Monitoring

After deployment, monitor:

- **Performance**: Use Vercel Analytics
- **Errors**: Check Vercel Function logs
- **Usage**: Monitor API endpoint usage

## 🆘 Support

If you encounter issues:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review [Vercel documentation](https://vercel.com/docs)
3. Open an issue on GitHub

## 🎉 Success!

Once deployed, your application will be available at:
- **Vercel**: `https://your-project-name.vercel.app`
- **Local**: `http://localhost:3000`

The application includes:
- ✅ Interactive Enneagram test
- ✅ Real-time progress tracking
- ✅ Detailed results with PDF download
- ✅ Email sharing functionality
- ✅ Responsive design
- ✅ Modern UI/UX 