/* eslint-disable no-console */
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/animeHunt')
  .then(() => {
    console.log('Connected to mongodb');
  }).catch(() => {
    console.log('no connection');
  });
