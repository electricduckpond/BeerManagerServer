const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {

    res.status(200).json({
        message: ' Orders were fetched'
    });

});
router.post('/', (req, res, next) => {
    const order = {
        ProductCode: req.body.ProductCode,
        quantity: req.body.quantity
    }

    res.status(201).json({
        message: ' Orders created', //egg
        order: order
    });

});
router.delete('/:OrderNumber', (req, res, next) => {

    res.status(200).json({
        message: ' Orders details',
        OrderDetails: req.params.OrderDetails
    });

});



module.exports = router;