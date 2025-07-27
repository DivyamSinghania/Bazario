'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Store, Search, BookOpen, Menu, X, User, LogOut } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebaseClient';
import { logOut } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {useRouter} from 'next/navigation';
import { Input } from '@/components/ui/input';
import UserSchema from '@/models/User';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AuthModal from '@/components/auth/AuthModal';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import  GoogleTranslate  from '@/components/google-translate';

const Navigation: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [user] = useAuthState(auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Discover', href: '/discovery' },
    { name: 'Map', href: '/map' },
    // { name: 'Reviews', href: '/reviews' },
    { name: 'Checklist', href: '/checklist' },
    // { name: 'Community', href: '/community' },
    { name: 'Price Comparison', href: '/price-comparison' },
  ];
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/discovery?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const logoSrc='/logos/logo4.png';

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* <nav className="fixed top-0 left-0 right-0 z-50 p-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            

            <Link href="/" className='flex  dark:bg-opacity-5  dark:brightness-150 dark:contrast-175"'>
              <Image
                src={logoSrc}
                alt="School of Immersive Technologies Logo" 
                width={150}
                height={100}
                priority
                className="relative transition-all duration-200 group-hover:scale-105 border-1 rounded-full opacity-80 w-28 h-10 sm:w-48 sm:h-auto"
              />
            </Link>
            

  
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                item.href.startsWith('#') ? (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle /> */}
              
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bazario 
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
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="hidden sm:block">{user.displayName || user.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {user?.role === 'wholesaler' && (
                      <DropdownMenuItem onClick={() => router.push('/shop-details')}>
                        <Store className="mr-2 h-4 w-4" />
                        Shop
                      </DropdownMenuItem>
                    )}
                    {/* <DropdownMenuItem asChild>
                      <Link href="/courses">My Courses</Link>
                    </DropdownMenuItem> */}
                    {/* <DropdownMenuItem asChild>
                      <Link href="/certificates">Certificates</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/competitions">Competitions</Link>
                    </DropdownMenuItem> */}
                    <DropdownMenuItem asChild>
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => setShowAuthModal(true)}>
                  Login
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          
        </div>
      </nav>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default Navigation;