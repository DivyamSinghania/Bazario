'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Star, MapPin, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const mockShops = [
  {
    id: '1',
    name: 'Sharma Spice Center',
    area: 'Chandni Chowk',
    city: 'Delhi',
    rating: 4.8,
    reviews: 245,
    category: 'Spices',
    distance: 1.2,
    image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialties: ['Premium Spices', 'Organic', 'Wholesale'],
    openNow: true,
  },
  {
    id: '2',
    name: 'Fresh Vegetable Hub',
    area: 'Azadpur Mandi',
    city: 'Delhi',
    rating: 4.6,
    reviews: 189,
    category: 'Vegetables',
    distance: 2.8,
    image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialties: ['Organic Vegetables', 'Fresh Daily', 'Bulk Orders'],
    openNow: true,
  },
  {
    id: '3',
    name: 'Quality Oil Traders',
    area: 'Karol Bagh',
    city: 'Delhi',
    rating: 4.7,
    reviews: 156,
    category: 'Oils & Ghee',
    distance: 3.1,
    image: 'https://images.pexels.com/photos/4198017/pexels-photo-4198017.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialties: ['Cooking Oils', 'Pure Ghee', 'Mustard Oil'],
    openNow: false,
  },
  {
    id: '4',
    name: 'Mumbai Packaging Solutions',
    area: 'Andheri East',
    city: 'Mumbai',
    rating: 4.5,
    reviews: 203,
    category: 'Packaging',
    distance: 4.2,
    image: 'https://images.pexels.com/photos/4226769/pexels-photo-4226769.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialties: ['Food Packaging', 'Eco-friendly', 'Custom Sizes'],
    openNow: true,
  },
  {
    id: '5',
    name: 'Golden Grain Suppliers',
    area: 'Sector 18',
    city: 'Noida',
    rating: 4.4,
    reviews: 178,
    category: 'Grains',
    distance: 5.5,
    image: 'https://images.pexels.com/photos/4110004/pexels-photo-4110004.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialties: ['Rice', 'Wheat', 'Pulses'],
    openNow: true,
  },
  {
    id: '6',
    name: 'Pure Dairy Products',
    area: 'Ghaziabad',
    city: 'Ghaziabad',
    rating: 4.3,
    reviews: 142,
    category: 'Dairy',
    distance: 6.8,
    image: 'https://images.pexels.com/photos/4107638/pexels-photo-4107638.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialties: ['Fresh Milk', 'Paneer', 'Curd'],
    openNow: true,
  },
];

const categories = ['All', 'Spices', 'Vegetables', 'Oils & Ghee', 'Packaging', 'Grains', 'Dairy'];
const sortOptions = [
  { value: 'distance', label: 'Distance' },
  { value: 'rating', label: 'Rating' },
  { value: 'reviews', label: 'Most Reviewed' },
  { value: 'name', label: 'Name (A-Z)' },
];

export default function DiscoveryPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState('distance');
  const [maxDistance, setMaxDistance] = useState([10]);
  const [minRating, setMinRating] = useState([0]);
  const [openNow, setOpenNow] = useState(false);
  const [filteredShops, setFilteredShops] = useState(mockShops);

  useEffect(() => {
    let filtered = mockShops;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        shop =>
          shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          shop.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          shop.specialties.some(specialty =>
            specialty.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(shop => shop.category === selectedCategory);
    }

    // Filter by distance
    filtered = filtered.filter(shop => shop.distance <= maxDistance[0]);

    // Filter by rating
    filtered = filtered.filter(shop => shop.rating >= minRating[0]);

    // Filter by open now
    if (openNow) {
      filtered = filtered.filter(shop => shop.openNow);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredShops(filtered);
  }, [searchQuery, selectedCategory, sortBy, maxDistance, minRating, openNow]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Discover Suppliers</h1>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search suppliers, products, or areas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </form>
            
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Refine your search results
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="space-y-6 mt-6">
                    <div>
                      <Label className="text-sm font-medium">Maximum Distance (km)</Label>
                      <div className="mt-2">
                        <Slider
                          value={maxDistance}
                          onValueChange={setMaxDistance}
                          max={20}
                          min={1}
                          step={0.5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>1 km</span>
                          <span>{maxDistance[0]} km</span>
                          <span>20 km</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">Minimum Rating</Label>
                      <div className="mt-2">
                        <Slider
                          value={minRating}
                          onValueChange={setMinRating}
                          max={5}
                          min={0}
                          step={0.1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>0 ⭐</span>
                          <span>{minRating[0]} ⭐</span>
                          <span>5 ⭐</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="openNow"
                        checked={openNow}
                        onChange={(e) => setOpenNow(e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="openNow" className="text-sm">Open now only</Label>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div>
          <p className="text-muted-foreground mb-6">
            Found {filteredShops.length} suppliers
            {searchQuery && (
              <span> for "<strong>{searchQuery}</strong>"</span>
            )}
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops.map((shop) => (
              <Link key={shop.id} href={`/shop/${shop.id}`}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
                  <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url(${shop.image})` }}>
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute top-3 right-3 space-y-2">
                      {shop.openNow ? (
                        <Badge className="bg-green-500">Open Now</Badge>
                      ) : (
                        <Badge variant="secondary">Closed</Badge>
                      )}
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1">{shop.name}</h3>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{shop.area}, {shop.city} • {shop.distance} km</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium">{shop.rating}</span>
                        <span className="text-muted-foreground text-sm ml-1">({shop.reviews})</span>
                      </div>
                      <Badge variant="outline">{shop.category}</Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {shop.specialties.slice(0, 2).map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {shop.specialties.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{shop.specialties.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          {filteredShops.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No suppliers found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters
              </p>
              <Button onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setMaxDistance([10]);
                setMinRating([0]);
                setOpenNow(false);
              }}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}