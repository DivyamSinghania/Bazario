'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, HeartIcon, Menu, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/lib/contexts/auth-context';
import { useCart } from '@/lib/contexts/cart-context';
import { useWishlist } from '@/lib/contexts/wishlist-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { GoogleTranslate } from '@/components/google-translate';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { user, userProfile, signOut } = useAuth();
  const { getTotalItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/discovery?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Discover', href: '/discovery' },
    { name: 'Map', href: '/map' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Checklist', href: '/checklist' },
    { name: 'Community', href: '/community' },
    { name: 'Price Comparison', href: '/price-comparison' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VendorHub
            </span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for raw materials or sellers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            <GoogleTranslate />
            <ThemeToggle />
            
            {/* {user ? ( */}
              <>
                {/* Cart */}
                <Link href="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-4 w-4" />
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                        {getTotalItems()}
                      </span>
                    )}
                  </Button>
                </Link>

                {/* Wishlist */}
                <Link href="/wishlist">
                  <Button variant="ghost" size="icon" className="relative">
                    <HeartIcon className="h-4 w-4" />
                    {wishlistItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                        {wishlistItems.length}
                      </span>
                    )}
                  </Button>
                </Link>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5 text-sm">
                      <div className="font-medium">{userProfile?.name}</div>
                      <div className="text-muted-foreground">{userProfile?.phone}</div>
                    </div>
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
             {/* ) : (
               <Link href="/auth">
                 <Button>Sign In</Button>
               </Link>
             )} */}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-4">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="flex items-center">
                    <div className="relative w-full">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4"
                      />
                    </div>
                  </form>

                  {/* Mobile Navigation */}
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-sm font-medium transition-colors hover:text-primary py-2"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}