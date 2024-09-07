require('dotenv').config();
const express = require('express');
const sequelize = require('./config/databse');
const emiRoutes = require('./routes/emiRoutes');

const app = express();
app.use(express.json());

app.use('/api', emiRoutes);

const PORT = process.env.PORT || 3000;


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});


