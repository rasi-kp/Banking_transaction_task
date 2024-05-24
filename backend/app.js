const express = require('express');
const dotenv = require('dotenv');
var logger = require('morgan');
const bodyParser = require('body-parser');
var cors = require('cors')
const path = require('path'); // Import path module

const users = require('./routes/users');
const admin = require("./routes/admin")
const transaction = require("./routes/transaction")

require('./config/dbconnection');

dotenv.config();
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
// Use routes
app.use('/', users);
app.use('/transaction', transaction);
app.use('/admin', admin);

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});