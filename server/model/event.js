const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Event = new Schema({
  user: {
    name:{
      type: String,
    },
    email: {
      type: String,
    }
  },
  email: {
    type: String
  },
  os: {
    type: String
  },
  eventType: {
    type: String
  },
  severity: {
    type: String
  },
  time: {
    type: String
  }
}, {
  collection: 'events'
})

module.exports = mongoose.model('Event', Event)
