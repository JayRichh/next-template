import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { GradientBackground } from "@/components/ui/GradientBackground";

// Load Geist fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Next.js Template",
  description: "Minimal Next.js template with TypeScript, Tailwind, and Framer Motion",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/examples", label: "Examples" },
  { href: "/three", label: "3D Demo" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="bg-background text-foreground font-sans antialiased min-h-full flex flex-col">
        {/* Background gradient */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <GradientBackground variant="default" />
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md border-b border-border/50" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Left side - Navigation links */}
              <div className="flex items-center space-x-8">
                {navLinks.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    className="text-base font-medium text-foreground hover:text-primary transition-colors duration-200"
                  >
                    {label}
                  </a>
                ))}
              </div>

              {/* Right side - Additional actions */}
              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com/jayrichh/next-template"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium text-foreground hover:text-primary transition-colors duration-200"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <div className="pt-16 flex-1 flex flex-col relative z-10">{children}</div>

        {/* Footer */}
        <footer className="relative z-10 bg-background/80 backdrop-blur-sm border-t border-border/50">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left column */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Next.js Template</h3>
                <p className="text-sm text-foreground-secondary">
                  A minimal, type-safe template for building modern web applications.
                </p>
              </div>

              {/* Middle column */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Features</h3>
                <ul className="space-y-2 text-sm text-foreground-secondary">
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>Framer Motion</li>
                  <li>Three.js</li>
                </ul>
              </div>

              {/* Right column */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://nextjs.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground-secondary hover:text-primary transition-colors duration-200"
                    >
                      Next.js Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://threejs.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground-secondary hover:text-primary transition-colors duration-200"
                    >
                      Three.js
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border/50">
              <p className="text-center text-sm text-foreground-secondary">
                © {new Date().getFullYear()} Next.js Template. Built with Next.js, TypeScript, and
                Three.js.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
