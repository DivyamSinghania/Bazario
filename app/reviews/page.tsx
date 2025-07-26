'use client';

import React, { useState } from 'react';
import { Star, Filter, ThumbsUp, MessageSquare } from 'lucide-react';
import Footer from '@/components/layout/Footer';

interface Review {
  id: number;
  userName: string;
  userImage: string;
  rating: number;
  date: string;
  supplierName: string;
  productName: string;
  content: string;
  likes: number;
  replies: number;
  verified: boolean;
}

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      userName: 'Rahul Sharma',
      userImage: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      date: '2024-01-15',
      supplierName: 'Raj Spices Center',
      productName: 'Red Chili Powder',
      content: 'Excellent quality spices! The red chili powder is perfectly ground and has the right level of spiciness. Been ordering from Raj Spices for 3 years now, never disappointed.',
      likes: 12,
      replies: 3,
      verified: true
    },
    {
      id: 2,
      userName: 'Priya Singh',
      userImage: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4,
      date: '2024-01-12',
      supplierName: 'Fresh Veg Mandi',
      productName: 'Mixed Vegetables',
      content: 'Good quality vegetables, always fresh. Prices are reasonable compared to other vendors. Only issue is sometimes they run out of stock for popular items.',
      likes: 8,
      replies: 1,
      verified: true
    },
    {
      id: 3,
      userName: 'Mohammad Ali',
      userImage: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      date: '2024-01-10',
      supplierName: 'Golden Oil Traders',
      productName: 'Mustard Oil',
      content: 'Pure mustard oil with authentic taste. Great for street food preparation. The vendor is very reliable and delivers on time.',
      likes: 15,
      replies: 2,
      verified: true
    },
    {
      id: 4,
      userName: 'Sunita Devi',
      userImage: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 3,
      date: '2024-01-08',
      supplierName: 'Metro Packaging Solutions',
      productName: 'Food Containers',
      content: 'Packaging quality is okay but could be better. Some containers arrived with minor defects. Customer service was responsive though.',
      likes: 4,
      replies: 5,
      verified: false
    }
  ]);

  const [filterRating, setFilterRating] = useState(0);
  const [sortBy, setSortBy] = useState('newest');

  const filteredReviews = reviews
    .filter(review => filterRating === 0 || review.rating === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        case 'most_liked':
          return b.likes - a.likes;
        default:
          return 0;
      }
    });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: (reviews.filter(r => r.rating === star).length / reviews.length) * 100
  }));

  const renderStars = (rating: number, size: string = 'w-5 h-5') => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`${size} ${
          index < rating
            ? 'text-yellow-500 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Reviews & Ratings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            See what fellow vendors are saying about suppliers and products
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Rating Summary & Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Rating Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Overall Rating
              </h3>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center mb-2">
                  {renderStars(Math.round(averageRating))}
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Based on {reviews.length} reviews
                </p>
              </div>
              
              {/* Rating Distribution */}
              <div className="space-y-2">
                {ratingDistribution.map(({ star, count, percentage }) => (
                  <div key={star} className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-3">
                      {star}
                    </span>
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>
              
              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Filter by Rating
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setFilterRating(0)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      filterRating === 0
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    All Ratings
                  </button>
                  {[5, 4, 3, 2, 1].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setFilterRating(rating)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                        filterRating === rating
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="flex">
                        {renderStars(rating, 'w-4 h-4')}
                      </div>
                      <span>& above</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                  <option value="most_liked">Most Liked</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-3 space-y-6">
            {filteredReviews.map(review => (
              <div
                key={review.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4">
                  {/* User Avatar */}
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  
                  <div className="flex-1">
                    {/* Review Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {review.userName}
                          </h4>
                          {review.verified && (
                            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {renderStars(review.rating, 'w-4 h-4')}
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">{review.productName}</span>
                        {' from '}
                        <span className="font-medium text-blue-600 dark:text-blue-400">
                          {review.supplierName}
                        </span>
                      </p>
                    </div>

                    {/* Review Content */}
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {review.content}
                    </p>

                    {/* Review Actions */}
                    <div className="flex items-center space-x-6">
                      <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">{review.likes}</span>
                      </button>
                      
                      <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-sm">{review.replies} replies</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredReviews.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No reviews found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your filters to see more reviews
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ReviewsPage;