# ⚡ EV Savings Calculator

A modern, interactive web application built with Next.js to help people calculate the return on investment when purchasing an electric vehicle compared to a traditional gas vehicle.

## Features

- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Comprehensive Analysis**: Factors in purchase price, incentives, fuel costs, and maintenance
- **Real-time Results**: Instant calculations as you input data
- **Visual Breakdown**: Year-by-year cost comparison charts
- **Mobile Responsive**: Fully optimized for all screen sizes
- **Built with Next.js**: Fast, SEO-friendly, and production-ready

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide React](https://lucide.dev/) - Icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deploy to Vercel

The easiest way to deploy this application is using Vercel:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Import the project to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your repository
   - Click "Deploy"

That's it! Vercel will automatically detect Next.js and configure everything.

### Deploy via Vercel CLI

Alternatively, deploy using the Vercel CLI:

```bash
npm install -g vercel
vercel
```

Follow the prompts to deploy your application.

## What It Calculates

The calculator provides a comprehensive comparison between electric and gas vehicles:

- **Initial Cost Difference**: Accounts for purchase price and government incentives
- **Fuel Savings**: Compares electricity costs vs. gasoline costs
- **Maintenance Savings**: EVs typically have lower maintenance costs
- **Recovery Time**: Shows when you'll break even on your investment
- **Long-term Projections**: Visualizes cumulative costs over time

## Customization

Default values are set to US averages but can be easily adjusted:
- Edit input values in the form
- Modify default values in `components/EVCalculator.tsx`

## License

Free to use and modify for personal or commercial projects.
