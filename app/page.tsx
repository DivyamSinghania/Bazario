'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Star, MapPin, Users, CheckCircle, MessageCircle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Footer from '@/components/layout/Footer';

const categories = [
  { name: 'Spices', icon: '🌶️', count: 156 },
  { name: 'Vegetables', icon: '🥕', count: 89 },
  { name: 'Oils & Ghee', icon: '🫒', count: 67 },
  { name: 'Packaging', icon: '📦', count: 123 },
  { name: 'Grains', icon: '🌾', count: 94 },
  { name: 'Dairy', icon: '🥛', count: 78 },
];

const trendingSellers = [
  {
    id: '1',
    name: 'Sharma Spice Center',
    area: 'Chandni Chowk',
    rating: 4.8,
    reviews: 245,
    speciality: 'Premium Spices',
    distance: '1.2 km',
    image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '2',
    name: 'Fresh Vegetable Hub',
    area: 'Azadpur Mandi',
    rating: 4.6,
    reviews: 189,
    speciality: 'Organic Vegetables',
    distance: '2.8 km',
    image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '3',
    name: 'Quality Oil Traders',
    area: 'Karol Bagh',
    rating: 4.7,
    reviews: 156,
    speciality: 'Cooking Oils',
    distance: '3.1 km',
    image: 'https://images.pexels.com/photos/4198017/pexels-photo-4198017.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/discovery?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Find Trusted Suppliers in Your Community
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with verified sellers, share experiences, and build your vendor network with real-time prices and reviews.
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for raw materials, suppliers, or areas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-lg"
                  />
                </div>
                <Button type="submit" size="lg" className="px-8">
                  Search
                </Button>
              </div>
            </form>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-muted-foreground">Verified Sellers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">2.5K+</div>
                <div className="text-sm text-muted-foreground">Happy Vendors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">50+</div>
                <div className="text-sm text-muted-foreground">Cities Covered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">10K+</div>
                <div className="text-sm text-muted-foreground">Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.name} href={`/discovery?category=${category.name.toLowerCase()}`}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} sellers</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Sellers Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">🔥 Trending Sellers</h2>
            <Link href="/discovery">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingSellers.map((seller) => (
              <Link key={seller.id} href={`/shop/${seller.id}`}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
                  <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url(${seller.image})` }}>
                    <div className="absolute inset-0 bg-black/40" />
                    <Badge className="absolute top-3 right-3 bg-green-500">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1">{seller.name}</h3>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{seller.area} • {seller.distance}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium">{seller.rating}</span>
                        <span className="text-muted-foreground text-sm ml-1">({seller.reviews} reviews)</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {seller.speciality}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose VendorHub?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Location-Based Discovery</h3>
              <p className="text-muted-foreground">Find suppliers near you with accurate distance and area information.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Verified Reviews</h3>
              <p className="text-muted-foreground">Read authentic reviews from fellow vendors to make informed decisions.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Smart Checklists</h3>
              <p className="text-muted-foreground">Use ready-made checklists for raw materials and share your own.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Community Support</h3>
              <p className="text-muted-foreground">Connect with other vendors, ask questions, and share experiences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Vendor Experience?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of vendors who are already building stronger supplier relationships and growing their businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" variant="secondary" className="px-8">
                <Users className="w-5 h-5 mr-2" />
                Join Community
              </Button>
            </Link>
            <Link href="/discovery">
              <Button size="lg" variant="outline" className="px-8 border-white hover:text-blue-600">
                Explore Suppliers
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}