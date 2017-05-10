var mongoose = require('mongoose');
var objectId = mongoose.Schema.Types.ObjectId;

var user = new mongoose.Schema({
  name: { type: String },
  partners: [{type: objectId, ref: "user"}],
  cohort: {type: objectId, ref: 'cohort'},
  user_type: {type: String, default: 'student', enum: ['student', 'mentor', 'admin']}
});

module.exports = mongoose.model('user', user);
