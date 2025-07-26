'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  shopId: string;
  shopName: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('vendor-wishlist');
    if (savedWishlist) {
      setItems(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('vendor-wishlist', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: WishlistItem) => {
    setItems(prev => {
      const exists = prev.find(item => item.id === newItem.id);
      if (!exists) {
        return [...prev, newItem];
      }
      return prev;
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const isInWishlist = (id: string) => {
    return items.some(item => item.id === id);
  };

  const clearWishlist = () => {
    setItems([]);
  };

  const value = {
    items,
    addItem,
    removeItem,
    isInWishlist,
    clearWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}