import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    // Fetch all users with userType 'wholesaler'
    const wholesalers = await User.find({ 
      userType: 'wholesaler' 
    }).select('-password'); // Exclude password field

    // Transform the data to match the expected format for the discovery page
    const transformedWholesalers = wholesalers.map(wholesaler => ({
      id: wholesaler._id.toString(),
      name: wholesaler.wholesalerData?.businessName || wholesaler.name,
      area: wholesaler.wholesalerData?.area || '',
      city: wholesaler.wholesalerData?.city || wholesaler.city,
      rating: wholesaler.wholesalerData?.rating || 0,
      reviews: wholesaler.wholesalerData?.reviews || 0,
      category: wholesaler.wholesalerData?.category || 'General',
      distance: wholesaler.wholesalerData?.distance || 0,
      image: wholesaler.wholesalerData?.image || 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: wholesaler.wholesalerData?.specialties ? 
        wholesaler.wholesalerData.specialties.split(',').map(s => s.trim()) : 
        ['Wholesale'],
      openNow: wholesaler.wholesalerData?.openNow || false,
      email: wholesaler.email,
      userCity: wholesaler.city,
      createdAt: wholesaler.createdAt
    }));

    res.status(200).json({
      success: true,
      data: transformedWholesalers,
      count: transformedWholesalers.length
    });

  } catch (error) {
    console.error('Error fetching wholesalers:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
