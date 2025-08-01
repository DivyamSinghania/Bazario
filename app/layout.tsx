import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/lib/contexts/auth-context';
import { CartProvider } from '@/lib/contexts/cart-context';
import { WishlistProvider } from '@/lib/contexts/wishlist-context';
import Navigation from '@/components/layout/header';
import { Toaster } from '@/components/ui/sonner';
import '@/styles/google-translate.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bazario - Community Place for Vendors',
  description: 'Find trusted suppliers, share experiences, and connect with fellow vendors in your community.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <div className="min-h-screen bg-background">
                  <Navigation />
                  <main>{children}</main>
                  <div id="recaptcha-container"></div>
                  <Toaster />
                </div>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}