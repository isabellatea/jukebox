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
  netVoteCount: Number
});

const UserSchema = new Schema({
  name: String,
  addedSongs: Array,
  votedSongs: Array
});

const Song = mongoose.model('song', SongSchema);
const User = mongoose.model('user', UserSchema);

// new Song({name: 'Stupid La Love Song', artist: 'The Palms',
//   image: '',
//   link: 'https://open.spotify.com/track/2aao9gcpnhpFCZmWWiLsSQ',
//   userName: 'ctnswb',
//   upVoteCount: 6, downVoteCount: 2}).save();
// new Song({name: 'Nurse Ratched', artist: 'Cherry Glazerr',
//   image: '',
//   link: 'https://open.spotify.com/track/6ZriMniEEn0iFwGfUuse4P',
//   userName: 'ctnswb',
//   upVoteCount: 8, downVoteCount: 3}).save();
// new Song({name: 'On the Run', artist: 'Tipling Rock',
//   image: '',
//   link: 'https://open.spotify.com/track/3r91IHXGDZX99fdZLyQanm',
//   userName: 'ctnswb',
//   upVoteCount: 9, downVoteCount: 8}).save();

module.exports.mongoose = mongoose;
module.exports.song = Song;
module.exports.user = User;
