const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');
const requireAuth = require('../middleware/requireAuth');
const isAdmin = require('../middleware/isAdmin');


// head url: http://localhost:4000/api/collection
// GET all collections
router.get('/', requireAuth, collectionController.getCollections);
// GET collections by user
router.get('/user', requireAuth, collectionController.getCollectionsByUser);
// GET collections not by user
router.get('/notuser', requireAuth, collectionController.getCollectionsNotByUser);

// GET a single collection
router.get('/:id', requireAuth, collectionController.getCollection);

// POST create a new collection
router.post('/', requireAuth, collectionController.createCollection);

// DELETE an collection
router.delete('/:id', requireAuth, collectionController.deleteCollection);

// PUT update an collection
router.put('/:id', requireAuth, isAdmin, collectionController.updateCollection);

module.exports = router;
