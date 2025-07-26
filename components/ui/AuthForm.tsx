'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/auth-context';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { Alert, AlertDescription } from './alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Loader2 } from 'lucide-react';

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  city: string;
  userType: string;
}

interface WholesalerData {
  iid: string;
  businessName: string;
  area: string;
  city: string;
  rating: number;
  reviews: number;
  category: string;
  distance: number;
  image: string;
  specialties: string;
  openNow: boolean;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  avatar: string;
  createdAt: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
  errors?: string[];
}

export default function AuthForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Form states
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState<SignupData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    userType: 'vendor'
  });

  const [wholesalerData, setWholesalerData] = useState<WholesalerData>({
    iid: '',
    businessName: '',
    area: '',
    city: '',
    rating: 0,
    reviews: 0,
    category: '',
    distance: 0,
    image: '',
    specialties: '',
    openNow: false
  });

  const [showWholesalerFields, setShowWholesalerFields] = useState<boolean>(false);
  const [signupStep, setSignupStep] = useState<number>(1);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (!loginData.email || !loginData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginData.email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data: AuthResponse = await response.json();

      if (response.ok && data.success) {
        setSuccess('Login successful!');
        
        // Use auth context to handle authentication state
        if (data.user && data.token) {
          login(data.user, data.token);
        }
        
        // Redirect to homepage after successful login
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validate required fields
    if (!signupData.name || !signupData.email || !signupData.password || !signupData.city) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupData.email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Validate passwords match
    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Basic password validation
    if (signupData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    // Validate wholesaler fields if user is wholesaler
    if (signupData.userType === 'wholesaler') {
      if (!wholesalerData.businessName || !wholesalerData.area || !wholesalerData.category) {
        setError('Please fill in all wholesaler business details');
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: signupData.name,
          email: signupData.email,
          password: signupData.password,
          city: signupData.city,
          userType: signupData.userType,
          wholesalerData: signupData.userType === 'wholesaler' ? wholesalerData : undefined
        }),
      });

      const data: AuthResponse = await response.json();

      if (response.ok && data.success) {
        setSuccess('Account created successfully! Redirecting to homepage...');
        
        // Use auth context if user data is provided
        if (data.user && data.token) {
          login(data.user, data.token);
        }
        
        // Redirect to homepage after a short delay
        setTimeout(() => {
          router.push('/');
        }, 2000);
        
        // Clear signup form
        setSignupData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          city: '',
          userType: 'vendor'
        });
        setWholesalerData({
          iid: '',
          businessName: '',
          area: '',
          city: '',
          rating: 0,
          reviews: 0,
          category: '',
          distance: 0,
          image: '',
          specialties: '',
          openNow: false
        });
        setShowWholesalerFields(false);
        setSignupStep(1);
      } else {
        if (data.errors && data.errors.length > 0) {
          setError(data.errors.join(', '));
        } else {
          setError(data.message || 'Signup failed');
        }
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    formType: 'login' | 'signup' | 'wholesaler',
    field: string
  ) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    
    if (formType === 'login') {
      setLoginData(prev => ({ ...prev, [field]: value }));
    } else if (formType === 'signup') {
      setSignupData(prev => ({ ...prev, [field]: value }));
      
      // Reset wholesaler fields when user type changes
      if (field === 'userType') {
        setShowWholesalerFields(false);
        setWholesalerData({
          iid: '',
          businessName: '',
          area: '',
          city: '',
          rating: 0,
          reviews: 0,
          category: '',
          distance: 0,
          image: '',
          specialties: '',
          openNow: false
        });
      }
    } else if (formType === 'wholesaler') {
      setWholesalerData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleAddWholesalerFields = () => {
    setShowWholesalerFields(true);
  };

  const handleRemoveWholesalerFields = () => {
    setShowWholesalerFields(false);
    setWholesalerData({
      iid: '',
      businessName: '',
      area: '',
      city: '',
      rating: 0,
      reviews: 0,
      category: '',
      distance: 0,
      image: '',
      specialties: '',
      openNow: false
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-orange-600">Welcome to Bazario</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            {/* Sign In Tab */}
            <TabsContent value="signin">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={(e) => handleInputChange(e, 'login', 'email')}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => handleInputChange(e, 'login', 'password')}
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </TabsContent>
            
            {/* Sign Up Tab */}
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={signupData.name}
                    onChange={(e) => handleInputChange(e, 'signup', 'name')}
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-usertype">User Type</Label>
                  <Select
                    value={signupData.userType}
                    onValueChange={(value) => handleInputChange({ target: { value } } as any, 'signup', 'userType')}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vendor">Vendor</SelectItem>
                      <SelectItem value="wholesaler">Wholesaler</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-city">City</Label>
                  <Input
                    id="signup-city"
                    type="text"
                    placeholder="Enter your city"
                    value={signupData.city}
                    onChange={(e) => handleInputChange(e, 'signup', 'city')}
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={signupData.email}
                    onChange={(e) => handleInputChange(e, 'signup', 'email')}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password (min 6 characters)"
                    value={signupData.password}
                    onChange={(e) => handleInputChange(e, 'signup', 'password')}
                    required
                    disabled={isLoading}
                    minLength={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                  <Input
                    id="signup-confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    value={signupData.confirmPassword}
                    onChange={(e) => handleInputChange(e, 'signup', 'confirmPassword')}
                    required
                    disabled={isLoading}
                  />
                </div>
                
                {/* Wholesaler Fields */}
                {signupData.userType === 'wholesaler' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="business-name">Business Name</Label>
                      <Input
                        id="business-name"
                        type="text"
                        placeholder="Enter your business name"
                        value={wholesalerData.businessName}
                        onChange={(e) => handleInputChange(e, 'wholesaler', 'businessName')}
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="business-area">Business Area</Label>
                      <Input
                        id="business-area"
                        type="text"
                        placeholder="Enter your business area"
                        value={wholesalerData.area}
                        onChange={(e) => handleInputChange(e, 'wholesaler', 'area')}
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        type="text"
                        placeholder="Enter your business category"
                        value={wholesalerData.category}
                        onChange={(e) => handleInputChange(e, 'wholesaler', 'category')}
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="specialties">Specialties</Label>
                      <Input
                        id="specialties"
                        type="text"
                        placeholder="Enter your specialties"
                        value={wholesalerData.specialties}
                        onChange={(e) => handleInputChange(e, 'wholesaler', 'specialties')}
                        disabled={isLoading}
                      />
                    </div>
                  </>
                )}
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          {/* Error/Success Messages */}
          {error && (
            <Alert className="mt-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className="mt-4 border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">
                {success}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
