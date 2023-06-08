// collection controller
const Collection = require('../models/collectionModel');
const mongoose = require('mongoose');
// Get all collections
const getCollections = async (req, res) => {

    //console.log("user: ", req);
    try {
        const collections = await Collection.find({}).sort({ createdAt: -1 });
        res.status(200).json(collections);
    } catch (error) {
        res.status(500).json({ error: 'get Server errorrrrr' });
    }
};
// get collections by user
const getCollectionsByUser = async (req, res) => {
    const userId = req.user._id;
    // console.log('inside getCollectionsByUser');
    // console.log('user: ', String(userId));

    try {
        const collections = await Collection.find({ user: userId }); // Construct the query object
        res.status(200).json(collections);
        // console.log('collections: ', collections);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// get collections not by user
const getCollectionsNotByUser = async (req, res) => {
    console.log('inside getCollectionsNotByUser');

    const userId = req.user._id;
    // console.log('user: ', String(userId));

    try {
        const collections = await Collection.find({ user: { $ne: String(userId) } }); // Query for collections where the user is not the specified user
        res.status(200).json(collections);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get a single collection
const getCollection = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such collection' });
    }

    try {
        const collection = await Collection.findById(id);
        if (!collection) {
            console.log("no such collection")
            return res.status(404).json({ error: 'No such collection' });
        }
        res.status(200).json(collection);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// POST a new collection
const createCollection = async (req, res) => {
    try {
        console.log("inside createCollection:");
        // console.log("req.user: ", req.user);
        const { brand, model, year, description, img } = req.body;
        // console.log("img---: ", img);
        const user = req.user;
        const newCollection = await Collection.create({
            brand,
            model,
            year,
            description,
            user,
            'img.data': img.data  // Assign the img field with the data property
        });
        // console.log("New collection created:", newCollection);

        res.status(200).json(newCollection);
    } catch (error) {
        console.log('error in createCollection: ')
        res.status(409).json(error);
        console.log(error);
    }
};


// Delete an collection, DELETE http://localhost:4000/api/collection/:id
const deleteCollection = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such collection' });
    }

    try {
        const collection = await Collection.findOneAndDelete({ _id: id });
        if (!collection) {
            return res.status(404).json({ error: 'No such collection' });
        }
        res.status(200).json(collection);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update an collection , PUT http://localhost:4000/api/collection/:id 
const updateCollection = async (req, res) => {
    const { id } = req.params;
    console.log("inside updateCollection: ", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such collection' });
    }
    try {
        const collection = await Collection.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
        if (!collection) {
            return res.status(404).json({ error: 'No such collection' });
        }
        // console.log("updated collection: ", collection);
        res.status(200).json(collection);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getCollections,
    getCollection,
    createCollection,
    deleteCollection,
    updateCollection,
    getCollectionsByUser,
    getCollectionsNotByUser
};
