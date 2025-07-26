'use client';

import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useWishlist } from '@/lib/contexts/wishlist-context';
import { useCart } from '@/lib/contexts/cart-context';
import { toast } from 'sonner';
import Footer from '@/components/layout/Footer';

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id);
    toast.success(`${name} removed from wishlist`);
  };

  const handleAddToCart = (item: typeof items[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      shopId: item.shopId,
      shopName: item.shopName,
    });
    toast.success(`${item.name} added to cart`);
  };

  const handleClearWishlist = () => {
    clearWishlist();
    toast.success('Wishlist cleared');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-6">💝</div>
            <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-8">
              Save items you love to buy them later. Your wishlist will appear here.
            </p>
            <Link href="/discovery">
              {/* Apply #34699a to the "Start Browse" button */}
              <Button size="lg" className="bg-[#34699a] hover:bg-[#2c5882] text-white">
                <Heart className="w-5 h-5 mr-2" />
                Start Browse
              </Button>
            </Link>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/discovery">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                {/* Keep Heart icon red for visual cue of wishlist */}
                <Heart className="w-8 h-8 mr-3 fill-red-500 text-red-500" />
                My Wishlist
              </h1>
              <p className="text-muted-foreground">
                {items.length} {items.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
          </div>
          
          {items.length > 0 && (
            <Button variant="outline" onClick={handleClearWishlist}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => handleRemoveItem(item.id, item.name)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">From {item.shopName}</p>
                <p className="text-2xl font-bold text-primary mb-4">₹{item.price}</p>
                
                <div className="flex space-x-2">
                  {/* Apply #34699a to the "Add to Cart" button */}
                  <Button 
                    className="flex-1 bg-[#34699a] hover:bg-[#2c5882] text-white"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Link href={`/shop/${item.shopId}`}>
                    <Button variant="outline" size="icon">
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}