'use client';

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Plus, BarChart3, MapPin } from 'lucide-react';
import Footer from '@/components/layout/Footer';

interface PriceData {
  id: string;
  productName: string;
  category: string;
  currentPrice: number;
  previousPrice: number;
  unit: string;
  market: string;
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

const PriceTrackerPage: React.FC = () => {
  const [priceData, setPriceData] = useState<PriceData[]>([
    {
      id: '1',
      productName: 'Red Chili Powder',
      category: 'Spices',
      currentPrice: 150,
      previousPrice: 145,
      unit: 'per kg',
      market: 'Chandni Chowk',
      lastUpdated: '2 hours ago',
      trend: 'up',
      change: 3.4
    },
    {
      id: '2',
      productName: 'Turmeric Powder',
      category: 'Spices',
      currentPrice: 80,
      previousPrice: 85,
      unit: 'per kg',
      market: 'Azadpur Mandi',
      lastUpdated: '3 hours ago',
      trend: 'down',
      change: -5.9
    },
    {
      id: '3',
      productName: 'Mustard Oil',
      category: 'Oil',
      currentPrice: 120,
      previousPrice: 120,
      unit: 'per liter',
      market: 'Karol Bagh',
      lastUpdated: '1 hour ago',
      trend: 'stable',
      change: 0
    },
    {
      id: '4',
      productName: 'Onions',
      category: 'Vegetables',
      currentPrice: 30,
      previousPrice: 35,
      unit: 'per kg',
      market: 'Azadpur Mandi',
      lastUpdated: '4 hours ago',
      trend: 'down',
      change: -14.3
    },
    {
      id: '5',
      productName: 'Tomatoes',
      category: 'Vegetables',
      currentPrice: 45,
      previousPrice: 40,
      unit: 'per kg',
      market: 'Azadpur Mandi',
      lastUpdated: '2 hours ago',
      trend: 'up',
      change: 12.5
    },
    {
      id: '6',
      productName: 'Garam Masala',
      category: 'Spices',
      currentPrice: 200,
      previousPrice: 195,
      unit: 'per kg',
      market: 'Chandni Chowk',
      lastUpdated: '5 hours ago',
      trend: 'up',
      change: 2.6
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [newPrice, setNewPrice] = useState({
    productName: '',
    category: 'Spices',
    price: 0,
    unit: 'per kg',
    market: ''
  });

  const categories = ['All', 'Spices', 'Vegetables', 'Oil', 'Dairy', 'Grains', 'Packaging'];

  const filteredData = selectedCategory === 'All' 
    ? priceData 
    : priceData.filter(item => item.category === selectedCategory);

  const handleSubmitPrice = () => {
    if (!newPrice.productName.trim() || !newPrice.market.trim() || newPrice.price <= 0) return;

    // In a real app, this would submit to an API
    console.log('Submitting price:', newPrice);
    
    // Reset form
    setNewPrice({
      productName: '',
      category: 'Spices',
      price: 0,
      unit: 'per kg',
      market: ''
    });
    setShowSubmitForm(false);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-green-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      case 'down':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Calculate summary stats
  const totalItems = priceData.length;
  const pricesUp = priceData.filter(item => item.trend === 'up').length;
  const pricesDown = priceData.filter(item => item.trend === 'down').length;
  const pricesStable = priceData.filter(item => item.trend === 'stable').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Price Tracker
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track daily prices and market trends for raw materials
            </p>
          </div>
          
          <button
            onClick={() => setShowSubmitForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-200 mt-4 md:mt-0"
          >
            <Plus className="w-5 h-5" />
            <span>Submit Price</span>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Items</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalItems}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Prices Up</p>
                <p className="text-2xl font-bold text-red-600">{pricesUp}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-red-600" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Prices Down</p>
                <p className="text-2xl font-bold text-green-600">{pricesDown}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Stable</p>
                <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">{pricesStable}</p>
              </div>
              <Minus className="w-8 h-8 text-gray-600 dark:text-gray-300" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Quick Tips */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  💡 Quick Tips
                </h4>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <p>• Prices update every hour</p>
                  <p>• Red = Price increased</p>
                  <p>• Green = Price decreased</p>
                  <p>• Gray = No change</p>
                  <p>• Submit prices to help the community</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Price List */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Current Market Prices
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Latest price updates from various markets
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Current Price
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Change
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Market
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Updated
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredData.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {item.productName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {item.category}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            ₹{item.currentPrice}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {item.unit}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getTrendColor(item.trend)}`}>
                            {getTrendIcon(item.trend)}
                            <span>
                              {item.change !== 0 && (item.change > 0 ? '+' : '')}{item.change}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1 text-gray-700 dark:text-gray-300">
                            <MapPin className="w-4 h-4" />
                            <span>{item.market}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {item.lastUpdated}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredData.length === 0 && (
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No price data available
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Be the first to submit prices for this category!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Price Modal */}
        {showSubmitForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Submit Current Price
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Red Chili Powder"
                    value={newPrice.productName}
                    onChange={(e) => setNewPrice(prev => ({ ...prev, productName: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={newPrice.category}
                      onChange={(e) => setNewPrice(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {categories.slice(1).map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Unit
                    </label>
                    <select
                      value={newPrice.unit}
                      onChange={(e) => setNewPrice(prev => ({ ...prev, unit: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="per kg">per kg</option>
                      <option value="per liter">per liter</option>
                      <option value="per piece">per piece</option>
                      <option value="per packet">per packet</option>
                      <option value="per dozen">per dozen</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Price (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={newPrice.price || ''}
                    onChange={(e) => setNewPrice(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Market/Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Chandni Chowk, Azadpur Mandi"
                    value={newPrice.market}
                    onChange={(e) => setNewPrice(prev => ({ ...prev, market: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={handleSubmitPrice}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Submit Price
                </button>
                <button
                  onClick={() => setShowSubmitForm(false)}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default PriceTrackerPage;