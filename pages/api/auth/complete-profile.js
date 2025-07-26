import dbConnect from "@/components/utils/dbconnect";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  await dbConnect();

  const { name, city, userType, email } = req.body;

  if (!name || !city || !userType || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { name, city, userType },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Profile updated", user });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
}
