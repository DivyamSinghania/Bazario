'use client';

import React, { useState } from 'react';
import { Download, Plus, Check, X, FileText, Utensils } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Footer from '@/components/layout/Footer';

interface ChecklistItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  estimatedPrice: number;
  isChecked: boolean;
  notes: string;
}

const ChecklistPage: React.FC = () => {
  const [selectedVendorType, setSelectedVendorType] = useState('chaat');
  const [customItem, setCustomItem] = useState({ name: '', category: '', unit: '', price: 0 });
  const [showAddForm, setShowAddForm] = useState(false);

  const vendorTypes = [
    { id: 'chaat', name: 'Chaat Vendor', icon: '🥘' },
    { id: 'tea', name: 'Tea Stall', icon: '☕' },
    { id: 'sweets', name: 'Sweet Shop', icon: '🍬' },
    { id: 'snacks', name: 'Snacks Vendor', icon: '🍿' },
    { id: 'juice', name: 'Juice Corner', icon: '🧃' },
    { id: 'custom', name: 'Custom List', icon: '📝' }
  ];

  const defaultChecklists: Record<string, ChecklistItem[]> = {
    chaat: [
      { id: '1', name: 'Whole Wheat Flour', category: 'Flour & Grains', unit: 'kg', estimatedPrice: 40, isChecked: false, notes: '' },
      { id: '2', name: 'Chickpeas (Chana)', category: 'Flour & Grains', unit: 'kg', estimatedPrice: 80, isChecked: false, notes: '' },
      { id: '3', name: 'Tamarind Paste', category: 'Condiments', unit: 'kg', estimatedPrice: 120, isChecked: false, notes: '' },
      { id: '4', name: 'Green Chutney', category: 'Condiments', unit: 'liter', estimatedPrice: 60, isChecked: false, notes: '' },
      { id: '5', name: 'Red Chili Powder', category: 'Spices', unit: 'kg', estimatedPrice: 150, isChecked: false, notes: '' },
      { id: '6', name: 'Cumin Powder', category: 'Spices', unit: 'kg', estimatedPrice: 200, isChecked: false, notes: '' },
      { id: '7', name: 'Chat Masala', category: 'Spices', unit: 'kg', estimatedPrice: 180, isChecked: false, notes: '' },
      { id: '8', name: 'Cooking Oil', category: 'Oil', unit: 'liter', estimatedPrice: 120, isChecked: false, notes: '' },
      { id: '9', name: 'Onions', category: 'Vegetables', unit: 'kg', estimatedPrice: 30, isChecked: false, notes: '' },
      { id: '10', name: 'Tomatoes', category: 'Vegetables', unit: 'kg', estimatedPrice: 40, isChecked: false, notes: '' },
      { id: '11', name: 'Paper Plates', category: 'Packaging', unit: 'packet', estimatedPrice: 80, isChecked: false, notes: '' },
      { id: '12', name: 'Disposable Spoons', category: 'Packaging', unit: 'packet', estimatedPrice: 60, isChecked: false, notes: '' }
    ],
    tea: [
      { id: '1', name: 'Tea Leaves', category: 'Beverages', unit: 'kg', estimatedPrice: 300, isChecked: false, notes: '' },
      { id: '2', name: 'Milk', category: 'Dairy', unit: 'liter', estimatedPrice: 50, isChecked: false, notes: '' },
      { id: '3', name: 'Sugar', category: 'Sweeteners', unit: 'kg', estimatedPrice: 40, isChecked: false, notes: '' },
      { id: '4', name: 'Ginger', category: 'Spices', unit: 'kg', estimatedPrice: 80, isChecked: false, notes: '' },
      { id: '5', name: 'Cardamom', category: 'Spices', unit: '100g', estimatedPrice: 120, isChecked: false, notes: '' },
      { id: '6', name: 'Paper Cups', category: 'Packaging', unit: 'packet', estimatedPrice: 100, isChecked: false, notes: '' },
      { id: '7', name: 'Biscuits', category: 'Snacks', unit: 'packet', estimatedPrice: 60, isChecked: false, notes: '' }
    ],
    sweets: [
      { id: '1', name: 'Ghee', category: 'Dairy', unit: 'kg', estimatedPrice: 500, isChecked: false, notes: '' },
      { id: '2', name: 'Milk Powder', category: 'Dairy', unit: 'kg', estimatedPrice: 400, isChecked: false, notes: '' },
      { id: '3', name: 'Sugar', category: 'Sweeteners', unit: 'kg', estimatedPrice: 40, isChecked: false, notes: '' },
      { id: '4', name: 'Cardamom Powder', category: 'Spices', unit: '100g', estimatedPrice: 150, isChecked: false, notes: '' },
      { id: '5', name: 'Almonds', category: 'Dry Fruits', unit: 'kg', estimatedPrice: 700, isChecked: false, notes: '' },
      { id: '6', name: 'Silver Foil', category: 'Decoration', unit: 'packet', estimatedPrice: 200, isChecked: false, notes: '' }
    ],
    snacks: [ // Added snacks with example data
      { id: '1', name: 'Potatoes', category: 'Vegetables', unit: 'kg', estimatedPrice: 30, isChecked: false, notes: '' },
      { id: '2', name: 'Besan (Gram Flour)', category: 'Flour & Grains', unit: 'kg', estimatedPrice: 70, isChecked: false, notes: '' },
      { id: '3', name: 'Chaat Masala', category: 'Spices', unit: 'kg', estimatedPrice: 180, isChecked: false, notes: '' },
      { id: '4', name: 'Refined Oil', category: 'Oil', unit: 'liter', estimatedPrice: 110, isChecked: false, notes: '' },
      { id: '5', name: 'Salt', category: 'Seasoning', unit: 'kg', estimatedPrice: 20, isChecked: false, notes: '' },
    ],
    juice: [ // Added juice with example data
      { id: '1', name: 'Oranges', category: 'Fruits', unit: 'kg', estimatedPrice: 70, isChecked: false, notes: '' },
      { id: '2', name: 'Apples', category: 'Fruits', unit: 'kg', estimatedPrice: 100, isChecked: false, notes: '' },
      { id: '3', name: 'Sugar', category: 'Sweeteners', unit: 'kg', estimatedPrice: 40, isChecked: false, notes: '' },
      { id: '4', name: 'Ice', category: 'Other', unit: 'kg', estimatedPrice: 10, isChecked: false, notes: '' },
      { id: '5', name: 'Disposable Glasses', category: 'Packaging', unit: 'packet', estimatedPrice: 90, isChecked: false, notes: '' },
    ],
    custom: []
  };

  const [checklists, setChecklists] = useState(defaultChecklists);

  const currentChecklist = checklists[selectedVendorType] || [];
  const totalItems = currentChecklist.length;
  const checkedItems = currentChecklist.filter(item => item.isChecked).length;
  const totalEstimatedCost = currentChecklist.reduce((sum, item) => sum + item.estimatedPrice, 0);
  const checkedCost = currentChecklist.filter(item => item.isChecked).reduce((sum, item) => sum + item.estimatedPrice, 0);

  const toggleItem = (id: string) => {
    setChecklists(prev => ({
      ...prev,
      [selectedVendorType]: prev[selectedVendorType].map(item =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    }));
  };

  const updateNotes = (id: string, notes: string) => {
    setChecklists(prev => ({
      ...prev,
      [selectedVendorType]: prev[selectedVendorType].map(item =>
        item.id === id ? { ...item, notes } : item
      )
    }));
  };

  const addCustomItem = () => {
    if (!customItem.name.trim()) return;

    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      name: customItem.name,
      category: customItem.category || 'Other',
      unit: customItem.unit || 'piece',
      estimatedPrice: customItem.price,
      isChecked: false,
      notes: ''
    };

    setChecklists(prev => ({
      ...prev,
      [selectedVendorType]: [...prev[selectedVendorType], newItem]
    }));

    setCustomItem({ name: '', category: '', unit: '', price: 0 });
    setShowAddForm(false);
  };

  const removeItem = (id: string) => {
    setChecklists(prev => ({
      ...prev,
      [selectedVendorType]: prev[selectedVendorType].filter(item => item.id !== id)
    }));
  };

  const downloadPDF = async () => {
    const element = document.getElementById('checklist-content');
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const vendorTypeName = vendorTypes.find(v => v.id === selectedVendorType)?.name || 'Custom';
    pdf.save(`${vendorTypeName}_Checklist_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const categories = Array.from(new Set(currentChecklist.map(item => item.category)));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Raw Material Checklist
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Organize your shopping list by vendor type and never miss essential items
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-[#34699a] hover:bg-[#2c5882] text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Add Item</span>
            </button>
            
            <button
              onClick={downloadPDF}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Vendor Types */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Vendor Types
              </h3>
              <div className="space-y-2">
                {vendorTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedVendorType(type.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                      selectedVendorType === type.id
                        ? 'bg-[#EBF2F7] dark:bg-[#2A4D69] text-[#34699a] dark:text-[#9FBEDA]' // Primary blue for selected state
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{type.icon}</span>
                    <span className="font-medium">{type.name}</span>
                  </button>
                ))}
              </div>

              {/* Progress Summary */}
              {currentChecklist.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Progress Summary
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Items</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {checkedItems}/{totalItems}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-[#34699a] h-2 rounded-full transition-all duration-300" // Progress bar in primary blue
                        style={{ width: `${totalItems > 0 ? (checkedItems / totalItems) * 100 : 0}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Est. Cost</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ₹{checkedCost}/₹{totalEstimatedCost}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div id="checklist-content" className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              {/* Checklist Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[#EBF2F7] dark:bg-[#2A4D69] rounded-lg flex items-center justify-center"> {/* Background for icon in accent color */}
                      <Utensils className="w-6 h-6 text-[#34699a] dark:text-[#9FBEDA]" /> {/* Icon color */}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {vendorTypes.find(v => v.id === selectedVendorType)?.name} Checklist
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {totalItems} items • Est. ₹{totalEstimatedCost}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#34699a]"> {/* Percentage in primary blue */}
                      {totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0}%
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Complete</div>
                  </div>
                </div>
              </div>

              {/* Checklist Items */}
              <div className="p-6">
                {categories.length > 0 ? (
                  categories.map(category => {
                    const categoryItems = currentChecklist.filter(item => item.category === category);
                    return (
                      <div key={category} className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                          <span className="w-2 h-2 bg-[#34699a] rounded-full mr-3"></span> {/* Category bullet in primary blue */}
                          {category}
                        </h3>
                        <div className="space-y-3">
                          {categoryItems.map(item => (
                            <div
                              key={item.id}
                              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                                item.isChecked
                                  ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/20'
                              }`}
                            >
                              <div className="flex items-start space-x-4">
                                <button
                                  onClick={() => toggleItem(item.id)}
                                  className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                    item.isChecked
                                      ? 'border-green-500 bg-green-500' // Checked state remains green
                                      : 'border-gray-300 dark:border-gray-600 hover:border-[#34699a] hover:bg-[#EBF2F7] dark:hover:bg-[#2A4D69]' // Hover state in primary blue
                                  }`}
                                >
                                  {item.isChecked && (
                                    <Check className="w-4 h-4 text-white" />
                                  )}
                                </button>
                                
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className={`font-medium ${
                                      item.isChecked
                                        ? 'text-green-800 dark:text-green-200 line-through'
                                        : 'text-gray-900 dark:text-white'
                                    }`}>
                                      {item.name}
                                    </h4>
                                    <div className="flex items-center space-x-3">
                                      <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {item.unit}
                                      </span>
                                      <span className="font-semibold text-[#34699a] dark:text-[#9FBEDA]"> {/* Estimated price in primary blue */}
                                        ₹{item.estimatedPrice}
                                      </span>
                                      {selectedVendorType === 'custom' && (
                                        <button
                                          onClick={() => removeItem(item.id)}
                                          className="text-red-500 hover:text-red-700"
                                        >
                                          <X className="w-4 h-4" />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <input
                                    type="text"
                                    placeholder="Add notes (e.g., preferred brand, quantity needed)..."
                                    value={item.notes}
                                    onChange={(e) => updateNotes(item.id, e.target.value)}
                                    className="w-full text-sm bg-transparent border border-gray-200 dark:border-gray-600 rounded px-3 py-2 focus:ring-2 focus:ring-[#34699a] focus:border-transparent" // Focus ring in primary blue
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      No items in this checklist
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Add items to get started with your checklist
                    </p>
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="bg-[#34699a] hover:bg-[#2c5882] text-white px-6 py-2 rounded-lg" // Button in primary blue
                    >
                      Add First Item
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Add Item Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Add New Item
              </h3>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Item name"
                  value={customItem.name}
                  onChange={(e) => setCustomItem(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#34699a] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" // Focus ring in primary blue
                />
                
                <input
                  type="text"
                  placeholder="Category"
                  value={customItem.category}
                  onChange={(e) => setCustomItem(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#34699a] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" // Focus ring in primary blue
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Unit (kg, liter, etc.)"
                    value={customItem.unit}
                    onChange={(e) => setCustomItem(prev => ({ ...prev, unit: e.target.value }))}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#34699a] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" // Focus ring in primary blue
                  />
                  
                  <input
                    type="number"
                    placeholder="Estimated price"
                    value={customItem.price || ''}
                    onChange={(e) => setCustomItem(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#34699a] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" // Focus ring in primary blue
                  />
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={addCustomItem}
                  className="flex-1 bg-[#34699a] hover:bg-[#2c5882] text-white py-3 rounded-lg font-medium transition-colors duration-200" // Button in primary blue
                >
                  Add Item
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
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

export default ChecklistPage;