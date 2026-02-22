// routes/admin.routes.js
import express from 'express';
import bcrypt from 'bcryptjs'; // Assuming you are using bcrypt for hashing
import User from '../models/Users.js'; // Your User model to check against the DB

const router = express.Router();

// Verify Admin Password
router.post('/verify-admin-password', async (req, res) => {
  const { adminPassword } = req.body;

  try {
    // Fetch the admin user from the database (make sure this is the correct admin)
    const admin = await User.findOne({ role: 'admin' });

    if (!admin) {
      return res.status(404).json({ msg: 'Admin not found' });
    }

    // Compare the provided admin password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(adminPassword, admin.password);

    if (isPasswordValid) {
      return res.status(200).json({ msg: 'Admin password is valid' });
    } else {
      return res.status(403).json({ msg: 'Incorrect admin password' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

export default router;