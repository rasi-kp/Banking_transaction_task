
const User = require('../model/users')
const user = require('../model/users')
const Admin=require('../model/admin')
const Transaction = require('../model/transaction')

module.exports = {
  //Login Admin
  loginAdmin: async (req, res) => {
    try {
      const admin = await Admin.findOne({ email: req.body.email })
      if (!admin) {
        return res.status(400).json({ error: "Invalid Email" });
      }
      else {
        const passwordmatch = await bcrypt.compare(req.body.password, admin.password)
        if (passwordmatch) {
          const token = jwt.sign({ email: admin.email, id:admin._id }, process.env.JWT_SECRET_ADMIN, { expiresIn: '1h' });
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
  alluser: async (req, res) => {
    const datas = await User.findOne({})
    res.status(200).json(datas)
  },
  blockuser: async (req, res) => {
    const proid = req.params.id
    await user.updateOne({ _id: proid }, { $set: { isActive: false } })
    res.status(200).json("block")
  },
  unblockuser: async (req, res) => {
    const proid = req.params.id
    await user.updateOne({ _id: proid }, { $set: { isActive: true } })
    res.status(200).json("unblock")
  },
  // Delete a transaction
  deleteTransaction: async (req, res) => {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      const transaction = await Transaction.findById(req.params.id).session(session);

      if (!transaction || transaction.userId.toString() !== req.user.id) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ msg: 'Transaction not found' });
      }

      const user = await User.findById(req.user.id).session(session);

      if (transaction.type === 'deposit') {
        user.balance -= transaction.amount;
      } else if (transaction.type === 'withdrawal') {
        user.balance += transaction.amount;
      }

      await transaction.remove({ session });
      await user.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.json({ msg: 'Transaction removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
}