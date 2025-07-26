'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, IndianRupee, Star, Phone } from 'lucide-react';
import Footer from '@/components/layout/Footer';

interface Deal {
  id: string;
  item: string;
  price: number;
  originalPrice: number;
  unit: string;
  sellerName: string;
  location: string;
  coordinates: [number, number];
  distance: number;
  timePosted: string;
  rating: number;
  phone: string;
  verified: boolean;
}

const DealsMap: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    // Mock deals data (in real app, this would come from your API)
    const mockDeals: Deal[] = [
      {
        id: '1',
        item: 'Onions',
        price: 15,
        originalPrice: 25,
        unit: 'kg',
        sellerName: 'Sharma Vegetables',
        location: 'Sector 10, Chandigarh',
        coordinates: [30.7333, 76.7794],
        distance: 0.8,
        timePosted: '2 hours ago',
        rating: 4.5,
        phone: '+91 98765-43210',
        verified: true
      },
      {
        id: '2',
        item: 'Tomatoes',
        price: 12,
        originalPrice: 18,
        unit: 'kg',
        sellerName: 'Fresh Mandi',
        location: 'Railway Road, Sector 22',
        coordinates: [30.7419, 76.7682],
        distance: 1.2,
        timePosted: '1 hour ago',
        rating: 4.2,
        phone: '+91 87654-32109',
        verified: false
      },
      {
        id: '3',
        item: 'Paneer',
        price: 280,
        originalPrice: 320,
        unit: 'kg',
        sellerName: 'Dairy Fresh',
        location: 'Phase 1, Industrial Area',
        coordinates: [30.7046, 76.8006],
        distance: 2.1,
        timePosted: '30 minutes ago',
        rating: 4.8,
        phone: '+91 76543-21098',
        verified: true
      },
      {
        id: '4',
        item: 'Cooking Oil',
        price: 125,
        originalPrice: 140,
        unit: 'L',
        sellerName: 'Oil Depot',
        location: 'Sector 17, Chandigarh',
        coordinates: [30.7410, 76.7729],
        distance: 0.5,
        timePosted: '45 minutes ago',
        rating: 4.0,
        phone: '+91 65432-10987',
        verified: true
      }
    ];

    setDeals(mockDeals);
    
    // Mock user location (Chandigarh city center)
    setUserLocation([30.7333, 76.7794]);
  }, []);

  const calculateSavings = (originalPrice: number, dealPrice: number) => {
    return Math.round(((originalPrice - dealPrice) / originalPrice) * 100);
  };

  return (
    <div className="space-y-6 ">
      <div className=" text-white p-6 rounded-xl"> {/* Main header gradient */}
        <div className="flex items-center space-x-3 mb-4">
          <MapPin size={32} />
          <div>
            <h2 className="text-2xl font-bold">Live Nearby Deals</h2>
            <p className="text-white/80">Real-time offers from vendors around you</p>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border overflow-hidden">
        <div className="h-64 bg-gradient-to-br from-[#EBF2F7] to-[#CDE0EF] relative dark:from-gray-700 dark:to-gray-900"> {/* Map background gradient in lighter blue tones */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="mx-auto mb-2 text-[#34699a]" size={48} /> {/* Map icon in primary blue */}
              <p className="text-gray-600 dark:text-gray-300 font-medium">Interactive Map View</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Shows live deals with location pins</p>
            </div>
          </div>
          
          {/* Mock map pins (colors adjusted to fit theme or be neutral) */}
          <div className="absolute top-4 left-4 bg-[#34699a] text-white p-2 rounded-full shadow-lg">
            <MapPin size={16} />
          </div>
          <div className="absolute top-12 right-8 bg-[#2c5882] text-white p-2 rounded-full shadow-lg">
            <MapPin size={16} />
          </div>
          <div className="absolute bottom-8 left-12 bg-[#34699a] text-white p-2 rounded-full shadow-lg">
            <MapPin size={16} />
          </div>
          <div className="absolute bottom-4 right-4 bg-[#2c5882] text-white p-2 rounded-full shadow-lg">
            <MapPin size={16} />
          </div>
        </div>
        
        <div className="p-4 border-t bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              <Navigation size={16} className="inline mr-1" />
              Showing deals within 5km radius
            </span>
            <button className="text-[#34699a] hover:text-[#2c5882] dark:text-[#9FBEDA] dark:hover:text-[#679DCB] text-sm font-medium">
              Enable Location
            </button>
          </div>
        </div>
      </div>

      {/* Deals List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Deals Near You</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">{deals.length} deals found</span>
        </div>

        {deals.map((deal) => (
          <div 
            key={deal.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedDeal(deal)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white">{deal.item}</h4>
                  {deal.verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full dark:bg-green-900 dark:text-green-200">
                      Verified
                    </span>
                  )}
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full dark:bg-red-900 dark:text-red-200">
                    {calculateSavings(deal.originalPrice, deal.price)}% OFF
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center space-x-1">
                    <IndianRupee size={16} className="text-[#34699a]" /> {/* Price icon in primary blue */}
                    <span className="font-bold text-[#34699a] dark:text-[#9FBEDA] text-lg">₹{deal.price}</span> {/* Deal price in primary blue */}
                    <span className="text-gray-500 dark:text-gray-400">/{deal.unit}</span>
                    <span className="line-through text-gray-400 text-sm dark:text-gray-500">₹{deal.originalPrice}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center space-x-1">
                    <span className="font-medium">{deal.sellerName}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-400 fill-current" size={14} />
                      <span>{deal.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin size={14} />
                    <span>{deal.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Navigation size={14} />
                    <span>{deal.distance}km away</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                    <Clock size={12} />
                    <span>Posted {deal.timePosted}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-[#34699a] text-white px-3 py-1 rounded text-sm hover:bg-[#2c5882] transition-colors"> {/* Button in primary blue */}
                      Get Directions
                    </button>
                    <button className="border border-gray-300 dark:border-gray-600 px-3 py-1 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-1 text-gray-700 dark:text-gray-300">
                      <Phone size={12} />
                      <span>Call</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Deal */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:text-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-[#34699a]">Report a Deal</h3> {/* Title in primary blue */}
        <p className="text-gray-600 mb-4 dark:text-gray-400">Found a great deal? Share it with the community!</p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <input 
            type="text" 
            placeholder="Item name"
            className="p-3 border rounded-lg focus:border-[#34699a] focus:ring-[#34699a] dark:bg-gray-700 dark:border-gray-600"
          />
          <input 
            type="number" 
            placeholder="Deal price"
            className="p-3 border rounded-lg focus:border-[#34699a] focus:ring-[#34699a] dark:bg-gray-700 dark:border-gray-600"
          />
          <input 
            type="text" 
            placeholder="Seller name"
            className="p-3 border rounded-lg focus:border-[#34699a] focus:ring-[#34699a] dark:bg-gray-700 dark:border-gray-600"
          />
          <input 
            type="text" 
            placeholder="Location"
            className="p-3 border rounded-lg focus:border-[#34699a] focus:ring-[#34699a] dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        
        <div className="mt-4 flex space-x-4">
          <button className="bg-[#34699a] text-white px-6 py-2 rounded-lg hover:bg-[#2c5882] transition-colors"> {/* Button in primary blue */}
            Share Deal
          </button>
          <button className="border border-gray-300 dark:border-gray-600 px-6 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
            Use Current Location
          </button>
        </div>
      </div>

      {/* Deal Details Modal */}
      {selectedDeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedDeal.item} Deal</h3>
              <button 
                onClick={() => setSelectedDeal(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#34699a]"> {/* Price in primary blue */}
                  ₹{selectedDeal.price}/{selectedDeal.unit}
                </div>
                <div className="text-gray-500 line-through dark:text-gray-400">₹{selectedDeal.originalPrice}</div>
                <div className="text-red-600 font-medium dark:text-red-400"> {/* Discount remains red for emphasis */}
                  Save {calculateSavings(selectedDeal.originalPrice, selectedDeal.price)}%
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="font-medium mb-2 text-gray-900 dark:text-white">{selectedDeal.sellerName}</h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>{selectedDeal.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={16} />
                    <span>{selectedDeal.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span>{selectedDeal.rating} rating</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-1 bg-[#34699a] text-white py-2 rounded-lg hover:bg-[#2c5882] transition-colors"> {/* Button in primary blue */}
                  Get Directions
                </button>
                <button className="flex-1 bg-[#34699a] text-white py-2 rounded-lg hover:bg-[#2c5882] transition-colors"> {/* Button in primary blue */}
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default DealsMap;