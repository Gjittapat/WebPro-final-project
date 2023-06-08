const RequestItem = require('../models/requestItemModel');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const getOneUser = require('./userController');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

// Get all requseted items 
const getRequestedItems = async (req, res) => {

  const user_id = req.user_id;

  try {
    const items = await RequestItem.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'get Server errorrrrr' });
  }
}

// Get pending items
const getPendingItems = async (req, res) => {
  try {
    const items = await RequestItem.find({ status: 'pending' }).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
// Get a single item
const getRequestedItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such item' });
  }

  try {
    const item = await RequestItem.findById(id);
    if (!item) {
      console.log("no such item")
      return res.status(404).json({ error: 'No such item' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST a new item
const createRequestItem = async (req, res) => {
  try {
    const { item } = req.body;

    console.log("req.user: ", req.user)
    console.log("req.user._id: ", req.user._id)

    const user = await User.findById(req.user._id);
    console.log("user: ", user);

    const newRequestItem = await RequestItem.create({ user, item });
    console.log("newReq email", newRequestItem.user.email)

    res.status(200).json({ message: 'Request item created successfully' });
  } catch (error) {
    res.status(409).json({ error: 'An error occurred' });
  }
};

// Delete an item
const deleteItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such item' });
  }
  try {
    await RequestItem.findByIdAndRemove(id);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

// Update an item to approved
const approveItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such item' });
  }

  try {
    const updatedItem = await RequestItem.findByIdAndUpdate(
      id,
      { status: 'approved' },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'No such item' });
    }

    res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
// Update an item to rejected
const rejectItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such item' });
  }

  try {
    const updatedItem = await RequestItem.findByIdAndUpdate(
      id,
      { status: 'rejected' },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'No such item' });
    }

    res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update an item to pending
const pendingItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such item' });
  }

  try {
    const updatedItem = await RequestItem.findByIdAndUpdate(
      id,
      { status: 'pending' },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'No such item' });
    }

    res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = {
  getRequestedItems,
  getRequestedItem,
  createRequestItem,
  deleteItem,
  approveItem,
  rejectItem,
  pendingItem,
  getPendingItems
};
