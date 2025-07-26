'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t text-sm text-gray-600 dark:bg-gray-900 dark:text-gray-400">
      <div className="container mx-auto px-4 py-10">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-left">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-3">
              <div className="h-8 w-8 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                B
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Bazario</span>
            </div>
            <p>
              India's premier B2B marketplace connecting local vendors with trusted wholesalers. Building the future of business commerce.
            </p>
            <div className="mt-4 space-y-1">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@tradelinkpro.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 1800-123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Platform</h4>
            <ul className="space-y-1">
              <li><Link href="#">How it Works</Link></li>
              <li><Link href="#">API Documentation</Link></li>
            </ul>
          </div>

          {/* For Vendors */}
          <div>
            {/* <h4 className="font-medium text-gray-900 dark:text-white mb-2">For Vendors</h4> */}
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Pages</h4>
            <ul className="space-y-1">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/discovery">Wholesalers</Link></li>
              <li><Link href="/map">Map</Link></li>
              <li><Link href="/reviews">Reviews</Link></li>
              <li><Link href="/checklist">Checklist</Link></li>
              <li><Link href="/community">Community</Link></li>
              <li><Link href="/price-comparison">Price Comparison</Link></li>
            </ul>
          </div>

          {/* For Wholesalers */}
          {/* <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">For Wholesalers</h4>
            <ul className="space-y-1">
              <li><Link href="#">List Products</Link></li>
              <li><Link href="#">Manage Inventory</Link></li>
              <li><Link href="#">Sales Analytics</Link></li>
              <li><Link href="#">Seller Tools</Link></li>
              <li><Link href="#">Bulk Upload</Link></li>
            </ul>
          </div> */}

          {/* Support */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Support</h4>
            <ul className="space-y-1">
              <li><Link href="#">Help Center</Link></li>
              <li><Link href="#">Contact Support</Link></li>
              <li><Link href="#">Community Forum</Link></li>
              <li><Link href="#">Video Tutorials</Link></li>
              <li><Link href="#">Status Page</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
          <p>© 2024 TradeLink Pro. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
