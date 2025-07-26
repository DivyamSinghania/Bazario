'use client';

import { useState } from 'react';
import { Store, Package, Plus, Edit, Trash2, Upload, MapPin, Clock, Phone, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const categories = ['Spices', 'Vegetables', 'Oils & Ghee', 'Packaging', 'Grains', 'Dairy', 'Fruits', 'Beverages'];

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: string;
  image: string;
  description: string;
  stock: number;
}

interface ShopInfo {
  name: string;
  description: string;
  category: string;
  phone: string;
  address: string;
  area: string;
  city: string;
  timings: string;
  specialties: string[];
  image: string;
}

const SellerDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('shop-setup');
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [shopInfo, setShopInfo] = useState<ShopInfo>({
    name: '',
    description: '',
    category: '',
    phone: '',
    address: '',
    area: '',
    city: '',
    timings: '',
    specialties: [],
    image: ''
  });

  const [products, setProducts] = useState<Product[]>([]);

  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    unit: 'per kg',
    category: '',
    image: '',
    description: '',
    stock: 0
  });

  const [newSpecialty, setNewSpecialty] = useState('');

  const handleShopInfoChange = (field: keyof ShopInfo, value: string) => {
    setShopInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSpecialty = () => {
    if (newSpecialty.trim() && !shopInfo.specialties.includes(newSpecialty.trim())) {
      setShopInfo(prev => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()]
      }));
      setNewSpecialty('');
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    setShopInfo(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }));
  };

  const handleSaveShop = () => {
    if (!shopInfo.name || !shopInfo.category || !shopInfo.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (name, category, phone).",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Shop Updated",
      description: "Your shop information has been saved successfully.",
    });
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required product fields.",
        variant: "destructive"
      });
      return;
    }

    const product: Product = {
      ...newProduct,
      id: Date.now().toString()
    };

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...product, id: editingProduct.id } : p));
      toast({
        title: "Product Updated",
        description: `${product.name} has been updated successfully.`,
      });
    } else {
      setProducts(prev => [...prev, product]);
      toast({
        title: "Product Added",
        description: `${product.name} has been added to your inventory.`,
      });
    }

    setNewProduct({
      name: '',
      price: 0,
      unit: 'per kg',
      category: '',
      image: '',
      description: '',
      stock: 0
    });
    setEditingProduct(null);
    setIsProductDialogOpen(false);
  };

  const handleEditProduct = (product: Product) => {
    setNewProduct({
      name: product.name,
      price: product.price,
      unit: product.unit,
      category: product.category,
      image: product.image,
      description: product.description,
      stock: product.stock
    });
    setEditingProduct(product);
    setIsProductDialogOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    toast({
      title: "Product Deleted",
      description: "The product has been removed from your inventory.",
    });
  };

  const ProductDialog = () => (
    <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="product-name">Product Name *</Label>
            <Input
              id="product-name"
              value={newProduct.name}
              onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Red Chili Powder"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="product-price">Price *</Label>
              <Input
                id="product-price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="product-unit">Unit</Label>
              <Select value={newProduct.unit} onValueChange={(value) => setNewProduct(prev => ({ ...prev, unit: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="per kg">per kg</SelectItem>
                  <SelectItem value="per piece">per piece</SelectItem>
                  <SelectItem value="per dozen">per dozen</SelectItem>
                  <SelectItem value="per liter">per liter</SelectItem>
                  <SelectItem value="per pack">per pack</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="product-category">Category *</Label>
            <Select value={newProduct.category} onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="product-stock">Stock Quantity</Label>
            <Input
              id="product-stock"
              type="number"
              value={newProduct.stock}
              onChange={(e) => setNewProduct(prev => ({ ...prev, stock: Number(e.target.value) }))}
              placeholder="0"
            />
          </div>

          <div>
            <Label htmlFor="product-image">Image URL</Label>
            <Input
              id="product-image"
              value={newProduct.image}
              onChange={(e) => setNewProduct(prev => ({ ...prev, image: e.target.value }))}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <Label htmlFor="product-description">Description</Label>
            <Textarea
              id="product-description"
              value={newProduct.description}
              onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Product description..."
              rows={3}
            />
          </div>

          <Button onClick={handleAddProduct} className="w-full bg-[#34699a] hover:bg-[#2c5882] text-white">
            {editingProduct ? 'Update Product' : 'Add Product'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
          <p className="text-muted-foreground">Manage your shop and products</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* --- Tabs List with Gradient --- */}
          <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-[#34699a] to-[#2c5882] text-white">
            <TabsTrigger value="shop-setup" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-[#34699a] data-[state=active]:shadow-sm data-[state=active]:rounded-md">
              <Store className="w-4 h-4" />
              Shop Setup
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-[#34699a] data-[state=active]:shadow-sm data-[state=active]:rounded-md">
              <Package className="w-4 h-4" />
              Products ({products.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shop-setup" className="space-y-6">
            <Card>
              {/* --- Card Header for Shop Info with Blue Background --- */}
              <CardHeader className="bg-[#34699a] text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Store className="w-5 h-5" />
                  Shop Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="shop-name">Shop Name *</Label>
                    <Input
                      id="shop-name"
                      value={shopInfo.name}
                      onChange={(e) => handleShopInfoChange('name', e.target.value)}
                      placeholder="e.g., Sharma Spice Center"
                    />
                  </div>
                  <div>
                    <Label htmlFor="shop-category">Category *</Label>
                    <Select value={shopInfo.category} onValueChange={(value) => handleShopInfoChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="shop-description">Description</Label>
                  <Textarea
                    id="shop-description"
                    value={shopInfo.description}
                    onChange={(e) => handleShopInfoChange('description', e.target.value)}
                    placeholder="Tell customers about your shop..."
                    rows={4}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="shop-phone">Phone Number *</Label>
                    <Input
                      id="shop-phone"
                      value={shopInfo.phone}
                      onChange={(e) => handleShopInfoChange('phone', e.target.value)}
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <Label htmlFor="shop-timings">Operating Hours</Label>
                    <Input
                      id="shop-timings"
                      value={shopInfo.timings}
                      onChange={(e) => handleShopInfoChange('timings', e.target.value)}
                      placeholder="Mon-Sat: 9AM-8PM"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="shop-address">Full Address</Label>
                  <Textarea
                    id="shop-address"
                    value={shopInfo.address}
                    onChange={(e) => handleShopInfoChange('address', e.target.value)}
                    placeholder="Complete address with pincode"
                    rows={2}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="shop-area">Area/Locality</Label>
                    <Input
                      id="shop-area"
                      value={shopInfo.area}
                      onChange={(e) => handleShopInfoChange('area', e.target.value)}
                      placeholder="e.g., Chandni Chowk"
                    />
                  </div>
                  <div>
                    <Label htmlFor="shop-city">City</Label>
                    <Input
                      id="shop-city"
                      value={shopInfo.city}
                      onChange={(e) => handleShopInfoChange('city', e.target.value)}
                      placeholder="e.g., Delhi"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="shop-image">Shop Image URL</Label>
                  <Input
                    id="shop-image"
                    value={shopInfo.image}
                    onChange={(e) => handleShopInfoChange('image', e.target.value)}
                    placeholder="https://example.com/shop-image.jpg"
                  />
                </div>

                <div>
                  <Label>Specialties</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newSpecialty}
                      onChange={(e) => setNewSpecialty(e.target.value)}
                      placeholder="Add specialty (e.g., Organic, Wholesale)"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSpecialty()}
                    />
                    <Button onClick={handleAddSpecialty} size="sm" className="bg-[#34699a] hover:bg-[#2c5882] text-white">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {shopInfo.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="flex items-center gap-1">
                        {specialty}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 ml-1 text-gray-500 hover:text-gray-700"
                          onClick={() => handleRemoveSpecialty(specialty)}
                        >
                          ×
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button onClick={handleSaveShop} className="w-full md:w-auto bg-[#34699a] hover:bg-[#2c5882] text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Shop Information
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Products</h2>
              <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => {
                    setEditingProduct(null);
                    setNewProduct({
                      name: '',
                      price: 0,
                      unit: 'per kg',
                      category: '',
                      image: '',
                      description: '',
                      stock: 0
                    });
                  }} className="bg-[#34699a] hover:bg-[#2c5882] text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <ProductDialog />
              </Dialog>
            </div>

            {products.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No products yet</h3>
                  <p className="text-muted-foreground mb-4">Start by adding your first product to your inventory</p>
                  <Button onClick={() => setIsProductDialogOpen(true)} className="bg-[#34699a] hover:bg-[#2c5882] text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Product
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    {/* --- Product Card Header with Blue Background (Optional, but adds consistency) --- */}
                    <CardHeader className="bg-[#34699a] text-white py-2 rounded-t-lg">
                        <CardTitle className="text-base font-semibold truncate">{product.name}</CardTitle>
                    </CardHeader>
                    <div className="relative h-48 bg-cover bg-center bg-muted">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                      <p className="text-2xl font-bold text-primary mb-2">
                        ₹{product.price} <span className="text-sm text-muted-foreground font-normal">{product.unit}</span>
                      </p>
                      
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{product.category}</Badge>
                        <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
                      </div>
                      
                      {product.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SellerDashboard;