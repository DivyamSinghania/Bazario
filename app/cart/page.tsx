'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/lib/contexts/cart-context';
import { toast } from 'sonner';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice, getTotalItems } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      toast.success('Item removed from cart');
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id);
    toast.success(`${name} removed from cart`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared');
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    // Simulate API call or processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success('Order placed successfully!');
    clearCart();
    setIsProcessing(false);
  };

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.shopId]) {
      acc[item.shopId] = {
        shopName: item.shopName,
        items: []
      };
    }
    acc[item.shopId].items.push(item);
    return acc;
  }, {} as Record<string, { shopName: string; items: typeof items }>);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet. Start exploring our suppliers!
            </p>
            <Link href="/discovery">
              <Button size="lg" className="bg-[#34699a] text-white hover:bg-[#2c5882]">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
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
              <h1 className="text-3xl font-bold text-[#34699a]">Shopping Cart</h1>
              <p className="text-muted-foreground">
                {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
          </div>

          {items.length > 0 && (
            <Button variant="outline" onClick={handleClearCart} className="border-[#34699a] text-[#34699a] hover:bg-[#34699a]/10">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {Object.entries(groupedItems).map(([shopId, { shopName, items: shopItems }]) => (
              <Card key={shopId}>
                <CardHeader>
                  <CardTitle className="flex items-center text-[#34699a]">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    {shopName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {shopItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-cover bg-center rounded-md" style={{ backgroundImage: `url(${item.image})` }} />

                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">From {item.shopName}</p>
                        <p className="text-lg font-bold text-[#34699a]">₹{item.price}</p> {/* Item price in accent color */}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 hover:bg-[#34699a]/10 hover:text-[#34699a]" // Hover effect for quantity buttons
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 hover:bg-[#34699a]/10 hover:text-[#34699a]" // Hover effect for quantity buttons
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-[#34699a]">₹{item.price * item.quantity}</p> {/* Total item price in accent color */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#34699a]">Order Summary</CardTitle> {/* Card title in accent color */}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>₹50</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹25</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold text-[#34699a]"> {/* Total amount in accent color */}
                  <span>Total</span>
                  <span>₹{getTotalPrice() + 50 - 25}</span>
                </div>

                <Button 
                  className="w-full bg-[#34699a] text-white hover:bg-[#2c5882]" // Checkout button in accent color
                  size="lg"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By placing an order, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-[#34699a]">Delivery Information</CardTitle> {/* Card title in accent color */}
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Standard delivery: 2-3 business days</p>
                <p>Express delivery: Next business day</p>
                <p>Free delivery on orders above ₹500</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}