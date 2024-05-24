var express = require('express');
var router = express.Router();
const isAuthadmin=require('../middleware/isAuthadmin')
const {blockuser,unblockuser, alluser, loginAdmin, deleteTransaction}=require('../controller/admincontroller')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("success")
});
router.get('/login',loginAdmin)
router.get('/allusers',isAuthadmin,alluser)
router.get('/block/:id',isAuthadmin,blockuser)
router.get('/unblock/:id',isAuthadmin,unblockuser)
router.get('/deletetransaction/:id',isAuthadmin,deleteTransaction)
// router.post('/editUser',isAuth,updateUser)
// router.post('/deleteUser',isAuth,deleteUser)
// router.get('/getUser',isAuth,getUser)
// router.get('/getUser/:id',isAuth,getUserid)

module.exports = router;
