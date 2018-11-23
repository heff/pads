let youtubeAPIReady = false;
let padsByNote = {};
const padSection = document.querySelector('#padsSection');
const boardSection = document.querySelector('#boardSection');

function createBoardSelector() {
  const select = document.createElement('select');
  select.id = 'boardSelect';
  select.addEventListener('change', updatePads, false);

  boards.forEach(function(board){
    var option =  document.createElement('option');
    option.value = board.name;
    option.innerText = board.name;
    select.appendChild(option);
  });

  boardSection.innerHTML = '';
  boardSection.appendChild(select);
}
createBoardSelector();

function updatePads(){
  var boardSelect = document.querySelector('#boardSelect');

  padsByNote = {};
  padSection.innerHTML = '';
  boardsByName[boardSelect.value].pads.forEach(function(padInfo){
    createPad(padInfo[0], padInfo[1], padInfo[2]);
  });
}

function createPad(id, key, note) {
  var pad = pads[id];
  var padName = `pad${id}`;
  var padKey = key || pad.key;

  padsByNote[note] = id;

  var padEl = document.createElement('div');
  padEl.className = 'pad';

  var placeHolder = document.createElement('div');
  placeHolder.id = padName;

  padEl.appendChild(placeHolder);
  padSection.appendChild(padEl);

  var trigger = document.createElement('div');
  trigger.className = 'padTrigger';
  trigger.innerHTML = padName + ' ('+padKey+')';
  padEl.appendChild(trigger);

  trigger.addEventListener('mousedown', function(){
    playPad(id);
  });

  var player = pads[id].player = new YT.Player(padName, {
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
        setTimeout(function(){
          player.pauseVideo();
          playPad(id);
        }, 1000);
      },
      'onStateChange': function(){}
    }
  });

  window.addEventListener('keydown', function(e){
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == keyMappings[padKey]) {
      playPad(id);
    }
  });
}

function playPad(id) {
  performance.mark('playPad');
  console.log('playPad', Date.now());

  let pad = pads[id];

  window.clearTimeout(pad.timeout);
  // window.clearInterval(pads[id].volInteval);

  pad.player.seekTo(pad.start, true);
  console.log('afterSeekTo', Date.now());
  pad.player.playVideo();
  console.log('afterplayVideo', Date.now());
  performance.mark('afterplayVideo');

  try {
    performance.measure('midiMessageToPlay', 'onMIDIMessage', 'afterplayVideo');
  } catch(e) {
    
  }


  // var vol = 100;
  // pads[id].volInteval = window.setInterval(function(){
  //   vol = vol - 10;
  //   pads[id].player.setVolume(vol);
  // }, 25);

  pad.timeout = window.setTimeout(function() {
    pad.player.pauseVideo();
    pad.player.seekTo(pad.start);
    pad.player.setVolume(100);
    // window.clearInterval(pads[id].volInteval);
  }, pad.duration);
}

function playNote(note) {
  console.log('playNote', Date.now());
  playPad(padsByNote[note]);
}

function onYouTubeIframeAPIReady() {
  console.log('onYouTubeIframeAPIReady');
  youtubeAPIReady = true;
  updatePads();
}
