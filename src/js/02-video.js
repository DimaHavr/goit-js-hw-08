import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const STORAGE_CURRENT_TIME = 'videoplayer-current-time';
const currentTime = localStorage.getItem(STORAGE_CURRENT_TIME);

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',

  throttle(function (data) {
    if (data.seconds === data.duration) {
      return localStorage.removeItem(STORAGE_CURRENT_TIME);
    }
    return localStorage.setItem(STORAGE_CURRENT_TIME, data.seconds);
  }, 1000)
);

player.setCurrentTime(currentTime, function (seconds) {});
