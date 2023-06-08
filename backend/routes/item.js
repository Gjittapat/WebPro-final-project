const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/itemController');
const requireAuth = require('../middleware/requireAuth');
const isAdmin = require('../middleware/isAdmin');


// head url: http://localhost:4000/api/item
// GET all items
router.get('/', requireAuth, ItemController.getItems);
// GET items by user
router.get('/user', requireAuth, ItemController.getItemsByUser);
// GET items not by user
router.get('/notuser', requireAuth, ItemController.getItemsNotByUser);

// GET a single item
router.get('/:id', requireAuth, ItemController.getItem);

// POST create a new item
router.post('/', requireAuth, ItemController.createItem);

// DELETE an item
router.delete('/:id', requireAuth, isAdmin, ItemController.deleteItem);

// PUT update an item
router.put('/:id', requireAuth, isAdmin, ItemController.updateItem);

module.exports = router;
