'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, User, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

export default function AuthPage() {
  const [step, setStep] = useState<'phone' | 'profile'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: '',
    city: '',
    userType: 'vendor' as 'vendor' | 'helper',
  });

  const router = useRouter();

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    try {
      const formattedPhone = phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`;
      setPhoneNumber(formattedPhone);
      setStep('profile');
      toast.success('Phone number accepted!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to proceed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData.name.trim() || !profileData.city.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: profileData.name,
          phone: phoneNumber,
          city: profileData.city,
          userType: profileData.userType,
        }),
      });

      if (!res.ok) throw new Error('API error');

      toast.success('Account created successfully!');
      router.push('/');
    } catch (error) {
      console.error('Error creating profile:', error);
      toast.error('Failed to create profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to VendorHub</CardTitle>
          <CardDescription>
            {step === 'phone' && 'Enter your phone number to get started'}
            {step === 'profile' && 'Complete your profile'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === 'phone' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10"
                    maxLength={10}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  We'll use your phone to identify you
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Processing...' : 'Continue'}
              </Button>
            </form>
          )}

          {step === 'profile' && (
            <form onSubmit={handleCompleteProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="city"
                    type="text"
                    placeholder="Enter your city"
                    value={profileData.city}
                    onChange={(e) => setProfileData(prev => ({ ...prev, city: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>User Type</Label>
                <RadioGroup
                  value={profileData.userType}
                  onValueChange={(value) => setProfileData(prev => ({ ...prev, userType: value as 'vendor' | 'helper' }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="vendor" id="vendor" />
                    <Label htmlFor="vendor" className="flex items-center cursor-pointer">
                      <Users className="w-4 h-4 mr-2" />
                      Vendor (Business Owner)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="helper" id="helper" />
                    <Label htmlFor="helper" className="flex items-center cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Seller
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating Account...' : 'Complete Profile'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
