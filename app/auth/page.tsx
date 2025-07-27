// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Phone, User, MapPin, Users } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { toast } from 'sonner';

// export default function AuthPage() {
//   const [step, setStep] = useState<'phone' | 'profile'>('phone');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [loading, setLoading] = useState(false);

//   const [profileData, setProfileData] = useState({
//     name: '',
//     city: '',
//     userType: 'vendor' as 'vendor' | 'helper',
//   });

//   const router = useRouter();

//   const handlePhoneSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!phoneNumber.trim()) {
//       toast.error('Please enter a valid phone number');
//       return;
//     }

//     setLoading(true);
//     try {
//       const formattedPhone = phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`;
//       setPhoneNumber(formattedPhone);
//       setStep('profile');
//       toast.success('Phone number accepted!');
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('Failed to proceed. Try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCompleteProfile = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!profileData.name.trim() || !profileData.city.trim()) {
//       toast.error('Please fill in all fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch('/api/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: profileData.name,
//           phone: phoneNumber,
//           city: profileData.city,
//           userType: profileData.userType,
//         }),
//       });

//       const data = await res.json();
      
//       if (!res.ok) {
//         throw new Error(data.message || 'API error');
//       }

//       if (data.message.includes('Welcome back')) {
//         toast.success('Welcome back! You are now logged in.');
//       } else {
//         toast.success('Account created successfully!');
//       }
      
//       router.push('/');
//     } catch (error) {
//       console.error('Error creating profile:', error);
//       toast.error('Failed to create profile. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl font-bold">Welcome to VendorHub</CardTitle>
//           <CardDescription>
//             {step === 'phone' && 'Enter your phone number to get started'}
//             {step === 'profile' && 'Complete your profile'}
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           {step === 'phone' && (
//             <form onSubmit={handlePhoneSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="phone">Phone Number</Label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="phone"
//                     type="tel"
//                     placeholder="Enter your phone number"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                     className="pl-10"
//                     maxLength={10}
//                   />
//                 </div>
//                 <p className="text-xs text-muted-foreground">
//                   We'll use your phone to identify you
//                 </p>
//               </div>

//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? 'Processing...' : 'Continue'}
//               </Button>
//             </form>
//           )}

//           {step === 'profile' && (
//             <form onSubmit={handleCompleteProfile} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Full Name</Label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="name"
//                     type="text"
//                     placeholder="Enter your full name"
//                     value={profileData.name}
//                     onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
//                     className="pl-10"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="city">City</Label>
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="city"
//                     type="text"
//                     placeholder="Enter your city"
//                     value={profileData.city}
//                     onChange={(e) => setProfileData(prev => ({ ...prev, city: e.target.value }))}
//                     className="pl-10"
//                   />
//                 </div>
//               </div>

              // <div className="space-y-3">
              //   <Label>User Type</Label>
              //   <RadioGroup
              //     value={profileData.userType}
              //     onValueChange={(value) => setProfileData(prev => ({ ...prev, userType: value as 'vendor' | 'helper' }))}
              //   >
              //     <div className="flex items-center space-x-2">
              //       <RadioGroupItem value="vendor" id="vendor" />
              //       <Label htmlFor="vendor" className="flex items-center cursor-pointer">
              //         <Users className="w-4 h-4 mr-2" />
              //         Vendor (Business Owner)
              //       </Label>
              //     </div>
              //     <div className="flex items-center space-x-2">
              //       <RadioGroupItem value="helper" id="helper" />
              //       <Label htmlFor="helper" className="flex items-center cursor-pointer">
              //         <User className="w-4 h-4 mr-2" />
              //         Seller
              //       </Label>
              //     </div>
              //   </RadioGroup>
              // </div>

//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? 'Creating Account...' : 'Complete Profile'}
//               </Button>
//             </form>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebaseClient';
import { signUp } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Mail, Lock, User, AlertCircle,Users } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'vendor' | 'wholesaler' | ''>('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (!role) {
  setError('Please select a role');
  return;
}

    setLoading(true);

    try {
      await signUp(email, password, name, role);
      router.push('/');
    } catch (error: any) {
      setError(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return null; // Will redirect
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Join FinanceEd</CardTitle>
          <CardDescription>
            Create your account to start learning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">User Type</Label>
              <div className="relative">
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'vendor' | 'wholesaler')}
                  required
                  className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select user type</option>
                  <option value="vendor">Vendor (Business Owner)</option>
                  <option value="wholesaler">Wholesaler (Seller)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
