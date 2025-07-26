import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
  phone: {
    type: String,
    unique: true,
    sparse: true, // Allow null values but ensure uniqueness when present
    match: [
      /^\+?[1-9]\d{1,14}$/,
      'Please provide a valid phone number',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false, // Don't include password in queries by default
  },
  city: {
    type: String,
    required: [true, 'Please provide a city'],
    maxlength: [100, 'City name cannot be more than 100 characters'],
  },
  userType: {
    type: String,
    enum: ['vendor', 'wholesaler'],
    required: [true, 'Please specify user type'],
  },
  wholesalerData: {
    iid: {
      type: String,
      default: '',
    },
    businessName: {
      type: String,
      default: '',
    },
    area: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: {
      type: Number,
      min: 0,
      default: 0,
    },
    category: {
      type: String,
      default: '',
    },
    distance: {
      type: Number,
      min: 0,
      default: 0,
    },
    image: {
      type: String,
      default: '',
    },
    specialties: {
      type: String,
      default: '',
    },
    openNow: {
      type: Boolean,
      default: false,
    },
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    // Hash password with cost of 12
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Update the updatedAt field before saving
UserSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Instance method to check password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Static method to find user by email and include password
UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select('+password');
  
  if (!user) {
    throw new Error('Invalid login credentials');
  }

  const isMatch = await user.comparePassword(password);
  
  if (!isMatch) {
    throw new Error('Invalid login credentials');
  }

  return user;
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
