const Item = require('../models/itemModel');
const mongoose = require('mongoose');
const userModel = require('../models/userModel');

// Get all items
const getItems = async (req, res) => {

  //console.log("user: ", req);
  try {
    const items = await Item.find({}).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'get Server errorrrrr' });
  }
};
// get items by user
const getItemsByUser = async (req, res) => {
  const userId = req.user._id;
  console.log('inside getItemsByUser');
  console.log('user: ', String(userId));

  try {
    const items = await Item.find({ user: String(userId) }); // Construct the query object
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// get items not by user
const getItemsNotByUser = async (req, res) => {
  console.log('....inside getItemsNotByUser');

  const userId = req.user._id;
  console.log('user: ', String(userId));

  try {
    const items = await Item.find({ user: { $ne: String(userId) } }); // Query for items where the user is not the specified user
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single item
const getItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such item' });
  }

  try {
    const item = await Item.findById(id);
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

const createItem = async (req, res) => {
  try {
    console.log("inside createItem:");
    const { brand, model, year, description, myFile } = req.body.item;

    const user = req.body.user;
    console.log('req.body.user.: ', user)
    console.log('{user}: ', { user })

    const newItem = await Item.create({ brand, model, year, description, user, 'img.data': myFile });
    console.log("New item created:", newItem);

    res.status(200).json(newItem);
  } catch (error) {
    res.status(409).json(error);
    console.log(error);
  }
};


// Delete an item, DELETE http://localhost:4000/api/item/:id
const deleteItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such item' });
  }

  try {
    const item = await Item.findOneAndDelete({ _id: id });
    if (!item) {
      return res.status(404).json({ error: 'No such item' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update an item , PUT http://localhost:4000/api/item/:id 
const updateItem = async (req, res) => {
  const { id } = req.params;
  console.log("inside updateItem: ", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such item' });
  }
  try {
    const item = await Item.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
    if (!item) {
      return res.status(404).json({ error: 'No such item' });
    }
    console.log("updated item: ", item);
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  deleteItem,
  updateItem,
  getItemsByUser,
  getItemsNotByUser
};
