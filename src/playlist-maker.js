var playItem = require('./playitem.js');
var setupAutoadvance = require('./autoadvance.js');

var playlistMaker = function(player, plist) {
  var currentIndex = 0;
  var autoadvanceTimeout = null;

  var playlist = function playlist(list) {
    if (list) {
      plist = list.slice();
    }

    return plist.slice();
  };

  playlist.currentItem = function item(index) {
    if (typeof index === 'number' && index >= 0 && index < plist.length) {
      currentIndex = index;
      playItem(player, autoadvanceTimeout, plist[currentIndex]);
      return currentIndex;
    }

    return currentIndex;
  };

  playlist.next = function next() {
    var prevIndex = currentIndex;
    currentIndex = Math.min(currentIndex + 1, plist.length - 1);
    if (prevIndex === currentIndex) {
      return;
    }
    playItem(player, autoadvanceTimeout, plist[currentIndex]);
    return plist[currentIndex];
  };

  playlist.previous = function previous() {
    var prevIndex = currentIndex;
    currentIndex = Math.max(currentIndex - 1, 0);
    if (prevIndex === currentIndex) {
      return;
    }
    playItem(player, autoadvanceTimeout, plist[currentIndex]);
    return plist[currentIndex];
  };

  playlist.autoadvance = function autoadvance(timeout) {
    autoadvanceTimeout = timeout;

    setupAutoadvance(player, autoadvanceTimeout);
  };

  playlist.currentItem(0);

  return playlist;
};

module.exports = playlistMaker;