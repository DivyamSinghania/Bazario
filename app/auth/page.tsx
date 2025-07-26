// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Phone, User, MapPin, Users } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { useAuth } from '@/lib/contexts/auth-context';
// import { toast } from 'sonner';
// import { ConfirmationResult } from 'firebase/auth';

// export default function AuthPage() {
//   const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  
//   const [profileData, setProfileData] = useState({
//     name: '',
//     city: '',
//     userType: 'vendor' as 'vendor' | 'helper',
//   });

//   const { signInWithPhone, verifyOTP } = useAuth();
//   const router = useRouter();

//   const handleSendOTP = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!phoneNumber.trim()) {
//       toast.error('Please enter a valid phone number');
//       return;
//     }

//     setLoading(true);
//     try {
//       const formattedPhone = phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`;
//       const result = await signInWithPhone(formattedPhone);
//       setConfirmationResult(result);
//       setStep('otp');
//       toast.success('OTP sent successfully!');
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       toast.error('Failed to send OTP. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOTP = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!otp.trim() || !confirmationResult) {
//       toast.error('Please enter the OTP');
//       return;
//     }

//     setLoading(true);
//     try {
//       // First check if user exists, if not, go to profile step
//       setStep('profile');
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       toast.error('Invalid OTP. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCompleteProfile = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!profileData.name.trim() || !profileData.city.trim() || !confirmationResult) {
//       toast.error('Please fill in all fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       await verifyOTP(confirmationResult, otp, {
//         name: profileData.name,
//         phone: phoneNumber,
//         city: profileData.city,
//         userType: profileData.userType,
//       });
      
//       toast.success('Account created successfully!');
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
//             {step === 'otp' && 'Enter the OTP sent to your phone'}
//             {step === 'profile' && 'Complete your profile'}
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           {step === 'phone' && (
//             <form onSubmit={handleSendOTP} className="space-y-4">
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
//                   We'll send you a verification code
//                 </p>
//               </div>
              
//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? 'Sending...' : 'Send OTP'}
//               </Button>
//             </form>
//           )}

//           {step === 'otp' && (
//             <form onSubmit={handleVerifyOTP} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="otp">Verification Code</Label>
//                 <Input
//                   id="otp"
//                   type="text"
//                   placeholder="Enter 6-digit OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   maxLength={6}
//                   className="text-center text-lg tracking-widest"
//                 />
//                 <p className="text-xs text-muted-foreground">
//                   OTP sent to {phoneNumber}
//                 </p>
//               </div>
              
//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? 'Verifying...' : 'Verify OTP'}
//               </Button>
              
//               <Button
//                 type="button"
//                 variant="ghost"
//                 className="w-full"
//                 onClick={() => setStep('phone')}
//               >
//                 Change Phone Number
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

//               <div className="space-y-3">
//                 <Label>User Type</Label>
//                 <RadioGroup
//                   value={profileData.userType}
//                   onValueChange={(value) => setProfileData(prev => ({ ...prev, userType: value as 'vendor' | 'helper' }))}
//                 >
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="vendor" id="vendor" />
//                     <Label htmlFor="vendor" className="flex items-center cursor-pointer">
//                       <Users className="w-4 h-4 mr-2" />
//                       Vendor (Business Owner)
//                     </Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="helper" id="helper" />
//                     <Label htmlFor="helper" className="flex items-center cursor-pointer">
//                       <User className="w-4 h-4 mr-2" />
//                       Helper (Staff/Employee)
//                     </Label>
//                   </div>
//                 </RadioGroup>
//               </div>
              
//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? 'Creating Account...' : 'Complete Profile'}
//               </Button>
//             </form>
//           )}

//           <div id="recaptcha-container" className="mt-4"></div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


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

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'API error');
      }

      if (data.message.includes('Welcome back')) {
        toast.success('Welcome back! You are now logged in.');
      } else {
        toast.success('Account created successfully!');
      }
      
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
                      Helper (Staff/Employee)
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
