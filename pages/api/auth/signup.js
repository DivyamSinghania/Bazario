import dbConnect from '../../../lib/contexts/mongodb.js';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { name, email, password, city, userType, wholesalerData } = req.body;

    // Validate required fields
    if (!name || !email || !password || !city || !userType) {
      return res.status(400).json({
        message: 'Please provide name, email, password, city, and user type',
      });
    }

    // Validate user type
    if (!['vendor', 'wholesaler'].includes(userType)) {
      return res.status(400).json({
        message: 'User type must be either vendor or wholesaler',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists with this email',
      });
    }

    // Create new user
    const userData = {
      name,
      email,
      password,
      city,
      userType,
    };

    // Add wholesaler data if user is a wholesaler and data is provided
    if (userType === 'wholesaler' && wholesalerData) {
      userData.wholesalerData = {
        iid: wholesalerData.iid || '',
        businessName: wholesalerData.businessName || '',
        area: wholesalerData.area || '',
        city: wholesalerData.city || '',
        rating: Number(wholesalerData.rating) || 0,
        reviews: Number(wholesalerData.reviews) || 0,
        category: wholesalerData.category || '',
        distance: Number(wholesalerData.distance) || 0,
        image: wholesalerData.image || '',
        specialties: wholesalerData.specialties || '',
        openNow: Boolean(wholesalerData.openNow) || false,
      };
    }

    const user = await User.create(userData);

    // Remove password from response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      city: user.city,
      userType: user.userType,
      wholesalerData: user.wholesalerData,
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
    console.error('Signup error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Validation error',
        errors,
      });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'User already exists with this email',
      });
    }

    res.status(500).json({
      message: 'Internal server error',
    });
  }
}
