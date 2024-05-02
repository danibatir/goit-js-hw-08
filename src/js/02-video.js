import { Player } from '@vimeo/player';
import throttle from 'lodash.throttle';
const player = new Player('vimeo-player');

player.on('ready', () => {
  player.on('timeupdate', () => {
    localStorage.setItem('videoplayer-current-time', player.getCurrentTime());
  });

  const throttledTimeupdate = throttle(() => {
    localStorage.setItem('videoplayer-current-time', player.getCurrentTime());
  }, 1000);

  player.on('timeupdate', throttledTimeupdate);
});

document.addEventListener('DOMContentLoaded', () => {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime !== null) {
    player.setCurrentTime(savedTime);
  }
});
