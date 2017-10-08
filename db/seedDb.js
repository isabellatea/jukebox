const mongoose = require('./config').mongoose;
const Song = require('./config').song;

new Song({name: 'Stupid La Love Song', artist: 'The Palms',
  image: '',
  link: 'https://open.spotify.com/track/2aao9gcpnhpFCZmWWiLsSQ',
  userName: 'ctnswb',
  upVoteCount: 6, downVoteCount: 2}).save();
new Song({name: 'Nurse Ratched', artist: 'Cherry Glazerr',
  image: '',
  link: 'https://open.spotify.com/track/6ZriMniEEn0iFwGfUuse4P',
  userName: 'ctnswb',
  upVoteCount: 8, downVoteCount: 3}).save();
new Song({name: 'On the Run', artist: 'Tipling Rock',
  image: '',
  link: 'https://open.spotify.com/track/3r91IHXGDZX99fdZLyQanm',
  userName: 'ctnswb',
  upVoteCount: 9, downVoteCount: 8}).save();