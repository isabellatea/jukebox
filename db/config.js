const dbUri = require('./dbUri').dbUri;
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;

mongoose.connect(dbUri);

mongoose.connection
  .once('open', () => {
      console.log('Successfully connected');
  })
  .on('error', (error) => {
      console.warn('Connection error', error);
  });

const SongSchema = new Schema({
  name: String,
  artist: String,
  image: String,
  link: String,
  userName: String,
  upVoteCount: {type: Number, default: 1},
  downVoteCount: {type: Number, default: 0},
  netVoteCount: Number,
  duration_ms: Number,
  partyCode: String
});


const PartySchema = new Schema({
  partyCode: String,
  partyHost: String,
  token: String
});

const Song = mongoose.model('song', SongSchema);
const Party = mongoose.model('party', PartySchema);

module.exports.mongoose = mongoose;
module.exports.song = Song;
module.exports.party = Party;
