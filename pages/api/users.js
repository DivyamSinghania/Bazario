import dbConnect from '../../lib/contexts/mongodb.js';
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { name, phone, city, userType } = req.body;

    // Validate required fields
    if (!name || !phone || !city || !userType) {
      return res.status(400).json({
        message: 'Please provide name, phone, city, and user type',
      });
    }

    // Validate user type
    if (!['vendor', 'helper'].includes(userType)) {
      return res.status(400).json({
        message: 'User type must be either vendor or helper',
      });
    }

    // Check if user already exists with this phone
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      // Return success with existing user instead of error
      const userResponse = {
        _id: existingUser._id,
        name: existingUser.name,
        phone: existingUser.phone,
        city: existingUser.city,
        userType: existingUser.userType,
        role: existingUser.role,
        isVerified: existingUser.isVerified,
        avatar: existingUser.avatar,
        createdAt: existingUser.createdAt,
      };

      return res.status(200).json({
        success: true,
        message: 'Welcome back! Logged in successfully.',
        user: userResponse,
      });
    }

    // Create new user with phone-based authentication
    const userData = {
      name,
      phone,
      city,
      userType: userType === 'helper' ? 'vendor' : userType, // Map helper to vendor for consistency
      email: `${phone.replace(/\+/g, '')}@bazario.com`, // Generate a valid placeholder email
      password: 'phone-auth-user', // Placeholder password for phone users
    };

    const user = await User.create(userData);

    // Remove password from response
    const userResponse = {
      _id: user._id,
      name: user.name,
      phone: user.phone,
      city: user.city,
      userType: user.userType,
      role: user.role,
      isVerified: user.isVerified,
      avatar: user.avatar,
      createdAt: user.createdAt,
    };

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: userResponse,
    });
  } catch (error) {
    console.error('User creation error:', error);
    console.error('Error details:', {
      name: error.name,
      code: error.code,
      message: error.message,
      keyPattern: error.keyPattern,
      keyValue: error.keyValue
    });
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors,
      });
    }

    // Handle duplicate key error (MongoDB duplicate)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const value = error.keyValue[field];
      return res.status(400).json({
        success: false,
        message: `User already exists with this ${field}: ${value}`,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}