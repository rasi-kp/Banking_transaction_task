const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../model/users')
const mongoose = require('mongoose');
const db = mongoose.connection;
const collection = db.collection('users');
module.exports = {
  loginUser: async (req, res) => {
    try {
      const usercheck = await user.findOne({ email: req.body.email })
      if (!usercheck) {
        return res.status(400).json({ error: "Invalid Email" });
      }
      else {
        const passwordmatch = await bcrypt.compare(req.body.password, usercheck.password)
        if (passwordmatch) {
          const token = jwt.sign({ email: usercheck.email, id:usercheck._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
          if (!usercheck.isActive) {
            return res.status(400).json({ error: "Admin blocked" });
          }
          else
            return res.json({ token, success: "success", user: usercheck.name });
        }
        else {
          return res.status(400).json({ error: "Invalid password" });
        }
      }
    } catch {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  createUser: async (req, res) => {
    const datas = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      balance:0,
      isActive:true
    }
    const existuser = await user.findOne({ email: datas.email })
    if (existuser) {
      return res.status(400).json({ error: "Email Already Exist" });
    }
    else {
      const saltRounds = 10;
      const hashpassword = await bcrypt.hash(req.body.password, saltRounds)
      datas.password = hashpassword
      const result = await collection.insertOne(datas)
      return res.status(200).json({ user: datas.name,success:"success" });
    }
  },
}