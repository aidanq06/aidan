# Aidan Quach Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Modern Design**: Clean, minimalistic UI with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Interactive**: Terminal-style contact form and project showcases
- **Performance**: Optimized for speed and SEO
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Custom components with Radix UI primitives

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## Project Structure

```
├── app/                 # Next.js App Router
├── Components/          # React components
├── components/ui/       # Reusable UI components
├── lib/                 # Utility functions
└── Pages/              # Page components
```

## Customization

- Update personal information in `Pages/portfolio.tsx`
- Modify the color scheme in `tailwind.config.js`
- Add new projects in the projects array
- Update skills in `Components/SkillsGrid.tsx`

## License

MIT License - feel free to use this template for your own portfolio!
