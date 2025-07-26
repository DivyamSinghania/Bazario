'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Star, MapPin, Clock, Phone, Share2, Heart, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/lib/contexts/cart-context';
import { useWishlist } from '@/lib/contexts/wishlist-context';
import { toast } from 'sonner';
import Footer from '@/components/layout/Footer';

const mockShopData = {
  '1': {
    id: '1',
    name: 'Sharma Spice Center',
    area: 'Chandni Chowk',
    city: 'Delhi',
    rating: 4.8,
    reviews: 245,
    category: 'Spices',
    distance: 1.2,
    image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=800',
    phone: '+91 9876543210',
    openNow: true,
    timings: 'Mon-Sat: 9:00 AM - 8:00 PM, Sun: 10:00 AM - 6:00 PM',
    address: '123, Spice Market, Chandni Chowk, Delhi - 110006',
    specialties: ['Premium Spices', 'Organic', 'Wholesale'],
    description: 'Established in 1985, Sharma Spice Center has been serving quality spices to vendors across Delhi. We specialize in premium grade spices sourced directly from farms.',
    products: [
      { id: 'p1', name: 'Red Chili Powder', price: 120, image: 'https://images.pexels.com/photos/4198020/pexels-photo-4198020.jpeg?auto=compress&cs=tinysrgb&w=300', unit: 'per kg', category: 'Spices' },
      { id: 'p2', name: 'Turmeric Powder', price: 180, image: 'https://images.pexels.com/photos/4198021/pexels-photo-4198021.jpeg?auto=compress&cs=tinysrgb&w=300', unit: 'per kg', category: 'Spices' },
      { id: 'p3', name: 'Garam Masala', price: 250, image: 'https://images.pexels.com/photos/4198022/pexels-photo-4198022.jpeg?auto=compress&cs=tinysrgb&w=300', unit: 'per kg', category: 'Spices' },
      { id: 'p4', name: 'Cumin Seeds', price: 300, image: 'https://images.pexels.com/photos/4198023/pexels-photo-4198023.jpeg?auto=compress&cs=tinysrgb&w=300', unit: 'per kg', category: 'Spices' },
      { id: 'p5', name: 'Black Pepper', price: 800, image: 'https://images.pexels.com/photos/4198024/pexels-photo-4198024.jpeg?auto=compress&cs=tinysrgb&w=300', unit: 'per kg', category: 'Spices' },
      { id: 'p6', name: 'Cardamom', price: 1500, image: 'https://images.pexels.com/photos/4198025/pexels-photo-4198025.jpeg?auto=compress&cs=tinysrgb&w=300', unit: 'per kg', category: 'Spices' },
    ],
    user_reviews: [
      { id: 1, user: 'Rajesh Kumar', rating: 5, comment: 'Excellent quality spices at wholesale rates. Been buying from them for 3 years.', date: '2024-01-15' },
      { id: 2, user: 'Priya Sharma', rating: 4, comment: 'Good variety and fresh stock. Delivery is also prompt.', date: '2024-01-10' },
      { id: 3, user: 'Amit Singh', rating: 5, comment: 'Best spice supplier in Chandni Chowk. Highly recommended!', date: '2024-01-05' },
    ]
  }
};

export default function ShopPage() {
  const params = useParams();
  const shopId = params.id as string;
  const shop = mockShopData[shopId as keyof typeof mockShopData];
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Shop not found</h1>
          <p className="text-muted-foreground">The shop you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (productId: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 1) + change)
    }));
  };

  const handleAddToCart = (product: typeof shop.products[0]) => {
    const quantity = quantities[product.id] || 1;
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        shopId: shop.id,
        shopName: shop.name,
      });
    }
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  const handleWishlistToggle = (product: typeof shop.products[0]) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        shopId: shop.id,
        shopName: shop.name,
      });
      toast.success('Added to wishlist');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 bg-cover bg-center" style={{ backgroundImage: `url(${shop.image})` }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{shop.name}</h1>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {shop.area}, {shop.city} • {shop.distance} km
                  </div>
                  <div className="flex items-center">
                    {/* Star color is amber-500 */}
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500 mr-1" />
                    {shop.rating} ({shop.reviews} reviews)
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="secondary" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="icon">
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="products" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {shop.products.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                          onClick={() => handleWishlistToggle(product)}
                        >
                          <Heart 
                            className={`w-4 h-4 ${
                              isInWishlist(product.id) 
                                ? 'fill-red-500 text-red-500' 
                                : 'text-gray-600'
                            }`} 
                          />
                        </Button>
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                        <p className="text-2xl font-bold text-primary mb-3">
                          ₹{product.price} <span className="text-sm text-muted-foreground font-normal">{product.unit}</span>
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(product.id, -1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center">{quantities[product.id] || 1}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(product.id, 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          {/* Changed Add to Cart button to #34699a */}
                          <Button onClick={() => handleAddToCart(product)} className="bg-[#34699a] hover:bg-[#2c5882] text-white">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {shop.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{shop.description}</p>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {shop.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          {shop.phone}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {shop.address}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {shop.timings}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-6">
                <div className="space-y-4">
                  {shop.user_reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{review.user}</h4>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'fill-amber-500 text-amber-500' 
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Operating Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    {/* Open/Closed Badge colors remain */}
                    <Badge className={shop.openNow ? 'bg-[#5CB85C]' : 'bg-rose-500'}>
                      {shop.openNow ? 'Open Now' : 'Closed'}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-2">{shop.timings}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Changed Call Now button to #34699a */}
                <Button className="w-full bg-[#34699a] hover:bg-[#2c5882] text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button variant="outline" className="w-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Shop
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}