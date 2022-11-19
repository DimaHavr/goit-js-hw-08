import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const STORAGE_CURRENT_TIME = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(function (data) {
    localStorage.setItem(STORAGE_CURRENT_TIME, data.seconds);
  }, 1000)
);

const currentTime = localStorage.getItem(STORAGE_CURRENT_TIME);

player
  .setCurrentTime(currentTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
