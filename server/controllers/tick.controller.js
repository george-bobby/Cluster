// Import necessary modules and User model
import User from '../models/userModel.js';

// Define the tickUser function
const tickUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);

    // Find the user by userId
    const user = await User.findById(userId);

    // If user is not found, return an error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Toggle the tick property of the user
    user.tick = !user.tick;

    // Save the updated user
    await user.save();

    // Respond with a success message and the updated user
    res.status(200).json({ message: 'User tick updated successfully', user });
  } catch (error) {
    // If any error occurs, respond with an error message
    console.error('Error ticking user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Export the tickUser function
export default tickUser;
