const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth.middleware');
const Message = require('../models/message.model');

// Send a message
router.post('/', authMiddleware, async (req, res) => {
  try {
    const message = await Message.create({
      ...req.body,
      senderId: req.user.id
    });
    res.status(201).json({
      status: 'success',
      data: message
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// Get messages between two users
router.get('/conversation/:userId', authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.user.id, receiverId: req.params.userId },
        { senderId: req.params.userId, receiverId: req.user.id }
      ]
    })
    .sort({ sentAt: 1 })
    .populate('senderId', 'username')
    .populate('receiverId', 'username');

    res.json({
      status: 'success',
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Get all conversations for a user
router.get('/conversations', authMiddleware, async (req, res) => {
  try {
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { senderId: req.user.id },
            { receiverId: req.user.id }
          ]
        }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$senderId', req.user.id] },
              '$receiverId',
              '$senderId'
            ]
          },
          lastMessage: { $last: '$message' },
          lastMessageTime: { $last: '$sentAt' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          _id: 0,
          userId: '$user._id',
          username: '$user.username',
          lastMessage: 1,
          lastMessageTime: 1
        }
      }
    ]);

    res.json({
      status: 'success',
      data: conversations
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router; 