var express = require('express');
var router = express.Router();
const isAuth=require('../middleware/isauth')
const {createUser,loginUser,updateUser,getUser,deleteUser,home,getUserid,updateProfile}=require('../controller/usercontroller')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("success")
});
router.post('/createUser',createUser)
router.post('/loginUser',loginUser)

module.exports = router;
