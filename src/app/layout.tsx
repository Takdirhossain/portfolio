import type { Metadata } from 'next';
import '../styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ThemeProvider from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';

// We'll use system fonts instead of loading Inter to avoid font loading issues

export const metadata: Metadata = {
  title: {
    default: 'Takdir Hossain - Software Engineer',
    template: '%s | Takdir Hossain'
  },
  description: 'Portfolio of Takdir Hossain - Software Engineer. Explore my projects, skills, and professional journey.',
  keywords: ['Takdir Hossain', 'Software Engineer', 'Portfolio', 'Web Development', 'React', 'Next.js', 'laravel', 'express' ],
  authors: [{ name: 'Takdir Hossain' }],
  creator: 'Takdir Hossain',
  publisher: 'Takdir Hossain',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://takdirhossain.vercel.app',
    title: 'Takdir Hossain - Software Engineer',
    description: 'Portfolio of Takdir Hossain - Software Engineer. Explore my projects, skills, and professional journey.',
    siteName: 'Takdir Hossain Portfolio',
    images: [
      {
        url: 'https://takdirhossain.vercel.app/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Takdir Hossain - Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Takdir Hossain - Software Engineer',
    description: 'Portfolio of Takdir Hossain - Software Engineer',
    images: ['https://takdirhossain.vercel.app/assets/og-image.png'],
    creator: '@takdirhossain',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '23rTVx59TeV6aFkYZao7ID1meJkZSNClnrUAw6X5Hc8',
  },
  alternates: {
    canonical: 'https://arnnikislam.vercel.app',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="font-sans bg-white dark:bg-[#0a0a23] text-gray-900 dark:text-white">
        <ThemeProvider>
          <Navbar />
          <div className="pt-16">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
