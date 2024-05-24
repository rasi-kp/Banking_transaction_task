var express = require('express');
var router = express.Router();
const { createTransaction, getTransactions, getTransactionById} = require('../controller/transactioncontroller');
const isAuth = require('../middleware/isauth');


router.post('/', isAuth, createTransaction);
router.get('/', isAuth, getTransactions);
router.get('/:id', isAuth, getTransactionById);

module.exports = router;
