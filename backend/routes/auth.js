const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, phone, password } = req.body;

  // Validation
  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ message: 'Name is required' });
  }

  if (!email && !phone) {
    return res.status(400).json({ message: 'Please provide either an email or a phone number' });
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  try {
    const trimmedEmail = email ? email.toLowerCase().trim() : undefined;
    const trimmedPhone = phone ? phone.trim() : undefined;

    // Check for existing user
    if (trimmedEmail) {
      const existingEmailUser = await User.findOne({ email: trimmedEmail });
      if (existingEmailUser) {
        return res.status(400).json({ message: 'This email is already registered' });
      }
    }

    if (trimmedPhone) {
      const existingPhoneUser = await User.findOne({ phone: trimmedPhone });
      if (existingPhoneUser) {
        return res.status(400).json({ message: 'This phone number is already registered' });
      }
    }

    const userPayload = {
      name: name.trim(),
      password,
    };
    if (trimmedEmail) userPayload.email = trimmedEmail;
    if (trimmedPhone) userPayload.phone = trimmedPhone;

    const user = await User.create(userPayload);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'This email or phone number is already registered' });
    }
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: 'Please provide email/phone and password' });
  }

  try {
    const normalizedIdentifier = identifier.trim();
    const user = await User.findOne({
      $or: [
        { email: normalizedIdentifier.toLowerCase() },
        { phone: normalizedIdentifier },
      ],
    });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        selectedLanguage: user.selectedLanguage,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email/phone or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;