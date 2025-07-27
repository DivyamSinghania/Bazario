'use client';

import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, AlertCircle } from 'lucide-react';
import { signIn, signUp, signInWithGoogle, setupRecaptcha, signInWithPhone } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
// import PhoneInput from 'react-phone-number-input';
// import 'react-phone-number-input/style.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'phone'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  // const [phone, setPhone] = useState('');
  // const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'register') {
        await signUp(email, password, name, role as 'vendor' | 'wholesaler');
      } else {
        await signIn(email, password);
      }
      onClose();
    } catch (error: any) {
      setError(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
      onClose();
    } catch (error: any) {
      setError(error.message || 'Google authentication failed');
    } finally {
      setLoading(false);
    }
  };

  // const handlePhoneAuth = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError('');
  //   setLoading(true);

  //   try {
  //     if (!confirmationResult) {
  //       if (!phone) {
  //         setError('Please enter a valid phone number');
  //         setLoading(false);
  //         return;
  //       }
  //       const recaptchaVerifier = setupRecaptcha('recaptcha-container');
  //       const result = await signInWithPhone(phone, recaptchaVerifier);
  //       setConfirmationResult(result);
  //       setError('');
  //     } else {
  //       if (!verificationCode) {
  //         setError('Please enter the verification code');
  //         setLoading(false);
  //         return;
  //       }
  //       await confirmationResult.confirm(verificationCode);
  //       onClose();
  //     }
  //   } catch (error: any) {
  //     setError(error.message || 'Phone authentication failed');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Phone Login'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* {mode === 'phone' ? (
            <form onSubmit={handlePhoneAuth} className="space-y-4">
              {!confirmationResult ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={setPhone}
                      defaultCountry="US"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    We'll send you a verification code via SMS
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="code">Verification Code</Label>
                    <Input
                      id="code"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      maxLength={6}
                      required
                    />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Enter the 6-digit code sent to {phone}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setConfirmationResult(null);
                      setVerificationCode('');
                      setPhone('');
                    }}
                    className="w-full"
                  >
                    Use Different Number
                  </Button>
                </>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Processing...' : confirmationResult ? 'Verify & Sign In' : 'Send Verification Code'}
              </Button>
            </form>
          ):*/}{(
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {mode === 'register' && (
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
              )}

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
              {mode === 'register' && (
  <>
    <div className="space-y-2">
      <Label htmlFor="role">User Type</Label>
      <div className="relative">
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select user type</option>
          <option value="vendor">Vendor (Business Owner)</option>
          <option value="wholesaler">Wholesaler (Seller)</option>
        </select>
      </div>
    </div>
  </>
)}


              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Processing...' : mode === 'register' ? 'Create Account' : 'Sign In'}
              </Button>
            </form>
          )}

          <div className="mt-6 space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleAuth}
              disabled={loading}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>

            {/* <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setMode('phone')}
              disabled={loading}
            >
              <Phone className="w-4 h-4 mr-2" />
              Continue with Phone
            </Button> */}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login');
                  setConfirmationResult(null);
                  
                  setError('');
                }}
                className="text-blue-600 hover:underline"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
            
            {mode !== 'phone' && (
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Or{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('phone');
                    setError('');
                  }}
                  className="text-blue-600 hover:underline"
                >
                  sign in with phone
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default AuthModal;