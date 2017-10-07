const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://jbadmin:pizzaPizza!@ds161194.mlab.com:61194/pizza-jukebox');

mongoose.connection
  .once('open', () => {
      console.log('Successfully connected');
  })
  .on('error', (error) => {
      console.warn('Connection error', error);
  });

module.exports = mongoose;