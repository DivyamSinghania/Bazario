'use client';

import React, { useState } from 'react';
import { MessageSquare, Plus, ThumbsUp, Reply, Clock, Pin, Flame } from 'lucide-react';
import Footer from '@/components/layout/Footer';

interface ForumPost {
  id: number;
  title: string;
  content: string;
  author: string;
  authorImage: string;
  timestamp: string;
  category: string;
  likes: number;
  replies: number;
  isPinned: boolean;
  isTrending: boolean;
}

const ForumPage: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: 1,
      title: 'Where to buy cheap paneer in bulk in Delhi?',
      content: 'Looking for reliable suppliers for paneer in Delhi. Need at least 10kg daily for my chaat stall. Any recommendations for good quality at reasonable prices?',
      author: 'Rajesh Kumar',
      authorImage: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=100',
      timestamp: '2 hours ago',
      category: 'Dairy Products',
      likes: 15,
      replies: 8,
      isPinned: true,
      isTrending: false
    },
    {
      id: 2,
      title: 'Azadpur Mandi closed tomorrow due to strike',
      content: 'Just got information that Azadpur vegetable market will be closed tomorrow due to a strike. Plan your vegetable purchases accordingly. Alternative markets are open.',
      author: 'Priya Singh',
      authorImage: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
      timestamp: '4 hours ago',
      category: 'Market Updates',
      likes: 32,
      replies: 12,
      isPinned: true,
      isTrending: true
    },
    {
      id: 3,
      title: 'Best spice suppliers in Chandni Chowk area?',
      content: 'New to the street food business. Can anyone recommend the best spice suppliers in Chandni Chowk? Looking for quality spices at wholesale rates.',
      author: 'Mohammad Ali',
      authorImage: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=100',
      timestamp: '6 hours ago',
      category: 'Spices',
      likes: 12,
      replies: 15,
      isPinned: false,
      isTrending: true
    },
    {
      id: 4,
      title: 'Tips for negotiating better prices with suppliers',
      content: 'Sharing my experience of 5 years in street food business. Here are some tips that helped me get better deals with suppliers...',
      author: 'Sunita Devi',
      authorImage: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
      timestamp: '1 day ago',
      category: 'Business Tips',
      likes: 45,
      replies: 23,
      isPinned: false,
      isTrending: true
    },
    {
      id: 5,
      title: 'Quality issues with recent oil supplier',
      content: 'Recently switched to a new oil supplier but the quality seems inconsistent. Has anyone faced similar issues? Looking for reliable alternatives.',
      author: 'Vikram Sharma',
      authorImage: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=100',
      timestamp: '2 days ago',
      category: 'Oil & Ghee',
      likes: 8,
      replies: 6,
      isPinned: false,
      isTrending: false
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'General' });

  const categories = [
    'All',
    'Market Updates',
    'Spices',
    'Vegetables',
    'Dairy Products',
    'Oil & Ghee',
    'Packaging',
    'Business Tips',
    'General'
  ];

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const handleNewPost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const post: ForumPost = {
      id: Date.now(),
      title: newPost.title,
      content: newPost.content,
      author: 'You', // In real app, would come from auth context
      authorImage: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=100',
      timestamp: 'Just now',
      category: newPost.category,
      likes: 0,
      replies: 0,
      isPinned: false,
      isTrending: false
    };

    setPosts(prev => [post, ...prev]);
    setNewPost({ title: '', content: '', category: 'General' });
    setShowNewPostForm(false);
  };

  const handleLike = (id: number) => {
    setPosts(prev => prev.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Community Forum
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Connect with fellow vendors, share experiences, and get help
            </p>
          </div>
          
          <button
            onClick={() => setShowNewPostForm(true)}
            className="bg-[#34699a] hover:bg-[#2c5882] text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-200 mt-4 md:mt-0"
          >
            <Plus className="w-5 h-5" />
            <span>New Post</span>
          </button>
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
                        ? 'bg-[#EBF2F7] dark:bg-[#2A4D69] text-[#34699a] dark:text-[#9FBEDA]' // Primary blue for selected category
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Forum Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Forum Stats
                </h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Total Posts</span>
                    <span className="font-medium">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Users</span>
                    <span className="font-medium">456</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Today's Posts</span>
                    <span className="font-medium">23</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Forum Posts */}
          <div className="lg:col-span-3 space-y-6">
            {filteredPosts.map(post => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={post.authorImage}
                      alt={post.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {post.author}
                        </h4>
                        {post.isPinned && (
                          <Pin className="w-4 h-4 text-[#34699a]" /> {/* Pinned icon in primary blue */}
                        )}
                        {post.isTrending && (
                          <Flame className="w-4 h-4 text-orange-500" /> {/* Trending icon remains orange */}
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{post.timestamp}</span>
                        <span>•</span>
                        <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {post.content}
                  </p>
                </div>

                {/* Post Actions */}
                <div className="flex items-center space-x-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-[#34699a] dark:hover:text-[#9FBEDA] transition-colors" // Hover effect for actions in primary blue
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-[#34699a] dark:hover:text-[#9FBEDA] transition-colors">
                    <Reply className="w-4 h-4" />
                    <span className="text-sm">{post.replies} replies</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-[#34699a] dark:hover:text-[#9FBEDA] transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm">Discuss</span>
                  </button>
                </div>
              </div>
            ))}

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No posts in this category
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Be the first to start a discussion!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* New Post Modal */}
        {showNewPostForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Create New Post
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#34699a] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" // Focus ring in primary blue
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
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="What's your question or topic?"
                    value={newPost.title}
                    onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#34699a] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" // Focus ring in primary blue
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Describe your question or share your experience..."
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#34699a] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none" // Focus ring in primary blue
                  />
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={handleNewPost}
                  className="flex-1 bg-[#34699a] hover:bg-[#2c5882] text-white py-3 rounded-lg font-medium transition-colors duration-200" // Button in primary blue
                >
                  Post
                </button>
                <button
                  onClick={() => setShowNewPostForm(false)}
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

export default ForumPage;