var keyMappings = {
  space: 32,
  b: 66,
  s: 83,
  t: 84,
}

var pads = [
  {
    video: 'HPPj6viIBmU',
    start: 99.23,
    duration: 400,
    key: 'space'
  },
  {
    video: 'PbcctWbC8Q0',
    start: 245.75,
    duration: 300,
    key: 's'
  },
  {
    video: 'txqiwrbYGrs',
    start: 81.75,
    duration: 500,
    key: 't'
  },
  {
    video: 'hMtZfW2z9dw',
    start: 26.05,
    duration: 450,
    key: 'b'
  },
  {
    video: 'tVj0ZTS4WF4',
    start: 48,
    duration: 550,
    key: 'd'
  },
  {
    video: 'oKI-tD0L18A',
    start: 3,
    duration: 550,
    key: 'r'
  },
  {
    video: 'z_SQO3vv3p8',
    start: 18.5,
    duration: 2200,
    key: 'u'
  },
  {
    video: 'z_SQO3vv3p8',
    start: 20.9,
    duration: 750,
    key: 'i'
  },


];

var padSection = document.querySelector('#padsSection');

function createPad(pad, index) {
  //videoId, start, duration, keyCode, key

  var padName = `pad${index}`;

  var padEl = document.createElement('div');
  padEl.className = 'pad';
  var placeHolder = document.createElement('div');
  placeHolder.id = padName;
  padEl.appendChild(placeHolder);
  padSection.appendChild(padEl);

  var trigger = document.createElement('div');
  trigger.className = 'padTrigger';
  trigger.innerHTML = padName + ' ('+pad.key+')';
  padEl.appendChild(trigger);

  trigger.addEventListener('mousedown', function (){
    playPad(index);
  });

  var player = pads[index].player = new YT.Player(padName, {
    height: '270',
    width: '300',
    videoId: pad.video,
    playerVars: {
      // 'autoplay': 1,
      controls: 0,
      rel: 0,
      disablekb: 1,
      enablejsapi: 1,
      iv_load_policy: 3,
      modestbranding: 1,
      showinfo: 0
    },
    events: {
      'onReady': function(){
        player.playVideo();
        player.pauseVideo();
      },
      'onStateChange': function(){}
    }
  });

  window.addEventListener('keydown', function(e){
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == keyMappings[pad.key]) {
      playPad(index);
    }
  });
}

function playPad(index) {
  window.clearTimeout(pads[index].timeout);

  pads[index].player.seekTo(pads[index].start);
  pads[index].player.playVideo();

  pads[index].timeout = window.setTimeout(function() {
    pads[index].player.pauseVideo();
    pads[index].player.seekTo(pads[index].start);
  }, pads[index].duration);
}

function onYouTubeIframeAPIReady() {
  pads.forEach(createPad);

  // createPlayer('base', 'basePlayer', 'HPPj6viIBmU', 99.23, 400, 66, 'b');
  // createPlayer('snare', 'snarePlayer', 'PbcctWbC8Q0', 245.75, 300, 83, 's');
  // createPlayer('tom1', 'tom1Player', 'txqiwrbYGrs', 81.75, 500, 84, 't');
}


var keyMappings = {
  space: 32,
  0: 48,
  1: 49,
  2: 50,
  3: 51,
  4: 52,
  5: 53,
  6: 54,
  7: 55,
  8: 56,
  9: 57,
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90,
}
