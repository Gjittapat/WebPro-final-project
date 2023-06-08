const express = require('express');
const router = express.Router();
const RequestItemController = require('../controllers/requestItemController');

const requireAuth = require('../middleware/requireAuth')



router.use(requireAuth)
// GET all items
router.get('/', RequestItemController.getRequestedItems);

// GET pending items
router.get('/pendingitems', RequestItemController.getPendingItems)
// GET a single item
// router.get('/:id', RequestItemController.getRequestedItem);

// POST create a new item
router.post('/', RequestItemController.createRequestItem);

// // DELETE an item
// router.delete('/:id', RequestItemController.deleteItem);

// PUT update an item
router.put('/approve/:id', RequestItemController.approveItem);
router.put('/reject/:id', RequestItemController.rejectItem);
router.put('/pending/:id', RequestItemController.pendingItem);
module.exports = router;
