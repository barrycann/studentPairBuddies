var mongoose = require('mongoose');
var objectId = mongoose.Schema.Types.ObjectId;

var cohort = new mongoose.Schema({
  title: { type: String },
  last_update: { type: Date },
  pairs: [[{type: objectId, ref: 'user'}]],
  slack_channel: {type: String}
});

module.exports = mongoose.model('cohort', cohort);
