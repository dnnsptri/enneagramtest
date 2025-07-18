# Enneagram Test Application

A modern web application for taking the Enneagram personality test, built with Next.js and Tailwind CSS.

## Features

- Interactive Enneagram personality test with 234 questions
- Real-time progress tracking
- Detailed results with personality type descriptions
- PDF result generation
- Email result sharing
- Responsive design for all devices
- Modern UI with Tailwind CSS

## Local Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd enneagram
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
# For email functionality (optional)
SENDGRID_API_KEY=your_sendgrid_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a Next.js project
6. Add environment variables if needed (SENDGRID_API_KEY)
7. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

### Environment Variables

For email functionality, add these environment variables in your Vercel project settings:

- `SENDGRID_API_KEY` - Your SendGrid API key

## Project Structure

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
└── package.json    # Dependencies and scripts
```

## API Endpoints

- `GET /api/questions` - Get all test questions
- `POST /api/results` - Submit test results
- `POST /api/email` - Send results via email
- `GET /api/types` - Get enneagram type information

## Technologies Used

- **Next.js** - React framework
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form handling
- **@react-pdf/renderer** - PDF generation
- **SendGrid** - Email service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For questions or issues, please open an issue on GitHub.