"use client";

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
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-xl">
        <div className="flex items-center space-x-3 mb-4">
          <MapPin size={32} />
          <div>
            <h2 className="text-2xl font-bold">Live Nearby Deals</h2>
            <p className="text-green-100">Real-time offers from vendors around you</p>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="mx-auto mb-2 text-blue-600" size={48} />
              <p className="text-gray-600 font-medium">Interactive Map View</p>
              <p className="text-sm text-gray-500">Shows live deals with location pins</p>
            </div>
          </div>
          
          {/* Mock map pins */}
          <div className="absolute top-4 left-4 bg-red-500 text-white p-2 rounded-full shadow-lg">
            <MapPin size={16} />
          </div>
          <div className="absolute top-12 right-8 bg-green-500 text-white p-2 rounded-full shadow-lg">
            <MapPin size={16} />
          </div>
          <div className="absolute bottom-8 left-12 bg-blue-500 text-white p-2 rounded-full shadow-lg">
            <MapPin size={16} />
          </div>
          <div className="absolute bottom-4 right-4 bg-purple-500 text-white p-2 rounded-full shadow-lg">
            <MapPin size={16} />
          </div>
        </div>
        
        <div className="p-4 border-t bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-white">
              <Navigation size={16} className="inline mr-1" />
              Showing deals within 5km radius
            </span>
            <button className="text-blue-600 hover:text-blue-700 dark:text-blue-600 dark:hover:text-blue-500 text-sm font-medium">
              Enable Location
            </button>
          </div>
        </div>
      </div>

      {/* Deals List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Active Deals Near You</h3>
          <span className="text-sm text-gray-500">{deals.length} deals found</span>
        </div>

        {deals.map((deal) => (
          <div 
            key={deal.id}
            className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer dark:bg-gray-900 "
            onClick={() => setSelectedDeal(deal)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-lg">{deal.item}</h4>
                  {deal.verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Verified
                    </span>
                  )}
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    {calculateSavings(deal.originalPrice, deal.price)}% OFF
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center space-x-1">
                    <IndianRupee size={16} className="text-green-600" />
                    <span className="font-bold text-green-600 dark:text-green-400 text-lg">₹{deal.price}</span>
                    <span className="text-gray-500 dark:text-gray-200">/{deal.unit}</span>
                    <span className="line-through text-gray-400 text-sm dark:text-gray-200">₹{deal.originalPrice}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-white">
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
                  <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-300">
                    <Clock size={12} />
                    <span>Posted {deal.timePosted}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors">
                      Get Directions
                    </button>
                    <button className="border border-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors flex items-center space-x-1">
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
      <div className="bg-white p-6 rounded-lg shadow-sm border dark:bg-gray-900 dark:text-gray-200">
        <h3 className="text-lg font-semibold mb-4">Report a Deal</h3>
        <p className="text-gray-600 mb-4 dark:text-gray-400">Found a great deal? Share it with the community!</p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <input 
            type="text" 
            placeholder="Item name"
            className="p-3 border rounded-lg "
          />
          <input 
            type="number" 
            placeholder="Deal price"
            className="p-3 border rounded-lg "
          />
          <input 
            type="text" 
            placeholder="Seller name"
            className="p-3 border rounded-lg "
          />
          <input 
            type="text" 
            placeholder="Location"
            className="p-3 border rounded-lg "
          />
        </div>
        
        <div className="mt-4 flex space-x-4">
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
            Share Deal
          </button>
          <button className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            Use Current Location
          </button>
        </div>
      </div>

      {/* Deal Details Modal */}
      {selectedDeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{selectedDeal.item} Deal</h3>
              <button 
                onClick={() => setSelectedDeal(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  ₹{selectedDeal.price}/{selectedDeal.unit}
                </div>
                <div className="text-gray-500 line-through">₹{selectedDeal.originalPrice}</div>
                <div className="text-red-600 font-medium">
                  Save {calculateSavings(selectedDeal.originalPrice, selectedDeal.price)}%
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">{selectedDeal.sellerName}</h4>
                <div className="space-y-2 text-sm text-gray-600">
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
                <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Get Directions
                </button>
                <button className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
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